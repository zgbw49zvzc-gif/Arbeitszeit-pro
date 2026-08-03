// Arbeitszeit Pro 1.0
// Offline Speicherung


const CACHE_NAME =
"arbeitszeit-pro-v1";



const DATEIEN = [

"./",

"./index.html",

"./style.css",

"./app.js",

"./storage.js",

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
cache =>

cache.addAll(
DATEIEN
)

)

);


});







self.addEventListener(
"activate",
event => {


event.waitUntil(

caches.keys()

.then(
namen => {


return Promise.all(

namen.map(
name => {


if(
name !== CACHE_NAME
)

{

return caches.delete(
name
);

}


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

antwort =>

antwort ||

fetch(
event.request
)

)

);


});
