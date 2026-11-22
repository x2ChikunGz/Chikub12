// ===== grandma's room (world 1800x1920), characters, cards =====
const RW=1800;
// mirror wardrobe position (world)
const MX=1330,MY=930,MW=330,MH=640;
function roomYai(){return layer('yai',RW,1920,(d,w,h)=>{
 // plank walls
 d.fillStyle=lg(d,0,0,0,1350,[[0,'#3a3a46'],[1,'#22232c']]);d.fillRect(0,0,w,1350);
 for(let x=0;x<w;x+=74){d.fillStyle=(x/74)%2?'rgba(255,240,220,.025)':'rgba(0,0,0,.05)';d.fillRect(x,0,74,1350);d.fillStyle='rgba(0,0,0,.35)';d.fillRect(x,0,3,1350)}
 texFill(d,0,0,w,1350,.28,'overlay',1.6);
 d.fillStyle='#2b2018';d.fillRect(0,1320,w,40);d.fillStyle='rgba(255,230,200,.06)';d.fillRect(0,1320,w,4);
 // floor
 d.fillStyle=lg(d,0,1360,0,h,[[0,'#3a2c22'],[1,'#17110c']]);d.fillRect(0,1360,w,h-1360);for(let y=1360;y<h;y+=52){d.fillStyle='rgba(0,0,0,.3)';d.fillRect(0,y,w,3)}texFill(d,0,1360,w,h-1360,.3,'overlay',2.2);
 // window + shutters
 d.fillStyle='#0b1324';d.fillRect(170,330,380,470);d.fillStyle=rg(d,420,450,8,170,[[0,'#f4f0de'],[.18,'#aab6d3'],[1,'rgba(12,20,40,0)']]);d.fillRect(170,330,380,470);
 d.fillStyle='rgba(20,28,44,.9)';for(let i=0;i<5;i++)d.fillRect(170,360+i*95,380,8);d.fillStyle='#241a13';d.fillRect(352,330,16,470);d.strokeStyle='#2a1e15';d.lineWidth=18;d.strokeRect(170,330,380,470);
 d.fillStyle='#2e2219';d.fillRect(60,330,110,470);d.fillRect(550,330,110,470);for(let i=0;i<8;i++){d.fillStyle='rgba(0,0,0,.35)';d.fillRect(66,345+i*56,98,6);d.fillRect(556,345+i*56,98,6)}
 // grandpa portrait w/ black ribbon
 d.save();d.translate(830,520);d.fillStyle='#4a3524';d.fillRect(-95,-120,190,240);d.fillStyle='#c9bfa8';d.fillRect(-75,-100,150,200);d.fillStyle='#8a8070';d.beginPath();d.ellipse(0,-25,42,52,0,0,7);d.fill();d.beginPath();d.ellipse(0,70,72,48,0,Math.PI,0);d.fill();
 d.fillStyle='rgba(0,0,0,.2)';d.fillRect(-75,-100,150,200);d.fillStyle='#0c0c0e';d.beginPath();d.moveTo(-95,-120);d.lineTo(-40,-120);d.lineTo(-95,-60);d.fill();d.beginPath();d.moveTo(95,-120);d.lineTo(40,-120);d.lineTo(95,-60);d.fill();d.restore();
 // shelf + Buddha-ish small shrine shelf (abstract)
 d.fillStyle='#3a2a1d';d.fillRect(990,610,170,16);d.fillStyle='#c79a4a';d.beginPath();d.moveTo(1075,520);d.quadraticCurveTo(1100,560,1095,610);d.lineTo(1055,610);d.quadraticCurveTo(1050,560,1075,520);d.fill();
 // bed (Thai wooden) + mosquito net frame
 d.fillStyle='#2a1c13';d.fillRect(120,1060,700,46);d.fillRect(120,1100,30,240);d.fillRect(790,1100,30,240);
 d.fillStyle=lg(d,0,1000,0,1070,[[0,'#d8d4c8'],[1,'#9b968a']]);rr(d,130,990,680,80,18);d.fill();d.fillStyle='#ece8de';rr(d,150,955,190,64,26);d.fill();
 d.fillStyle='#2a1c13';d.fillRect(120,700,18,370);d.fillRect(802,700,18,370);d.fillRect(120,700,700,14);
 d.fillStyle='rgba(220,225,235,.08)';d.fillRect(138,714,664,290);for(let x=138;x<802;x+=8){d.fillStyle='rgba(255,255,255,.025)';d.fillRect(x,714,1,290)}
 // nightstand
 d.fillStyle=lg(d,880,0,1060,0,[[0,'#3b2a1c'],[1,'#24180f']]);d.fillRect(880,1130,180,210);d.fillStyle='rgba(0,0,0,.35)';d.fillRect(892,1190,156,4);d.fillStyle='#b88a3c';d.beginPath();d.arc(970,1240,6,0,7);d.fill();
 // wardrobe body
 d.fillStyle=lg(d,MX-250,0,MX+250,0,[[0,'#3c2a1c'],[.5,'#4a3424'],[1,'#2a1c12']]);rr(d,MX-250,MY-420,500,840+70,10);d.fill();texFill(d,MX-250,MY-420,500,910,.25,'overlay',1.4);
 d.fillStyle='#24180f';d.fillRect(MX-268,MY-440,536,30);d.fillStyle='rgba(0,0,0,.35)';d.fillRect(MX-250,MY+400,500,10);
 shadow(d,MX,1430,560,50,.55,20);shadow(d,470,1360,800,60,.5,24);shadow(d,970,1350,220,40,.5,14);
})}
// bedside lamp (live: on/off)
function lamp(c,t,on){c.save();c.translate(970,1130);c.fillStyle='#2a2a30';c.fillRect(-8,-110,16,110);c.fillStyle='#2a2a30';rr(c,-40,-8,80,12,4);c.fill();
 c.fillStyle=on>0?lg(c,0,-200,0,-110,[[0,'#ffe2b0'],[1,'#e6a75a']]):'#5a5248';c.beginPath();c.moveTo(-70,-110);c.lineTo(70,-110);c.lineTo(42,-200);c.lineTo(-42,-200);c.fill();c.restore();
 if(on>0)glow(c,970,1060,520,'rgba(255,170,90,.55)',.55*on*flick(t,4))}
// mirror on wardrobe with cloth: slip 0 = fully covered, 1 = half off
function wardrobeMirror(c,t,slip,content,o={}){mirrorFrame(c,MX,MY,MW,MH,'rect');mirrorGlass(c,MX,MY,MW,MH,'rect',t,content,o);
 const top=MY-MH/2-30+slip*MH*.5,sw=Math.sin(t*1.7)*6*(1-slip*.5);c.save();c.fillStyle=lg(c,0,top,0,top+MH,[[0,'#e9e6de'],[1,'#a9a49a']]);c.beginPath();c.moveTo(MX-MW/2-50,top);c.quadraticCurveTo(MX,top-30+slip*40,MX+MW/2+50,top);
 for(let i=0;i<=8;i++){const x=MX+MW/2+50-i*(MW+100)/8,y=MY+MH/2+40+Math.sin(i*1.4+t*1.5)*10+(i%2)*14;c.lineTo(x+sw*(i/8),y)}c.closePath();c.fill();
 c.strokeStyle='rgba(0,0,0,.12)';c.lineWidth=5;for(let i=1;i<6;i++){c.beginPath();c.moveTo(MX-MW/2-30+i*(MW+60)/6,top+20);c.quadraticCurveTo(MX-MW/2-30+i*(MW+60)/6+Math.sin(t+i)*14,MY,MX-MW/2-40+i*(MW+60)/6,MY+MH/2+30);c.stroke()}texFill(c,MX-MW/2-60,top-40,MW+120,MH+120,.18,'overlay');c.restore()}

// ---------- 2-bone IK person ----------
function ik(ax,ay,bx,by,l1,l2,bend=1){const dx=bx-ax,dy=by-ay;let d=Math.hypot(dx,dy);d=Math.min(d,l1+l2-.01);const a=Math.atan2(dy,dx),cA=Math.acos(clamp((l1*l1+d*d-l2*l2)/(2*l1*d),-1,1));const ang=a-bend*cA;return [ax+Math.cos(ang)*l1,ay+Math.sin(ang)*l1]}
function limb(c,ax,ay,bx,by,l1,l2,w1,w2,col,bend){const [ex,ey]=ik(ax,ay,bx,by,l1,l2,bend);c.strokeStyle=col;c.lineCap='round';c.lineJoin='round';c.lineWidth=w1;c.beginPath();c.moveTo(ax,ay);c.lineTo(ex,ey);c.stroke();c.lineWidth=w2;c.beginPath();c.moveTo(ex,ey);c.lineTo(bx,by);c.stroke();return [ex,ey]}
// p: {x,y (hip), s, lean, head:{tilt,turn}, hand:[[x,y],[x,y]] relative to hip, foot:[[x,y],[x,y]], blink, back(bool: seen from behind), skin, shirt, pants}
function person(c,p,t){const s=p.s||1;c.save();c.translate(p.x,p.y);c.scale(s,s);const br=Math.sin(t*1.5)*2.5;const lean=p.lean||0;
 const sk=p.skin||'#d9a382',sh=p.shirt||'#4a5876',pa=p.pants||'#2a2f3d';
 const nx=Math.sin(lean)*170,ny=-Math.cos(lean)*170-br; // neck
 const shx=nx*.92,shy=ny*.92+10;
 // back limbs
 const F=p.foot||[[-20,170],[30,170]],Hn=p.hand||[[-60,40],[60,40]];
 limb(c,-14,0,F[0][0],F[0][1],95,95,30,24,'#1f2430',p.kneeBend||-1);
 limb(c,shx-26,shy,Hn[0][0],Hn[0][1],70,66,20,16,p.back?sh:'#3d4964',-1);
 // torso
 c.fillStyle=lg(c,0,ny,0,10,[[0,sh],[1,'#33405a']]);c.beginPath();c.moveTo(-34,8);c.quadraticCurveTo(-44+nx*.5,ny*.5,shx-40,shy);c.lineTo(shx+40,shy);c.quadraticCurveTo(44+nx*.5,ny*.5,34,8);c.closePath();c.fill();texFill(c,-60,ny-20,120,ny*-1+40,.12,'overlay');
 c.fillStyle=pa;rr(c,-38,-6,76,26,10);c.fill();
 limb(c,14,0,F[1][0],F[1][1],95,95,32,26,pa,p.kneeBend||-1);
 // head
 c.save();c.translate(nx,ny-6);c.rotate((p.head&&p.head.tilt)||0);const turn=(p.head&&p.head.turn)||0;
 c.fillStyle=sk;c.fillRect(-10,-6,20,24);
 if(p.back){c.fillStyle='#17141c';c.beginPath();c.ellipse(0,-52,44,52,0,0,7);c.fill();c.fillStyle='rgba(255,255,255,.06)';c.beginPath();c.ellipse(-12,-70,14,24,-.4,0,7);c.fill()}
 else{c.fillStyle=sk;c.beginPath();c.ellipse(turn*8,-48,40,50,0,0,7);c.fill();c.fillStyle='#17141c';c.beginPath();c.ellipse(turn*2,-70,44,34,0,Math.PI*1.02,Math.PI*2.0);c.fill();c.beginPath();c.ellipse(-30+turn*6,-60,14,30,.2,0,7);c.fill();
  const bl=clamp(p.blink||0);for(const e of [-1,1]){const ex=turn*16+e*15,ey=-46;c.fillStyle='#1a1418';c.beginPath();c.ellipse(ex,ey,4.5,6*(1-bl)+.6,0,0,7);c.fill()}
  c.strokeStyle='rgba(80,40,30,.5)';c.lineWidth=2.5;c.beginPath();c.moveTo(turn*16-8,-20+(p.mouth||0)*2);c.quadraticCurveTo(turn*16,-18-(p.mouth||0)*4,turn*16+8,-20);c.stroke()}
 c.restore();
 // front arm
 limb(c,shx+26,shy,Hn[1][0],Hn[1][1],70,66,22,17,sh,p.armBend||1);c.fillStyle=sk;c.beginPath();c.arc(Hn[1][0],Hn[1][1],11,0,7);c.fill();
 c.restore()}
// orange cat ส้มโอ: pose 'sit' | 'hiss'
function cat(c,x,y,s,t,pose='sit'){c.save();c.translate(x,y);c.scale(s,s);const h=pose==='hiss';const br=Math.sin(t*(h?9:2))*(h?2:1.5);
 shadow(c,0,4,170,22,.45,8);c.fillStyle='#d9822b';
 // tail
 c.strokeStyle='#c8731f';c.lineWidth=16;c.lineCap='round';c.beginPath();c.moveTo(-60,-20);c.quadraticCurveTo(-120,-40-(h?60:0),-100+Math.sin(t*2)*10,-110-(h?40:0));c.stroke();
 // body (arched when hiss)
 c.beginPath();c.moveTo(-70,0);c.quadraticCurveTo(-75,-(h?120:70)-br,0,-(h?130:80)-br);c.quadraticCurveTo(60,-(h?110:90),55,0);c.closePath();c.fill();
 c.fillStyle='rgba(255,255,255,.12)';for(let i=0;i<4;i++){c.fillRect(-40+i*20,-(h?110:70)+i*4,8,30)}
 if(h){c.strokeStyle='#d9822b';c.lineWidth=3;for(let i=0;i<14;i++){const a=-2.6+i*.12;c.beginPath();c.moveTo(Math.cos(a)*70,-70+Math.sin(a)*70);c.lineTo(Math.cos(a)*86,-70+Math.sin(a)*86);c.stroke()}}
 // head
 c.save();c.translate(50,-(h?120:95)-br);c.fillStyle='#e08d35';c.beginPath();c.ellipse(0,0,40,34,0,0,7);c.fill();
 c.beginPath();c.moveTo(-32,-14);c.lineTo(-30,-(h?48:52));c.lineTo(-10,-28);c.fill();c.beginPath();c.moveTo(32,-14);c.lineTo(30,-(h?48:52));c.lineTo(10,-28);c.fill();
 c.fillStyle='#f6e9c8';c.beginPath();c.ellipse(4,14,22,16,0,0,7);c.fill();
 c.fillStyle='#c8ff7a';for(const e of [-1,1]){c.beginPath();c.ellipse(e*15+6,-4,7,h?8:6,0,0,7);c.fill();c.fillStyle='#111';c.beginPath();c.ellipse(e*15+7,-4,2,h?7:5,0,0,7);c.fill();c.fillStyle='#c8ff7a'}
 glow(c,6,-4,40,'rgba(200,255,120,.6)',.25);
 if(h){c.fillStyle='#3a0f12';c.beginPath();c.ellipse(6,20,12,10,0,0,7);c.fill();c.fillStyle='#fff';c.beginPath();c.moveTo(-2,13);c.lineTo(0,22);c.lineTo(2,13);c.moveTo(10,13);c.lineTo(12,22);c.lineTo(14,13);c.fill()}
 c.restore();c.restore()}

// ---------- UI cards ----------
function card(c,x,y,w,h,p,title,ic){c.save();const k=eo(p);c.globalAlpha=k;c.translate(x,y+(1-k)*30);c.fillStyle='rgba(14,16,24,.86)';rr(c,-w/2,-h/2,w,h,22);c.fill();c.strokeStyle='rgba(255,255,255,.14)';c.lineWidth=2;c.stroke();
 c.fillStyle='rgba(255,255,255,.06)';rr(c,-w/2,-h/2,w,64,22);c.fill();tx(c,(ic?ic+'  ':'')+title,-w/2+30,-h/2+44,30,'#e9e2d0','left');c.restore()}
function ruleRow(c,x,y,s,state,p){// state 0 empty,1 check,2 cross
 const k=eo(p);if(k<=0)return;c.save();c.globalAlpha=k;c.translate(x+(1-k)*20,y);c.strokeStyle='#e9e2d0';c.lineWidth=3;rr(c,0,-30,40,40,8);c.stroke();
 if(state===1){c.strokeStyle='#7fd18a';c.lineWidth=6;c.beginPath();c.moveTo(8,-10);c.lineTo(18,0);c.lineTo(34,-22);c.stroke()}
 if(state===2){c.strokeStyle=P.red;c.lineWidth=6;c.beginPath();c.moveTo(8,-22);c.lineTo(32,2);c.moveTo(32,-22);c.lineTo(8,2);c.stroke()}
 tx(c,s,60,0,46,state===2?'#ff8a8a':'#fff','left');c.restore()}
function phoneUI(c,x,y,t,t0){const p=eo((t-t0)/.4);c.save();c.globalAlpha=p;c.translate(x,y+(1-p)*40);c.fillStyle='#0e0f14';rr(c,-170,-300,340,600,40);c.fill();c.strokeStyle='#3a3d48';c.lineWidth=6;c.stroke();
 c.fillStyle=lg(c,0,-280,0,280,[[0,'#2a3a2e'],[1,'#10161a']]);rr(c,-156,-286,312,572,32);c.fill();
 c.fillStyle='#c9bfa8';c.beginPath();c.arc(0,-150,62,0,7);c.fill();c.fillStyle='#8a8070';c.beginPath();c.ellipse(0,-160,26,32,0,0,7);c.fill();c.beginPath();c.ellipse(0,-108,44,26,0,Math.PI,0);c.fill();
 tx(c,'ยาย',0,-50,52,'#fff');tx(c,'กำลังโทร…',0,0,28,'rgba(255,255,255,.7)');
 const r=1+.08*Math.sin(t*8);c.fillStyle='#3cc36a';c.beginPath();c.arc(0,190,44*r,0,7);c.fill();c.fillStyle='#fff';c.save();c.translate(0,190);c.rotate(-.6);rr(c,-20,-8,40,16,8);c.fill();c.restore();c.restore()}
function clockUI(c,x,y,s,t0,t){const p=eo((t-t0)/.35);if(p<=0)return;c.save();c.globalAlpha=p;c.translate(x,y);c.fillStyle='rgba(10,12,18,.8)';rr(c,-150,-52,300,104,18);c.fill();c.strokeStyle='rgba(255,255,255,.15)';c.stroke();
 c.strokeStyle='#e9e2d0';c.lineWidth=4;c.beginPath();c.arc(-92,0,30,0,7);c.stroke();c.beginPath();c.moveTo(-92,0);c.lineTo(-92,-20);c.moveTo(-92,0);c.lineTo(-78,6);c.stroke();tx(c,s,30,18,54,'#fff');c.restore()}
