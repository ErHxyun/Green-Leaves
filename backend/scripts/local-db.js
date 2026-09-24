import {randomBytes} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync,spawn} from 'node:child_process';
import pg from 'pg';
const root=fileURLToPath(new URL('../../',import.meta.url));
const local=path.join(root,'backend/.local-db');
const dir=path.resolve(process.env.LOCAL_POSTGRES_DIR||local);
if(process.platform==='win32'&&/[^\x00-\x7F]/.test(dir))throw Error('Windows PostgreSQL needs an ASCII runtime path. Set LOCAL_POSTGRES_DIR to an ASCII path; project code stays in place.');
fs.mkdirSync(dir,{recursive:true});fs.mkdirSync(local,{recursive:true});
const configPath=path.join(local,'connection.json');
const config=fs.existsSync(configPath)?JSON.parse(fs.readFileSync(configPath,'utf8')):{user:'greenleaves',password:randomBytes(24).toString('hex'),port:55432};
if(!fs.existsSync(configPath))fs.writeFileSync(configPath,JSON.stringify(config),{mode:0o600});
let stop;
if(process.platform==='win32'){
 const binaries=await import('@embedded-postgres/windows-x64');
 const native=path.join(dir,'native');
 if(!fs.existsSync(path.join(native,'bin/postgres.exe')))fs.cpSync(path.dirname(path.dirname(binaries.postgres)),native,{recursive:true});
 const data=path.join(dir,'data'),tmp=path.join(dir,'tmp');fs.mkdirSync(tmp,{recursive:true});
 const env={...process.env,TEMP:tmp,TMP:tmp};
 if(!fs.existsSync(path.join(data,'PG_VERSION'))){
  const pw=path.join(tmp,'init-password');
  fs.writeFileSync(pw,config.password,{mode:0o600});
  try{
   const result=spawnSync(path.join(native,'bin/initdb.exe'),['-D',data,'-U',config.user,'--auth=scram-sha-256','--pwfile='+pw,'--encoding=UTF8','--locale=C'],{env,encoding:'utf8',windowsHide:true});
   if(result.status!==0)throw Error('PostgreSQL initialization failed: '+result.stderr);
  }finally{fs.unlinkSync(pw);}
 }
 const log=fs.openSync(path.join(dir,'postgres.log'),'a');
 const processDB=spawn(path.join(native,'bin/postgres.exe'),['-D',data,'-p',String(config.port),'-h','127.0.0.1'],{env,windowsHide:true,stdio:['ignore',log,log]});
 processDB.on('error',e=>{console.error(e);process.exitCode=1;});
 stop=()=>spawnSync(path.join(native,'bin/pg_ctl.exe'),['-D',data,'stop','-m','fast'],{env,windowsHide:true,stdio:'ignore'});
}else{
 const {default:EmbeddedPostgres}=await import('embedded-postgres');
 const db=new EmbeddedPostgres({...config,databaseDir:path.join(dir,'data'),persistent:true,authMethod:'scram-sha-256',initdbFlags:['--encoding=UTF8','--locale=C'],postgresFlags:['-h','127.0.0.1'],onLog:()=>{},onError:console.error});
 if(!fs.existsSync(path.join(dir,'data/PG_VERSION')))await db.initialise();await db.start();stop=()=>db.stop();
}
let client;
for(let i=0;i<60;i++){
 const c=new pg.Client({...config,host:'127.0.0.1',database:'postgres'});
 try{await c.connect();client=c;break;}catch{await c.end().catch(()=>{});await new Promise(r=>setTimeout(r,500));}
}
if(!client){await stop();throw Error('Local PostgreSQL did not become ready; inspect runtime postgres.log');}
if(!(await client.query("SELECT 1 FROM pg_database WHERE datname='greenleaves'")).rowCount)await client.query('CREATE DATABASE greenleaves');
await client.end();
const envPath=path.join(root,'backend/.env');
if(!fs.existsSync(envPath))fs.writeFileSync(envPath,'DATABASE_URL=postgresql://'+config.user+':'+config.password+'@127.0.0.1:'+config.port+'/greenleaves\nADMIN_API_KEY='+randomBytes(32).toString('hex')+'\nPORT=8080\nCORS_ORIGIN=http://localhost:3000\nOPENAI_API_KEY=\nOPENAI_MODEL=\n',{mode:0o600});
console.log('Local PostgreSQL ready at 127.0.0.1:'+config.port+'; private settings in backend/.env. Keep this process running.');
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,async()=>{await stop();process.exit(0);});
setInterval(()=>{},60000);
