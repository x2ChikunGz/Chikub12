// ===== demo v2 (15s): "บ้านไม้หลังนั้น" — film pass, DOF everywhere, Thai setting, medium/close shots =====
const DUR=15;const T1=[0,3.6],T2=[3.6,7.2],T3=[7.2,10.4],T4=[10.4,13.3],T5=[13.3,15];
const ez=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;const sm2=t=>{t=clamp(t);return t*t*(3-2*t)};
function rainA(c,t,n,seed,ang=.17,len=56,a=.4,area=[0,0,W,H],spd=1900,col='#c8d2ff'){const R=mulberry32(seed);c.save();c.strokeStyle=col;c.lineCap='round';for(let i=0;i<n;i++){const x0=area[0]+R()*area[2],y0=R()*(area[3]+300),sp=spd*(.8+R()*.4),l=len*(.6+R()*.8);const y=area[1]+((y0+t*sp)%(area[3]+300))-150,x=x0-Math.tan(ang)*(y-area[1]);c.globalAlpha=a*(.3+R()*.7);c.lineWidth=1+R()*1.4;c.beginPath();c.moveTo(x,y);c.lineTo(x-Math.sin(ang)*l,y+Math.cos(ang)*l);c.stroke()}c.restore()}
function streak(c,x,y,len,col,a){c.save();c.globalCompositeOperation='screen';c.globalAlpha=a;c.fillStyle=lg(c,x-len,0,x+len,0,[[0,'rgba(0,0,0,0)'],[.5,col],[1,'rgba(0,0,0,0)']]);c.fillRect(x-len,y-2,len*2,4);c.globalAlpha=a*.4;c.fillRect(x-len*.6,y-7,len*1.2,14);c.restore()}
// material: wood planks with grain + knots (vertical or horizontal)
function planks(d,x,y,w,h,vert,c0,c1,seed,pw=64){const R=mulberry32(seed);d.save();d.beginPath();d.rect(x,y,w,h);d.clip();const N=Math.ceil((vert?w:h)/pw)+1;
 for(let i=0;i<N;i++){const p=(vert?x:y)+i*pw;d.fillStyle=lg(d,vert?p:0,vert?0:p,vert?p+pw:0,vert?0:p+pw,[[0,c0],[.5,c1],[1,c0]]);vert?d.fillRect(p,y,pw-3,h):d.fillRect(x,p,w,pw-3);
  d.strokeStyle='rgba(0,0,0,.18)';d.lineWidth=1.2;for(let g=0;g<5;g++){const o=p+6+R()*(pw-14);d.beginPath();if(vert){d.moveTo(o,y);for(let k=0;k<=8;k++)d.lineTo(o+Math.sin(k*1.3+R()*2)*3,y+k*h/8)}else{d.moveTo(x,o);for(let k=0;k<=8;k++)d.lineTo(x+k*w/8,o+Math.sin(k*1.3+R()*2)*3)}d.stroke()}
  if(R()<.5){const kx=vert?p+pw/2:x+R()*w,ky=vert?y+R()*h:p+pw/2;d.fillStyle='rgba(0,0,0,.22)';d.beginPath();d.ellipse(kx,ky,vert?6:12,vert?12:6,0,0,7);d.fill()}
  d.fillStyle='rgba(0,0,0,.45)';vert?d.fillRect(p+pw-3,y,3,h):d.fillRect(x,p+pw-3,w,3)}d.restore()}
function zinc(d,x,y,w,h,col,seed){d.fillStyle=col;d.fillRect(x,y,w,h);for(let i=0;i<w;i+=14){d.fillStyle='rgba(255,255,255,.05)';d.fillRect(x+i,y,5,h);d.fillStyle='rgba(0,0,0,.16)';d.fillRect(x+i+7,y,4,h)}const R=mulberry32(seed);for(let i=0;i<18;i++){d.fillStyle='rgba(120,60,30,'+(.12+R()*.15)+')';d.fillRect(x+R()*w,y+R()*h*.6,6+R()*30,h*.4*R())}}
function banana(d,x,y,s,col,rim,seed){const R=mulberry32(seed);d.save();d.translate(x,y);d.scale(s,s);d.strokeStyle=col;d.lineWidth=14;d.beginPath();d.moveTo(0,0);d.quadraticCurveTo(6,-180,0,-330);d.stroke();
 for(let i=0;i<7;i++){const a=-1.6+(i-3)*.42+(R()-.5)*.2,L=200+R()*90;d.save();d.translate(0,-320+i*6);d.rotate(a+Math.PI/2);d.fillStyle=col;d.beginPath();d.moveTo(0,0);d.quadraticCurveTo(L*.5,-46,L,-6);d.quadraticCurveTo(L*.55,26,0,6);d.fill();d.strokeStyle=rim;d.lineWidth=2;d.beginPath();d.moveTo(0,0);d.quadraticCurveTo(L*.5,-46,L,-6);d.stroke();
  d.strokeStyle='rgba(0,0,0,.35)';for(let k=1;k<6;k++){d.beginPath();d.moveTo(k*L/6,-k*2);d.lineTo(k*L/6+8,-30+k*3);d.stroke()}d.restore()}d.restore()}
function palm(d,x,y,s,col,rim,seed){const R=mulberry32(seed);d.save();d.translate(x,y);d.scale(s,s);d.strokeStyle=col;d.lineWidth=16;d.beginPath();d.moveTo(0,0);d.quadraticCurveTo(-40,-300,30,-620);d.stroke();d.translate(30,-620);
 for(let i=0;i<9;i++){const a=i/9*Math.PI*2+R()*.3;d.save();d.rotate(a);d.strokeStyle=col;d.lineWidth=8;d.beginPath();d.moveTo(0,0);d.quadraticCurveTo(110,-30,220,40);d.stroke();d.lineWidth=3;for(let k=1;k<12;k++){const px=k*18,py=-12+k*4;d.beginPath();d.moveTo(px,py);d.lineTo(px+10,py+30);d.stroke()}d.restore()}d.restore()}
// Thai stilt wooden house (x centre, y ground)
function stiltHouse(d,x,y,s,o={}){d.save();d.translate(x,y);d.scale(s,s);
 // posts + under-house darkness
 d.fillStyle='#0c0d1c';d.fillRect(-300,-260,600,260);for(const px of [-290,-150,-10,130,270]){d.fillStyle='#1d1a26';d.fillRect(px,-270,22,270)}
 // body: vertical planks
 planks(d,-320,-640,640,380,true,'#2a2236','#352a42',7,48);
 // windows: wooden shutters, one open & lit
 const win2=(wx,lit)=>{d.fillStyle=lit?lg(d,0,-560,0,-420,[[0,'#ffd99a'],[1,'#e8963e']]):'#0d0d1a';d.fillRect(wx,-560,110,140);if(lit){d.fillStyle='rgba(40,20,10,.55)';d.fillRect(wx+60,-540,30,120)}
  d.fillStyle='#231b2c';d.fillRect(wx-52,-560,50,140);d.fillRect(wx+112,-560,50,140);d.strokeStyle='#120e18';d.lineWidth=6;d.strokeRect(wx,-560,110,140)};
 win2(-250,o.lit1);win2(70,o.lit2);
 // gable roof with zinc
 d.save();d.beginPath();d.moveTo(-380,-630);d.lineTo(0,-900);d.lineTo(380,-630);d.closePath();d.clip();zinc(d,-380,-900,760,280,'#1a1830',9);d.restore();
 d.strokeStyle='#2e2a40';d.lineWidth=10;d.beginPath();d.moveTo(-390,-624);d.lineTo(0,-906);d.lineTo(390,-624);d.stroke();d.strokeStyle='rgba(170,180,240,.5)';d.lineWidth=3;d.beginPath();d.moveTo(-390,-628);d.lineTo(0,-910);d.lineTo(390,-628);d.stroke();
 // stairs on the right
 d.fillStyle='#231b28';for(let i=0;i<8;i++)d.fillRect(320+i*28,-260+i*33,80,10);d.strokeStyle='#1a1420';d.lineWidth=8;d.beginPath();d.moveTo(320,-270);d.lineTo(560,0);d.stroke();
 d.restore();if(o.lit1)bloom(d,x+(-195)*s,y-490*s,80*s,'rgba(255,190,100,.9)',.55);if(o.lit2)bloom(d,x+125*s,y-490*s,80*s,'rgba(255,190,100,.9)',.55)}
// spirit house (ศาลพระภูมิ) — the red accent
function spiritHouse(d,x,y,s,t){d.save();d.translate(x,y);d.scale(s,s);d.fillStyle='#2a2230';d.fillRect(-14,-260,28,260);d.fillStyle='#3a2e3e';d.fillRect(-90,-300,180,40);
 d.fillStyle='#4a3a48';d.fillRect(-70,-420,140,120);d.fillStyle='#2a1a22';d.fillRect(-26,-390,52,90);d.fillStyle='#8a2830';d.beginPath();d.moveTo(-100,-415);d.lineTo(0,-520);d.lineTo(100,-415);d.fill();d.fillStyle='#c8a050';d.beginPath();d.moveTo(-8,-520);d.quadraticCurveTo(0,-570,14,-560);d.lineTo(6,-515);d.fill();
 for(let i=0;i<5;i++){d.fillStyle=['#e8c040','#f0f0e0','#d84050'][i%3];d.beginPath();d.arc(-70+i*35,-296,9,0,7);d.fill()}d.restore();
 const f=.85+.15*Math.sin(t*9)+.05*Math.sin(t*23);bloom(d,x,y-330*s,40*s,'rgba(255,60,50,1)',.7*f);d.fillStyle='#ffb0a0';d.beginPath();d.arc(x,y-330*s,4*s,0,7);d.fill()}
// 3/4 face close-up (matte, no outline): o {look, blink, wide, mouth, light:'tv'|'warm', hairLong}
function face34(c,x,y,s,o,t){c.save();c.translate(x,y);c.scale(s,s);const SK='#d9a184',SKL='#f0c4a6',SKD='#9a6a58';
 // hair back
 c.fillStyle='#120e16';c.beginPath();c.moveTo(-150,-40);c.quadraticCurveTo(-170,-230,10,-240);c.quadraticCurveTo(170,-235,160,-40);c.lineTo(170,300);c.lineTo(-170,300);c.closePath();c.fill();
 // neck + shoulder
 c.fillStyle=SKD;c.fillRect(-46,120,92,140);c.fillStyle='#5a3a4a';c.beginPath();c.moveTo(-320,420);c.quadraticCurveTo(-260,240,-60,230);c.lineTo(60,230);c.quadraticCurveTo(260,240,320,420);c.fill();
 // face (3/4 to the right): shading two-tone
 c.fillStyle=lg(c,-120,0,130,0,[[0,SKD],[.35,SK],[1,SKL]]);c.beginPath();c.moveTo(-110,-120);c.quadraticCurveTo(-130,40,-60,150);c.quadraticCurveTo(10,205,80,150);c.quadraticCurveTo(140,90,130,-40);c.quadraticCurveTo(110,-180,0,-190);c.quadraticCurveTo(-90,-185,-110,-120);c.fill();
 c.fillStyle=SKD;c.beginPath();c.ellipse(-112,10,16,32,0,0,7);c.fill();// ear
 // bangs
 c.fillStyle='#120e16';c.beginPath();c.moveTo(-125,-60);c.quadraticCurveTo(-120,-200,10,-200);c.quadraticCurveTo(140,-195,140,-70);c.quadraticCurveTo(80,-120,30,-110);c.quadraticCurveTo(-40,-130,-125,-60);c.fill();
 // brows + eyes
 const wd=o.wide||0,bl=o.blink||0,lk=o.look||0;c.strokeStyle='#1a1418';c.lineWidth=7;c.lineCap='round';c.beginPath();c.moveTo(-52,-62-wd*12);c.quadraticCurveTo(-30,-70-wd*14,-8,-62-wd*10);c.moveTo(44,-64-wd*12);c.quadraticCurveTo(70,-72-wd*14,96,-62-wd*10);c.stroke();
 for(const [ex,sc] of [[-28,.85],[70,1]]){c.save();c.translate(ex,-20);c.scale(sc,1);c.beginPath();c.ellipse(0,0,22,(12+wd*7)*(1-bl)+.5,0,0,7);c.save();c.clip();c.fillStyle='#f3eee8';c.fillRect(-30,-30,60,60);c.fillStyle='#1a1214';c.beginPath();c.arc(lk*8,0,9-wd*2.5,0,7);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(lk*8+3,-4,2.5,0,7);c.fill();c.restore();c.strokeStyle='#1a1214';c.lineWidth=3;c.beginPath();c.ellipse(0,0,22,(12+wd*7)*(1-bl)+.5,0,Math.PI,0);c.stroke();c.restore()}
 // modelling: jaw & cheek shadow, under-eye
 c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(150,100,110,.35)';c.beginPath();c.moveTo(-110,-40);c.quadraticCurveTo(-120,70,-60,150);c.quadraticCurveTo(-20,175,10,182);c.quadraticCurveTo(-60,120,-70,10);c.closePath();c.fill();c.restore();
 c.strokeStyle='rgba(120,70,70,.25)';c.lineWidth=3;for(const ex of [-28,70]){c.beginPath();c.arc(ex,-14,24,.3,Math.PI-.3);c.stroke()}
 // nose, blush, mouth
 c.strokeStyle='rgba(120,60,50,.55)';c.lineWidth=4;c.beginPath();c.moveTo(30,0);c.quadraticCurveTo(46,40,30,52);c.stroke();c.fillStyle='rgba(220,110,110,.22)';c.beginPath();c.ellipse(-40,40,24,12,0,0,7);c.ellipse(90,40,22,12,0,0,7);c.fill();
 c.fillStyle='#5a2630';c.beginPath();c.ellipse(32,100,22*(1-.2*(o.mouth||0)),4+(o.mouth||0)*14,0,0,7);c.fill();c.fillStyle='rgba(255,255,255,.18)';c.beginPath();c.ellipse(36,118,12,3,0,0,7);c.fill();
 // hair sheen + strands + cool rim so the head separates from the dark
 c.strokeStyle='rgba(160,170,230,.35)';c.lineWidth=5;for(let i=0;i<6;i++){c.beginPath();c.moveTo(-90+i*30,-200+Math.abs(i-2.5)*6);c.quadraticCurveTo(-60+i*30,-150,-110+i*36,-70);c.stroke()}
 c.save();c.globalCompositeOperation='screen';c.strokeStyle='rgba(150,175,255,.8)';c.lineWidth=9;c.filter='blur(4px)';c.beginPath();c.moveTo(-160,280);c.quadraticCurveTo(-180,-50,-140,-150);c.quadraticCurveTo(-60,-250,40,-240);c.stroke();c.restore();
 c.restore()}
// close-up hand (pushing): x,y wrist, angle
function hand(c,x,y,s,ang){c.save();c.translate(x,y);c.rotate(ang);c.scale(s,s);c.fillStyle='#4a3a58';c.fillRect(-300,-34,300,68);c.fillStyle='#d9a184';rr(c,-10,-38,90,76,30);c.fill();
 for(let i=0;i<4;i++){c.fillStyle=i%2?'#d29a7e':'#dca689';rr(c,70,-34+i*18,74-Math.abs(i-1.5)*8,16,8);c.fill()}c.fillStyle='#c99276';rr(c,30,-56,60,20,10);c.fill();c.fillStyle='rgba(0,0,0,.12)';c.fillRect(-10,14,150,24);c.restore()}
function tvStatic(c,x,y,w,h,t,seed){const k=layer('tvn',160,120,()=>{}),d=k.getContext('2d');const im=d.createImageData(160,120),R=mulberry32(Math.floor(t*30)*31+seed);for(let i=0;i<160*120;i++){const v=R()*255;im.data[i*4]=v*.85;im.data[i*4+1]=v*.9;im.data[i*4+2]=v;im.data[i*4+3]=255}d.putImageData(im,0,0);c.save();c.imageSmoothingEnabled=false;c.drawImage(k,x,y,w,h);c.restore()}

// ===== SHOT 1: establishing — Thai stilt house in rain, spirit house (fg, blurred), lightning + delayed thunder =====
function L1bg(){return layer('d2_1bg',W,H,(d)=>{d.fillStyle=lg(d,0,0,0,1300,[[0,'#0a0c26'],[.65,'#1c2052'],[1,'#33306a']]);d.fillRect(0,0,W,H);stars(d,40,3,[0,0,W,420]);
 cloud(d,-60,320,640,0,'#232a5c',K.cloudRim,11);cloud(d,520,230,640,0,'#1e2456',K.cloudRim,12);haze(d,250,520,'#1c2152',.55);
 for(const [x,s,sd] of [[60,1.1,1],[930,1.2,2],[1040,.9,3]])palm(d,x,1250,s,'#121433','rgba(110,110,200,.4)',sd);
 d.fillStyle='#161838';d.fillRect(0,1150,W,200);haze(d,1060,1260,'#4a4a8a',.4)})}
function L1mid(){return layer('d2_1mid',W,H,(d)=>{d.fillStyle=lg(d,0,1250,0,1500,[[0,'#14163a'],[1,'#0e0f28']]);d.fillRect(0,1250,W,300);
 banana(d,130,1290,1.05,'#0f1230','rgba(120,120,210,.5)',21);banana(d,980,1300,1.1,'#0f1230','rgba(120,120,210,.5)',22);
 stiltHouse(d,560,1300,.95,{lit1:1});banana(d,800,1320,.75,'#0c0e28','rgba(120,120,210,.45)',23);
 for(let i=0;i<40;i++){const R=mulberry32(300+i);d.fillStyle='rgba(255,255,255,.04)';d.fillRect(R()*W,1300+R()*240,30+R()*60,3)}})}
function L1fg(){return layer('d2_1fg',W,H,(d)=>{d.fillStyle='#06070f';d.beginPath();d.moveTo(0,1560);d.quadraticCurveTo(520,1500,1080,1580);d.lineTo(1080,1920);d.lineTo(0,1920);d.fill();grassBlades(d,1460,1700,120,'#06070f',5,.5)})}
function d2s1(c,t){const p=clamp((t-T1[0])/(T1[1]-T1[0])),e=ez(p),z=1.04+.1*e;const flash=Math.max(0,1-Math.abs(t-2.3)/.08)+.55*Math.max(0,1-Math.abs(t-2.48)/.05);
 const L=(img,depth,blur)=>{c.save();camL(c,z*(1+depth*.06*e),540,960-30*depth*e);if(blur)c.filter='blur('+blur+'px)';c.drawImage(img,0,0);c.restore()};
 L(L1bg(),.1,1.5);if(flash>0){c.save();camL(c,z,540,960);bolt(c,300,160,560,7);c.restore();c.save();c.globalCompositeOperation='screen';c.globalAlpha=flash*.5;c.fillStyle='#b8c4ff';c.fillRect(0,0,W,1350);c.restore()}
 L(L1mid(),.35,0);rainA(c,t,300,9,.15,50,.3);
 // spirit house: foreground, out of focus (DOF), red flame
 c.save();camL(c,z*(1+.9*.06*e),540,960);const k=layer('d2_1sp',W,H,()=>{}),q=k.getContext('2d');q.setTransform(1,0,0,1,0,0);q.clearRect(0,0,W,H);spiritHouse(q,190,1880,1.45,t);c.filter='blur(7px)';c.drawImage(k,0,0);c.restore();
 L(L1fg(),1.1,4);rainA(c,t*1.2,70,10,.15,90,.45,[0,0,W,H],2600);
 if(flash>0)c.save(),c.globalCompositeOperation='screen',c.globalAlpha=flash*.22,c.fillStyle='#8c96e0',c.fillRect(0,0,W,H),c.restore(),streak(c,300,420,520,'rgba(190,200,255,1)',flash*.8);
 return {tint:'rgba(40,36,120,.2)',flash}}

// ===== SHOT 2: medium tracking — she walks the veranda, rain curtain from the eaves, swinging bulb =====
const G2=2140,WW2=3600;
function L2bg(){return layer('d2_2bg',WW2,H,(d)=>{d.fillStyle='#0c0d22';d.fillRect(0,0,WW2,H);planks(d,0,300,WW2,1600,true,'#2a2236','#352a42',31,56);
 for(let i=0;i<5;i++){const x=300+i*700;d.fillStyle='#0d0d1a';d.fillRect(x,620,220,300);d.fillStyle='#231b2c';d.fillRect(x-70,620,66,300);d.fillRect(x+224,620,66,300);d.strokeStyle='#120e18';d.lineWidth=8;d.strokeRect(x,620,220,300)}
 // hanging calendar & a framed photo on the outer wall
 d.fillStyle='#d8d0bc';d.fillRect(1460,560,110,150);d.fillStyle='#b8323a';d.fillRect(1460,560,110,36);d.fillStyle='rgba(0,0,0,.3)';for(let i=0;i<5;i++)d.fillRect(1472,612+i*18,86,5);
 // veranda floor
 planks(d,0,1660,WW2,300,false,'#241c2a','#2c2232',33,34);d.fillStyle='rgba(0,0,0,.35)';d.fillRect(0,1660,WW2,10);
 // eave beam at top
 d.fillStyle='#120f1a';d.fillRect(0,0,WW2,150);d.fillStyle='#1c1726';d.fillRect(0,150,WW2,24)})}
function d2s2(c,t){const lt=t-T2[0],Tc=1.15,s=3.0,sp=walkSpeed(Tc,s),x=260+sp*lt,ph=(lt/Tc+.2)%1,cam=x+170;
 c.save();c.translate(540-cam*.92,0);c.drawImage(L2bg(),0,0);c.restore();
 // swinging bulb (practical light) at world 1250
 const bx=540-cam*.92+1250+Math.sin(t*2.1)*14,by=360;c.strokeStyle='#0a0a12';c.lineWidth=3;c.beginPath();c.moveTo(540-cam*.92+1250,150);c.lineTo(bx,by);c.stroke();c.fillStyle='#ffe6b0';c.beginPath();c.arc(bx,by+16,16,0,7);c.fill();
 cone(c,bx,by+20,Math.PI/2+Math.sin(t*2.1)*.02,1500,30,1400,'rgba(255,205,140,1)',.75);bloom(c,bx,by+16,34,'rgba(255,220,160,1)',.95);
 const near=clamp(1-Math.abs(x-1250)/650);
 actor(c,{x:540-170,y:G2,s,f:1,phase:ph,lean:.04,arms:{near:[.3,2.35]},umbrella:{tilt:.04,scale:.7,col:'#1a1420'},headScale:1.22,hairLong:1,lash:1,
  jacket:'#3a2c48',jacketL:'#4e3c60',pants:'#2a2030',skirt:['#4a2430','#c89a40','#2a1218'],skin:'#d9a184',shadowA:.55,
  rims:[{x:-4,y:-1,col:'rgba(140,160,255,1)',a:.8},{x:4,y:-2,col:'rgba(255,190,110,1)',a:.2+.75*near}]});
 // rain curtain dripping from the eave edge (foreground) + puddle splash line
 rainA(c,t,90,41,.02,120,.55,[0,170,W,1400],2200,'#d8deff');c.save();c.globalAlpha=.35;c.fillStyle='#c8d0ff';for(let i=0;i<40;i++){const R=mulberry32(Math.floor(t*30)+i*7);c.fillRect(R()*W,170,2,8+R()*14)}c.restore();
 // foreground post passing (blurred)
 c.save();c.translate(540-cam*1.5,0);c.filter='blur(10px)';c.fillStyle='#05050b';for(const px of [900,2400,3900])c.fillRect(px,0,90,H);c.restore();
 return {tint:'rgba(50,34,110,.2)'}}

// ===== SHOT 3: insert — hand pushes the folding door; it creaks open on TV-blue flicker =====
function L3door(){return layer('d2_3door',W,H,(d)=>{planks(d,0,0,W,H,true,'#2c2338','#3a2e48',51,90);for(const y of [300,960,1600]){d.fillStyle='#231b2e';d.fillRect(0,y,W,60);d.fillStyle='rgba(255,255,255,.05)';d.fillRect(0,y,W,4);d.fillStyle='rgba(0,0,0,.35)';d.fillRect(0,y+56,W,4)}d.fillStyle='rgba(0,0,0,.25)';d.fillRect(0,0,W,H)})}
function d2s3(c,t){const lt=t-T3[0];const open=ez(clamp((lt-.9)/1.6));const tvf=.55+.45*Math.abs(Math.sin(t*37))*mulberry32(Math.floor(t*30))();
 c.fillStyle='#05060e';c.fillRect(0,0,W,H);
 // gap reveals dark interior with blue TV light
 const gap=40+open*520;c.fillStyle='#0a0c1c';c.fillRect(540-gap/2,0,gap,H);c.save();c.globalCompositeOperation='screen';c.globalAlpha=open*tvf;c.fillStyle=rg(c,540,900,40,700,[[0,'rgba(150,180,255,.85)'],[1,'rgba(0,0,0,0)']]);c.fillRect(0,0,W,H);c.restore();
 // two door leaves (perspective squeeze as they open)
 const lw=540-gap/2;c.save();c.beginPath();c.rect(0,0,lw,H);c.clip();c.drawImage(L3door(),-(1-open)*0-open*120,0,W*(1-open*.35),H);c.restore();
 c.save();c.beginPath();c.rect(540+gap/2,0,W,H);c.clip();c.drawImage(L3door(),540+gap/2,0,W*(1-open*.35),H);c.restore();
 // latch
 c.fillStyle='#8a7040';rr(c,lw-40,880,30,140,8);c.fill();
 // door frame + threshold
 c.fillStyle='#161220';c.fillRect(0,0,W,70);c.fillRect(0,1700,W,220);c.fillStyle='rgba(255,255,255,.05)';c.fillRect(0,1700,W,5);
 // her palm flat on the left leaf, pushing
 hand(c,lw-190+Math.sin(lt*2)*2,1010,2.0,.04);
 // light line on the floor
 c.save();c.globalCompositeOperation='screen';c.globalAlpha=.35*open*tvf;c.filter='blur(22px)';c.fillStyle='#9fb6ff';c.beginPath();c.moveTo(540-gap/2,1700);c.lineTo(540+gap/2,1700);c.lineTo(540+gap*1.3,1920);c.lineTo(540-gap*1.3,1920);c.fill();c.restore();
 return {tint:'rgba(30,40,110,.22)',focusBlur:0}}

// ===== SHOT 4: interior OTS — old CRT TV static, calendar, still fan; static cuts to a picture of the room... with someone behind her =====
function L4room(){return layer('d2_4room',W,H,(d)=>{d.fillStyle='#120f1c';d.fillRect(0,0,W,H);planks(d,0,0,W,1350,true,'#221b2c','#2a2136',61,70);planks(d,0,1350,W,570,false,'#1c1622','#241c2a',62,40);
 // ceiling fan (still)
 d.fillStyle='#16121c';d.fillRect(530,0,20,160);d.beginPath();d.ellipse(540,170,40,18,0,0,7);d.fill();d.fillRect(320,160,440,16);
 // wall: calendar (one date circled red), portrait with black ribbon
 d.fillStyle='#d8d0bc';d.fillRect(140,420,180,240);d.fillStyle='#a02830';d.fillRect(140,420,180,50);d.fillStyle='rgba(0,0,0,.35)';for(let r=0;r<5;r++)for(let k=0;k<6;k++)d.fillRect(152+k*28,488+r*32,18,14);d.strokeStyle='#c0303a';d.lineWidth=4;d.beginPath();d.arc(236,568,16,0,7);d.stroke();
 d.fillStyle='#3a2a1c';d.fillRect(760,380,170,220);d.fillStyle='#8a8478';d.fillRect(776,396,138,188);d.fillStyle='#4a463e';d.beginPath();d.arc(845,470,34,0,7);d.fill();d.beginPath();d.ellipse(845,570,58,40,0,Math.PI,0);d.fill();d.fillStyle='#0b0b0e';d.beginPath();d.moveTo(760,380);d.lineTo(810,380);d.lineTo(760,430);d.fill();
 // low cabinet + CRT TV
 d.fillStyle='#2e2026';d.fillRect(300,1120,480,230);d.fillStyle='rgba(0,0,0,.3)';d.fillRect(320,1150,200,170);d.fillRect(560,1150,200,170);
 d.fillStyle='#24222a';rr(d,340,800,400,330,30);d.fill();d.fillStyle='#16141a';rr(d,360,820,300,260,24);d.fill();d.fillStyle='#3a3640';for(let i=0;i<3;i++){d.beginPath();d.arc(700,860+i*50,10,0,7);d.fill()}
 // floor mat + overturned bowl (implied struggle)
 d.fillStyle='rgba(120,90,60,.35)';d.beginPath();d.moveTo(160,1500);d.lineTo(920,1500);d.lineTo(1020,1800);d.lineTo(60,1800);d.fill();
 d.fillStyle='#c8c0b0';d.beginPath();d.ellipse(820,1620,60,24,.3,0,7);d.fill();d.fillStyle='rgba(200,200,190,.4)';d.beginPath();d.ellipse(900,1660,70,14,.3,0,7);d.fill()})}
function d2s4(c,t){const lt=t-T4[0];const z=1+.06*ez(clamp(lt/2.9));const pic=t>=12.55;const tvf=.6+.4*mulberry32(Math.floor(t*30)*3)();
 c.save();camL(c,z,540,960);c.drawImage(L4room(),0,0);
 // the TV screen
 c.save();c.beginPath();rr(c,360,820,300,260,24);c.clip();if(!pic){tvStatic(c,360,820,300,260,t,5)}else{
  // the picture: this very room from the TV's point of view — her back and a tall figure behind her
  c.fillStyle='#1a2a3a';c.fillRect(360,820,300,260);c.fillStyle='#0a1018';c.fillRect(360,1000,300,80);c.fillStyle='#05080e';c.beginPath();c.ellipse(470,940,22,26,0,0,7);c.fill();c.fillRect(448,962,44,80);
  c.beginPath();c.ellipse(560,900,16,20,0,0,7);c.fill();c.fillRect(546,918,28,120);bloom(c,556,898,4,'rgba(255,40,40,1)',.9);bloom(c,566,898,4,'rgba(255,40,40,1)',.9);
  c.fillStyle='rgba(255,255,255,.05)';for(let y=820;y<1080;y+=4)c.fillRect(360,y,300,1)}c.restore();
 c.restore();
 // TV light floods the room (blue flicker)
 darkness(c,.84,[[510,950,pic?560:700,.95],[510,1500,600,.5]],'4,4,12');
 c.save();c.globalCompositeOperation='screen';c.globalAlpha=(pic?.45:.6)*tvf;c.fillStyle=rg(c,510,950,30,820,[[0,'rgba(150,175,255,.9)'],[1,'rgba(0,0,0,0)']]);c.fillRect(0,0,W,H);c.restore();
 // her back, foreground right, out of focus
 c.save();c.filter='blur(9px)';c.fillStyle='#07060c';c.beginPath();c.moveTo(620,1920);c.quadraticCurveTo(640,1440,840,1400);c.quadraticCurveTo(1040,1390,1120,1500);c.lineTo(1120,1920);c.fill();c.beginPath();c.ellipse(880,1250,130,150,0,0,7);c.fill();c.fillRect(780,1250,200,500);c.restore();
 c.save();c.globalCompositeOperation='screen';c.globalAlpha=.35*tvf;c.strokeStyle='#9fb6ff';c.lineWidth=6;c.filter='blur(3px)';c.beginPath();c.ellipse(880,1250,128,148,0,Math.PI*.9,Math.PI*1.6);c.stroke();c.restore();
 return {tint:'rgba(30,40,110,.2)'}}

// ===== SHOT 5: close-up — her face in TV light; eyes widen; she starts to turn; smash to black =====
function d2s5(c,t){const lt=t-T5[0];if(t>=14.35){c.fillStyle='#000';c.fillRect(0,0,W,H);return {black:1}}
 const tvf=.55+.45*mulberry32(Math.floor(t*30)*5)();c.fillStyle='#0b0a16';c.fillRect(0,0,W,H);
 const z=1+.07*ez(clamp(lt/1.05));c.save();camL(c,z,540,960);c.filter='blur(16px)';c.drawImage(L4room(),-200,-300,W*1.4,H*1.4);c.restore();
 darkness(c,.75,[[100,800,600,.7]],'4,4,12');
 const wide=sm2((lt-.35)/.2);
 // profile close-up (facing left toward the TV), TV-blue rim on the face side
 c.save();camL(c,z,540,960);actor(c,{x:700,y:2780,s:6.4,f:-1,legs:[[.02,.05],[-.02,.05]],arms:{near:[.05,.2],far:[-.05,.2]},lean:-.02,head:.04*wide,headScale:1.25,hairLong:1,lash:1,wide,
  jacket:'#3a2c48',jacketL:'#4e3c60',skin:'#d9a184',shadow:false,rims:[{x:-7,y:-2,col:'rgba(150,180,255,1)',a:.55+.4*tvf}]});c.restore();
 c.save();c.globalCompositeOperation='screen';c.globalAlpha=.28*tvf;c.fillStyle=rg(c,0,800,60,900,[[0,'rgba(160,185,255,.9)'],[1,'rgba(0,0,0,0)']]);c.fillRect(0,0,W,H);c.restore();
 return {tint:'rgba(30,40,110,.2)'}}

// ===== film pass + render =====
const SH2=[[T1,d2s1],[T2,d2s2],[T3,d2s3],[T4,d2s4],[T5,d2s5]];
function camL(c,z,cx,cy,rot=0){c.translate(540,960);c.rotate(rot);c.scale(z,z);c.translate(-cx,-cy)}
function renderAt(t,canvas){const c=canvas.getContext('2d');c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.fillStyle='#000';c.fillRect(0,0,W,H);
 let sh=SH2[0];for(const s of SH2)if(t>=s[0][0])sh=s;const r=sh[1](c,t)||{};
 if(!r.black){if(r.tint){c.save();c.globalCompositeOperation='soft-light';c.fillStyle=r.tint;c.fillRect(0,0,W,H);c.restore()}
  // diffusion / halation (Pro-Mist look): blurred copy screened on top
  const k=layer('diff',W/2,H/2,()=>{}),q=k.getContext('2d');q.setTransform(1,0,0,1,0,0);q.globalCompositeOperation='source-over';q.filter='blur(8px)';q.clearRect(0,0,W/2,H/2);q.drawImage(canvas,0,0,W/2,H/2);q.filter='none';
  c.save();c.globalCompositeOperation='screen';c.globalAlpha=.16;c.drawImage(k,0,0,W,H);c.globalCompositeOperation='soft-light';c.globalAlpha=.25;c.drawImage(k,0,0,W,H);c.restore();
  // lifted blacks, lower contrast
  c.save();c.globalCompositeOperation='lighten';c.fillStyle='rgb(17,18,30)';c.fillRect(0,0,W,H);c.restore();
  c.fillStyle=rg(c,540,920,W*.32,H*.7,[[0,'rgba(0,0,0,0)'],[1,'rgba(2,3,10,.55)']]);c.fillRect(0,0,W,H);
  if(r.flash>.3){const k2=layer('ca',W,H,()=>{}),q2=k2.getContext('2d');q2.setTransform(1,0,0,1,0,0);q2.clearRect(0,0,W,H);q2.drawImage(canvas,0,0);c.save();c.globalCompositeOperation='screen';c.globalAlpha=.16*r.flash;c.drawImage(k2,-6,0);c.drawImage(k2,6,0);c.restore()}}
 for(const s of SH2){if(s[0][0]>0&&t>=s[0][0]&&t<s[0][0]+1/30){c.fillStyle='rgba(0,0,0,.55)';c.fillRect(0,0,W,H)}}
 if(t<.35){c.fillStyle='rgba(0,0,0,'+(1-t/.35)+')';c.fillRect(0,0,W,H)}
 const R=mulberry32(Math.floor(t*30)*7+3);c.save();c.globalCompositeOperation='overlay';c.globalAlpha=.045;const nt=noiseTile();for(let i=0;i<2;i++)c.drawImage(nt,0,0,256,256,-R()*256,-R()*256,W+300,H+300);c.restore();
 credit(c)}
