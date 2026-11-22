// ---------- engine: utils, noise, camera, post ----------
const W=1080,H=1920;
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const lerp=(a,b,t)=>a+(b-a)*t;
const sm=t=>{t=clamp(t);return t*t*(3-2*t)};
const eio=t=>{t=clamp(t);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
const eo=t=>1-Math.pow(1-clamp(t),3);
const ei=t=>{t=clamp(t);return t*t*t};
function hash(n){const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s)}
function noise(x,seed=0){const i=Math.floor(x),f=x-i;const a=hash(i+seed*17.3),b=hash(i+1+seed*17.3);const u=f*f*(3-2*f);return lerp(a,b,u)*2-1}
function fbm(x,seed=0){return noise(x,seed)*.6+noise(x*2.1,seed+3)*.3+noise(x*4.3,seed+7)*.1}
// keyframes: arr of [t,v] ; eased
function kf(t,a,ez=sm){if(t<=a[0][0])return a[0][1];for(let i=1;i<a.length;i++){if(t<a[i][0]){const p=a[i-1],q=a[i];return lerp(p[1],q[1],ez((t-p[0])/(q[0]-p[0])))}}return a[a.length-1][1]}
function mk(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c}
function rr(c,x,y,w,h,r){r=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function lg(c,x0,y0,x1,y1,st){const g=c.createLinearGradient(x0,y0,x1,y1);st.forEach(s=>g.addColorStop(s[0],s[1]));return g}
function rg(c,x,y,r0,r1,st){const g=c.createRadialGradient(x,y,r0,x,y,r1);st.forEach(s=>g.addColorStop(s[0],s[1]));return g}
// noise tile for texture
let NZ=null;
function noiseTile(){if(NZ)return NZ;const c=mk(256,256),x=c.getContext('2d'),im=x.createImageData(256,256),r=mulberry32(99);for(let i=0;i<256*256;i++){const v=128+(r()-.5)*255*.9;im.data[i*4]=im.data[i*4+1]=im.data[i*4+2]=v;im.data[i*4+3]=255}x.putImageData(im,0,0);NZ=c;return c}
function texFill(c,x,y,w,h,alpha,mode='overlay',sc=1,ox=0,oy=0){const t=noiseTile();c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.globalAlpha=alpha;c.globalCompositeOperation=mode;const pat=c.createPattern(t,'repeat');c.translate(x+ox,y+oy);c.scale(sc,sc);c.fillStyle=pat;c.fillRect(-ox/sc,-oy/sc,w/sc+256,h/sc+256);c.restore()}
// soft blurred shadow blob
function shadow(c,x,y,w,h,a,blur){c.save();c.filter='blur('+blur+'px)';c.fillStyle='rgba(0,0,0,'+a+')';c.beginPath();c.ellipse(x,y,w/2,h/2,0,0,7);c.fill();c.restore()}
