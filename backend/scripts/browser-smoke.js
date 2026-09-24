import {chromium} from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
const output=path.resolve('backend/generated/browser');
fs.mkdirSync(output,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const checks=[];
try{
 for(const route of ['/','/about','/contact','/our-efforts']){
  await page.goto('http://127.0.0.1:8080'+route,{waitUntil:'networkidle'});
  await page.locator('body').waitFor();
  if(!(await page.locator('body').innerText()).trim())throw Error('Empty page '+route);
  checks.push({route,status:'rendered'});
 }
 await page.evaluate(()=>localStorage.setItem('lng','en'));
 await page.reload({waitUntil:'networkidle'});
 await page.getByRole('button',{name:'2016-05 First Park Book Donation Event',exact:true}).waitFor();
 await page.screenshot({path:path.join(output,'timeline-en.png')});
 await page.getByRole('button',{name:'2016-05 First Park Book Donation Event',exact:true}).click();
 await page.getByText('Taking the First Step',{exact:true}).waitFor();
 await page.screenshot({path:path.join(output,'event-en.png')});
 await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'中文',exact:true}).click();
 await page.waitForResponse(r=>r.url().includes('/api/v1/timeline?lang=cn')&&r.status()===200);
 await page.waitForTimeout(400);
 await page.screenshot({path:path.join(output,'timeline-cn.png')});
 checks.push({feature:'API timeline + modal + language switch',status:'passed'});
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:path.join(output,'timeline-mobile.png')});
 await page.route('**/api/v1/timeline?*',route=>route.abort());
 await page.reload({waitUntil:'networkidle'});
 await page.getByText('最新内容暂时不可用，正在展示已有内容。',{exact:true}).waitFor();
 checks.push({feature:'offline built-in fallback',status:'passed'});
 if(errors.length)throw Error('Browser errors: '+errors.join('; '));
 fs.writeFileSync(path.join(output,'result.json'),JSON.stringify({checks,pageErrors:errors},null,2));
 console.log(JSON.stringify({checks,pageErrors:errors},null,2));
}finally{await browser.close();}
