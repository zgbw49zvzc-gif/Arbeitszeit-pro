// Arbeitszeit Pro 0.3
// Offline Speicher


const CACHE_NAME =
"arbeitszeit-pro-0-3";


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
