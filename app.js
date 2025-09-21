function $(q){ return document.querySelector(q); }
function $all(q){ return Array.from(document.querySelectorAll(q)); }
function normalize(s){ return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
function jourFrancais(d){ const arr=(I18N.dict.days||['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']); return arr[d]; }

function setTab(tab){
  $all('.view').forEach(v=>v.classList.remove('active'));
  const id = tab.replace('#','');
  const el = document.getElementById(id);
  if(el){ el.classList.add('active'); }
  $all('nav a').forEach(a=>a.classList.toggle('active', a.getAttribute('data-tab')===id));
  if(id==='lieux'){ try{ map.invalidateSize(); }catch(e){} }
}
window.addEventListener('hashchange', ()=> setTab(location.hash||'#accueil'));
setTab(location.hash||'#accueil');

function openWhatsApp(){
  const base='https://wa.me/34618688798';
  const txt = encodeURIComponent('Hola! Je souhaite des infos pour mon séjour à Majorque.');
  window.open(`${base}?text=${txt}`, '_blank');
}

function globalIndex(){
  const arr=[];
  (APP_DATA.places||[]).forEach(p=>arr.push({type:'Lieu', title:p[1], tab:'lieux'}));
  (APP_DATA.excursions_plus||[]).forEach(x=>arr.push({type:'Excursion', title:x.titre, tab:'excursions', url:x.url}));
  (APP_DATA.itineraires||[]).forEach(rt=>arr.push({type:'Road trip', title:rt.titre, tab:'roadtrips', id:rt.id}));
  return arr;
}
const _GINDEX = globalIndex();
function setupGlobalSearch(){
  const input = document.getElementById('global-search');
  const box = document.getElementById('search-results');
  if(!input || !box) return;
  let last = '';
  input.addEventListener('input', ()=>{
    const q = normalize(input.value);
    if(q===last){ return; } last=q;
    if(!q){ box.style.display='none'; box.innerHTML=''; return; }
    const hits = _GINDEX.filter(r=> normalize(r.title).includes(q) ).slice(0,20);
    if(!hits.length){ box.style.display='none'; box.innerHTML=''; return; }
    box.style.display='block'; box.style.zIndex='20';
    box.innerHTML = hits.map(h=>`<div style="padding:.5rem;border-bottom:1px solid #eee"><small class="muted">${h.type}</small><br><a href="#${h.tab}" data-tab="${h.tab}" class="search-link" data-title="${h.title||''}">${h.title}</a></div>`).join('');
    box.querySelectorAll('.search-link').forEach(a=>{
      a.addEventListener('click', (e)=>{
        e.preventDefault();
        const tab = a.dataset.tab; const title = a.dataset.title;
        setTab(tab);
        if(tab==='lieux'){ focusPlace(title); }
        if(tab==='roadtrips'){ document.getElementById('rt-grid')?.scrollIntoView({behavior:'smooth'}); }
        if(tab==='excursions'){ const r=_GINDEX.find(x=>x.title===title && x.type==='Excursion'); r && window.open(r.url,'_blank'); }
        box.style.display='none'; input.value='';
      });
    });
  });
}
window.addEventListener('DOMContentLoaded', setupGlobalSearch);

// Map
let map = null;
try{
  map = L.map('map',{scrollWheelZoom:true}).setView([39.65, 3.0], 9);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ attribution:'© OpenStreetMap' }).addTo(map);
}catch(e){ console.warn('Map disabled:', e); }
const placeMarkers = new Map();
const marketLayer = (map? L.layerGroup().addTo(map) : null);

// Places
function renderPlaces(){
  const grid = document.getElementById('lieux-grid');
  const zoneSel = document.getElementById('filter-zone');
  const typeSel = document.getElementById('filter-type');

  const zones = Array.from(new Set(APP_DATA.places.map(p=>p[4]))).sort();
  const types = Array.from(new Set(APP_DATA.places.map(p=>p[3]))).sort();
  zoneSel.innerHTML = `<option value="">Toutes</option>` + zones.map(z=>`<option>${z}</option>`).join('');
  typeSel.innerHTML = `<option value="">Tous</option>` + types.map(t=>`<option>${t}</option>`).join('');

  function draw(){
    const z = zoneSel.value, t = typeSel.value;
    grid.innerHTML = '';
    placeMarkers.forEach(m=>{ try{ map && map.removeLayer(m); }catch(e){} }); placeMarkers.clear();

    APP_DATA.places.filter(p=>(!z || p[4]===z) && (!t || p[3]===t)).forEach(p=>{
      const card = document.createElement('div');
      card.className='card place-card';
      card.innerHTML = `
        <img src="${p[16]||''}" alt="${p[1]}">
        <h4 style="margin:.25rem 0">${p[1]}</h4>
        <p class="muted" style="margin:.25rem 0 0">${p[15]||''}</p>
        <div style="margin-top:.5rem"><button class="btn sm">Voir sur la carte</button></div>`;
      card.querySelector('button').addEventListener('click', ()=> focusPlace(p[1]));
      grid.appendChild(card);

      if(map && window.L){
        const mk = L.marker([p[6],p[7]]).addTo(map).bindPopup(`<b>${p[1]}</b><br>${p[15]||''}`);
        placeMarkers.set(p[1], mk);
      }else{
        placeMarkers.set(p[1], {getLatLng:()=>({lat:p[6],lng:p[7]}), openPopup:()=>{}});
      }
    });
  }
  zoneSel.onchange=draw; typeSel.onchange=draw; draw();
}
function focusPlace(name){
  const mk = placeMarkers.get(name);
  if(mk && map && map.setView){ map.setView(mk.getLatLng(), 12); mk.openPopup && mk.openPopup(); }
}

// Markets (liste)
function renderMarketsList(){
  const list = document.getElementById('mkt-list');
  const daySel = document.getElementById('mkt-day');
  const zoneSel = document.getElementById('mkt-zone');
  const zones = Array.from(new Set((APP_DATA.markets_full||[]).map(x=>x.zone))).sort();
  zoneSel.innerHTML = `<option value="">Toutes</option>` + zones.map(z=>`<option>${z}</option>`).join('');
  function draw(){
    const d=daySel.value, z=zoneSel.value;
    const items = (APP_DATA.markets_full||[]).filter(m=>(!d||m.jour===d)&&(!z||m.zone===z));
    list.innerHTML = items.map(m=>`<div class="card"><b>${m.ville}</b><br><span class="muted">${m.jour} — ${m.zone}</span></div>`).join('') or '<div class="card">Aucun marché</div>';
  }
  daySel.onchange=draw; zoneSel.onchange=draw; draw();
}

// Toggle markets on map (in Lieux)
function renderMarketsOnMap(){
  const toggle = document.getElementById('toggle-markets');
  const daySel = document.getElementById('filter-market-day');
  const btnToday = document.getElementById('btn-market-today');

  function draw(){
    try{
      if(!map || !window.L) return;
      marketLayer && marketLayer.clearLayers();
      const d = daySel.value;
      (APP_DATA.markets_map||[]).filter(m=>!d || m[1]===d).forEach(m=>{
        L.circleMarker([m[2],m[3]],{radius:6}).addTo(marketLayer).bindPopup(`<b>${m[0]}</b><br>${m[1]}`);
      });
    }catch(e){/* silent */}
  }
  toggle.onchange=draw; daySel.onchange=draw;
  btnToday.onclick=()=>{ daySel.value = jourFrancais(new Date().getDay()); draw(); };
  draw();
}

// Fêtes
function renderFetes(){
  const el = document.getElementById('fetes-grid');
  el.innerHTML=(APP_DATA.fetes||[]).map(f=>`<div class="card"><b>${f[1]}</b> — ${f[2]}<br><span class="muted">${f[3]} · ${f[4]}</span><p style="margin:.4rem 0 0">${f[5]||''}</p></div>`).join('');
}

// Roadtrips
function renderRoadtrips(){
  const grid = document.getElementById('rt-grid');
  grid.innerHTML = (APP_DATA.itineraires||[]).map(rt=>{
    const seg = (rt.segments||[]).map(s=>`${s.de} → ${s.vers} · ${s.km||'?'} km · ${s.minutes||'?'} min`).join('<br>');
    const plages = (rt.plages||[]).map(p=>`• ${p.nom} — <span class="muted">${p.acces}</span>`).join('<br>');
    const adrs = (rt.adresses||[]).map(a=>`• ${a.type} — <b>${a.nom}</b> · ${a.adresse} <span class="muted">${a.note||''}</span>`).join('<br>');
    return `<div class="card">
      <h4 style="margin:.25rem 0">${rt.titre}</h4>
      ${rt.histoire?`<p><b>Repères historiques :</b> ${rt.histoire}</p>`:''}
      ${seg?`<p><b>Segments & temps estimés</b><br>${seg}</p>`:''}
      ${plages?`<p><b>Plages proches</b><br>${plages}</p>`:''}
      ${adrs?`<p><b>Food & douceurs</b><br>${adrs}</p>`:''}
      <div style="display:flex;gap:.5rem;flex-wrap:wrap">
        <a class="btn sm" href="#" onclick="openDirections(${rt.id});return false;">Itinéraire</a>
        <a class="btn sm alt" href="#" onclick="openFullRoute(${rt.id});return false;">Tout l’itinéraire</a>
      </div>
    </div>`;
  }).join('');
}
function openDirections(id){
  const rt=(APP_DATA.itineraires||[]).find(x=>x.id===id);
  if(!rt || !rt.segments || !rt.segments.length) return;
  const s=rt.segments[0];
  const url=`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(s.de)}&destination=${encodeURIComponent(s.vers)}&travelmode=driving`;
  window.open(url,'_blank');
}
function openFullRoute(id){
  const rt=(APP_DATA.itineraires||[]).find(x=>x.id===id);
  if(!rt || !rt.segments) return;
  const origin = rt.segments[0].de;
  const destination = rt.segments[rt.segments.length-1].vers;
  const waypoints = rt.segments.slice(0,-1).map(s=>encodeURIComponent(s.vers)).join('|');
  const url=`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&waypoints=${waypoints}&travelmode=driving`;
  window.open(url,'_blank');
}

// Excursions
function renderExcursions(){
  const grid = document.getElementById('ex-grid');
  const zsel = document.getElementById('filter-ex-zone');
  const zones = Array.from(new Set((APP_DATA.excursions_plus||[]).map(x=>x.zone))).sort();
  zsel.innerHTML = `<option value="">Toutes</option>` + zones.map(z=>`<option>${z}</option>`).join('');
  function draw(){
    const z=zsel.value;
    grid.innerHTML = (APP_DATA.excursions_plus||[]).filter(x=>!z||x.zone===z).map(x=>`
      <div class="card ex-card">
        <img src="${x.thumb}" alt="${x.titre}">
        <h4>${x.titre}</h4>
        <div><a class="btn sm" href="${x.url}" target="_blank" rel="noopener">Voir / Réserver</a></div>
      </div>`).join('');
  }
  zsel.onchange=draw; draw();
}

// Init
window.addEventListener('DOMContentLoaded', ()=>{
  renderPlaces(); renderMarketsOnMap(); renderMarketsList(); renderFetes(); renderRoadtrips(); renderExcursions();
});