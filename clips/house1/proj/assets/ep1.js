// ===== EP1 "บ้านไม้หลังนั้น" — shot list keyed to LINE (timing.js) =====
const FON={jacket:'#3a2c48',jacketL:'#4e3c60',pants:'#2a2030',skirt:['#4a2430','#c89a40','#2a1218'],skin:'#d9a184',headScale:1.22,hairLong:1,lash:1};
// hand-held phone (in hand coords of actor) drawn separately at a screen point
function phoneAt(c,x,y,s,glow){c.save();c.translate(x,y);c.rotate(-.3);c.fillStyle='#111218';rr(c,-14*s,-26*s,28*s,52*s,5*s);c.fill();c.fillStyle=glow?'#9fb8ff':'#2a2f45';rr(c,-11*s,-22*s,22*s,42*s,3*s);c.fill();c.restore();if(glow)bloom(c,x,y,40*s,'rgba(150,180,255,1)',.5)}
function uiCall(c,t,t0,name,sub){const p=eo((t-t0)/.35);if(p<=0)return;c.save();c.globalAlpha=p;c.translate(540,400+(1-p)*20);c.fillStyle='rgba(10,12,20,.82)';rr(c,-260,-62,520,124,30);c.fill();c.strokeStyle='rgba(255,255,255,.14)';c.lineWidth=2;c.stroke();
 c.fillStyle='#c9bfa8';c.beginPath();c.arc(-200,0,38,0,7);c.fill();c.fillStyle='#8a8070';c.beginPath();c.arc(-200,-8,15,0,7);c.fill();c.beginPath();c.ellipse(-200,22,24,14,0,Math.PI,0);c.fill();
 tx(c,name,-140,-6,40,'#fff','left');tx(c,sub,-140,36,26,'rgba(255,255,255,.65)','left');c.fillStyle='#3cc36a';c.beginPath();c.arc(205,0,32*(1+.06*Math.sin(t*8)),0,7);c.fill();c.restore()}
function chipTop(c,s,t,t0,col='#ffc857'){const p=eo((t-t0)/.35);if(p<=0)return;c.save();c.globalAlpha=p;c.font='800 38px '+HF;const w=c.measureText(s).width;c.fillStyle='rgba(8,8,14,.78)';rr(c,540-w/2-28,330,w+56,62,16);c.fill();c.strokeStyle=col;c.lineWidth=3;c.stroke();tx(c,s,540,375,38,col);c.restore()}

// --- S0: establishing (reuse demo shot 1) + push to the blue-lit window ---
function sh0(c,t){return d2s1(c,t)}
function sh0b(c,t,lt,d){const p=ez(clamp(lt/d));const z=1.3+.9*p;c.save();camL(c,z,375,820);c.drawImage(L1bg(),0,0);c.drawImage(L1mid(),0,0);
 const f=.5+.5*mulberry32(Math.floor(t*30))();bloom(c,375,835,70,'rgba(150,180,255,1)',.55*f);c.restore();rainA(c,t,300,9,.15,50,.32);return {tint:'rgba(30,40,120,.22)'}}
// --- S1: Fon at the gate looking up (medium, umbrella), house blurred ---
function sh1(c,t,lt,d){c.save();c.filter='blur(10px)';camL(c,1.5,520,900);c.drawImage(L1bg(),0,0);c.drawImage(L1mid(),0,0);c.restore();
 const f=.5+.5*mulberry32(Math.floor(t*30))();bloom(c,330,700,120,'rgba(150,180,255,1)',.35*f);rainA(c,t,260,31,.15,50,.3);
 actor(c,{...FON,x:620,y:2200,s:3.1,f:-1,legs:[[.06,.06],[-.05,.05]],arms:{near:[.3,2.35],far:[.05,.25]},head:-.12-.03*ez(clamp(lt/d)),umbrella:{tilt:-.05,scale:.7,col:'#1a1420'},
  rims:[{x:-5,y:-2,col:'rgba(150,180,255,1)',a:.8}],shadow:false});rainA(c,t*1.3,70,32,.15,100,.45,[0,0,W,H],2800);return {tint:'rgba(40,36,120,.2)'}}
// --- S1b: walk on the veranda (reuse demo shot 2) ---
function sh1b(c,t,lt){return d2s2(c,T2[0]+lt)}
// --- S2: phone call under the eave ---
function sh2(c,t,lt,d,close){const z=close?1.9:1.0;c.save();c.translate(-540*(close?0:0),0);camL(c,z,close?560:540,close?1234:960);
 c.save();c.translate(540-1400*.92,0);c.drawImage(L2bg(),0,0);c.restore();
 const bx=470+Math.sin(t*2.1)*12;c.strokeStyle='#0a0a12';c.lineWidth=3;c.beginPath();c.moveTo(470,150);c.lineTo(bx,360);c.stroke();c.fillStyle='#ffe6b0';c.beginPath();c.arc(bx,376,16,0,7);c.fill();cone(c,bx,380,Math.PI/2,1500,30,1300,'rgba(255,205,140,1)',.7);bloom(c,bx,376,34,'rgba(255,220,160,1)',.95);
 actor(c,{...FON,x:600,y:2140,s:3.0,f:-1,legs:[[.04,.06],[-.04,.05]],arms:{near:[.2,2.39],far:[.08,.3]},head:.12,rims:[{x:4,y:-2,col:'rgba(255,190,110,1)',a:.7},{x:-4,y:-1,col:'rgba(140,160,255,1)',a:.6}]});
 phoneAt(c,600-3.0*45,2140-3.0*272,2.6,1);bloom(c,600-3.0*62,2140-3.0*330,90,'rgba(150,180,255,1)',.35);c.restore();
 rainA(c,t,90,41,.02,120,.5,[0,170,W,1400],2200,'#d8deff');if(!close)uiCall(c,t,L(5)-.3,'ป้าแดง','ข้างบ้านยาย · กำลังโทร');return {tint:'rgba(50,34,110,.2)'}}
// --- S2c: flashback 20 years ago (sepia): police tape, villagers' silhouettes, police light ---
function sh2c(c,t,lt,d){const p=ez(clamp(lt/d));c.save();camL(c,1.15+.08*p,560,1100);c.drawImage(L1bg(),0,0);c.drawImage(L1mid(),0,0);c.restore();
 c.save();c.globalCompositeOperation='color';c.fillStyle='#8a6a40';c.fillRect(0,0,W,H);c.restore();c.save();c.globalCompositeOperation='multiply';c.fillStyle='#b89a70';c.fillRect(0,0,W,H);c.restore();
 // police tape across the foreground + crowd silhouettes
 c.save();c.translate(0,1380);c.rotate(-.06);c.fillStyle='#d8b84a';c.fillRect(-50,0,1200,46);c.font='800 28px '+HF;c.fillStyle='#1a1408';for(let i=0;i<4;i++)c.fillText('POLICE LINE · ห้ามผ่าน',-20+i*330,33);c.restore();
 for(const [x,s,h] of [[160,1.5,-.1],[300,1.35,.05],[820,1.45,-.05],[950,1.6,.1]])actor(c,{x,y:1900,s,f:x<540?1:-1,legs:[[.04,.06],[-.04,.05]],arms:{near:[.1,.3],far:[-.05,.3]},head:h,sil:'#1c140c',shadow:false});
 const pl=Math.sin(t*14)>0;bloom(c,540,1180,160,pl?'rgba(255,60,60,1)':'rgba(80,120,255,1)',.35);
 c.save();c.globalCompositeOperation='overlay';c.globalAlpha=.25;c.drawImage(noiseTile(),0,0,W,H);c.restore();chipTop(c,'20 ปีก่อน',t,L(7)-.1,'#e8d2a0');return {tint:'rgba(120,80,40,.18)'}}
// --- S3: door (reuse demo shot 3) ---
function sh3(c,t,lt){return d2s3(c,T3[0]+lt)}
// --- S4: TV room, static (reuse demo shot 4 before the picture) ---
function sh4(c,t,lt){return d2s4(c,T4[0]+Math.min(lt,2.0))}
// --- S4b: insert — fuse box, wires cut, red "power cut" seal ---
function sh4b(c,t,lt,d){const p=ez(clamp(lt/d));c.save();camL(c,1+.06*p,540,960);planks(c,0,0,W,H,true,'#221b2c','#2a2136',91,80);
 c.fillStyle='#3a3a44';rr(c,280,520,520,700,20);c.fill();c.fillStyle='#24242c';rr(c,310,550,460,640,14);c.fill();
 for(let i=0;i<4;i++){c.fillStyle='#55555f';rr(c,350+i*104,620,80,150,8);c.fill();c.fillStyle=i===1?'#8a2a2a':'#2a2a30';c.fillRect(372+i*104,660,36,40)}
 c.strokeStyle='#6a5a3a';c.lineWidth=10;c.lineCap='round';c.beginPath();c.moveTo(420,860);c.quadraticCurveTo(440,960,400,1040);c.moveTo(560,860);c.quadraticCurveTo(580,940,610,980);c.moveTo(640,1010);c.lineTo(660,1080);c.stroke();// cut wire
 c.fillStyle='#c0303a';rr(c,380,900,320,120,10);c.fill();tx(c,'งดจ่ายไฟ',540,955,48,'#fff');tx(c,'การไฟฟ้า · 2549',540,1002,26,'rgba(255,255,255,.8)');c.restore();
 darkness(c,.72,[[540,880,520,.85]],'4,4,12');const f=.5+.5*mulberry32(Math.floor(t*30)*3)();c.save();c.globalCompositeOperation='screen';c.globalAlpha=.3*f;c.fillStyle=rg(c,900,900,40,800,[[0,'rgba(150,175,255,.9)'],[1,'rgba(0,0,0,0)']]);c.fillRect(0,0,W,H);c.restore();
 chipTop(c,'เบาะแส 1/3 · ไม่มีไฟ',t,L(9)+3.2);return {tint:'rgba(30,40,110,.2)'}}
// --- S5: insert — calendar Oct 2549, 14th circled ---
function sh5(c,t,lt,d){const p=ez(clamp(lt/d));c.save();camL(c,1.05+.12*p,540,900);planks(c,0,0,W,H,true,'#221b2c','#2a2136',93,80);
 c.fillStyle='#ddd4c0';c.fillRect(240,420,600,820);stip(c,240,420,600,820,10,'rgba(120,100,70,.4)',94);c.fillStyle='#9a2a32';c.fillRect(240,420,600,150);tx(c,'ตุลาคม 2549',540,515,58,'#fff');
 const days=['อา','จ','อ','พ','พฤ','ศ','ส'];for(let k=0;k<7;k++)tx(c,days[k],290+k*80,620,26,'#6a5a50');let dd=1;for(let r=0;r<5;r++)for(let k=0;k<7;k++){if(r===0&&k<0)continue;if(dd>31)break;tx(c,String(dd),290+k*80,690+r*100,40,k===0?'#b03038':'#2a2430');dd++}
 const cx=290+6*80,cy=690+100+0;c.strokeStyle='#c0202a';c.lineWidth=6;c.beginPath();c.ellipse(cx,cy-14,40,34,0,0,7*clamp((lt-.4)/.6));c.stroke();c.restore();
 darkness(c,.62,[[540,820,600,.85]],'4,4,12');chipTop(c,'เบาะแส 2/3 · วันที่ 14',t,L(10)+1.6);return {tint:'rgba(30,40,110,.18)'}}
// --- S6: insert — wall clock stopped at 02:17, pendulum still ---
function sh6(c,t,lt,d){const p=ez(clamp(lt/d));c.save();camL(c,1.1+.15*p,540,860);planks(c,0,0,W,H,true,'#221b2c','#2a2136',95,80);
 c.fillStyle='#3a2618';rr(c,330,300,420,1100,30);c.fill();c.fillStyle='#e8dfc8';c.beginPath();c.arc(540,560,170,0,7);c.fill();c.strokeStyle='#2a1a10';c.lineWidth=14;c.stroke();
 for(let i=0;i<12;i++){const a=i/12*6.283-1.5708;tx(c,String(i===0?12:i),540+Math.cos(a)*130,575+Math.sin(a)*130,30,'#2a2430')}
 const hA=(2+17/60)/12*6.283-1.5708,mA=17/60*6.283-1.5708;c.strokeStyle='#1a1418';c.lineCap='round';c.lineWidth=11;c.beginPath();c.moveTo(540,560);c.lineTo(540+Math.cos(hA)*85,560+Math.sin(hA)*85);c.stroke();c.lineWidth=7;c.beginPath();c.moveTo(540,560);c.lineTo(540+Math.cos(mA)*130,560+Math.sin(mA)*130);c.stroke();
 c.fillStyle='rgba(0,0,0,.5)';c.fillRect(400,780,280,560);c.strokeStyle='#b8893c';c.lineWidth=6;c.beginPath();c.moveTo(540,790);c.lineTo(540,1180);c.stroke();c.fillStyle='#c89a40';c.beginPath();c.arc(540,1200,46,0,7);c.fill();c.restore();
 darkness(c,.6,[[540,700,560,.85]],'4,4,12');chipTop(c,'เบาะแส 3/3 · 02:17',t,L(11)+2.0);return {tint:'rgba(30,40,110,.18)'}}
// --- S7: her phone shows 02:17 ---
function sh7(c,t,lt,d){c.fillStyle='#0a0a14';c.fillRect(0,0,W,H);const p=ez(clamp(lt/d));c.save();camL(c,1+.1*p,540,1000);
 c.fillStyle='#d9a184';rr(c,300,1150,480,520,120);c.fill();c.fillStyle='#4a3a58';c.fillRect(300,1500,480,500);
 c.save();c.translate(540,950);c.rotate(-.05);c.fillStyle='#101116';rr(c,-210,-420,420,840,46);c.fill();c.fillStyle=lg(c,0,-400,0,400,[[0,'#2a3a6a'],[1,'#121a34']]);rr(c,-192,-400,384,800,34);c.fill();
 tx(c,'02:17',0,-200,130,'#fff');tx(c,'วันเสาร์ 14 ตุลาคม',0,-130,30,'rgba(255,255,255,.75)');c.restore();
 c.fillStyle='#d9a184';for(let i=0;i<4;i++){rr(c,700,880+i*70,110,56,26);c.fill()}rr(c,250,1060,90,200,40);c.fill();c.restore();
 bloom(c,540,900,260,'rgba(120,150,255,1)',.35);return {tint:'rgba(30,40,110,.2)'}}
// --- S8: re-hook — dutch angle on the static TV, red hit ---
function sh8(c,t,lt,d){const hit=L(13)+(LE(13)-L(13))*.62;c.save();camL(c,1.7+.2*ez(clamp(lt/d)),510,950,.14);c.drawImage(L4room(),0,0);c.save();c.beginPath();rr(c,360,820,300,260,24);c.clip();tvStatic(c,360,820,300,260,t,5);c.restore();c.restore();
 darkness(c,.8,[[540,900,520,.95]],'4,4,12');if(t>hit){c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(200,40,50,'+(.5*(1-clamp((t-hit)/1.2)))+')';c.fillRect(0,0,W,H);c.restore()}return {tint:'rgba(60,20,60,.2)',flash:t>hit&&t<hit+.15?1:0}}
// --- S9-11: the TV picture (static stops, then the room, then someone behind her) ---
function tvPic(c,t,stage){c.fillStyle='#3a5070';c.fillRect(360,820,300,260);c.fillStyle='#1a2838';c.fillRect(360,1000,300,80);c.fillStyle='#05080e';c.beginPath();c.ellipse(470,940,22,26,0,0,7);c.fill();c.fillRect(448,962,44,80);
 if(stage>1){c.beginPath();c.ellipse(560,900,16,20,0,0,7);c.fill();c.fillRect(546,918,28,120);bloom(c,556,898,4,'rgba(255,40,40,1)',.9);bloom(c,566,898,4,'rgba(255,40,40,1)',.9)}c.fillStyle='rgba(255,255,255,.05)';for(let y=820;y<1080;y+=4)c.fillRect(360,y,300,1)}
function sh9(c,t,lt,d,stage){const zs=[1.6,2.2,3.0][stage],ze=[1.8,2.8,3.8][stage];const p=ez(clamp(lt/d));c.save();camL(c,zs+(ze-zs)*p,510,950);c.drawImage(L4room(),0,0);c.save();c.beginPath();rr(c,360,820,300,260,24);c.clip();
 const stop=stage>0||lt>1.1;if(!stop)tvStatic(c,360,820,300,260,t,5);else if(stage===0){c.fillStyle='#000';c.fillRect(360,820,300,260)}else tvPic(c,t,stage);c.restore();c.restore();
 darkness(c,.55,[[540,940,700,.95]],'4,4,12');c.save();c.globalCompositeOperation='screen';c.globalAlpha=stop?.35:.5;c.fillStyle=rg(c,540,950,30,700,[[0,'rgba(150,175,255,.9)'],[1,'rgba(0,0,0,0)']]);c.fillRect(0,0,W,H);c.restore();return {tint:'rgba(30,40,110,.2)'}}
// --- S12: close-up (reuse demo shot 5; cut to black right after the whisper) ---
function sh12(c,t,lt){return d2s5(c,T5[0]+lt*.62)}
// --- S13: end card ---
function sh13(c,t,lt){c.fillStyle='#05060c';c.fillRect(0,0,W,H);const p=eo(lt/.8);c.save();c.globalAlpha=p;tx(c,'บ้านไม้หลังนั้น',540,820,96,'#fff');tx(c,'EP.1 · เสียงจากทีวี',540,900,40,'rgba(255,255,255,.7)');
 c.fillStyle='#c0303a';rr(c,330,1000,420,80,40);c.fill();tx(c,'EP.2 เร็วๆ นี้',540,1054,42,'#fff');c.restore();return {}}

const SHOTS=[[0,sh0],[3.6,sh0b],[L(3)-.25,sh1],[L(4)-.15,sh1b],[L(5)-.25,(c,t,lt,d)=>sh2(c,t,lt,d,0)],[L(6)-.15,(c,t,lt,d)=>sh2(c,t,lt,d,1)],[L(7)-.15,sh2c],[L(8)-.3,sh3],[L(9)-.15,sh4],[L(9)+3.0,sh4b],[L(10)-.2,sh5],[L(11)-.2,sh6],[L(12)-.25,sh7],[L(13)-.3,sh8],[L(14)-.25,(c,t,lt,d)=>sh9(c,t,lt,d,0)],[L(15)-.25,(c,t,lt,d)=>sh9(c,t,lt,d,1)],[L(16)-.15,(c,t,lt,d)=>sh9(c,t,lt,d,2)],[L(17)-.3,sh12],[L(18)-.3,sh13]];
function renderAt(t,canvas){const c=canvas.getContext('2d');c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.fillStyle='#000';c.fillRect(0,0,W,H);
 let k=0;for(let i=0;i<SHOTS.length;i++)if(t>=SHOTS[i][0])k=i;const a=SHOTS[k][0],b=k+1<SHOTS.length?SHOTS[k+1][0]:DUR,lt=t-a;c.save();const r=SHOTS[k][1](c,t,lt,b-a)||{};c.restore();
 if(!r.black){if(r.tint){c.save();c.globalCompositeOperation='soft-light';c.fillStyle=r.tint;c.fillRect(0,0,W,H);c.restore()}
  const q0=layer('diff',W/2,H/2,()=>{}),q=q0.getContext('2d');q.setTransform(1,0,0,1,0,0);q.filter='blur(8px)';q.clearRect(0,0,W/2,H/2);q.drawImage(canvas,0,0,W/2,H/2);q.filter='none';
  c.save();c.globalCompositeOperation='screen';c.globalAlpha=.16;c.drawImage(q0,0,0,W,H);c.globalCompositeOperation='soft-light';c.globalAlpha=.25;c.drawImage(q0,0,0,W,H);c.restore();
  c.save();c.globalCompositeOperation='lighten';c.fillStyle='rgb(17,18,30)';c.fillRect(0,0,W,H);c.restore();
  c.fillStyle=rg(c,540,920,W*.32,H*.7,[[0,'rgba(0,0,0,0)'],[1,'rgba(2,3,10,.55)']]);c.fillRect(0,0,W,H);
  if(r.flash>.3){const k2=layer('ca',W,H,()=>{}),q2=k2.getContext('2d');q2.setTransform(1,0,0,1,0,0);q2.clearRect(0,0,W,H);q2.drawImage(canvas,0,0);c.save();c.globalCompositeOperation='screen';c.globalAlpha=.16*r.flash;c.drawImage(k2,-6,0);c.drawImage(k2,6,0);c.restore()}}
 if(k>0&&lt<1/30){c.fillStyle='rgba(0,0,0,.55)';c.fillRect(0,0,W,H)}if(t<.35){c.fillStyle='rgba(0,0,0,'+(1-t/.35)+')';c.fillRect(0,0,W,H)}
 const R=mulberry32(Math.floor(t*30)*7+3);c.save();c.globalCompositeOperation='overlay';c.globalAlpha=.045;const nt=noiseTile();for(let i=0;i<2;i++)c.drawImage(nt,0,0,256,256,-R()*256,-R()*256,W+300,H+300);c.restore();
 caps(c,t);credit(c)}
