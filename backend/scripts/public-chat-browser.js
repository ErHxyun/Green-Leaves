import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1280,height:900}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:8080/',{waitUntil:'networkidle'});
 await page.getByRole('button',{name:/Ask Green Leaves|问问小绿叶/}).click();
 const dialog=page.getByRole('dialog');
 assert.equal(await page.locator('.MuiBackdrop-root').count(),0);
 let position=await dialog.boundingBox();assert.ok(position.x>800,'Chat should be docked on the right');
 await page.screenshot({path:'work/chat-welcome.png'});
 await dialog.getByRole('button',{name:/What is Little Green Leaves|小绿叶是什么组织/}).click();
 await dialog.getByRole('link',{name:/View source|查看来源/}).first().waitFor({timeout:110000});
 await dialog.getByRole('button',{name:/Close|关闭/}).click();
 await page.getByRole('button',{name:/Ask Green Leaves|问问小绿叶/}).click();
 await dialog.getByRole('link',{name:/View source|查看来源/}).first().waitFor();
 await page.screenshot({path:'work/chat-desktop.png'});
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:'work/chat-mobile.png'});
 const bounds=await dialog.boundingBox();assert.ok(bounds.x>=0&&bounds.x+bounds.width<=391);
 await page.goto('http://localhost:8080/our-efforts?event=dream-platform-launch',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>document.querySelector('[role="dialog"]')!==null,{timeout:15000});
 assert.deepEqual(errors,[]);
 console.log('Desktop/mobile live chat, cited sources, event deep link and zero page errors: passed');
}finally{await browser.close();}
