const CACHE = 'ea-v1';
const ASSETS = [
  './',
  './index.html',
  './merci.html',
  './css/style.css',
  './js/app.js',
  './js/data.js',
  './js/i18n.js',
  './locales/fr.json',
  './assets/photos/favicon.png'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', e=>{
  const url = new URL(e.request.url);
  if(url.origin===location.origin){
    e.respondWith(caches.match(e.request).then(res=>res || fetch(e.request)));
  }
});