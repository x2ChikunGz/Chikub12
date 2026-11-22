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

// ---------- shots ----------
// S1 hook: face cringes at own voice on phone
shot(0,4.8,(c,t,lt)=>{plainBG(c,'#2a2150','#4a3a80');stars(c,40,5,t,1000);
 const cr=clamp((lt-1.5)/.4),sh=cr*Math.sin(t*38)*3;
 c.save();c.translate(sh,0);face(c,540,545,200,{f:F0,t,mouth:cr>0?'flat':'smile',brow:cr>0?-1:0,lookx:cr>0?.4:0,looky:.5,cheek:cr>0?0:1});
 if(cr>0){c.fillStyle='#7ad0f0';const d=Math.sin(lt*5)*6;c.beginPath();c.moveTo(740,520+d);c.quadraticCurveTo(775,590+d,740,610+d);c.quadraticCurveTo(705,590+d,740,520+d);c.fill()}c.restore();
 rings(c,540,1110,t,'#ffd88a',3,170);
 phone(c,540,1110,470,520,t,{play:.18+lt*.09});
 if(lt>3.0){const k=bo((lt-3.0)/.3);c.save();c.translate(540,1290);c.scale(k,k);c.fillStyle=P.red;rr(c,-110,-44,220,88,44);c.fill();tx(c,'ลบ',0,20,56,'#fff');c.restore()}
 if(lt>3.7){const u=(lt-3.7)/.5;c.save();c.strokeStyle='rgba(255,255,255,'+(1-clamp(u))*.9+')';c.lineWidth=8;c.beginPath();c.arc(540,1290,40+u*70,0,7);c.stroke();c.restore()}});
// S2 stay to the end / study
shot(4.8,7.2,(c,t,lt)=>{plainBG(c,'#15405a','#2a2d6a');stars(c,25,7,t,1000);
 const p=clamp((lt-.03)/.85);c.fillStyle='rgba(255,255,255,.22)';rr(c,120,560,840,34,17);c.fill();c.fillStyle=P.amb;rr(c,120,560,840*p,34,17);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(120+840*p,577,30,0,7);c.fill();
 tx(c,'0:00',120,640,36,'#bcd','left');tx(c,'จบ',960,640,40,'#fff','right');
 if(lt>1.1){const k=bo((lt-1.1)/.4);studyCard(c,t,lt,540,1000,k,1)}});
// S3 unlock + heart that is hated
shot(7.2,12.0,(c,t,lt)=>{plainBG(c,'#15405a','#2a2d6a');stars(c,25,8,t,1000);
 if(lt<1.1){const k=1-eo(lt/1.1)*.0;studyCard(c,t,lt,540,880,1,lt<.2?1:0);c.save();c.globalAlpha=clamp(1-(lt-.1)/.5);c.fillStyle='#fff';c.restore()}
 else{const a=clamp((lt-1.1)/.35);c.save();c.globalAlpha=a;c.translate(540,820);
  // speaker + heart
  const bk=lt>1.8?clamp((lt-1.8)/.45):0;const sp=lt>3.05?clamp((lt-3.05)/.4):0;
  c.save();c.translate(0,0);c.translate(-bk*0,0);
  // left half
  c.save();c.beginPath();c.rect(-400,-400,400-sp*0,800);c.clip();c.translate(-bk*28*(1-sp),bk*10*(1-sp));c.rotate(-bk*.12*(1-sp));heart(c,0,0,260,sp>0?P.pink:'#a85870');c.restore();
  c.save();c.beginPath();c.rect(0,-400,400,800);c.clip();c.translate(bk*28*(1-sp),bk*10*(1-sp));c.rotate(bk*.12*(1-sp));heart(c,0,0,260,sp>0?P.pink:'#a85870');c.restore();
  if(bk>0&&sp===0){c.strokeStyle='#fff';c.lineWidth=10;c.lineCap='round';c.beginPath();c.moveTo(-10,-120);c.lineTo(12,-40);c.lineTo(-14,30);c.lineTo(10,120);c.stroke()}
  c.restore();
  if(sp>0){const q=bo(sp);c.save();c.scale(q,q);tx(c,'?',0,-20,200,'#fff','center',P.nav1,12);c.restore();for(let i=0;i<6;i++){const a=i/6*6.28+t,r=300+Math.sin(t*3+i)*20;c.fillStyle=P.amb;c.beginPath();c.arc(Math.cos(a)*r,Math.sin(a)*r*.8,8,0,7);c.fill()}}
  c.restore();
  // face under heart
  face(c,540,1210,110,{f:F0,t,mouth:sp>0?'smile':'flat',brow:sp>0?0:-1,cheek:0})}});
// S4 two paths appear
shot(12.0,15.0,(c,t,lt)=>{plainBG(c,'#2a2150','#4a3a80');stars(c,30,12,t,1000);
 const k=bo(lt/.4),h=[430,760],s=215;c.save();c.translate(h[0],h[1]);c.scale(k,k);c.translate(-h[0],-h[1]);headSide(c,h[0],h[1],s,{t,talk:lt>.5,blink:(t%3)>2.85});c.restore();
 const p=headPts(h[0],h[1],s);if(lt>.5)rings(c,p.M[0]+10,p.M[1],t,'#fff',3,150);
 const u=clamp((lt-1.2)/1.0);if(u>0){const A=airPath(h,s),B=bonePath(h,s);c.save();pathDraw(c,A[0],A[1],A[2],A[3],'#6fc7c0',10,t,u,5);pathDraw(c,B[0],B[1],B[2],B[3],P.amb,10,t,u,3);c.restore()}});
// S5 air path
shot(15.0,18.4,(c,t,lt)=>{plainBG(c,'#15405a','#2a2d6a');stars(c,30,15,t,1000);
 const h=[430,760],s=215;headSide(c,h[0],h[1],s,{t,talk:true,blink:(t%3)>2.85});const A=airPath(h,s),B=bonePath(h,s);
 pathDraw(c,B[0],B[1],B[2],B[3],P.amb,10,t,.2,0);pathDraw(c,A[0],A[1],A[2],A[3],'#6fc7c0',14,t,1,6);const p=headPts(h[0],h[1],s);rings(c,p.M[0]+10,p.M[1],t,'#fff',3,150);
 if(lt>.5)chip(c,'ทางอากาศ',760,520,'#6fc7c0',64,'#0e2a3a',bo((lt-.5)/.3));
 if(lt>1.4){const q=clamp((lt-1.4)/.25);c.save();c.globalAlpha=q*(.5+.5*Math.sin(lt*10));c.strokeStyle='#fff';c.lineWidth=8;c.beginPath();c.arc(A[3][0],A[3][1],70+((lt*60)%40),0,7);c.stroke();c.restore()}});
// S6 bone path, x-ray
shot(18.4,22.4,(c,t,lt)=>{plainBG(c,'#2a2150','#4a3a80');stars(c,30,18,t,1000);
 const h=[430,760],s=215;headSide(c,h[0],h[1],s,{t,xray:true,talk:true,cochlea:lt>2.3?bo((lt-2.3)/.4):0});const A=airPath(h,s),B=bonePath(h,s);
 pathDraw(c,A[0],A[1],A[2],A[3],'#6fc7c0',10,t,.15,0);
 // vibration: wavy along bone path
 pathDraw(c,B[0],B[1],B[2],B[3],P.amb,16,t,1,7);
 if(lt>.3)chip(c,'ทางกระดูก',760,520,P.amb,64,P.ink,bo((lt-.3)/.3));
 if(lt>2.4){const q=bo((lt-2.4)/.3);chip(c,'หูชั้นใน',330,1180,'#fff',50,P.ink,q);c.strokeStyle='#fff';c.lineWidth=5;c.setLineDash([10,10]);c.beginPath();c.moveTo(335,1130);c.lineTo(B[3][0]-5,B[3][1]+25);c.stroke();c.setLineDash([])}});
// S7 deeper
shot(22.4,26.5,(c,t,lt)=>{plainBG(c,'#2a2150','#4a3a80');stars(c,30,22,t,1000);
 const h=[540,560],s=150;c.save();const gl=rg(c,h[0],h[1],20,420,[[0,'rgba(242,184,75,.45)'],[1,'rgba(242,184,75,0)']]);c.fillStyle=gl;c.fillRect(0,100,W,900);c.restore();
 headSide(c,h[0],h[1],s,{t,xray:true,talk:true,cochlea:1});
 const B=bonePath(h,s);pathDraw(c,B[0],B[1],B[2],B[3],P.amb,12,t,1,5);
 const k=bo((lt-.35)/.35);c.save();c.globalAlpha=clamp(k);paper(c,540,1150,900,330,0,'rgba(244,236,220,.96)');waveLine(c,150,930,1150,92,1.6,-t*4,P.amb,18);
 tx(c,'ทุ้ม',540,1078,60,P.ink);c.restore();
 if(lt>2.4)chip(c,'เสียงในหัว',540,330,P.amb,64,P.ink,bo((lt-2.4)/.3))});
// S8 mic outside
shot(26.5,30.3,(c,t,lt)=>{plainBG(c,'#15405a','#2a2d6a');stars(c,30,26,t,1000);
 const h=[370,780],s=200;headSide(c,h[0],h[1],s,{t,talk:true,blink:(t%3)>2.85});const p=headPts(h[0],h[1],s);
 const k=bo((lt-.45)/.35);if(lt>.45){c.save();c.translate(900,860);c.scale(k,k);mic(c,0,0,210,t,lt>1.9);c.restore()}
 if(lt>1.8){const u=clamp((lt-1.8)/.4);pathDraw(c,p.M,[p.M[0]+150,p.M[1]-20],[760,780],[800,830],'#6fc7c0',14,t,u,4);rings(c,p.M[0]+10,p.M[1],t,'#fff',3,150)}
 const B=bonePath(h,s);pathDraw(c,B[0],B[1],B[2],B[3],P.amb,10,t,lt>1.2?.2:1,lt>1.2?0:3);
 if(lt>1.3){cross(c,(B[0][0]+B[3][0])/2-20,B[0][1]+55,38,P.red,bo((lt-1.3)/.25))}});
// S9 thin wave
shot(30.3,33.7,(c,t,lt)=>{plainBG(c,'#15405a','#2a2d6a');stars(c,30,30,t,1000);
 paper(c,540,640,900,380,0,'rgba(244,236,220,.96)');tx(c,'เสียงในหัว',540,520,48,'#8a7aa0');waveLine(c,150,930,650,96,1.5,-t*4,P.amb,18);
 const k=bo((lt-.15)/.35);c.save();c.globalAlpha=clamp(k);paper(c,540,1090,900,380,0,'rgba(244,236,220,.96)');tx(c,'เสียงในคลิป',540,970,48,'#8a7aa0');
 c.globalAlpha=.25*clamp(k);waveLine(c,150,930,1100,96,1.5,-t*4,P.amb,18);c.globalAlpha=clamp(k);waveLine(c,150,930,1100,36,4.5,-t*9,'#6fc7c0',10);c.restore();
 if(lt>1.7)chip(c,'บางลง',540,866,'#6fc7c0',52,'#0e2a3a',bo((lt-1.7)/.3))});
// S10 others hear
shot(33.7,37.2,(c,t,lt)=>{plainBG(c,'#2a2150','#4a3a80');stars(c,30,33,t,1000);
 phone(c,230,860,280,430,t,{play:.4});const sp=[[560,640,110,3,'smile'],[820,800,110,4,'smile'],[600,1030,110,1,'smile']];
 for(let i=0;i<3;i++){const [x,y,r,fi]=sp[i],q=bo((lt-.1-i*.18)/.35);c.save();c.translate(x,y);c.scale(q,q);face(c,0,0,r,{f:FACES[fi],t:t+i,cheek:1,mouth:'smile',lookx:-.6});c.restore();
  if(lt>.5+i*.15){const a=[[380,860],[x-r-8,y]];c.save();c.strokeStyle='#6fc7c0';c.lineCap='round';for(let j=0;j<3;j++){const u=((t*1.1+j/3)%1);c.globalAlpha=Math.sin(u*Math.PI)*.8;c.lineWidth=8;c.beginPath();const px=lerp(a[0][0],a[1][0],u),py=lerp(a[0][1],a[1][1],u);c.arc(px,py,16+u*6,-.9,.9);c.stroke()}c.restore()}}
 if(lt>1.1)chip(c,'คนอื่นได้ยิน',540,420,'#6fc7c0',64,'#0e2a3a',bo((lt-1.1)/.3))});
// S11 study again
shot(37.2,39.2,(c,t,lt)=>{plainBG(c,'#15405a','#2a2d6a');stars(c,25,37,t,1000);const k=bo(lt/.35);studyCard(c,t,lt,540,880,k,null);
 c.save();c.translate(780+Math.sin(lt*4)*10,1180);c.rotate(.6);c.strokeStyle='#fff';c.lineWidth=16;c.beginPath();c.arc(-30,-30,70,0,7);c.stroke();c.lineCap='round';c.beginPath();c.moveTo(20,20);c.lineTo(90,90);c.stroke();c.restore()});
// S12 listen without being told
shot(39.2,42.8,(c,t,lt)=>{plainBG(c,'#2a2150','#4a3a80');stars(c,30,39,t,1000);
 face(c,540,560,185,{f:F0,t,mouth:'smile',cheek:1});
 c.strokeStyle='#2c2650';c.lineWidth=26;c.lineCap='round';c.beginPath();c.arc(540,520,200,Math.PI*1.05,Math.PI*1.95);c.stroke();c.fillStyle='#463d8a';rr(c,300,520,70,150,28);c.fill();rr(c,710,520,70,150,28);c.fill();
 if(lt>1.4){const k=bo((lt-1.4)/.35);c.save();c.translate(540,1050);c.scale(k,k);paper(c,0,0,820,330,0,P.paper);waveLine(c,-300,300,10,70,1.7,-t*4,'#a89ad0',14);
  const q=lt>1.9?1:0;tx(c,'เสียงของใคร?',0,-100,56,P.ink);c.fillStyle='rgba(110,80,200,.15)';rr(c,-310,-45,620,110,30);c.fill();tx(c,'?',0,60,110,P.red);c.restore()}});
// S13 bars
shot(42.8,47.4,(c,t,lt)=>{plainBG(c,'#15405a','#2a2d6a');stars(c,25,42,t,1000);
 const k=bo((lt-.1)/.35);c.save();c.translate(540,880);c.scale(k,k);paper(c,0,0,900,900,0,P.paper);
 tx(c,'คะแนนที่ให้เสียง',0,-370,58,P.ink);c.strokeStyle='#bba9d6';c.lineWidth=8;c.lineCap='round';c.beginPath();c.moveTo(-340,-290);c.lineTo(-340,330);c.lineTo(340,330);c.stroke();
 const b1=eo((lt-1.15)/.6),b2=eo((lt-2.6)/.6);
 c.fillStyle=P.amb;rr(c,-250,330-520*b1,200,520*b1+2,16);c.fill();c.fillStyle='#6fc7c0';rr(c,50,330-300*b2,200,300*b2+2,16);c.fill();
 tx(c,'ตัวเองให้',-150,395,44,P.ink);tx(c,'คนอื่นให้',150,395,44,P.ink);
 if(b2>.9){c.strokeStyle=P.red;c.lineWidth=7;c.setLineDash([14,12]);c.beginPath();c.moveTo(-250,330-520);c.lineTo(250,330-520);c.stroke();c.setLineDash([]);const a=clamp((lt-3.3)/.3);c.globalAlpha=a;c.beginPath();c.moveTo(150,330-300);c.lineTo(150,330-520+10);c.stroke();tx(c,'สูงกว่า',-20,330-520-20,44,P.red)}
 c.restore()});
// S14 not bad
shot(47.4,51.2,(c,t,lt)=>{plainBG(c,'#2a2150','#4a3a80');stars(c,30,47,t,1000);
 const qk=lt<.7?bo(lt/.2):0;if(lt<.75){c.save();c.globalAlpha=1-clamp((lt-.5)/.25);tx(c,'?',540,820,360,'#fff','center',P.nav1,18);c.restore()}
 if(lt>.6){const k=bo((lt-.6)/.4);c.save();c.translate(540,720);c.scale(k,k);face(c,0,0,230,{f:F0,t,mouth:'smile',cheek:1});heart(c,230,-190,70,P.pink);c.restore();check(c,800,440,70,'#5fcf8a',bo((lt-1.0)/.3))}
 if(lt>2.1){stamp(c,'ยังไม่คุ้น',540,1130,-.06,P.amb,bo((lt-2.1)/.28))}});
// S15 summary flash
shot(51.2,52.2,(c,t,lt)=>{plainBG(c,'#f2b84b','#e08a3a');const k=bo(lt/.25);c.save();c.translate(540,820);c.scale(k,k);tx(c,'สรุป',0,60,230,'#fff','center','#7a3a12',16);c.restore();c.fillStyle='#7a3a12';c.fillRect(300,920,480*clamp((lt-.1)/.3),12)});
// S16 equation 1
function eqBlock(c,t,lt,t0,items){plainBG(c,'#2a2150','#4a3a80');stars(c,30,52,t,1000);for(const [s,y,col,tc,ts,size] of items){if(t<ts)continue;const k=bo((t-ts)/.28);if(s==='='||s==='+'){c.save();c.translate(540,y);c.scale(k,k);tx(c,s,0,40,120,'#fff');c.restore()}else chip(c,s,540,y,col,size||88,tc,k)}}
shot(52.2,55.3,(c,t,lt)=>eqBlock(c,t,lt,52.2,[['เสียงในหัว',520,'#fff',P.ink,52.26],['=',690,0,0,52.85],['อากาศ',860,'#6fc7c0','#0e2a3a',53.05],['+',1010,0,0,54.3],['กระดูก',1170,P.amb,P.ink,54.4]]));
shot(55.3,58.0,(c,t,lt)=>{eqBlock(c,t,lt,55.3,[['เสียงในคลิป',520,'#fff',P.ink,55.56],['=',690,0,0,55.97],['อากาศ',860,'#6fc7c0','#0e2a3a',56.2],['กระดูก',1170,'#7d739f','#d7d0f0',55.35]]);
 if(t>56.7){cross(c,540,1170,46,P.red,bo((t-56.7)/.3))}});
// S18 neither fake
shot(58.0,61.0,(c,t,lt)=>{plainBG(c,'#2a2150','#4a3a80');stars(c,30,58,t,1000);
 paper(c,540,620,900,380,0,'rgba(244,236,220,.97)');tx(c,'เสียงในหัว',540,500,48,'#8a7aa0');waveLine(c,150,930,640,96,1.5,-t*4,P.amb,18);
 paper(c,540,1090,900,380,0,'rgba(244,236,220,.97)');tx(c,'เสียงในคลิป',540,970,48,'#8a7aa0');waveLine(c,150,930,1110,40,4.5,-t*9,'#6fc7c0',10);
 check(c,900,480,56,'#5fcf8a',bo((lt-.1)/.3));check(c,900,950,56,'#5fcf8a',bo((lt-.35)/.3));
 if(lt>1.6)chip(c,'คนละแบบ',540,855,P.amb,60,P.ink,bo((lt-1.6)/.3))});
// S19 comment
shot(61.0,64.4,(c,t,lt)=>{plainBG(c,'#2a2150','#4a3a80');stars(c,40,61,t,1000);
 const sh=lt>1.0?Math.sin(t*30)*(1-clamp((lt-1.0)/.4))*8:0;
 c.save();c.translate(sh,0);face(c,540,600,190,{f:F0,t,mouth:lt>1.2?'o':'smile',brow:lt>1.2?1:0,cheek:1});c.restore();
 const ds=[[250,1000,'#e0809a'],[790,1060,'#6fc7c0'],[430,1230,'#f2b84b']];
 for(let i=0;i<3;i++){const q=bo((lt-1.9-i*.28)/.3);if(lt<1.9+i*.28)continue;c.save();c.translate(ds[i][0],ds[i][1]);c.scale(q,q);c.fillStyle='#fff';rr(c,-170,-70,340,140,44);c.fill();c.fillStyle=ds[i][2];c.beginPath();c.arc(-120,0,26,0,7);c.fill();c.fillStyle='#8a7aa0';for(let j=0;j<3;j++){c.beginPath();c.arc(-40+j*50,0,12+Math.sin(t*8+j+i)*4,0,7);c.fill()}c.restore()}});
// S20 end card
shot(64.4,66.32,(c,t,lt)=>{nightBG(c,t);c.fillStyle=P.moon;c.beginPath();c.arc(800,520,120,0,7);c.fill();c.fillStyle='rgba(120,110,170,.25)';c.beginPath();c.arc(770,490,26,0,7);c.arc(830,560,32,0,7);c.fill();
 const k=bo(lt/.3);c.save();c.translate(540,900);c.scale(k,k);tx(c,'@เรื่องสงสัย',0,0,112,'#fff','center',P.nav1,14);
 const pk=1+.05*Math.sin(t*8);c.scale(pk,pk);c.fillStyle=P.amb;rr(c,-250,70,500,120,60);c.fill();tx(c,'+ ติดตามไว้นะ',0,152,58,P.ink);c.restore()});

// ---------- captions ----------
const CAPS=[[.25,1.2,'คุณเคยสงสัยมั้ย','Ever wondered',1],[1.65,2.9,'ทำไมเสียงตัวเองในคลิป','why your voice in a clip',0],[3.04,4.2,'ฟังแล้วอยากลบทิ้ง','makes you want to delete it',1],[4.83,5.65,'อยู่ดูจนจบ','Stay till the end',0],[5.93,7.01,'เพราะมีงานวิจัยหนึ่ง','because of one study',0],[7.26,7.99,'ที่เฉลยว่า','that reveals',0],[8.31,9.96,'ทำไมเราถึงเกลียดเสียงตัวเอง','why we hate our own voice',1],[10.23,11.47,'ทั้งที่มันอาจไม่ได้แย่','when it may not be bad',0],
[12.49,13.18,'ตอนคุณพูด','When you speak',0],[13.58,14.95,'เสียงเดินทางสองทาง','sound takes two paths',1],[15.51,16.02,'ทางแรก','Path one',0],[16.38,17.0,'ผ่านอากาศ','through the air',1],[17.18,18.11,'เข้าหูตรงๆ','straight into the ear',0],[18.7,19.33,'ทางที่สอง','Path two',0],[19.59,20.52,'ผ่านกระดูกกะโหลก','through the skull',1],[20.82,22.11,'สั่นไปถึงหูชั้นใน','vibrating to the inner ear',0],
[22.78,23.8,'เสียงทางกระดูก','Sound via bone',0],[23.84,24.36,'ฟังทุ้มกว่า','sounds deeper',1],[24.84,26.13,'นั่นคือเสียงในหัวของคุณ','that’s the voice in your head',1],[26.95,28.32,'แต่ไมค์อยู่นอกหัว','But the mic is outside your head',0],[28.76,30.1,'มันรับได้แค่ทางอากาศ','it only catches air-borne sound',1],[30.46,31.86,'เสียงในคลิปเลยบางลง','so the clip sounds thinner',0],[32.07,33.14,'ไม่ทุ้มเท่าที่คุ้น','not as deep as you’re used to',1],
[33.76,34.21,'และนี่แหละ','And this is',0],[34.55,36.14,'คือเสียงที่คนอื่นได้ยินมาตลอด','what others have always heard',2],[37.23,38.65,'ทีนี้ถึงงานวิจัย','Now, the study',0],[39.2,40.47,'ให้คนฟังเสียงตัวเอง','People heard their own voice',0],[40.77,42.21,'โดยไม่บอกว่าเป็นเสียงใคร','without being told whose it was',1],
[42.92,43.45,'ผลคือ','The result',0],[43.96,45.2,'เขาให้คะแนนเสียงตัวเอง','they rated their own voice',0],[45.41,46.69,'สูงกว่าที่คนอื่นให้','higher than others did',1],[47.44,47.86,'แปลว่า','Meaning',0],[48.11,49.41,'เสียงเราอาจไม่ได้แย่','our voice may not be bad',1],[49.65,50.58,'แค่เรายังไม่คุ้น','we’re just not used to it',0],
[51.21,51.91,'สรุปง่ายๆ','In short',1],[52.26,52.81,'เสียงในหัว','Voice in your head',0],[52.85,54.11,'คืออากาศ','is air',0],[54.35,54.94,'บวกกระดูก','plus bone',1],[55.56,55.9,'เสียงในคลิป','Voice in a clip',0],[55.97,57.48,'คืออากาศอย่างเดียว','is air only',1],[58.06,58.91,'ไม่มีเสียงไหนปลอม','neither one is fake',2],[59.6,60.37,'แค่คนละแบบ','just different',1],
[61.11,62.43,'คุณเคยฟังเสียงตัวเอง','Ever heard your own voice',0],[62.52,63.2,'แล้วอึ้งมั้ย','and froze?',1],[63.32,64.16,'คอมเมนต์มาได้เลย','tell me in the comments',1],[64.5,65.1,'แล้วติดตาม','and follow',0],[65.1,65.97,'เรื่องสงสัย ด้วยนะ','เรื่องสงสัย',1]];
const CEND=CAPS.map((q,i)=>{const nx=CAPS[i+1];let e=q[1]+.12;const mn=q[0]+.5;if(e<mn)e=mn;if(nx&&e>nx[0]-.02)e=nx[0]-.02;return e});
function caps(c,t){for(let i=0;i<CAPS.length;i++){const [a,b,s,en,m]=CAPS[i];if(t<a-.02||t>=CEND[i])continue;const e=bo((t-a)/.14);c.save();c.translate(540,1500);c.scale(e,e);const fs=s.length>24?50:s.length>18?58:68;c.font='800 '+fs+'px '+HF;const w=c.measureText(s).width;
 if(m===2){c.fillStyle=P.red;rr(c,-w/2-26,-fs*.95,w+52,fs*1.5,18);c.fill()}
 else{c.lineWidth=11;c.strokeStyle='#120d2a';c.lineJoin='round';c.textAlign='center';c.strokeText(s,0,0)}
 c.textAlign='center';c.fillStyle=m===1?'#ffc857':'#fff';c.fillText(s,0,0);
 c.font='800 32px '+HF;const ew=c.measureText(en).width;c.fillStyle='rgba(10,8,30,.6)';rr(c,-ew/2-18,34,ew+36,48,12);c.fill();c.fillStyle='#fff';c.textAlign='center';c.fillText(en,0,70);c.restore()}}
// ---------- render ----------
const SHAKE=[[51.21,.12,8],[7.26,.1,8]];
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
