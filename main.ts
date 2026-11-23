import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
const A="014000009999999900000000000000090009999999999999222209999999999900999999999999990000",B="01146abf0000000099999995999599909990000000000000044000000000000058000000000000004414",F=[(a,b)=>(a+b)|0,(a,b)=>(a-b)|0,Math.imul,(a,b)=>a==-2147483648&&b==-1?a:(a/b)|0,(a,b)=>b==-1?0:a%b|0,(a,b)=>Math.floor((a>>>0)/(b>>>0))|0,(a,b)=>(a>>>0)%(b>>>0)|0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>(a>>>(b&31))|0,(a,b)=>a==b?1:0,(a,b)=>a<b?1:0,(a,b)=>(a>>>0)<(b>>>0)|0],I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
for(const d of readdirSync(I).sort()){
const P=readFileSync(I+'/'+d+'/program.bin'),N=readFileSync(I+'/'+d+'/input.bin'),n=P.length;
let D=new Int32Array(256),M=new Int32Array(256),C=new Int32Array(64),s=0,c=0,p=0,t=0,o=new Uint8Array(65536),l=0,i=0,e=0;
R:for(;;){
if(t==1e6){e=10;break}
if(p<0||p>=n){e=9;break}
let b=P[p],m=A.charCodeAt(b)-48;
if(!(m<=4)){e=5;break}
if(p+m>=n){e=9;break}
t++;
let q=B.charCodeAt(b)-48;q=q>48?q-39:q;
if(s<(q>>2)){e=2;break}
if(s-(q>>2)+(q&3)>256){e=3;break}
p+=1+m;
switch(b){
case 0:e=0;break R;
case 1:D[s++]=(P[p-1]<<24)>>24;break;
case 2:D[s++]=P[p-4]|P[p-3]<<8|P[p-2]<<16|P[p-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{let x=D[s-1];D[s-1]=D[s-2];D[s-2]=x;break}
case 6:D[s]=D[s-2];s++;break;
case 7:{let a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:{
let r=((P[p-2]|P[p-1]<<8)<<16)>>16;
if(b<49||(b==49?D[--s]==0:D[--s]!=0))p+=r;
break}
case 51:if(c==64){e=7;break R}C[c++]=p;p=P[p-2]|P[p-1]<<8;break;
case 52:if(!c){e=8;break R}p=C[--c];break;
case 64:{let a=D[s-1];if(a<0||a>255){e=6;break R}D[s-1]=M[a];break}
case 65:{let a=D[s-1];if(a<0||a>255){e=6;break R}M[a]=D[s-2];s-=2;break}
case 80:{let y=Buffer.from(String(D[s-1]));if(l+y.length>65536){e=11;break R}s--;o.set(y,l);l+=y.length;break}
case 81:if(l>65535){e=11;break R}o[l++]=D[--s]&255;break;
case 82:D[s++]=i<N.length?N[i++]:-1;break;
case 83:e=D[--s]&255;break R;
default:{
let a=D[s-2],y=D[s-1];
if(b>18&&b<23&&!y){e=4;break R}
s-=2;D[s++]=F[b<23?b-16:b<28?b-17:b<32?b-18:b-19](a,y);
}}}
mkdirSync(O+'/'+d,{recursive:true});
writeFileSync(O+'/'+d+'/stdout.bin',o.slice(0,l));
writeFileSync(O+'/'+d+'/exit.txt',e+'\n');
}
