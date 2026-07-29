const dialogs=[
'Hola mi princesa...',
'Sé que vienen días difíciles, pero no tienes que pasarlos sola.',
'Quiero ser tu refugio, cuidarte y consentirte.',
'Prepararte tu comida favorita y darte muchos abrazos.',
'Te amo muchísimo. Gracias por existir. ❤️'
];
const video=document.getElementById('intro-video');
const sv=document.getElementById('scene-video');
const sd=document.getElementById('scene-dialog');
const sf=document.getElementById('scene-final');
const txt=document.getElementById('dialog-text');
let i=0;
function show(a){document.querySelectorAll('.scene').forEach(s=>s.classList.remove('active'));a.classList.add('active')}
video.onended=()=>{show(sd);music();type(dialogs[0]);};
function type(t){txt.textContent='';let n=0;let id=setInterval(()=>{txt.textContent+=t[n++]||'';if(n>t.length)clearInterval(id)},35)}
sd.onclick=()=>{if(i<dialogs.length-1){i++;type(dialogs[i]);}else{show(sf);}}
function music(){let c=document.getElementById('youtube-container');c.innerHTML='<iframe width=1 height=1 style="position:absolute;left:-9999px" allow="autoplay" src="https://www.youtube.com/embed/8ovn4JUL3LA?autoplay=1&loop=1&playlist=8ovn4JUL3LA"></iframe>'; }