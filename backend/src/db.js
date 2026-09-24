import pg from 'pg';
export function createPool(connectionString = process.env.DATABASE_URL) {
 if (!connectionString) throw new Error('DATABASE_URL is required');
 return new pg.Pool({connectionString, max:10, connectionTimeoutMillis:5000});
}
export async function transaction(pool, fn) {
 const c = await pool.connect();
 try { await c.query('BEGIN'); const result = await fn(c); await c.query('COMMIT'); return result; }
 catch(e) { await c.query('ROLLBACK'); throw e; } finally { c.release(); }
}
