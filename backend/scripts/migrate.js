import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {createPool,transaction} from '../src/db.js';
export async function migrate(pool) {
 return transaction(pool, async c => {
  await c.query('SELECT pg_advisory_xact_lock(738401)');
  await c.query('CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz DEFAULT now())');
  const dir = fileURLToPath(new URL('../migrations/', import.meta.url));
  for(const name of (await fs.readdir(dir)).filter(x=>x.endsWith('.sql')).sort()) {
   if((await c.query('SELECT 1 FROM schema_migrations WHERE name=$1',[name])).rowCount) continue;
   await c.query(await fs.readFile(path.join(dir,name),'utf8'));
   await c.query('INSERT INTO schema_migrations(name) VALUES($1)',[name]);
  }
 });
}
if(process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
 const pool=createPool(); try { await migrate(pool); console.log('Migrations complete'); } finally {await pool.end();}
}
