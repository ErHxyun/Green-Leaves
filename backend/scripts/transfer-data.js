import fs from 'node:fs';
import {createPool,transaction} from '../src/db.js';
const pool=createPool();
const quote=name=>{if(!/^[a-z_][a-z_0-9]*$/.test(name))throw Error('Unexpected table name');return '"'+name+'"';};
const checksum=async(c,name)=>(await c.query("SELECT count(*)::int AS count,md5(COALESCE(string_agg(to_jsonb(t)::text,E'\\n' ORDER BY to_jsonb(t)::text COLLATE \"C\"),'')) AS hash FROM "+quote(name)+" t")).rows[0];
try{
 const [mode,file]=process.argv.slice(2);
 if(!['export','import'].includes(mode)||!file)throw Error('Use export/import PATH');
 await transaction(pool,async c=>{
  if(mode==='export')await c.query('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY');
  await c.query("SET LOCAL TIME ZONE 'UTC'");
  const names=(await c.query("SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename<>'schema_migrations' ORDER BY tablename")).rows.map(x=>x.tablename);
  const edges=(await c.query("SELECT conrelid::regclass::text AS child,confrelid::regclass::text AS parent FROM pg_constraint WHERE contype='f' AND connamespace='public'::regnamespace")).rows;
  const ordered=[],remaining=new Set(names);
  while(remaining.size){
   const next=[...remaining].filter(n=>!edges.some(e=>e.child===n&&remaining.has(e.parent)&&e.parent!==n));
   if(!next.length)throw Error('Cyclic table dependencies');
   for(const n of next){ordered.push(n);remaining.delete(n);}
  }
  if(mode==='export'){
   const data={tables:[]};
   for(const name of ordered)data.tables.push({name,...await checksum(c,name),rows:(await c.query('SELECT to_jsonb(t) AS row FROM '+quote(name)+' t')).rows.map(x=>x.row)});
   fs.writeFileSync(file,JSON.stringify(data));
   console.log(JSON.stringify(data.tables.map(({name,count})=>({name,count}))));
  }else{
   const data=JSON.parse(fs.readFileSync(file,'utf8'));
   if(JSON.stringify(data.tables.map(t=>t.name).sort())!==JSON.stringify([...names].sort()))throw Error('Schema table mismatch');
   for(const name of names)if((await checksum(c,name)).count)throw Error('Target must be empty: '+name);
   await c.query('ALTER TABLE content_versions DISABLE TRIGGER content_release');
   for(const name of ordered){
    const table=data.tables.find(t=>t.name===name);
    if(table.rows.length)await c.query('INSERT INTO '+quote(name)+' OVERRIDING SYSTEM VALUE SELECT * FROM jsonb_populate_recordset(NULL::'+quote(name)+',$1::jsonb)',[JSON.stringify(table.rows)]);
    const actual=await checksum(c,name);
    if(actual.count!==table.count||actual.hash!==table.hash)throw Error('Checksum mismatch: '+name);
   }
   await c.query('ALTER TABLE content_versions ENABLE TRIGGER content_release');
   const serial=(await c.query("SELECT table_name,column_name FROM information_schema.columns WHERE table_schema='public' AND (is_identity='YES' OR column_default LIKE 'nextval%')")).rows;
   for(const {table_name,column_name}of serial)await c.query("SELECT setval(pg_get_serial_sequence($1,$2),COALESCE((SELECT max("+quote(column_name)+") FROM "+quote(table_name)+"),1),(SELECT count(*)>0 FROM "+quote(table_name)+"))",[table_name,column_name]);
   console.log('Import verified: '+data.tables.length+' tables; all row counts and content checksums match.');
  }
 });
}finally{await pool.end();}
