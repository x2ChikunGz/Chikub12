// ===== cover (thumbnail) for mirror3: drawn with the clip's own engine =====
// safe zone: key content inside y 1100-1560 (survives the 3:4 profile-grid crop and app UI)
function drawCoverOn(canvas){
 const c=canvas.getContext('2d');c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation='source-over';c.globalAlpha=1;c.filter='none';
 c.fillStyle='#05060c';c.fillRect(0,0,W,H);
 const T=2.3;c.save();camW(c,0,{cx:1285,cy:860,z:1.8});
 scene(c,T,{lamp:.55,slip:1.15,moon:1.3,mc:g=>{g.fillStyle='#030409';g.fillRect(-200,-400,400,800);smileGhost(g,0,-150,.78,T,1)},mo:{g0:'#050610',g1:'#020207'}});c.restore();
 darkness(c,.9,[hole(MX,MY,440,.8),hole(970,1060,460,.55)],'8,8,22');
 // grade + paper + vignette (same as renderAt)
 c.save();c.globalCompositeOperation='soft-light';c.fillStyle='rgba(45,40,120,.28)';c.fillRect(0,0,W,H);c.globalCompositeOperation='screen';c.fillStyle='rgba(150,160,255,.08)';c.fillRect(0,0,W,H);c.restore();
 c.save();c.globalCompositeOperation='overlay';c.globalAlpha=.3;c.drawImage(paperFrame(),0,0);c.restore();
 c.fillStyle=rg(c,540,820,W*.3,H*.68,[[0,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.6)']]);c.fillRect(0,0,W,H);
 // bottom shade for text
 c.fillStyle=lg(c,0,1000,0,1700,[[0,'rgba(4,5,12,0)'],[1,'rgba(4,5,12,.78)']]);c.fillRect(0,1000,W,700);
 // text
 const stroke=(s,x,y,fs,fill,sw)=>{c.font='800 '+fs+'px '+HF;c.textAlign='center';c.lineJoin='round';c.lineWidth=sw;c.strokeStyle='#05060c';c.strokeText(s,x,y);c.fillStyle=fill;c.fillText(s,x,y)};
 // top hook pill
 c.font='800 44px '+HF;const sub='คืนนี้ คุณต้องนอนเฝ้าบ้านยายคนเดียว',sw=c.measureText(sub).width;
 c.fillStyle='rgba(6,8,18,.72)';rr(c,540-sw/2-30,1118,sw+60,76,38);c.fill();c.strokeStyle='rgba(255,255,255,.16)';c.lineWidth=2;c.stroke();tx(c,sub,540,1171,44,'#fff');
 // red box + big title
 c.font='800 150px '+HF;const w1=c.measureText('ห้ามเปิด').width;c.fillStyle=P.red;rr(c,540-w1/2-44,1218,w1+88,200,28);c.fill();
 stroke('ห้ามเปิด',540,1382,150,'#fff',0);
 stroke('ผ้าคลุมกระจก',540,1562,132,'#ffc857',22);
 // channel chip (standard position)
 credit(c);
}
