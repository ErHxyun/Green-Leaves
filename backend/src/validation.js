import {z} from 'zod';
export class HttpError extends Error {constructor(status,message,details){super(message);this.status=status;this.details=details;}}
export const id=z.string().min(1).max(180).regex(/^[a-zA-Z0-9_-]+$/);
export const lang=z.enum(['cn','en']);
const text=z.string().max(100000);
const title=z.string().min(1).max(1000);
const status=z.enum(['draft','published','archived']);
const translations=s=>z.object({en:s.optional(),cn:s.optional()}).strict().refine(v=>Object.keys(v).length>0,'At least one translation required');
export const yearInput=z.object({year:z.number().int().min(1900).max(2200),sort_order:z.number().int().nonnegative().default(0),icon:z.enum(['Leaf','Users','HandCoins','Droplets','HeartHandshake']).default('Leaf'),status:status.default('draft'),translations:translations(z.object({title,summary:text}).strict())}).strict();
export const eventInput=z.object({year_id:id,slug:id,event_date:z.string().max(100).nullable().default(null),sort_order:z.number().int().nonnegative().default(0),translations:translations(z.object({title}).strict())}).strict();
export const blockInput=z.object({id:id.optional(),type:z.enum(['subtitle','text','image']),sort_order:z.number().int().nonnegative(),media_id:id.nullable().default(null),translations:translations(z.object({content:text.optional(),caption:text.optional(),alt:text.optional()}).strict())}).strict().superRefine((b,ctx)=>{
 if((b.type==='image')!==Boolean(b.media_id))ctx.addIssue({code:'custom',message:'Only image blocks require media_id'});
 if(b.type!=='image'&&!Object.values(b.translations).some(t=>t.content?.trim()))ctx.addIssue({code:'custom',message:'Text/subtitle requires content'});
});
export const mediaInput=z.object({url:z.string().max(2000).refine(v=>/^https?:\/\//.test(v)||/^\/(?!\/)/.test(v),'Use http(s) or a root-relative URL'),metadata:z.record(z.unknown()).default({})}).strict();
export const siteInput=z.object({content_key:z.string().min(1).max(250).refine(k=>k.split('.').every(s=>/^[a-zA-Z0-9_-]+$/.test(s)&&!['__proto__','prototype','constructor'].includes(s))&&!/^timeline\.\d{4}(\.|$)/.test(k),'Invalid/reserved site key'),status:status.default('draft'),translations:translations(z.object({value:text}).strict())}).strict();
export function validate(schema,value){const result=schema.safeParse(value);if(!result.success)throw new HttpError(400,'Validation failed',result.error.issues);return result.data;}
export const aiInput=z.object({source_text:z.string().min(10).max(100000)}).strict();
