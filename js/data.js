
const DATA={
  telWhats:'+34 618 688 798',
  whatsappText:'Hola! Je souhaite des infos pour mon séjour à Majorque.',
  excursions:[
    {titre:'Entre Salines et Sable', url:'https://evasionauthentic.com/salines-sable-mallorca/'},
    {titre:'Grottes & Plage idyllique', url:'https://evasionauthentic.com/grottes-majorque-plage/'},
    {titre:'Vall de Sóller', url:'https://evasionauthentic.com/vall-de-soller/'},
    {titre:'Palma & Cathédrale', url:'https://evasionauthentic.com/palma-mallorca-cathedrale/'},
    {titre:'Palma by Night', url:'https://evasionauthentic.com/palma-by-night/'},
    {titre:'Gastronomie & artisanat', url:'https://evasionauthentic.com/majorque-gastronomie-et-artisanat/'},
    {titre:'Sa Calobra & Lluc', url:'https://evasionauthentic.com/sa-calobra/'},
    {titre:'Artà & Capdepera', url:'https://evasionauthentic.com/arta-capdepera/'},
    {titre:'Sóller trésors cachés', url:'https://evasionauthentic.com/soller-tresors-caches/'},
    {titre:'Île Dragonera', url:'https://evasionauthentic.com/ile-lezards-la-dragonera/'},
    {titre:'Cap Blanc & tortues', url:'https://evasionauthentic.com/cap-blanc-tortues/'},
    {titre:'Alcúdia & Pollença', url:'https://evasionauthentic.com/alcudia-et-pollensa/'},
    {titre:'Soirée majorquine', url:'https://evasionauthentic.com/soiree-majorquine/'},
    {titre:'Valldemossa – belle route', url:'https://evasionauthentic.com/valldemossa-belle-route/'}
  ],
  roadtrips:[
    {id:'rt1', titre:'Serra de Tramuntana Signature', duree:'7–8h', resume:'Palma ➜ Valldemossa ➜ Deià ➜ Sóller ➜ Mirador Sa Foradada',
     arrets:[
       {type:'vue', nom:'Mirador de ses Barques', note:'cliché baie de Sóller', lat:39.8109, lon:2.7099},
       {type:'village', nom:'Valldemossa', note:'coca de patata', lat:39.7105, lon:2.6226},
       {type:'plage', nom:'Cala Deià', note:'parking limité', lat:39.7548, lon:2.6497},
       {type:'resto', nom:'Ca’n Molinas', note:'ensaïmada', lat:39.7109, lon:2.6219},
       {type:'tip', nom:'Tramway bois Sóller', note:'expérience vintage', lat:39.7666, lon:2.7153}
     ], gmaps:'https://www.google.com/maps/dir/Palma/Valldemossa/Deia/Soller'
    },
    {id:'rt2', titre:'Sa Calobra + Monastère de Lluc', duree:'6–7h', resume:'Route MA-2141 & torrents',
     arrets:[
       {type:'vue', nom:'Nus de Sa Corbata', note:'épingle iconique', lat:39.8399, lon:2.7921},
       {type:'plage', nom:'Torrent de Pareis', note:'gorge', lat:39.8537, lon:2.7915},
       {type:'culture', nom:'Monestir de Lluc', note:'patio et jardins', lat:39.8437, lon:2.8853}
     ], gmaps:'https://www.google.com/maps/dir/Lluc/Sa+Calobra'
    },
    {id:'rt3', titre:'Cap de Formentor panoramas', duree:'5–6h', resume:'Faro & miradors, Formentor',
     arrets:[
       {type:'vue', nom:'Mirador Es Colomer', note:'falaises', lat:39.9396, lon:3.1042},
       {type:'plage', nom:'Platja de Formentor', note:'eau claire', lat:39.9378, lon:3.1430},
       {type:'resto', nom:'La Llonja', note:'poissons', lat:39.9072, lon:3.0828}
     ], gmaps:'https://www.google.com/maps/dir/Port+de+Pollença/Cap+de+Formentor'
    },
    {id:'rt4', titre:'Sud sauvage – Es Trenc & Salines', duree:'6h', resume:'Marais salants, plages, Santanyí',
     arrets:[
       {type:'plage', nom:'Es Trenc', note:'eau caraïbe', lat:39.3555, lon:2.992},
       {type:'culture', nom:'Ses Salines', note:'tas de sel', lat:39.3356, lon:3.0551},
       {type:'plage', nom:'Calo des Moro', note:'accès à pied', lat:39.3124, lon:3.1207}
     ], gmaps:'https://www.google.com/maps/dir/Ses+Salines/Es+Trenc/Calo+des+Moro'
    },
    {id:'rt5', titre:'Est authentique – Artà & Capdepera', duree:'6h',
     arrets:[
       {type:'culture', nom:'Santuari de Sant Salvador', note:'vue 360°', lat:39.6935, lon:3.3497},
       {type:'culture', nom:'Château de Capdepera', note:'XIVe', lat:39.7021, lon:3.4359},
       {type:'plage', nom:'Cala Mesquida', note:'dunes', lat:39.7410, lon:3.4263}
     ], gmaps:'https://www.google.com/maps/dir/Artà/Capdepera/Cala+Mesquida'
    },
    {id:'rt6', titre:'Ouest secret – Banyalbufar & Estellencs', duree:'5h',
     arrets:[
       {type:'vue', nom:'Torre des Verger', note:'sunset', lat:39.6689, lon:2.5102},
       {type:'resto', nom:'Son Tomàs', note:'pa amb oli', lat:39.6763, lon:2.5151},
       {type:'plage', nom:'Cala Banyalbufar', note:'galets', lat:39.6801, lon:2.5215}
     ], gmaps:'https://www.google.com/maps/dir/Banyalbufar/Estellencs'
    },
    {id:'rt7', titre:'Nord romain – Alcúdia & murailles', duree:'5h',
     arrets:[
       {type:'culture', nom:'Murailles d’Alcúdia', note:'Porte Xara', lat:39.8521, lon:3.1229},
       {type:'plage', nom:'Platja de Muro', note:'ruban fin', lat:39.7921, lon:3.1192},
       {type:'resto', nom:'Macelleria', note:'tapas', lat:39.8539, lon:3.1215}
     ], gmaps:'https://www.google.com/maps/dir/Alcúdia/Platja+de+Muro'
    },
    {id:'rt8', titre:'Palma essentiel & quartiers anciens', duree:'4h',
     arrets:[
       {type:'culture', nom:'La Seu', note:'vitraux', lat:39.5676, lon:2.6499},
       {type:'culture', nom:'Palau de l’Almudaina', note:'résidence royale', lat:39.5681, lon:2.6478},
       {type:'glacier', nom:'Ca’n Joan de s’Aigo', note:'glace amande', lat:39.5715, lon:2.6509}
     ], gmaps:'https://www.google.com/maps/dir/La+Seu+Palma/Can+Joan+de+s%27Aigo'
    },
    {id:'rt9', titre:'Dragonera & côte rocheuse', duree:'6h',
     arrets:[
       {type:'culture', nom:'Port d’Andratx', note:'bateau pour Dragonera', lat:39.536, lon:2.384},
       {type:'rando', nom:'Parc Natural Dragonera', note:'phare', lat:39.588, lon:2.329}
     ], gmaps:'https://www.google.com/maps/dir/Port+d%27Andratx/Sant+Elm'
    },
    {id:'rt10', titre:'Cap Blanc falaises & tortues', duree:'5h',
     arrets:[
       {type:'vue', nom:'Mirador Cap Blanc', note:'falaises', lat:39.3531, lon:2.7855},
       {type:'plage', nom:'Cala Pi', note:'eau jade', lat:39.3952, lon:2.8379}
     ], gmaps:'https://www.google.com/maps/dir/Cap+Blanc/Cala+Pi'
    }
  ],
  marches:[
    {jour:'Lundi', ville:'Manacor', zone:'Pla de Mallorca', lat:39.57, lon:3.20},
    {jour:'Lundi', ville:'Calvià', zone:'Calvià', lat:39.565, lon:2.507},
    {jour:'Mardi', ville:'Alcúdia', zone:'Nord', lat:39.853, lon:3.122},
    {jour:'Mardi', ville:'s’Arenal (Llucmajor)', zone:'Sud', lat:39.494, lon:2.754},
    {jour:'Mardi', ville:'Campanet', zone:'Serra de Tramuntana', lat:39.774, lon:2.966},
    {jour:'Mardi', ville:'Llubí', zone:'Intérieur', lat:39.688, lon:3.013},
    {jour:'Mercredi', ville:'Andratx', zone:'Ouest', lat:39.575, lon:2.420},
    {jour:'Mercredi', ville:'Capdepera', zone:'Est', lat:39.702, lon:3.435},
    {jour:'Mercredi', ville:'Deià', zone:'Serra de Tramuntana', lat:39.748, lon:2.646},
    {jour:'Mercredi', ville:'Port de Pollença', zone:'Nord', lat:39.907, lon:3.081},
    {jour:'Mercredi', ville:'Santanyí', zone:'Sud-Est', lat:39.354, lon:3.127},
    {jour:'Jeudi', ville:'Inca', zone:'Intérieur', lat:39.718, lon:2.907},
    {jour:'Jeudi', ville:'Sant Llorenç', zone:'Est', lat:39.610, lon:3.284},
    {jour:'Vendredi', ville:'Algaida', zone:'Pla de Mallorca', lat:39.558, lon:2.892},
    {jour:'Vendredi', ville:'Llucmajor', zone:'Sud', lat:39.491, lon:2.891},
    {jour:'Vendredi', ville:'Port d’Alcúdia', zone:'Nord', lat:39.832, lon:3.121},
    {jour:'Samedi', ville:'Santanyí', zone:'Sud-Est', lat:39.354, lon:3.127},
    {jour:'Samedi', ville:'Manacor', zone:'Est', lat:39.569, lon:3.209},
    {jour:'Samedi', ville:'Biniali', zone:'Pla de Mallorca', lat:39.654, lon:2.838},
    {jour:'Samedi', ville:'Santa Ponsa', zone:'Calvià', lat:39.508, lon:2.484},
    {jour:'Dimanche', ville:'Alcúdia', zone:'Nord', lat:39.853, lon:3.122},
    {jour:'Dimanche', ville:'Inca', zone:'Intérieur', lat:39.718, lon:2.907},
    {jour:'Dimanche', ville:'Pollensa', zone:'Nord', lat:39.876, lon:3.017},
    {jour:'Dimanche', ville:'Muro', zone:'Nord', lat:39.737, lon:3.056}
  ],
  fetes:[
    {periode:'5-6 janvier', nom:'Défilé des Rois mages', lieu:'Palma', desc:'Parade nautique et arrivée des Rois sur le port, distribution de bonbons.'},
    {periode:'16-17 janvier', nom:'Sant Antoni i els Dimonis', lieu:'Sa Pobla, Artà, Pollença', desc:'Bénédiction des animaux, bûchers et démons dansant (correfoc).'},
    {periode:'20 janvier', nom:'Sant Sebastià', lieu:'Palma', desc:'Feux, concerts, barbecues sur les places — grande fête urbaine.'},
    {periode:'Mars/Avril', nom:'Semaine Sainte', lieu:'toute l’île', desc:'Processions des confréries, statues et tambours — atmosphère solennelle.'},
    {periode:'2e week-end de mai', nom:'Es Firó', lieu:'Sóller', desc:'Reconstitution Moros i Cristians (1561), défilés et feux.'},
    {periode:'16 juillet', nom:'Verge del Carme', lieu:'Ports de l’île', desc:'Processions maritimes en l’honneur des pêcheurs.'},
    {periode:'25 juillet', nom:'Sant Jaume', lieu:'Plusieurs communes', desc:'Danses traditionnelles — ball dels cossiers à Algaida.'},
    {periode:'2 août', nom:'Festes de la Patrona', lieu:'Pollença', desc:'Grande bataille Moros i Cristians — ambiance unique.'},
    {periode:'Septembre', nom:'Festes de la Verema', lieu:'Binissalem', desc:'Vendanges, foulées du raisin, concerts.'},
    {periode:'31 décembre', nom:'Fête de l’Étendard', lieu:'Palma', desc:'Commémoration de la reconquête — défilés et danses.'}
  ]
};