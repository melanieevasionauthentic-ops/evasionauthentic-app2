function base(){return location.pathname.includes('/pages/') ? '../' : './'}
(function(){
  const b=base();
  const header=document.createElement('div');
  header.className='header';
  header.innerHTML=`<div class="wrap">
    <a href="${b}index.html" class="brand"><img class="logo" src="${b}assets/img/logo.png" alt="logo">Evasion Authentic</a>
    <nav class="nav">
      <a href="${b}pages/excursions.html">Excursions</a>
      <a href="${b}pages/roadtrips.html">Road trips</a>
      <a href="${b}pages/restaurants.html">Restaurants</a>
      <a href="${b}pages/glaciers.html">Glaciers</a>
      <a href="${b}pages/photospots.html">Spots photo</a>
      <a href="${b}pages/marches.html">Marchés</a>
      <a href="${b}pages/fetes.html">Fêtes</a>
      <a href="${b}pages/lieux.html">Lieux</a>
      <a href="${b}pages/conciergerie.html">Conciergerie</a>
    </nav>
  </div>`;
  document.body.prepend(header);
})(); 
async function ensureLeaflet(){ if(window.L) return true;
  await Promise.all([
    new Promise(r=>{const l=document.createElement('link');l.rel='stylesheet';l.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(l);l.onload=r}),
    new Promise(r=>{const s=document.createElement('script');s.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';document.head.appendChild(s);s.onload=r})
  ]); return true; }