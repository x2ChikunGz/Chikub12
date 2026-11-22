// "เสียงตัวเอง" — 2D vector
const HF='Kanit,Tahoma,sans-serif',DUR=87.92;
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
// ---------- helpers (voice) ----------
const F0=FACES[0];
const SH=[];
function shot(a,b,fn,o){SH.push({a,b,fn,o:o||{}})}
function plainBG(c,a,b){c.fillStyle=lg(c,0,0,0,H,[[0,a],[1,b]]);c.fillRect(0,0,W,H)}
const bz=(p0,p1,p2,p3,u)=>{const v=1-u;return [v*v*v*p0[0]+3*v*v*u*p1[0]+3*v*u*u*p2[0]+u*u*u*p3[0],v*v*v*p0[1]+3*v*v*u*p1[1]+3*v*u*u*p2[1]+u*u*u*p3[1]]};
function waveLine(c,x0,x1,y,amp,fr,ph,col,lw){c.strokeStyle=col;c.lineWidth=lw||10;c.lineCap='round';c.lineJoin='round';c.beginPath();for(let x=x0;x<=x1;x+=5){const u=(x-x0)/(x1-x0),env=Math.sin(u*Math.PI),yy=y+Math.sin(u*fr*Math.PI*2+ph)*amp*(.3+.7*env);x===x0?c.moveTo(x,yy):c.lineTo(x,yy)}c.stroke()}
function chip(c,s,x,y,col,size,tc,k){c.save();c.translate(x,y);if(k!=null)c.scale(k,k);c.font='800 '+size+'px '+HF;const w=c.measureText(s).width+60;c.fillStyle=col;rr(c,-w/2,-size*.85,w,size*1.55,size*.55);c.fill();tx(c,s,0,size*.25,size,tc||'#1a1530');c.restore()}
function heart(c,x,y,s,col){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle=col;c.beginPath();c.moveTo(0,.9);c.bezierCurveTo(-1.25,.1,-.9,-.9,0,-.35);c.bezierCurveTo(.9,-.9,1.25,.1,0,.9);c.fill();c.restore()}
function check(c,x,y,s,col,k){c.save();c.translate(x,y);c.scale(k,k);c.fillStyle=col;c.beginPath();c.arc(0,0,s,0,7);c.fill();c.strokeStyle='#fff';c.lineWidth=s*.22;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(-s*.45,0);c.lineTo(-s*.1,s*.36);c.lineTo(s*.5,-s*.34);c.stroke();c.restore()}
function cross(c,x,y,s,col,k){c.save();c.translate(x,y);c.scale(k,k);c.strokeStyle='#fff';c.lineWidth=s*.5;c.lineCap='round';c.beginPath();c.moveTo(-s,-s);c.lineTo(s,s);c.moveTo(s,-s);c.lineTo(-s,s);c.stroke();c.strokeStyle=col;c.lineWidth=s*.3;c.beginPath();c.moveTo(-s,-s);c.lineTo(s,s);c.moveTo(s,-s);c.lineTo(-s,s);c.stroke();c.restore()}
function phone(c,x,y,w,h,t,o){o=o||{};c.save();c.translate(x,y);c.fillStyle='rgba(8,6,30,.35)';rr(c,-w/2+10,-h/2+18,w,h,50);c.fill();c.fillStyle='#120e2c';rr(c,-w/2,-h/2,w,h,50);c.fill();
 c.fillStyle=lg(c,0,-h/2,0,h/2,[[0,'#43378a'],[1,'#261e58']]);rr(c,-w/2+16,-h/2+16,w-32,h-32,38);c.fill();
 c.fillStyle='rgba(255,255,255,.12)';rr(c,-w/2+40,-h/2+44,w-80,34,17);c.fill();c.fillStyle=P.red;c.beginPath();c.arc(-w/2+64,-h/2+61,9,0,7);c.fill();
 const n=20,pl=o.play==null?.45:o.play;for(let i=0;i<n;i++){const bx=-w/2+54+i*((w-108)/(n-1)),a=(o.still?.6:(.55+.45*Math.sin(t*6+i*.8)*Math.sin(t*2.7+i*.35)))*(h*.30)*(.45+.55*Math.abs(Math.sin(i*.9+1)));c.fillStyle=i/n<pl?P.amb:'rgba(255,255,255,.42)';rr(c,bx-7,-a/2+10,14,Math.max(10,a),7);c.fill()}
 c.fillStyle='rgba(255,255,255,.25)';rr(c,-w/2+54,h/2-120,w-108,10,5);c.fill();c.fillStyle=P.amb;rr(c,-w/2+54,h/2-120,(w-108)*pl,10,5);c.fill();
 c.restore()}
// head in side profile; s = scale. returns key points
function headPts(x,y,s){return{M:[x+.93*s,y+.5*s],E:[x-.32*s,y+.12*s],C:[x-.3*s,y+.1*s],T:[x+.72*s,y+.5*s]}}
function headSide(c,x,y,s,o){o=o||{};const t=o.t||0,xr=o.xray;c.save();c.translate(x,y);
 // shirt + neck
 c.fillStyle=xr?'rgba(190,175,255,.18)':'#5b6fa8';c.beginPath();c.moveTo(-1.4*s,2.0*s);c.quadraticCurveTo(-1.3*s,1.25*s,-.4*s,1.2*s);c.lineTo(.4*s,1.2*s);c.quadraticCurveTo(1.2*s,1.25*s,1.3*s,2.0*s);c.closePath();c.fill();
 c.fillStyle=xr?'rgba(190,175,255,.20)':F0.skin;c.fillRect(-.32*s,.7*s,.62*s,.62*s);
 // head
 c.beginPath();c.ellipse(0,0,.95*s,1.08*s,0,0,7);if(xr){c.fillStyle=rg(c,0,-.2*s,.1*s,1.2*s,[[0,'rgba(210,200,255,.30)'],[1,'rgba(160,150,255,.12)']]);c.fill();c.lineWidth=s*.04;c.strokeStyle='rgba(235,230,255,.95)';c.stroke()}else{c.fillStyle=F0.skin;c.fill()}
 // nose
 c.fillStyle=xr?'rgba(210,200,255,.25)':F0.skin;c.beginPath();c.moveTo(.88*s,-.12*s);c.lineTo(1.13*s,.28*s);c.lineTo(.85*s,.3*s);c.closePath();c.fill();if(xr){c.stroke()}
 if(xr){ // skull + brain
  c.save();c.strokeStyle='rgba(255,255,255,.9)';c.lineWidth=s*.035;c.setLineDash([s*.12,s*.08]);c.beginPath();c.ellipse(0,-.08*s,.78*s,.92*s,0,0,7);c.stroke();c.restore();
  c.fillStyle='rgba(240,138,164,.55)';c.beginPath();c.ellipse(.02*s,-.38*s,.58*s,.4*s,0,0,7);c.fill()}
 else{ // hair
  c.fillStyle=F0.hair;c.beginPath();c.moveTo(-.96*s,.0);c.ellipse(0,-.05*s,.96*s,1.05*s,0,Math.PI,Math.PI*2);c.quadraticCurveTo(.5*s,-.52*s,.0,-.38*s);c.quadraticCurveTo(-.5*s,-.3*s,-.96*s,.1*s);c.closePath();c.fill()}
 // ear
 c.fillStyle=xr?'rgba(210,200,255,.15)':'#e0b088';c.beginPath();c.ellipse(-.32*s,.12*s,.15*s,.26*s,0,0,7);c.fill();if(xr)c.stroke();
 // eye + brow + mouth
 if(!xr){c.fillStyle='#fff';c.beginPath();c.ellipse(.55*s,-.1*s,.09*s,.07*s*(o.blink?.2:1),0,0,7);c.fill();c.fillStyle='#2a1d2a';c.beginPath();c.arc(.58*s,-.1*s,.045*s,0,7);c.fill();c.strokeStyle=F0.hair;c.lineWidth=s*.035;c.lineCap='round';c.beginPath();c.moveTo(.42*s,-.27*s);c.lineTo(.7*s,-.26*s);c.stroke()}
 const mo=o.talk?(.5+.5*Math.sin(t*14))*.07*s+.02*s:.015*s;c.fillStyle='rgba(90,30,40,.9)';c.beginPath();c.ellipse(.9*s,.5*s,.07*s,mo+.02*s,0,0,7);c.fill();
 // cochlea
 if(o.cochlea){const k=o.cochlea;c.save();c.translate(-.3*s,.1*s);c.scale(k,k);c.strokeStyle=P.amb;c.lineWidth=s*.05;c.lineCap='round';c.beginPath();for(let a=0;a<12;a+=.2){const r=s*(.03+a*.012);const px=Math.cos(a)*r,py=Math.sin(a)*r;a===0?c.moveTo(px,py):c.lineTo(px,py)}c.stroke();c.restore()}
 c.restore()}
function pathDraw(c,P0,P1,P2,P3,col,lw,t,alpha,dots){c.save();c.globalAlpha=alpha;c.strokeStyle=col;c.lineWidth=lw;c.lineCap='round';c.setLineDash([lw*2.2,lw*1.8]);c.lineDashOffset=-t*lw*7;c.beginPath();c.moveTo(P0[0],P0[1]);c.bezierCurveTo(P1[0],P1[1],P2[0],P2[1],P3[0],P3[1]);c.stroke();c.setLineDash([]);
 if(dots){for(let i=0;i<dots;i++){const u=((t*.45+i/dots)%1),p=bz(P0,P1,P2,P3,u);c.fillStyle=col;c.globalAlpha=alpha*Math.sin(u*Math.PI);c.beginPath();c.arc(p[0],p[1],lw*1.3,0,7);c.fill()}}c.restore()}
function airPath(h,s){const p=headPts(h[0],h[1],s);return [p.M,[h[0]+1.75*s,h[1]+1.9*s],[h[0]-1.45*s,h[1]+2.05*s],[h[0]-.52*s,h[1]+.28*s]]}
function bonePath(h,s){const p=headPts(h[0],h[1],s);return [p.T,[h[0]+.36*s,h[1]+.82*s],[h[0]-.12*s,h[1]+.72*s],[h[0]-.3*s,h[1]+.2*s]]}
function rings(c,x,y,t,col,n,max){c.save();c.strokeStyle=col;c.lineCap='round';for(let i=0;i<n;i++){const u=((t*.9+i/n)%1);c.globalAlpha=(1-u)*.8;c.lineWidth=8*(1-u)+2;c.beginPath();c.arc(x,y,20+u*max,-.8,.8);c.stroke()}c.restore()}
function mic(c,x,y,s,t,on){c.save();c.translate(x,y);c.fillStyle='#3a3068';rr(c,-s*.07,s*.4,s*.14,s*.9,s*.05);c.fill();rr(c,-s*.35,s*1.2,s*.7,s*.12,s*.06);c.fill();c.strokeStyle='#6a5fb0';c.lineWidth=s*.08;c.beginPath();c.arc(0,s*.05,s*.42,.1,Math.PI-.1);c.stroke();
 c.fillStyle=on?lg(c,0,-s*.5,0,s*.4,[[0,'#ffe8a8'],[1,'#f2b84b']]):'#8a82b8';rr(c,-s*.26,-s*.6,s*.52,s*.9,s*.26);c.fill();c.strokeStyle='rgba(60,40,10,.35)';c.lineWidth=3;for(let i=0;i<4;i++){c.beginPath();c.moveTo(-s*.2,-s*.4+i*s*.18);c.lineTo(s*.2,-s*.4+i*s*.18);c.stroke()}
 if(on){c.fillStyle=P.red;c.beginPath();c.arc(s*.36,-s*.56,s*.07*(1+.3*Math.sin(t*8)),0,7);c.fill()}c.restore()}
function studyCard(c,t,lt,x,y,k,lock){c.save();c.translate(x,y);c.scale(k,k);paper(c,0,0,780,520,-.02,P.paper);
 c.fillStyle='#d9cfe8';rr(c,-310,-190,160,200,14);c.fill();c.fillStyle='#8a7aa0';for(let i=0;i<5;i++)rr(c,-290,-165+i*34,120-(i%2)*30,14,7),c.fill();
 tx(c,'งานวิจัย',60,-120,76,P.ink,'center');tx(c,'RESEARCH',60,-70,34,'#8a7aa0','center');
 c.fillStyle='#e4daf0';for(let i=0;i<3;i++){rr(c,-310,40+i*50,620-i*90,26,13);c.fill()}
 if(lock!=null){const lk=lock;c.save();c.translate(190,170);c.fillStyle=P.amb;rr(c,-62,-30,124,100,18);c.fill();c.strokeStyle=P.amb;c.lineWidth=18;c.beginPath();c.arc(0,-30,38,Math.PI,0);if(lk>0){c.stroke();}else c.stroke();c.fillStyle=P.ink;c.beginPath();c.arc(0,18,13,0,7);c.fill();c.restore()}
 c.restore()}

// ---------- helpers (price) ----------
function tag(c,x,y,s,col,rot,k,fs,tc){c.save();c.translate(x,y);c.rotate(rot||0);const kk=k==null?1:k;c.scale(kk,kk);fs=fs||150;c.font='800 '+fs+'px '+HF;const w=Math.max(c.measureText(s).width+110,fs*1.9),h=fs*1.6;
 c.strokeStyle='rgba(255,255,255,.75)';c.lineWidth=6;c.beginPath();c.moveTo(0,-h/2-80);c.lineTo(0,-h/2+30);c.stroke();
 c.fillStyle='rgba(8,6,30,.3)';rr(c,-w/2+10,-h/2+14,w,h,34);c.fill();c.fillStyle=col;rr(c,-w/2,-h/2,w,h,34);c.fill();
 c.fillStyle='rgba(20,16,50,.55)';c.beginPath();c.arc(0,-h/2+34,15,0,7);c.fill();
 tx(c,s,0,fs*.3+18,fs,tc||'#1a1530');c.restore()}
function coin(c,x,y,r,s,k){c.save();c.translate(x,y);c.scale(k,k);c.fillStyle=P.amb;c.beginPath();c.arc(0,0,r,0,7);c.fill();c.strokeStyle='#c98a1d';c.lineWidth=r*.1;c.beginPath();c.arc(0,0,r*.8,0,7);c.stroke();tx(c,s,0,r*.34,r*.95,'#7a4a08');c.restore()}
function cup(c,x,y,s,col,o){o=o||{};c.save();c.translate(x,y);c.fillStyle='rgba(8,6,30,.3)';c.beginPath();c.ellipse(0,s*.52,s*.45,s*.08,0,0,7);c.fill();
 c.fillStyle='#f4ecdc';c.beginPath();c.moveTo(-s*.4,-s*.4);c.lineTo(s*.4,-s*.4);c.lineTo(s*.3,s*.5);c.lineTo(-s*.3,s*.5);c.closePath();c.fill();
 c.fillStyle=col;c.beginPath();c.moveTo(-s*.37,-s*.12);c.lineTo(s*.37,-s*.12);c.lineTo(s*.32,s*.24);c.lineTo(-s*.32,s*.24);c.closePath();c.fill();
 c.fillStyle='#3a2f60';rr(c,-s*.46,-s*.52,s*.92,s*.14,s*.06);c.fill();
 if(o.steam){c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=s*.04;c.lineCap='round';for(let i=-1;i<=1;i++){c.beginPath();for(let j=0;j<=12;j++){const yy=-s*.6-j*s*.05,xx=i*s*.18+Math.sin(j*.7+o.t*3+i)*s*.05;j?c.lineTo(xx,yy):c.moveTo(xx,yy)}c.stroke()}}
 c.restore()}
function donut(c,x,y,r,pct,col,k,lab){c.save();c.translate(x,y);c.scale(k,k);c.lineWidth=r*.28;c.strokeStyle='rgba(255,255,255,.22)';c.beginPath();c.arc(0,0,r,0,7);c.stroke();c.strokeStyle=col;c.lineCap='round';c.beginPath();c.arc(0,0,r,-Math.PI/2,-Math.PI/2+Math.PI*2*pct);c.stroke();tx(c,lab,0,r*.3,r*.78,'#fff','center',P.nav1,10);c.restore()}
function brain2(c,x,y,r,t,o){o=o||{};c.save();c.translate(x,y);c.scale(1+.02*Math.sin(t*3),1+.02*Math.sin(t*3));c.fillStyle='#f08aa4';c.beginPath();c.ellipse(-r*.32,0,r*.62,r*.78,0,0,7);c.ellipse(r*.32,0,r*.62,r*.78,0,0,7);c.fill();c.fillStyle='#f6a6bc';c.beginPath();c.ellipse(-r*.3,-r*.12,r*.45,r*.55,0,0,7);c.ellipse(r*.3,-r*.12,r*.45,r*.55,0,0,7);c.fill();
 c.strokeStyle='#c8587a';c.lineWidth=r*.05;c.lineCap='round';for(let i=0;i<4;i++){c.beginPath();c.moveTo(-r*.7+i*.05*r,-r*.4+i*r*.28);c.quadraticCurveTo(-r*.4,-r*.5+i*r*.28,-r*.1,-r*.35+i*r*.28);c.moveTo(r*.7-i*.05*r,-r*.4+i*r*.28);c.quadraticCurveTo(r*.4,-r*.5+i*r*.28,r*.1,-r*.35+i*r*.28);c.stroke()}
 c.beginPath();c.moveTo(0,-r*.7);c.lineTo(0,r*.7);c.stroke();
 if(o.eyes){c.fillStyle='#fff';c.beginPath();c.arc(-r*.28,r*.05,r*.13,0,7);c.arc(r*.28,r*.05,r*.13,0,7);c.fill();c.fillStyle='#2a1d2a';const lx=(o.lookx||0)*r*.06;c.beginPath();c.arc(-r*.28+lx,r*.05,r*.06,0,7);c.arc(r*.28+lx,r*.05,r*.06,0,7);c.fill()}
 c.restore()}
function shirt(c,x,y,s,col){c.save();c.translate(x,y);c.fillStyle='rgba(8,6,30,.25)';c.beginPath();c.ellipse(0,s*.6,s*.5,s*.07,0,0,7);c.fill();c.fillStyle=col;c.beginPath();c.moveTo(-s*.18,-s*.5);c.lineTo(-s*.55,-s*.28);c.lineTo(-s*.4,-s*.02);c.lineTo(-s*.3,-s*.1);c.lineTo(-s*.3,s*.5);c.lineTo(s*.3,s*.5);c.lineTo(s*.3,-s*.1);c.lineTo(s*.4,-s*.02);c.lineTo(s*.55,-s*.28);c.lineTo(s*.18,-s*.5);c.quadraticCurveTo(0,-s*.36,-s*.18,-s*.5);c.closePath();c.fill();c.restore()}
function shop(c,x,y,s,t){c.save();c.translate(x,y);c.fillStyle='#e9dfc9';rr(c,-s*.6,-s*.15,s*1.2,s*.9,14);c.fill();
 for(let i=0;i<8;i++){c.fillStyle=i%2?'#fff4dc':P.red;c.beginPath();c.moveTo(-s*.7+i*s*.175,-s*.5);c.lineTo(-s*.7+(i+1)*s*.175,-s*.5);c.lineTo(-s*.65+(i+1)*s*.175,-s*.1);c.lineTo(-s*.65+i*s*.175,-s*.1);c.closePath();c.fill()}
 c.fillStyle='#6a5ba8';rr(c,-s*.15,s*.1,s*.3,s*.65,10);c.fill();c.fillStyle='#bfe6f0';rr(c,-s*.5,s*.05,s*.28,s*.3,8);c.fill();rr(c,s*.22,s*.05,s*.28,s*.3,8);c.fill();c.restore()}
function lightbulb(c,x,y,r){c.save();c.translate(x,y);c.fillStyle=P.amb;c.beginPath();c.arc(0,0,r,0,7);c.fill();c.fillStyle='#8a7aa0';rr(c,-r*.4,r*.9,r*.8,r*.4,6);c.fill();c.restore()}
function bg1(c,t,seed){plainBG(c,'#2a2150','#4a3a80');stars(c,30,seed,t,1000)}
function bg2(c,t,seed){plainBG(c,'#15405a','#2a2d6a');stars(c,30,seed,t,1000)}
function pop(lt,t0,d){return bo((lt-t0)/(d||.3))}

// ---------- shots ----------
shot(0,4.9,(c,t,lt)=>{bg1(c,t,3);
 const q=lt>1.47?pop(lt,1.47):0;
 tag(c,330,830,'99',P.amb,Math.sin(t*2.2)*.07,1,170);
 tag(c,760,830,'100',lt>4.04?'#8a82b8':'#6fc7c0',Math.sin(t*2.2+2)*.07,1,170);
 if(q>0){c.save();c.translate(540,430);c.scale(q,q);tx(c,'?',0,90,300,'#fff','center',P.nav1,16);c.restore()}
 if(lt>3.7){cross(c,760,830,60,P.red,pop(lt,4.04,.25))}
 if(lt<1.47){c.save();c.globalAlpha=1;tx(c,'฿',540,1230,90,'rgba(255,255,255,.18)');c.restore()}});
shot(4.9,8.2,(c,t,lt)=>{bg2(c,t,5);
 const p=clamp((lt-.8)/.75);c.fillStyle='rgba(255,255,255,.22)';rr(c,120,560,840,34,17);c.fill();c.fillStyle=P.amb;rr(c,120,560,840*p,34,17);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(120+840*p,577,30,0,7);c.fill();
 tx(c,'จบ',960,650,40,'#fff','right');
 if(lt>1.9){const k=pop(lt,1.9);tag(c,190,1010,'99',P.amb,0,k,70);c.save();c.globalAlpha=clamp(k);tx(c,'+',350,1030,90,'#fff');c.restore();coin(c,500,1005,70,'1',k);c.save();c.globalAlpha=clamp(k);tx(c,'=',650,1030,90,'#fff');c.restore();tag(c,860,1010,'100',P.mint||'#6fc7c0',0,k,70)}});
shot(8.2,11.2,(c,t,lt)=>{bg1(c,t,8);const k=pop(lt,.1);c.save();c.translate(540,820);c.scale(k,k);shop(c,0,0,520,t);c.restore();
 if(lt>1.3){const q=pop(lt,1.3);c.save();c.translate(540,1170);c.scale(q,q);face(c,0,0,120,{f:FACES[2],t,mouth:'flat',cheek:0,looky:.3});c.fillStyle=F0.skin;rr(c,-14,70,28,60,12);c.fill();c.restore();chip(c,'ชู่ว...',800,1120,P.amb,56,P.ink,q)}});
shot(11.2,13.7,(c,t,lt)=>{bg2(c,t,11);const k=pop(lt,.6);tag(c,540,780,'100',lt>1.2?'#8a82b8':'#6fc7c0',Math.sin(t*2)*.05,k,170);
 if(lt>1.4){const u=clamp((lt-1.4)/.2);c.strokeStyle=P.red;c.lineWidth=16;c.lineCap='round';c.beginPath();c.moveTo(300,690);c.lineTo(300+480*u,690+170*u);c.stroke()}
 if(lt>1.6)chip(c,'-1 ฿',540,1130,P.red,80,'#fff',pop(lt,1.6))});
shot(13.7,16.6,(c,t,lt)=>{bg1(c,t,13);const k=pop(lt,.1);c.save();c.translate(540,760);c.scale(k,k);brain2(c,0,0,260,t,{eyes:true,lookx:Math.sin(t)});c.restore();
 if(lt>1.2){const q=pop(lt,1.2);c.save();c.translate(540,1160);c.scale(q,q);tx(c,'-1 ฿',-110,0,100,'#fff','center',P.nav1,10);cross(c,170,-30,44,P.red,1);c.restore()}});
shot(16.6,19.0,(c,t,lt)=>{bg2(c,t,16);
 paper(c,540,760,860,420,0,P.paper);tx(c,'99',540,880,300,P.ink);c.fillStyle='rgba(242,184,75,.45)';rr(c,215,560,300,300,24);c.fill();tx(c,'99',540,880,300,P.ink);
 const u=eo(clamp((lt-.5)/1.4));c.strokeStyle=P.red;c.lineWidth=14;c.lineCap='round';c.beginPath();c.moveTo(180,1010);c.lineTo(180+700*u,1010);c.stroke();if(u>.02){c.fillStyle=P.red;c.beginPath();c.moveTo(180+700*u+34,1010);c.lineTo(180+700*u-8,985);c.lineTo(180+700*u-8,1035);c.fill()}
 if(lt>.3)chip(c,'อ่านจากซ้าย',300,1130,'#fff',52,P.ink,pop(lt,.3));if(lt>1.4)chip(c,'ไปขวา',780,1130,P.amb,52,P.ink,pop(lt,1.4))});
shot(19.0,22.8,(c,t,lt)=>{bg1(c,t,19);
 tag(c,330,760,'100',lt>1.8?'#8a82b8':'#6fc7c0',Math.sin(t*2)*.04,1,150);
 const k=pop(lt,.2);tag(c,770,760,'99',P.amb,Math.sin(t*2+1)*.05,1+.06*Math.sin(t*5),150);
 if(lt>.3){rings(c,770,760,t,'#fff6c8',3,260)}
 if(lt>1.8){const q=pop(lt,1.8);c.save();c.translate(540,1130);c.scale(q,q);const sx=lt>2.3?1:0;c.fillStyle=P.amb;rr(c,-300,-60,600,120,60);c.fill();tx(c,'รู้สึกถูกกว่า',0,22,64,P.ink);c.restore()}});
shot(22.8,26.4,(c,t,lt)=>{bg2(c,t,22);const k=pop(lt,.1);paper(c,540,780,860,820,-.02*k,P.paper);
 tx(c,'CATALOG',540,520,50,'#8a7aa0');shirt(c,540,820,440,'#e0809a');
 if(lt>1.9)tag(c,780,1020,'?',P.amb,.15,pop(lt,1.9),110)});
shot(26.4,30.0,(c,t,lt)=>{bg1(c,t,26);const L=[[200,'$44',.61],[540,'$49',1.48],[880,'$54',1.97]];
 for(const [x,s,t0] of L){const k=pop(lt,t0-0.0,.32);if(lt<t0)continue;shirt(c,x,760,300,'#e0809a');tag(c,x,1080,s,s==='$49'?P.amb:'#6fc7c0',0,k,90)}});
shot(30.0,35.5,(c,t,lt)=>{bg2(c,t,30);const k=pop(lt,.1);c.save();c.translate(540,800);c.scale(k,k);paper(c,0,0,900,900,0,P.paper);
 tx(c,'ยอดขาย',0,-370,60,P.ink);c.strokeStyle='#bba9d6';c.lineWidth=8;c.lineCap='round';c.beginPath();c.moveTo(-340,-310);c.lineTo(-340,320);c.lineTo(340,320);c.stroke();
 const hs=[[-230,.42,'$44','#6fc7c0',1.0],[0,.82,'$49',P.amb,1.2],[230,.41,'$54','#6fc7c0',1.4]];
 for(const [x,h,l,col,t0] of hs){const g=eo((lt-t0)/.7);c.fillStyle=col;rr(c,x-80,320-560*h*g,160,560*h*g+2,14);c.fill();tx(c,l,x,385,46,P.ink)}
 c.restore();
 if(lt>2.2){const q=pop(lt,2.2);c.save();c.translate(540,1330);c.scale(q,q);chip(c,'ลงท้ายด้วย 9 ขายดีสุด',0,0,P.amb,56,P.ink);c.restore()}});
shot(35.5,41.5,(c,t,lt)=>{bg1(c,t,35);tag(c,540,740,'$49',P.amb,Math.sin(t*2)*.05,1,170);
 if(lt>1.2){const k=pop(lt,1.2);c.save();c.translate(540,1120);c.rotate(-.04);c.scale(k,k);c.fillStyle=P.red;rr(c,-290,-90,580,180,28);c.fill();tx(c,'SALE',0,40,130,'#fff');c.restore()}
 if(lt>3.3){const k=pop(lt,3.3);check(c,830,1180,70,'#5fcf8a',k);c.save();c.globalAlpha=clamp(k);tx(c,'คุ้ม!',540,1300,100,'#fff','center',P.nav1,10);c.restore()}});
shot(41.5,44.5,(c,t,lt)=>{bg2(c,t,41);tx(c,'9',540,880,520,P.amb,'center',P.nav1,16);
 const u=clamp((lt-.9)/.8);c.save();c.translate(700-120*u,1010-150*u);c.rotate(.5);c.strokeStyle='#fff';c.lineWidth=22;c.beginPath();c.arc(-40,-40,110,0,7);c.stroke();c.lineCap='round';c.beginPath();c.moveTo(40,40);c.lineTo(150,150);c.stroke();c.restore();
 if(lt>.3&&lt<.9){c.save();c.globalAlpha=1;tx(c,'ฟังดูเป็นไปได้',540,1250,70,'#fff','center',P.nav1,10);c.restore()}
 if(lt>1.4)chip(c,'ลองคิดให้ลึก',540,1250,'#fff',64,P.ink,pop(lt,1.4))});
shot(44.5,48.0,(c,t,lt)=>{bg1(c,t,44);const sh=lt>1.6?Math.sin(t*50)*(1-clamp((lt-1.6)/.4))*8:0;tx(c,'9',540+sh,860,500,P.amb,'center',P.nav1,16);
 if(lt>1.6){const q=pop(lt,1.6);c.strokeStyle='#fff';c.lineWidth=10;c.lineCap='round';c.setLineDash([22,18]);c.beginPath();c.moveTo(520,610);c.lineTo(580,740);c.lineTo(500,860);c.lineTo(590,990);c.stroke();c.setLineDash([]);c.save();c.translate(780,520);c.scale(q,q);tx(c,'?',0,60,260,'#fff','center',P.nav1,14);c.restore();chip(c,'มีข้อเสียมั้ย',540,1250,P.red,64,'#fff',q)}});
shot(48.0,51.0,(c,t,lt)=>{bg2(c,t,48);const k=pop(lt,.1);studyCard(c,t,lt,540,900,k,null);if(lt>.9)chip(c,'OHIO STATE',540,1300,'#fff',54,P.ink,pop(lt,.9))});
shot(51.0,54.2,(c,t,lt)=>{bg1(c,t,51);
 const k=pop(lt,.1);c.save();c.translate(540,880);c.scale(k,k);cup(c,0,0,330,'#a8744a',{steam:true,t});c.restore();
 if(lt>1.4){tx(c,'แก้วเล็ก',540,1180,60,'#fff','center',P.nav1,10)}
 if(lt>2.1)tag(c,820,640,'95¢',P.amb,.1,pop(lt,2.1),100)});
shot(54.2,56.6,(c,t,lt)=>{bg2(c,t,54);const k=pop(lt,.1);c.save();c.translate(540,880);c.scale(k,k);cup(c,0,0,480,'#a8744a',{steam:true,t});c.restore();tx(c,'แก้วใหญ่',540,1250,60,'#fff','center',P.nav1,10);if(lt>.8)tag(c,830,600,'$1.20',P.amb,.1,pop(lt,.8),80)});
shot(56.6,59.9,(c,t,lt)=>{bg1(c,t,56);cup(c,300,820,330,'#a8744a',{t});cup(c,740,780,420,'#a8744a',{t});
 if(lt>.2){c.save();c.strokeStyle=P.amb;c.lineWidth=14;c.lineCap='round';c.beginPath();c.moveTo(380,540);c.quadraticCurveTo(540,430,640,500);c.stroke();c.beginPath();c.moveTo(600,470);c.lineTo(650,505);c.lineTo(590,535);c.stroke();c.restore();chip(c,'อัปเกรด',540,420,'#fff',52,P.ink,pop(lt,.2))}
 if(lt>1.7)donut(c,540,1190,150,.29,P.amb,pop(lt,1.7),'29%')});
shot(59.9,64.3,(c,t,lt)=>{bg2(c,t,59);
 const a=pop(lt,.9);cup(c,290,780,330,'#a8744a',{t});if(lt>.9)tag(c,290,1060,'$1.00',P.amb,0,a,70);
 const b=pop(lt,2.4);if(lt>2.4){cup(c,760,740,430,'#a8744a',{t});tag(c,760,1060,'$1.25',P.amb,0,b,70)}
 chip(c,'ขยับราคาใหม่',540,470,'#fff',52,P.ink,pop(lt,.1))});
shot(64.3,66.2,(c,t,lt)=>{bg1(c,t,64);const k=pop(lt,.1);c.save();c.translate(540,820);c.scale(k,k);tag(c,-260,0,'$1.20','#8a82b8',-.05,1,110);tag(c,260,0,'$1.25',P.amb,.05,1,110);c.restore();
 if(lt>.5){const q=pop(lt,.5);c.save();c.translate(540,1160);c.scale(q,q);chip(c,'แพงกว่าเดิม',0,0,P.red,70,'#fff');c.restore()}});
shot(66.2,68.5,(c,t,lt)=>{bg2(c,t,66);donut(c,300,830,150,.29,'#8a82b8',pop(lt,.1),'29%');donut(c,780,830,200,.56,P.amb,pop(lt,.5),'56%');
 if(lt>.9)chip(c,'คนเลือกมากกว่า!',540,1230,P.amb,64,P.ink,pop(lt,.9))});
shot(68.5,73.6,(c,t,lt)=>{bg1(c,t,68);
 // number line with threshold at $1
 c.strokeStyle='#fff';c.lineWidth=10;c.lineCap='round';c.beginPath();c.moveTo(120,820);c.lineTo(960,820);c.stroke();
 const th=540;c.strokeStyle=P.red;c.lineWidth=14;c.setLineDash([22,16]);c.beginPath();c.moveTo(th,560);c.lineTo(th,1000);c.stroke();c.setLineDash([]);
 const k=pop(lt,.1);tx(c,'$1',th,540,70,P.red);
 coin(c,330,820,60,'95¢',k);
 if(lt>1.1){const u=eo(clamp((lt-1.1)/.9));const x=lerp(330,700,u),y=820-Math.sin(u*Math.PI)*190;coin(c,x,y,60,'$1.20',1)}
 if(lt>2.2){const q=pop(lt,2.2);c.save();c.translate(540,1130);c.scale(q,q);chip(c,'ข้ามเส้น = แพงเกินจริง',0,0,P.red,56,'#fff');c.restore()}
 if(lt>3.0){c.save();c.globalAlpha=clamp((lt-3)/.3);const sh=Math.sin(t*20)*4;c.translate(sh,0);brain2(c,540,1340,120,t,{eyes:true,lookx:0});c.restore()}});
shot(73.6,74.85,(c,t,lt)=>{plainBG(c,'#f2b84b','#e08a3a');const k=bo(lt/.25);c.save();c.translate(540,820);c.scale(k,k);tx(c,'สรุป',0,60,230,'#fff','center','#7a3a12',16);c.restore();c.fillStyle='#7a3a12';c.fillRect(300,920,480*clamp((lt-.1)/.3),12)});
shot(74.85,77.7,(c,t,lt)=>{bg2(c,t,74);tag(c,320,760,'99',P.amb,Math.sin(t*2)*.05,1,150);tag(c,760,760,'100','#6fc7c0',Math.sin(t*2+1)*.05,1,150);
 const g=eo(clamp((lt-.5)/1));c.fillStyle='rgba(255,255,255,.9)';c.fillRect(440+0*g,1050,200,10);
 if(lt>.6){const q=pop(lt,.6);coin(c,540,1050,70,'1',q)}
 if(lt>1.7){const q=pop(lt,1.7);c.save();c.translate(540,1230);c.scale(q,q);chip(c,'แค่บาทเดียว',0,0,'#fff',58,P.ink);c.restore()}});
shot(77.7,79.3,(c,t,lt)=>{bg1(c,t,77);const k=pop(lt,.1);c.save();c.translate(540,780);c.scale(k,k);brain2(c,0,0,280,t,{eyes:true});heart(c,230,-250,70,P.pink);c.restore();if(lt>.6)check(c,800,1130,70,'#5fcf8a',pop(lt,.6));if(lt>.4)chip(c,'คุ้ม!',540,1130,P.amb,80,P.ink,pop(lt,.4))});
shot(79.3,82.8,(c,t,lt)=>{bg2(c,t,79);
 cup(c,250,820,300,'#a8744a',{t});cup(c,540,780,400,'#a8744a',{t});
 const k=pop(lt,.1);c.save();c.translate(840,860);c.scale(k,k);shop(c,0,0,300,t);c.restore();
 if(lt>1.6){const u=clamp((lt-1.6)/.9);c.strokeStyle=P.red;c.lineWidth=20;c.lineCap='round';c.beginPath();c.moveTo(560,520);c.bezierCurveTo(400,380,900,380,840,600);c.stroke();c.beginPath();c.moveTo(840,640);c.lineTo(790,590);c.moveTo(840,640);c.lineTo(890,590);c.stroke();if(lt>2.2)chip(c,'ย้อนมาทำร้ายร้าน',540,1210,P.red,56,'#fff',pop(lt,2.2))}
 if(lt>1.2)chip(c,'อัปเกรด',540,420,'#fff',52,P.ink,pop(lt,1.2))});
shot(82.8,85.2,(c,t,lt)=>{bg1(c,t,82);const sh=Math.sin(t*3)*.05;face(c,540,600,200,{f:F0,t,mouth:'flat',brow:1,cheek:0,looky:.3,rot:sh});
 const k=pop(lt,.4);tag(c,540,1090,'99',P.amb,Math.sin(t*3)*.06,k,150);
 if(lt>1.2){const q=pop(lt,1.2);c.save();c.translate(780,380);c.scale(q,q);tx(c,'?',0,60,220,'#fff','center',P.nav1,12);c.restore()}});
shot(85.2,86.1,(c,t,lt)=>{bg2(c,t,85);const ds=[[250,640,'#e0809a'],[790,760,'#6fc7c0'],[430,930,'#f2b84b']];
 for(let i=0;i<3;i++){const q=pop(lt,.05+i*.2,.2);if(lt<.05+i*.2)continue;c.save();c.translate(ds[i][0],ds[i][1]);c.scale(q,q);c.fillStyle='#fff';rr(c,-170,-70,340,140,44);c.fill();c.fillStyle=ds[i][2];c.beginPath();c.arc(-120,0,26,0,7);c.fill();c.fillStyle='#8a7aa0';for(let j=0;j<3;j++){c.beginPath();c.arc(-40+j*50,0,12+Math.sin(t*8+j+i)*4,0,7);c.fill()}c.restore()}});
shot(86.1,87.92,(c,t,lt)=>{nightBG(c,t);c.fillStyle=P.moon;c.beginPath();c.arc(800,520,120,0,7);c.fill();
 const k=bo(lt/.3);c.save();c.translate(540,900);c.scale(k,k);tx(c,'@เรื่องสงสัย',0,0,112,'#fff','center',P.nav1,14);
 const pk=1+.05*Math.sin(t*8);c.scale(pk,pk);c.fillStyle=P.amb;rr(c,-250,70,500,120,60);c.fill();tx(c,'+ ติดตามไว้นะ',0,152,58,P.ink);c.restore()});
// ---------- captions ----------
const CAPS=[[.26,1.03,'คุณเคยสงสัยมั้ย','Ever wondered',1],[1.47,2.73,'ทำไมของบางอย่าง','why some things',0],[2.92,3.6,'ราคา 99 บาท','cost 99 baht',1],[4.04,4.84,'ไม่ใช่ 100 บาท','instead of 100',0],[5.71,6.45,'ฟังคลิปนี้ให้จบ','Watch to the end',1],[6.84,8.04,'ถึงจะต่างกันแค่บาทเดียว','even if it’s only 1 baht apart',0],[8.47,9.29,'มีอีกด้านหนึ่ง','there’s another side',0],[9.57,10.81,'ที่ร้านค้าไม่อยากให้คุณรู้','shops don’t want you to know',2],
[11.78,13.24,'ฟังดูเหมือนแค่ลดให้บาทเดียว','sounds like a 1-baht discount',0],[13.72,14.58,'แต่นักวิจัยพบว่า','but researchers found',0],[14.78,16.39,'สมองเราไม่ได้คิดแบบนั้น','our brain doesn’t think that way',1],[16.99,18.66,'เราอ่านตัวเลขจากซ้ายไปขวา','we read numbers left to right',0],[19.02,19.57,'เลยรู้สึกว่า','so it feels like',0],[19.79,20.93,'เลขที่ลงท้ายด้วยเก้า','a price ending in 9',1],[21.3,22.03,'ถูกกว่าที่เป็นจริง','is cheaper than it is',2],
[23.01,24.79,'มีการทดลองกับร้านเสื้อผ้าแบบแคตตาล็อก','a clothing catalog experiment',0],[25.19,26.35,'ตั้งราคาเสื้อตัวเดียวกัน','same shirt, different prices',0],[26.61,27.24,'สี่สิบสี่','$44',1],[27.48,28.1,'สี่สิบเก้า','$49',1],[28.37,29.56,'และห้าสิบสี่ ดอลลาร์','and $54',1],
[30.05,30.47,'ผลคือ','The result',0],[30.8,32.01,'ราคาที่ลงท้ายด้วยเก้า','the price ending in 9',1],[32.21,33.02,'ขายดีกว่า','sold better',2],[33.42,35.19,'ทั้งราคาที่ถูกกว่า และแพงกว่า','than the cheaper and the pricier',0],
[35.83,36.58,'นักวิจัยบอกว่า','Researchers say',0],[36.79,37.75,'คนมองเลขเก้า','people see a 9',1],[37.96,38.89,'เหมือนป้ายลดราคา','like a sale sign',0],[39.19,39.85,'แล้วสรุปเองว่า','and conclude',0],[40.23,40.92,'นี่คือของคุ้ม','this is a bargain',2],
[41.84,42.56,'ฟังดูเป็นไปได้','Sounds plausible',0],[43.05,44.23,'แต่ลองคิดให้ลึกกว่านั้น','but think deeper',1],[44.68,45.98,'ถ้าเลขเก้าดีขนาดนี้','if 9 is that good',0],[46.36,47.09,'มันมีข้อเสียมั้ย','is there a downside?',1],
[48.02,48.42,'มี','Yes',2],[48.82,50.9,'งานวิจัยจากมหาวิทยาลัยรัฐโอไฮโอ','Ohio State University study',0],[51.14,52.08,'ทดลองที่ร้านกาแฟ','at a coffee stand',0],[52.53,52.9,'แก้วเล็ก','small cup',0],[53.15,54.01,'เก้าสิบห้าเซนต์','95 cents',1],[54.22,54.79,'แก้วใหญ่','large cup',0],[54.98,56.19,'หนึ่งดอลลาร์ยี่สิบเซนต์','$1.20',1],
[56.68,58.15,'มีคนเลือกอัปเกรดเป็นแก้วใหญ่','people upgraded to the large',0],[58.33,59.45,'แค่ยี่สิบเก้าเปอร์เซ็นต์','only 29%',2],[59.97,60.71,'แต่พอเปลี่ยนเป็น','but when it became',0],[60.97,61.89,'แก้วเล็กหนึ่งดอลลาร์','small $1',1],[62.28,64.1,'แก้วใหญ่หนึ่งดอลลาร์ยี่สิบห้าเซนต์','large $1.25',1],[64.54,65.94,'ทั้งที่แก้วใหญ่แพงกว่าเดิม','even though it costs more',0],[66.34,68.05,'คนกลับเลือกถึงห้าสิบหกเปอร์เซ็นต์','56% chose it',2],
[68.55,69.55,'เพราะพอราคาข้ามหลักร้อย','because crossing the round number',0],[69.62,70.81,'หรือหลักหนึ่งดอลลาร์','or the $1 mark',0],[71.13,71.94,'สมองเรารู้สึกว่า','our brain feels',0],[72.22,73.44,'ส่วนต่างมันแพงเกินจริง','the gap is too big',2],
[74.03,74.65,'สรุปง่ายๆ','In short',1],[74.89,77.47,'ราคา 99 ไม่ได้ถูกกว่าแค่บาทเดียว','99 isn’t just 1 baht cheaper',0],[77.86,79.11,'มันทำให้สมองรู้สึกว่าคุ้ม','it makes your brain feel it’s a deal',1],[79.39,80.39,'แต่ถ้าต้องเลือกอัปเกรด','but when choosing an upgrade',0],[80.61,82.23,'มันก็ย้อนกลับมาทำร้ายร้านได้','it can backfire on the shop',2],
[82.99,83.88,'คุณเคยหลงกลราคา','Ever fallen for a',0],[83.98,84.84,'เก้าสิบเก้าบ้างมั้ย','99 price?',1],[85.27,86.1,'คอมเมนต์มาได้เลย','tell me in the comments',1],[86.17,86.85,'แล้วติดตาม','and follow',0],[86.85,87.7,'เรื่องสงสัย ด้วยนะ','เรื่องสงสัย',1]];
// ---------- smooth captions (v2) ----------
const CEND=CAPS.map((q,i)=>{const nx=CAPS[i+1];let e=q[1]+.14;const mn=q[0]+.55;if(e<mn)e=mn;if(nx&&e>nx[0]-.02)e=nx[0]-.02;return e});
const _e3=x=>{x=clamp(x);return 1-Math.pow(1-x,3)};
const _soft=x=>{x=clamp(x);const c1=.9,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
function caps(c,t){for(let i=0;i<CAPS.length;i++){const [a,b,s,en,m]=CAPS[i];const end=CEND[i];if(t<a-.02||t>=end)continue;
 const tin=t-a,OUT=Math.min(.16,(end-a)*.35),pout=_e3((end-t)/OUT),pin=_e3(tin/.3);
 const al=clamp(tin/.16)*pout;
 const dy=(1-pin)*38-(1-pout)*14;
 const sc=(.9+.1*_soft(tin/.34))*(1+.025*clamp(tin/(end-a)))*(1-(1-pout)*.04);
 const bl=(1-clamp(tin/.2))*7+(1-pout)*3;
 c.save();c.globalAlpha=al;c.translate(540,1500+dy);c.scale(sc,sc);
 const fs=s.length>24?50:s.length>18?58:68;c.font='800 '+fs+'px '+HF;const w=c.measureText(s).width;
 if(bl>.4)c.filter='blur('+bl.toFixed(1)+'px)';
 if(m===2){const bw=(w+52)*_e3(tin/.32);c.fillStyle=P.red;rr(c,-bw/2,-fs*.95,bw,fs*1.5,18);c.fill()}
 else{c.lineWidth=11;c.strokeStyle='#120d2a';c.lineJoin='round';c.textAlign='center';c.strokeText(s,0,0)}
 c.textAlign='center';c.fillStyle=m===1?'#ffc857':'#fff';c.fillText(s,0,0);
 c.filter='none';
 const ta=clamp((tin-.08)/.18)*pout,ty=(1-_e3((tin-.08)/.3))*16;
 c.globalAlpha=al*ta;c.font='800 32px '+HF;const ew=c.measureText(en).width;c.fillStyle='rgba(10,8,30,.6)';rr(c,-ew/2-18,34+ty,ew+36,48,12);c.fill();c.fillStyle='#fff';c.fillText(en,0,70+ty);c.restore()}}

// ---------- render ----------
const SHAKE=[[74.03,.12,8],[48.02,.1,8]];
function camOf(sh,t,lt,d){return [1+.045*clamp(lt/d),540,960]}
function renderAt(t,canvas){const c=canvas.getContext('2d');c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation='source-over';c.globalAlpha=1;c.filter='none';
 let sh=SH[0];for(const s of SH)if(t>=s.a)sh=s;c.fillStyle='#000';c.fillRect(0,0,W,H);
 const lt=t-sh.a,d=sh.b-sh.a;c.save();const [z,fx,fy]=camOf(sh,t,lt,d);let sx=0,sy=0;for(const [a,du,am] of SHAKE){if(t>=a&&t<a+du){const k=1-(t-a)/du;sx+=Math.sin(t*90)*am*k;sy+=Math.cos(t*77)*am*k}}
 c.translate(540+sx+noise(t*.5,1)*3,960+sy+noise(t*.4,4)*3);c.scale(z,z);c.translate(-fx,-fy);sh.fn(c,t,lt);c.restore();
 c.save();c.globalCompositeOperation='soft-light';c.fillStyle='rgba(120,90,200,.12)';c.fillRect(0,0,W,H);c.restore();
 c.save();c.fillStyle=rg(c,540,900,W*.35,H*.7,[[0,'rgba(0,0,0,0)'],[1,'rgba(8,4,30,.5)']]);c.fillRect(0,0,W,H);c.restore();
 const fi=Math.floor(t*30),R=mulberry32(fi*7+3);c.save();c.globalCompositeOperation='overlay';c.globalAlpha=.1;const nt=noiseTile();for(let i=0;i<2;i++)c.drawImage(nt,0,0,256,256,-R()*256,-R()*256,W+300,H+300);c.restore();
 const lt2=t-sh.a;if(sh.a>0&&lt2<.08){c.fillStyle='rgba(10,6,30,'+(.7*(1-lt2/.08))+')';c.fillRect(0,0,W,H)}
 if(t<.2){c.fillStyle='rgba(0,0,0,'+(.4*(1-t/.2))+')';c.fillRect(0,0,W,H)}
 caps(c,t);credit(c);
 if(t>=DUR-.35){c.fillStyle='rgba(0,0,0,'+clamp((t-(DUR-.35))/.3)+')';c.fillRect(0,0,W,H)}}
