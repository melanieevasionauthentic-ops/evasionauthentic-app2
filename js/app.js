function $(q){return document.querySelector(q)}
function $all(q){return Array.from(document.querySelectorAll(q))}

const state = {map:null, markers:[], allMarkets:[]};

function setTab(hash){
  const id = (hash||'#accueil').replace('#','');
  $all('.view').forEach(v=>v.classList.remove('active'));
  const el = document.getElementById(id); if(el) el.classList.add('active');
  $all('nav a').forEach(a=>a.classList.toggle('active', a.getAttribute('data-tab')===id));
  if(id==='lieux' && state.map){ setTimeout(()=> state.map.invalidateSize(), 200); }
}
window.addEventListener('hashchange', ()=> setTab(location.hash));
setTab(location.hash||'#accueil');

$('#menuToggle').addEventListener('click', ()=> $('#mainNav').classList.toggle('open'));

function initMap(){
  state.map = L.map('map').setView([39.65, 3.0], 9);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '&copy; OpenStreetMap'
  }).addTo(state.map);
}

function renderPlaces(){
  const list = $('#placesList'); list.innerHTML='';
  state.markers.forEach(m=>m.remove()); state.markers=[];
  (APP_DATA.places||[]).forEach(p=>{
    const [title,type,pos,img,txt]=p;
    const card = document.createElement('article'); card.className='card';
    card.innerHTML = `<img src="${img||'assets/photos/favicon.png'}"><div class="card-body"><h3>${title}</h3><div class="meta">${type} — ${pos.zone||''}</div><p>${txt||''}</p></div>`;
    list.appendChild(card);
    if(state.map){
      const m = L.marker([pos.lat,pos.lng]).addTo(state.map).bindPopup(`<b>${title}</b><br>${txt||''}`);
      state.markers.push(m);
      card.addEventListener('click',()=>{ state.map.setView([pos.lat,pos.lng], 12); m.openPopup(); });
    }
  });
}

function renderMarkets(dayFilter='',zoneFilter=''){
  const wrap = $('#marketList'); wrap.innerHTML='';
  const src = APP_DATA.markets||[];
  src.filter(m=>(!dayFilter||m.jour===dayFilter)&&(!zoneFilter||m.zone===zoneFilter))
     .forEach(m=>{
       const card = document.createElement('article'); card.className='card';
       card.innerHTML = `<div class="card-body"><h3>${m.ville}</h3><div class="meta">${m.jour} — ${m.zone}</div><p>${m.note||''}</p></div>`;
       wrap.appendChild(card);
     });
}

function renderFetes(){
  const el = $('#festList'); el.innerHTML='';
  (APP_DATA.fetes||[]).forEach(f=>{
    const card = document.createElement('article'); card.className='card';
    card.innerHTML = `<div class="card-body"><h3>${f.titre}</h3><div class="meta">${f.lieu||''}</div><p>${f.details||f.resume||''}</p></div>`;
    el.appendChild(card);
  });
}

function renderRT(){
  const el = $('#rtList'); el.innerHTML='';
  (APP_DATA.itineraires||[]).forEach(rt=>{
    const card = document.createElement('article'); card.className='card';
    const seg = (rt.segments||[]).map(s=>`<li>${s.arret} • ${s.temps} — ${s.tips||''}</li>`).join('');
    card.innerHTML = `<div class="card-body"><h3>${rt.titre}</h3><p>${rt.resume||''}</p><ul>${seg}</ul></div>`;
    el.appendChild(card);
  });
}

function renderEx(){
  const el = $('#exList'); el.innerHTML='';
  (APP_DATA.excursions_plus||[]).forEach(x=>{
    const card = document.createElement('article'); card.className='card';
    card.innerHTML = `<img src="${x.img||'assets/photos/favicon.png'}"><div class="card-body"><h3>${x.titre}</h3><a class="btn" href="${x.url}" target="_blank">Voir / Réserver</a></div>`;
    el.appendChild(card);
  });
}

function initMarketFilters(){
  const d = $('#marketDay'); const z = $('#marketZone');
  const days = [...new Set((APP_DATA.markets||[]).map(m=>m.jour))];
  days.forEach(v=>{ const o=document.createElement('option'); o.value=v; o.textContent=v; d.appendChild(o); });
  const zones = [...new Set((APP_DATA.markets||[]).map(m=>m.zone))];
  zones.forEach(v=>{ const o=document.createElement('option'); o.value=v; o.textContent=v; z.appendChild(o); });
  d.addEventListener('change', ()=> renderMarkets(d.value, z.value));
  z.addEventListener('change', ()=> renderMarkets(d.value, z.value));
  $('#btnToday').addEventListener('click', ()=>{
    const w = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    renderMarkets(w[new Date().getDay()], '');
  });
}

document.addEventListener('submit', (e)=>{
  if(e.target.id==='conciergeForm'){ e.preventDefault(); alert('Message envoyé ! Nous revenons vers vous rapidement.'); location.hash='#merci'; }
});

function initPlaceFilters(){
  const z = $('#zoneFilter'); const t = $('#typeFilter');
  const zones = [...new Set((APP_DATA.places||[]).map(p=>p[2]?.zone).filter(Boolean))];
  zones.forEach(v=>{ const o=document.createElement('option'); o.value=v; o.textContent=v; z.appendChild(o); });
  const types = [...new Set((APP_DATA.places||[]).map(p=>p[1]))];
  types.forEach(v=>{ const o=document.createElement('option'); o.value=v; o.textContent=v; t.appendChild(o); });
  $('#global-search').addEventListener('input', applyFilters);
  z.addEventListener('change', applyFilters);
  t.addEventListener('change', applyFilters);
}
function applyFilters(){
  const q = $('#global-search').value.toLowerCase();
  const z = $('#zoneFilter').value, t = $('#typeFilter').value;
  const list = $('#placesList'); list.innerHTML='';
  state.markers.forEach(m=>m.remove()); state.markers=[];
  (APP_DATA.places||[]).filter(p=>{
    const [title,type,pos,_,txt] = p;
    const okQ = !q || (title.toLowerCase().includes(q) || (txt||'').toLowerCase().includes(q));
    const okZ = !z || pos.zone===z;
    const okT = !t || type===t;
    return okQ && okZ && okT;
  }).forEach(p=>{
    const [title,type,pos,img,txt]=p;
    const card = document.createElement('article'); card.className='card';
    card.innerHTML = `<img src="${img||'assets/photos/favicon.png'}"><div class="card-body"><h3>${title}</h3><div class="meta">${type} — ${pos.zone||''}</div><p>${txt||''}</p></div>`;
    list.appendChild(card);
    if(state.map){
      const m = L.marker([pos.lat,pos.lng]).addTo(state.map).bindPopup(`<b>${title}</b><br>${txt||''}`);
      state.markers.push(m);
      card.addEventListener('click',()=>{ state.map.setView([pos.lat,pos.lng], 12); m.openPopup(); });
    }
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  initMap();
  renderPlaces();
  initPlaceFilters();
  renderMarkets();
  initMarketFilters();
  renderFetes();
  renderRT();
  renderEx();
});
