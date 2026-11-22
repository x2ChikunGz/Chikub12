// ===== side-view actor rig (profile), auto-grounded walk, rim light =====
// units at s=1: thigh 88, shin 86, torso 108, head r 23  (~330px tall)
const ACT={th:88,sh:86,to:108,ua:64,fa:60};
function legPose(p){// walk phase p in [0,1): thigh angle (0=down,+fwd), knee bend
 const a=.42*Math.cos(2*Math.PI*p);let k;if(p<.5){k=.06+.16*Math.sin(2*Math.PI*p)}else{const u=(p-.5)/.5;k=.06+1.05*Math.pow(Math.sin(Math.PI*u),1.2)*(1-.25*u)}return [a,k]}
function ankle(a,k){return [ACT.th*Math.sin(a)+ACT.sh*Math.sin(a-k),ACT.th*Math.cos(a)+ACT.sh*Math.cos(a-k)]}
// pixels per second for a given cycle time & scale, so the planted foot does not slide
function walkSpeed(T,s){const [a0,k0]=legPose(0),[a1,k1]=legPose(.5);return (ankle(a0,k0)[0]-ankle(a1,k1)[0])/(T*.5)*s}
const _act={};
// o: {x,y(ground),s,f(+1 right),phase|null, legs:[[a,k],[a,k]], lean, head, arms:{near:[u,e],far:[u,e]}, umbrella, jacket, pants, skin, hair, sil, rim:{x,y,col}, eye}
function actor(c,o){const s=o.s||1,f=o.f||1;const off=_act.c||(_act.c=mk(W,H)),d=off.getContext('2d');d.setTransform(1,0,0,1,0,0);d.globalCompositeOperation='source-over';d.clearRect(0,0,W,H);
 d.translate(o.x,o.y);d.scale(f*s,s);drawActor(d,o);
 // rim light: tinted copy offset toward the light, then the actor on top
 for(const rm of (o.rims||(o.rim?[o.rim]:[]))){const r=_act.r||(_act.r=mk(W,H)),q=r.getContext('2d');q.setTransform(1,0,0,1,0,0);q.globalCompositeOperation='source-over';q.clearRect(0,0,W,H);q.drawImage(off,0,0);q.globalCompositeOperation='source-in';q.fillStyle=rm.col;q.fillRect(0,0,W,H);
  c.save();c.globalAlpha=rm.a??.95;c.drawImage(r,rm.x,rm.y);c.restore()}
 if(o.sil){const q=off.getContext('2d');q.setTransform(1,0,0,1,0,0);q.globalCompositeOperation='source-atop';q.fillStyle=o.sil;q.fillRect(0,0,W,H)}
 c.drawImage(off,0,0);
 if(o.eye){// glowing eye (profile) in screen coords
  const hp=_act.head;bloom(c,o.x+f*s*hp[0],o.y+s*hp[1],7*s,o.eye,.9);c.fillStyle='#ffd0c0';c.beginPath();c.arc(o.x+f*s*hp[0],o.y+s*hp[1],2.4*s,0,7);c.fill()}
 if(o.shadow!==false){c.save();c.globalAlpha=o.shadowA??.45;c.fillStyle='#000';c.filter='blur('+(6*s)+'px)';c.beginPath();c.ellipse(o.x+(_act.cx||0)*f*s,o.y+3*s,70*s,9*s,0,0,7);c.fill();c.restore()}}
function drawActor(d,o){const J=o.jacket||'#2c3558',JL=o.jacketL||'#3d4a78',P=o.pants||'#1a1d2e',PL=o.pantsL||'#262a40',SK=o.skin||'#d9a184',SKD=o.skinD||'#b07a62',HR=o.hair||'#141019',SH=o.shoe||'#0f0f16';
 const p=o.phase;let L1,L2;if(o.legs){[L1,L2]=o.legs}else{L1=legPose(p);L2=legPose((p+.5)%1)}
 const e1=ankle(...L1),e2=ankle(...L2);const hipY=-Math.max(e1[1],e2[1])-9;// grounded
 const hip=[(o.hipDx||0),hipY];_act.cx=hip[0];
 const lean=o.lean||0;const shd=[hip[0]+ACT.to*Math.sin(lean),hip[1]-ACT.to*Math.cos(lean)];
 const swing=p==null?0:.36*Math.cos(2*Math.PI*p);
 const armNear=o.arms&&o.arms.near||[-swing,.25+.18*Math.max(0,-Math.cos(2*Math.PI*p))];const armFar=o.arms&&o.arms.far||[swing,.25+.18*Math.max(0,Math.cos(2*Math.PI*p))];
 const seg=(x,y,a,len,w0,w1,col)=>{const ex=x+len*Math.sin(a),ey=y+len*Math.cos(a),nx=Math.cos(a),ny=-Math.sin(a);d.fillStyle=col;d.beginPath();d.moveTo(x+nx*w0/2,y+ny*w0/2);d.lineTo(ex+nx*w1/2,ey+ny*w1/2);d.arc(ex,ey,w1/2,Math.atan2(ny,nx),Math.atan2(ny,nx)+Math.PI);d.lineTo(x-nx*w0/2,y-ny*w0/2);d.arc(x,y,w0/2,Math.atan2(-ny,-nx),Math.atan2(-ny,-nx)+Math.PI);d.fill();return [ex,ey]};
 const leg=(L,dark)=>{const [a,k]=L;const kn=seg(hip[0],hip[1],a,ACT.th,24,19,dark?'#12141f':P);const an=seg(kn[0],kn[1],a-k,ACT.sh,19,14,dark?'#12141f':P);
  if(!dark){d.fillStyle=PL;d.globalAlpha=.5;seg(hip[0]+4*Math.cos(a),hip[1],a,ACT.th,8,6,PL);d.globalAlpha=1}
  const planted=an[1]>-14;const fa=planted?0:Math.max(-.6,Math.min(.5,(a-k)*.7));d.save();d.translate(an[0],an[1]);d.rotate(-fa);d.fillStyle=SH;rr(d,-9,-6,40,13,6);d.fill();d.fillStyle='rgba(255,255,255,.12)';d.fillRect(-8,4,38,3);d.restore()};
 const arm=(A,dark,hold)=>{const [u,e]=A;const el=seg(shd[0],shd[1]+6,u,ACT.ua,dark?17:19,15,dark?'#1c2240':J);const ha=seg(el[0],el[1],u+e,ACT.fa,15,12,dark?'#1c2240':J);d.fillStyle=dark?SKD:SK;d.beginPath();d.ellipse(ha[0]+4*Math.sin(u+e),ha[1]+4*Math.cos(u+e),7,8.5,0,0,7);d.fill();return ha};
 // far side
 arm(armFar,true);leg(L2,true);
 // torso (profile): back edge / chest
 const T=t=>[hip[0]+(shd[0]-hip[0])*t,hip[1]+(shd[1]-hip[1])*t];const nx=Math.cos(lean),ny=Math.sin(lean);
 const back=[0,.3,.6,.9,1].map(t=>{const q=T(t),w=[-16,-15,-15,-16,-12][[0,.3,.6,.9,1].indexOf(t)];return [q[0]+nx*w,q[1]+ny*w]}),front=[1,.85,.6,.3,0,-.08].map(t=>{const q=T(Math.max(0,t)),w={1:12,.85:19,.6:18,.3:15,0:17,'-0.08':17}[t];return [q[0]+nx*w,q[1]+ny*w+(t<0?10:0)]});
 d.fillStyle=lg(d,hip[0]-20,0,hip[0]+22,0,[[0,J],[1,JL]]);d.beginPath();back.forEach((q,i)=>i?d.lineTo(q[0],q[1]):d.moveTo(q[0],q[1]));front.forEach(q=>d.lineTo(q[0],q[1]));d.closePath();d.fill();
 d.strokeStyle='rgba(0,0,0,.25)';d.lineWidth=2;d.beginPath();const z0=T(.15),z1=T(.95);d.moveTo(z0[0]+nx*14,z0[1]+ny*14);d.lineTo(z1[0]+nx*11,z1[1]+ny*11);d.stroke();// zip line
 // near leg
 leg(L1,false);
 if(o.skirt){const k1=[hip[0]+ACT.th*Math.sin(L1[0]),hip[1]+ACT.th*Math.cos(L1[0])],k2=[hip[0]+ACT.th*Math.sin(L2[0]),hip[1]+ACT.th*Math.cos(L2[0])];const lo=Math.max(k1[1],k2[1])+34;const xa=Math.min(k1[0],k2[0])-22,xb=Math.max(k1[0],k2[0])+22;
  d.save();d.beginPath();d.moveTo(hip[0]-19,hip[1]-6);d.lineTo(hip[0]+19,hip[1]-6);d.quadraticCurveTo(xb+4,(hip[1]+lo)/2,xb,lo);d.lineTo(xa,lo);d.quadraticCurveTo(xa-4,(hip[1]+lo)/2,hip[0]-19,hip[1]-6);d.closePath();d.fillStyle=o.skirt[0];d.fill();d.clip();
  for(let y=hip[1];y<lo+4;y+=9){d.fillStyle=((y-hip[1])/9|0)%3===0?o.skirt[1]:'rgba(0,0,0,.12)';d.fillRect(xa-20,y,xb-xa+40,3)}d.fillStyle=o.skirt[2]||o.skirt[1];d.fillRect(xa-20,lo-16,xb-xa+40,16);d.fillStyle='rgba(0,0,0,.18)';d.fillRect(hip[0],hip[1]-6,40,lo);d.restore()}
 // neck + head (profile)
 const hd=o.head||0;const nk=[shd[0]+3*Math.sin(lean),shd[1]-3];d.fillStyle=SKD;d.save();d.translate(nk[0],nk[1]);d.rotate(lean*.6+hd);d.fillRect(-5,-16,11,18);
 const hs=o.headScale||1;d.translate(2,-38*hs);d.scale(hs,hs);_act.head=[nk[0]+14*hs,nk[1]-40*hs];
 d.fillStyle=SK;d.beginPath();d.arc(0,0,23,0,7);d.fill();// skull
 d.beginPath();d.moveTo(14,-14);d.quadraticCurveTo(24,-8,23,0);d.lineTo(29,7);d.lineTo(23,10);d.quadraticCurveTo(22,18,13,22);d.lineTo(0,22);d.closePath();d.fill();// face, nose
 d.fillStyle=SKD;d.globalAlpha=.6;d.beginPath();d.arc(-3,3,5.5,0,7);d.fill();d.globalAlpha=1;// ear
 d.fillStyle=HR;d.beginPath();d.moveTo(-23,8);d.quadraticCurveTo(-28,-20,-4,-25);d.quadraticCurveTo(18,-27,24,-10);d.lineTo(14,-11);d.quadraticCurveTo(4,-14,-6,-6);d.quadraticCurveTo(-12,4,-14,12);d.closePath();d.fill();
 if(o.hairLong){d.fillStyle=HR;d.beginPath();d.moveTo(-6,-22);d.quadraticCurveTo(-34,-10,-30,30);d.quadraticCurveTo(-26,58,-12,62);d.quadraticCurveTo(-16,30,-8,8);d.closePath();d.fill()}
 d.fillStyle='rgba(220,110,110,.25)';d.beginPath();d.ellipse(12,8,6,4,0,0,7);d.fill();
 const wd=o.wide||0;if(wd>0){d.fillStyle='#f3eee8';d.beginPath();d.ellipse(15,-3,4.5*(1+wd*.3),3.4*(1+wd),0,0,7);d.fill()}d.fillStyle='#120e14';d.beginPath();d.ellipse(15+(o.look||0)*2,-3,2.4,o.blink?0.6:3,0,0,7);d.fill();if(o.lash){d.strokeStyle='#120e14';d.lineWidth=1.5;d.beginPath();d.moveTo(14,-6);d.lineTo(19,-8);d.stroke()}d.strokeStyle='rgba(90,45,40,.6)';d.lineWidth=1.6;d.beginPath();d.moveTo(19,14);d.lineTo(14,15);d.stroke();
 d.restore();
 // near arm (+umbrella)
 const hand=arm(armNear,false);
 if(o.umbrella){const us=o.umbrella.scale||.82;const tx=hand[0]+4,ty=hand[1]-4,topY=ty-200*us,tilt=o.umbrella.tilt||.08;d.strokeStyle='#1a1a22';d.lineWidth=4;d.beginPath();d.moveTo(tx,ty+14);d.lineTo(tx+200*us*Math.sin(tilt),topY);d.stroke();
  d.save();d.translate(tx+200*us*Math.sin(tilt),topY);d.rotate(tilt);d.scale(us,us);d.fillStyle=o.umbrella.col||'#14141c';d.beginPath();d.moveTo(-120,26);d.quadraticCurveTo(-110,-50,0,-56);d.quadraticCurveTo(110,-50,120,26);for(let i=0;i<6;i++){const x0=120-i*40;d.quadraticCurveTo(x0-20,14,x0-40,26)}d.closePath();d.fill();
  d.strokeStyle='rgba(255,255,255,.08)';d.lineWidth=2;for(let i=-2;i<=2;i++){d.beginPath();d.moveTo(0,-56);d.quadraticCurveTo(i*30,-30,i*48,22);d.stroke()}d.restore()}}
