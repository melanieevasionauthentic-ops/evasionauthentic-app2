
const $=(q)=>document.querySelector(q), $$=(q)=>Array.from(document.querySelectorAll(q));
function guardMap(map,btn){ if(!btn) return; map.dragging.disable(); map.touchZoom.disable(); map.scrollWheelZoom.disable(); btn.style.display='block'; btn.addEventListener('click',()=>{map.dragging.enable(); map.touchZoom.enable(); map.scrollWheelZoom.enable(); btn.style.display='none';}); }
