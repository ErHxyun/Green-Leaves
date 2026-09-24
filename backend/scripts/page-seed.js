import {pageSnapshot} from '../src/pages.js';
import {version} from '../src/content.js';
const sections=[
 ['homeHero','首页 · 背景轮播',Array.from({length:4},(_,i)=>['backgroundImage/background'+(i+1)+'.jpg','',''])],
 ['testimonials','首页 · 寄语图片',Array.from({length:9},(_,i)=>['childrenImage/say'+(i+1)+'.png','',''])],
 ['aboutOrg','关于我们 · 联盟照片',[['About_Us.jpg','小绿叶团队支持学生','Little Green Leaves team supporting students']]],
 ['aboutLeader','关于我们 · 负责人照片',[['leader.jpg','创始人与负责人照片','Portrait of our founder and leader']]],
 ['aboutDeveloper','关于我们 · 开发者照片',[['developer.jpg','开发者照片','Portrait of our developer']]],
 ['wechatQr','联系我们 · 微信二维码',[['officialQR.jpg','微信公众号二维码','WeChat QR code']]],
 ['contactQr','联系我们 · 联系二维码',[['contactQR.jpg','联系二维码','Contact QR code']]],
 ['logo','导航 · Logo',[['logo.jpg','小绿叶标志','Little Green Leaves Logo']]]
];
export async function seedPages(c){
 for(const [id,label,images] of sections){
  if(!(await c.query("INSERT INTO page_sections VALUES($1,$2,'published',0) ON CONFLICT DO NOTHING RETURNING id",[id,label])).rowCount)continue;
  for(const [index,[file,cn,en]] of images.entries()){
   const media=(await c.query('SELECT id FROM media_assets WHERE url=$1',['/media/source/'+file])).rows[0];if(!media)throw Error('Missing page media '+file);
   const imageId='page-'+id+'-'+(index+1);await c.query('INSERT INTO page_images VALUES($1,$2,$3,$4)',[imageId,id,media.id,index]);
   for(const [lang,alt] of [['cn',cn],['en',en]])await c.query('INSERT INTO page_image_translations VALUES($1,$2,$3,$4)',[imageId,lang,alt,'']);
  }
  await version(c,'page',id,'legacy-import',await pageSnapshot(c,id));
 }
}
