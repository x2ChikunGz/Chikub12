// "เสียงตัวเอง" — 2D vector
const HF='Kanit,Tahoma,sans-serif',DUR=77.92;
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

// ---------- helpers (scroll) ----------
function phone2(c,x,y,w,h,fn){c.save();c.translate(x,y);c.fillStyle='rgba(8,6,30,.35)';rr(c,-w/2+10,-h/2+18,w,h,50);c.fill();c.fillStyle='#120e2c';rr(c,-w/2,-h/2,w,h,50);c.fill();
 c.save();rr(c,-w/2+16,-h/2+16,w-32,h-32,38);c.clip();c.fillStyle=lg(c,0,-h/2,0,h/2,[[0,'#43378a'],[1,'#261e58']]);c.fillRect(-w/2,-h/2,w,h);if(fn)fn(c,w-32,h-32);c.restore();c.restore()}
const FCOL=['#f2b84b','#6fc7c0','#e0809a','#b9a8ff','#8fc7f0','#f09a6a'];
function feedCards(c,sw,sh,pos,o){o=o||{};const ch=sw*.74,u=ch+30,k0=Math.floor(pos/u);
 for(let k=k0-1;k<=k0+Math.ceil(sh/u)+1;k++){const y=-sh/2+30+ch/2+k*u-pos,col=o.same?o.same:FCOL[((k%6)+6)%6];if(y<-sh/2-ch||y>sh/2+ch)continue;
  c.save();c.translate(0,y);c.fillStyle='#fff6e0';rr(c,-sw/2+24,-ch/2,sw-48,ch,26);c.fill();
  c.fillStyle=col;rr(c,-sw/2+40,-ch/2+84,sw-80,ch-150,18);c.fill();c.fillStyle='rgba(255,255,255,.35)';c.beginPath();c.arc(-sw*.12,-ch*.06,sw*.1,0,7);c.fill();
  c.fillStyle='#8a7aa0';c.beginPath();c.arc(-sw/2+78,-ch/2+44,22,0,7);c.fill();c.fillStyle='#cfc4e2';rr(c,-sw/2+112,-ch/2+30,sw*.3,14,7);c.fill();rr(c,-sw/2+112,-ch/2+52,sw*.2,12,6);c.fill();
  if(o.hearts){const liked=hash(k*3.7+1)>.5;if(liked)heart(c,sw/2-90,ch/2-34,28,P.red);else{c.fillStyle='#9a92b8';rr(c,sw/2-120,ch/2-38,60,10,5);c.fill()}}
  c.restore()}}
function finger(c,x,y,s,press){c.save();c.translate(x,y);if(press>0){c.strokeStyle='rgba(255,255,255,'+(.7*(1-press))+')';c.lineWidth=8;c.beginPath();c.arc(0,0,s*.3+press*s*.9,0,7);c.stroke()}
 c.rotate(-.35);c.fillStyle='rgba(8,6,30,.25)';rr(c,-s*.2+8,-s*.1+14,s*.4,s*1.5,s*.2);c.fill();c.fillStyle='#f1c6a0';rr(c,-s*.2,-s*.1,s*.4,s*1.5,s*.2);c.fill();c.fillStyle='rgba(255,255,255,.35)';rr(c,-s*.1,s*.02,s*.2,s*.14,s*.07);c.fill();c.restore()}
function eyeIcon(c,x,y,s,look,col){c.save();c.translate(x,y);c.fillStyle=col||'#fff';c.beginPath();c.moveTo(-s,0);c.quadraticCurveTo(0,-s*.95,s,0);c.quadraticCurveTo(0,s*.95,-s,0);c.fill();c.fillStyle=P.nav2;c.beginPath();c.arc(look*s*.3,0,s*.36,0,7);c.fill();c.fillStyle='#120e2c';c.beginPath();c.arc(look*s*.3,0,s*.18,0,7);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(look*s*.3-s*.08,-s*.08,s*.07,0,7);c.fill();c.restore()}
function stopSign(c,x,y,r,a){c.save();c.translate(x,y);c.globalAlpha=a==null?1:a;c.fillStyle=P.red;c.beginPath();for(let i=0;i<8;i++){const an=Math.PI/8+i*Math.PI/4;i?c.lineTo(Math.cos(an)*r,Math.sin(an)*r):c.moveTo(Math.cos(an)*r,Math.sin(an)*r)}c.closePath();c.fill();c.strokeStyle='#fff';c.lineWidth=r*.07;c.stroke();tx(c,'หยุด',0,r*.22,r*.56,'#fff');c.restore()}
function clockF(c,x,y,r,min,o){o=o||{};c.save();c.translate(x,y);c.fillStyle='rgba(8,6,30,.3)';c.beginPath();c.arc(8,14,r,0,7);c.fill();c.fillStyle='#fff6e0';c.beginPath();c.arc(0,0,r,0,7);c.fill();c.lineWidth=r*.06;c.strokeStyle=P.ink;c.stroke();
 if(o.pie){c.fillStyle='rgba(242,184,75,.9)';c.beginPath();c.moveTo(0,0);c.arc(0,0,r*.9,-Math.PI/2,-Math.PI/2+min*Math.PI/30);c.closePath();c.fill()}
 c.strokeStyle=P.ink;c.lineCap='round';for(let i=0;i<12;i++){const a=i*Math.PI/6;c.lineWidth=r*.04;c.beginPath();c.moveTo(Math.sin(a)*r*.82,-Math.cos(a)*r*.82);c.lineTo(Math.sin(a)*r*.92,-Math.cos(a)*r*.92);c.stroke()}
 const am=min*Math.PI/30,ah=min*Math.PI/360;c.lineWidth=r*.07;c.beginPath();c.moveTo(0,0);c.lineTo(Math.sin(am)*r*.75,-Math.cos(am)*r*.75);c.stroke();c.lineWidth=r*.1;c.beginPath();c.moveTo(0,0);c.lineTo(Math.sin(ah)*r*.45,-Math.cos(ah)*r*.45);c.stroke();c.fillStyle=P.red;c.beginPath();c.arc(0,0,r*.07,0,7);c.fill();c.restore()}
function pigeon(c,x,y,s,peck,t){c.save();c.translate(x,y);c.scale(-1,1);c.fillStyle='rgba(8,6,30,.25)';c.beginPath();c.ellipse(0,s*.62,s*.5,s*.07,0,0,7);c.fill();
 c.strokeStyle='#e08a6a';c.lineWidth=s*.04;c.lineCap='round';c.beginPath();c.moveTo(-s*.08,s*.35);c.lineTo(-s*.1,s*.6);c.moveTo(s*.1,s*.35);c.lineTo(s*.12,s*.6);c.stroke();
 c.fillStyle='#9aa2c8';c.beginPath();c.ellipse(0,0,s*.5,s*.36,-.15,0,7);c.fill();c.fillStyle='#7f88b4';c.beginPath();c.ellipse(-s*.12,s*.02,s*.3,s*.2,-.3,0,7);c.fill();
 c.save();c.translate(s*.38,-s*.26);c.rotate(peck*.6);c.fillStyle='#9aa2c8';c.beginPath();c.arc(0,0,s*.2,0,7);c.fill();c.fillStyle='#e8c76a';c.beginPath();c.moveTo(s*.17,-s*.04);c.lineTo(s*.36,s*.03);c.lineTo(s*.17,s*.08);c.closePath();c.fill();c.fillStyle='#120e2c';c.beginPath();c.arc(s*.06,-s*.05,s*.035,0,7);c.fill();c.fillStyle='#b9a8ff';c.beginPath();c.ellipse(-s*.04,s*.1,s*.09,s*.05,0,0,7);c.fill();c.restore();c.restore()}
function skBox(c,x,y,w,h){c.save();c.translate(x,y);c.fillStyle='rgba(255,255,255,.08)';rr(c,-w/2,-h/2,w,h,30);c.fill();c.strokeStyle='rgba(255,255,255,.8)';c.lineWidth=8;rr(c,-w/2,-h/2,w,h,30);c.stroke();c.fillStyle='#5b4fa0';c.fillRect(-w/2+8,h/2-60,w-16,52);c.restore()}
function lever(c,x,y,on){c.save();c.translate(x,y);c.fillStyle='#d9cfe8';rr(c,-26,-26,52,52,14);c.fill();c.fillStyle=P.red;c.beginPath();c.arc(0,0,on?14:20,0,7);c.fill();c.restore()}
function pellet(c,x,y){c.fillStyle='#c98a3d';c.beginPath();c.arc(x,y,13,0,7);c.fill();c.fillStyle='rgba(255,255,255,.35)';c.beginPath();c.arc(x-4,y-4,4,0,7);c.fill()}
function slotM(c,x,y,s,t,pull,stopT){c.save();c.translate(x,y);c.fillStyle='rgba(8,6,30,.3)';rr(c,-s*.5+12,-s*.7+18,s,s*1.4,40);c.fill();c.fillStyle='#d6303c';rr(c,-s*.5,-s*.7,s,s*1.4,40);c.fill();c.fillStyle='#8f1d2a';rr(c,-s*.42,-s*.42,s*.84,s*.6,24);c.fill();c.fillStyle='#fff6e0';rr(c,-s*.38,-s*.38,s*.76,s*.52,18);c.fill();
 const sym=['7','♥','★','7','♥','★'];for(let i=0;i<3;i++){const x0=-s*.25+i*s*.25;c.save();c.beginPath();rr(c,x0-s*.1,-s*.35,s*.2,s*.46,8);c.clip();const spin=t<stopT+i*.18;const off=spin?((t*5+i*.7)%1):0;for(let j=-1;j<=1;j++){const yy=-s*.12+(j+off)*s*.34,sy=sym[((j+i*2+(spin?Math.floor(t*5+i):0))%6+6)%6];tx(c,sy,x0,yy+s*.07,s*.22,sy==='♥'?P.red:sy==='7'?'#d6303c':P.amb)}c.restore()}
 c.fillStyle='#ffd35a';rr(c,-s*.3,s*.3,s*.6,s*.12,8);c.fill();c.strokeStyle='#9a9ab8';c.lineWidth=s*.04;c.lineCap='round';const la=pull;c.beginPath();c.moveTo(s*.5,-s*.1);c.lineTo(s*.62,-s*.1);c.lineTo(s*.62,-s*.1-s*.3+la*s*.5);c.stroke();c.fillStyle=P.red;c.beginPath();c.arc(s*.62,-s*.1-s*.3+la*s*.5,s*.07,0,7);c.fill();c.restore()}
function bookF(c,x,y,s,flip){c.save();c.translate(x,y);c.fillStyle='rgba(8,6,30,.3)';rr(c,-s*.62+10,-s*.45+16,s*1.24,s*.9,20);c.fill();c.fillStyle='#8a5ab0';rr(c,-s*.62,-s*.45,s*1.24,s*.9,20);c.fill();
 c.fillStyle='#fff6e0';rr(c,-s*.56,-s*.4,s*.55,s*.8,12);c.fill();rr(c,s*.01,-s*.4,s*.55,s*.8,12);c.fill();c.fillStyle='#cfc4e2';for(let i=0;i<6;i++){rr(c,-s*.48,-s*.3+i*s*.1,s*.4-(i%3)*s*.06,s*.03,s*.015);c.fill()}
 if(flip>0){c.save();c.translate(s*.01,0);c.scale(Math.cos(clamp(flip)*Math.PI*.5)||.001,1);c.fillStyle='#f4ecdc';rr(c,0,-s*.4,s*.55,s*.8,12);c.fill();c.restore()}
 c.fillStyle=P.red;c.beginPath();c.moveTo(s*.38,-s*.4);c.lineTo(s*.38,-s*.1);c.lineTo(s*.43,-s*.17);c.lineTo(s*.48,-s*.1);c.lineTo(s*.48,-s*.4);c.closePath();c.fill();c.restore()}
function spinner(c,x,y,r,t){c.save();c.translate(x,y);c.strokeStyle='#fff';c.lineWidth=7;c.lineCap='round';c.beginPath();c.arc(0,0,r,t*8,t*8+4.2);c.stroke();c.restore()}
function question(c,x,y,s,t,k){c.save();c.translate(x,y);c.scale(k,k);c.rotate(Math.sin(t*4)*.08);tx(c,'?',0,s*.35,s,'#fff','center',P.nav1,s*.08);c.restore()}
// ---------- polish (richer details; later declarations override earlier ones) ----------
function gloss(c,x,y,w,h,r,a){c.fillStyle=lg(c,0,y,0,y+h,[[0,'rgba(255,255,255,'+a+')'],[1,'rgba(255,255,255,0)']]);rr(c,x,y,w,h,r);c.fill()}
function softShadow(c,x,y,rx,ry,a){c.save();c.fillStyle='rgba(8,6,30,'+(a||.3)+')';c.beginPath();c.ellipse(x,y,rx,ry,0,0,7);c.fill();c.restore()}
function bgGlow(c,t,seed,a,b){plainBG(c,a,b);c.fillStyle=rg(c,540,820,40,980,[[0,'rgba(255,236,200,.17)'],[1,'rgba(255,236,200,0)']]);c.fillRect(0,0,W,H);
 const R=mulberry32(seed*13+5);for(let i=0;i<7;i++){const x=R()*W,y0=R()*H,r=40+R()*90,sp=8+R()*16,yy=((y0-t*sp)%(H+240)+H+240)%(H+240)-120;c.fillStyle='rgba(255,240,220,.055)';c.beginPath();c.arc(x+Math.sin(t*.5+i)*14,yy,r,0,7);c.fill()}
 stars(c,30,seed,t,1000);c.fillStyle=rg(c,540,960,520,1300,[[0,'rgba(6,4,22,0)'],[1,'rgba(6,4,22,.42)']]);c.fillRect(0,0,W,H)}
function bg1(c,t,s){bgGlow(c,t,s,'#2a2150','#4a3a80')}
function bg2(c,t,s){bgGlow(c,t,s,'#15405a','#2a2d6a')}
function chip(c,s,x,y,col,size,tc,k){c.save();c.translate(x,y);if(k!=null)c.scale(k,k);c.font='800 '+size+'px '+HF;const w=c.measureText(s).width+60,h=size*1.55,y0=-size*.85;
 c.fillStyle='rgba(8,6,30,.32)';rr(c,-w/2+3,y0+9,w,h,size*.55);c.fill();c.fillStyle=col;rr(c,-w/2,y0,w,h,size*.55);c.fill();gloss(c,-w/2+8,y0+5,w-16,h*.42,size*.3,.3);c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=2;rr(c,-w/2+1,y0+1,w-2,h-2,size*.55);c.stroke();tx(c,s,0,size*.25,size,tc||'#1a1530');c.restore()}
function phone2(c,x,y,w,h,fn){c.save();c.translate(x,y);softShadow(c,10,h/2+40,w*.5,34,.3);c.fillStyle='rgba(8,6,30,.34)';rr(c,-w/2+12,-h/2+22,w,h,52);c.fill();
 c.fillStyle='#3a3070';rr(c,w/2-3,-h*.2,9,120,4);c.fill();rr(c,-w/2-6,-h*.27,9,70,4);c.fill();rr(c,-w/2-6,-h*.16,9,110,4);c.fill();
 c.fillStyle=lg(c,-w/2,-h/2,w/2,h/2,[[0,'#3a3074'],[1,'#0e0a26']]);rr(c,-w/2,-h/2,w,h,52);c.fill();c.strokeStyle='rgba(255,255,255,.2)';c.lineWidth=3;rr(c,-w/2+2,-h/2+2,w-4,h-4,50);c.stroke();
 c.save();rr(c,-w/2+16,-h/2+16,w-32,h-32,38);c.clip();c.fillStyle=lg(c,0,-h/2,0,h/2,[[0,'#4a3d94'],[1,'#261e58']]);c.fillRect(-w/2,-h/2,w,h);if(fn)fn(c,w-32,h-32);
 c.fillStyle=lg(c,0,-h/2,0,-h/2+110,[[0,'rgba(14,10,38,.85)'],[1,'rgba(14,10,38,0)']]);c.fillRect(-w/2,-h/2,w,110);
 c.fillStyle='#06041a';rr(c,-46,-h/2+26,92,26,13);c.fill();c.fillStyle='#2a2358';c.beginPath();c.arc(26,-h/2+39,6,0,7);c.fill();
 c.fillStyle='rgba(255,255,255,.9)';for(let i=0;i<4;i++)rr(c,w/2-130+i*10,-h/2+46-i*4,6,8+i*4,2),c.fill();rr(c,w/2-76,-h/2+36,34,16,5);c.fill();c.fillStyle='rgba(255,255,255,.9)';rr(c,w/2-40,-h/2+41,4,6,2);c.fill();
 c.fillStyle='rgba(255,255,255,.09)';c.beginPath();c.moveTo(-w/2,-h/2);c.lineTo(w*.1,-h/2);c.lineTo(-w*.25,h/2);c.lineTo(-w/2,h/2);c.closePath();c.fill();
 c.restore();c.restore()}
function feedCards(c,sw,sh,pos,o){o=o||{};const ch=sw*.8,u=ch+30,k0=Math.floor(pos/u);
 for(let k=k0-1;k<=k0+Math.ceil(sh/u)+1;k++){const y=-sh/2+84+ch/2+k*u-pos,ci=((k%6)+6)%6,col=o.same?o.same:FCOL[ci];if(y<-sh/2-ch||y>sh/2+ch)continue;
  c.save();c.translate(0,y);const L=-sw/2+24,Wd=sw-48;c.fillStyle='rgba(8,6,30,.28)';rr(c,L+4,-ch/2+10,Wd,ch,28);c.fill();c.fillStyle='#fffaf0';rr(c,L,-ch/2,Wd,ch,28);c.fill();
  c.fillStyle=lg(c,0,-ch/2+20,0,-ch/2+64,[[0,FCOL[(ci+2)%6]],[1,FCOL[(ci+4)%6]]]);c.beginPath();c.arc(L+50,-ch/2+46,24,0,7);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(L+50,-ch/2+40,8,0,7);c.fill();c.beginPath();c.ellipse(L+50,-ch/2+62,14,9,0,Math.PI,0);c.fill();
  c.fillStyle='#8f84ab';rr(c,L+88,-ch/2+30,Wd*.3,14,7);c.fill();c.fillStyle='#cfc4e2';rr(c,L+88,-ch/2+52,Wd*.2,11,5.5);c.fill();c.fillStyle='#b6abd0';for(let i=0;i<3;i++){c.beginPath();c.arc(L+Wd-34+i*0,-ch/2+34+i*12,3.5,0,7);c.fill()}
  const ix=L+14,iy=-ch/2+86,iw=Wd-28,ih=ch-190;c.save();rr(c,ix,iy,iw,ih,18);c.clip();c.fillStyle=lg(c,0,iy,0,iy+ih,[[0,col],[1,FCOL[(ci+3)%6]]]);c.fillRect(ix,iy,iw,ih);
  const kind=((k%3)+3)%3;c.fillStyle='rgba(255,255,255,.4)';if(kind===0){c.beginPath();c.arc(ix+iw*.7,iy+ih*.3,ih*.14,0,7);c.fill();c.fillStyle='rgba(60,40,110,.28)';c.beginPath();c.moveTo(ix,iy+ih);c.lineTo(ix+iw*.3,iy+ih*.45);c.lineTo(ix+iw*.55,iy+ih);c.fill();c.fillStyle='rgba(60,40,110,.2)';c.beginPath();c.moveTo(ix+iw*.35,iy+ih);c.lineTo(ix+iw*.7,iy+ih*.5);c.lineTo(ix+iw,iy+ih);c.fill()}
  else if(kind===1){for(let i=0;i<6;i++){c.beginPath();c.arc(ix+iw*(.15+hash(k*3+i)*.7),iy+ih*(.2+hash(k*5+i)*.6),ih*(.06+hash(i+k)*.1),0,7);c.fill()}}
  else{c.strokeStyle='rgba(255,255,255,.45)';c.lineWidth=14;for(let i=0;i<4;i++){c.beginPath();c.moveTo(ix,iy+ih*(.25+i*.2));c.bezierCurveTo(ix+iw*.3,iy+ih*(.05+i*.2),ix+iw*.6,iy+ih*(.45+i*.2),ix+iw,iy+ih*(.2+i*.2));c.stroke()}}
  c.fillStyle='rgba(255,255,255,.18)';c.fillRect(ix,iy,iw,ih*.35);c.restore();
  const ay=ch/2-44;c.strokeStyle='#9a90b8';c.lineWidth=5;c.lineCap='round';c.lineJoin='round';c.beginPath();c.arc(L+46,ay,13,0,7);c.stroke();c.beginPath();c.moveTo(L+84,ay+8);c.lineTo(L+84,ay-8);c.lineTo(L+106,ay-8);c.lineTo(L+106,ay+4);c.lineTo(L+96,ay+4);c.lineTo(L+88,ay+11);c.stroke();
  if(o.hearts){const liked=hash(k*3.7+1)>.5;if(liked){heart(c,L+Wd-48,ay,24,P.red);c.fillStyle='rgba(255,255,255,.7)';c.beginPath();c.arc(L+Wd-56,ay-8,4,0,7);c.fill()}else{c.strokeStyle='#9a92b8';c.lineWidth=5;c.beginPath();c.moveTo(L+Wd-76,ay);c.lineTo(L+Wd-30,ay);c.stroke()}}
  else{c.strokeStyle='#9a90b8';c.beginPath();c.moveTo(L+Wd-70,ay+10);c.lineTo(L+Wd-48,ay-10);c.lineTo(L+Wd-34,ay+10);c.closePath();c.stroke()}
  c.restore()}}
function finger(c,x,y,s,press){c.save();c.translate(x,y);if(press>0){c.strokeStyle='rgba(255,255,255,'+(.7*(1-press))+')';c.lineWidth=8;c.beginPath();c.arc(0,0,s*.3+press*s*.9,0,7);c.stroke();c.strokeStyle='rgba(255,255,255,'+(.4*(1-press))+')';c.lineWidth=4;c.beginPath();c.arc(0,0,s*.15+press*s*.6,0,7);c.stroke()}
 c.rotate(-.35);c.fillStyle='rgba(8,6,30,.28)';rr(c,-s*.2+10,-s*.1+16,s*.4,s*1.5,s*.2);c.fill();c.fillStyle=lg(c,-s*.2,0,s*.2,0,[[0,'#f6d2b0'],[.6,'#f1c6a0'],[1,'#dba67f']]);rr(c,-s*.2,-s*.1,s*.4,s*1.5,s*.2);c.fill();
 c.fillStyle='rgba(255,255,255,.55)';rr(c,-s*.12,s*.02,s*.24,s*.2,s*.1);c.fill();c.strokeStyle='rgba(150,100,70,.35)';c.lineWidth=3;c.beginPath();c.moveTo(-s*.12,s*.62);c.lineTo(s*.12,s*.62);c.moveTo(-s*.1,s*.72);c.lineTo(s*.1,s*.72);c.stroke();c.restore()}
function clockF(c,x,y,r,min,o){o=o||{};c.save();c.translate(x,y);softShadow(c,6,r+30,r*.9,r*.1,.28);c.fillStyle='rgba(8,6,30,.3)';c.beginPath();c.arc(8,14,r,0,7);c.fill();
 c.fillStyle=lg(c,-r,-r,r,r,[[0,'#ffd36a'],[1,'#c88a2a']]);c.beginPath();c.arc(0,0,r*1.06,0,7);c.fill();c.fillStyle=rg(c,-r*.2,-r*.25,r*.1,r,[[0,'#fffdf5'],[1,'#f0e2c0']]);c.beginPath();c.arc(0,0,r,0,7);c.fill();c.lineWidth=r*.025;c.strokeStyle='rgba(60,40,20,.35)';c.stroke();
 if(o.pie){c.fillStyle='rgba(242,170,60,.88)';c.beginPath();c.moveTo(0,0);c.arc(0,0,r*.9,-Math.PI/2,-Math.PI/2+min*Math.PI/30);c.closePath();c.fill()}
 c.strokeStyle=P.ink;c.lineCap='round';for(let i=0;i<60;i++){const a=i*Math.PI/30,big=i%5===0;c.lineWidth=r*(big?.04:.018);c.beginPath();c.moveTo(Math.sin(a)*r*(big?.8:.86),-Math.cos(a)*r*(big?.8:.86));c.lineTo(Math.sin(a)*r*.93,-Math.cos(a)*r*.93);c.stroke()}
 if(r>150){for(const [n,ang] of [['12',0],['3',90],['6',180],['9',270]]){const a=ang*Math.PI/180;tx(c,n,Math.sin(a)*r*.66,-Math.cos(a)*r*.66+r*.07,r*.2,P.ink)}}
 const am=min*Math.PI/30,ah=min*Math.PI/360,as=min*Math.PI*2;c.strokeStyle=P.ink;c.lineWidth=r*.07;c.beginPath();c.moveTo(-Math.sin(am)*r*.1,Math.cos(am)*r*.1);c.lineTo(Math.sin(am)*r*.75,-Math.cos(am)*r*.75);c.stroke();c.lineWidth=r*.1;c.beginPath();c.moveTo(0,0);c.lineTo(Math.sin(ah)*r*.45,-Math.cos(ah)*r*.45);c.stroke();
 if(r>100){c.strokeStyle=P.red;c.lineWidth=r*.025;c.beginPath();c.moveTo(-Math.sin(as)*r*.15,Math.cos(as)*r*.15);c.lineTo(Math.sin(as)*r*.82,-Math.cos(as)*r*.82);c.stroke()}
 c.fillStyle=P.red;c.beginPath();c.arc(0,0,r*.07,0,7);c.fill();c.fillStyle='rgba(255,255,255,.35)';c.beginPath();c.ellipse(-r*.3,-r*.5,r*.4,r*.18,-.6,0,7);c.fill();c.restore()}
function pigeon(c,x,y,s,peck,t){c.save();c.translate(x,y);c.scale(-1,1);softShadow(c,0,s*.62,s*.5,s*.07,.28);
 c.strokeStyle='#e08a6a';c.lineWidth=s*.04;c.lineCap='round';for(const dx of [-.08,.1]){c.beginPath();c.moveTo(s*dx,s*.35);c.lineTo(s*(dx+.01),s*.6);c.moveTo(s*(dx+.01),s*.6);c.lineTo(s*(dx+.07),s*.62);c.moveTo(s*(dx+.01),s*.6);c.lineTo(s*(dx-.05),s*.62);c.stroke()}
 c.fillStyle='#707aa8';c.beginPath();c.moveTo(-s*.4,-s*.05);c.lineTo(-s*.72,s*.06);c.lineTo(-s*.68,s*.2);c.lineTo(-s*.38,s*.18);c.closePath();c.fill();
 c.fillStyle=lg(c,0,-s*.36,0,s*.36,[[0,'#b4bbdc'],[1,'#8890be']]);c.beginPath();c.ellipse(0,0,s*.5,s*.36,-.15,0,7);c.fill();
 c.fillStyle='#6c76a6';c.beginPath();c.ellipse(-s*.12,s*.02,s*.3,s*.2,-.3,0,7);c.fill();c.strokeStyle='rgba(255,255,255,.3)';c.lineWidth=s*.012;for(let i=0;i<3;i++){c.beginPath();c.arc(-s*.15+i*s*.04,s*.04,s*(.1+i*.06),.4,2.2);c.stroke()}
 c.fillStyle='rgba(255,255,255,.4)';c.beginPath();c.ellipse(s*.1,-s*.18,s*.2,s*.06,-.2,0,7);c.fill();
 c.save();c.translate(s*.38,-s*.26);c.rotate(peck*.6);c.fillStyle=lg(c,0,-s*.2,0,s*.2,[[0,'#b4bbdc'],[1,'#8890be']]);c.beginPath();c.arc(0,0,s*.2,0,7);c.fill();c.fillStyle='#e8c76a';c.beginPath();c.moveTo(s*.17,-s*.04);c.lineTo(s*.36,s*.03);c.lineTo(s*.17,s*.08);c.closePath();c.fill();c.strokeStyle='rgba(120,80,20,.5)';c.lineWidth=2;c.beginPath();c.moveTo(s*.17,s*.03);c.lineTo(s*.34,s*.03);c.stroke();
 c.fillStyle='#fff';c.beginPath();c.arc(s*.06,-s*.05,s*.055,0,7);c.fill();c.fillStyle='#120e2c';c.beginPath();c.arc(s*.075,-s*.05,s*.035,0,7);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(s*.085,-s*.062,s*.012,0,7);c.fill();c.fillStyle='#d79bd6';c.beginPath();c.ellipse(-s*.05,s*.1,s*.1,s*.055,0,0,7);c.fill();c.fillStyle='#8be0c0';c.beginPath();c.ellipse(-s*.07,s*.13,s*.06,s*.03,0,0,7);c.fill();c.restore();c.restore()}
function skBox(c,x,y,w,h){c.save();c.translate(x,y);c.fillStyle='rgba(8,6,30,.3)';rr(c,-w/2+10,-h/2+18,w,h,30);c.fill();c.fillStyle=lg(c,0,-h/2,0,h/2,[[0,'rgba(120,110,200,.35)'],[1,'rgba(40,30,90,.5)']]);rr(c,-w/2,-h/2,w,h,30);c.fill();
 c.strokeStyle='rgba(255,255,255,.08)';c.lineWidth=2;for(let i=1;i<6;i++){c.beginPath();c.moveTo(-w/2+10,-h/2+i*h/6);c.lineTo(w/2-10,-h/2+i*h/6);c.stroke()}for(let i=1;i<8;i++){c.beginPath();c.moveTo(-w/2+i*w/8,-h/2+10);c.lineTo(-w/2+i*w/8,h/2-70);c.stroke()}
 c.fillStyle='#8a8ab0';rr(c,w*.2,-h/2-6,70,60,10);c.fill();c.fillStyle='#6a6a94';c.beginPath();c.moveTo(w*.2+14,-h/2+54);c.lineTo(w*.2+56,-h/2+54);c.lineTo(w*.2+42,-h/2+84);c.lineTo(w*.2+28,-h/2+84);c.closePath();c.fill();
 c.fillStyle=lg(c,0,h/2-60,0,h/2,[[0,'#6a5cb4'],[1,'#473a8a']]);c.fillRect(-w/2+8,h/2-60,w-16,52);c.strokeStyle='rgba(255,255,255,.85)';c.lineWidth=8;rr(c,-w/2,-h/2,w,h,30);c.stroke();
 c.fillStyle='rgba(255,255,255,.1)';c.beginPath();c.moveTo(-w/2+30,-h/2+8);c.lineTo(-w/2+150,-h/2+8);c.lineTo(-w/2+50,h/2-8);c.lineTo(-w/2+8,h/2-8);c.closePath();c.fill();c.restore()}
function lever(c,x,y,on){c.save();c.translate(x,y);c.fillStyle='rgba(8,6,30,.3)';rr(c,-26+4,-26+8,52,52,14);c.fill();c.fillStyle=lg(c,0,-26,0,26,[[0,'#ece4f6'],[1,'#b8aed0']]);rr(c,-26,-26,52,52,14);c.fill();c.fillStyle=on?'#a8202c':P.red;c.beginPath();c.arc(0,0,on?14:20,0,7);c.fill();c.fillStyle='rgba(255,255,255,.5)';c.beginPath();c.arc(-5,-6,5,0,7);c.fill();c.restore()}
function pellet(c,x,y){c.fillStyle=lg(c,0,y-13,0,y+13,[[0,'#e0a458'],[1,'#a86a28']]);c.beginPath();c.arc(x,y,13,0,7);c.fill();c.fillStyle='rgba(255,255,255,.5)';c.beginPath();c.arc(x-4,y-4,4,0,7);c.fill()}
function slotM(c,x,y,s,t,pull,stopT){c.save();c.translate(x,y);softShadow(c,0,s*.74,s*.5,s*.06,.3);c.fillStyle='rgba(8,6,30,.3)';rr(c,-s*.5+12,-s*.7+18,s,s*1.4,40);c.fill();c.fillStyle=lg(c,-s*.5,0,s*.5,0,[[0,'#e8404c'],[.5,'#d6303c'],[1,'#a82030']]);rr(c,-s*.5,-s*.7,s,s*1.4,40);c.fill();gloss(c,-s*.44,-s*.68,s*.88,s*.3,30,.22);
 for(let i=0;i<9;i++){const bx=-s*.4+i*s*.1,on=Math.floor(t*6+i)%2===0;c.fillStyle=on?'#fff3a8':'#c88a2a';c.beginPath();c.arc(bx,-s*.55,s*.02,0,7);c.fill();if(on){c.fillStyle='rgba(255,230,120,.3)';c.beginPath();c.arc(bx,-s*.55,s*.045,0,7);c.fill()}}
 c.fillStyle='#8f1d2a';rr(c,-s*.42,-s*.42,s*.84,s*.6,24);c.fill();c.fillStyle='#fff6e0';rr(c,-s*.38,-s*.38,s*.76,s*.52,18);c.fill();
 const sym=['7','♥','★','7','♥','★'];for(let i=0;i<3;i++){const x0=-s*.25+i*s*.25;c.save();c.beginPath();rr(c,x0-s*.1,-s*.35,s*.2,s*.46,8);c.clip();c.fillStyle=lg(c,0,-s*.35,0,s*.11,[[0,'#e8dcc0'],[.5,'#fffaf0'],[1,'#e8dcc0']]);c.fillRect(x0-s*.1,-s*.35,s*.2,s*.46);const spin=t<stopT+i*.18;const off=spin?((t*5+i*.7)%1):0;for(let j=-1;j<=1;j++){const yy=-s*.12+(j+off)*s*.34,sy=sym[((j+i*2+(spin?Math.floor(t*5+i):0))%6+6)%6];tx(c,sy,x0,yy+s*.07,s*.22,sy==='♥'?P.red:sy==='7'?'#d6303c':P.amb)}c.fillStyle=lg(c,0,-s*.35,0,s*.11,[[0,'rgba(60,40,20,.28)'],[.3,'rgba(60,40,20,0)'],[.7,'rgba(60,40,20,0)'],[1,'rgba(60,40,20,.28)']]);c.fillRect(x0-s*.1,-s*.35,s*.2,s*.46);c.restore()}
 c.fillStyle='#5a1420';rr(c,-s*.3,s*.26,s*.6,s*.16,10);c.fill();c.fillStyle='#ffd35a';for(let i=0;i<4;i++){c.beginPath();c.ellipse(-s*.14+i*s*.09,s*.35,s*.03,s*.015,0,0,7);c.fill()}
 c.strokeStyle='#b4b4d0';c.lineWidth=s*.04;c.lineCap='round';const la=pull;c.beginPath();c.moveTo(s*.5,-s*.1);c.lineTo(s*.62,-s*.1);c.lineTo(s*.62,-s*.1-s*.3+la*s*.5);c.stroke();c.fillStyle=lg(c,0,-s*.5,0,s*.2,[[0,'#ff6070'],[1,'#c01828']]);c.beginPath();c.arc(s*.62,-s*.1-s*.3+la*s*.5,s*.075,0,7);c.fill();c.fillStyle='rgba(255,255,255,.5)';c.beginPath();c.arc(s*.6,-s*.1-s*.32+la*s*.5,s*.02,0,7);c.fill();c.restore()}
function bookF(c,x,y,s,flip){c.save();c.translate(x,y);softShadow(c,0,s*.5,s*.6,s*.05,.3);c.fillStyle='rgba(8,6,30,.3)';rr(c,-s*.62+10,-s*.45+16,s*1.24,s*.9,20);c.fill();c.fillStyle=lg(c,0,-s*.45,0,s*.45,[[0,'#9a68c4'],[1,'#6a3e90']]);rr(c,-s*.62,-s*.45,s*1.24,s*.9,20);c.fill();
 c.fillStyle='#e8dcc4';rr(c,-s*.58,-s*.41,s*1.16,s*.84,14);c.fill();
 c.fillStyle=lg(c,-s*.56,0,s*.01,0,[[0,'#fff6e0'],[.85,'#fff6e0'],[1,'#d8caa8']]);rr(c,-s*.56,-s*.4,s*.55,s*.8,12);c.fill();c.fillStyle=lg(c,s*.01,0,s*.56,0,[[0,'#d8caa8'],[.15,'#fff6e0'],[1,'#fff6e0']]);rr(c,s*.01,-s*.4,s*.55,s*.8,12);c.fill();
 c.fillStyle='#cfc4e2';for(let i=0;i<7;i++){rr(c,-s*.48,-s*.3+i*s*.09,s*.4-(i%3)*s*.06,s*.028,s*.014);c.fill()}c.fillStyle='#b8d8d4';rr(c,-s*.48,-s*.3,s*.4,s*.05,s*.02);c.fill();
 c.fillStyle='#d8cfe8';for(let i=0;i<5;i++){rr(c,s*.1,-s*.28+i*s*.09,s*.36-(i%2)*s*.08,s*.028,s*.014);c.fill()}
 if(flip>0){c.save();c.translate(s*.01,0);c.scale(Math.cos(clamp(flip)*Math.PI*.5)||.001,1);c.fillStyle='#f4ecdc';rr(c,0,-s*.4,s*.55,s*.8,12);c.fill();c.restore()}
 c.fillStyle=P.red;c.beginPath();c.moveTo(s*.38,-s*.4);c.lineTo(s*.38,-s*.1);c.lineTo(s*.43,-s*.17);c.lineTo(s*.48,-s*.1);c.lineTo(s*.48,-s*.4);c.closePath();c.fill();c.restore()}
function stopSign(c,x,y,r,a){c.save();c.translate(x,y);c.globalAlpha=a==null?1:a;c.fillStyle='rgba(8,6,30,.3)';c.beginPath();c.arc(6,10,r,0,7);c.fill();c.fillStyle=lg(c,0,-r,0,r,[[0,'#ee4450'],[1,'#b8202e']]);c.beginPath();for(let i=0;i<8;i++){const an=Math.PI/8+i*Math.PI/4;i?c.lineTo(Math.cos(an)*r,Math.sin(an)*r):c.moveTo(Math.cos(an)*r,Math.sin(an)*r)}c.closePath();c.fill();c.strokeStyle='#fff';c.lineWidth=r*.07;c.stroke();tx(c,'หยุด',0,r*.22,r*.56,'#fff');c.restore()}
function eyeIcon(c,x,y,s,look,col){c.save();c.translate(x,y);c.fillStyle='rgba(255,236,200,.18)';c.beginPath();c.arc(0,0,s*1.35,0,7);c.fill();c.fillStyle=col||'#fff';c.beginPath();c.moveTo(-s,0);c.quadraticCurveTo(0,-s*.95,s,0);c.quadraticCurveTo(0,s*.95,-s,0);c.fill();c.fillStyle=lg(c,0,-s*.36,0,s*.36,[[0,'#6a5ae0'],[1,'#2a2370']]);c.beginPath();c.arc(look*s*.3,0,s*.36,0,7);c.fill();c.fillStyle='#120e2c';c.beginPath();c.arc(look*s*.3,0,s*.18,0,7);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(look*s*.3-s*.08,-s*.08,s*.07,0,7);c.fill();c.restore()}
// ---------- shots ----------
const F1=FACES[2];
shot(0,3.46,(c,t,lt)=>{bg1(c,t,1);phone2(c,540,840,540,940,(c,sw,sh)=>feedCards(c,sw,sh,t*560));finger(c,700,1180,150,((lt*1.6)%1));if(lt>1.5)question(c,860,470,200,t,pop(lt,1.5))});
shot(3.46,5.6,(c,t,lt)=>{bg2(c,t,3);const k=pop(lt,.05);c.save();c.translate(540,780);c.scale(k,k);c.fillStyle='rgba(255,240,200,'+(.12+.06*Math.sin(t*5))+')';rr(c,-455,-90,910,180,50);c.fill();paper(c,0,0,860,150,0,P.paper);gloss(c,-420,-70,840,50,24,.5);c.fillStyle='#8a7aa0';c.beginPath();c.arc(-340,0,34,0,7);c.fill();c.strokeStyle='#8a7aa0';c.lineWidth=12;c.beginPath();c.moveTo(-318,24);c.lineTo(-290,52);c.stroke();c.strokeStyle='#8a7aa0';c.lineWidth=5;c.beginPath();c.arc(-340,0,34,0,7);c.stroke();
 if(Math.floor(t*2)%2===0){c.fillStyle=P.ink;c.fillRect(-220,-40,6,80)}c.restore();
 if(lt>1)cross(c,540,780,70,P.red,pop(lt,1));if(lt>1.3)chip(c,'ไม่ได้พิมพ์อะไรเลย',540,1000,'#fff',56,P.ink,pop(lt,1.3))});
shot(5.6,8.55,(c,t,lt)=>{bg1(c,t,5);const k=pop(lt,.05);c.save();c.translate(540,780);c.scale(k*(1-.06*Math.max(0,Math.sin(clamp((lt-.7)*6)*Math.PI))),k);c.fillStyle='rgba(8,6,30,.3)';rr(c,-170+10,-170+16,340,340,80);c.fill();c.fillStyle=lg(c,0,-170,0,170,[[0,'#ff8fb0'],[1,'#8a5ae0']]);rr(c,-170,-170,340,340,80);c.fill();gloss(c,-160,-160,320,150,70,.4);c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=4;rr(c,-166,-166,332,332,76);c.stroke();c.fillStyle='#fff';c.beginPath();c.moveTo(-40,-70);c.lineTo(80,0);c.lineTo(-40,70);c.closePath();c.fill();c.restore();
 finger(c,610,1010-60*Math.sin(clamp(lt*2)*Math.PI),150,clamp((lt-.65)*2));if(lt>1.3)chip(c,'แค่แป๊บเดียว',540,1180,P.amb,64,P.ink,pop(lt,1.3));
 if(lt>.9){c.save();c.translate(850,440);c.scale(pop(lt,.9),pop(lt,.9));c.fillStyle='rgba(8,6,30,.55)';rr(c,-110,-50,220,100,24);c.fill();tx(c,'00:'+String(5+Math.floor(lt*2)).padStart(2,'0'),0,24,66,'#fff');c.restore()}});
shot(8.55,11.1,(c,t,lt)=>{bg2(c,t,8);const m=eo(clamp(lt/2.1))*30;c.save();c.translate(540,780);const k=pop(lt,.0);c.scale(k,k);clockF(c,0,0,270,m,{pie:1});c.restore();
 if(lt>1.7)chip(c,'30 นาที',540,1170,P.amb,80,P.ink,pop(lt,1.7));for(let i=0;i<6;i++){const u=(lt*1.3+i/6)%1;c.save();c.globalAlpha=Math.sin(u*Math.PI)*.8;c.strokeStyle='#fff';c.lineWidth=8;c.beginPath();c.arc(540,780,300+u*80,-.5,.5);c.stroke();c.restore()}});
shot(11.1,13.45,(c,t,lt)=>{bg1(c,t,11);const k=pop(lt,.05);c.save();c.translate(540,800);c.scale(1,k);paper(c,0,0,700,760,-.02,P.paper);c.fillStyle=P.red;rr(c,-350,-380,700,150,22);c.fill();gloss(c,-350,-380,700,60,22,.3);c.fillStyle='#fff';for(let i=0;i<4;i++){c.beginPath();c.arc(-210+i*140,-380,16,0,7);c.fill();c.fillStyle='#b8b0c8';rr(c,-218+i*140,-396,16,34,8);c.fill();c.fillStyle='#fff'}c.strokeStyle='rgba(60,40,90,.12)';c.lineWidth=3;for(let i=1;i<5;i++){c.beginPath();c.moveTo(-320,-100+i*95);c.lineTo(320,-100+i*95);c.stroke()}tx(c,'2006',0,110,260,P.ink);c.restore();
 for(let i=0;i<5;i++){const u=clamp((lt-.5-i*.1)*3);if(u>0){c.fillStyle=P.amb;c.save();c.translate(190+i*175,1240+Math.sin(t*4+i)*6);c.scale(u,u);c.beginPath();c.arc(0,0,12,0,7);c.fill();c.restore()}}});
shot(13.45,17.55,(c,t,lt)=>{bg2(c,t,13);const k=pop(lt,.05);c.save();c.translate(300,740);c.scale(k,k);face(c,0,0,170,{f:F1,t,mouth:'smile'});c.restore();if(lt>.5)chip(c,'อาซา ราสกิน',300,1010,'#fff',44,P.ink,pop(lt,.5));
 phone2(c,770,810,380,860,(c,sw,sh)=>{c.fillStyle='#fff6e0';c.fillRect(-sw/2,-sh/2,sw,sh);for(let i=0;i<24;i++){const y=-sh/2+60+i*76-((lt*130)%76)+0,w=sw*(.5+hash(i+Math.floor(lt*130/76))*.35);c.fillStyle=i%5===0?FCOL[(i/5|0)%6]:'#cfc4e2';rr(c,-sw/2+30,y,i%5===0?sw-60:w,i%5===0?44:20,10);c.fill()}
  const th=Math.max(40,340-lt*85);c.fillStyle='rgba(60,50,100,.7)';rr(c,sw/2-22,-sh/2+30+lt*30,10,th,5);c.fill()});
 if(lt>2.4)chip(c,'∞',770,1330,P.amb,90,P.ink,pop(lt,2.4))});
shot(17.55,19.35,(c,t,lt)=>{bg1(c,t,17);const k=pop(lt,.05);c.save();c.translate(540,760);c.scale(k,k);face(c,0,0,210,{f:F1,t,mouth:'flat',brow:1,cheek:0,looky:.3,rot:Math.sin(t*2)*.04});c.restore();if(lt>.5)chip(c,'ยอมรับ',540,1120,P.amb,70,P.ink,pop(lt,.5))});
shot(19.35,22.4,(c,t,lt)=>{bg2(c,t,19);for(let i=0;i<9;i++){const x=120+hash(i*2.3)*840,u=((lt*.45+hash(i*5.1))%1),y=300+u*900;c.save();c.globalAlpha=.9*Math.sin(u*Math.PI);clockF(c,x,y,46+hash(i)*30,lt*20+i*7);c.restore()}
 const k=pop(lt,.1);c.save();c.translate(540,800);c.scale(k,k);clockF(c,0,0,260,lt*45,{pie:0});c.restore()});
shot(22.4,24.7,(c,t,lt)=>{bg1(c,t,22);const k=pop(lt,.05);c.save();c.translate(540,780);c.scale(k,k);c.fillStyle='rgba(8,6,30,.35)';rr(c,-370+10,-250+16,740,500,34);c.fill();c.fillStyle='#120e2c';rr(c,-370,-250,740,500,34);c.fill();c.fillStyle=lg(c,0,-230,0,230,[[0,'#6a5ae0'],[1,'#e0809a']]);rr(c,-350,-230,700,400,22);c.fill();
 c.fillStyle='rgba(255,255,255,.2)';c.beginPath();c.moveTo(-350,-230);c.lineTo(-150,-230);c.lineTo(-330,170);c.lineTo(-350,170);c.closePath();c.fill();c.fillStyle='#fff';c.beginPath();c.moveTo(-40,-110);c.lineTo(80,-30);c.lineTo(-40,50);c.closePath();c.fill();c.fillStyle='#120e2c';c.beginPath();c.arc(0,225,8,0,7);c.fill();c.fillStyle='rgba(255,255,255,.3)';rr(c,-330,190,660,16,8);c.fill();c.fillStyle=P.amb;rr(c,-330,190,660*clamp(lt/1.7),16,8);c.fill();c.restore();
 if(lt>.3)chip(c,'2 ชม.',300,420,'#fff',56,P.ink,pop(lt,.3));if(lt>1.7)stamp(c,'จบ',540,1180,-.08,P.amb,pop(lt,1.7,.25),'')});
shot(24.7,27.3,(c,t,lt)=>{bg2(c,t,24);const k=pop(lt,.05);c.save();c.translate(540,800);c.scale(k,k);bookF(c,0,0,520,clamp((lt-.5)/.9));c.restore();if(lt>1.5)chip(c,'บทสุดท้าย',540,1180,P.amb,70,P.ink,pop(lt,1.5))});
shot(27.3,29.0,(c,t,lt)=>{bg1(c,t,27);phone2(c,540,860,520,920,(c,sw,sh)=>feedCards(c,sw,sh,t*900));const k=pop(lt,.1);c.save();c.translate(540,360);c.scale(k,k);tx(c,'∞',0,90,260,P.amb,'center',P.nav1,16);c.restore()});
shot(29.0,32.2,(c,t,lt)=>{bg2(c,t,29);const k=pop(lt,.05);c.fillStyle=rg(c,330,820,40,380,[[0,'rgba(255,170,200,.35)'],[1,'rgba(255,170,200,0)']]);c.fillRect(0,420,700,800);brain2(c,330,820,260*k,t,{eyes:true,lookx:1});const a=lt<1.2?.35+.25*Math.sin(t*10):.25;stopSign(c,780,780,170,a);if(lt>1.2)cross(c,780,780,90,P.red,pop(lt,1.2));if(lt>1.6)chip(c,'ไม่มีสัญญาณหยุด',540,1190,'#fff',54,P.ink,pop(lt,1.6));if(lt>.4)question(c,330,430,130,t,pop(lt,.4))});
shot(32.2,35.6,(c,t,lt)=>{bg1(c,t,32);skBox(c,540,820,860,620);lever(c,200,760,Math.sin(lt*5)>.5);pigeon(c,520,880,300,Math.max(0,Math.sin(lt*5)),t);if(lt>.3)chip(c,'สกินเนอร์',540,420,'#fff',56,P.ink,pop(lt,.3));if(lt>1.2)chip(c,'ทดลองกับนกพิราบ',540,1260,P.amb,52,P.ink,pop(lt,1.2))});
shot(35.6,40.45,(c,t,lt)=>{bg2(c,t,35);const ph=1.4*lt+.7*lt*lt;skBox(c,540,820,860,620);lever(c,200,760,Math.abs(Math.sin(ph*Math.PI))>.7);pigeon(c,520,880,300,Math.abs(Math.sin(ph*Math.PI)),t);
 for(const d of [.5,1.9,2.15,3.7,4.4]){const u=(lt-d)/.7;if(u>0&&u<1)pellet(c,720,600+u*220)}
 c.save();c.translate(850,440);c.fillStyle='rgba(8,6,30,.55)';rr(c,-120,-50,240,100,24);c.fill();tx(c,'จิก ×'+Math.floor(ph),0,24,56,'#fff');c.restore();if(lt>.6)chip(c,'อาหารไม่แน่นอน',540,1260,P.amb,52,P.ink,pop(lt,.6))});
shot(40.45,44.3,(c,t,lt)=>{bg1(c,t,40);phone2(c,540,800,520,900,(c,sw,sh)=>feedCards(c,sw,sh,t*380,{hearts:1}));if(lt>1.35&&lt<2.65)chip(c,'โดนใจ',540,1290,P.pink,64,'#fff',pop(lt,1.35));if(lt>2.68)chip(c,'เฉยๆ',540,1290,'#8a82b8',64,'#fff',pop(lt,2.68))});
shot(44.3,46.9,(c,t,lt)=>{bg2(c,t,44);const sw=clamp((lt-.1)/1.1);for(let i=0;i<3;i++){const X=[220,540,860],j=(i+Math.floor(sw*4))%3,x=lerp(X[i],X[j],eio(sw*4%1)*(sw<1&&sw>0?1:0)),k=pop(lt,.05+i*.1);c.save();c.translate(x,800+Math.sin(t*5+i)*8);c.scale(k,k);c.rotate((i-1)*.06);paper(c,0,0,260,380,0,'#6a5ae0');c.fillStyle='rgba(255,255,255,.25)';rr(c,-100,-160,200,320,16);c.fill();tx(c,'?',0,50,170,'#fff');c.restore()}
 if(lt>1.3)chip(c,'อันต่อไป?',540,1180,'#fff',70,P.ink,pop(lt,1.3))});
shot(46.9,50.1,(c,t,lt)=>{bg1(c,t,46);const cyc=(lt*.9)%1,pull=Math.sin(clamp(cyc*1.6)*Math.PI*.5)*(cyc<.62?1:1-clamp((cyc-.62)/.2))*130;
 phone2(c,540,840,520,900,(c,sw,sh)=>{c.save();c.translate(0,pull);feedCards(c,sw,sh,60);c.restore();if(pull>20){c.save();c.globalAlpha=clamp(pull/120);spinner(c,0,-sh/2+60+pull*.2,26,t);c.restore()}});finger(c,640,1000+pull*1.2,150,0);
 c.save();c.fillStyle='#fff';c.strokeStyle='#fff';c.lineWidth=10;c.lineCap='round';c.beginPath();c.moveTo(900,560);c.lineTo(900,690);c.moveTo(860,650);c.lineTo(900,700);c.lineTo(940,650);c.stroke();c.restore();if(lt>.5)chip(c,'ดึงลงเพื่อรีเฟรช',540,1330,P.amb,56,P.ink,pop(lt,.5))});
shot(50.1,52.3,(c,t,lt)=>{bg2(c,t,50);const pull=lt<.3?0:clamp((lt-.3)/.4);const k=pop(lt,.05);c.save();c.translate(540,800);c.scale(k,k);slotM(c,0,0,520,lt,pull<1?pull:1-clamp((lt-1)/.3),1.2);c.restore();if(lt>1.5)chip(c,'คล้ายคันโยกสล็อต',540,1330,P.red,56,'#fff',pop(lt,1.5))});
shot(52.3,54.95,(c,t,lt)=>{plainBG(c,'#2a0d1c','#5a1020');const sh=lt>.35?Math.sin(t*60)*8*(1-clamp((lt-.35)/.5)):0;c.save();c.translate(540+sh,800);const k=pop(lt,.3);c.scale(k,k);c.fillStyle=rg(c,0,0,60,520,[[0,'rgba(255,120,120,.35)'],[1,'rgba(255,120,120,0)']]);c.fillRect(-540,-540,1080,1080);c.fillStyle='rgba(8,6,30,.35)';c.beginPath();c.moveTo(10,-240);c.lineTo(262,204);c.lineTo(-238,204);c.closePath();c.fill();c.fillStyle=lg(c,0,-250,0,190,[[0,'#ffe08a'],[1,'#f2a93b']]);c.beginPath();c.moveTo(0,-250);c.lineTo(250,190);c.lineTo(-250,190);c.closePath();c.fill();c.lineJoin='round';c.strokeStyle='#fff';c.lineWidth=14;c.stroke();tx(c,'!',0,140,300,'#5a1020');c.restore();
 if(lt<.25){c.fillStyle='rgba(255,255,255,'+(.8*(1-lt/.25))+')';c.fillRect(0,0,W,H)}if(lt>.4&&lt<.65){for(let i=0;i<4;i++){c.fillStyle=i%2?'rgba(255,60,90,.35)':'rgba(60,220,255,.3)';c.fillRect(hash(i+lt*9)*40,300+hash(i*3+lt*7)*1000,W,18+hash(i)*30)}}});
shot(54.95,57.2,(c,t,lt)=>{bg2(c,t,54);const k=pop(lt,.05);c.save();c.translate(300,760);c.scale(k,k);face(c,0,0,170,{f:F1,t,mouth:'flat',brow:1,cheek:0,looky:.8});c.restore();phone2(c,780,800,340,700,(c,sw,sh)=>feedCards(c,sw,sh,t*500));
 if(lt>.5){const q=pop(lt,.5);c.save();c.translate(300,1130);c.scale(q,q);chip(c,'เลือก',0,0,'#fff',60,P.ink);c.restore();if(lt>.9)cross(c,300,1130,50,P.red,pop(lt,.9))}});
shot(57.2,60.1,(c,t,lt)=>{bg1(c,t,57);const sp=lt<1?900:lerp(900,0,eo(clamp((lt-1)/.5)));phone2(c,540,900,520,860,(c,sw,sh)=>feedCards(c,sw,sh,200+Math.min(lt,1)*900+(lt>1?lerp(0,225,eo(clamp((lt-1)/.5))):0)));finger(c,640,1180-Math.min(lt,1)*90,150,lt>1?clamp((lt-1)/.6):0);
 if(lt>1.3){const q=pop(lt,1.3);eyeIcon(c,540,380,150*q,Math.sin(t*3)*.6)}if(lt>1.8)chip(c,'เรียนรู้',540,1330,P.amb,58,P.ink,pop(lt,1.8))});
shot(60.1,62.35,(c,t,lt)=>{bg2(c,t,60);phone2(c,260,820,340,640,(c,sw,sh)=>feedCards(c,sw,sh,t*200,{same:P.pink,hearts:0}));
 for(let i=0;i<5;i++){const u=((lt*.9+i/5)%1),x=360+u*420,k=Math.sin(u*Math.PI);c.save();c.globalAlpha=Math.min(1,k*2);c.translate(x,820);c.scale(.5+.3*k,.5+.3*k);c.fillStyle='#fff6e0';rr(c,-110,-80,220,160,20);c.fill();c.fillStyle=P.pink;rr(c,-92,-50,184,100,12);c.fill();heart(c,60,50,16,P.red);c.restore()}
 face(c,860,820,130,{f:F1,t,mouth:'o',looky:-.8});if(lt>.5)chip(c,'ซ้ำๆ',540,1160,P.amb,70,P.ink,pop(lt,.5))});
shot(62.35,65.4,(c,t,lt)=>{bg1(c,t,62);c.save();c.translate(540,430);paper(c,0,0,820,120,0,P.paper);c.fillStyle='#8a7aa0';c.beginPath();c.arc(-340,0,26,0,7);c.fill();if(Math.floor(t*2)%2===0){c.fillStyle=P.ink;c.fillRect(-250,-32,5,64)}c.restore();
 const k=pop(lt,.4);c.save();c.translate(280+Math.sin(lt*2.6)*60,880);c.scale(k,k);c.strokeStyle=P.amb;c.lineWidth=18;c.lineCap='round';c.beginPath();c.arc(0,0,70,0,7);c.stroke();c.beginPath();c.moveTo(50,50);c.lineTo(110,110);c.stroke();c.restore();
 const q=lt>1.6?clamp((lt-1.6)/1):0;c.save();c.translate(lerp(380,800,eo(q)),880);c.fillStyle='#fff6e0';rr(c,-110,-80,220,160,20);c.fill();c.fillStyle=P.pink;rr(c,-92,-50,184,100,12);c.fill();c.restore();face(c,880,900,120,{f:F1,t,mouth:'smile',looky:-.6});if(lt>2)chip(c,'แอปหาให้',540,1200,P.amb,64,P.ink,pop(lt,2))});
shot(65.4,66.5,(c,t,lt)=>{plainBG(c,'#f2b84b','#e08a3a');const k=bo(lt/.25);c.save();c.translate(540,860);c.scale(k,k);tx(c,'สรุป',0,60,230,'#fff','center','#7a3a12',16);c.restore();c.fillStyle='#7a3a12';c.fillRect(300,960,480*clamp((lt-.1)/.3),12)});
shot(66.5,68.1,(c,t,lt)=>{bg2(c,t,66);const k=pop(lt,.05);c.save();c.translate(540,680);c.scale(k,k);face(c,0,0,200,{f:F1,t,mouth:'flat',cheek:0,looky:0});c.restore();if(lt>.3){const q=pop(lt,.3);eyeIcon(c,540,1030,110*q,0,'#fff');if(lt>.6)cross(c,540,1030,80,P.red,pop(lt,.6))}if(lt>.5)chip(c,'อยากดู',540,1230,'#fff',60,P.ink,pop(lt,.5))});
shot(68.1,70.7,(c,t,lt)=>{bg1(c,t,68);const k=pop(lt,.05);c.fillStyle=rg(c,540,720,40,420,[[0,'rgba(255,170,200,.35)'],[1,'rgba(255,170,200,0)']]);c.fillRect(100,300,880,840);brain2(c,540,720,300*k,t,{eyes:true,lookx:1});for(let i=0;i<3;i++){const a=((t*1.5+i/3)%1);c.fillStyle='#fff';c.globalAlpha=Math.sin(a*Math.PI);c.beginPath();c.arc(780+i*40,430-i*20-a*30,10+i*4,0,7);c.fill();c.globalAlpha=1}question(c,880,330,150,t,pop(lt,.3));
 const u=clamp((lt-.5)/.8);c.save();c.translate(540,1170+(1-eo(u))*200);c.rotate(Math.sin(t*6)*.05);paper(c,0,0,220,300,0,'#6a5ae0');tx(c,'?',0,45,150,'#fff');c.restore();if(lt>1.4)chip(c,'รอลุ้น',540,1330,P.amb,60,P.ink,pop(lt,1.4))});
shot(70.7,73.2,(c,t,lt)=>{bg2(c,t,70);phone2(c,440,860,520,900,(c,sw,sh)=>feedCards(c,sw,sh,t*700));stopSign(c,880,760,120,.3);if(lt>.7)cross(c,880,760,70,P.red,pop(lt,.7));if(lt>.4)chip(c,'ไม่มีจุดให้หยุด',540,1330,'#fff',56,P.ink,pop(lt,.4))});
shot(73.2,75.05,(c,t,lt)=>{bg1(c,t,73);const k=pop(lt,.05);c.save();c.translate(540,760);c.scale(k,k);clockF(c,0,0,240,lt*40,{pie:1});c.restore();question(c,830,430,180,t,pop(lt,.4));if(lt>.6)chip(c,'วันนี้',540,1160,P.amb,70,P.ink,pop(lt,.6))});
shot(75.05,76.05,(c,t,lt)=>{bg2(c,t,75);const ds=[[250,640,'#e0809a'],[790,760,'#6fc7c0'],[430,930,'#f2b84b']];
 for(let i=0;i<3;i++){const q=pop(lt,.05+i*.2,.2);if(lt<.05+i*.2)continue;c.save();c.translate(ds[i][0],ds[i][1]);c.scale(q,q);c.fillStyle='#fff';rr(c,-170,-70,340,140,44);c.fill();c.fillStyle=ds[i][2];c.beginPath();c.arc(-120,0,26,0,7);c.fill();c.fillStyle='#8a7aa0';for(let j=0;j<3;j++){c.beginPath();c.arc(-40+j*50,0,12+Math.sin(t*8+j+i)*4,0,7);c.fill()}c.restore()}});
shot(76.05,77.92,(c,t,lt)=>{nightBG(c,t);c.fillStyle=P.moon;c.beginPath();c.arc(800,520,120,0,7);c.fill();
 const k=bo(lt/.3);c.save();c.translate(540,900);c.scale(k,k);tx(c,'@เรื่องสงสัย',0,0,112,'#fff','center',P.nav1,14);
 const pk=1+.05*Math.sin(t*8);c.scale(pk,pk);c.fillStyle=P.amb;rr(c,-250,70,500,120,60);c.fill();tx(c,'+ ติดตามไว้นะ',0,152,58,P.ink);c.restore()});
const CAPS=[[0.25, 1.22, "คุณเคยสงสัยมั้ย", "Ever wondered", 1], [1.75, 3.29, "ทำไมเราเลื่อนหน้าจอไม่หยุด", "why we can’t stop scrolling", 0], [3.66, 5.18, "ทั้งที่ไม่ได้หาอะไรอยู่เลย", "when we’re not looking for anything", 0], [6.01, 7.75, "เปิดแอปมาแค่จะดูแป๊บเดียว", "opened it for just a sec", 0], [8.2, 8.9, "รู้ตัวอีกที", "next thing you know", 0], [9.26, 10.48, "ผ่านไปครึ่งชั่วโมงแล้ว", "half an hour is gone", 1], [11.58, 13.0, "ในปี ค.ศ. 2006", "in 2006", 1], [13.49, 15.32, "นักออกแบบชื่ออาซา ราสกิน", "designer Aza Raskin", 0], [15.64, 17.24, "คิดระบบเลื่อนไม่รู้จบขึ้นมา", "invented infinite scroll", 0], [17.85, 19.13, "ต่อมาเขาเองยอมรับว่า", "later he admitted", 0], [19.47, 20.48, "มันทำให้คนเสียเวลา", "it made people waste", 0], [20.53, 21.76, "หลายร้อยล้านชั่วโมง", "hundreds of millions of hours", 2], [22.78, 24.48, "หนังยังจบใน 2 ชั่วโมง", "a movie ends in 2 hours", 0], [24.94, 26.57, "หนังสือยังมีบทสุดท้าย", "a book has a last chapter", 0], [27.09, 28.4, "แต่ฟีดไม่มีจุดจบ", "but the feed never ends", 2], [29.24, 30.73, "สมองเลยไม่เคยได้สัญญาณว่า", "so the brain never gets the signal", 0], [30.91, 31.7, "พอได้แล้ว", "enough", 1], [32.61, 34.21, "นักจิตวิทยาชื่อสกินเนอร์", "psychologist Skinner", 0], [34.35, 35.35, "ทดลองกับนกพิราบ", "experimented on pigeons", 0], [35.94, 37.29, "ถ้าอาหารมาไม่แน่นอน", "if food comes unpredictably", 0], [37.65, 38.78, "นกจะจิกคันโยกถี่", "the pigeon pecks the lever more", 0], [38.84, 39.94, "กว่าตอนได้ทุกครั้ง", "than when it always comes", 0], [40.63, 41.4, "ฟีดก็เหมือนกัน", "the feed is the same", 1], [41.8, 42.82, "บางโพสต์โดนใจ", "some posts hit", 0], [43.13, 44.03, "บางโพสต์เฉยๆ", "some are meh", 0], [44.56, 46.48, "คุณไม่รู้ว่าอันต่อไปจะเป็นอันไหน", "you never know what’s next", 1], [47.33, 49.35, "คนที่คิดท่าดึงลงเพื่อรีเฟรช", "the inventor of pull-to-refresh", 0], [49.69, 50.24, "ยังบอกว่า", "said", 0], [50.44, 51.95, "มันคล้ายคันโยกตู้สล็อต", "it’s like a slot machine lever", 0], [52.67, 54.61, "และนี่คือจุดที่ทุกอย่างเริ่มผิดพลาด", "and this is where it all goes wrong", 2], [55.08, 56.8, "คุณไม่ได้เป็นคนเลือกว่าจะดูอะไร", "you don’t choose what you watch", 0], [57.3, 58.32, "แอปเรียนรู้ว่า", "the app learns", 0], [58.59, 59.78, "อะไรทำให้นิ้วคุณหยุด", "what makes your thumb stop", 1], [60.34, 61.87, "แล้วป้อนสิ่งนั้นให้ซ้ำๆ", "then feeds you more of it", 0], [62.46, 63.39, "คุณไม่ได้หาอะไร", "you’re not searching", 0], [63.8, 64.89, "เพราะมันหาให้คุณแทน", "it searches for you", 2], [65.56, 66.23, "สรุปง่ายๆ", "in short", 1], [66.61, 67.86, "คุณไม่ได้เลื่อนเพราะอยากดู", "you don’t scroll to watch", 0], [68.23, 70.4, "แต่เพราะสมองกำลังรอลุ้นอันต่อไป", "your brain waits for the next one", 1], [70.88, 72.59, "และฟีดก็ไม่เคยมีจุดให้หยุด", "and the feed never lets you stop", 0], [73.33, 74.74, "วันนี้คุณเลื่อนไปกี่ชั่วโมงแล้ว", "how many hours today?", 1], [75.12, 75.87, "คอมเมนต์มาได้เลย", "tell me in the comments", 0], [76.14, 77.63, "แล้วกดติดตามเรื่องสงสัยไว้ด้วย", "and follow @เรื่องสงสัย", 0]];
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
const SHAKE=[[52.67,.12,8]];
function camOf(sh,t,lt,d){return [1+.045*clamp(lt/d),540,960]}
function renderAt(t,canvas){const c=canvas.getContext('2d');c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation='source-over';c.globalAlpha=1;c.filter='none';
 let sh=SH[0];for(const s of SH)if(t>=s.a)sh=s;c.fillStyle='#000';c.fillRect(0,0,W,H);
 const lt=t-sh.a,d=sh.b-sh.a;c.save();const [z,fx,fy]=camOf(sh,t,lt,d);let sx=0,sy=0;for(const [a,du,am] of SHAKE){if(t>=a&&t<a+du){const k=1-(t-a)/du;sx+=Math.sin(t*90)*am*k;sy+=Math.cos(t*77)*am*k}}
 c.translate(540+sx+noise(t*.5,1)*3,960+sy+noise(t*.4,4)*3);c.scale(z,z);c.translate(-fx,-fy);sh.fn(c,t,lt);c.restore();
 c.save();c.globalCompositeOperation='soft-light';c.fillStyle='rgba(120,90,200,.12)';c.fillRect(0,0,W,H);c.restore();
 c.save();c.fillStyle=rg(c,540,900,W*.35,H*.7,[[0,'rgba(0,0,0,0)'],[1,'rgba(8,4,30,.5)']]);c.fillRect(0,0,W,H);c.restore();
 const fi=Math.floor(t*30),R=mulberry32(fi*7+3);c.save();c.globalCompositeOperation='overlay';c.globalAlpha=.045;const nt=noiseTile();for(let i=0;i<2;i++)c.drawImage(nt,0,0,256,256,-R()*256,-R()*256,W+300,H+300);c.restore();
 const lt2=t-sh.a;if(sh.a>0&&lt2<.08){c.fillStyle='rgba(10,6,30,'+(.7*(1-lt2/.08))+')';c.fillRect(0,0,W,H)}
 if(t<.2){c.fillStyle='rgba(0,0,0,'+(.4*(1-t/.2))+')';c.fillRect(0,0,W,H)}
 caps(c,t);credit(c);
 if(t>=DUR-.35){c.fillStyle='rgba(0,0,0,'+clamp((t-(DUR-.35))/.3)+')';c.fillRect(0,0,W,H)}}
