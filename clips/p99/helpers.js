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

