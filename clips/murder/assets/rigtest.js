const FRAMES=[1];function drawFrame(k,canvas){const c=canvas.getContext('2d');c.setTransform(1,0,0,1,0,0);c.fillStyle='#3a3f5c';c.fillRect(0,0,W,H);c.fillStyle='#22263a';c.fillRect(0,700,W,40);c.fillRect(0,1500,W,40);
 for(let i=0;i<8;i++)actor(c,{x:70+i*130,y:700,s:.75,f:1,phase:i/8,rim:{x:-3,y:-1,col:'rgba(150,170,255,1)',a:.9}});
 actor(c,{x:300,y:1500,s:1.6,f:1,phase:.15,arms:{near:[.35,-2.75]},umbrella:{tilt:.06},rim:{x:4,y:-2,col:'rgba(255,190,110,1)'}});
 actor(c,{x:800,y:1500,s:1.6,f:-1,legs:[[.05,.08],[-.05,.06]],arms:{near:[.05,.15],far:[-.05,.15]},sil:'#06060c',eye:'rgba(255,40,40,1)'});
 tx(c,'speed px/s @T=1.1,s=1.5: '+walkSpeed(1.1,1.5).toFixed(0),540,1700,40,'#fff')}
