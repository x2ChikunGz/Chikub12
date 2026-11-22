// ===== 10s cinematic demo: "บ้านหลังนั้น" — no sound, no subtitles =====
const DUR=10;
function trunk(c,x,y0,y1,w,col){c.fillStyle=col;c.beginPath();c.moveTo(x-w/2,y1);c.quadraticCurveTo(x-w*.2,(y0+y1)/2,x-w*.15,y0);c.lineTo(x+w*.15,y0);c.quadraticCurveTo(x+w*.2,(y0+y1)/2,x+w/2,y1);c.fill()}
const S1=[0,3],S2=[3,6],S3=[6,8.2],S4=[8.2,10];
const ez=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
// animated rain (falls with time)
function rainA(c,t,n,seed,ang=.17,len=56,a=.4,area=[0,0,W,H],spd=1900){const R=mulberry32(seed);c.save();c.strokeStyle='#c8d2ff';c.lineCap='round';for(let i=0;i<n;i++){const x0=area[0]+R()*area[2],y0=R()*(area[3]+300),sp=spd*(.8+R()*.4),l=len*(.6+R()*.8);const y=area[1]+((y0+t*sp)%(area[3]+300))-150,x=x0-Math.tan(ang)*(y-area[1]);c.globalAlpha=a*(.3+R()*.7);c.lineWidth=1+R()*1.4;c.beginPath();c.moveTo(x,y);c.lineTo(x-Math.sin(ang)*l,y+Math.cos(ang)*l);c.stroke()}c.restore()}
function streak(c,x,y,len,col,a){c.save();c.globalCompositeOperation='screen';c.globalAlpha=a;c.fillStyle=lg(c,x-len,0,x+len,0,[[0,'rgba(0,0,0,0)'],[.5,col],[1,'rgba(0,0,0,0)']]);c.fillRect(x-len,y-2,len*2,4);c.globalAlpha=a*.4;c.fillRect(x-len*.6,y-7,len*1.2,14);c.restore()}
function camL(c,z,cx,cy,rot=0){c.translate(540,960);c.rotate(rot);c.scale(z,z);c.translate(-cx,-cy)}

// ---------- SHOT 1: establishing push-in, lightning, the silhouette in the tower window vanishes ----------
function s1Sky(){return layer('s1sky',W,H,(d)=>{d.fillStyle=lg(d,0,0,0,1250,[[0,'#080b24'],[.6,'#1a1f50'],[1,'#3a3478']]);d.fillRect(0,0,W,H);stars(d,70,3,[0,0,W,520]);
 cloud(d,-60,300,640,0,'#232a5c',K.cloudRim,11);cloud(d,520,220,640,0,'#1e2456',K.cloudRim,12);cloud(d,150,500,560,0,'#191e4a','rgba(150,150,220,.6)',13);
 haze(d,260,460,'#1a1f50',.55);d.fillStyle='#2b2f66';d.beginPath();d.moveTo(0,1080);d.quadraticCurveTo(260,960,520,1040);d.quadraticCurveTo(800,980,1080,1060);d.lineTo(1080,1400);d.lineTo(0,1400);d.fill();haze(d,980,1220,'#5a5a9a',.45)})}
function s1House(sil){return layer('s1h'+(sil?1:0),W,H,(d)=>{d.fillStyle=K.hill2;d.beginPath();d.moveTo(-50,1340);d.quadraticCurveTo(330,1170,560,1180);d.quadraticCurveTo(820,1190,1130,1300);d.lineTo(1130,1600);d.lineTo(-50,1600);d.fill();
 d.save();d.beginPath();d.moveTo(-50,1340);d.quadraticCurveTo(330,1170,560,1180);d.quadraticCurveTo(820,1190,1130,1300);d.lineTo(1130,1600);d.lineTo(-50,1600);d.clip();speck(d,-50,1160,1180,440,21);d.restore();
 // winding path up to the porch
 d.fillStyle='rgba(120,120,180,.18)';d.beginPath();d.moveTo(520,1190);d.quadraticCurveTo(470,1300,600,1420);d.lineTo(700,1600);d.lineTo(560,1600);d.quadraticCurveTo(410,1330,500,1190);d.fill();
 trunk(d,120,980,1290,34,'#0b0e20');canopy(d,130,930,[[0,0,120],[-90,40,90],[80,50,95],[10,-80,80]],K.tree,K.treeRim,31,[1,-.7]);
 trunk(d,975,1040,1300,26,'#0b0e20');canopy(d,980,990,[[0,0,95],[-70,40,70],[60,35,75]],K.tree,K.treeRim,32,[-1,-.7]);
 house(d,560,1190,1.02,{windows:{tower:1,sil:sil?'#2a1a12':null,b:1},rim:'rgba(170,180,240,.55)'});
 // porch lamp on (someone is home?)
 d.fillStyle='#ffd690';d.fillRect(505,1035,12,16);bloom(d,511,1043,22,'rgba(255,200,120,1)',.8);haze(d,1180,1360,'#3d3f7c',.3)})}
function s1Fg(){return layer('s1fg',W,H,(d)=>{d.fillStyle=lg(d,0,1450,0,1920,[[0,'#121634'],[1,'#080a18']]);d.beginPath();d.moveTo(0,1580);d.quadraticCurveTo(500,1460,1080,1610);d.lineTo(1080,1920);d.lineTo(0,1920);d.fill();speck(d,0,1440,W,480,25);
 grassBlades(d,1330,1660,90,K.grass,5,.5);d.filter='blur(4px)';grassBlades(d,1380,1920,46,'#04050c',6,.6,[-40,380]);grassBlades(d,1460,1920,30,'#04050c',7,.6,[760,1120]);d.filter='none'})}
function shot1(c,t){const p=(t-S1[0])/(S1[1]-S1[0]),e=ez(p);const z=1.06+.12*e;
 const flash=Math.max(0,1-Math.abs(t-1.55)/.09)+.6*Math.max(0,1-Math.abs(t-1.78)/.06);
 const L=(img,depth,yo)=>{c.save();camL(c,z*(1+depth*.08*e),540,960-yo*depth*e);c.drawImage(img,0,0);c.restore()};
 L(s1Sky(),.1,60);
 if(flash>0){c.save();camL(c,z,540,960);bolt(c,860,180,540,7);c.restore();c.save();c.globalCompositeOperation='screen';c.globalAlpha=flash*.55;c.fillStyle='#b8c4ff';c.fillRect(0,0,W,1300);c.restore()}
 L(s1House(t<1.6),.4,60);
 if(flash>0){c.save();c.globalCompositeOperation='screen';c.globalAlpha=flash*.25;c.fillStyle='#8c96e0';c.fillRect(0,0,W,H);c.restore()}
 rainA(c,t,360,9,.18,52,.32);L(s1Fg(),1.2,60);rainA(c,t*1.2,90,10,.18,90,.45,[0,0,W,H],2600);
 if(flash>0)streak(c,860,420,520,'rgba(190,200,255,1)',flash*.8);
 return {tint:'rgba(40,36,120,.22)',flash}}

// ---------- SHOT 2: tracking shot, walk with umbrella toward the porch lamp ----------
const WW=3200,GY=1430;
function s2Back(){return layer('s2back',WW,H,(d)=>{d.fillStyle=lg(d,0,0,0,900,[[0,'#090b22'],[1,'#20224c']]);d.fillRect(0,0,WW,1000);stars(d,90,5,[0,0,WW,400]);
 for(let i=0;i<9;i++){const x=i*380+60;trunk(d,x,620,900,24,'#0b0d1f');canopy(d,x,560,[[0,0,120],[-80,30,85],[75,40,90]],'#11142e','#45428a',60+i,[0,-1])}haze(d,700,980,'#3a3a78',.4);d.fillStyle=lg(d,0,900,0,1450,[[0,'#181a3e'],[1,'#0c0d22']]);d.fillRect(0,900,WW,560);speck(d,0,900,WW,560,64);for(let i=0;i<14;i++){const x=i*240+40;canopy(d,x,1010,[[0,0,70],[-50,15,50],[50,20,55]],'#0e1028','#3a3878',120+i,[0,-1])}grassBlades(d,1040,1200,220,'#0b0c20',65,.4,[0,WW])})}
function s2Mid(){return layer('s2mid',WW,H,(d)=>{// the house facade, porch and path (world)
 d.fillStyle='#151834';d.fillRect(1500,240,1700,GY-240);for(let y=260;y<GY;y+=40){d.fillStyle='rgba(0,0,0,.25)';d.fillRect(1500,y,1700,4)}speck(d,1500,240,1700,GY-240,61);
 d.fillStyle='#0d1026';d.beginPath();d.moveTo(1440,260);d.lineTo(2350,40);d.lineTo(3260,260);d.fill();d.strokeStyle='rgba(150,150,220,.4)';d.lineWidth=5;d.beginPath();d.moveTo(1440,260);d.lineTo(2350,40);d.stroke();
 win(d,1640,520,150,220,1,K.warm);win(d,2560,520,150,220,0);win(d,2860,520,150,220,1,'#ffb86a');
 // porch roof + posts + door + steps
 d.fillStyle='#0b0d20';d.fillRect(1780,880,900,40);for(const x of [1800,2640])d.fillRect(x,920,26,GY-920);
 d.fillStyle='#24180f';d.fillRect(2160,980,180,GY-80-980);d.fillStyle='#0b0b16';d.fillRect(2175,995,150,GY-80-995);
 for(let i=0;i<3;i++){d.fillStyle=i%2?'#1a1830':'#201d38';d.fillRect(1840-i*0+i*0,GY-80+i*27-0,840,27)}
 // fence along the path (background, low)
 d.fillStyle='#10122a';for(let x=0;x<1500;x+=90){d.fillRect(x,1180,12,GY-1180)}d.fillRect(0,1210,1500,10);d.fillRect(0,1320,1500,8);
 // ground: wet path + lawn
 d.fillStyle=lg(d,0,GY,0,H,[[0,'#1b1a3a'],[1,'#0c0b1c']]);d.fillRect(0,GY,WW,H-GY);speck(d,0,GY,WW,H-GY,62);
 for(let x=0;x<WW;x+=150){d.fillStyle='rgba(255,255,255,.05)';rr(d,x,GY+16,130,22,8);d.fill()}})}
function s2Fg(){return layer('s2fg',WW,H,(d)=>{d.filter='blur(9px)';d.fillStyle='#04050c';for(let x=200;x<WW;x+=620){d.fillRect(x,1100,46,900);d.beginPath();d.moveTo(x-10,1100);d.lineTo(x+23,1050);d.lineTo(x+56,1100);d.fill()}
 grassBlades(d,1640,1920,160,'#05060e',71,.5,[0,WW]);d.filter='none'})}
function shot2(c,t){const lt=t-S2[0],T=1.1,s=1.55;const sp=walkSpeed(T,s);const cx0=300;const x=cx0+sp*lt;const ph=(lt/T)%1;
 const cam=x+140;// world x at screen centre
 const L=(img,depth,o=0)=>{c.save();c.translate(540-cam*depth-o,0);c.drawImage(img,0,0);c.restore()};
 L(s2Back(),.35,500);L(s2Mid(),1);
 // porch lamp (world 1720,1000) cone + pool + reflection
 c.save();c.translate(540-cam,0);const LX=1420;c.fillStyle='#14141c';c.fillRect(LX-8,760,16,GY-760);c.fillStyle='#262838';rr(c,LX-26,730,52,40,8);c.fill();c.fillStyle='#ffe2a8';c.fillRect(LX-18,742,36,22);
 cone(c,LX,770,Math.PI/2,GY-770,40,520,'rgba(255,210,140,1)',.9);bloom(c,LX,752,30,'rgba(255,230,170,1)',.95);
 c.save();c.globalCompositeOperation='screen';c.filter='blur(12px)';c.fillStyle='rgba(255,200,130,.35)';c.beginPath();c.ellipse(LX,GY+180,36,170,0,0,7);c.fill();for(const [wx,wc] of [[1715,'rgba(255,200,120,.28)'],[2935,'rgba(255,180,100,.22)']]){c.fillStyle=wc;c.beginPath();c.ellipse(wx,GY+150,60,140,0,0,7);c.fill()}c.restore();
 streak(c,LX,752,260,'rgba(255,200,140,1)',.6);c.restore();
 // light on the character grows as he nears the lamp
 const near=clamp(1-Math.abs(x-1420)/700);const sx=540-cam+x;
 rainA(c,t,260,21,.12,50,.28);
 actor(c,{x:sx,y:GY+4,s,f:1,phase:ph,lean:.05,arms:{near:[.3,2.35]},umbrella:{tilt:.05,scale:.8},
  rims:[{x:-3,y:-1,col:'rgba(140,160,255,1)',a:.85},{x:3,y:-1,col:'rgba(255,190,110,1)',a:.25+.7*near}]});
 // splashes on the umbrella
 const R=mulberry32(Math.floor(t*30)*7+1);c.save();c.strokeStyle='rgba(210,220,255,.7)';c.lineWidth=2;for(let i=0;i<7;i++){const ux=sx+(-60+R()*190)*s*.8,uy=GY-430*s*.8-R()*10;c.beginPath();c.moveTo(ux,uy);c.lineTo(ux+(R()-.5)*14,uy-8-R()*10);c.stroke()}c.restore();
 L(s2Fg(),1.45);rainA(c,t*1.3,70,22,.12,100,.45,[0,0,W,H],2800);
 return {tint:'rgba(40,36,120,.22)'}}

// ---------- SHOT 3: over-the-shoulder, the door opens by itself, rack focus, a shadow crosses ----------
function s3Wall(){return layer('s3wall',W,H,(d)=>{d.fillStyle='#14172e';d.fillRect(0,0,W,H);for(let y=0;y<1420;y+=38){d.fillStyle=y%76?'#171b36':'#141831';d.fillRect(0,y,W,36);d.fillStyle='rgba(0,0,0,.35)';d.fillRect(0,y+34,W,4)}
 speck(d,0,0,W,1420,51);d.fillStyle='#0b0e24';d.fillRect(60,560,150,240);d.fillStyle='rgba(120,140,220,.18)';d.fillRect(60,560,150,240);d.strokeStyle='#26294a';d.lineWidth=12;d.strokeRect(60,560,150,240);
 d.fillStyle='#2a2440';rr(d,860,520,120,70,8);d.fill();tx(d,'13',920,572,46,'#b8a890');d.fillStyle='#24180f';d.fillRect(310,480,460,920);
 d.fillStyle='#0f0f22';d.fillRect(0,1400,W,520);for(let y=1400;y<H;y+=48){d.fillStyle='rgba(0,0,0,.35)';d.fillRect(0,y,W,4)}speck(d,0,1400,W,520,54)})}
function s3Inside(t){const k=mk(400,890),d=k.getContext('2d');d.fillStyle=lg(d,0,0,0,890,[[0,'#5a3a22'],[.5,'#b87a40'],[1,'#f0c27a']]);d.fillRect(0,0,400,890);
 d.fillStyle='rgba(60,30,20,.55)';for(let i=0;i<7;i++)d.fillRect(220+i*26,390-i*60,200,16);d.fillStyle='#3a2416';d.fillRect(0,740,400,150);
 // wall sconce
 d.fillStyle='#2a1a10';d.fillRect(120,170,14,40);bloom(d,127,175,26,'rgba(255,220,160,1)',.8);
 // a shadow slides across the lit wall
 const sh=clamp((t-7.5)/.45);if(sh>0&&sh<1){d.save();d.globalAlpha=.55*Math.sin(sh*Math.PI);d.fillStyle='#1a0c06';d.filter='blur(6px)';const x=460-sh*560;d.beginPath();d.ellipse(x,300,30,36,0,0,7);d.fill();d.fillRect(x-34,330,68,330);d.restore()}
 stip(d,0,0,400,890,14,'rgba(90,40,10,.45)',53);return k}
function shot3(c,t){const lt=t-S3[0];const open=ez(clamp((lt-.35)/.75));const z=1+.05*ez(clamp(lt/2.2));
 const fb=6*(1-ez(clamp((lt-.55)/.45))),fgb=10*ez(clamp((lt-.55)/.45));// rack focus
 const bg=layer('s3bg',W,H,()=>{}),b=bg.getContext('2d');b.setTransform(1,0,0,1,0,0);b.clearRect(0,0,W,H);b.drawImage(s3Wall(),0,0);
 // door opening: interior revealed by the door leaf's width
 const lw=400*(1-open*.78);b.drawImage(s3Inside(t),340,510);b.fillStyle='#0d0e1c';b.fillRect(340,510,lw,890);b.fillStyle='#c89a50';b.beginPath();b.arc(340+lw-26,960,7,0,7);b.fill();
 if(open<.02){b.fillStyle='rgba(255,200,120,.8)';b.fillRect(340,1396,400,4)}// light under the door
 cone(b,540,1400,Math.PI/2,520,400*open,900*open+10,'rgba(255,200,120,1)',.95*open);
 c.save();camL(c,z,540,960);c.filter=fb>.3?'blur('+fb.toFixed(1)+'px)':'none';c.drawImage(bg,0,0);c.filter='none';
 rainA(c,t,120,15,.16,52,.35,[0,0,300,1500]);rainA(c,t,120,16,.16,52,.35,[840,0,240,1500]);c.restore();
 // foreground: back of the character, umbrella lowered, rim from the door light
 const k=layer('s3fgc',W,H,()=>{}),f=k.getContext('2d');f.setTransform(1,0,0,1,0,0);f.clearRect(0,0,W,H);
 f.fillStyle='#07070f';f.beginPath();f.moveTo(-40,1920);f.quadraticCurveTo(-20,1430,170,1380);f.quadraticCurveTo(300,1340,420,1400);f.quadraticCurveTo(560,1460,600,1920);f.fill();
 f.beginPath();f.ellipse(300,1250,118,136,-.1,0,7);f.fill();f.fillRect(250,1330,100,80);
 f.strokeStyle='#07070f';f.lineWidth=10;f.beginPath();f.moveTo(620,1920);f.lineTo(690,1500);f.stroke();f.beginPath();f.moveTo(690,1500);f.quadraticCurveTo(760,1400,820,1480);f.stroke();
 c.save();c.filter='blur('+fgb.toFixed(1)+'px)';const rim=layer('s3rim',W,H,()=>{}),r=rim.getContext('2d');r.setTransform(1,0,0,1,0,0);r.clearRect(0,0,W,H);r.drawImage(k,0,0);r.globalCompositeOperation='source-in';r.fillStyle='rgba(255,190,110,1)';r.fillRect(0,0,W,H);r.globalCompositeOperation='source-over';
 c.globalAlpha=.25+.7*open;c.drawImage(rim,4,-3);c.globalAlpha=1;c.drawImage(k,0,0);c.restore();
 bloom(c,540,900,220,'rgba(255,190,110,.6)',.22*open);
 return {tint:'rgba(50,30,90,.18)'}}

// ---------- SHOT 4: low angle up the stairs; lightning reveals someone on the landing; smash to black ----------
function s4Room(){return layer('s4room',W,H,(d)=>{d.fillStyle='#120e1c';d.fillRect(0,0,W,H);
 // back wall + tall arched window at the landing
 d.fillStyle='#1a1628';d.fillRect(0,0,W,1100);speck(d,0,0,W,1100,81);
 d.fillStyle='#0a0c20';d.beginPath();d.moveTo(600,640);d.lineTo(600,330);d.arc(740,330,140,Math.PI,0);d.lineTo(880,640);d.fill();d.strokeStyle='#2a2238';d.lineWidth=16;d.stroke();d.beginPath();d.moveTo(740,190);d.lineTo(740,640);d.moveTo(600,420);d.lineTo(880,420);d.stroke();
 // landing
 d.fillStyle='#22192a';d.fillRect(0,700,W,40);d.fillStyle='#160f1c';d.fillRect(0,740,W,30);
 // stairs rising toward the camera-left (perspective-ish)
 for(let i=0;i<11;i++){const y=770+i*105,x0=380-i*48,x1=1080+i*20;d.fillStyle=i%2?'#241a2c':'#2a1f33';d.fillRect(x0,y,x1-x0,26);d.fillStyle='#1a1222';d.fillRect(x0,y+26,x1-x0,79);speck(d,x0,y,x1-x0,105,90+i)}
 // banister
 d.strokeStyle='#2c1e1a';d.lineWidth=16;d.beginPath();d.moveTo(420,620);d.lineTo(-100,1900);d.stroke();d.lineWidth=8;for(let i=0;i<9;i++){const x=380-i*56,y=700+i*130;d.beginPath();d.moveTo(x,y-80);d.lineTo(x,y+40);d.stroke()}
 // portraits on the wall
 for(const [x,y] of [[200,300],[1000,380]]){d.fillStyle='#3a2a1c';d.fillRect(x-60,y-80,120,160);d.fillStyle='#4a4458';d.fillRect(x-46,y-66,92,132);d.fillStyle='#2a2638';d.beginPath();d.ellipse(x,y-14,20,24,0,0,7);d.fill()}
 // sconce
 d.fillStyle='#2a1a10';d.fillRect(1010,560,14,40);})}
function shot4(c,t){const lt=t-S4[0];const z=1.02+.07*ez(clamp(lt/1.4));const f1=Math.max(0,1-Math.abs(t-8.95)/.07),f2=.7*Math.max(0,1-Math.abs(t-9.13)/.05);const flash=Math.max(f1,f2);
 const shk=flash>0?(mulberry32(Math.floor(t*30))()-.5)*14*flash:0;
 if(t>=9.55){c.fillStyle='#000';c.fillRect(0,0,W,H);return {tint:null,black:1}}
 c.save();camL(c,z,540+shk,960,.035);c.drawImage(s4Room(),0,0);
 // storm outside the window
 c.save();c.beginPath();c.moveTo(600,640);c.lineTo(600,330);c.arc(740,330,140,Math.PI,0);c.lineTo(880,640);c.clip();c.fillStyle=flash>0?'rgba(200,210,255,'+(.4+.6*flash)+')':'#141838';c.fillRect(580,170,320,480);if(f1>0)bolt(c,780,160,420,95);rainA(c,t,40,96,.12,40,.35,[600,190,280,450]);c.restore();
 // the figure on the landing: only during the flash
 const visible=t<9.25;if(visible){actor(c,{x:760,y:704,s:.95,f:-1,legs:[[.04,.06],[-.04,.05]],arms:{near:[.06,.12],far:[-.04,.12]},sil:'#030308',shadow:false,eye:flash>0?'rgba(255,40,40,1)':null})}
 // warm sconce light pool
 bloom(c,1017,560,30,'rgba(255,200,130,1)',.8);c.restore();
 darkness(c,flash>0?.25:.6,[[900,720,520,.75],[540,1300,500,.4]],'6,4,12');
 if(flash>0){c.save();c.globalCompositeOperation='screen';c.globalAlpha=flash*.55;c.fillStyle='#aab6ff';c.fillRect(0,0,W,H);c.restore();
  // hard light shapes from the window across the stairs
  c.save();c.globalCompositeOperation='screen';c.globalAlpha=flash*.3;c.filter='blur(22px)';c.fillStyle='#dfe4ff';c.beginPath();c.moveTo(600,640);c.lineTo(880,640);c.lineTo(1080,1500);c.lineTo(200,1500);c.fill();c.restore();streak(c,740,400,560,'rgba(200,210,255,1)',flash)}
 return {tint:'rgba(60,30,90,.2)',flash}}

// ---------- render + post ----------
const SHOTS=[[S1,shot1],[S2,shot2],[S3,shot3],[S4,shot4]];
function renderAt(t,canvas){const c=canvas.getContext('2d');c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.fillStyle='#000';c.fillRect(0,0,W,H);
 let sh=SHOTS[0];for(const s of SHOTS)if(t>=s[0][0])sh=s;const r=sh[1](c,t)||{};
 if(!r.black){if(r.tint){c.save();c.globalCompositeOperation='soft-light';c.fillStyle=r.tint;c.fillRect(0,0,W,H);c.restore()}
  c.fillStyle=rg(c,540,900,W*.34,H*.72,[[0,'rgba(0,0,0,0)'],[1,'rgba(2,3,10,.6)']]);c.fillRect(0,0,W,H);
  c.fillStyle=lg(c,0,0,0,H,[[0,'rgba(3,4,12,.5)'],[.12,'rgba(3,4,12,0)'],[.88,'rgba(3,4,12,0)'],[1,'rgba(3,4,12,.6)']]);c.fillRect(0,0,W,H);
  // chromatic fringe on flashes
  if(r.flash>.3){const k=layer('ca',W,H,()=>{}),q=k.getContext('2d');q.setTransform(1,0,0,1,0,0);q.clearRect(0,0,W,H);q.drawImage(canvas,0,0);c.save();c.globalCompositeOperation='screen';c.globalAlpha=.18*r.flash;c.drawImage(k,-6,0);c.drawImage(k,6,0);c.restore()}}
 // cut dip (1 frame) between shots
 for(const s of SHOTS){if(s[0][0]>0&&t>=s[0][0]&&t<s[0][0]+1/30){c.fillStyle='rgba(0,0,0,.6)';c.fillRect(0,0,W,H)}}
 if(t<.3){c.fillStyle='rgba(0,0,0,'+(1-t/.3)+')';c.fillRect(0,0,W,H)}
 // film grain (single layer .045)
 const R=mulberry32(Math.floor(t*30)*7+3);c.save();c.globalCompositeOperation='overlay';c.globalAlpha=.045;const nt=noiseTile();for(let k=0;k<2;k++)c.drawImage(nt,0,0,256,256,-R()*256,-R()*256,W+300,H+300);c.restore();
 credit(c)}
