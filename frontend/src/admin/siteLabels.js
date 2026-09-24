export const siteGroups=['首页','我们的努力','关于我们','联系我们','导航','页脚','通用'];
const labels={
'seo.title':'浏览器与搜索标题','seo.description':'搜索引擎介绍','ui.close':'关闭按钮','ui.loading':'内容加载提示','ui.unavailable':'离线回退提示','ui.empty':'无内容提示',
'hero.title':'首屏主标题','hero.subtitle':'首屏介绍','hero.cta':'首屏按钮',
'impact.title':'公益成果 · 标题','impact.children':'受助儿童 · 名称','impact.childrenDesc':'受助儿童 · 说明','impact.childrenValue':'受助儿童 · 数字',
'impact.continents':'服务地区 · 名称','impact.continentsDesc':'服务地区 · 说明','impact.regionsValue':'服务地区 · 数字',
'impact.funds':'公益资金 · 名称','impact.fundsDesc':'公益资金 · 说明','impact.fundsValue':'公益资金 · 金额',
'cta.title':'参与行动 · 标题','cta.subtitle':'参与行动 · 介绍','cta.contactButton':'参与行动 · 联系按钮','testimonials.title':'寄语区标题',
'about.title':'页面主标题','about.intro':'开篇介绍','about.orgTitle':'联盟介绍 · 标题','about.orgP1':'联盟介绍 · 第一段','about.orgP2':'联盟介绍 · 第二段',
'about.campTitle':'夏令营 · 标题','about.campP1':'夏令营 · 介绍','about.virtualTitle':'线上活动 · 标题','about.virtualP1':'线上活动 · 介绍','about.closing':'结尾寄语',
'about.leaderTitle':'负责人介绍 · 标题','about.leaderName':'负责人 · 姓名','about.leaderRole':'负责人 · 职务','about.leaderEdu':'负责人 · 教育经历','about.leaderBio':'负责人 · 简介',
'about.devTitle':'开发者介绍 · 标题','about.devName':'开发者 · 姓名','about.devRole':'开发者 · 职务','about.devEdu':'开发者 · 教育经历','about.devBio':'开发者 · 简介',
'contact.title':'页面主标题','contact.intro':'联系说明','contact.cards.contact.title':'联系方式卡片 · 标题','contact.cards.contact.desc':'联系方式卡片 · 说明',
'contact.cards.wechat.title':'微信卡片 · 标题','contact.cards.wechat.desc':'微信卡片 · 说明',
'nav.home':'首页入口','nav.ourEfforts':'我们的努力入口','nav.about':'关于我们入口','nav.contact':'联系我们入口','nav.langToggle':'语言切换按钮',
'footer.copyright':'版权说明','footer.links.home':'首页链接','footer.links.ourEfforts':'我们的努力链接','footer.links.about':'关于我们链接','footer.links.contact':'联系我们链接',
'app.title':'网站名称','efforts.title':'页面主标题','timeline.heading':'成长时间线 · 标题','timeline.subheading':'成长时间线 · 介绍','timeline.closing.title':'结尾寄语 · 标题','timeline.closing.text':'结尾寄语 · 正文'
};
export function describeSiteKey(key){
 const prefix=key.split('.')[0];
 const group=({hero:'首页',impact:'首页',cta:'首页',testimonials:'首页',efforts:'我们的努力',timeline:'我们的努力',about:'关于我们',contact:'联系我们',nav:'导航',footer:'页脚'})[prefix]||'通用';
 return {group,label:labels[key]||'其他文案'};
}
