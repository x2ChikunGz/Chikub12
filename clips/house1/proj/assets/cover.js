// EP1 cover: TV glow in the dark living room, figure behind her (from the reveal) + title
function drawCoverOn(canvas){const c=canvas.getContext('2d');c.setTransform(1,0,0,1,0,0);c.fillStyle='#05060c';c.fillRect(0,0,W,H);
 c.save();camL(c,2.4,510,930);c.drawImage(L4room(),0,0);c.save();c.beginPath();rr(c,360,820,300,260,24);c.clip();tvPic(c,0,2);c.restore();c.restore();
 darkness(c,.5,[[540,900,760,.95]],'4,4,12');c.save();c.globalCompositeOperation='screen';c.globalAlpha=.4;c.fillStyle=rg(c,540,900,30,800,[[0,'rgba(150,175,255,.9)'],[1,'rgba(0,0,0,0)']]);c.fillRect(0,0,W,H);c.restore();
 c.fillStyle=lg(c,0,1000,0,1750,[[0,'rgba(4,5,12,0)'],[1,'rgba(4,5,12,.85)']]);c.fillRect(0,1000,W,750);
 c.save();c.globalCompositeOperation='overlay';c.globalAlpha=.06;c.drawImage(noiseTile(),0,0,W,H);c.restore();
 c.font='800 44px '+HF;const sub='EP.1 · เสียงจากทีวี',sw=c.measureText(sub).width;c.fillStyle='rgba(6,8,18,.75)';rr(c,540-sw/2-30,1118,sw+60,76,38);c.fill();tx(c,sub,540,1171,44,'#fff');
 c.font='800 120px '+HF;const w1=c.measureText('ใครยืนอยู่').width;c.fillStyle=P.red;rr(c,540-w1/2-40,1220,w1+80,180,26);c.fill();tx(c,'ใครยืนอยู่',540,1350,120,'#fff');
 c.font='800 118px '+HF;c.lineWidth=22;c.lineJoin='round';c.strokeStyle='#05060c';c.textAlign='center';c.strokeText('ข้างหลังเธอ',540,1545);c.fillStyle='#ffc857';c.fillText('ข้างหลังเธอ',540,1545);credit(c)}
