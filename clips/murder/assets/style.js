// ===== mirror3 style overrides: paper texture, moon light, stick-vector characters =====
// palette (ref: navy/indigo night, warm lamp, red danger)
const C3={wall0:'#2a3350',wall1:'#1b2138',wain0:'#232b45',wain1:'#171d31',floor0:'#2b2433',floor1:'#120f18',wood0:'#3d2c2e',wood1:'#22171b',curt0:'#3d4878',curt1:'#262d52',moon:'#e9ecf6',skin:'#e1ad8f',skinD:'#a8735f',hair:'#15131c',hood:'#2f3a5e',hoodL:'#46557f',pants:'#1f2336',shoe:'#d9d9e0'};
// ---------- paper / mottled texture ----------
let PT=null;function paperTile(){if(PT)return PT;const S=512,c=mk(S,S),x=c.getContext('2d'),im=x.createImageData(S,S),R=mulberry32(77);
 const g=(n)=>{const a=new Float32Array((n+1)*(n+1));for(let i=0;i<a.length;i++)a[i]=R();return a};const L1=g(8),L2=g(32),L3=g(96);
 const vn=(A,n,u,v)=>{const X=u*n,Y=v*n,i=Math.floor(X),j=Math.floor(Y),fx=X-i,fy=Y-j,s=t=>t*t*(3-2*t);const w=n+1,a=A[(j%n)*w+i%n],b=A[(j%n)*w+(i+1)%n],cc=A[((j+1)%n)*w+i%n],d=A[((j+1)%n)*w+(i+1)%n];return lerp(lerp(a,b,s(fx)),lerp(cc,d,s(fx)),s(fy))};
 for(let y=0;y<S;y++)for(let xx=0;xx<S;xx++){const u=xx/S,v=y/S;let val=vn(L1,8,u,v)*.45+vn(L2,32,u,v)*.3+vn(L3,96,u,v)*.15+R()*.25;val=128+(val-.575)*230;const k=(y*S+xx)*4;im.data[k]=im.data[k+1]=im.data[k+2]=clamp(val,0,255);im.data[k+3]=255}
 x.putImageData(im,0,0);// fibers / specks
 for(let i=0;i<900;i++){const a=R()*6.28,l=2+R()*10,px=R()*S,py=R()*S;x.strokeStyle=R()<.5?'rgba(255,255,255,.18)':'rgba(0,0,0,.22)';x.lineWidth=.6+R()*.8;x.beginPath();x.moveTo(px,py);x.lineTo(px+Math.cos(a)*l,py+Math.sin(a)*l);x.stroke()}
 PT=c;return c}
function paper(c,x,y,w,h,a=.35,mode='overlay',sc=1){c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.globalAlpha=a;c.globalCompositeOperation=mode;const p=c.createPattern(paperTile(),'repeat');c.translate(x,y);c.scale(sc,sc);c.fillStyle=p;c.fillRect(0,0,w/sc+512,h/sc+512);c.restore()}
// full-frame static paper overlay (cached once)
function paperFrame(){return layer('pframe',W,H,(d)=>{paper(d,0,0,W,H,1,'source-over',1.25)})}

// ---------- light helpers ----------
function beam(c,pts,col,a){// soft polygon light (moon shaft): multiple passes with shrinking alpha
 c.save();c.globalCompositeOperation='screen';for(let k=0;k<4;k++){c.globalAlpha=a*(.35-k*.07);c.filter='blur('+(6+k*10)+'px)';c.fillStyle=col;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill()}c.restore()}
function pool(c,x,y,rx,ry,col,a){c.save();c.globalCompositeOperation='screen';c.globalAlpha=a;c.translate(x,y);c.scale(1,ry/rx);c.fillStyle=rg(c,0,0,0,rx,[[0,col],[1,'rgba(0,0,0,0)']]);c.beginPath();c.arc(0,0,rx,0,7);c.fill();c.restore()}

// ---------- room (overrides roomYai) ----------
roomYai=function(){return layer('yai3',RW,1920,(d,w,h)=>{
 d.fillStyle=lg(d,0,0,0,1000,[[0,C3.wall0],[1,C3.wall1]]);d.fillRect(0,0,w,1010);
 // wainscot
 d.fillStyle=lg(d,0,1000,0,1330,[[0,C3.wain0],[1,C3.wain1]]);d.fillRect(0,1000,w,330);d.fillStyle='rgba(255,255,255,.07)';d.fillRect(0,1000,w,6);d.fillStyle='rgba(0,0,0,.35)';d.fillRect(0,1006,w,4);
 for(let x=30;x<w;x+=210){d.strokeStyle='rgba(0,0,0,.28)';d.lineWidth=4;rr(d,x,1050,170,230,6);d.stroke();d.strokeStyle='rgba(255,255,255,.05)';d.lineWidth=2;rr(d,x+3,1053,170,230,6);d.stroke()}
 // floor
 d.fillStyle=lg(d,0,1330,0,h,[[0,C3.floor0],[1,C3.floor1]]);d.fillRect(0,1330,w,h-1330);for(let y=1350;y<h;y+=58){d.fillStyle='rgba(0,0,0,.28)';d.fillRect(0,y,w,3)}d.fillStyle='#1a1420';d.fillRect(0,1322,w,14);
 // rug
 d.fillStyle='rgba(90,40,60,.55)';d.beginPath();d.moveTo(240,1460);d.lineTo(980,1460);d.lineTo(1060,1700);d.lineTo(160,1700);d.closePath();d.fill();d.strokeStyle='rgba(200,170,190,.18)';d.lineWidth=4;d.beginPath();d.moveTo(270,1480);d.lineTo(955,1480);d.lineTo(1025,1680);d.lineTo(195,1680);d.closePath();d.stroke();
 // window: night sky, moon, trees + house silhouettes
 d.save();d.beginPath();d.rect(180,340,360,450);d.clip();d.fillStyle=lg(d,0,340,0,790,[[0,'#1b2546'],[1,'#2d3760']]);d.fillRect(180,340,360,450);
 for(let i=0;i<40;i++){const R=mulberry32(i+5);d.fillStyle='rgba(255,255,255,'+(.3+R()*.5)+')';d.fillRect(180+R()*360,340+R()*250,2,2)}
 d.fillStyle=rg(d,440,430,10,140,[[0,'rgba(233,236,246,.55)'],[1,'rgba(233,236,246,0)']]);d.fillRect(300,290,280,280);d.fillStyle=C3.moon;d.beginPath();d.arc(440,430,44,0,7);d.fill();d.fillStyle='rgba(150,160,190,.35)';d.beginPath();d.arc(428,420,8,0,7);d.arc(452,445,6,0,7);d.fill();
 d.fillStyle='#10142a';d.beginPath();d.moveTo(180,790);d.lineTo(180,650);d.lineTo(240,640);d.lineTo(250,600);d.lineTo(300,600);d.lineTo(305,660);d.lineTo(380,680);d.lineTo(400,700);d.lineTo(540,690);d.lineTo(540,790);d.fill();
 d.fillStyle='#c2423f';d.fillRect(262,620,10,12);d.fillStyle='#e5b867';d.fillRect(410,720,8,10);d.fillRect(480,716,8,10);
 d.strokeStyle='#0c1022';d.lineWidth=5;d.beginPath();d.moveTo(510,790);d.lineTo(505,560);d.moveTo(505,640);d.lineTo(470,590);d.moveTo(505,600);d.lineTo(540,560);d.moveTo(505,700);d.lineTo(470,660);d.stroke();d.restore();
 d.fillStyle='#e8e4dc';d.fillRect(352,340,12,450);d.fillRect(180,560,360,10);d.strokeStyle='#d9d4cb';d.lineWidth=16;d.strokeRect(180,340,360,450);d.fillStyle='#bfb9ae';d.fillRect(166,790,388,18);
 // curtains
 d.fillStyle='#1b1f33';d.fillRect(120,300,480,10);
 for(const [x0,x1] of [[118,230],[490,602]]){d.fillStyle=lg(d,x0,0,x1,0,[[0,C3.curt1],[.5,C3.curt0],[1,C3.curt1]]);d.beginPath();d.moveTo(x0,305);d.lineTo(x1,305);d.quadraticCurveTo(x1-10,560,x1+6,870);d.lineTo(x0-6,870);d.quadraticCurveTo(x0+10,560,x0,305);d.fill();for(let i=1;i<5;i++){d.strokeStyle='rgba(0,0,0,.22)';d.lineWidth=3;d.beginPath();d.moveTo(x0+i*(x1-x0)/5,310);d.lineTo(x0+i*(x1-x0)/5+(i%2?4:-4),868);d.stroke()}}
 // wall clock
 d.save();d.translate(700,330);d.fillStyle='#d9d5cd';d.beginPath();d.arc(0,0,62,0,7);d.fill();d.strokeStyle='#1b1d2a';d.lineWidth=8;d.stroke();for(let i=0;i<12;i++){const a=i/12*6.283;d.fillStyle='#2a2c38';d.fillRect(Math.cos(a)*48-2,Math.sin(a)*48-2,4,4)}d.restore();
 // grandpa portrait with black ribbon
 d.save();d.translate(830,560);shadow(d,8,14,200,250,.45,10);d.fillStyle='#4a3324';d.fillRect(-95,-120,190,240);d.fillStyle='#b9b1a0';d.fillRect(-75,-100,150,200);d.fillStyle='#6f6a62';d.beginPath();d.arc(0,-28,40,0,7);d.fill();d.fillRect(-14,8,28,20);d.beginPath();d.ellipse(0,74,70,46,0,Math.PI,0);d.fill();d.fillStyle='#4e4a44';d.beginPath();d.ellipse(0,-48,42,26,0,Math.PI,0);d.fill();
 d.fillStyle='#0b0b0e';d.beginPath();d.moveTo(-95,-120);d.lineTo(-38,-120);d.lineTo(-95,-62);d.fill();d.beginPath();d.moveTo(95,-120);d.lineTo(38,-120);d.lineTo(95,-62);d.fill();d.restore();
 // shelf with books + incense
 d.fillStyle='#2a1f24';d.fillRect(990,640,230,14);const bc=['#7a2f3c','#3e5a80','#c7a24f','#5a3f7a','#2f6b5f','#8a4b2a'];for(let i=0;i<9;i++){d.fillStyle=bc[i%6];d.fillRect(1000+i*22,560+(i%3)*8,18,80-(i%3)*8)}
 // bed (Thai wood) + mosquito net
 d.fillStyle='#2d1f22';d.fillRect(110,1080,720,44);d.fillRect(110,1120,26,200);d.fillRect(804,1120,26,200);
 d.fillStyle=lg(d,0,1000,0,1090,[[0,'#8d97b8'],[1,'#5b6588']]);rr(d,124,1010,694,80,20);d.fill();d.fillStyle='#b5bdd6';rr(d,140,972,196,66,26);d.fill();
 d.fillStyle='#2d1f22';d.fillRect(110,700,16,390);d.fillRect(814,700,16,390);d.fillRect(110,700,720,12);
 d.fillStyle='rgba(200,210,240,.07)';d.fillRect(126,712,688,300);for(let x=126;x<814;x+=7){d.fillStyle='rgba(255,255,255,.03)';d.fillRect(x,712,1,300)}
 // nightstand
 d.fillStyle=lg(d,880,0,1060,0,[[0,'#3a2a2c'],[1,'#21171a']]);d.fillRect(880,1140,180,190);d.fillStyle='rgba(0,0,0,.35)';d.fillRect(892,1200,156,4);d.fillStyle='#b88a3c';d.beginPath();d.arc(970,1250,6,0,7);d.fill();
 // wardrobe
 d.fillStyle=lg(d,MX-250,0,MX+250,0,[[0,'#3a2a30'],[.5,'#46333a'],[1,'#261a20']]);rr(d,MX-250,MY-420,500,910,10);d.fill();d.fillStyle='#1e1519';d.fillRect(MX-268,MY-440,536,30);d.fillStyle='rgba(0,0,0,.35)';d.fillRect(MX-250,MY+400,500,10);
 for(const x of [MX-230,MX+150])for(const y of [MY-400,MY+340]){d.strokeStyle='rgba(0,0,0,.25)';d.lineWidth=3;rr(d,x,y,80,50,4);d.stroke()}
 shadow(d,MX,1440,560,50,.55,20);shadow(d,470,1340,820,60,.5,24);shadow(d,970,1336,220,40,.5,14);
 // texture passes: mottled multiply + paper overlay
 paper(d,0,0,w,h,.55,'overlay',1.3);paper(d,0,0,w,h,.18,'multiply',2.2);
})};
// lamp with warm cone
lamp=function(c,t,on){c.save();c.translate(970,1140);c.fillStyle='#1c1c24';c.fillRect(-7,-110,14,110);rr(c,-42,-8,84,12,4);c.fill();
 c.fillStyle=on>0?lg(c,0,-205,0,-110,[[0,'#ffe0a8'],[1,'#e0a050']]):'#4a4450';c.beginPath();c.moveTo(-72,-110);c.lineTo(72,-110);c.lineTo(42,-205);c.lineTo(-42,-205);c.fill();c.restore();
 if(on>0){const f=flick(t,4);c.save();c.globalCompositeOperation='screen';c.globalAlpha=.28*on*f;c.fillStyle=lg(c,0,1030,0,1340,[[0,'rgba(255,190,110,.9)'],[1,'rgba(255,160,80,0)']]);c.beginPath();c.moveTo(898,1030);c.lineTo(1042,1030);c.lineTo(1180,1340);c.lineTo(760,1340);c.fill();c.restore();glow(c,970,1050,520,'rgba(255,170,90,.55)',.5*on*f);pool(c,970,1340,260,60,'rgba(255,180,100,.8)',.35*on)}};
// moon shaft from window to floor (world coords)
function moonBeam(c,t,a=1){const s=.9+.1*noise(t*.3,11);beam(c,[[190,350],[540,350],[1150,1500],[520,1500]],'rgba(170,190,255,1)',.34*a*s);dust(c,t,40,300,500,700,900,'200,215,255',13)}
// cloth over mirror: cooler, moonlit
const _wm=wardrobeMirror;wardrobeMirror=function(c,t,slip,content,o){_wm(c,t,slip,content,o);c.save();c.globalCompositeOperation='multiply';c.fillStyle='rgba(150,165,215,.55)';c.fillRect(MX-MW/2-70,MY-MH/2-60,MW+140,MH+140);c.restore();paper(c,MX-MW/2-70,MY-MH/2-60,MW+140,MH+140,.3,'overlay',1)};

// ---------- stick-vector person (overrides person) ----------
function vlimb(c,ax,ay,bx,by,l1,l2,w,col,colL,bend){const [ex,ey]=ik(ax,ay,bx,by,l1,l2,bend);c.lineCap='round';c.lineJoin='round';
 c.strokeStyle=col;c.lineWidth=w;c.beginPath();c.moveTo(ax,ay);c.lineTo(ex,ey);c.lineTo(bx,by);c.stroke();
 c.strokeStyle=colL;c.lineWidth=w*.38;c.beginPath();c.moveTo(ax-w*.18,ay);c.lineTo(ex-w*.18,ey);c.lineTo(bx-w*.18,by);c.stroke();return [ex,ey]}
person=function(c,p,t){const s=(p.s||1)*1.05;c.save();c.translate(p.x,p.y);c.scale(s,s);const br=Math.sin(t*1.5)*2;const lean=p.lean||0;
 const hood=p.shirt||C3.hood,hoodL=C3.hoodL,pa=p.pants||C3.pants,sk=p.skin||C3.skin;
 const nx=Math.sin(lean)*150,ny=-Math.cos(lean)*150-br,shx=nx*.95,shy=ny*.95+8;
 const F=p.foot||[[-20,190],[30,190]],Hn=p.hand||[[-50,40],[50,40]];
 shadow(c,(F[0][0]+F[1][0])/2,Math.max(F[0][1],F[1][1])+8,160,22,.45,6);
 // back leg + arm (darker)
 vlimb(c,-10,0,F[0][0],F[0][1],100,100,15,'#171a29','#262b40',p.kneeBend||-1);c.fillStyle=C3.shoe;c.beginPath();c.ellipse(F[0][0]+10,F[0][1]+4,20,8,0,0,7);c.fill();
 vlimb(c,shx-16,shy,Hn[0][0],Hn[0][1],78,72,13,'#232b47','#323c60',-1);c.fillStyle=C3.skinD;c.beginPath();c.arc(Hn[0][0],Hn[0][1],8,0,7);c.fill();
 // torso: slim hoodie with lit edge
 c.fillStyle=hood;c.beginPath();c.moveTo(-24,10);c.quadraticCurveTo(-30+nx*.5,ny*.5,shx-24,shy-4);c.quadraticCurveTo(shx,shy-14,shx+24,shy-4);c.quadraticCurveTo(30+nx*.5,ny*.5,24,10);c.closePath();c.fill();
 c.fillStyle=hoodL;c.beginPath();c.moveTo(-24,10);c.quadraticCurveTo(-30+nx*.5,ny*.5,shx-24,shy-4);c.lineTo(shx-12,shy-2);c.quadraticCurveTo(-14+nx*.5,ny*.5,-12,10);c.closePath();c.fill();
 c.fillStyle=pa;rr(c,-26,-4,52,20,8);c.fill();
 vlimb(c,10,0,F[1][0],F[1][1],100,100,16,pa,'#30364f',p.kneeBend||-1);c.fillStyle=C3.shoe;c.beginPath();c.ellipse(F[1][0]+10,F[1][1]+4,21,8,0,0,7);c.fill();
 // head
 c.save();c.translate(nx,ny-4);c.rotate((p.head&&p.head.tilt)||0);const turn=(p.head&&p.head.turn)||0;c.fillStyle=sk;c.fillRect(-6,-4,12,16);
 if(p.back){c.fillStyle=C3.hair;c.beginPath();c.ellipse(0,-40,33,38,0,0,7);c.fill();c.fillStyle='rgba(255,255,255,.07)';c.beginPath();c.ellipse(-10,-54,10,18,-.4,0,7);c.fill();c.fillStyle=C3.skinD;c.beginPath();c.ellipse(-31,-36,6,10,0,0,7);c.ellipse(31,-36,6,10,0,0,7);c.fill()}
 else{c.fillStyle=lg(c,-30,-70,30,0,[[0,'#f0c2a4'],[1,sk]]);c.beginPath();c.ellipse(turn*6,-38,30,36,0,0,7);c.fill();
  c.fillStyle=C3.hair;c.beginPath();c.moveTo(-32+turn*4,-38);c.quadraticCurveTo(-34,-82,turn*6,-80);c.quadraticCurveTo(36,-80,34+turn*4,-44);c.lineTo(20+turn*10,-56);c.lineTo(-24+turn*10,-54);c.closePath();c.fill();
  const bl=clamp(p.blink||0);for(const e of [-1,1]){const ex=turn*14+e*11,ey=-36;c.fillStyle='#f4efe8';c.beginPath();c.ellipse(ex,ey,6,4*(1-bl)+.4,0,0,7);c.fill();if(bl<.8){c.fillStyle='#1a1418';c.beginPath();c.arc(ex+turn*2,ey,2.6,0,7);c.fill()}}
  c.strokeStyle='rgba(110,60,50,.6)';c.lineWidth=2;c.beginPath();c.moveTo(turn*14+3,-30);c.lineTo(turn*14+5,-24);c.stroke();c.beginPath();c.moveTo(turn*14-5,-16);c.quadraticCurveTo(turn*14,-15-(p.mouth||0)*3,turn*14+5,-16);c.stroke()}
 c.restore();
 // front arm
 vlimb(c,shx+16,shy,Hn[1][0],Hn[1][1],78,72,13,hood,hoodL,p.armBend||1);c.fillStyle=sk;c.beginPath();c.arc(Hn[1][0],Hn[1][1],8.5,0,7);c.fill();
 c.restore()};

// ---------- close-up bust in the same style (overrides faceTo) ----------
faceTo=function(c,o){const tone=o.tone||'skin';const T={skin:['#f0c2a4','#e1ad8f','#a8735f'],pale:['#dcd8dc','#c6c0c8','#8a8494'],ghost:['#d6e6f0','#b9cfdc','#6d8798'],stranger:['#d8c3b6','#bfa597','#7d6457'],demon:['#3b1a22','#25101a','#0c0508']}[tone];
 c.save();
 // shoulders (slim hoodie), thin neck
 c.fillStyle=tone==='demon'?'#08070c':C3.hood;c.beginPath();c.moveTo(-230,400);c.quadraticCurveTo(-200,250,-70,232);c.lineTo(70,232);c.quadraticCurveTo(200,250,230,400);c.fill();
 c.fillStyle=tone==='demon'?'#0e0c14':C3.hoodL;c.beginPath();c.moveTo(-230,400);c.quadraticCurveTo(-200,250,-70,232);c.lineTo(-40,236);c.quadraticCurveTo(-150,270,-170,400);c.fill();
 c.fillStyle=T[2];c.fillRect(-26,150,52,90);
 // head (round), soft two-tone
 c.fillStyle=lg(c,-120,-140,120,120,[[0,T[0]],[.6,T[1]],[1,T[2]]]);c.beginPath();c.ellipse(0,0,132,148,0,0,7);c.fill();
 c.save();c.globalCompositeOperation='multiply';c.fillStyle=lg(c,40,0,140,0,[[0,'rgba(255,255,255,1)'],[1,'rgba(60,60,110,.85)']]);c.beginPath();c.ellipse(0,0,133,149,0,0,7);c.fill();c.restore();
 c.fillStyle=T[2];c.beginPath();c.ellipse(-128,12,16,30,0,0,7);c.ellipse(128,12,16,30,0,0,7);c.fill();
 // hair
 if(tone==='stranger'){c.fillStyle='#0d0b12';c.beginPath();c.moveTo(-150,280);c.quadraticCurveTo(-175,-150,0,-170);c.quadraticCurveTo(175,-150,150,280);c.lineTo(110,280);c.quadraticCurveTo(120,-40,60,-110);c.quadraticCurveTo(-10,-60,-110,-70);c.quadraticCurveTo(-125,40,-110,280);c.fill()}
 else if(tone!=='demon'){c.fillStyle=C3.hair;c.beginPath();c.moveTo(-138,-10);c.quadraticCurveTo(-150,-160,0,-164);c.quadraticCurveTo(150,-160,138,-20);c.lineTo(110,-60);c.lineTo(70,-52);c.lineTo(30,-64);c.lineTo(-20,-54);c.lineTo(-70,-62);c.lineTo(-112,-48);c.closePath();c.fill();c.fillStyle='rgba(255,255,255,.07)';c.beginPath();c.ellipse(-60,-120,40,14,-.3,0,7);c.fill()}
 else{c.fillStyle='#050306';c.beginPath();c.moveTo(-100,-110);c.lineTo(-150,-240);c.lineTo(-60,-140);c.moveTo(100,-110);c.lineTo(150,-240);c.lineTo(60,-140);c.fill()}
 // brows
 const br=o.brow||0;c.strokeStyle=tone==='stranger'?'#120f16':'#1a1620';c.lineWidth=9;c.lineCap='round';c.beginPath();c.moveTo(-78,-36+br*6);c.lineTo(-30,-42-br*2+br*10);c.moveTo(78,-36+br*6);c.lineTo(30,-42-br*2+br*10);c.stroke();
 // eyes (simple almond + dot)
 const bl=clamp(o.blink||0),lk=o.look||0;for(const s of [-1,1]){const ex=s*52,ey=0;
  if(tone==='demon'){glow(c,ex,ey,70,'rgba(255,60,30,.9)',.8);c.fillStyle='#ffd9a0';c.beginPath();c.ellipse(ex,ey,18,9,0,0,7);c.fill();continue}
  c.save();c.beginPath();c.ellipse(ex,ey,24,14*(1-bl)+.6,0,0,7);c.clip();c.fillStyle='#f6f1ea';c.fillRect(ex-30,ey-20,60,40);c.fillStyle=tone==='ghost'?'#8aa3b3':'#1b1418';c.beginPath();c.arc(ex+lk*10,ey,9,0,7);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(ex+lk*10+3,ey-4,3,0,7);c.fill();c.restore();
  c.strokeStyle='rgba(40,20,20,.6)';c.lineWidth=3;c.beginPath();c.moveTo(ex-24,ey-1+(1-bl)*-12*0);c.quadraticCurveTo(ex,ey-16*(1-bl)-1,ex+24,ey-1);c.stroke();
  if(o.eyeGlow)glow(c,ex,ey,60,'rgba(255,60,30,.9)',o.eyeGlow)}
 // nose + mouth
 c.strokeStyle='rgba(120,60,50,.5)';c.lineWidth=4;c.beginPath();c.moveTo(4,22);c.lineTo(12,52);c.lineTo(0,56);c.stroke();
 const sm=o.smile||0,mo=o.mouthOpen||0;c.fillStyle=tone==='demon'?'#000':'#5a2630';c.beginPath();c.moveTo(-34,92-sm*4);c.quadraticCurveTo(0,96+sm*24+mo*28,34,92-sm*4);c.quadraticCurveTo(0,100+sm*6,-34,92-sm*4);c.fill();
 if(tone==='demon'&&mo>0){c.fillStyle='#efe6d2';for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(i*9-4,94);c.lineTo(i*9,106+mo*8);c.lineTo(i*9+4,94);c.fill()}}
 if(tone==='skin'||tone==='stranger'){c.fillStyle='rgba(230,120,120,.18)';c.beginPath();c.ellipse(-76,48,26,14,0,0,7);c.ellipse(76,48,26,14,0,0,7);c.fill()}
 // rim light
 if(tone!=='demon'){c.save();c.globalCompositeOperation='screen';c.strokeStyle=o.rimCol||'rgba(170,190,255,.5)';c.lineWidth=6;c.filter='blur(3px)';c.beginPath();c.ellipse(0,0,130,146,0,-1.3,.9);c.stroke();c.restore()}
 if(o.sweat){const y=-20+((o.sweat*120)%140);c.fillStyle='rgba(200,230,255,.85)';c.beginPath();c.ellipse(100,y,6,10,0,0,7);c.fill()}
 paper(c,-240,-260,480,660,.18,'overlay',1);
 c.restore()};
