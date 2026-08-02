// Arbeitszeit Pro
// Offline Unterstützung


const CACHE_NAME =
"arbeitszeit-pro-v04";



const DATEIEN = [

"./",

"./index.html",

"./style.css",

"./app.js",

"./database.js",

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
keys => {


return Promise.all(

keys
.filter(
key =>
key !== CACHE_NAME
)

.map(
key =>
caches.delete(key)
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
fetch(event.request);


}

)


);


});
