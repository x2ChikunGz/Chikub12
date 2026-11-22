// ===== style frames: "murder in the mystery house" (stills for look approval) =====
function sky(c,y1,c0,c1,c2){c.fillStyle=lg(c,0,0,0,y1,[[0,c0],[.6,c1],[1,c2]]);c.fillRect(0,0,W,y1)}
function trunk(c,x,y0,y1,w,col){c.fillStyle=col;c.beginPath();c.moveTo(x-w/2,y1);c.quadraticCurveTo(x-w*.2,(y0+y1)/2,x-w*.15,y0);c.lineTo(x+w*.15,y0);c.quadraticCurveTo(x+w*.2,(y0+y1)/2,x+w/2,y1);c.fill()}

// 1 ESTABLISHING — low angle, negative space, lightning backlight
function F1(c){sky(c,1250,'#090c26','#1b2150','#3c3577');stars(c,60,3,[0,0,W,500]);
 bloom(c,760,560,160,'rgba(190,200,255,.9)',.55);bolt(c,860,200,520,7);
 cloud(c,-40,330,620,0,K.cloud,K.cloudRim,11);cloud(c,560,250,600,0,'#20265a',K.cloudRim,12);cloud(c,200,520,520,0,'#1a1f4c','rgba(150,150,220,.6)',13);
 // far hills (haze)
 c.fillStyle='#2b2f66';c.beginPath();c.moveTo(0,1080);c.quadraticCurveTo(260,960,520,1040);c.quadraticCurveTo(800,980,1080,1060);c.lineTo(1080,1300);c.lineTo(0,1300);c.fill();haze(c,980,1200,'#5a5a9a',.45);
 // house hill
 c.fillStyle=K.hill2;c.beginPath();c.moveTo(0,1330);c.quadraticCurveTo(330,1170,560,1180);c.quadraticCurveTo(820,1190,1080,1300);c.lineTo(1080,1500);c.lineTo(0,1500);c.fill();
 c.save();c.beginPath();c.moveTo(0,1330);c.quadraticCurveTo(330,1170,560,1180);c.quadraticCurveTo(820,1190,1080,1300);c.lineTo(1080,1500);c.lineTo(0,1500);c.clip();speck(c,0,1160,W,340,21);c.restore();
 trunk(c,120,980,1290,34,'#0b0e20');canopy(c,130,930,[[0,0,120],[-90,40,90],[80,50,95],[10,-80,80]],K.tree,K.treeRim,31,[1,-.7]);
 trunk(c,975,1040,1300,26,'#0b0e20');canopy(c,980,990,[[0,0,95],[-70,40,70],[60,35,75]],K.tree,K.treeRim,32,[-1,-.7]);
 house(c,560,1190,1.02,{windows:{tower:1,sil:'#2a1a12',c:1,cCol:'#ffb86a'},rim:'rgba(190,200,255,.75)'});
 haze(c,1180,1360,'#3d3f7c',.35);
 // foreground dark grass mound (backs captions)
 c.fillStyle=lg(c,0,1450,0,1920,[[0,'#121634'],[1,'#080a18']]);c.beginPath();c.moveTo(0,1560);c.quadraticCurveTo(500,1440,1080,1590);c.lineTo(1080,1920);c.lineTo(0,1920);c.fill();speck(c,0,1440,W,480,25);
 grassBlades(c,1300,1640,90,K.grass,5,.5);c.save();c.filter='blur(3px)';grassBlades(c,1380,1920,40,'#05070f',6,.6,[-40,420]);c.restore();
 rain(c,520,9,.18,52,.35);capStill(c,'บ้านหลังนี้ ไม่มีใครอยู่มา 20 ปี','No one has lived here for 20 years',0);finish(c,1);credit(c)}

// 2 ARRIVAL — motivated light: street lamp + headlights, fireflies, house tiny on the hill
function F2(c){sky(c,1150,'#120f33','#2a2160','#4a3a7c');stars(c,70,4,[0,0,W,700]);
 c.fillStyle='#3b336e';c.beginPath();c.moveTo(0,960);c.lineTo(180,880);c.lineTo(340,930);c.lineTo(560,800);c.lineTo(760,900);c.lineTo(1080,860);c.lineTo(1080,1150);c.lineTo(0,1150);c.fill();haze(c,820,1080,'#6a5a9a',.4);
 house(c,840,925,.26,{windows:{tower:1,c:0},body:'#262a55',roof:'#1d2048'});
 // tree line
 for(const [x,y,s,sd] of [[60,1000,1.1,41],[330,1060,.8,42],[620,1040,.85,43],[930,1000,1.15,44]]){trunk(c,x,y+40,1250,22*s,'#0c0f22');canopy(c,x,y,[[0,0,110*s],[-80*s,30*s,80*s],[75*s,35*s,85*s]],'#121633','#4a4590',sd,[0,-1])}
 // road (wet)
 c.fillStyle=lg(c,0,1200,0,1260,[[0,'#151433'],[1,'#1d1838']]);c.fillRect(0,1190,W,70);speck(c,0,1190,W,70,26);c.fillStyle=lg(c,0,1250,0,1480,[[0,'#1c1b3c'],[1,'#100f24']]);c.fillRect(0,1255,W,225);speck(c,0,1255,W,225,27);c.fillStyle='rgba(255,255,255,.08)';for(let x=0;x<W;x+=160)c.fillRect(x,1355,80,8);
 // street lamp
 c.fillStyle='#0d0f20';c.fillRect(250,820,14,600);c.beginPath();c.moveTo(250,830);c.quadraticCurveTo(255,790,330,792);c.lineTo(330,804);c.quadraticCurveTo(268,806,264,840);c.fill();c.fillStyle='#262840';rr(c,306,790,60,18,6);c.fill();
 cone(c,336,808,Math.PI/2+.06,600,40,480,'rgba(255,214,150,1)',.95);bloom(c,336,808,26,'rgba(255,230,180,1)',.95);
 // reflections on wet road
 pool(c,336,1400,260,60,'rgba(255,200,130,.9)',.45);c.save();c.globalCompositeOperation='screen';c.filter='blur(10px)';c.fillStyle=lg(c,0,1260,0,1480,[[0,'rgba(255,210,140,.4)'],[1,'rgba(255,210,140,0)']]);c.beginPath();c.ellipse(336,1360,26,110,0,0,7);c.fill();c.restore();
 car(c,350,1405,1,0);cone(c,770,1330,-.04,620,26,280,'rgba(255,245,215,1)',.85);
 flies(c,26,8,[0,980,W,380]);
 // dry grass foreground (ref)
 grassBlades(c,1320,1640,160,'#5c3e28',12,.4);grassBlades(c,1380,1660,120,'#3a2618',13,.5);
 c.fillStyle=lg(c,0,1620,0,1920,[[0,'#24160f'],[1,'#0d0807']]);c.fillRect(0,1630,W,290);speck(c,0,1630,W,290,28);grassBlades(c,1500,1920,90,'#120a08',14,.6);
 capStill(c,'ตีสอง คุณมาถึงหน้าบ้าน','2 AM. You arrive at the house',1);finish(c,2,'rgba(60,30,110,.22)');credit(c)}

// 3 THRESHOLD — frame within frame, warm spill, silhouette
function F3(c){c.fillStyle='#14172e';c.fillRect(0,0,W,H);
 // siding
 for(let y=0;y<1420;y+=38){c.fillStyle=y%76?'#171b36':'#141831';c.fillRect(0,y,W,36);c.fillStyle='rgba(0,0,0,.35)';c.fillRect(0,y+34,W,4)}
 stip(c,0,0,W,1420,18,'rgba(0,0,0,.55)',51);stip(c,0,0,W,1420,5,'rgba(140,140,220,.35)',52);
 // side window (cold)
 c.fillStyle='#0b0e24';c.fillRect(60,560,150,240);c.fillStyle='rgba(120,140,220,.18)';c.fillRect(60,560,150,240);c.strokeStyle='#26294a';c.lineWidth=12;c.strokeRect(60,560,150,240);
 // house number
 c.fillStyle='#2a2440';rr(c,860,520,120,70,8);c.fill();tx(c,'13',920,572,46,'#b8a890');
 // door frame + interior
 c.fillStyle='#24180f';c.fillRect(310,480,460,920);
 c.save();c.beginPath();c.rect(340,510,400,890);c.clip();c.fillStyle=lg(c,0,510,0,1400,[[0,'#6a4628'],[.5,'#c88a48'],[1,'#ffd08a']]);c.fillRect(340,510,400,890);
 // hallway inside (stairs + lamp)
 c.fillStyle='rgba(60,30,20,.55)';for(let i=0;i<7;i++)c.fillRect(560+i*26,900-i*60,200,16);c.fillStyle='#3a2416';c.fillRect(340,1250,400,150);bloom(c,470,700,40,'rgba(255,220,160,1)',.8);
 stip(c,340,510,400,890,14,'rgba(90,40,10,.45)',53);c.restore();
 // open door leaf (dark, in perspective)
 c.fillStyle='#0d0e1c';c.beginPath();c.moveTo(740,510);c.lineTo(840,470);c.lineTo(840,1440);c.lineTo(740,1400);c.fill();c.fillStyle='#c89a50';c.beginPath();c.arc(760,960,7,0,7);c.fill();
 // warm spill on porch floor
 c.fillStyle='#0f0f22';c.fillRect(0,1400,W,520);for(let y=1400;y<H;y+=48){c.fillStyle='rgba(0,0,0,.35)';c.fillRect(0,y,W,4)}
 cone(c,540,1400,Math.PI/2,520,400,900,'rgba(255,200,120,1)',.95);
 // silhouette in doorway (back to us)
 silhouette(c,{x:540,y:1030,s:1.75,back:true,lean:0,head:{tilt:.06},hand:[[-50,70],[52,72]],foot:[[-26,196],[30,196]]});
 bloom(c,540,820,200,'rgba(255,190,110,.6)',.25);
 rain(c,160,15,.16,52,.4,[0,0,300,1500]);rain(c,160,16,.16,52,.4,[840,0,240,1500]);
 capStill(c,'ประตู…ไม่ได้ล็อก','The door... is unlocked',2);finish(c,3,'rgba(40,30,100,.2)');credit(c)}

// 4 SEARCH — POV flashlight, one-point perspective, planted clue (portraits)
function F4(c){const vx=540,vy=880;c.fillStyle='#0d0f22';c.fillRect(0,0,W,H);
 const quad=(p,col)=>{c.fillStyle=col;c.beginPath();p.forEach((q,i)=>i?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1]));c.closePath();c.fill()};
 const bx=[440,720,640,1000];// back wall rect
 quad([[0,0],[bx[0],bx[1]],[bx[0],bx[3]],[0,H]],'#1a1d3c');quad([[W,0],[bx[2],bx[1]],[bx[2],bx[3]],[W,H]],'#16193a');quad([[0,0],[W,0],[bx[2],bx[1]],[bx[0],bx[1]]],'#101330');quad([[0,H],[W,H],[bx[2],bx[3]],[bx[0],bx[3]]],'#1a1526');
 c.fillStyle='#120f20';c.fillRect(bx[0],bx[1],bx[2]-bx[0],bx[3]-bx[1]);
 // runner rug
 quad([[280,H],[800,H],[580,bx[3]],[500,bx[3]]],'#3a1a26');
 // portraits on side walls (all turned toward the end = clue)
 const portrait=(x0,s)=>{const L=x0<vx;const x1=x0,yC=vy-40,h=260*s,w=150*s;const k=L?1:-1;c.fillStyle='#3a2a1c';c.beginPath();c.moveTo(x1,yC-h/2);c.lineTo(x1+k*w,yC-h/2+k*k*h*.08);c.lineTo(x1+k*w,yC+h/2-h*.08);c.lineTo(x1,yC+h/2);c.fill();
  c.fillStyle='#6a6478';c.beginPath();c.moveTo(x1+k*w*.12,yC-h*.38);c.lineTo(x1+k*w*.88,yC-h*.33);c.lineTo(x1+k*w*.88,yC+h*.33);c.lineTo(x1+k*w*.12,yC+h*.38);c.fill();
  c.fillStyle='#2a2638';c.beginPath();c.ellipse(x1+k*w*.5,yC-h*.08,w*.16,h*.14,0,0,7);c.fill();c.beginPath();c.ellipse(x1+k*w*.5,yC+h*.28,w*.3,h*.16,0,Math.PI,0);c.fill();
  c.fillStyle='#f4efe8';for(const e of [-1,1]){c.beginPath();c.arc(x1+k*w*.5+e*w*.06+k*w*.05,yC-h*.1,2.5*s,0,7);c.fill()}};
 portrait(40,1.5);portrait(250,1.0);portrait(1040,1.5);portrait(830,1.0);
 // far door with light leak
 c.fillStyle='#0a0a16';c.fillRect(500,770,80,230);c.fillStyle='#ffcf7a';c.fillRect(500,996,80,4);bloom(c,540,998,30,'rgba(255,200,120,1)',.7);
 // shadow on right wall near the end
 c.fillStyle='rgba(0,0,0,.5)';c.beginPath();c.ellipse(700,800,16,20,0,0,7);c.fill();c.fillRect(686,818,28,120);
 stip(c,0,0,W,H,16,'rgba(0,0,0,.5)',61);stip(c,0,0,W,H,4,'rgba(150,150,230,.3)',62);
 darkness(c,.82,[[560,890,330,.95],[640,1500,300,.6]],'4,4,14');
 cone(c,660,1640,-1.73,820,40,520,'rgba(255,240,205,1)',1);bloom(c,560,860,140,'rgba(255,235,200,.7)',.35);dust(c,0,60,380,760,360,700,'255,240,210',63);
 torchHand(c,700,1830,-.12);
 capStill(c,'ภาพทุกภาพ หันไปทางเดียวกัน','Every portrait faces the same way',0);finish(c,4,'rgba(30,30,90,.2)');credit(c)}

// 5 CLUE INSERT — top-down, candle key light, stopped clock
function F5(c){c.fillStyle='#2a1c18';c.fillRect(0,0,W,H);for(let x=0;x<W;x+=180){c.fillStyle=(x/180)%2?'#2e1f1a':'#271a16';c.fillRect(x,0,176,H);c.fillStyle='rgba(0,0,0,.4)';c.fillRect(x+176,0,4,H)}
 const R=mulberry32(71);c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=2;for(let i=0;i<60;i++){const x=R()*W;c.beginPath();c.moveTo(x,0);c.bezierCurveTo(x+20,600,x-20,1200,x+10,H);c.stroke()}
 stip(c,0,0,W,H,20,'rgba(0,0,0,.5)',72);stip(c,0,0,W,H,5,'rgba(255,200,150,.25)',73);
 // police tape across corner
 c.save();c.translate(0,330);c.rotate(-.32);c.fillStyle='#e8c232';c.fillRect(-100,0,1400,64);c.font='800 34px '+HF;c.fillStyle='#111';for(let i=0;i<5;i++)c.fillText('POLICE LINE · DO NOT CROSS',-60+i*560,44);c.restore();
 // candle top-down
 c.fillStyle='#e9dcc0';c.beginPath();c.arc(230,620,46,0,7);c.fill();c.fillStyle='#ffcf7a';c.beginPath();c.arc(230,620,10,0,7);c.fill();bloom(c,230,620,90,'rgba(255,190,100,1)',.85);
 // pocket clock 02:17
 c.save();c.translate(620,820);shadow(c,10,14,330,330,.6,14);c.fillStyle='#b8893c';c.beginPath();c.arc(0,0,160,0,7);c.fill();c.fillStyle='#f1e8d4';c.beginPath();c.arc(0,0,138,0,7);c.fill();
 c.fillStyle='#2a2430';for(let i=0;i<12;i++){const a=i/12*6.283;c.fillRect(Math.cos(a)*118-3,Math.sin(a)*118-3,6,6)}
 const hA=(2+17/60)/12*6.283-1.5708,mA=17/60*6.283-1.5708;c.strokeStyle='#1a1620';c.lineCap='round';c.lineWidth=9;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(hA)*70,Math.sin(hA)*70);c.stroke();c.lineWidth=6;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(mA)*110,Math.sin(mA)*110);c.stroke();
 c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=3;c.beginPath();c.moveTo(-60,-110);c.lineTo(90,80);c.stroke();// cracked glass
 c.fillStyle='#b8893c';c.fillRect(-14,-190,28,34);c.restore();
 // teacup (cold, no steam)
 c.save();c.translate(300,1130);shadow(c,8,10,260,220,.55,12);c.fillStyle='#e8e2d6';c.beginPath();c.ellipse(0,0,120,104,0,0,7);c.fill();c.fillStyle='#f4efe6';c.beginPath();c.arc(0,0,72,0,7);c.fill();c.fillStyle='#5a3a22';c.beginPath();c.arc(0,0,56,0,7);c.fill();c.fillStyle='rgba(255,255,255,.25)';c.beginPath();c.ellipse(-16,-18,16,6,-.5,0,7);c.fill();c.fillStyle='#e8e2d6';rr(c,66,-14,46,28,12);c.fill();c.restore();
 // note with red wax seal
 c.save();c.translate(820,1180);c.rotate(.12);shadow(c,10,14,380,280,.55,12);c.fillStyle='#e9e0c8';c.fillRect(-170,-120,340,240);stip(c,-170,-120,340,240,12,'rgba(120,90,50,.35)',74);
 c.font='800 40px '+HF;c.fillStyle='#2a2230';c.textAlign='left';c.fillText('อย่าเชื่อ…',-130,-30);c.fillStyle='rgba(42,34,48,.4)';c.fillRect(-130,10,240,8);c.fillRect(-130,40,190,8);
 c.fillStyle=K.red;c.beginPath();c.arc(120,80,30,0,7);c.fill();c.fillStyle='rgba(255,255,255,.25)';c.beginPath();c.arc(112,72,9,0,7);c.fill();c.restore();
 // brass key
 c.save();c.translate(600,1290);c.rotate(-.5);c.strokeStyle='#c89a40';c.lineWidth=10;c.beginPath();c.arc(-70,0,24,0,7);c.stroke();c.beginPath();c.moveTo(-46,0);c.lineTo(80,0);c.lineTo(80,22);c.moveTo(55,0);c.lineTo(55,18);c.stroke();c.restore();
 darkness(c,.7,[[230,620,700,.95],[620,900,520,.6]],'10,6,8');bloom(c,230,620,70,'rgba(255,190,100,1)',.6);
 // clue chip (promptkub-style UI)
 c.save();c.font='800 38px '+HF;const s='เบาะแส 1 / 3',w=c.measureText(s).width;c.fillStyle='rgba(8,8,14,.78)';rr(c,540-w/2-28,330,w+56,62,16);c.fill();c.strokeStyle='#ffc857';c.lineWidth=3;c.stroke();tx(c,s,540,375,38,'#ffc857');c.restore();
 capStill(c,'นาฬิกาหยุดเดินที่ 02:17','The clock stopped at 2:17',1);finish(c,5,'rgba(60,30,40,.18)');credit(c)}

// 6 REVEAL — dutch angle, reflection shows someone behind you, single red accent
function F6(c){c.fillStyle='#080a18';c.fillRect(0,0,W,H);c.save();c.translate(540,960);c.rotate(-.13);c.translate(-540,-960);
 c.fillStyle='#14173a';c.fillRect(-300,-300,W+600,1600);c.fillStyle='#0f0f22';c.fillRect(-300,1300,W+600,900);stip(c,-300,-300,W+600,2400,16,'rgba(0,0,0,.5)',81);
 // big window with lightning outside + reflection
 const wx=520,wy=380,ww=470,wh=760;c.save();c.beginPath();c.rect(wx,wy,ww,wh);c.clip();c.fillStyle=lg(c,0,wy,0,wy+wh,[[0,'#6c74c8'],[1,'#2a2f6a']]);c.fillRect(wx,wy,ww,wh);bolt(c,wx+330,wy-20,520,83);
 c.fillStyle='#10132e';c.beginPath();c.moveTo(wx,wy+wh);c.lineTo(wx,wy+560);c.lineTo(wx+140,wy+500);c.lineTo(wx+300,wy+590);c.lineTo(wx+ww,wy+520);c.lineTo(wx+ww,wy+wh);c.fill();
 // reflection: you (mirrored) + figure behind with red eyes
 c.globalAlpha=.55;person(c,{x:wx+150,y:wy+470,s:1.15,lean:0,head:{tilt:0,turn:-.4},hand:[[-40,60],[44,62]],foot:[[-26,196],[30,196]],shirt:'#1a1e3a',pants:'#121426'},0);
 c.globalAlpha=.85;c.fillStyle='#04040a';c.beginPath();c.ellipse(wx+330,wy+250,46,56,0,0,7);c.fill();c.beginPath();c.moveTo(wx+260,wy+760);c.quadraticCurveTo(wx+250,wy+330,wx+330,wy+310);c.quadraticCurveTo(wx+410,wy+330,wx+400,wy+760);c.fill();
 c.globalAlpha=1;for(const e of [-1,1]){bloom(c,wx+330+e*16,wy+246,10,'rgba(255,40,40,1)',.9);c.fillStyle='#ff6a5a';c.beginPath();c.arc(wx+330+e*16,wy+246,4,0,7);c.fill()}
 c.fillStyle='rgba(255,255,255,.08)';c.beginPath();c.moveTo(wx+40,wy);c.lineTo(wx+140,wy);c.lineTo(wx+20,wy+wh);c.lineTo(wx-80,wy+wh);c.fill();c.restore();
 c.strokeStyle='#2a2440';c.lineWidth=18;c.strokeRect(wx,wy,ww,wh);c.beginPath();c.moveTo(wx+ww/2,wy);c.lineTo(wx+ww/2,wy+wh);c.stroke();
 // lightning wash into the room
 cone(c,wx+ww/2,wy+wh/2,Math.PI*.82,900,ww*.8,1100,'rgba(170,185,255,1)',.55);
 // you, facing the window (back 3/4)
 person(c,{x:330,y:1080,s:1.55,lean:.03,back:true,head:{tilt:.08},hand:[[-44,64],[50,60]],foot:[[-26,196],[34,196]]},0);
 // overturned chair (implied violence)
 c.save();c.translate(170,1420);c.rotate(1.35);c.strokeStyle='#2a1c1e';c.lineWidth=16;c.lineCap='round';c.beginPath();c.moveTo(0,0);c.lineTo(0,-180);c.moveTo(0,-90);c.lineTo(120,-90);c.lineTo(120,0);c.moveTo(120,-90);c.lineTo(120,-200);c.stroke();c.restore();
 // single red accent: lamp in the corner
 c.fillStyle='#2a1a20';c.fillRect(70,1000,14,300);c.fillStyle=K.red;c.beginPath();c.moveTo(20,1000);c.lineTo(134,1000);c.lineTo(108,930);c.lineTo(46,930);c.fill();bloom(c,77,990,120,'rgba(220,40,50,1)',.5);
 c.restore();
 capStill(c,'แต่ในห้อง…มีคุณอยู่คนเดียว','But you are alone in the room',2);finish(c,6,'rgba(50,30,110,.2)');credit(c)}

const FRAMES=[F1,F2,F3,F4,F5,F6];
function drawFrame(k,canvas){const c=canvas.getContext('2d');c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.clearRect(0,0,W,H);FRAMES[k-1](c)}
