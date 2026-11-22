// ===== shots =====
// camera: push/pull/pan/dutch, applied around frame centre
function cam(c,p,o){const z=lerp(o.z0||1,o.z1||o.z0||1,p),x=lerp(o.x0||0,o.x1??o.x0??0,p),y=lerp(o.y0||0,o.y1??o.y0??0,p),r=lerp(o.r0||0,o.r1??o.r0??0,p);c.translate(540,960);c.rotate(r);c.scale(z,z);c.translate(-540+x,-960+y)}
const SC={}; // per-shot grade: [shadowTint, highlightTint, satDrop]
function bg(c,col){c.fillStyle=col;c.fillRect(-400,-400,W+800,H+800)}

// 1 HOOK: over-the-shoulder, reflection blinks late
function sHook(c,t,lt,d){bg(c,'#06080d');const p=eio(lt/(LE(2)-L(1)+.6));c.save();cam(c,p,{z0:2.1,z1:1.22,y0:110,y1:80,x0:0,x1:20});
 roomBath(c,t);const mx=540,my=820,mw=560,mh=760;mirrorFrame(c,mx,my,mw,mh,'oval');
 // blink: real person blinks at bt, reflection blinks .55s later
 const bt=CAPS[2][0]+.15,b1=bump(t,bt,.18),b2=bump(t,bt+.55,.26);
 mirrorGlass(c,mx,my,mw,mh,'oval',t,(g,tt)=>{g.fillStyle=rg(g,60,-120,0,520,[[0,'rgba(255,170,90,.25)'],[1,'rgba(0,0,0,0)']]);g.fillRect(-300,-400,600,800);
  const late=t>bt+.4; face(g,0,40,1.12,{blink:b2,look:late?.0:-.15,tone:'skin',brow:late?.3:0,smile:t>L(2)+.6?.25*sm((t-L(2)-.6)/.8):0},t)});
 candle(c,250,1180,t,1.1,1);candle(c,830,1210,t,.9,2);
 // foreground: back of viewer's head (rack focus: blurred)
 c.save();c.filter='blur(10px)';c.fillStyle='#07080c';c.beginPath();c.ellipse(220+noise(t,3)*6,1500,300,360,-.2,0,7);c.fill();c.fillStyle='rgba(255,170,90,.12)';c.beginPath();c.ellipse(380,1420,60,240,-.25,0,7);c.fill();c.restore();
 c.restore();lightLayer(c,[[540,1150,700,.85],[540,800,420,.5]],.82);dust(c,t,40,0,300,W,1300)}
function bump(t,a,d){return t<a||t>a+d?0:Math.sin((t-a)/d*Math.PI)}
function roomBath(c,t){const k=layer('bath',1400,1920,(d,w,h)=>{wallpaper(d,w,1250,'#24303a','#0d1318',0);for(let y=1250;y<h;y+=80)for(let x=0;x<w;x+=80){d.fillStyle=((x+y)/80)%2?'#1a2026':'#141a1f';d.fillRect(x,y,80,80)}texFill(d,0,1250,w,h-1250,.25,'overlay',2);d.fillStyle=lg(d,0,1180,0,1290,[[0,'#3e3226'],[1,'#1a140e']]);d.fillRect(0,1180,w,110);d.fillStyle='rgba(255,255,255,.06)';d.fillRect(0,1180,w,6)});c.drawImage(k,-160,0)}
function lightLayer(c,holes,a){darkness(c,a,holes.map(h=>[h[0],h[1],h[2],h[3]]))}

// 2 black beat + question
function sQ(c,t,lt,d){bg(c,'#030406');const p=eio(lt/d);c.save();cam(c,p,{z0:1.9,z1:2.25,y0:105,y1:110});mirrorGlass(c,540,820,560,760,'oval',t,g=>{face(g,0,40,1.12,{blink:0,look:0,tone:'skin',brow:.3,smile:.25+.1*p},t)});c.restore();lightLayer(c,[[540,880,520,.8]],.9)}

// 3 Europe: victorian room, deceased, sepia
function sEurope(c,t,lt,d){const p=eio(lt/d);c.save();cam(c,p,{z0:1.15,z1:1.0,x0:120,x1:-40,y0:40,y1:0});c.drawImage(roomVictorian(),-200,0);
 mirrorFrame(c,560,700,300,430,'rect');mirrorGlass(c,560,700,300,430,'rect',t,g=>{g.fillStyle='rgba(255,190,120,.15)';g.fillRect(-150,-215,300,430)},{g0:'#3a3028',g1:'#15100c'});
 candle(c,380,1150,t,.8,4);candle(c,760,1170,t,.7,5);c.restore();
 lightLayer(c,[[380,1080,520,.9],[760,1100,420,.8],[880,520,380,.5]],.78);dust(c,t,50,0,200,W,1400,'255,210,150',8);chip(c,'ยุโรป · หลายร้อยปีก่อน',540,380,L(3)+.2,t,P.gold,38)}
// 4 cloth draped over mirror
function sCloth(c,t,lt,d){const p=eio(lt/d),dr=eo((t-L(4)-.5)/1.4);c.save();cam(c,p,{z0:1.55,z1:1.75,y0:250,y1:270,x0:-20,x1:-20});c.drawImage(roomVictorian(),-200,0);
 mirrorFrame(c,560,700,300,430,'rect');mirrorGlass(c,560,700,300,430,'rect',t,g=>{face(g,0,40,.5,{tone:'pale',blink:.1},t)},{g0:'#3a3028',g1:'#15100c'});
 // cloth
 const top=380-260*(1-dr),drop=lerp(-200,540,dr);c.save();c.fillStyle=lg(c,0,top,0,top+drop+260,[[0,'#1b1014'],[1,'#0a0608']]);c.beginPath();c.moveTo(360,top);c.lineTo(760,top);
 for(let i=0;i<=8;i++){const x=760-i*50,y=top+drop+260+Math.sin(i*1.3+t*2)*18*(1-dr*.6);c.lineTo(x,y)}c.closePath();c.fill();c.strokeStyle='rgba(255,255,255,.06)';c.lineWidth=4;for(let i=1;i<6;i++){c.beginPath();c.moveTo(360+i*66,top+10);c.quadraticCurveTo(360+i*66+Math.sin(t+i)*20,top+drop/2+120,360+i*66-10,top+drop+240);c.stroke()}texFill(c,350,top,420,drop+280,.2,'overlay');c.restore();
 // hands
 const hy=top-30;c.fillStyle='#d9a888';for(const hx of [380,740]){c.beginPath();c.ellipse(hx,hy,34,24,0,0,7);c.fill()}
 c.restore();lightLayer(c,[[560,1050,560,.9],[560,700,420,.6]],.8);dust(c,t,40,0,200,W,1400,'255,210,150',9)}
// 5 reflection = soul
function sSoul(c,t,lt,d){bg(c,'#07090e');const p=eio(lt/d);c.save();cam(c,p,{z0:1.0,z1:1.12});
 mirrorFrame(c,540,860,600,820,'oval');mirrorGlass(c,540,860,600,820,'oval',t,g=>{face(g,0,40,1.0,{tone:'ghost',blink:.05},t);
  g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.4+.2*Math.sin(t*2);g.fillStyle=rg(g,0,0,40,420,[[0,'rgba(160,220,255,.5)'],[1,'rgba(0,0,0,0)']]);g.fillRect(-300,-410,600,820);g.restore()});
 wisp(c,[[540,1500],[420,1250],[600,1050],[540,880]],t,eo((t-L(5)-.3)/1.6));c.restore();
 lightLayer(c,[[540,860,600,.9]],.75);chip(c,'เงาสะท้อน = วิญญาณ',540,330,L(5)+.9,t,P.teal,40)}
// 6 trapped forever: hands inside glass, cracks
function sTrap(c,t,lt,d){bg(c,'#050608');const p=eio(lt/d);const sh=t>L(6)+1.6?Math.sin(t*60)*4*bump(t,L(6)+1.6,.5):0;c.save();cam(c,p,{z0:1.1,z1:1.35,r0:.02,r1:-.03,x0:sh});
 mirrorFrame(c,540,860,600,820,'oval');mirrorGlass(c,540,860,600,820,'oval',t,g=>{g.save();g.globalAlpha=.75;face(g,0,-40,.9,{tone:'ghost',blink:0,mouthOpen:.6,brow:.8},t);g.restore();ghostHands(g,t,.85)},{crack:sm((t-L(6)-1.6)/.4),crackSeed:11,fog:.15});
 c.restore();lightLayer(c,[[540,860,640,.9]],.8)}
// 7 Thai bedroom: mirror faces bed (high angle)
function sThai(c,t,lt,d){const p=eio(lt/d);c.save();cam(c,p,{z0:1.2,z1:1.05,x0:-160,x1:-120,y0:20,y1:40});c.drawImage(roomThai(),-180,0);
 mirrorFrame(c,1030,780,240,360,'rect');mirrorGlass(c,1030,780,240,360,'rect',t,g=>{g.save();g.scale(-.38,.38);g.translate(-300,180);g.drawImage(roomThai(),-900,-900);g.restore()});
 // arrow mirror -> bed
 const a=sm((t-L(7)-1.2)/.6);if(a>0){c.save();c.globalAlpha=a;c.strokeStyle=P.red;c.lineWidth=10;c.setLineDash([26,18]);c.lineDashOffset=-t*60;c.beginPath();c.moveTo(900,820);c.quadraticCurveTo(700,700,420,900);c.stroke();c.setLineDash([]);c.fillStyle=P.red;c.beginPath();c.moveTo(420,900);c.lineTo(470,850);c.lineTo(480,915);c.fill();c.restore()}
 c.restore();lightLayer(c,[[460,470,520,.85],[1030,780,330,.5]],.72);chip(c,'ความเชื่อไทย',540,380,L(7)+.2,t,P.gold,38)}
// 8 soul drifts from sleeper into mirror
function sSleep(c,t,lt,d){const p=eio(lt/d);c.save();cam(c,p,{z0:1.3,z1:1.4,x0:-120,x1:-150,y0:120,y1:110});c.drawImage(roomThai(),-180,0);sleeper(c,330,930,.9,t);
 mirrorFrame(c,1030,780,240,360,'rect');const pr=eo((t-L(8)-.6)/2.2);mirrorGlass(c,1030,780,240,360,'rect',t,g=>{g.globalAlpha=pr;face(g,0,30,.42,{tone:'ghost',blink:1-pr*.0},t)});
 wisp(c,[[340,900],[560,700],[860,760],[1030,780]],t,pr,'170,220,255');c.restore();lightLayer(c,[[700,800,640,.7]],.82)}
// 9 calm: lights on, mirror normal
function sCalm(c,t,lt,d){const p=eio(lt/d);c.save();cam(c,p,{z0:1.1,z1:1.16,x0:-150,x1:-150,y0:40,y1:40});c.drawImage(roomThai(),-180,0);mirrorFrame(c,1030,780,240,360,'rect');mirrorGlass(c,1030,780,240,360,'rect',t,null);c.restore();
 c.save();c.globalCompositeOperation='soft-light';c.fillStyle='rgba(255,220,170,.35)';c.fillRect(0,0,W,H);c.restore()}
// 10 RE-HOOK: dutch, crack, red
function sRehook(c,t,lt,d){bg(c,'#030305');const p=eio(lt/d);const hit=L(10)+(LE(10)-L(10))*.62;c.save();cam(c,p,{z0:1.2,z1:1.55,r0:.12,r1:.2});
 mirrorFrame(c,540,900,600,820,'oval');mirrorGlass(c,540,900,600,820,'oval',t,g=>{const s=sm((t-L(10))/1.2);g.globalAlpha=s*.9;face(g,0,30,1.0,{tone:'pale',blink:0,brow:.9,smile:t>hit?.6:0,warp:t>hit?.25:0},t)},{crack:sm((t-hit)/.25),crackSeed:3});
 c.restore();lightLayer(c,[[540,900,560,.9]],.86);if(t>hit){c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(200,40,50,'+(.45*(1-clamp((t-hit)/1.2)))+')';c.fillRect(0,0,W,H);c.restore()}}
// 11 Caputo 2010 file card
function sCaputo(c,t,lt,d){bg(c,'#0c0e13');const p=eio(lt/d);c.save();cam(c,p,{z0:1.08,z1:1.0,r0:-.03,r1:-.01});c.drawImage(roomLab(),-110,0);
 c.save();c.translate(540,880);c.rotate(-.04);shadow(c,10,30,820,920,.6,30);c.fillStyle=lg(c,0,-450,0,450,[[0,'#e9dfc8'],[1,'#c9bc9e']]);rr(c,-400,-450,800,900,10);c.fill();texFill(c,-400,-450,800,900,.25,'multiply',1.3);
 c.fillStyle='#b9ad8f';rr(c,-400,-450,260,60,8);c.fill();tx(c,'CASE 2010',-270,-408,30,'#3b3226');
 c.fillStyle='#1a1a20';rr(c,-330,-330,280,340,6);c.fill();c.save();c.beginPath();c.rect(-330,-330,280,340);c.clip();c.fillStyle='#2b2e38';c.fillRect(-330,-330,280,340);c.fillStyle='#0d0e12';c.beginPath();c.ellipse(-190,-190,80,96,0,0,7);c.fill();c.beginPath();c.ellipse(-190,10,140,110,0,0,7);c.fill();c.restore();
 tx(c,'?',-190,-160,90,'rgba(255,255,255,.2)');
 tx(c,'Giovanni Caputo',150,-250,44,'#20202a');tx(c,'นักจิตวิทยา · อิตาลี',150,-190,36,'#5a4a3a');tx(c,'มหาวิทยาลัยอูร์บิโน',150,-140,32,'#5a4a3a');
 c.strokeStyle='rgba(60,40,30,.35)';c.lineWidth=3;for(let i=0;i<5;i++){c.beginPath();c.moveTo(-330,80+i*56);c.lineTo(330,80+i*56);c.stroke()}
 tx(c,'"Strange-face-in-the-mirror illusion"',0,92,30,'#3b3226');tx(c,'Perception, 2010',0,148,30,'#6b5a46');
 const st=eo((t-L(11)-1.0)/.3);if(st>0){c.save();c.translate(200,300);c.rotate(-.18);c.scale(1.6-.6*st,1.6-.6*st);c.globalAlpha=st*.85;c.strokeStyle=P.red;c.lineWidth=8;rr(c,-170,-55,340,110,10);c.stroke();tx(c,'EXPERIMENT',0,18,52,P.red);c.restore()}
 c.restore();c.restore();lightLayer(c,[[540,820,900,.9]],.6);bigNum(c,'2010',540,420,L(11)+.1,t,P.gold,150)}
// 12 subject staring at mirror, dim lamp, clock to 10:00
function sStare(c,t,lt,d){bg(c,'#07080b');const p=eio(lt/d);c.save();cam(c,p,{z0:1.0,z1:1.18,y0:0,y1:60});c.drawImage(roomLab(),-110,0);
 mirrorFrame(c,540,700,440,600,'rect');mirrorGlass(c,540,700,440,600,'rect',t,g=>{face(g,0,40,.72,{tone:'skin',blink:bump(t,L(12)+1.5,.2)},t)});
 // lamp
 c.fillStyle='#1b1b20';c.fillRect(860,600,10,500);c.fillStyle=lg(c,800,540,940,620,[[0,'#3a3a40'],[1,'#151518']]);c.beginPath();c.moveTo(820,620);c.lineTo(920,620);c.lineTo(890,540);c.lineTo(850,540);c.fill();glow(c,870,640,300,'rgba(255,180,100,.5)',.6);
 glow(c,560,1150,380,'rgba(255,170,100,.35)',.5);sitter(c,540,1260,1.05,t);c.restore();lightLayer(c,[[870,660,560,.9],[540,760,420,.6],[600,1180,420,.6]],.8);
 const m=Math.min(10,Math.floor(clamp((t-L(12))/(LE(12)-L(12)))*10.99));chip(c,'⏱ '+String(m).padStart(2,'0')+':00',540,360,L(12)+.3,t,'#fff',46);chip(c,'หลอดไฟ 25 วัตต์',820,500,L(12)+1.8,t,P.gold,30)}
// 13 66% face deforms
function sWarp(c,t,lt,d){bg(c,'#06070a');const p=eio(lt/d);c.save();cam(c,p,{z0:1.05,z1:1.25});mirrorFrame(c,540,900,600,820,'rect');
 mirrorGlass(c,540,900,600,820,'rect',t,g=>{face(g,0,40,1.0,{tone:'skin',warp:.15+.6*sm((t-L(13)-.8)/1.2),brow:.5},t)});c.restore();lightLayer(c,[[540,900,620,.9]],.8);bigNum(c,'66%',540,380,L(13)+.1,t,'#fff',200)}
// 14 28% stranger
function sStranger(c,t,lt,d){bg(c,'#06070a');const p=eio(lt/d);const sw=sm((t-L(14)-.5)/1.0);c.save();cam(c,p,{z0:1.25,z1:1.1});mirrorFrame(c,540,900,600,820,'rect');
 mirrorGlass(c,540,900,600,820,'rect',t,g=>{g.globalAlpha=1-sw;face(g,0,40,1.0,{tone:'skin'},t);g.globalAlpha=sw;face(g,0,40,1.0,{tone:'stranger',look:.4,brow:-.2},t)});c.restore();lightLayer(c,[[540,900,620,.9]],.8);bigNum(c,'28%',540,380,L(14)+.1,t,'#fff',200)}
// 15 almost half: demon
function sDemon(c,t,lt,d){bg(c,'#030304');const p=eio(lt/d);const r=sm((t-L(15)-1.4)/1.2);c.save();cam(c,p,{z0:1.1,z1:1.45,r0:-.04,r1:.04});mirrorFrame(c,540,900,600,820,'rect');
 mirrorGlass(c,540,900,600,820,'rect',t,g=>{g.globalAlpha=1-r*.9;face(g,0,40,1.0,{tone:'pale',brow:.9},t);g.globalAlpha=r;face(g,0,60,1.08,{tone:'demon',eyeGlow:.8*r,mouthOpen:r,smile:.4},t)},{g0:'#1a0d10',g1:'#050203'});c.restore();
 lightLayer(c,[[540,900,560,.9]],.9);bigNum(c,'เกือบครึ่ง',540,380,L(15)+.1,t,P.red,120)}
// 16 nothing in mirror (silence)
function sEmpty(c,t,lt,d){bg(c,'#0b0d12');const p=eio(lt/d);c.save();cam(c,p,{z0:1.0,z1:1.04});c.drawImage(roomLab(),-110,0);mirrorFrame(c,540,860,600,820,'rect');mirrorGlass(c,540,860,600,820,'rect',t,null);c.restore();lightLayer(c,[[540,860,800,.9]],.55)}
// 17 brain erases still details (Troxler)
function sFade(c,t,lt,d){bg(c,'#05060a');const p=eio(lt/d);const f=sm((t-L(17)-1.0)/(LE(17)-L(17)-1.0));c.save();cam(c,p,{z0:1.0,z1:1.15});
 const k=layer('tro',700,900,()=>{}),g=k.getContext('2d');g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,700,900);g.translate(350,380);faceTo(g,{tone:'skin'});g.setTransform(1,0,0,1,0,0);
 // dissolve: draw face in tiles with probability
 const R=seeded(21),ts=30;for(let y=0;y<900;y+=ts)for(let x=0;x<700;x+=ts){const r=R();const cx=x-350,cy=y-380;const dist=Math.hypot(cx,cy+40)/400;if(r*.8+dist*.5>f*1.3){c.drawImage(k,x,y,ts,ts,190+x,500+y,ts,ts)}else if(r<.25&&f<.98){c.fillStyle='rgba(180,200,230,'+(.25*(1-f))+')';c.fillRect(190+x+ts/3,500+y+ts/3,ts/3,ts/3)}}
 // fixation dot
 c.fillStyle='#ff4a3a';c.beginPath();c.arc(540,880,9+2*Math.sin(t*6),0,7);c.fill();glow(c,540,880,60,'rgba(255,60,40,.8)',.6);c.restore();lightLayer(c,[[540,900,700,.9]],.6);chip(c,'Troxler fading',540,380,L(17)+.6,t,P.teal,40)}
// 18 brain fills gaps with invented faces
function sFill(c,t,lt,d){bg(c,'#05060a');const p=eio(lt/d);c.save();cam(c,p,{z0:1.15,z1:1.0});const n=sm((t-L(18)-.4)/1.6);
 for(let i=0;i<5;i++){const a=i/5*Math.PI*2+t*.3,r=330;const x=540+Math.cos(a)*r*(1-n*.0),y=880+Math.sin(a)*r*.8;c.save();c.globalAlpha=.25+.35*n;face(c,x,y,.32,{tone:['ghost','stranger','pale','demon','skin'][i],eyeGlow:i===3?.6:0},t);c.restore()}
 // central brain glow
 c.save();c.translate(540,880);c.globalAlpha=.9;c.fillStyle=rg(c,0,0,10,200,[[0,'rgba(255,170,190,.9)'],[1,'rgba(120,40,80,0)']]);c.beginPath();c.ellipse(0,0,190,150,0,0,7);c.fill();c.strokeStyle='rgba(255,220,230,.6)';c.lineWidth=5;for(let i=0;i<7;i++){c.beginPath();c.moveTo(-150+i*45,-90);c.bezierCurveTo(-120+i*45,-20,-170+i*45,30,-130+i*45,100);c.stroke()}c.restore();
 for(let i=0;i<5;i++){const a=i/5*Math.PI*2+t*.3;c.save();c.strokeStyle='rgba(255,180,200,'+(.5*n)+')';c.lineWidth=3;c.setLineDash([10,14]);c.lineDashOffset=-t*40;c.beginPath();c.moveTo(540,880);c.lineTo(540+Math.cos(a)*330,880+Math.sin(a)*264);c.stroke();c.restore()}
 c.restore();lightLayer(c,[[540,880,900,.9]],.5)}
// 19 mirror doesn't trap souls: chains fall
function sFree(c,t,lt,d){bg(c,'#0a0c12');const p=eio(lt/d);c.save();cam(c,p,{z0:1.1,z1:1.0});mirrorFrame(c,540,880,560,760,'oval');mirrorGlass(c,540,880,560,760,'oval',t,g=>{g.fillStyle='rgba(200,220,255,.08)';g.fillRect(-300,-400,600,800)});
 const fall=eo((t-L(19)-1.0)/1.0);for(const s of [-1,1]){c.save();c.translate(540,880+fall*900);c.rotate(s*(.6+fall*.6));c.strokeStyle='#8a8f99';c.lineWidth=12;for(let i=-8;i<=8;i++){c.beginPath();c.ellipse(i*44,0,26,14,0,0,7);c.stroke()}c.restore()}
 c.restore();lightLayer(c,[[540,880,800,.9]],.5)}
// 20 pull back: reflection lives inside head
function sHead(c,t,lt,d){bg(c,'#05070b');const p=eio(lt/d);c.save();cam(c,p,{z0:2.6,z1:1.0,y0:-120,y1:0});
 c.fillStyle='#0b0d14';c.beginPath();c.ellipse(540,860,330,400,0,0,7);c.fill();c.fillRect(380,1200,320,300);c.beginPath();c.ellipse(540,1600,600,260,0,Math.PI,0);c.fill();
 c.save();c.beginPath();c.ellipse(540,800,240,260,0,0,7);c.clip();mirrorGlass(c,540,800,480,520,'oval',t,g=>{face(g,0,40,.6,{tone:'ghost',blink:bump(t,L(20)+1.6,.3)},t)});c.restore();
 c.strokeStyle='rgba(150,200,230,.35)';c.lineWidth=4;c.beginPath();c.ellipse(540,800,244,264,0,0,7);c.stroke();c.restore();lightLayer(c,[[540,820,700,.9]],.55)}
// 21 tonight: dark bedroom, push to mirror, callback late blink
function sTonight(c,t,lt,d){const p=eio(lt/d);c.save();cam(c,p,{z0:1.0,z1:2.4,x0:0,x1:-490,y0:0,y1:180});c.drawImage(roomThai(),-180,0);sleeper(c,330,930,.9,t);
 mirrorFrame(c,1030,780,240,360,'rect');mirrorGlass(c,1030,780,240,360,'rect',t,g=>{const s=sm((t-LE(21)+1.2)/.8);g.globalAlpha=s;face(g,0,30,.42,{tone:'pale',blink:bump(t,LE(21)-.2,.35),smile:.3},t)});c.restore();lightLayer(c,[[lerp(1030,540,p),lerp(780,960,p),lerp(300,620,p),.75],[640,440,500,.5*(1-p)]],.9);{const s2=sm((t-LE(21)+1.2)/.8);if(s2>0)glow(c,540,960,380,'rgba(170,210,255,.5)',.35*s2)}}
// 22 end card
function sEnd(c,t,lt,d){bg(c,'#040508');c.save();const p=eo(lt/1.0);c.globalAlpha=p;mirrorFrame(c,540,700,260,360,'oval');mirrorGlass(c,540,700,260,360,'oval',t,g=>{face(g,0,30,.45,{tone:'skin',blink:bump(t,L(22)+2.5,.2)},t)});
 tx(c,'@เรื่องสงสัย',540,1080,88,'#fff');const q=eo((t-L(22)-.6)/.5);c.globalAlpha=q;c.fillStyle=P.gold;rr(c,340,1130,400,84,42);c.fill();tx(c,'+ ติดตามไว้นะ',540,1186,44,'#1a1206');c.restore();lightLayer(c,[[540,800,700,.9]],.5)}

const SH=[];function addShot(a,fn,grade,atm){SH.push({a,fn,grade,atm})}
function buildShots(){const cut=i=>i===1?0:(LE(i-1)+L(i))/2;
 addShot(0,sHook,'cold',{fog:.5,ray:[540,420,.12],ang:1.57});addShot(cut(2)+.15,sQ,'cold');addShot(cut(3)+.25,sEurope,'sepia',{fog:.6,ray:[1050,330,.35],ang:2.1});addShot(cut(4),sCloth,'sepia',{fog:.5});addShot(cut(5),sSoul,'cold',{fog:.6});addShot(cut(6),sTrap,'cold',{fog:.5});
 addShot(cut(7),sThai,'night',{fog:.5,ray:[600,330,.35],ang:1.95});addShot(cut(8),sSleep,'night',{fog:.5,ray:[600,330,.3],ang:1.95});addShot(cut(9),sCalm,'warm');addShot(L(10)-.15,sRehook,'red',{fog:.7});addShot(cut(11)+.2,sCaputo,'doc');addShot(cut(12),sStare,'doc',{fog:.45,ray:[870,620,.25],ang:1.9});
 addShot(cut(13),sWarp,'cold',{fog:.4});addShot(cut(14),sStranger,'cold',{fog:.4});addShot(cut(15),sDemon,'red',{fog:.6});addShot(cut(16)+.1,sEmpty,'doc',{fog:.3});addShot(cut(17),sFade,'cold');addShot(cut(18),sFill,'cold');
 addShot(cut(19),sFree,'warm');addShot(cut(20),sHead,'cold');addShot(cut(21),sTonight,'night',{fog:.6,ray:[600,330,.35],ang:1.95});addShot(cut(22),sEnd,'cold');
 for(let i=0;i<SH.length;i++)SH[i].b=i+1<SH.length?SH[i+1].a:DUR}
buildShots();
