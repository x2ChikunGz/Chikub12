// ===== mirror clip: cinematic 2D vector engine =====
// requires engine.js (utils) + timing.js (DUR, LINE, CAPS)
const HF='Kanit,Tahoma,sans-serif';
const P={red:'#c8232f',gold:'#d8a24a',ink:'#0c0f18',cream:'#f3e6c8',teal:'#7fd1d0',blood:'#8e0f18'};
const L=i=>LINE[i-1][0], LE=i=>LINE[i-1][1];
function tx(c,s,x,y,fs,col,al='center'){c.font='800 '+fs+'px '+HF;c.textAlign=al;c.fillStyle=col;c.fillText(s,x,y)}
function credit(c){c.save();c.fillStyle='rgba(6,8,14,.55)';rr(c,54,176,250,56,14);c.fill();c.strokeStyle='rgba(255,255,255,.12)';c.lineWidth=2;c.stroke();tx(c,'@เรื่องสงสัย',179,216,34,'#fff');c.restore()}
const cache={};function layer(key,w,h,fn){if(!cache[key]){const k=mk(w,h);fn(k.getContext('2d'),w,h);cache[key]=k}return cache[key]}
function seeded(n){return mulberry32(n)}

// ---------- lighting ----------
function flick(t,s=0){return .86+.09*noise(t*7,s)+.05*noise(t*19,s+5)}
function glow(c,x,y,r,col,a){c.save();c.globalCompositeOperation='lighter';c.globalAlpha=a;c.fillStyle=rg(c,x,y,0,r,[[0,col],[1,'rgba(0,0,0,0)']]);c.fillRect(x-r,y-r,2*r,2*r);c.restore()}
function darkness(c,a,holes,col='4,6,12'){const k=layer('dk',W,H,()=>{});const d=k.getContext('2d');d.globalCompositeOperation='source-over';d.clearRect(0,0,W,H);d.fillStyle='rgba('+col+','+a+')';d.fillRect(0,0,W,H);d.globalCompositeOperation='destination-out';for(const [x,y,r,s] of holes){d.fillStyle=rg(d,x,y,0,r,[[0,'rgba(0,0,0,'+s+')'],[.55,'rgba(0,0,0,'+s*.55+')'],[1,'rgba(0,0,0,0)']]);d.fillRect(x-r,y-r,2*r,2*r)}c.drawImage(k,0,0)}
function dust(c,t,n,x0,y0,w,h,col='255,220,170',seed=3){const R=seeded(seed);c.save();c.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const bx=R()*w,by=R()*h,sp=.2+R()*.6,ph=R()*6;const x=x0+(bx+Math.sin(t*sp+ph)*30+t*8*sp)%w,y=y0+(by-t*14*sp+h*10)%h;const a=(.25+.35*Math.sin(t*1.3+ph)**2)*(.4+R()*.6);c.fillStyle='rgba('+col+','+a.toFixed(3)+')';c.beginPath();c.arc(x,y,1+R()*2.2,0,7);c.fill()}c.restore()}
function candle(c,x,y,t,s=1,seed=0){const f=flick(t,seed);c.save();c.translate(x,y);c.scale(s,s);
 c.fillStyle=lg(c,-16,0,16,0,[[0,'#cdbb98'],[.5,'#f2e6c9'],[1,'#a8946f']]);rr(c,-16,0,32,110,6);c.fill();
 c.fillStyle='rgba(255,255,255,.25)';rr(c,-11,4,6,96,3);c.fill();c.strokeStyle='#2a2018';c.lineWidth=2.5;c.beginPath();c.moveTo(0,0);c.lineTo(0,-10);c.stroke();
 const sw=noise(t*3,seed+2)*4;c.translate(0,-12);c.fillStyle=rg(c,sw*.3,-14,1,26,[[0,'#fffbe8'],[.35,'#ffd27a'],[1,'rgba(255,120,20,0)']]);c.beginPath();c.moveTo(0,4);c.quadraticCurveTo(13*f,-6,sw,-38*f);c.quadraticCurveTo(-13*f,-6,0,4);c.fill();c.restore();
 glow(c,x,y-30*s,260*s*f,'rgba(255,170,80,.55)',.55)}

// ---------- face ----------
// o: {blink,look,warp,tone:'skin'|'pale'|'ghost'|'stranger'|'demon',smile,sweat,eyeGlow,mouthOpen}
function faceTo(c,o){const tone=o.tone||'skin';const sk={skin:['#e9b48f','#b9795a'],pale:['#d8d2cf','#8f8a8f'],ghost:['#cfe3ea','#6b8796'],stranger:['#c9a88f','#6f5040'],demon:['#3a1418','#120507']}[tone];
 c.save();// neck+shoulders
 c.fillStyle=lg(c,0,140,0,360,[[0,sk[1]],[1,'#1b1d27']]);c.beginPath();c.moveTo(-62,120);c.lineTo(62,120);c.lineTo(70,230);c.quadraticCurveTo(230,250,270,380);c.lineTo(-270,380);c.quadraticCurveTo(-230,250,-70,230);c.closePath();c.fill();
 c.fillStyle=tone==='demon'?'#07070a':lg(c,0,240,0,380,[[0,'#2a3148'],[1,'#151a28']]);c.beginPath();c.moveTo(-270,380);c.quadraticCurveTo(-230,262,-80,246);c.quadraticCurveTo(0,300,80,246);c.quadraticCurveTo(230,262,270,380);c.fill();
 // head
 c.fillStyle=rg(c,-30,-40,20,230,[[0,sk[0]],[.75,sk[0]],[1,sk[1]]]);c.beginPath();c.ellipse(0,0,150,190,0,0,7);c.fill();
 texFill(c,-160,-200,320,400,.08,'overlay',1.2);
 // ears
 c.fillStyle=sk[1];c.beginPath();c.ellipse(-148,10,22,38,.1,0,7);c.ellipse(148,10,22,38,-.1,0,7);c.fill();
 // hair
 if(tone!=='demon'){c.fillStyle=tone==='stranger'?'#5a4a3f':'#14121a';c.beginPath();c.moveTo(-158,30);c.quadraticCurveTo(-175,-170,0,-205);c.quadraticCurveTo(175,-170,158,30);c.quadraticCurveTo(140,-60,90,-110);c.quadraticCurveTo(10,-70,-60,-120);c.quadraticCurveTo(-140,-60,-158,30);c.fill();
  c.strokeStyle='rgba(255,255,255,.07)';c.lineWidth=3;for(let i=0;i<6;i++){c.beginPath();c.moveTo(-100+i*30,-160);c.quadraticCurveTo(-60+i*30,-120,-40+i*36,-100);c.stroke()}}
 else{c.fillStyle='#0a0406';c.beginPath();c.moveTo(-120,-120);c.lineTo(-170,-260);c.lineTo(-80,-160);c.moveTo(120,-120);c.lineTo(170,-260);c.lineTo(80,-160);c.fill()}
 // brows
 const br=o.brow||0;c.strokeStyle=tone==='stranger'?'#3a2d25':'#16131b';c.lineWidth=11;c.lineCap='round';c.beginPath();c.moveTo(-95,-55+br*6);c.quadraticCurveTo(-60,-72-br*4,-25,-58+br*10);c.moveTo(95,-55+br*6);c.quadraticCurveTo(60,-72-br*4,25,-58+br*10);c.stroke();
 // eyes
 const bl=clamp(o.blink||0),lk=o.look||0;for(const s of [-1,1]){const ex=s*60,ey=-10;c.save();c.beginPath();c.ellipse(ex,ey,34,20,0,0,7);c.clip();
  c.fillStyle=tone==='demon'?'#12030505':'#f4efe8';c.fillRect(ex-40,ey-30,80,60);
  if(tone==='demon'){c.fillStyle=rg(c,ex,ey,0,30,[[0,'#ffe2a0'],[.3,'#ff3a1a'],[1,'rgba(80,0,0,0)']]);c.fillRect(ex-40,ey-30,80,60)}
  else{c.fillStyle=tone==='ghost'?'#9fb8c2':'#3a2a22';c.beginPath();c.arc(ex+lk*12,ey,15,0,7);c.fill();c.fillStyle='#07070a';c.beginPath();c.arc(ex+lk*12,ey,7.5,0,7);c.fill();c.fillStyle='rgba(255,255,255,.9)';c.beginPath();c.arc(ex+lk*12+5,ey-6,4,0,7);c.fill()}
  // lid
  c.fillStyle=sk[0];c.fillRect(ex-40,ey-30,80,8+48*bl);c.fillStyle='rgba(0,0,0,.18)';c.fillRect(ex-40,ey-22+48*bl,80,6);c.restore();
  c.strokeStyle='rgba(20,10,10,.55)';c.lineWidth=3;c.beginPath();c.ellipse(ex,ey,34,20,0,Math.PI*1.05,Math.PI*1.95);c.stroke();
  if(o.eyeGlow){glow(c,ex,ey,60,'rgba(255,60,30,.9)',o.eyeGlow)}}
 // socket shading, cheeks, lower lids, lashes
 c.save();c.globalCompositeOperation='multiply';for(const s2 of [-1,1]){c.fillStyle=rg(c,s2*60,-18,8,70,[[0,'rgba(120,70,60,.35)'],[1,'rgba(255,255,255,0)']]);c.fillRect(s2*60-80,-90,160,150)}c.restore();
 if(tone==='skin'||tone==='stranger'){c.fillStyle='rgba(220,110,100,.16)';c.beginPath();c.ellipse(-82,52,36,22,0,0,7);c.ellipse(82,52,36,22,0,0,7);c.fill()}
 c.strokeStyle='rgba(90,50,40,.35)';c.lineWidth=2.5;for(const s2 of [-1,1]){c.beginPath();c.ellipse(s2*60,-6,32,18,0,.15,Math.PI-.15);c.stroke()}
 // nose
 c.strokeStyle='rgba(90,40,30,.45)';c.lineWidth=5;c.beginPath();c.moveTo(-6,10);c.quadraticCurveTo(-18,60,0,66);c.quadraticCurveTo(14,68,20,58);c.stroke();
 // mouth
 const sm=o.smile||0,mo=o.mouthOpen||0;c.fillStyle=tone==='demon'?'#000':'#6a2a2a';c.beginPath();c.moveTo(-48,112-sm*6);c.quadraticCurveTo(0,118+sm*26+mo*30,48,112-sm*6);c.quadraticCurveTo(0,120+sm*8,-48,112-sm*6);c.fill();
 if(tone==='demon'&&mo>0){c.fillStyle='#f0e6d0';for(let i=-4;i<=4;i++){c.beginPath();c.moveTo(i*10-4,114);c.lineTo(i*10,128+mo*8);c.lineTo(i*10+4,114);c.fill()}}
 // lip highlight + chin shadow + nasolabial
 if(tone!=='demon'){c.fillStyle='rgba(255,255,255,.12)';c.beginPath();c.ellipse(0,124+sm*14,18,4,0,0,7);c.fill();c.strokeStyle='rgba(110,60,50,.22)';c.lineWidth=3;c.beginPath();c.moveTo(-34,72);c.quadraticCurveTo(-52,96,-50,112);c.moveTo(34,72);c.quadraticCurveTo(52,96,50,112);c.stroke();c.fillStyle='rgba(80,40,40,.18)';c.beginPath();c.ellipse(0,165,60,14,0,0,7);c.fill()}
 // shading side + sweat
 c.globalCompositeOperation='multiply';c.fillStyle=lg(c,-150,0,150,0,[[0,'rgba(255,255,255,1)'],[.55,'rgba(255,255,255,1)'],[1,'rgba(40,50,90,.9)']]);c.beginPath();c.ellipse(0,0,151,191,0,0,7);c.fill();c.globalCompositeOperation='source-over';
 if(o.rim!==0&&tone!=='demon'){c.save();c.globalCompositeOperation='screen';c.strokeStyle=o.rimCol||'rgba(255,180,110,.55)';c.lineWidth=7;c.filter='blur(3px)';c.beginPath();c.ellipse(0,0,148,188,0,-1.2,1.0);c.stroke();c.restore()}
 if(o.sweat){const y=-30+((o.sweat*120)%140);c.fillStyle='rgba(200,230,255,.8)';c.beginPath();c.ellipse(118,y,7,11,0,0,7);c.fill()}
 c.restore()}
// face with optional warp (horizontal slice displacement)
function face(c,x,y,s,o,t=0){if(!o.warp){c.save();c.translate(x,y);c.scale(s,s);faceTo(c,o);c.restore();return}
 const k=layer('fw',700,900,()=>{}),d=k.getContext('2d');d.setTransform(1,0,0,1,0,0);d.clearRect(0,0,700,900);d.translate(350,380);faceTo(d,o);d.setTransform(1,0,0,1,0,0);
 const n=60,sh=900/n;for(let i=0;i<n;i++){const dx=Math.sin(i*.35+t*3)*o.warp*40+noise(i*.4+t*2,9)*o.warp*25;const sy=1+o.warp*.25*Math.sin(i*.2-t*2);c.drawImage(k,0,i*sh,700,sh,x-350*s+dx*s,y-380*s+i*sh*s*sy-(sy-1)*450*s,700*s,sh*s+1)}}

// ---------- mirror ----------
function mirrorFrame(c,x,y,w,h,style='oval'){c.save();c.translate(x,y);
 const g=lg(c,-w/2,-h/2,w/2,h/2,[[0,'#f3cf7a'],[.3,'#8d5e22'],[.55,'#e4b25c'],[.8,'#6b4416'],[1,'#c99440']]);
 c.shadowColor='rgba(0,0,0,.6)';c.shadowBlur=40;c.shadowOffsetY=20;c.fillStyle=g;
 if(style==='oval'){c.beginPath();c.ellipse(0,0,w/2+34,h/2+34,0,0,7);c.fill();c.shadowColor='transparent';
  c.strokeStyle='rgba(255,240,200,.5)';c.lineWidth=3;c.beginPath();c.ellipse(0,0,w/2+26,h/2+26,0,0,7);c.stroke();c.strokeStyle='rgba(50,30,10,.7)';c.lineWidth=5;c.beginPath();c.ellipse(0,0,w/2+4,h/2+4,0,0,7);c.stroke();
  for(let i=0;i<24;i++){const a=i/24*Math.PI*2;c.fillStyle=i%2?'#f6d891':'#7a4e1a';c.beginPath();c.arc(Math.cos(a)*(w/2+17),Math.sin(a)*(h/2+17),5,0,7);c.fill()}
  c.fillStyle=g;c.beginPath();c.moveTo(-50,-h/2-30);c.quadraticCurveTo(0,-h/2-110,50,-h/2-30);c.fill();glow(c,0,-h/2-60,40,'rgba(255,220,150,.3)',.4)}
 else{rr(c,-w/2-30,-h/2-30,w+60,h+60,10);c.fill();c.shadowColor='transparent';c.strokeStyle='rgba(255,240,200,.45)';c.lineWidth=3;rr(c,-w/2-22,-h/2-22,w+44,h+44,8);c.stroke()}
 texFill(c,-w/2-40,-h/2-120,w+80,h+160,.12,'overlay');c.restore()}
function mirrorGlass(c,x,y,w,h,style,t,content,o={}){c.save();c.translate(x,y);c.beginPath();if(style==='oval')c.ellipse(0,0,w/2,h/2,0,0,7);else c.rect(-w/2,-h/2,w,h);c.clip();
 c.fillStyle=lg(c,0,-h/2,0,h/2,[[0,o.g0||'#2b3446'],[1,o.g1||'#0d111a']]);c.fillRect(-w/2,-h/2,w,h);
 if(content){c.save();content(c,t);c.restore()}
 // glass: tint, sheen, edge darkening, dust
 c.globalCompositeOperation='soft-light';c.fillStyle='rgba(140,190,210,.35)';c.fillRect(-w/2,-h/2,w,h);c.globalCompositeOperation='source-over';
 c.fillStyle=rg(c,0,0,Math.min(w,h)*.3,Math.max(w,h)*.62,[[0,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.65)']]);c.fillRect(-w/2,-h/2,w,h);
 const sx=((t*20)%(w*2))-w;c.save();c.globalCompositeOperation='lighter';c.rotate(-.5);c.fillStyle=lg(c,sx-120,0,sx+120,0,[[0,'rgba(255,255,255,0)'],[.5,'rgba(220,240,255,.10)'],[1,'rgba(255,255,255,0)']]);c.fillRect(sx-120,-h,240,h*2);c.fillStyle='rgba(220,240,255,.05)';c.fillRect(sx+160,-h,40,h*2);c.restore();
 texFill(c,-w/2,-h/2,w,h,.06,'screen',.8);
 if(o.crack)cracks(c,o.crack,w,h,o.crackSeed||5);
 if(o.fog){c.fillStyle='rgba(200,215,230,'+o.fog*.35+')';c.fillRect(-w/2,-h/2,w,h)}
 c.restore()}
function cracks(c,p,w,h,seed){const R=seeded(seed);c.save();c.strokeStyle='rgba(230,245,255,.85)';c.lineCap='round';const cx=(R()-.5)*w*.2,cy=(R()-.5)*h*.2;
 for(let i=0;i<14;i++){const a=i/14*7+R()*.4;let x=cx,y=cy,len=(.3+R()*.5)*Math.max(w,h)*.6*p;c.lineWidth=2.6;c.beginPath();c.moveTo(x,y);const st=7;for(let k=0;k<st;k++){x+=Math.cos(a+(R()-.5)*.6)*len/st;y+=Math.sin(a+(R()-.5)*.6)*len/st;c.lineTo(x,y)}c.stroke()}
 c.lineWidth=1.4;for(let r=1;r<4;r++){c.beginPath();for(let i=0;i<=14;i++){const a=i/14*7,rr2=r*40*p*(1+R()*.3);(i?c.lineTo:c.moveTo).call(c,cx+Math.cos(a)*rr2,cy+Math.sin(a)*rr2)}c.stroke()}
 c.fillStyle='rgba(255,255,255,.9)';c.beginPath();c.arc(cx,cy,6*p,0,7);c.fill();c.restore()}

// ---------- rooms (cached) ----------
function wallpaper(d,w,h,c1,c2,motif){d.fillStyle=lg(d,0,0,0,h,[[0,c1],[1,c2]]);d.fillRect(0,0,w,h);d.globalAlpha=.10;d.strokeStyle='#fff';d.lineWidth=2;
 for(let x=0;x<w;x+=90)for(let y=0;y<h;y+=120){const ox=(y/120)%2?45:0;d.beginPath();d.moveTo(x+ox,y);d.quadraticCurveTo(x+ox+20,y+30,x+ox,y+60);d.quadraticCurveTo(x+ox-20,y+30,x+ox,y);d.stroke();if(motif){d.beginPath();d.arc(x+ox,y+90,6,0,7);d.stroke()}}
 d.globalAlpha=1;texFill(d,0,0,w,h,.22,'overlay',1.5);d.fillStyle=lg(d,0,0,w,0,[[0,'rgba(0,0,0,.35)'],[.5,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.35)']]);d.fillRect(0,0,w,h)}
function roomVictorian(){return layer('vic',1400,1920,(d,w,h)=>{wallpaper(d,w,1350,'#3c2b22','#1c130e',1);
 d.fillStyle=lg(d,0,1320,0,1360,[[0,'#5a3a22'],[1,'#2a170c']]);d.fillRect(0,1310,w,50);
 d.fillStyle=lg(d,0,1350,0,h,[[0,'#2a1a10'],[1,'#0e0805']]);d.fillRect(0,1350,w,h-1350);for(let x=-200;x<w;x+=140){d.strokeStyle='rgba(0,0,0,.35)';d.lineWidth=3;d.beginPath();d.moveTo(x,1350);d.lineTo(x-300,h);d.stroke()}texFill(d,0,1350,w,h-1350,.25,'overlay',2);
 // window w/ moon
 d.fillStyle='#0b1220';rr(d,940,260,300,520,8);d.fill();d.fillStyle=rg(d,1090,420,10,140,[[0,'#f6efd6'],[.25,'#c8cdd8'],[1,'rgba(20,30,50,0)']]);d.fillRect(940,260,300,520);
 d.strokeStyle='#2a1a10';d.lineWidth=14;rr(d,940,260,300,520,8);d.stroke();d.beginPath();d.moveTo(1090,260);d.lineTo(1090,780);d.moveTo(940,520);d.lineTo(1240,520);d.stroke();
 d.fillStyle=lg(d,900,0,1000,0,[[0,'#4a1016'],[1,'#2a080b']]);d.fillRect(880,220,90,640);d.fillRect(1210,220,90,640);
 // bed with covered body
 d.fillStyle='#24140c';rr(d,60,1100,620,60,10);d.fill();d.fillStyle=lg(d,0,980,0,1120,[[0,'#d9d2c4'],[1,'#8e877b']]);d.beginPath();d.moveTo(70,1110);d.quadraticCurveTo(120,990,300,1010);d.quadraticCurveTo(420,960,520,1010);d.quadraticCurveTo(640,1000,670,1110);d.fill();texFill(d,60,960,620,160,.15,'overlay');
 d.fillStyle='#1a0e08';rr(d,40,880,40,300,6);d.fill();rr(d,660,940,36,240,6);d.fill()})}
function roomThai(){return layer('thai',1500,1920,(d,w,h)=>{d.fillStyle=lg(d,0,0,0,1300,[[0,'#2c3a52'],[1,'#151d2e']]);d.fillRect(0,0,w,1300);texFill(d,0,0,w,1300,.18,'overlay',1.4);
 d.fillStyle='#3b2a1e';d.fillRect(0,1260,w,30);d.fillStyle=lg(d,0,1290,0,h,[[0,'#4a3424'],[1,'#1a110b']]);d.fillRect(0,1290,w,h-1290);for(let y=1290;y<h;y+=46){d.fillStyle='rgba(0,0,0,.25)';d.fillRect(0,y,w,3)}texFill(d,0,1290,w,h-1290,.22,'overlay',2);
 // bed
 d.fillStyle='#2a1c14';rr(d,80,980,700,120,12);d.fill();d.fillStyle=lg(d,0,900,0,1000,[[0,'#cfd8e6'],[1,'#7d8aa0']]);rr(d,90,900,680,110,30);d.fill();d.fillStyle='#e9eef6';rr(d,110,860,180,70,30);d.fill();
 d.fillStyle=lg(d,0,880,0,1000,[[0,'#6f86b3'],[1,'#36466b']]);d.beginPath();d.moveTo(300,890);d.quadraticCurveTo(540,860,770,900);d.lineTo(770,1010);d.lineTo(300,1010);d.fill();texFill(d,90,860,700,160,.15,'overlay');
 d.fillStyle='#2a1c14';rr(d,60,700,40,420,8);d.fill();
 // dresser + mirror
 d.fillStyle=lg(d,1000,0,1400,0,[[0,'#4a3222'],[1,'#2a1a10']]);rr(d,1020,1000,380,260,10);d.fill();d.strokeStyle='rgba(0,0,0,.4)';d.lineWidth=3;for(let i=0;i<3;i++){rr(d,1040,1020+i*80,340,64,6);d.stroke();d.fillStyle='#c99440';d.beginPath();d.arc(1210,1052+i*80,6,0,7);d.fill()}
 // window
 d.fillStyle='#0a1222';rr(d,420,240,360,460,8);d.fill();d.fillStyle=rg(d,640,380,10,160,[[0,'#eef2ff'],[.2,'#9fb0d0'],[1,'rgba(10,20,40,0)']]);d.fillRect(420,240,360,460);d.strokeStyle='#1d2638';d.lineWidth=12;rr(d,420,240,360,460,8);d.stroke();d.beginPath();d.moveTo(600,240);d.lineTo(600,700);d.stroke()})}
function roomLab(){return layer('lab',1300,1920,(d,w,h)=>{d.fillStyle=lg(d,0,0,0,h,[[0,'#1c1f26'],[1,'#0a0b0f']]);d.fillRect(0,0,w,h);texFill(d,0,0,w,h,.2,'overlay',1.6);
 for(let x=0;x<w;x+=160){d.fillStyle='rgba(255,255,255,.025)';d.fillRect(x,0,4,1200)}d.fillStyle='#14161b';d.fillRect(0,1200,w,h-1200);texFill(d,0,1200,w,h-1200,.2,'overlay',2)})}

// ---------- characters ----------
function sitter(c,x,y,s,t,o={}){// seen from behind, sitting on stool
 c.save();c.translate(x,y);c.scale(s,s);const br=Math.sin(t*1.6)*3;
 shadow(c,0,330,360,50,.6,18);c.fillStyle='#1a1410';rr(c,-90,200,180,24,6);c.fill();c.fillRect(-80,224,14,110);c.fillRect(66,224,14,110);
 c.fillStyle=lg(c,0,-60,0,220,[[0,'#2a3142'],[1,'#141823']]);c.beginPath();c.moveTo(-120,210);c.quadraticCurveTo(-150,40-br,-70,-10-br);c.lineTo(70,-10-br);c.quadraticCurveTo(150,40-br,120,210);c.fill();
 c.fillStyle='#1b1820';c.beginPath();c.ellipse(0,-80-br,78,92,0,0,7);c.fill();c.fillStyle='rgba(255,180,110,.12)';c.beginPath();c.ellipse(40,-80-br,40,80,0,0,7);c.fill();
 c.restore()}
function sleeper(c,x,y,s,t){c.save();c.translate(x,y);c.scale(s,s);const br=Math.sin(t*1.2)*4;c.fillStyle='#e4b28f';c.beginPath();c.ellipse(0,0,60,70,-1.3,0,7);c.fill();c.fillStyle='#16131b';c.beginPath();c.ellipse(-20,-10,62,58,-1.3,3.4,6.4);c.fill();
 c.strokeStyle='#5a3326';c.lineWidth=4;c.beginPath();c.moveTo(18,4);c.quadraticCurveTo(28,12,36,4);c.stroke();c.fillStyle=lg(c,0,30,0,120,[[0,'#7b93c0'],[1,'#3c4d74']]);c.beginPath();c.moveTo(60,20-br);c.quadraticCurveTo(300,-20-br,560,30);c.lineTo(560,110);c.lineTo(40,110);c.fill();c.restore()}
function wisp(c,pts,t,p,col='190,230,255'){// soul ribbon along path, progress p
 c.save();c.globalCompositeOperation='lighter';const n=40;for(let i=0;i<n;i++){const u=i/n*p;const seg=u*(pts.length-1),k=Math.min(pts.length-2,Math.floor(seg)),f=seg-k;const x=lerp(pts[k][0],pts[k+1][0],f)+Math.sin(t*3+i*.5)*14,y=lerp(pts[k][1],pts[k+1][1],f)+Math.cos(t*2.4+i*.4)*14;const a=(i/n)*.5;c.fillStyle=rg(c,x,y,0,40,[[0,'rgba('+col+','+a+')'],[1,'rgba('+col+',0)']]);c.fillRect(x-40,y-40,80,80)}c.restore()}
function ghostHands(c,t,a){c.save();c.globalAlpha=a;for(const s of [-1,1]){c.save();c.translate(s*120,40+Math.sin(t*2+s)*6);c.rotate(s*.15);c.fillStyle='rgba(200,225,235,.55)';c.beginPath();c.ellipse(0,0,46,60,0,0,7);c.fill();for(let f=-2;f<=2;f++){c.beginPath();c.ellipse(f*17,-62-Math.abs(f)*-6,8,30-Math.abs(f)*3,f*.12,0,7);c.fill()}c.restore()}c.restore()}

// ---------- shot helpers ----------
function title(c,s,x,y,fs,col,a=1,bg){c.save();c.globalAlpha=a;if(bg){c.font='800 '+fs+'px '+HF;const w=c.measureText(s).width;c.fillStyle=bg;rr(c,x-w/2-24,y-fs*.95,w+48,fs*1.35,14);c.fill()}tx(c,s,x,y,fs,col);c.restore()}
function chip(c,s,x,y,t0,t,col=P.gold,fs=40){const p=eo((t-t0)/.35);if(p<=0)return;c.save();c.globalAlpha=p;c.translate(x,y+(1-p)*20);c.font='800 '+fs+'px '+HF;const w=c.measureText(s).width;c.fillStyle='rgba(8,8,14,.72)';rr(c,-w/2-26,-fs,w+52,fs*1.45,16);c.fill();c.strokeStyle=col;c.lineWidth=3;c.stroke();tx(c,s,0,0,fs,col);c.restore()}
function bigNum(c,s,x,y,t0,t,col='#fff',fs=230){const p=eo((t-t0)/.5);if(p<=0)return;c.save();c.globalAlpha=p;c.translate(x,y);c.scale(.85+.15*p,.85+.15*p);c.font='800 '+fs+'px '+HF;c.textAlign='center';c.lineWidth=16;c.strokeStyle='rgba(0,0,0,.6)';c.strokeText(s,0,0);c.fillStyle=col;c.fillText(s,0,0);c.restore()}
