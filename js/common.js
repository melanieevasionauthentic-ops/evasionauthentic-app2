
function header(active){
  const nav = document.querySelector('.header');
  if(!nav) return;
  const items = [
    ['index.html','Accueil'],
    ['pages/excursions.html','Excursions'],
    ['pages/roadtrips.html','Road trips'],
    ['pages/marches.html','Marchés'],
    ['pages/fetes.html','Fêtes'],
    ['pages/lieux.html','Lieux'],
    ['pages/conciergerie.html','Conciergerie']
  ];
  const links = items.map(([href,label])=>`<a href="/evasionauthentic-app2/${href}" ${active===label?'style="color:var(--ea-dark)"':''}>${label}</a>`).join('<span class="small"> | </span>');
  nav.innerHTML = `<div class="nav"><a href="/evasionauthentic-app2/index.html"><img class="logo" src="/evasionauthentic-app2/assets/img/logo.png" alt="logo"/></a>${links}</div>`;
}
