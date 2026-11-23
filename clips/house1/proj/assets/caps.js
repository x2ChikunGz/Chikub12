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
