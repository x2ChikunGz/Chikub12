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
