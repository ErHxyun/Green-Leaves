import express from 'express';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {createApp} from './app.js';
import {createPool} from './db.js';
const pool=createPool(),app=createApp({pool});
const root=fileURLToPath(new URL('../../',import.meta.url));
app.use('/pictures',express.static(root+'frontend/public/pictures'));
app.use('/media/source',express.static(root+'frontend/src/pictures'));
if(fs.existsSync(root+'frontend/build/index.html')){
 app.use(express.static(root+'frontend/build'));
 app.get('/{*path}',(req,res)=>res.sendFile(root+'frontend/build/index.html'));
}
const server=app.listen(Number(process.env.PORT||8080),()=>console.log('Content backend listening on port '+(process.env.PORT||8080)));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(async()=>{await pool.end();process.exit(0);}));
