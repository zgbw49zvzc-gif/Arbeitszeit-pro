const sollzeit = 420; // 7 Stunden in Minuten
const pause = 45;     // automatische Pause


const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

const workTime = document.getElementById("workTime");
const overtime = document.getElementById("overtime");
const status = document.getElementById("status");


let startZeit = localStorage.getItem("startZeit");
let endeZeit = localStorage.getItem("endeZeit");



function zeitFormat(minuten) {

    let stunden = Math.floor(minuten / 60);
    let minutenRest = minuten % 60;

    return stunden + ":" + 
    minutenRest.toString().padStart(2,"0");

}



function berechnen() {

    if (!startZeit) {
        return;
    }


    let start = new Date(startZeit);

    let ende = endeZeit 
        ? new Date(endeZeit)
        : new Date();



    let dauer = Math.floor(
        (ende - start) / 60000
    );


    let arbeitszeit = dauer - pause;


    if (arbeitszeit < 0) {
        arbeitszeit = 0;
    }


    workTime.innerHTML =
        zeitFormat(arbeitszeit);



    let saldo = arbeitszeit - sollzeit;


    if (saldo >= 0) {

        overtime.innerHTML =
        "+" + zeitFormat(saldo);

    } else {

        overtime.innerHTML =
        "-" + zeitFormat(Math.abs(saldo));

    }

}




startButton.onclick = function() {

    startZeit = new Date().toISOString();

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



stopButton.onclick = function() {

    if (!startZeit) {

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


    status.innerHTML =
    "Arbeitszeit beendet";


    berechnen();

};



setInterval(
    berechnen,
    60000
);


berechnen();
