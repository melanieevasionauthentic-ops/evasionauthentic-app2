
// Helpers
const $=(q)=>document.querySelector(q), $$=(q)=>Array.from(document.querySelectorAll(q));
function jourFrancais(d){return ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'][d]}
function setTabFromHash(){const id=(location.hash||'#accueil').replace('#','');$$('.view').forEach(v=>v.classList.remove('active'));document.getElementById(id)?.classList.add('active');$$('#nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('data-tab')===id)); if(id==='lieux'&&window._map)setTimeout(()=>_map.invalidateSize(),150); if(id==='marches'&&window._mapMarkets)setTimeout(()=>_mapMarkets.invalidateSize(),150); if(id==='roadtrips'&&window._mapTrips)setTimeout(()=>_mapTrips.invalidateSize(),150)};
window.addEventListener('hashchange', setTabFromHash);

document.addEventListener('DOMContentLoaded',()=>{
  setTabFromHash();
  $('#burger').addEventListener('click',()=>$('#nav').classList.toggle('show'));
  $('#tel').textContent=APP_DATA.phone; $('#wa').textContent=APP_DATA.phone; $('#wa').href='https://wa.me/'+APP_DATA.phone.replace(/\D/g,''); $('#wa2').href='https://wa.me/'+APP_DATA.phone.replace(/\D/g,'');
  initPlaces(); initMarkets(); initTrips(); renderExcursions(); renderFetes();
});

function guardMap(map,btn){map.dragging.disable(); map.touchZoom.disable(); map.scrollWheelZoom.disable(); btn.style.display='block'; btn.addEventListener('click',()=>{map.dragging.enable(); map.touchZoom.enable(); map.scrollWheelZoom.enable(); btn.style.display='none';});}

// Places
let _map,_placesLayer;
function initPlaces(){_map=L.map('map',{scrollWheelZoom:false,dragging:true}).setView([39.66,3.0],9); L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap'}).addTo(_map); _placesLayer=L.layerGroup().addTo(_map); guardMap(_map,$('#enable-map'));
  const box=$('#places'); box.innerHTML=''; _placesLayer.clearLayers();
  APP_DATA.places.forEach(p=>{const [title,type,pos,img,desc]=p; const card=document.createElement('div'); card.className='card'; card.innerHTML=`<img src="${img}" alt="${title}"><div class="pad"><h3>${title}</h3><div class="badge">${pos.zone}</div><p>${desc}</p><button class="cta small">Voir sur la carte</button></div>`; box.appendChild(card); const m=L.marker([pos.lat,pos.lng]).addTo(_placesLayer).bindPopup(`<strong>${title}</strong><br>${desc}`); card.querySelector('button').addEventListener('click',()=>{location.hash='#lieux'; setTimeout(()=>{_map.setView([pos.lat,pos.lng],12); m.openPopup(); window.scrollTo({top:document.querySelector('.topbar').offsetHeight+6,behavior:'smooth'});},120);});}); const input=$('#global-search'),res=$('#search-results'); input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase(); if(!q){res.innerHTML='';return;} const items=[]; APP_DATA.places.forEach(p=>items.push({type:'Lieu',title:p[0],img:p[3]})); APP_DATA.excursions_plus.forEach(e=>items.push({type:'Excursion',title:e.titre,img:e.img})); APP_DATA.itineraires.forEach(rt=>items.push({type:'Road trip',title:rt.titre})); const list=items.filter(it=>it.title.toLowerCase().includes(q)).slice(0,12); res.innerHTML=list.map(it=>`<div class="card"><img src="${it.img||'assets/photos/Palma-de-Mallorca-et-sa-cathedrale-9.jpg'}"><div class="pad"><h3>${it.title}</h3><div class="badge">${it.type}</div></div></div>`).join('');});}

// Markets
let _mapMarkets,_marketLayer;
function initMarkets(){_mapMarkets=L.map('map-markets',{scrollWheelZoom:false,dragging:true}).setView([39.65,3.0],9); L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap'}).addTo(_mapMarkets); _marketLayer=L.layerGroup().addTo(_mapMarkets); guardMap(_mapMarkets,$('#enable-map-markets'));
  const list=$('#markets'),j=$('#filter-jour'),z=$('#filter-zone'),btn=$('#btn-today');
  const draw=()=>{const jf=j.value,zf=z.value; const data=APP_DATA.markets.filter(m=>(jf==='Tous'||m.jour===jf)&&(zf==='Toutes'||m.zone===zf)); list.innerHTML=data.map(m=>`<div class="card"><div class="pad"><h3>${m.ville}</h3><div class="badge">${m.jour}</div><div class="badge">${m.zone}</div><button class="cta small" data-ville="${m.ville}">Voir sur la carte</button></div></div>`).join(''); _marketLayer.clearLayers(); data.forEach(m=>{const c=APP_DATA.coords[m.ville]; if(!c) return; L.marker([c.lat,c.lng]).addTo(_marketLayer).bindPopup(`<strong>${m.ville}</strong><br>${m.jour} — ${m.zone}`);});};
  j.onchange=z.onchange=draw; btn.onclick=()=>{j.value=jourFrancais(new Date().getDay()); draw();}; draw();
  list.addEventListener('click',e=>{const b=e.target.closest('button[data-ville]'); if(!b) return; const v=b.getAttribute('data-ville'); const c=APP_DATA.coords[v]; if(c) _mapMarkets.setView([c.lat,c.lng],12);});
}

// Trips
let _mapTrips,_tripLayer;
function initTrips(){_mapTrips=L.map('map-trips',{scrollWheelZoom:false,dragging:true}).setView([39.73,2.85],9); L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap'}).addTo(_mapTrips); _tripLayer=L.layerGroup().addTo(_mapTrips); guardMap(_mapTrips,$('#enable-map-trips')); renderTrips();}
function renderTrips(){const c=$('#trips'); c.innerHTML=APP_DATA.itineraires.map(rt=>{const steps=rt.segments.map(s=>`<li><strong>${s.arret}</strong> — ${s.temps} · ${s.tips}</li>`).join(''); const g='https://www.google.com/maps/dir/'+rt.segments.map(s=>encodeURIComponent(s.arret+' Mallorca')).join('/'); return `<div class="card"><div class="pad"><h3>${rt.titre}</h3><p>${rt.resume}</p><ul>${steps}</ul><div class="links"><button class="cta small" data-trip="${rt.id}">Afficher sur la carte</button> <a class="cta ghost" href="${g}" target="_blank" rel="noopener">Ouvrir dans Google Maps</a></div></div></div>`;}).join('');
  c.addEventListener('click',e=>{const b=e.target.closest('button[data-trip]'); if(!b) return; const id=b.getAttribute('data-trip'); const rt=APP_DATA.itineraires.find(t=>t.id===id); if(!rt) return; _tripLayer.clearLayers(); const latlngs=[]; rt.segments.forEach(s=>{const c=APP_DATA.coords[s.arret]||APP_DATA.coords[s.arret.split(' (')[0]]; if(c){latlngs.push([c.lat,c.lng]); L.marker([c.lat,c.lng]).addTo(_tripLayer).bindPopup(`<strong>${s.arret}</strong><br>${s.tips}`);} }); if(latlngs.length>1){L.polyline(latlngs,{color:'#117a80',weight:4}).addTo(_tripLayer); _mapTrips.fitBounds(L.latLngBounds(latlngs).pad(0.2));} location.hash='#roadtrips'; setTimeout(()=>{window.scrollTo({top:document.querySelector('.topbar').offsetHeight+6,behavior:'smooth'});},80);});}

// Fêtes + Excursions
function renderFetes(){const c=$('#fetes-list'); c.innerHTML=APP_DATA.fetes.map(f=>`<div class="card"><div class="pad"><h3>${f.titre}</h3><div class="badge">${f.lieu}</div><p>${f.details}</p></div></div>`).join('');}
function renderExcursions(){const c=$('#exc-list'); c.innerHTML=APP_DATA.excursions_plus.map(e=>`<a class="card" href="${e.url}" target="_blank" rel="noopener"><img src="${e.img}" alt="${e.titre}"><div class="pad"><h3>${e.titre}</h3></div></a>`).join('');}
