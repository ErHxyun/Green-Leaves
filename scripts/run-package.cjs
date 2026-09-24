const {spawnSync}=require('node:child_process');
const path=require('node:path');
const [target,...args]=process.argv.slice(2);
if(!['all','backend','frontend'].includes(target))throw Error('Unknown package');
const cli=process.env.npm_execpath || path.join(path.dirname(process.execPath),'node_modules/npm/bin/npm-cli.js');
for(const dir of target==='all'?['backend','frontend']:[target]){
 const command=dir==='frontend'&&args[0]==='test'?['test','--','--watchAll=false','--runInBand']:args;
 const result=spawnSync(process.execPath,[cli,...command],{cwd:path.resolve(__dirname,'..',dir),stdio:'inherit',windowsHide:true});
 if(result.status!==0)process.exit(result.status??1);
}
