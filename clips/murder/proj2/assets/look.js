// ===== look v4: cinematic flat-vector (ref: stipple texture, rough canopies w/ rim, haze planes, motivated light + bloom) =====
const K={sky0:'#0c1030',sky1:'#1e2456',sky2:'#3a3270',haze:'#4a4a86',hill:'#141936',hill2:'#1d2348',tree:'#101428',treeRim:'#5d5aa8',
 warm:'#ffcf7a',warmD:'#e89a3c',red:'#d8363f',cloud:'#262c5c',cloudRim:'#8e8fd0',grass:'#0a0d1e',wood:'#3a2a2c'};
// stipple: random dots inside the current clip region (call between save/clip/restore)
function stip(c,x,y,w,h,den,col,seed,rMin=.7,rMax=2.1){const R=mulberry32(seed);const n=Math.round(w*h/10000*den);c.fillStyle=col;for(let i=0;i<n;i++){const r=rMin+R()*(rMax-rMin);c.globalAlpha=.25+R()*.75;c.beginPath();c.arc(x+R()*w,y+R()*h,r,0,7);c.fill()}c.globalAlpha=1}
// stipple only inside a path builder
function stipIn(c,path,bx,by,bw,bh,den,col,seed){c.save();path(c);c.clip();stip(c,bx,by,bw,bh,den,col,seed);c.restore()}
// rough torn-edge blob (canopy / bush). lobes: [[dx,dy,r],...]
function roughPath(c,cx,cy,lobes,seed,jag=.12){const R=mulberry32(seed);c.beginPath();for(const [dx,dy,r] of lobes){const n=28;for(let i=0;i<=n;i++){const a=i/n*Math.PI*2;const rr2=r*(1+(R()-.5)*jag*2);const x=cx+dx+Math.cos(a)*rr2,y=cy+dy+Math.sin(a)*rr2;i?c.lineTo(x,y):c.moveTo(x,y)}c.closePath()}}
function canopy(c,cx,cy,lobes,col,rim,seed,light=[-1,-.6],texCol='rgba(0,0,0,.5)'){
 c.save();c.fillStyle=rim;roughPath(c,cx+light[0]*3.5,cy+light[1]*3.5,lobes,seed);c.fill();
 c.fillStyle=col;roughPath(c,cx-light[0]*2,cy-light[1]*2,lobes,seed);c.fill();
 // inner darker clumps
 c.save();roughPath(c,cx,cy,lobes,seed);c.clip();const R=mulberry32(seed+9);for(const [dx,dy,r] of lobes){c.fillStyle='rgba(0,0,0,.22)';roughPath(c,cx+dx-light[0]*r*.25,cy+dy-light[1]*r*.25+r*.15,[[0,0,r*.7]],seed+((R()*99)|0),.18);c.fill()}
 let bx=1e9,by=1e9,ex=-1e9,ey=-1e9;for(const [dx,dy,r] of lobes){bx=Math.min(bx,cx+dx-r-10);by=Math.min(by,cy+dy-r-10);ex=Math.max(ex,cx+dx+r+10);ey=Math.max(ey,cy+dy+r+10)}
 stip(c,bx,by,ex-bx,ey-by,48,texCol,seed+3,.8,2.6);stip(c,bx,by,ex-bx,ey-by,18,rim,seed+4,.7,1.9);c.restore();c.restore()}
// cloud with bumpy top, lit rim (like ref)
function cloud(c,x,y,w,bumps,col,rim,seed){const R=mulberry32(seed);const L=[];let px=0;while(px<w){const r=30+R()*55;L.push([px+r*.6,-(R()*r*.6),r]);px+=r*1.1}
 c.save();c.fillStyle=rim;c.beginPath();for(const [dx,dy,r] of L){c.moveTo(x+dx+r,y+dy-3);c.arc(x+dx,y+dy-3,r,0,7)}c.rect(x,y-3,w+40,60);c.fill();
 c.fillStyle=col;c.beginPath();for(const [dx,dy,r] of L){c.moveTo(x+dx+r,y+dy+4);c.arc(x+dx,y+dy+4,r-1,0,7)}c.rect(x,y+4,w+40,62);c.fill();
 c.beginPath();for(const [dx,dy,r] of L){c.moveTo(x+dx+r,y+dy+4);c.arc(x+dx,y+dy+4,r-1,0,7)}c.rect(x,y+4,w+40,62);c.clip();stip(c,x-60,y-140,w+160,220,30,'rgba(210,215,255,.5)',seed+2,.7,1.8);c.restore()}
function haze(c,y0,y1,col,a){c.save();c.globalAlpha=a;c.fillStyle=lg(c,0,y0,0,y1,[[0,'rgba(0,0,0,0)'],[.5,col],[1,'rgba(0,0,0,0)']]);c.fillRect(-200,y0,W+400,y1-y0);c.restore()}
function bloom(c,x,y,r,col,a){c.save();c.globalCompositeOperation='screen';for(const [k,al] of [[1,.9],[2.4,.45],[5,.18]]){c.globalAlpha=a*al;c.fillStyle=rg(c,x,y,0,r*k,[[0,col],[1,'rgba(0,0,0,0)']]);c.fillRect(x-r*k,y-r*k,r*k*2,r*k*2)}c.restore()}
// soft trapezoid light cone from (x,y) pointing at angle ang (rad), widths w0->w1 over len
function cone(c,x,y,ang,len,w0,w1,col,a){const ca=Math.cos(ang),sa=Math.sin(ang),px=-sa,py=ca;const P=[[x+px*w0/2,y+py*w0/2],[x-px*w0/2,y-py*w0/2],[x+ca*len-px*w1/2,y+sa*len-py*w1/2],[x+ca*len+px*w1/2,y+sa*len+py*w1/2]];
 c.save();c.globalCompositeOperation='screen';const g=lg(c,x,y,x+ca*len,y+sa*len,[[0,col],[1,'rgba(0,0,0,0)']]);for(let k=0;k<4;k++){c.globalAlpha=a*(.42-k*.08);c.filter='blur('+(4+k*12)+'px)';c.fillStyle=g;c.beginPath();P.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill()}c.filter='none';
 stipIn(c,cc=>{cc.beginPath();P.forEach((p,i)=>i?cc.lineTo(p[0],p[1]):cc.moveTo(p[0],p[1]));cc.closePath()},Math.min(...P.map(p=>p[0])),Math.min(...P.map(p=>p[1])),len+w1,len+w1,30,'rgba(255,240,210,'+(.16*a)+')',17);c.restore()}
function rain(c,n,seed,ang=.16,len=46,a=.35,area=[0,0,W,H]){const R=mulberry32(seed);c.save();c.strokeStyle='rgba(200,210,255,1)';c.lineCap='round';for(let i=0;i<n;i++){const x=area[0]+R()*area[2],y=area[1]+R()*area[3],l=len*(.5+R());c.globalAlpha=a*(.3+R()*.7);c.lineWidth=.8+R()*1.2;c.beginPath();c.moveTo(x,y);c.lineTo(x-Math.sin(ang)*l,y+Math.cos(ang)*l);c.stroke()}c.restore()}
function flies(c,n,seed,area,col='255,200,110'){const R=mulberry32(seed);for(let i=0;i<n;i++){const x=area[0]+R()*area[2],y=area[1]+R()*area[3],r=2+R()*2.5;bloom(c,x,y,r*2.2,'rgba('+col+',.95)',.6+R()*.4);c.fillStyle='rgba('+col+',1)';c.beginPath();c.arc(x,y,r*.6,0,7);c.fill()}}
function stars(c,n,seed,area){const R=mulberry32(seed);for(let i=0;i<n;i++){c.fillStyle='rgba(255,255,255,'+(.3+R()*.6)+')';const s=1+R()*2;c.fillRect(area[0]+R()*area[2],area[1]+R()*area[3],s,s)}}
function grassBlades(c,y0,y1,n,col,seed,lean=.3,area=[0,W]){const R=mulberry32(seed);c.save();c.fillStyle=col;for(let i=0;i<n;i++){const x=area[0]+R()*(area[1]-area[0]),h=(y1-y0)*(.35+R()*.65),w=6+R()*10,b=(R()-.3)*lean*h;c.beginPath();c.moveTo(x-w/2,y1);c.quadraticCurveTo(x+b*.3,y1-h*.6,x+b,y1-h);c.quadraticCurveTo(x+b*.35+w*.2,y1-h*.55,x+w/2,y1);c.fill()}c.restore()}
function bolt(c,x,y,len,seed){const R=mulberry32(seed);c.save();c.globalCompositeOperation='screen';const pts=[[x,y]];let px=x,py=y;while(py<y+len){px+=(R()-.5)*70;py+=30+R()*40;pts.push([px,py])}
 for(const [w,a,bl] of [[14,.25,18],[6,.6,6],[2.5,1,0]]){c.strokeStyle='rgba(225,230,255,'+a+')';c.lineWidth=w;c.filter=bl?'blur('+bl+'px)':'none';c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke()}c.filter='none';c.restore()}
// window with warm glow and optional silhouette
function win(c,x,y,w,h,lit,col=K.warm,sil=null,frame='#1a1426'){c.save();c.fillStyle=lit?lg(c,0,y,0,y+h,[[0,'#ffe9b0'],[1,col]]):'#0b0e22';c.fillRect(x,y,w,h);
 if(sil){c.fillStyle=sil;c.beginPath();c.ellipse(x+w*.5,y+h*.42,w*.14,w*.17,0,0,7);c.fill();c.fillRect(x+w*.3,y+h*.55,w*.4,h*.45)}
 c.strokeStyle=frame;c.lineWidth=Math.max(3,w*.07);c.strokeRect(x,y,w,h);c.beginPath();c.moveTo(x+w/2,y);c.lineTo(x+w/2,y+h);c.moveTo(x,y+h/2);c.lineTo(x+w,y+h/2);c.stroke();c.restore();if(lit)bloom(c,x+w/2,y+h/2,Math.max(w,h)*.6,'rgba(255,190,100,.8)',.5)}
// mysterious victorian house silhouette (x = centre, y = ground), scale s
function house(c,x,y,s,o={}){c.save();c.translate(x,y);c.scale(s,s);const body=o.body||'#151933',roof=o.roof||'#0d1026',rim=o.rim||'rgba(140,140,220,.55)';
 // main body
 c.fillStyle=body;c.fillRect(-260,-300,520,300);c.fillRect(140,-470,150,470);
 c.fillStyle=roof;c.beginPath();c.moveTo(-300,-300);c.lineTo(0,-520);c.lineTo(300,-300);c.fill();c.beginPath();c.moveTo(120,-470);c.lineTo(215,-640);c.lineTo(310,-470);c.fill();
 c.fillRect(-180,-470,40,120);// chimney
 // rim light along roof edges (lightning/moon backlight)
 c.strokeStyle=rim;c.lineWidth=4;c.beginPath();c.moveTo(-300,-300);c.lineTo(0,-520);c.lineTo(300,-300);c.moveTo(120,-470);c.lineTo(215,-640);c.lineTo(310,-470);c.stroke();
 c.save();c.beginPath();c.rect(-300,-640,620,640);c.clip();stip(c,-300,-640,620,640,40,'rgba(0,0,0,.6)',41);stip(c,-300,-640,620,640,16,'rgba(160,160,240,.45)',42);c.restore();
 // porch + door
 c.fillStyle='#0e1128';c.fillRect(-120,-150,240,150);c.fillStyle='#1b1f3a';c.fillRect(-140,-170,280,22);
 const W0=o.windows||{};win(c,-210,-250,70,90,W0.a);win(c,-60,-260,60,80,W0.b);win(c,170,-420,90,110,W0.tower,W0.towerCol||K.warm,W0.sil);win(c,170,-250,90,100,W0.c,W0.cCol||K.warm);
 c.fillStyle=o.door?'#ffd690':'#08091a';c.fillRect(-36,-130,72,130);if(o.door)bloom(c,0,-60,70,'rgba(255,190,100,.9)',.6);
 c.restore()}
// simple sedan with headlights pointing left (x = rear, y = ground)
function car(c,x,y,s,t){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='#1b2042';c.beginPath();c.moveTo(0,-40);c.lineTo(0,-90);c.quadraticCurveTo(60,-150,160,-150);c.lineTo(250,-150);c.quadraticCurveTo(300,-150,330,-95);c.lineTo(400,-85);c.quadraticCurveTo(420,-80,420,-40);c.closePath();c.fill();
 c.fillStyle='rgba(255,215,150,.35)';c.beginPath();c.moveTo(70,-95);c.quadraticCurveTo(110,-138,170,-138);c.lineTo(170,-95);c.fill();c.fillRect(185,-138,90,43);
 c.fillStyle='#0a0c1c';for(const wx of [80,340]){c.beginPath();c.arc(wx,-38,38,0,7);c.fill();c.fillStyle='#3a3f60';c.beginPath();c.arc(wx,-38,14,0,7);c.fill();c.fillStyle='#0a0c1c'}
 c.fillStyle='#fff6d8';c.fillRect(405,-82,14,16);c.fillStyle='#ff3a3a';c.fillRect(-4,-82,10,16);c.restore();
 bloom(c,x+412*s,y-74*s,20*s,'rgba(255,240,200,1)',.9);bloom(c,x,y-74*s,14*s,'rgba(255,60,60,.9)',.6)}
// stick-vector torch hand (POV) from bottom
function torchHand(c,x,y,ang){c.save();c.translate(x,y);c.rotate(ang);c.strokeStyle='#2f3a5e';c.lineCap='round';c.lineWidth=46;c.beginPath();c.moveTo(0,260);c.lineTo(0,40);c.stroke();c.fillStyle='#e1ad8f';c.beginPath();c.ellipse(0,20,30,36,0,0,7);c.fill();c.fillStyle='#22263a';rr(c,-16,-110,32,120,8);c.fill();c.fillStyle='#3a3f58';rr(c,-24,-150,48,48,8);c.fill();c.fillStyle='#fff3cf';c.fillRect(-20,-154,40,6);c.restore()}
// static caption (caps2 resting state) for still frames
function capStill(c,th,en,mode=0){c.save();c.translate(540,1500);const fs=th.length>26?50:th.length>19?58:68;c.font='800 '+fs+'px '+HF;c.textAlign='center';const w=c.measureText(th).width;
 if(mode===2){c.fillStyle=K.red;rr(c,-w/2-26,-fs*.95,w+52,fs*1.5,18);c.fill()}else{c.lineWidth=12;c.strokeStyle='#07080d';c.lineJoin='round';c.strokeText(th,0,0)}
 c.fillStyle=mode===1?'#ffc857':'#fff';c.fillText(th,0,0);c.font='800 32px '+HF;const ew=c.measureText(en).width;c.fillStyle='rgba(6,7,12,.62)';rr(c,-ew/2-18,34,ew+36,48,12);c.fill();c.fillStyle='#fff';c.fillText(en,0,70);c.restore()}
// finishing: grade, vignette, single grain .045
function finish(c,seed,tint='rgba(40,36,120,.22)'){c.save();c.globalCompositeOperation='soft-light';c.fillStyle=tint;c.fillRect(0,0,W,H);c.restore();
 c.fillStyle=rg(c,540,900,W*.35,H*.72,[[0,'rgba(0,0,0,0)'],[1,'rgba(2,3,10,.55)']]);c.fillRect(0,0,W,H);
 c.fillStyle=lg(c,0,0,0,H,[[0,'rgba(3,4,12,.45)'],[.14,'rgba(3,4,12,0)'],[.86,'rgba(3,4,12,0)'],[1,'rgba(3,4,12,.55)']]);c.fillRect(0,0,W,H);
 const R=mulberry32(seed);c.save();c.globalCompositeOperation='overlay';c.globalAlpha=.045;const nt=noiseTile();for(let k=0;k<2;k++)c.drawImage(nt,0,0,256,256,-R()*256,-R()*256,W+300,H+300);c.restore()}

// backlit silhouette of a person with a thin warm/cold rim
const _sil={};function silhouette(c,p,rimCol='rgba(255,190,110,1)',fill='#06060e'){const k=_sil.c||(_sil.c=mk(W,H)),d=k.getContext('2d');d.setTransform(1,0,0,1,0,0);d.globalCompositeOperation='source-over';d.clearRect(0,0,W,H);person(d,p,0);d.globalCompositeOperation='source-atop';d.fillStyle=rimCol;d.fillRect(0,0,W,H);
 c.save();c.globalAlpha=.9;c.drawImage(k,-3,-2);c.drawImage(k,3,-2);c.restore();d.fillStyle=fill;d.fillRect(0,0,W,H);c.drawImage(k,0,0)}
// ground stipple helper (lighter specks in dark masses, like ref)
function speck(c,x,y,w,h,seed){stip(c,x,y,w,h,40,'rgba(0,0,0,.55)',seed);stip(c,x,y,w,h,14,'rgba(170,170,240,.35)',seed+1)}
