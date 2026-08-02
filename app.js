// Arbeitszeit Pro 0.3
// Arbeitszeit + Tagesarchiv


const sollzeit = 420;
const pause = 45;


const startButton =
document.getElementById("startButton");

const stopButton =
document.getElementById("stopButton");


const workTime =
document.getElementById("workTime");

const overtime =
document.getElementById("overtime");

const status =
document.getElementById("status");



let startZeit =
localStorage.getItem("startZeit");

let endeZeit =
localStorage.getItem("endeZeit");




function zeitFormat(minuten) {

    let negativ = minuten < 0;

    minuten = Math.abs(minuten);


    let stunden =
    Math.floor(minuten / 60);


    let minutenRest =
    minuten % 60;


    let text =
    stunden + ":" +
    minutenRest
    .toString()
    .padStart(2,"0");


    return negativ ? "-" + text : text;

}




function berechnen() {


    if (!startZeit) {

        return;

    }


    let start =
    new Date(startZeit);


    let ende =
    endeZeit
    ? new Date(endeZeit)
    : new Date();



    let dauer =
    Math.floor(
        (ende - start) / 60000
    );



    let arbeitszeit =
    dauer - pause;



    if (arbeitszeit < 0) {

        arbeitszeit = 0;

    }



    let saldo =
    arbeitszeit - sollzeit;



    workTime.innerHTML =
    zeitFormat(arbeitszeit);



    overtime.innerHTML =
    zeitFormat(saldo);



    localStorage.setItem(
        "aktuellerSaldo",
        saldo
    );


}





startButton.onclick = function(){

    startZeit =
    new Date().toISOString();


    localStorage.setItem(
        "startZeit",
        startZeit
    );


    localStorage.removeItem(
        "endeZeit"
    );


    status.innerHTML =
    "Arbeitszeit läuft";


    berechnen();

};





stopButton.onclick = function(){


    if(!startZeit){

        alert(
        "Bitte zuerst Kommen drücken."
        );

        return;

    }



    endeZeit =
    new Date().toISOString();


    localStorage.setItem(
        "endeZeit",
        endeZeit
    );



    berechnen();



    let arbeitszeitText =
    workTime.innerHTML;



    let saldo =
    Number(
        localStorage.getItem(
            "aktuellerSaldo"
        )
    ) || 0;




    speichereTag({

        datum: datumHeute(),

        arbeitszeit:
        arbeitszeitText,

        saldo: saldo

    });



    status.innerHTML =
    "Gespeichert";

};





setInterval(
    berechnen,
    60000
);


berechnen();
