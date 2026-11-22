// ===== mirror2 shots (movie) =====
function bump(t,a,d){return t<a||t>a+d?0:Math.sin((t-a)/d*Math.PI)}
function bg(c,col){c.fillStyle=col;c.fillRect(-400,-400,W+800,H+800)}
function lightLayer(c,holes,a){darkness(c,a>=.95?a:a*.92,holes,'8,8,22')}
// world camera: centre world point (cx,cy) with zoom z, rotation r
let CAM={cx:900,cy:960,z:1,r:0};
function camW(c,p,a,b){const k={};for(const n of ['cx','cy','z','r'])k[n]=lerp(a[n]??(n==='z'?1:0),(b||a)[n]??a[n]??(n==='z'?1:0),p);CAM=k;c.translate(540,960);c.rotate(k.r||0);c.scale(k.z,k.z);c.translate(-k.cx,-k.cy)}
const S2=(x,y)=>[(x-CAM.cx)*CAM.z+540,(y-CAM.cy)*CAM.z+960];
function hole(x,y,r,s){const [a,b]=S2(x,y);return [a,b,r*CAM.z,s]}
function scene(c,t,o){// draw the room with live props
 c.drawImage(roomYai(),0,0);if(o.moon!==0)moonBeam(c,t,o.moon??1);lamp(c,t,o.lamp??0);
 wardrobeMirror(c,t,o.slip||0,o.mc||null,o.mo||{});
 if(o.cat)cat(c,1050,1350,o.catS||.8,t,o.cat);
 if(o.you)person(c,o.you,t);
 if(o.sleeper){c.save();c.translate(330,985);const brr=Math.sin(t*1.2)*3;c.fillStyle='#d9a382';c.beginPath();c.ellipse(0,0,40,48,-1.35,0,7);c.fill();c.fillStyle='#17141c';c.beginPath();c.ellipse(-14,-6,44,40,-1.35,3.3,6.4);c.fill();c.fillStyle=lg(c,0,0,0,80,[[0,'#7c8fb8'],[1,'#3c4c72']]);c.beginPath();c.moveTo(40,0-brr);c.quadraticCurveTo(240,-30-brr,470,20);c.lineTo(470,80);c.lineTo(30,80);c.fill();c.restore()}
}
const youSit={x:520,y:1060,s:1.0,lean:.05,head:{tilt:0,turn:.6},hand:[[-70,20],[80,10]],foot:[[60,160],[110,170]],kneeBend:1,armBend:1};
const youBack={x:860,y:1210,s:1.15,lean:-.02,back:true,head:{tilt:.05},hand:[[-40,60],[44,62]],foot:[[-26,196],[30,196]]};

// 1 HOOK: flash-forward smile in black mirror -> room
function sHook(c,t,lt,d){const fl=L(1)+.95;if(t<fl){bg(c,'#020203');c.save();c.translate(540,900);const z=1.15+.15*(t/fl);c.scale(z,z);mirrorFrame(c,0,0,520,760,'rect');mirrorGlass(c,0,0,520,760,'rect',t,g=>{g.fillStyle='#030305';g.fillRect(-260,-380,520,760);smileGhost(g,0,-10,1.1,t,1)},{g0:'#050507',g1:'#020203'});c.restore();return}
 const p=eio((t-fl)/(d-(fl-L(1))));c.save();camW(c,p,{cx:860,cy:900,z:1.25},{cx:900,cy:960,z:1.05});scene(c,t,{lamp:1,sleeper:1});c.restore();
 lightLayer(c,[hole(970,1060,620,.9),hole(420,500,420,.6),hole(MX,MY,420,.35)],.8)}
function smileGhost(c,x,y,s,t,a){c.save();c.translate(x,y);c.scale(s,s);c.globalAlpha=a;
 c.fillStyle=rg(c,0,0,10,260,[[0,'rgba(30,34,44,.9)'],[1,'rgba(0,0,0,0)']]);c.beginPath();c.ellipse(0,0,190,240,0,0,7);c.fill();
 for(const e of [-1,1]){glow(c,e*62,-40,70,'rgba(220,235,255,.9)',.5);c.fillStyle='#e9f2ff';c.beginPath();c.ellipse(e*62,-40,16,9,0,0,7);c.fill()}
 c.fillStyle='#e9e6dc';c.beginPath();c.moveTo(-110,60);c.quadraticCurveTo(0,150,110,60);c.quadraticCurveTo(0,100,-110,60);c.fill();c.strokeStyle='#15151a';c.lineWidth=3;for(let i=-5;i<=5;i++){c.beginPath();c.moveTo(i*19,72+Math.abs(i)*-2.4+8);c.lineTo(i*19,96-Math.abs(i)*3);c.stroke()}
 c.restore()}
// 2 covered mirror
function sMirror(c,t,lt,d){const p=eio(lt/d);c.save();camW(c,p,{cx:1180,cy:900,z:1.3},{cx:MX,cy:MY,z:1.55});scene(c,t,{lamp:1});c.restore();lightLayer(c,[hole(970,1060,600,.9),hole(MX,MY,500,.45)],.8);chip(c,'บ้านยาย · ห้องนอนเก่า',540,380,L(2)+.2,t,P.gold,38)}
// 3 phone call
function sPhone(c,t,lt,d){const p=eio(lt/d);c.save();c.filter='blur(14px)';camW(c,p,{cx:700,cy:960,z:1.1});scene(c,t,{lamp:1,you:youSit});c.restore();c.fillStyle='rgba(5,6,10,.45)';c.fillRect(0,0,W,H);c.save();c.translate(540,880);c.scale(1.35,1.35);c.translate(-540,-880);phoneUI(c,540,880,t,L(3)-.1);c.restore()}
// 4-5 rules card
function sRules(c,t,lt,d){const p=eio(lt/d);c.save();c.filter='blur(14px)';camW(c,p,{cx:MX,cy:MY,z:1.2},{cx:MX-60,cy:MY,z:1.3});scene(c,t,{lamp:1});c.restore();c.fillStyle='rgba(5,6,10,.45)';c.fillRect(0,0,W,H);
 card(c,540,800,860,360,(t-L(4)+.2)/.4,'กฎของยาย','📞');ruleRow(c,160,820,'ห้ามเปิดผ้าคลุมกระจก',t>L(4)+1.0?2:0,(t-L(4)-.1)/.4);ruleRow(c,160,930,'ห้ามหันกระจกเข้าหาเตียง',t>L(5)+1.1?2:0,(t-L(5)-.1)/.4);
 // top-down mini diagram
 const q=eo((t-L(5)-.4)/.5);if(q>0){c.save();c.globalAlpha=q;c.translate(540,1130);c.fillStyle='rgba(14,16,24,.86)';rr(c,-300,-110,600,220,20);c.fill();c.fillStyle='#9aa6c2';rr(c,-250,-60,200,120,14);c.fill();tx(c,'เตียง',-150,10,32,'#1a1d28');c.fillStyle='#c99440';c.fillRect(170,-70,24,140);tx(c,'กระจก',182,100,26,'#e9e2d0');
  c.strokeStyle=P.red;c.lineWidth=7;c.setLineDash([18,12]);c.lineDashOffset=-t*50;c.beginPath();c.moveTo(160,0);c.lineTo(-40,0);c.stroke();c.setLineDash([]);c.fillStyle=P.red;c.beginPath();c.moveTo(-50,0);c.lineTo(-20,-18);c.lineTo(-20,18);c.fill();c.restore()}}
// 6 you shrug on bed
function sShrug(c,t,lt,d){const p=eio(lt/d);c.save();camW(c,p,{cx:560,cy:920,z:1.45},{cx:600,cy:920,z:1.55});const sh=bump(t,L(6)+.2,.8);scene(c,t,{lamp:1,you:{...youSit,hand:[[-70,20-sh*60],[80,10-sh*60]],head:{tilt:-.08*sh,turn:.6}}});c.restore();lightLayer(c,[hole(970,1060,620,.9),hole(560,900,380,.5)],.78);chip(c,'มีที่มา',540,380,L(6)+1.0,t,P.teal,40)}
// 7 sepia flashback: covering mirrors
function sPast(c,t,lt,d){const p=eio(lt/d),dr=eo((t-L(7)-.9)/1.6);c.save();c.translate(540,960);c.scale(1.35+.1*p,1.35+.1*p);c.translate(-560,-760);c.drawImage(roomVictorian(),-200,0);mirrorFrame(c,560,700,300,430,'rect');mirrorGlass(c,560,700,300,430,'rect',t,null,{g0:'#3a3028',g1:'#15100c'});
 const top=420,drop=lerp(-60,520,dr);c.fillStyle=lg(c,0,top,0,top+drop,[[0,'#1b1014'],[1,'#0a0608']]);c.beginPath();c.moveTo(380,top);c.lineTo(740,top);for(let i=0;i<=7;i++)c.lineTo(740-i*51,top+drop+Math.sin(i*1.3+t*2)*14);c.closePath();c.fill();
 person(c,{x:250,y:1120,s:1.2,back:false,lean:.12,head:{tilt:.35,turn:-.3},hand:[[-30,60],[20,70]],foot:[[-20,190],[25,190]],shirt:'#2a1c18',pants:'#1a1210'},t);candle(c,380,1150,t,.8,4);candle(c,760,1170,t,.7,5);c.restore();lightLayer(c,[[300,1300,700,.95],[900,1300,620,.9],[540,760,520,.7]],.6);dust(c,t,50,0,200,W,1400,'255,210,150',8);chip(c,'สมัยก่อน',540,380,L(7)+.2,t,P.gold,38)}
// 8 reflection = soul, trapped
function sSoul(c,t,lt,d){bg(c,'#07090e');const p=eio(lt/d);c.save();c.translate(540,960);c.scale(1+.12*p,1+.12*p);c.translate(-540,-960);mirrorFrame(c,540,860,600,820,'oval');
 mirrorGlass(c,540,860,600,820,'oval',t,g=>{face(g,0,40,1.0,{tone:'ghost',blink:.05,mouthOpen:.3*sm((t-L(8)-1.6)/.6),brow:.6},t);if(t>L(8)+1.8)ghostHands(g,t,sm((t-L(8)-1.8)/.5)*.8)},{crack:sm((t-LE(8)+.4)/.3),crackSeed:9});
 wisp(c,[[540,1500],[420,1250],[600,1050],[540,880]],t,eo((t-L(8)-.3)/1.4));c.restore();lightLayer(c,[[540,860,620,.9]],.75)}
// 9 grandpa portrait
function sPortrait(c,t,lt,d){const p=eio(lt/d);c.save();camW(c,p,{cx:760,cy:700,z:1.4},{cx:830,cy:540,z:2.2});scene(c,t,{lamp:1,you:youSit});c.restore();lightLayer(c,[hole(830,520,380,.6),hole(970,1060,600,.9)],.8);chip(c,'ตา · เพิ่งเสียเดือนก่อน',540,380,L(9)+1.2,t,'#e9e2d0',36)}
// 10 2AM, cat hisses
function sCat(c,t,lt,d){const p=eio(lt/d);c.save();camW(c,p,{cx:1120,cy:1150,z:1.5},{cx:1160,cy:1120,z:1.7});scene(c,t,{lamp:.55,cat:t>L(10)+1.6?'hiss':'sit',catS:.95});c.restore();lightLayer(c,[hole(970,1060,500,.8),hole(1060,1250,300,.5)],.86);clockUI(c,540,380,'02:00',L(10)-.1,t)}
// 11 cloth slips
function sSlip(c,t,lt,d){const p=eio(lt/d),sl=sm((t-L(11)-.4)/(d-.6));c.save();camW(c,p,{cx:MX,cy:MY,z:1.8},{cx:MX,cy:MY+20,z:2.0});scene(c,t,{lamp:.55,slip:sl,mc:g=>{g.fillStyle='rgba(120,140,170,.1)';g.fillRect(-200,-400,400,800)}});c.restore();lightLayer(c,[hole(MX,MY,520,.55),hole(970,1060,500,.8)],.86)}
// 12-13 your face: eyes shut -> open
function sEyes(c,t,lt,d){bg(c,'#06070b');const open=t>=L(13)-.05;const p=eio(lt/d);c.save();c.translate(540,900);const z=open?1.55:1.3+.1*p;c.scale(z,z);c.translate(-540,-900);
 face(c,540,900,1.15,{tone:'skin',blink:open?0:.85+.1*Math.sin(t*8),brow:open?.4:.9,look:open?.35:0,sweat:t-L(12),rimCol:'rgba(255,170,100,.6)'},t);c.restore();lightLayer(c,[[700,900,620,.85]],.75)}
// 14 over-the-shoulder at mirror
function sStare(c,t,lt,d){const p=eio(lt/d);c.save();camW(c,p,{cx:1100,cy:950,z:1.35},{cx:1180,cy:930,z:1.6});scene(c,t,{lamp:.55,slip:1,you:{...youBack,x:980,y:1240},mc:g=>{face(g,0,60,.6,{tone:'skin',blink:bump(t,L(14)+1.2,.2),rimCol:'rgba(255,170,100,.6)'},t)}});c.restore();lightLayer(c,[hole(970,1060,520,.85),hole(MX,MY,380,.6)],.82)}
// 15 reflection warps
function sWarp(c,t,lt,d){bg(c,'#05060a');const p=eio(lt/d);c.save();c.translate(540,940);c.scale(1+.25*p,1+.25*p);c.translate(-540,-940);mirrorFrame(c,540,920,620,860,'rect');mirrorGlass(c,540,920,620,860,'rect',t,g=>{face(g,0,40,1.05,{tone:'skin',warp:.1+.6*sm((t-L(15)-.5)/1.2),brow:.5},t)});c.restore();lightLayer(c,[[540,920,640,.9]],.8)}
// 16 RE-HOOK
function sRehook(c,t,lt,d){bg(c,'#030305');const p=eio(lt/d),hit=HIT2();c.save();c.translate(540,960);c.rotate(.12+.08*p);c.scale(1.2+.35*p,1.2+.35*p);c.translate(-540,-960);mirrorFrame(c,540,920,620,860,'rect');
 mirrorGlass(c,540,920,620,860,'rect',t,g=>{face(g,0,40,1.05,{tone:'pale',blink:0,brow:.9,smile:t>hit?.7:.1,warp:t>hit?.3:.15},t)},{crack:sm((t-hit)/.25),crackSeed:3});c.restore();lightLayer(c,[[540,920,560,.9]],.86);
 if(t>hit){c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(200,40,50,'+(.45*(1-clamp((t-hit)/1.2)))+')';c.fillRect(0,0,W,H);c.restore()}}
function HIT2(){return L(16)+(LE(16)-L(16))*.62}
// 17 study card
function sStudy(c,t,lt,d){bg(c,'#0c0e13');const p=eio(lt/d);c.save();c.filter='blur(16px)';camW(c,p,{cx:MX,cy:MY,z:1.3});scene(c,t,{lamp:.55,slip:1});c.restore();c.fillStyle='rgba(5,6,10,.5)';c.fillRect(0,0,W,H);
 card(c,540,860,840,700,(t-L(17)+.1)/.4,'การทดลอง · อิตาลี 2010','🔬');const rows=[['📅','ปี 2010 · Giovanni Caputo',.2],['💡','หลอดไฟ 25 วัตต์ ห้องสลัว',1.2],['🪞','จ้องหน้าตัวเองในกระจก',2.0],['⏱','นาน 10 นาที',2.8]];
 rows.forEach((r,i)=>{const k=eo((t-L(17)-r[2])/.4);if(k<=0)return;c.save();c.globalAlpha=k;tx(c,r[0]+'  '+r[1],170+(1-k)*20,700+i*110,42,i===3?'#ffc857':'#fff','left');c.restore()})}
// 18 stats bars
function sStats(c,t,lt,d){bg(c,'#0a0b10');c.save();c.filter='blur(16px)';camW(c,0,{cx:MX,cy:MY,z:1.3});scene(c,t,{lamp:.55,slip:1});c.restore();c.fillStyle='rgba(5,6,10,.55)';c.fillRect(0,0,W,H);
 const bars=[['เห็นหน้าตัวเองบิดเบี้ยว',66,'#e9e2d0',0],['เห็นหน้าคนแปลกหน้า',28,'#9fb8c2',.9],['เห็นสิ่งที่เหมือนปีศาจ',48,P.red,(LE(18)-L(18))*.55]];
 bars.forEach((b,i)=>{const k=eo((t-L(18)-b[3])/.8);if(k<=0)return;const y=640+i*230;c.save();c.globalAlpha=clamp(k*1.5);tx(c,b[0],150,y,40,'#fff','left');c.fillStyle='rgba(255,255,255,.1)';rr(c,150,y+30,780,56,14);c.fill();c.fillStyle=b[2];rr(c,150,y+30,780*b[1]/100*k,56,14);c.fill();tx(c,Math.round(b[1]*k)+'%',930,y,52,b[2],'right');c.restore()});
 if(t>L(18)+(LE(18)-L(18))*.55+.6){const a=sm((t-L(18)-(LE(18)-L(18))*.55-.6)/.5);c.save();c.globalAlpha=a*.85;face(c,860,420,.3,{tone:'demon',eyeGlow:.8,mouthOpen:.6},t);c.restore()}}
// 19 Troxler
function sFade(c,t,lt,d){bg(c,'#05060a');const p=eio(lt/d);const f=sm((t-L(19)-.6)/(d*.55));c.save();c.translate(540,960);c.scale(1+.12*p,1+.12*p);c.translate(-540,-960);
 const k=layer('tro',700,900,()=>{}),g=k.getContext('2d');g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,700,900);g.translate(350,380);faceTo(g,{tone:'skin'});g.setTransform(1,0,0,1,0,0);
 const R=seeded(21),ts=30,re=sm((t-L(19)-d*.62)/(d*.3));for(let y=0;y<900;y+=ts)for(let x=0;x<700;x+=ts){const r=R();const dist=Math.hypot(x-350,y-340)/400;if(r*.8+dist*.5>f*1.3)c.drawImage(k,x,y,ts,ts,190+x,500+y,ts,ts)}
 if(re>0){c.save();c.globalAlpha=re;face(c,540,880,1.0,{tone:'stranger',look:.3},t);c.restore()}
 c.fillStyle='#ff4a3a';c.beginPath();c.arc(540,860,9,0,7);c.fill();glow(c,540,860,60,'rgba(255,60,40,.8)',.6);c.restore();lightLayer(c,[[540,900,700,.9]],.6);chip(c,re>.2?'สมองวาดหน้าใหม่':'สมองลบภาพที่นิ่ง',540,380,L(19)+.4,t,P.teal,40)}
// 20 summary: brain + mirror, calm
function sSum(c,t,lt,d){bg(c,'#0a0c12');const p=eio(lt/d);c.save();c.translate(540,960);c.scale(1.05-.05*p,1.05-.05*p);c.translate(-540,-960);mirrorFrame(c,540,880,560,760,'oval');mirrorGlass(c,540,880,560,760,'oval',t,g=>{g.save();g.translate(0,-20);g.globalAlpha=.95;g.fillStyle=rg(g,0,0,10,200,[[0,'rgba(255,170,190,.9)'],[1,'rgba(120,40,80,0)']]);g.beginPath();g.ellipse(0,0,190,150,0,0,7);g.fill();g.strokeStyle='rgba(255,220,230,.6)';g.lineWidth=5;for(let i=0;i<7;i++){g.beginPath();g.moveTo(-150+i*45,-90);g.bezierCurveTo(-120+i*45,-20,-170+i*45,30,-130+i*45,100);g.stroke()}g.restore()});c.restore();lightLayer(c,[[540,880,800,.9]],.5);chip(c,'สรุป',540,380,L(20)+.1,t,P.gold,44)}
// 21 lamp off
function sOff(c,t,lt,d){const p=eio(lt/d),off=L(21)+(LE(21)-L(21))*.75,on=t<off?1:0;c.save();camW(c,p,{cx:800,cy:1000,z:1.4},{cx:860,cy:1040,z:1.6});
 const reach=sm((t-L(21)-.6)/.8);scene(c,t,{lamp:on*.55,slip:1,you:{...youSit,x:770,head:{tilt:.05,turn:.8},hand:[[-70,20],[80+reach*70,10-reach*110]]}});c.restore();
 lightLayer(c,on?[hole(970,1060,520,.85)]:[hole(420,500,300,.25)],on?.82:.97)}
// 22 total dark, push to mirror
function sDark(c,t,lt,d){bg(c,'#000');const p=eio(lt/d);c.save();camW(c,p,{cx:1000,cy:950,z:1.2},{cx:MX,cy:MY,z:1.9});scene(c,t,{lamp:0,moon:.35,slip:1,mc:g=>{g.fillStyle='#020203';g.fillRect(-200,-400,400,800)},mo:{g0:'#040406',g1:'#020203'}});c.restore();lightLayer(c,[hole(420,500,300,.25),hole(MX,MY,300,.12)],.97)}
// 23 the smile
function sSmile(c,t,lt,d){bg(c,'#000');const p=eio(lt/d);c.save();c.translate(540,940);c.scale(1.1+.35*p,1.1+.35*p);c.translate(-540,-940);mirrorFrame(c,540,920,520,760,'rect');mirrorGlass(c,540,920,520,760,'rect',t,g=>{g.fillStyle='#020203';g.fillRect(-260,-380,520,760);smileGhost(g,0,0,1.0,t,sm((t-L(23)-.4)/1.4))},{g0:'#030305',g1:'#010102'});c.restore();
 c.fillStyle='rgba(0,0,0,.55)';c.fillRect(0,0,W,H);c.save();c.globalCompositeOperation='lighter';c.globalAlpha=sm((t-L(23)-.4)/1.4)*.35;for(const e of [-1,1])glow(c,540+e*62*1.3,920-40,90,'rgba(200,220,255,.7)',.6);c.restore()}
// 24 end card
function sEnd(c,t,lt,d){bg(c,'#040508');const p=eo(lt/.8);c.save();c.globalAlpha=p;mirrorFrame(c,540,700,260,360,'oval');mirrorGlass(c,540,700,260,360,'oval',t,g=>{g.fillStyle='#020203';g.fillRect(-130,-180,260,360);smileGhost(g,0,0,.42,t,.8)});
 tx(c,'@เรื่องสงสัย',540,1080,88,'#fff');const q=eo((t-L(24)-.4)/.5);c.globalAlpha=q;c.fillStyle=P.gold;rr(c,340,1130,400,84,42);c.fill();tx(c,'+ ติดตามไว้นะ',540,1186,44,'#1a1206');c.restore();lightLayer(c,[[540,800,700,.9]],.5)}

const SH=[];function addShot(a,fn,grade,atm){SH.push({a,fn,grade,atm})}
function buildShots(){const cut=i=>i===1?0:(LE(i-1)+L(i))/2;
 addShot(0,sHook,'night',{fog:.3});addShot(cut(2),sMirror,'night',{fog:.3});addShot(cut(3),sPhone,'night');addShot(cut(4),sRules,'night');
 addShot(cut(6),sShrug,'night',{fog:.25});addShot(cut(7),sPast,'sepia',{fog:.3});addShot(cut(8),sSoul,'cold',{fog:.3});addShot(cut(9),sPortrait,'night',{fog:.3});
 addShot(cut(10),sCat,'night',{fog:.3});addShot(cut(11),sSlip,'night',{fog:.3});addShot(cut(12),sEyes,'warm');addShot(cut(14),sStare,'night',{fog:.3});addShot(cut(15),sWarp,'cold',{fog:.25});
 addShot(L(16)-.12,sRehook,'red',{fog:.6});addShot(cut(17)+.1,sStudy,'doc');addShot(cut(18),sStats,'doc');addShot(cut(19),sFade,'cold');addShot(cut(20),sSum,'warm');
 addShot(cut(21),sOff,'night',{fog:.3});addShot(cut(22),sDark,'night');addShot(cut(23),sSmile,'cold');addShot(cut(24),sEnd,'cold');
 for(let i=0;i<SH.length;i++)SH[i].b=i+1<SH.length?SH[i+1].a:DUR}
buildShots();
