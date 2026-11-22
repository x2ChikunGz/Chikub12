// "เสียงตัวเอง" — 2D vector
const HF='Kanit,Tahoma,sans-serif',DUR=66.32;
const bo=t=>{t=clamp(t);const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)};
const mix=(a,b,t)=>a+(b-a)*t;
function tx(c,s,x,y,size,col,al,st,sw){c.font='800 '+size+'px '+HF;c.textAlign=al||'center';c.textBaseline='alphabetic';if(st){c.lineWidth=sw||8;c.lineJoin='round';c.strokeStyle=st;c.strokeText(s,x,y)}c.fillStyle=col;c.fillText(s,x,y)}
function credit(c){c.save();c.fillStyle='rgba(10,8,30,.55)';rr(c,54,176,250,56,14);c.fill();tx(c,'@เรื่องสงสัย',179,216,34,'#fff');c.restore()}
// ---------- palette ----------
const P={nav1:'#1d2250',nav2:'#3b3470',moon:'#f3e7c3',amb:'#f2b84b',pink:'#e0809a',teal:'#6fc7c0',lav:'#b9a8ff',ink:'#1a1530',paper:'#f4ecdc',red:'#d6303c',cream:'#fff6e0'};
const FACES=[{skin:'#f1c6a0',hair:'#2b2230',st:0},{skin:'#d9a47a',hair:'#1a1420',st:1},{skin:'#f6d3b3',hair:'#8a5a3a',st:2},{skin:'#c68b63',hair:'#222034',st:3},{skin:'#efc19a',hair:'#b9b6b2',st:1},{skin:'#e3b08a',hair:'#3a2a24',st:2}];
// ---------- face ----------
function face(c,x,y,r,o){o=o||{};const F=o.f||FACES[0],t=o.t||0;c.save();c.translate(x,y);if(o.rot)c.rotate(o.rot);
 if(o.alpha!=null)c.globalAlpha=o.alpha;if(o.blur)c.filter='blur('+o.blur+'px)';
 const rx=r*.82,ry=r,ghost=o.mode==='ghost',trans=o.mode==='trans';
 const skin=ghost?'#e9edf6':F.skin;
 if(trans){c.globalAlpha=(o.alpha==null?1:o.alpha)*.9}
 // ears
 if(!trans){c.fillStyle=skin;c.beginPath();c.ellipse(-rx,r*.05,r*.13,r*.2,0,0,7);c.ellipse(rx,r*.05,r*.13,r*.2,0,0,7);c.fill()}
 // head
 c.beginPath();c.ellipse(0,0,rx,ry,0,0,7);
 if(trans){const g=rg(c,0,-ry*.3,r*.1,r*1.1,[[0,'rgba(200,220,255,.28)'],[1,'rgba(150,170,255,.10)']]);c.fillStyle=g;c.fill();c.lineWidth=r*.035;c.strokeStyle='rgba(215,230,255,.95)';c.stroke()}
 else{c.fillStyle=ghost?lg(c,0,-ry,0,ry,[[0,'#f4f6ff'],[1,'#b9c2dc']]):skin;c.fill();
  if(!ghost){c.save();c.clip();c.fillStyle='rgba(120,60,40,.13)';c.beginPath();c.ellipse(rx*.35,r*.25,rx*.9,ry*1.1,0,0,7);c.fill();c.restore()}}
 // hair
 if(!trans&&!ghost){c.fillStyle=F.hair;c.beginPath();
  if(F.st===0){c.ellipse(0,-ry*.28,rx*1.04,ry*.78,0,Math.PI,0);c.lineTo(rx*.7,-ry*.1);c.quadraticCurveTo(0,-ry*.5,-rx*.7,-ry*.1);c.closePath();c.fill()}
  else if(F.st===1){c.ellipse(0,-ry*.2,rx*1.12,ry*.95,0,Math.PI,0);c.lineTo(rx*1.12,ry*.55);c.lineTo(rx*.8,ry*.5);c.quadraticCurveTo(rx*.85,-ry*.4,0,-ry*.55);c.quadraticCurveTo(-rx*.85,-ry*.4,-rx*.8,ry*.5);c.lineTo(-rx*1.12,ry*.55);c.closePath();c.fill()}
  else if(F.st===2){c.ellipse(0,-ry*.3,rx*1.05,ry*.75,0,Math.PI,0);c.closePath();c.fill();c.beginPath();c.arc(0,-ry*1.02,r*.22,0,7);c.fill()}
  else{c.ellipse(0,-ry*.5,rx*.95,ry*.5,0,Math.PI,0);c.closePath();c.fill()}}
 if(ghost){c.fillStyle='rgba(25,25,50,.92)';c.beginPath();c.ellipse(0,-ry*.5,rx*1.1,ry*.55,0,Math.PI,0);c.lineTo(rx*.9,r*.9);c.lineTo(rx*.6,r*.4);c.quadraticCurveTo(0,-ry*.15,-rx*.6,r*.4);c.lineTo(-rx*.9,r*.9);c.closePath();c.fill()}
 // eyes
 const eyes=o.eyes||[[-.36,-.05,1],[.36,-.05,1]];
 for(let i=0;i<eyes.length;i++){const e=eyes[i],ex=e[0]*r,ey=e[1]*r,es=(e[2]||1)*r;const bl=o.noBlink?1:1-Math.max(0,1-Math.abs(((t*.7+(e[3]||0)+i*.13)%2.6)-.1)*12);
  const ew=es*.19,eh=es*.13*Math.max(.08,bl);
  if(ghost){c.fillStyle='#07060f';c.beginPath();c.ellipse(ex,ey+eh*.3,ew*1.15,es*.24*(.9+.1*Math.sin(t*2)),0,0,7);c.fill();continue}
  if(trans){c.fillStyle='rgba(20,20,70,.55)';c.beginPath();c.ellipse(ex,ey,ew*1.15,Math.max(eh*1.5,ew*.5),0,0,7);c.fill();c.strokeStyle='rgba(235,245,255,.95)';c.lineWidth=r*.03;c.stroke();c.fillStyle='rgba(235,245,255,.95)';c.beginPath();c.arc(ex+Math.sin(t*1.5+i)*ew*.3,ey,ew*.35,0,7);c.fill();continue}c.fillStyle='#fff';c.beginPath();c.ellipse(ex,ey,ew,eh,0,0,7);c.fill();
  const lx=(o.lookx!=null?o.lookx:Math.sin(t*.9+i*1.7)*.5)*ew*.5,ly=(o.looky!=null?o.looky:Math.cos(t*.7+i)*.3)*eh*.4;
  c.fillStyle=trans?'#2a3a7a':'#2a1d2a';c.beginPath();c.ellipse(ex+lx,ey+ly,ew*.5,Math.min(eh,ew*.5),0,0,7);c.fill();
  if(!trans){c.fillStyle='rgba(255,255,255,.9)';c.beginPath();c.arc(ex+lx-ew*.15,ey+ly-eh*.25,ew*.12,0,7);c.fill()}}
 // brows
 if(!ghost&&!o.noBrow){c.strokeStyle=trans?'rgba(215,230,255,.9)':F.hair;c.lineWidth=r*.04;c.lineCap='round';const bl=o.brow||0;
  for(const s of [-1,1]){c.beginPath();c.moveTo(s*r*.5,-r*.28-bl*r*.06);c.lineTo(s*r*.2,-r*.3+bl*r*.04*s*-1);c.stroke()}}
 // nose + mouth
 c.strokeStyle=ghost?'rgba(60,60,90,.5)':trans?'rgba(215,230,255,.9)':'rgba(120,60,40,.55)';c.lineWidth=r*.035;c.lineCap='round';
 c.beginPath();c.moveTo(0,r*.05);c.quadraticCurveTo(r*.09,r*.2,0,r*.24);c.stroke();
 const m=o.mouth||'smile';
 if(m==='hollow'){c.fillStyle='#07060f';c.beginPath();c.ellipse(0,r*.55,r*.12,r*.2*(1+.2*Math.sin(t*3)),0,0,7);c.fill()}
 else if(m==='o'){c.fillStyle='rgba(90,30,40,.85)';c.beginPath();c.ellipse(0,r*.5,r*.09,r*.11,0,0,7);c.fill()}
 else if(m==='flat'){c.beginPath();c.moveTo(-r*.17,r*.5);c.lineTo(r*.17,r*.5);c.stroke()}
 else{c.beginPath();c.moveTo(-r*.22,r*.45);c.quadraticCurveTo(0,r*.62,r*.22,r*.45);c.stroke()}
 if(!ghost&&!trans&&o.cheek!==0){c.fillStyle='rgba(230,110,110,.22)';c.beginPath();c.ellipse(-r*.5,r*.33,r*.1,r*.06,0,0,7);c.ellipse(r*.5,r*.33,r*.1,r*.06,0,0,7);c.fill()}
 c.restore()}
// ---------- bits ----------
function person(c,x,y,s,col,hc){c.fillStyle=col||'#2a2548';c.beginPath();c.arc(x,y-s*.62,s*.22,0,7);c.fill();c.beginPath();c.moveTo(x-s*.34,y);c.quadraticCurveTo(x-s*.34,y-s*.36,x,y-s*.36);c.quadraticCurveTo(x+s*.34,y-s*.36,x+s*.34,y);c.closePath();c.fill()}
function crowd(c,x0,y,n,sp,sc,scroll,cols){for(let i=-1;i<=n;i++){let x=x0+((i*sp+scroll)%(sp*(n+2)))-sp;if(x<x0-sp)x+=sp*(n+2);person(c,x,y,sc*(0.9+hash(i*3.1)*.25),cols?cols[((i%cols.length)+cols.length)%cols.length]:'#2a2548')}}
function brain(c,x,y,s,t,col){c.save();c.translate(x,y);c.scale(s,s*(1+.02*Math.sin(t*3)));c.fillStyle=col||'#f08aa4';const B=[[-60,0,52],[-25,-35,50],[28,-35,50],[62,-2,50],[-48,32,46],[8,48,50],[52,34,44],[0,-2,58]];for(const b of B){c.beginPath();c.arc(b[0],b[1],b[2],0,7);c.fill()}
 c.strokeStyle='rgba(150,40,80,.5)';c.lineWidth=5;c.lineCap='round';for(const [a,b,cx_,cy_] of [[-50,-20,-10,-5],[10,-45,30,-5],[-30,25,15,35],[35,10,55,25],[-70,10,-45,28],[0,-10,5,22]]){c.beginPath();c.moveTo(a,b);c.quadraticCurveTo((a+cx_)/2+10,(b+cy_)/2-12,cx_,cy_);c.stroke()}c.restore()}
function paper(c,x,y,w,h,ang,col,sh){c.save();c.translate(x,y);c.rotate(ang||0);if(sh!==0){c.fillStyle='rgba(8,6,30,.28)';rr(c,-w/2+8,-h/2+14,w,h,22);c.fill()}c.fillStyle=col||P.paper;rr(c,-w/2,-h/2,w,h,22);c.fill();c.restore()}
function stamp(c,s,x,y,ang,col,k,sub){c.save();c.translate(x,y);c.rotate(ang);const w=(c.font='800 78px '+HF,c.measureText(s).width)+70;c.scale(k,k);c.globalAlpha=clamp(k*1.4);c.strokeStyle=col;c.lineWidth=12;rr(c,-w/2,-70,w,140,22);c.stroke();c.fillStyle=col;tx(c,s,0,30,78,col);if(sub){tx(c,sub,0,100,34,col)}c.restore()}
function dreamCloud(c,cx,cy,rx,ry,t,fn,tint){c.save();const gl=rg(c,cx,cy,rx*.2,rx*1.5,[[0,'rgba(230,170,255,.40)'],[1,'rgba(230,170,255,0)']]);c.fillStyle=gl;c.fillRect(cx-rx*1.6,cy-rx*1.6,rx*3.2,rx*3.2);
 const bumps=[];for(let i=0;i<14;i++){const a=i/14*Math.PI*2;bumps.push([cx+Math.cos(a)*rx*.8,cy+Math.sin(a)*ry*.8,rx*.3+hash(i*7.3)*rx*.08])}
 c.beginPath();for(const b of bumps){c.moveTo(b[0]+b[2],b[1]);c.arc(b[0],b[1],b[2],0,7)}c.ellipse(cx,cy,rx*.85,ry*.85,0,0,7);c.fillStyle=tint||'#f1e9ff';c.fill();
 c.save();c.beginPath();c.ellipse(cx,cy,rx*.9,ry*.9,0,0,7);c.clip();c.fillStyle=lg(c,0,cy-ry,0,cy+ry,[[0,'#8e78d8'],[1,'#d89ad0']]);c.fillRect(cx-rx,cy-ry,rx*2,ry*2);if(fn)fn(c,cx,cy,Math.min(rx,ry));c.restore();c.restore()}
function bubbles(c,x0,y0,x1,y1,t){for(let i=0;i<3;i++){const k=(i+1)/4,x=mix(x0,x1,k),y=mix(y0,y1,k),r=10+i*11+Math.sin(t*2+i)*1.5;c.fillStyle='#f1e9ff';c.beginPath();c.arc(x,y,r,0,7);c.fill()}}
function stars(c,n,seed,t,y1){const R=mulberry32(seed);for(let i=0;i<n;i++){const x=R()*W,y=R()*y1,s=1.5+R()*2.4,a=.35+.5*Math.abs(Math.sin(t*1.3+i));c.fillStyle='rgba(255,246,214,'+a+')';c.beginPath();c.arc(x,y,s,0,7);c.fill()}}
function nightBG(c,t){c.fillStyle=lg(c,0,0,0,H,[[0,P.nav1],[.6,P.nav2],[1,'#241d48']]);c.fillRect(0,0,W,H);stars(c,50,5,t,900)}
function zzz(c,x,y,t){for(let i=0;i<3;i++){const p=((t*.5+i/3)%1),a=Math.sin(p*Math.PI);c.save();c.globalAlpha=a*.9;tx(c,'z',x-p*60-i*8,y-p*180,34+i*14+p*14,P.cream);c.restore()}}
