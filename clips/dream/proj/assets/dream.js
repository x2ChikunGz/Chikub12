// "หน้าในฝัน" — 2D vector, BRIGHT-night storybook, timing from real speech (voice.wav 58.24s)
const HF='Kanit,Tahoma,sans-serif',DUR=58.3;
const bo=t=>{t=clamp(t);const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)};
const mix=(a,b,t)=>a+(b-a)*t;
function tx(c,s,x,y,size,col,al,st,sw){c.font='800 '+size+'px '+HF;c.textAlign=al||'center';c.textBaseline='alphabetic';if(st){c.lineWidth=sw||8;c.lineJoin='round';c.strokeStyle=st;c.strokeText(s,x,y)}c.fillStyle=col;c.fillText(s,x,y)}
function credit(c){c.save();c.fillStyle='rgba(10,8,30,.55)';rr(c,54,176,250,56,14);c.fill();tx(c,'@เรื่องสงสัย',179,216,34,'#fff');c.restore()}
// ---------- palette ----------
const P={nav1:'#1d2250',nav2:'#3b3470',moon:'#f3e7c3',amb:'#f2b84b',pink:'#e0809a',teal:'#6fc7c0',lav:'#b9a8ff',ink:'#1a1530',paper:'#f4ecdc',red:'#d6303c',cream:'#fff6e0'};
const FACES=[{skin:'#f1c6a0',hair:'#2b2230',st:0},{skin:'#d9a47a',hair:'#1a1420',st:1},{skin:'#f6d3b3',hair:'#8a5a3a',st:2},{skin:'#c68b63',hair:'#222034',st:3},{skin:'#efc19a',hair:'#b9b6b2',st:1},{skin:'#e3b08a',hair:'#3a2a24',st:2}];
// ---------- face ----------
function face(c,x,y,r,o){o=o||{};const F=o.f||FACES[0],t=o.t||0;c.save();c.translate(x,y);if(o.rot)c.rotate(o.rot);
 if(o.alpha!=null)c.globalAlpha=o.alpha;if(o.blur)c.filter='blur('+o.blur+'px)';
 const rx=r*.82,ry=r,ghost=o.mode==='ghost',trans=o.mode==='trans';
 const skin=ghost?'#e9edf6':F.skin;
 if(trans){c.globalAlpha=(o.alpha==null?1:o.alpha)*.9}
 // ears
 if(!trans){c.fillStyle=skin;c.beginPath();c.ellipse(-rx,r*.05,r*.13,r*.2,0,0,7);c.ellipse(rx,r*.05,r*.13,r*.2,0,0,7);c.fill()}
 // head
 c.beginPath();c.ellipse(0,0,rx,ry,0,0,7);
 if(trans){const g=rg(c,0,-ry*.3,r*.1,r*1.1,[[0,'rgba(200,220,255,.28)'],[1,'rgba(150,170,255,.10)']]);c.fillStyle=g;c.fill();c.lineWidth=r*.035;c.strokeStyle='rgba(215,230,255,.95)';c.stroke()}
 else{c.fillStyle=ghost?lg(c,0,-ry,0,ry,[[0,'#f4f6ff'],[1,'#b9c2dc']]):skin;c.fill();
  if(!ghost){c.save();c.clip();c.fillStyle='rgba(120,60,40,.13)';c.beginPath();c.ellipse(rx*.35,r*.25,rx*.9,ry*1.1,0,0,7);c.fill();c.restore()}}
 // hair
 if(!trans&&!ghost){c.fillStyle=F.hair;c.beginPath();
  if(F.st===0){c.ellipse(0,-ry*.28,rx*1.04,ry*.78,0,Math.PI,0);c.lineTo(rx*.7,-ry*.1);c.quadraticCurveTo(0,-ry*.5,-rx*.7,-ry*.1);c.closePath();c.fill()}
  else if(F.st===1){c.ellipse(0,-ry*.2,rx*1.12,ry*.95,0,Math.PI,0);c.lineTo(rx*1.12,ry*.55);c.lineTo(rx*.8,ry*.5);c.quadraticCurveTo(rx*.85,-ry*.4,0,-ry*.55);c.quadraticCurveTo(-rx*.85,-ry*.4,-rx*.8,ry*.5);c.lineTo(-rx*1.12,ry*.55);c.closePath();c.fill()}
  else if(F.st===2){c.ellipse(0,-ry*.3,rx*1.05,ry*.75,0,Math.PI,0);c.closePath();c.fill();c.beginPath();c.arc(0,-ry*1.02,r*.22,0,7);c.fill()}
  else{c.ellipse(0,-ry*.5,rx*.95,ry*.5,0,Math.PI,0);c.closePath();c.fill()}}
 if(ghost){c.fillStyle='rgba(25,25,50,.92)';c.beginPath();c.ellipse(0,-ry*.5,rx*1.1,ry*.55,0,Math.PI,0);c.lineTo(rx*.9,r*.9);c.lineTo(rx*.6,r*.4);c.quadraticCurveTo(0,-ry*.15,-rx*.6,r*.4);c.lineTo(-rx*.9,r*.9);c.closePath();c.fill()}
 // eyes
 const eyes=o.eyes||[[-.36,-.05,1],[.36,-.05,1]];
 for(let i=0;i<eyes.length;i++){const e=eyes[i],ex=e[0]*r,ey=e[1]*r,es=(e[2]||1)*r;const bl=o.noBlink?1:1-Math.max(0,1-Math.abs(((t*.7+(e[3]||0)+i*.13)%2.6)-.1)*12);
  const ew=es*.19,eh=es*.13*Math.max(.08,bl);
  if(ghost){c.fillStyle='#07060f';c.beginPath();c.ellipse(ex,ey+eh*.3,ew*1.15,es*.24*(.9+.1*Math.sin(t*2)),0,0,7);c.fill();continue}
  if(trans){c.fillStyle='rgba(20,20,70,.55)';c.beginPath();c.ellipse(ex,ey,ew*1.15,Math.max(eh*1.5,ew*.5),0,0,7);c.fill();c.strokeStyle='rgba(235,245,255,.95)';c.lineWidth=r*.03;c.stroke();c.fillStyle='rgba(235,245,255,.95)';c.beginPath();c.arc(ex+Math.sin(t*1.5+i)*ew*.3,ey,ew*.35,0,7);c.fill();continue}c.fillStyle='#fff';c.beginPath();c.ellipse(ex,ey,ew,eh,0,0,7);c.fill();
  const lx=(o.lookx!=null?o.lookx:Math.sin(t*.9+i*1.7)*.5)*ew*.5,ly=(o.looky!=null?o.looky:Math.cos(t*.7+i)*.3)*eh*.4;
  c.fillStyle=trans?'#2a3a7a':'#2a1d2a';c.beginPath();c.ellipse(ex+lx,ey+ly,ew*.5,Math.min(eh,ew*.5),0,0,7);c.fill();
  if(!trans){c.fillStyle='rgba(255,255,255,.9)';c.beginPath();c.arc(ex+lx-ew*.15,ey+ly-eh*.25,ew*.12,0,7);c.fill()}}
 // brows
 if(!ghost&&!o.noBrow){c.strokeStyle=trans?'rgba(215,230,255,.9)':F.hair;c.lineWidth=r*.04;c.lineCap='round';const bl=o.brow||0;
  for(const s of [-1,1]){c.beginPath();c.moveTo(s*r*.5,-r*.28-bl*r*.06);c.lineTo(s*r*.2,-r*.3+bl*r*.04*s*-1);c.stroke()}}
 // nose + mouth
 c.strokeStyle=ghost?'rgba(60,60,90,.5)':trans?'rgba(215,230,255,.9)':'rgba(120,60,40,.55)';c.lineWidth=r*.035;c.lineCap='round';
 c.beginPath();c.moveTo(0,r*.05);c.quadraticCurveTo(r*.09,r*.2,0,r*.24);c.stroke();
 const m=o.mouth||'smile';
 if(m==='hollow'){c.fillStyle='#07060f';c.beginPath();c.ellipse(0,r*.55,r*.12,r*.2*(1+.2*Math.sin(t*3)),0,0,7);c.fill()}
 else if(m==='o'){c.fillStyle='rgba(90,30,40,.85)';c.beginPath();c.ellipse(0,r*.5,r*.09,r*.11,0,0,7);c.fill()}
 else if(m==='flat'){c.beginPath();c.moveTo(-r*.17,r*.5);c.lineTo(r*.17,r*.5);c.stroke()}
 else{c.beginPath();c.moveTo(-r*.22,r*.45);c.quadraticCurveTo(0,r*.62,r*.22,r*.45);c.stroke()}
 if(!ghost&&!trans&&o.cheek!==0){c.fillStyle='rgba(230,110,110,.22)';c.beginPath();c.ellipse(-r*.5,r*.33,r*.1,r*.06,0,0,7);c.ellipse(r*.5,r*.33,r*.1,r*.06,0,0,7);c.fill()}
 c.restore()}
// ---------- bits ----------
function person(c,x,y,s,col,hc){c.fillStyle=col||'#2a2548';c.beginPath();c.arc(x,y-s*.62,s*.22,0,7);c.fill();c.beginPath();c.moveTo(x-s*.34,y);c.quadraticCurveTo(x-s*.34,y-s*.36,x,y-s*.36);c.quadraticCurveTo(x+s*.34,y-s*.36,x+s*.34,y);c.closePath();c.fill()}
function crowd(c,x0,y,n,sp,sc,scroll,cols){for(let i=-1;i<=n;i++){let x=x0+((i*sp+scroll)%(sp*(n+2)))-sp;if(x<x0-sp)x+=sp*(n+2);person(c,x,y,sc*(0.9+hash(i*3.1)*.25),cols?cols[((i%cols.length)+cols.length)%cols.length]:'#2a2548')}}
function brain(c,x,y,s,t,col){c.save();c.translate(x,y);c.scale(s,s*(1+.02*Math.sin(t*3)));c.fillStyle=col||'#f08aa4';const B=[[-60,0,52],[-25,-35,50],[28,-35,50],[62,-2,50],[-48,32,46],[8,48,50],[52,34,44],[0,-2,58]];for(const b of B){c.beginPath();c.arc(b[0],b[1],b[2],0,7);c.fill()}
 c.strokeStyle='rgba(150,40,80,.5)';c.lineWidth=5;c.lineCap='round';for(const [a,b,cx_,cy_] of [[-50,-20,-10,-5],[10,-45,30,-5],[-30,25,15,35],[35,10,55,25],[-70,10,-45,28],[0,-10,5,22]]){c.beginPath();c.moveTo(a,b);c.quadraticCurveTo((a+cx_)/2+10,(b+cy_)/2-12,cx_,cy_);c.stroke()}c.restore()}
function paper(c,x,y,w,h,ang,col,sh){c.save();c.translate(x,y);c.rotate(ang||0);if(sh!==0){c.fillStyle='rgba(8,6,30,.28)';rr(c,-w/2+8,-h/2+14,w,h,22);c.fill()}c.fillStyle=col||P.paper;rr(c,-w/2,-h/2,w,h,22);c.fill();c.restore()}
function stamp(c,s,x,y,ang,col,k,sub){c.save();c.translate(x,y);c.rotate(ang);const w=(c.font='800 78px '+HF,c.measureText(s).width)+70;c.scale(k,k);c.globalAlpha=clamp(k*1.4);c.strokeStyle=col;c.lineWidth=12;rr(c,-w/2,-70,w,140,22);c.stroke();c.fillStyle=col;tx(c,s,0,30,78,col);if(sub){tx(c,sub,0,100,34,col)}c.restore()}
function dreamCloud(c,cx,cy,rx,ry,t,fn,tint){c.save();const gl=rg(c,cx,cy,rx*.2,rx*1.5,[[0,'rgba(230,170,255,.40)'],[1,'rgba(230,170,255,0)']]);c.fillStyle=gl;c.fillRect(cx-rx*1.6,cy-rx*1.6,rx*3.2,rx*3.2);
 const bumps=[];for(let i=0;i<14;i++){const a=i/14*Math.PI*2;bumps.push([cx+Math.cos(a)*rx*.8,cy+Math.sin(a)*ry*.8,rx*.3+hash(i*7.3)*rx*.08])}
 c.beginPath();for(const b of bumps){c.moveTo(b[0]+b[2],b[1]);c.arc(b[0],b[1],b[2],0,7)}c.ellipse(cx,cy,rx*.85,ry*.85,0,0,7);c.fillStyle=tint||'#f1e9ff';c.fill();
 c.save();c.beginPath();c.ellipse(cx,cy,rx*.9,ry*.9,0,0,7);c.clip();c.fillStyle=lg(c,0,cy-ry,0,cy+ry,[[0,'#8e78d8'],[1,'#d89ad0']]);c.fillRect(cx-rx,cy-ry,rx*2,ry*2);if(fn)fn(c,cx,cy,Math.min(rx,ry));c.restore();c.restore()}
function bubbles(c,x0,y0,x1,y1,t){for(let i=0;i<3;i++){const k=(i+1)/4,x=mix(x0,x1,k),y=mix(y0,y1,k),r=10+i*11+Math.sin(t*2+i)*1.5;c.fillStyle='#f1e9ff';c.beginPath();c.arc(x,y,r,0,7);c.fill()}}
function stars(c,n,seed,t,y1){const R=mulberry32(seed);for(let i=0;i<n;i++){const x=R()*W,y=R()*y1,s=1.5+R()*2.4,a=.35+.5*Math.abs(Math.sin(t*1.3+i));c.fillStyle='rgba(255,246,214,'+a+')';c.beginPath();c.arc(x,y,s,0,7);c.fill()}}
function nightBG(c,t){c.fillStyle=lg(c,0,0,0,H,[[0,P.nav1],[.6,P.nav2],[1,'#241d48']]);c.fillRect(0,0,W,H);stars(c,50,5,t,900)}
function zzz(c,x,y,t){for(let i=0;i<3;i++){const p=((t*.5+i/3)%1),a=Math.sin(p*Math.PI);c.save();c.globalAlpha=a*.9;tx(c,'z',x-p*60-i*8,y-p*180,34+i*14+p*14,P.cream);c.restore()}}
// ---------- bedroom ----------
function bedroom(c,t,lt,o){o=o||{};nightBG(c,t);
 // wall + floor
 c.fillStyle=lg(c,0,0,0,1260,[[0,'#2b2a5e'],[1,'#3d3472']]);c.fillRect(0,280,W,980);c.fillStyle='#17142f';c.fillRect(0,1240,W,680);c.fillStyle='rgba(255,255,255,.04)';for(let i=0;i<8;i++)c.fillRect(0,1260+i*80,W,3);
 // window + moon
 c.fillStyle='#14123a';rr(c,50,380,220,330,14);c.fill();c.fillStyle=lg(c,0,390,0,700,[[0,'#3a5aa0'],[1,'#7a8fd0']]);rr(c,62,392,196,306,8);c.fill();
 c.fillStyle=P.moon;c.beginPath();c.arc(180,500,48,0,7);c.fill();c.fillStyle='#14123a';c.fillRect(158,392,8,306);c.fillRect(62,540,196,8);stars(c,0,1,t,1);
 // moon beam on floor
 c.save();c.globalAlpha=.10;c.fillStyle=P.moon;c.beginPath();c.moveTo(62,700);c.lineTo(258,700);c.lineTo(520,1260);c.lineTo(120,1260);c.closePath();c.fill();c.restore();
 // nightstand + lamp
 const fl=o.flick?(.55+.45*noise(t*40,3)):1;
 c.fillStyle='#3a2a52';rr(c,64,1090,170,170,12);c.fill();c.fillStyle='#2a1d3f';c.fillRect(64,1160,170,6);
 c.fillStyle='#5a4a7a';c.fillRect(144,1030,12,60);c.fillStyle=lg(c,0,980,0,1040,[[0,'#ffd88a'],[1,'#f2a64b']]);c.beginPath();c.moveTo(104,1040);c.lineTo(196,1040);c.lineTo(180,975);c.lineTo(120,975);c.closePath();c.fill();
 c.save();c.globalCompositeOperation='screen';c.fillStyle=rg(c,150,1010,10,360,[[0,'rgba(255,190,90,'+(.5*fl)+')'],[1,'rgba(255,190,90,0)']]);c.fillRect(0,640,560,720);c.restore();
 // bed
 c.fillStyle='#2a2146';rr(c,240,1190,800,70,14);c.fill();c.fillStyle='#4a3a78';rr(c,1000,860,70,400,16);c.fill();
 c.fillStyle='#d8d2ee';rr(c,250,1040,780,160,26);c.fill();
 c.fillStyle='#fff6e8';c.beginPath();c.ellipse(900,1020,120,46,-.06,0,7);c.fill();
 // sleeper
 const br=Math.sin(t*1.8)*4;
 c.fillStyle='#8a6bd0';c.beginPath();c.moveTo(280,1060);c.quadraticCurveTo(300,1005-br,420,997-br);c.lineTo(800,990-br);c.quadraticCurveTo(950,985-br,975,1060);c.lineTo(980,1200);c.lineTo(260,1200);c.closePath();c.fill();
 c.strokeStyle='rgba(255,255,255,.18)';c.lineWidth=6;for(let i=0;i<5;i++){c.beginPath();c.moveTo(330+i*130,1005-br+10);c.lineTo(330+i*130-10,1195);c.stroke()}
 c.fillStyle=F0.skin;c.beginPath();c.arc(885,955+br*.3,70,0,7);c.fill();
 c.fillStyle=F0.hair;c.beginPath();c.arc(890,943+br*.3,72,Math.PI*1.02,Math.PI*2.05);c.lineTo(940,930);c.quadraticCurveTo(885,915,845,955);c.fill();
 c.strokeStyle='#3a2230';c.lineWidth=5;c.lineCap='round';c.beginPath();c.arc(852,965+br*.3,10,.15,Math.PI-.15);c.stroke();c.beginPath();c.moveTo(836,1000+br*.3);c.quadraticCurveTo(850,1008,868,1000);c.stroke();
 c.fillStyle='rgba(230,110,110,.3)';c.beginPath();c.ellipse(845,985+br*.3,14,8,0,0,7);c.fill();
 zzz(c,830,900,t);
 // dream
 const ck=o.cloudK==null?1:o.cloudK;if(ck>0){bubbles(c,850,900,690,770,t);c.save();c.translate(620,610);c.scale(ck,ck);c.translate(-620,-610);dreamCloud(c,620,610,330,250,t,o.cloud);c.restore()}}
const F0=FACES[0];
// ---------- shot content ----------
const SH=[];
function shot(a,b,fn,o){SH.push({a,b,fn,o:o||{}})}
// S1 hook 0-3.4
shot(0,3.44,(c,t,lt,d)=>{const z=lt<2.55?0:eo((lt-2.55)/.7);const blur=Math.max(0,14*(1-clamp((lt-.3)/2.3)));
 bedroom(c,t,lt,{cloud:(c2,cx,cy,r)=>{face(c2,cx,cy+10,r*.78,{f:FACES[2],t,blur,mouth:'smile',lookx:.3});},cloudK:bo(lt/.25)});
 if(z>0){c.save();c.globalAlpha=z;c.fillStyle='rgba(255,255,255,.0)';c.restore()}});
// S2 morning 3.88-5.34 (cut from 3.44)
function morning(c,t,lt,d){c.fillStyle=lg(c,0,0,0,H,[[0,'#ffe3b0'],[1,'#f7b88a']]);c.fillRect(0,0,W,H);
 c.fillStyle='#fff0c8';c.beginPath();c.arc(850,470,150,0,7);c.fill();c.fillStyle='rgba(255,230,150,.35)';c.beginPath();c.arc(850,470,230,0,7);c.fill();
 c.fillStyle='#f0a77a';c.fillRect(0,1240,W,680);c.fillStyle='#d9b38f';rr(c,120,1160,840,100,20);c.fill();c.fillStyle='#fff';rr(c,140,1100,820,90,22);c.fill();
 const sw=Math.sin(lt*9)*.12;
 c.fillStyle='#5b6fa8';rr(c,470,820,210,300,60);c.fill();
 c.save();c.translate(650,880);c.rotate(-1.0+sw);c.fillStyle='#5b6fa8';rr(c,-26,-170,52,180,26);c.fill();c.fillStyle=F0.skin;c.beginPath();c.arc(0,-176,26,0,7);c.fill();c.restore();
 face(c,575,700,86,{f:FACES[0],t,mouth:'flat',brow:-1,noBlink:false,lookx:.6,looky:.4,cheek:0});
 // messy hair
 c.fillStyle=F0.hair;for(let i=0;i<5;i++){c.beginPath();c.moveTo(520+i*28,628);c.lineTo(530+i*28+(i%2?14:-14),585-(i%3)*10);c.lineTo(545+i*28,630);c.closePath();c.fill()}
 for(let i=0;i<3;i++){const p=(lt*.9+i*.33)%1;c.save();c.globalAlpha=Math.sin(p*Math.PI);tx(c,'?',470+i*110,610-p*70,70+i*18,'#c0382f');c.restore()}
 // fading dream bubble
 const k=clamp((lt-.1)/1.1);bubbles(c,640,640,720,520,t);c.save();c.beginPath();c.ellipse(760,380,150,120,0,0,7);c.fillStyle='#fff';c.fill();c.clip();
 face(c,760,390,92,{f:FACES[2],t,blur:2+k*16,alpha:1-k*.9});c.restore();c.save();c.globalAlpha=clamp((k-.3)*1.6);tx(c,'?',760,425,150,'#c0382f');c.restore()}
shot(3.44,5.4,morning);

// shared backdrop
function plainBG(c,a,b){c.fillStyle=lg(c,0,0,0,H,[[0,a],[1,b]]);c.fillRect(0,0,W,H)}
// S3a quote card
shot(5.4,7.2,(c,t,lt)=>{plainBG(c,'#2a2150','#4a3a80');stars(c,30,9,t,1200);
 const k=bo((lt-.55)/.4);c.save();c.translate(540,860);c.scale(k,k);paper(c,0,0,880,560,-.02,P.paper);
 c.fillStyle=P.lav;c.beginPath();c.arc(-340,-170,54,0,7);c.fill();c.fillStyle='#2a2548';c.beginPath();c.arc(-340,-184,20,0,7);c.fill();c.beginPath();c.ellipse(-340,-130,38,24,0,Math.PI,0);c.fill();
 tx(c,'ใครสักคนบนโซเชียล',-260,-175,40,P.ink,'left');tx(c,'ความเชื่อยอดฮิต',-260,-130,30,'#8a7aa0','left');
 tx(c,'“ทุกหน้าในฝัน',0,0,76,P.ink);tx(c,'คือคนจริง ที่เราเคยเห็น”',0,92,64,'#6a40b8');
 c.fillStyle=P.pink;c.beginPath();c.arc(-340,205,18,0,7);c.fill();c.fillStyle='#a9a0c0';for(let i=0;i<2;i++){rr(c,-290+i*60,192,40,26,8);c.fill()}
 c.restore();},{});
// S3b brain can't draw
shot(7.2,9.0,(c,t,lt)=>{plainBG(c,'#2a2150','#4a3a80');stars(c,30,11,t,1200);
 const k=bo(lt/.35);c.save();c.translate(400,820);c.scale(k,k);brain(c,0,0,2.2,t);
 face(c,0,10,0,{});c.restore();
 // blank paper with dotted head
 const k2=bo((lt-.3)/.35);c.save();c.translate(800,900);c.scale(k2,k2);c.rotate(.06);paper(c,0,0,300,380,0,'#fffdf5');c.setLineDash([12,12]);c.strokeStyle='#9a90b8';c.lineWidth=5;c.beginPath();c.ellipse(0,-20,84,104,0,0,7);c.stroke();c.setLineDash([]);
 const x=clamp((lt-.9)/.25);if(x>0){c.save();c.scale(bo(x),bo(x));c.strokeStyle=P.red;c.lineWidth=22;c.lineCap='round';c.beginPath();c.moveTo(-90,-110);c.lineTo(90,90);c.moveTo(90,-110);c.lineTo(-90,90);c.stroke();c.restore()}c.restore();
 c.save();c.translate(400,560);c.rotate(-.5+Math.sin(t*6)*.05);c.fillStyle='#f2b84b';rr(c,-12,-110,24,160,6);c.fill();c.fillStyle='#e07a5f';c.fillRect(-12,-124,24,16);c.fillStyle='#fff6e0';c.beginPath();c.moveTo(-12,50);c.lineTo(12,50);c.lineTo(0,76);c.closePath();c.fill();c.restore()});
// diagram: crowd -> cloud
function diagram(c,t,lt,dim){plainBG(c,'#2a2150','#4a3a80');stars(c,30,13,t,1000);
 const hi=3;dreamCloud(c,540,520,300,230,t,(c2,cx,cy,r)=>{face(c2,cx,cy+10,r*.8,{f:FACES[hi],t,mouth:'smile'})});bubbles(c,540,800,540,700,t);
 c.fillStyle='rgba(8,6,30,.35)';rr(c,40,1000,1000,330,30);c.fill();
 crowd(c,0,1250,5,200,200,lt*40,['#4a4278','#5a5088','#4a4278']);
 // highlighted person
 const px=540,py=1250;c.fillStyle=P.amb;person(c,px,py,230,P.amb);face(c,px,py-190,58,{f:FACES[hi],t,mouth:'smile',cheek:0});
 // dotted line up
 c.save();c.strokeStyle=P.amb;c.lineWidth=6;c.setLineDash([4,18]);c.lineCap='round';c.lineDashOffset=-lt*80;c.beginPath();c.moveTo(540,1030);c.lineTo(540,840);c.stroke();c.restore();
 tx(c,'คนที่เคยเห็น',540,1330,40,'#e8e0ff');
 if(dim){c.fillStyle='rgba(10,8,30,'+dim+')';c.fillRect(0,0,W,H)}}
shot(9.0,11.9,(c,t,lt)=>diagram(c,t,lt,0));
shot(11.9,14.9,(c,t,lt)=>{diagram(c,t,lt+3,.45);const k=bo((lt-1.3)/.25);if(lt>1.2)stamp(c,'ยังไม่มีใครพิสูจน์',540,860,-.08,P.red,k,'UNPROVEN');});
// name cards
function nameCard(c,t,lt,name,role1,role2,av,col){plainBG(c,'#15405a','#2a2d6a');stars(c,40,17,t,1000);
 const k=eo(lt/.45);c.save();c.translate(540+(1-k)*900,860);c.rotate(-.03+(1-k)*.1);paper(c,0,0,900,540,0,P.paper);
 c.fillStyle=col;rr(c,-450,-270,900,26,0);c.fill();
 c.fillStyle='#d9d2f4';c.beginPath();c.arc(-290,-40,120,0,7);c.fill();c.save();c.beginPath();c.arc(-290,-40,120,0,7);c.clip();c.fillStyle='#2a2548';c.beginPath();c.ellipse(-290,130,130,100,0,Math.PI,0);c.fill();face(c,-290,-50,70,{f:av,t,noBlink:false,mouth:'smile',cheek:0});c.restore();
 const n1=clamp((lt-.5)/.5);c.save();c.beginPath();c.rect(-130,-120,520*n1,100);c.clip();tx(c,name,-140,-50,60,P.ink,'left');c.restore();
 tx(c,role1,-140,20,44,'#5a4a8a','left');tx(c,role2,-140,84,44,col,'left');c.restore()}
shot(14.9,17.6,(c,t,lt)=>{nameCard(c,t,lt,'Deirdre Barrett','นักจิตวิทยา','ฮาร์วาร์ด',{skin:'#efc19a',hair:'#b9b6b2',st:2},'#a51c30')});
// report pile
shot(17.6,20.4,(c,t,lt)=>{plainBG(c,'#15405a','#2a2d6a');stars(c,40,19,t,1000);
 tx(c,'รายงานความฝัน',540,520,70,'#fff','center','#15405a',10);
 const R=mulberry32(4);for(let i=0;i<9;i++){const d=i*.25,p=clamp((lt-d)/.35);if(p<=0)continue;const y=mix(380,1080-i*18,eo(p)),x=540+(R()-.5)*150,a=(R()-.5)*.5;c.save();c.translate(x,y);c.rotate(a);paper(c,0,0,420,290,0,i%2?'#fffdf5':'#f4ecdc');c.strokeStyle='#b8aed6';c.lineWidth=5;for(let j=0;j<4;j++){c.beginPath();c.moveTo(-170,-80+j*40);c.lineTo(100-(j%2)*60,-80+j*40);c.stroke()}
  c.fillStyle='#d8c8ff';c.beginPath();c.arc(130,-70,26,0,7);c.arc(105,-60,18,0,7);c.fill();c.restore()}});
// multi-eye face
shot(20.4,22.95,(c,t,lt)=>{plainBG(c,'#3a1f5a','#5a2f7a');stars(c,40,23,t,1200);const k=bo(lt/.3);
 const E=[[-.55,-.4,.9],[0,-.58,.9],[.55,-.4,.9],[-.3,-.05,1],[.3,-.05,1],[-.62,.22,.8],[.62,.22,.8]].map((e,i)=>[e[0],e[1],e[2],i*.4]);
 face(c,540+Math.sin(t*2)*10,860,330*k,{f:FACES[4],t,eyes:E,mouth:'o',brow:1,rot:Math.sin(t*1.6)*.05,noBrow:true})});
// transparent face
shot(22.95,24.6,(c,t,lt)=>{nightBG(c,t);c.fillStyle='rgba(243,231,195,.8)';c.beginPath();c.arc(660,700,260,0,7);c.fill();c.fillStyle='rgba(120,110,170,.25)';for(const [x,y,r] of [[600,640,36],[730,760,44],[690,570,22]]){c.beginPath();c.arc(x,y,r,0,7);c.fill()}
 const k=bo(lt/.3);face(c,540+Math.sin(t*2.4)*14,860+Math.cos(t*2)*10,330*k,{mode:'trans',t,eyes:[[-.36,-.05,1],[.36,-.05,1]],mouth:'flat',alpha:.7+.3*Math.sin(t*5)})});
// no match
shot(24.6,26.7,(c,t,lt)=>{plainBG(c,'#2a2150','#4a3a80');stars(c,30,29,t,1000);
 const E=[[-.55,-.4,.9],[0,-.58,.9],[.55,-.4,.9],[-.3,-.05,1],[.3,-.05,1],[-.62,.22,.8],[.62,.22,.8]].map((e,i)=>[e[0],e[1],e[2],i*.4]);
 face(c,540,640,200,{f:FACES[4],t,eyes:E,mouth:'o',noBrow:true});
 const sy=480+((lt*1.6)%1)*340;c.fillStyle='rgba(111,199,192,.55)';c.fillRect(300,sy,480,8);
 for(let i=0;i<5;i++){const x=130+i*205,k=bo((lt-.2-i*.08)/.25);c.save();c.translate(x,1080);c.scale(k,k);face(c,0,0,78,{f:FACES[i],t});c.restore()}
 const m=bo((lt-.9)/.25);if(lt>.85){c.save();c.translate(540,860);c.scale(m,m);c.fillStyle=P.red;rr(c,-290,-60,580,120,24);c.fill();tx(c,'ไม่พบคนจริงแบบนี้',0,22,58,'#fff');c.restore()}});
// assembly
shot(26.7,28.9,(c,t,lt)=>{plainBG(c,'#2a2150','#4a3a80');stars(c,30,31,t,1000);brain(c,540,520,1.9,t);
 const f=FACES[0],cy=1020,r=210,p=eo(lt/1.5);
 c.fillStyle=f.skin;c.beginPath();c.ellipse(540,cy,r*.82,r,0,0,7);c.fill();
 const parts=[['eyeL',-.36,-.05],['eyeR',.36,-.05],['nose',0,.2],['mouth',0,.5]];
 for(let i=0;i<parts.length;i++){const q=clamp((lt-.1*i)/1.1),e=eio(q),px=mix(540+(i-1.5)*40,540+parts[i][1]*r,e),py=mix(560,cy+parts[i][2]*r,e)-Math.sin(q*Math.PI)*90;
  c.save();c.translate(px,py);c.rotate((1-e)*(i-1.5)*.8);if(i<2){c.fillStyle='#fff';c.beginPath();c.ellipse(0,0,r*.19,r*.13,0,0,7);c.fill();c.fillStyle='#2a1d2a';c.beginPath();c.arc(0,0,r*.09,0,7);c.fill()}else if(i===2){c.strokeStyle='rgba(120,60,40,.6)';c.lineWidth=8;c.beginPath();c.moveTo(0,-r*.1);c.quadraticCurveTo(r*.09,r*.05,0,r*.08);c.stroke()}else{c.strokeStyle='rgba(120,60,40,.7)';c.lineWidth=8;c.lineCap='round';c.beginPath();c.moveTo(-r*.22,0);c.quadraticCurveTo(0,r*.17,r*.22,0);c.stroke()}c.restore()}
 c.fillStyle=f.hair;c.beginPath();c.ellipse(540,cy-r*.28,r*.85,r*.78,0,Math.PI,0);c.lineTo(540+r*.58,cy-r*.1);c.quadraticCurveTo(540,cy-r*.5,540-r*.58,cy-r*.1);c.closePath();c.globalAlpha=clamp((lt-1.1)*3);c.fill();c.globalAlpha=1;
 if(lt>1.3){const k=clamp((lt-1.3)/.5);for(let i=0;i<8;i++){const a=i/8*6.28,d=r*1.05+k*60;c.fillStyle='rgba(255,230,150,'+(1-k)+')';c.beginPath();c.arc(540+Math.cos(a)*d,cy+Math.sin(a)*d,8,0,7);c.fill()}}});
shot(28.9,31.7,(c,t,lt)=>{nameCard(c,t,lt,'Dylan Selterman','นักวิจัย','จอนส์ ฮอปกินส์',{skin:'#d9a47a',hair:'#1a1420',st:1},'#1f4f9a')});
// sci-fi stamp
shot(31.7,34.5,(c,t,lt)=>{plainBG(c,'#1a1840','#3a2a6a');stars(c,60,37,t,1500);
 // planet + rocket
 c.fillStyle='#d98a6a';c.beginPath();c.arc(800,520,110,0,7);c.fill();c.strokeStyle='#f3d3a0';c.lineWidth=14;c.beginPath();c.ellipse(800,520,190,40,-.3,0,7);c.stroke();
 const rx_=mix(100,900,eio(lt/2.5)),ry_=mix(1100,380,eio(lt/2.5));c.save();c.translate(rx_,ry_);c.rotate(.8);c.fillStyle='#fff6e8';rr(c,-22,-60,44,110,22);c.fill();c.fillStyle=P.red;c.beginPath();c.moveTo(-22,-30);c.quadraticCurveTo(0,-90,22,-30);c.fill();c.fillStyle=P.amb;c.beginPath();c.moveTo(-14,50);c.lineTo(14,50);c.lineTo(0,90+Math.sin(t*30)*10);c.fill();c.restore();
 const k=bo(.001+(lt-1.5)/.25);c.save();c.translate(540,860);paper(c,0,0,860,380,.0,P.paper);tx(c,'“ทุกหน้าในฝัน = คนจริง”',0,-30,58,P.ink);c.restore();
 if(lt>1.45)stamp(c,'นิยายวิทยาศาสตร์',540,1000,-.08,P.red,k,'SCI-FI')});
// faces grid
shot(34.5,38.6,(c,t,lt)=>{plainBG(c,'#15405a','#2a2d6a');stars(c,20,41,t,1000);
 const lim=lt<2.9?lt:2.9;const rows=7,cols=5;let n=0;
 for(let r_=0;r_<rows;r_++)for(let q=0;q<cols;q++){const idx=r_*cols+q,d=.35+idx*.07;if(lim<d)continue;const k=bo((lim-d)/.2);c.save();c.translate(130+q*205,430+r_*140);c.scale(k,k);face(c,0,0,56,{f:FACES[(idx*7)%6],t:t+idx,mouth:idx%3?'smile':'flat',cheek:0});c.restore()}
 tx(c,'ทุกหน้าที่เคยเห็นทั้งชีวิต',540,330,50,'#fff','center','#15405a',8);
 if(lt>2.85){const k=bo((lt-2.85)/.25);c.fillStyle='rgba(120,10,30,.35)';c.fillRect(0,0,W,H);c.save();c.translate(540,860);c.scale(k,k);c.strokeStyle='#fff';c.lineWidth=34;c.lineCap='round';c.beginPath();c.moveTo(-200,-200);c.lineTo(200,200);c.moveTo(200,-200);c.lineTo(-200,200);c.stroke();c.strokeStyle=P.red;c.lineWidth=22;c.beginPath();c.moveTo(-200,-200);c.lineTo(200,200);c.moveTo(200,-200);c.lineTo(-200,200);c.stroke();c.restore()}});
// summary flash
shot(38.6,40.0,(c,t,lt)=>{plainBG(c,'#f2b84b','#e08a3a');const k=bo(lt/.25);c.save();c.translate(540,820);c.scale(k,k);tx(c,'สรุป',0,60,230,'#fff','center','#7a3a12',16);c.restore();c.fillStyle='#7a3a12';c.fillRect(300,920,480*clamp((lt-.2)/.3),12)});
// three cards
function three(c,t,lt,t0,dim,only){plainBG(c,'#2a2150','#4a3a80');stars(c,30,43,t,1000);
 tx(c,'หน้าในฝัน อาจมาจาก…',540,360,58,'#fff','center','#2a2150',8);
 const defs=[['เคยเห็นผ่านๆ',40.93,'#6fc7c0'],['สมองประกอบเอง',42.77,'#e0809a'],['ผสมกัน',44.38,'#f2b84b']];
 for(let i=0;i<3;i++){const [nm,ts,col]=defs[i],p=bo((t-ts)/.3);if(t<ts)continue;c.save();c.translate(540,590+i*270);c.scale(p,p);paper(c,0,0,880,230,0,P.paper);c.fillStyle=col;rr(c,-440,-115,22,230,0);c.fill();
  c.fillStyle=col;c.beginPath();c.arc(-340,0,50,0,7);c.fill();tx(c,String(i+1),-340,24,64,'#fff');
  tx(c,nm,-250,22,62,P.ink,'left');
  const x=300;if(i===0){for(let j=0;j<3;j++)person(c,x-60+j*60,50,80,'#6a60a0');face(c,x,-30,38,{f:FACES[3],t,cheek:0})}
  else if(i===1){brain(c,x-10,0,.62,t,'#f08aa4');c.fillStyle='#f2b84b';for(let j=0;j<3;j++){c.beginPath();c.arc(x+50+j*10,-50+j*34,6,0,7);c.fill()}}
  else{face(c,x-26,0,56,{f:FACES[2],t,cheek:0});c.save();c.beginPath();c.rect(x-26,-70,80,140);c.clip();face(c,x-26,0,56,{f:FACES[3],t,cheek:0});c.restore()}
  c.restore()}
 if(dim){c.fillStyle='rgba(20,14,50,'+dim+')';c.fillRect(0,0,W,H)}}
shot(40.0,45.8,(c,t,lt)=>three(c,t,lt,40,0));
shot(45.8,50.6,(c,t,lt)=>{three(c,t,lt,40,.55);const k=bo((t-46.97)/.3);if(t>46.9){c.save();c.translate(540,860);c.scale(k,k);paper(c,0,0,900,300,-.02,'#fff');c.strokeStyle=P.amb;c.lineWidth=10;rr(c,-450,-150,900,300,22);c.stroke();tx(c,'ต้องเป็นคนจริงเท่านั้น?',0,22,70,P.ink);c.restore()}
 if(t>48.83)stamp(c,'ยังไม่มีใครพิสูจน์',540,1130,-.07,P.red,bo((t-48.95)/.25),'UNPROVEN')});
// bedroom question
shot(50.6,53.9,(c,t,lt)=>{bedroom(c,t,lt,{cloud:(c2,cx,cy,r)=>{for(let i=0;i<3;i++){const a=t*.9+i*2.09,x=cx+Math.cos(a)*r*.52,y=cy+Math.sin(a)*r*.38;face(c2,x,y,r*.34,{f:FACES[(i*2)%6],t:t+i,blur:i===1?3:0,alpha:.9})}tx(c2,'?',cx,cy+40,160,'rgba(255,255,255,.75)')}});
 const k=bo((t-52.77)/.3);if(t>52.7){c.save();c.translate(860,360);c.scale(k,k);c.fillStyle='#fff';rr(c,-130,-70,260,140,40);c.fill();c.fillStyle='#8a7aa0';for(let i=0;i<3;i++){c.beginPath();c.arc(-60+i*60,0,13+Math.sin(t*8+i)*4,0,7);c.fill()}c.restore()}});
// ghost
shot(53.9,56.6,(c,t,lt)=>{const g=clamp((lt-1.2)/.12),off=lt>1.75?clamp((lt-1.75)/.4):0;
 bedroom(c,t,lt,{flick:1,cloud:(c2,cx,cy,r)=>{face(c2,cx,cy+10,r*.78,{f:FACES[2],t,alpha:1-g});if(g>0)face(c2,cx,cy+10,r*(.78+.25*clamp((lt-1.2)/1.3)),{mode:'ghost',t,mouth:'hollow',alpha:g,noBrow:true})}});
 c.fillStyle='rgba(5,3,20,'+(.12+.5*off+.12*clamp(lt/1.2))+')';c.fillRect(0,0,W,H)});
// end card
shot(56.6,58.3,(c,t,lt)=>{nightBG(c,t);c.fillStyle=P.moon;c.beginPath();c.arc(800,520,120,0,7);c.fill();c.fillStyle='rgba(120,110,170,.25)';c.beginPath();c.arc(770,490,26,0,7);c.arc(830,560,32,0,7);c.fill();
 const k=bo(lt/.3);c.save();c.translate(540,900);c.scale(k,k);tx(c,'@เรื่องสงสัย',0,0,112,'#fff','center',P.nav1,14);
 const pk=1+.05*Math.sin(t*8);c.scale(pk,pk);c.fillStyle=P.amb;rr(c,-250,70,500,120,60);c.fill();tx(c,'+ ติดตามไว้นะ',0,152,58,P.ink);c.restore()});
// ---------- captions ----------
const CAPS=[[.22,.78,'เคยเป็นไหม','Ever had this happen?',0],[1.37,2.26,'ฝันเห็นหน้าคนคนนึง','You dream of someone’s face',0],[2.61,3.31,'ชัดมาก','so vivid',1],[3.88,4.58,'แต่ตื่นมา','But when you wake up',0],[4.63,5.34,'นึกยังไงก็ไม่รู้จัก','you can’t place them',1],
[6.18,6.91,'มีคนบอกว่า','Some people say',0],[7.27,8.6,'สมองสร้างหน้าใหม่ไม่เป็นหรอก','The brain can’t make new faces',1],[9.12,10.15,'ทุกหน้าในฝัน','Every dream face',0],[10.2,11.08,'คือคนจริงที่เราเคยเห็น','is someone you’ve seen',0],
[11.99,12.56,'แต่เรื่องนี้','But this',0],[12.97,14.1,'ยังไม่มีใครพิสูจน์ได้','has never been proven',2],[15.26,15.97,'เดียร์ดรี แบร์เร็ตต์','Deirdre Barrett',1],[16.27,17.3,'นักจิตวิทยาฮาร์วาร์ด','Harvard psychologist',0],
[17.83,19.95,'เก็บรายงานความฝันมาเยอะมาก','collected loads of dream reports',0],[20.59,22.75,'มีคนฝันเห็นหน้าที่มีตาหลายดวง','someone dreamed of a many-eyed face',1],[23.14,24.26,'หรือหน้าโปร่งใส','or a see-through face',1],
[24.92,26.41,'หน้าแบบนี้ โลกจริงไม่มี','Faces like this don’t exist',2],[26.98,28.26,'แปลว่าสมองประกอบเองได้','so the brain can build them',1],[29.12,30.7,'ส่วน ไดแลน เซลเตอร์แมน','Dylan Selterman',1],[30.85,31.75,'จากจอนส์ ฮอปกินส์','Johns Hopkins',0],
[31.96,33.1,'เรียกความเชื่อนี้ว่า','calls this belief',0],[33.21,34.2,'นิยายวิทยาศาสตร์','science fiction',2],[34.85,35.6,'เพราะต้องจดทุกหน้า','You’d have to log every face',0],[35.6,36.85,'ที่เคยเห็นทั้งชีวิต','you’ve ever seen in your life',0],
[37.39,38.12,'ซึ่งทำไม่ได้','which is impossible',2],[38.98,39.63,'สรุปง่ายๆ','In short',1],[40.11,40.8,'หน้าในฝัน','A dream face',0],[40.93,42.36,'อาจเป็นคนที่เคยเห็นผ่านๆ','may be someone you glimpsed',0],[42.77,43.88,'หรือสมองประกอบเอง','or built by the brain',0],
[44.38,45.25,'หรือผสมกัน','or a mix of both',1],[45.99,46.7,'แต่ที่ว่า','But the claim',0],[46.97,48.4,'ต้องเป็นคนจริงเท่านั้น','must be a real person',1],[48.83,50.2,'ยังไม่มีใครพิสูจน์ได้','is still unproven',2],
[51.28,52.2,'คุณเคยฝันแบบนี้มั้ย','Ever dreamed this?',0],[52.77,53.3,'ถ้าเคย','If you have',0],[53.94,54.62,'ผมหวังว่าคุณจะ','I hope you',0],[54.64,55.7,'ฝันเห็นผี','dream of a ghost',2],[56.67,57.95,'แล้วติดตาม เรื่องสงสัย ด้วยนะ','Follow เรื่องสงสัย',1]];
function caps(c,t){for(const [a,b,s,en,m] of CAPS){if(t<a-.02||t>=b+.12)continue;const e=bo((t-a)/.14);c.save();c.translate(540,1500);c.scale(e,e);const fs=s.length>24?50:s.length>18?58:68;c.font='800 '+fs+'px '+HF;const w=c.measureText(s).width;
 if(m===2){c.fillStyle=P.red;rr(c,-w/2-26,-fs*.95,w+52,fs*1.5,18);c.fill()}
 else{c.lineWidth=11;c.strokeStyle='#120d2a';c.lineJoin='round';c.textAlign='center';c.strokeText(s,0,0)}
 c.textAlign='center';c.fillStyle=m===1?'#ffc857':'#fff';c.fillText(s,0,0);
 c.font='800 32px '+HF;const ew=c.measureText(en).width;c.fillStyle='rgba(10,8,30,.6)';rr(c,-ew/2-18,34,ew+36,48,12);c.fill();c.fillStyle='#fff';c.textAlign='center';c.fillText(en,0,70);c.restore()}}
// ---------- render ----------
const SHAKE=[[13.2,.22,16],[33.25,.22,16],[49.05,.22,16],[55.14,.4,26],[39.0,.1,8]];
const GLITCH=[[55.14,.3,34],[55.5,.12,18],[56.0,.1,22]];
function camOf(sh,t,lt,d){if(sh.a===0&&lt>2.4){const p=eio((lt-2.4)/1.0);return [1+.35*p,620,610]}return [1+.05*clamp(lt/d),540,960]}
function renderAt(t,canvas){const c=canvas.getContext('2d');c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation='source-over';c.globalAlpha=1;c.filter='none';
 let sh=SH[0];for(const s of SH)if(t>=s.a)sh=s;c.fillStyle='#000';c.fillRect(0,0,W,H);
 const lt=t-sh.a,d=sh.b-sh.a;c.save();const [z,fx,fy]=camOf(sh,t,lt,d);let sx=0,sy=0;for(const [a,du,am] of SHAKE){if(t>=a&&t<a+du){const k=1-(t-a)/du;sx+=Math.sin(t*90)*am*k;sy+=Math.cos(t*77)*am*k}}
 c.translate(540+sx+noise(t*.5,1)*3,960+sy+noise(t*.4,4)*3);c.scale(z,z);c.translate(-fx,-fy);sh.fn(c,t,lt);c.restore();
 // post
 c.save();c.globalCompositeOperation='soft-light';c.fillStyle='rgba(120,90,200,.12)';c.fillRect(0,0,W,H);c.restore();
 for(const [a,du,am] of GLITCH)if(t>=a&&t<a+du)hgl(c,am*(1-(t-a)/du),t);
 c.save();c.fillStyle=rg(c,540,900,W*.35,H*.7,[[0,'rgba(0,0,0,0)'],[1,'rgba(8,4,30,.5)']]);c.fillRect(0,0,W,H);c.restore();
 const fi=Math.floor(t*30),R=mulberry32(fi*7+3);c.save();c.globalCompositeOperation='overlay';c.globalAlpha=.1;const nt=noiseTile();for(let i=0;i<2;i++)c.drawImage(nt,0,0,256,256,-R()*256,-R()*256,W+300,H+300);c.restore();
 const lt2=t-sh.a;if(sh.a>0&&lt2<.08){c.fillStyle='rgba(10,6,30,'+(.7*(1-lt2/.08))+')';c.fillRect(0,0,W,H)}
 if(t<.2){c.fillStyle='rgba(0,0,0,'+(.4*(1-t/.2))+')';c.fillRect(0,0,W,H)}
 caps(c,t);credit(c);
 if(t>=DUR-.35){c.fillStyle='rgba(0,0,0,'+clamp((t-(DUR-.35))/.3)+')';c.fillRect(0,0,W,H)}}
function hgl(c,amp,t){const R=mulberry32(Math.floor(t*30)*13+5);for(let i=0;i<7;i++){const y=R()*H,h=14+R()*70,dx=(R()-.5)*amp*3;c.drawImage(c.canvas,0,y,W,h,dx,y,W,h)}c.save();c.globalCompositeOperation='screen';c.globalAlpha=.4;c.drawImage(c.canvas,amp*.4,0);c.restore()}
