// ===== post + render =====
const GRADE={cold:['rgba(50,60,140,.24)','rgba(150,170,240,.10)'],sepia:['rgba(120,70,30,.28)','rgba(255,200,140,.14)'],night:['rgba(45,40,120,.28)','rgba(150,160,255,.08)'],warm:['rgba(110,70,40,.15)','rgba(255,220,170,.10)'],red:['rgba(120,10,20,.30)','rgba(255,120,120,.08)'],doc:['rgba(60,70,60,.22)','rgba(220,230,200,.08)']};
const hitR=()=>HIT2();
let GL=null;function glitches(){if(GL)return GL;GL=[[L(1)+.05,.12],[L(1)+.9,.14],[LE(8)-.4,.14],[L(10)+1.6,.12],[L(15)+1.0,.1],[hitR(),.22],[L(23)+1.2,.18]];return GL}
const FLASH=()=>[[hitR(),.12],[L(1)+.92,.06]];
const SCR=mk(W,H),SX=SCR.getContext('2d');
function renderAt(t,canvas){const c=canvas.getContext('2d');c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation='source-over';c.globalAlpha=1;c.filter='none';
 let i=0;for(let k=0;k<SH.length;k++)if(t>=SH[k].a)i=k;const sh=SH[i],lt=t-sh.a,d=sh.b-sh.a;
 const s=SX;s.setTransform(1,0,0,1,0,0);s.globalAlpha=1;s.globalCompositeOperation='source-over';s.filter='none';s.fillStyle='#000';s.fillRect(0,0,W,H);
 s.save();s.translate(noise(t*.35,1)*5,noise(t*.3,4)*5);sh.fn(s,t,lt,d);s.restore();if(sh.atm)atmos(s,t,sh.atm);
 // grade: shadows multiply tint + highlight screen tint
 const g=GRADE[sh.grade]||GRADE.cold;s.save();s.globalCompositeOperation='soft-light';s.fillStyle=g[0];s.fillRect(0,0,W,H);s.globalCompositeOperation='screen';s.fillStyle=g[1];s.fillRect(0,0,W,H);s.restore();
 // printed-paper texture (static) + top/bottom falloff like ref
 s.save();s.globalCompositeOperation='overlay';s.globalAlpha=.26;s.drawImage(paperFrame(),0,0);s.restore();
 s.save();s.fillStyle=lg(s,0,0,0,H,[[0,'rgba(5,6,14,.55)'],[.16,'rgba(5,6,14,0)'],[.84,'rgba(5,6,14,0)'],[1,'rgba(5,6,14,.6)']]);s.fillRect(0,0,W,H);s.restore();
 // lifted blacks (phone-friendly)
 s.save();s.globalCompositeOperation='lighten';s.fillStyle='rgb(9,10,14)';s.fillRect(0,0,W,H);s.restore();
 // glitch / chromatic aberration
 let gl=0;for(const [a,du] of glitches())if(t>=a&&t<a+du)gl=1-(t-a)/du;
 c.fillStyle='#000';c.fillRect(0,0,W,H);
 if(gl>0){const fi=Math.floor(t*30),R=mulberry32(fi*13+1);const off=18*gl;c.globalCompositeOperation='lighter';
  c.globalAlpha=1;c.filter='none';
  // channel split via tinted copies
  for(const [dx,col] of [[-off,'#ff0000'],[0,'#00ff00'],[off,'#0000ff']]){const k=layer('ch'+col,W,H,()=>{}),kc=k.getContext('2d');kc.globalCompositeOperation='source-over';kc.clearRect(0,0,W,H);kc.drawImage(SCR,0,0);kc.globalCompositeOperation='multiply';kc.fillStyle=col;kc.fillRect(0,0,W,H);c.drawImage(k,dx,0)}
  c.globalCompositeOperation='source-over';for(let n=0;n<7;n++){const y=R()*H,h=10+R()*90,dx=(R()-.5)*120*gl;c.drawImage(SCR,0,y,W,h,dx,y,W,h)}}
 else c.drawImage(SCR,0,0);
 c.globalCompositeOperation='source-over';
 // subtle edge chroma always (lens)
 c.save();c.globalAlpha=.10;c.globalCompositeOperation='screen';c.drawImage(SCR,-3,0,W+6,H);c.restore();
 // vignette
 c.fillStyle=rg(c,540,900,W*.32,H*.68,[[0,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.62)']]);c.fillRect(0,0,W,H);
 // flicker exposure
 const fl=noise(t*9,7)*.03;if(fl>0){c.fillStyle='rgba(255,230,200,'+fl+')';c.fillRect(0,0,W,H)}
 // flashes
 for(const [a,du] of FLASH())if(t>=a&&t<a+du){c.fillStyle='rgba(255,255,255,'+(.85*(1-(t-a)/du))+')';c.fillRect(0,0,W,H)}
 // grain (single layer .045)
 const fi=Math.floor(t*30),R=mulberry32(fi*7+3);c.save();c.globalCompositeOperation='overlay';c.globalAlpha=.045;const nt=noiseTile();for(let k=0;k<2;k++)c.drawImage(nt,0,0,256,256,-R()*256,-R()*256,W+300,H+300);c.restore();
 // cut dip
 if(i>0&&lt<.07){c.fillStyle='rgba(0,0,0,'+(.75*(1-lt/.07))+')';c.fillRect(0,0,W,H)}
 // black beat before Q and silence before re-hook handled by shots; intro fade
 if(t<.25){c.fillStyle='rgba(0,0,0,'+(1-t/.25)+')';c.fillRect(0,0,W,H)}
 caps(c,t);credit(c);
 if(t>=DUR-.6){c.fillStyle='rgba(0,0,0,'+clamp((t-(DUR-.6))/.5)+')';c.fillRect(0,0,W,H)}}
// captions (caps2 motion) at y=1500
const CEND=CAPS.map((q,i)=>{const nx=CAPS[i+1];let e=q[1]+.14;const mn=q[0]+.55;if(e<mn)e=mn;if(nx&&e>nx[0]-.02)e=nx[0]-.02;return e});
const _e3=x=>{x=clamp(x);return 1-Math.pow(1-x,3)};
const _soft=x=>{x=clamp(x);const c1=.9,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
function caps(c,t){for(let i=0;i<CAPS.length;i++){const [a,b,s,en,m]=CAPS[i];const end=CEND[i];if(t<a-.02||t>=end)continue;
 const tin=t-a,OUT=Math.min(.16,(end-a)*.35),pout=_e3((end-t)/OUT),pin=_e3(tin/.3);const al=clamp(tin/.16)*pout;const dy=(1-pin)*38-(1-pout)*14;
 const sc=(.9+.1*_soft(tin/.34))*(1+.025*clamp(tin/(end-a)))*(1-(1-pout)*.04);const bl=(1-clamp(tin/.2))*7+(1-pout)*3;
 c.save();c.globalAlpha=al;c.translate(540,1500+dy);c.scale(sc,sc);const fs=s.length>26?50:s.length>19?58:68;c.font='800 '+fs+'px '+HF;const w=c.measureText(s).width;
 if(bl>.4)c.filter='blur('+bl.toFixed(1)+'px)';
 if(m===2){const bw=(w+52)*_e3(tin/.32);c.fillStyle=P.red;rr(c,-bw/2,-fs*.95,bw,fs*1.5,18);c.fill()}else{c.lineWidth=12;c.strokeStyle='#07080d';c.lineJoin='round';c.textAlign='center';c.strokeText(s,0,0)}
 c.textAlign='center';c.fillStyle=m===1?'#ffc857':'#fff';c.fillText(s,0,0);c.filter='none';
 const ta=clamp((tin-.08)/.18)*pout,ty=(1-_e3((tin-.08)/.3))*16;c.globalAlpha=al*ta;c.font='800 32px '+HF;const ew=c.measureText(en).width;c.fillStyle='rgba(6,7,12,.62)';rr(c,-ew/2-18,34+ty,ew+36,48,12);c.fill();c.fillStyle='#fff';c.fillText(en,0,70+ty);c.restore()}}

// volumetric fog + light shafts
function atmos(c,t,a){if(a.ray){const [x,y,al]=a.ray;c.save();c.globalCompositeOperation='screen';for(let i=0;i<6;i++){const an=(a.ang||1.25)+(i-2.5)*.07+noise(t*.2,i)*.05,ln=1700;const w=60+i*25;c.save();c.translate(x,y);c.rotate(an);c.fillStyle=lg(c,0,0,ln,0,[[0,'rgba(200,215,255,'+(al*.22*(.6+.4*noise(t*.5,i+3)))+')'],[1,'rgba(200,215,255,0)']]);c.beginPath();c.moveTo(0,-w*.2);c.lineTo(ln,-w);c.lineTo(ln,w);c.lineTo(0,w*.2);c.fill();c.restore()}c.restore()}
 if(a.fog){const k=layer('fog',540,960,(d,w,h)=>{const R=mulberry32(5);for(let i=0;i<70;i++){const r=60+R()*160,x=r+R()*(w-2*r),y=r+R()*(h-2*r);d.fillStyle=rg(d,x,y,0,r,[[0,'rgba(170,185,210,.10)'],[1,'rgba(170,185,210,0)']]);d.fillRect(x-r,y-r,2*r,2*r)}});
  c.save();c.globalCompositeOperation='screen';c.globalAlpha=a.fog*.4;const ox=(t*18)%W;c.drawImage(k,-ox,-200,W,H+400);c.drawImage(k,W-ox,-200,W,H+400);c.globalAlpha=a.fog*.6;c.drawImage(k,(t*9)%W-W,100,W,H);c.drawImage(k,(t*9)%W,100,W,H);c.restore()}}
