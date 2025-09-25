
function qs(s,ctx=document){return ctx.querySelector(s)}
function qsa(s,ctx=document){return Array.from(ctx.querySelectorAll(s))}
function setActiveNav(){
  const path=location.pathname.split('/').pop()||'index.html';
  qsa('.link').forEach(a=>{const href=a.getAttribute('href'); if((path==='index.html'&&href==='index.html')|| (href&&path===href.split('/').pop())) a.style.background='#eaf7f8'});
}
document.addEventListener('DOMContentLoaded', setActiveNav);
async function ensureLeaflet(){
  if(window.L) return true;
  await Promise.all([
    new Promise(r=>{const s=document.createElement('link');s.rel='stylesheet';s.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(s);s.onload=r;}),
    new Promise(r=>{const s=document.createElement('script');s.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';document.head.appendChild(s);s.onload=r;}),
  ]);
  return true;
}
