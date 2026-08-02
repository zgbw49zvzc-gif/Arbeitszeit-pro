// Arbeitszeit Pro 0.3
// Hauptprogramm



const sollzeit = 420; // 7 Stunden
const pause = 45;     // Minuten



const kommen =
document.getElementById("kommen");

const gehen =
document.getElementById("gehen");


const arbeitszeitAnzeige =
document.getElementById("arbeitszeit");

const saldoAnzeige =
document.getElementById("saldo");


const statusAnzeige =
document.getElementById("status");


const zeitkontoAnzeige =
document.getElementById("zeitkonto");


const datumAnzeige =
document.getElementById("datum");





let startZeit =
localStorage.getItem(
    "startZeit"
);


let endeZeit =
localStorage.getItem(
    "endeZeit"
);





datumAnzeige.innerHTML =
new Date()
.toLocaleDateString(
    "de-DE"
);







function zeitFormat(minuten) {


    let negativ =
    minuten < 0;


    minuten =
    Math.abs(minuten);



    let stunden =
    Math.floor(
        minuten / 60
    );


    let rest =
    minuten % 60;



    let text =
    stunden +
    ":" +
    rest
    .toString()
    .padStart(2,"0");



    return negativ
    ? "-" + text
    : "+" + text;

}








function berechnen() {


    if (!startZeit) {


        arbeitszeitAnzeige.innerHTML =
        "0:00";


        saldoAnzeige.innerHTML =
        "0:00";


        zeitkontoAnzeige.innerHTML =
        zeitFormat(
            ladeZeitkonto()
        );


        return;

    }




    let start =
    new Date(startZeit);



    let ende =
    endeZeit
    ? new Date(endeZeit)
    : new Date();




    let minuten =
    Math.floor(
        (ende - start) / 60000
    );




    let arbeitszeit =
    minuten - pause;



    if (
        arbeitszeit < 0
    ) {

        arbeitszeit = 0;

    }





    let saldo =
    arbeitszeit - sollzeit;





    arbeitszeitAnzeige.innerHTML =

    Math.floor(arbeitszeit / 60)
    + ":" +
    (arbeitszeit % 60)
    .toString()
    .padStart(2,"0");





    saldoAnzeige.innerHTML =
    zeitFormat(saldo);





    localStorage.setItem(

        "aktuellerSaldo",

        saldo

    );



}









kommen.onclick = function() {


    startZeit =
    new Date()
    .toISOString();



    localStorage.setItem(

        "startZeit",

        startZeit

    );



    localStorage.removeItem(
        "endeZeit"
    );



    statusAnzeige.innerHTML =
    "Arbeitszeit läuft";



    berechnen();


};









gehen.onclick = function() {



    if (!startZeit) {


        alert(
            "Bitte zuerst Kommen drücken."
        );


        return;

    }




    endeZeit =
    new Date()
    .toISOString();



    localStorage.setItem(

        "endeZeit",

        endeZeit

    );




    berechnen();





    let saldo =
    Number(
        localStorage.getItem(
            "aktuellerSaldo"
        )
    ) || 0;





    let konto =
    ladeZeitkonto();



    konto =
    konto + saldo;




    speichereZeitkonto(
        konto
    );





    speichereTag({

        datum:
        datumHeute(),


        arbeitszeit:
        arbeitszeitAnzeige.innerHTML,


        saldo:
        zeitFormat(saldo)

    });





    statusAnzeige.innerHTML =
    "Gespeichert";




    zeigeTage();


    zeitkontoAnzeige.innerHTML =
    zeitFormat(
        konto
    );

};








setInterval(

    berechnen,

    60000

);




berechnen();

zeigeTage();
