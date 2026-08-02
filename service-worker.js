// Arbeitszeit Pro 1.0
// Offline Funktion


const CACHE_NAME =
"arbeitszeit-pro-1-0";



const DATEIEN = [

"./",

"./index.html",

"./style.css",

"./app.js",

"./storage.js",

"./calendar.js",

"./manifest.json"

];





self.addEventListener(
"install",
event => {


event.waitUntil(

caches.open(
CACHE_NAME
)

.then(
cache => {

return cache.addAll(
DATEIEN
);

}

)

);


});







self.addEventListener(
"activate",
event => {


event.waitUntil(

caches.keys()

.then(
speicher => {


return Promise.all(

speicher.map(
name => {


if(
name !== CACHE_NAME
)

return caches.delete(name);


}

)

);


}

)

);


});








self.addEventListener(
"fetch",
event => {


event.respondWith(

caches.match(
event.request
)

.then(
antwort => {


return antwort ||

fetch(
event.request
);


}

)

);


});
