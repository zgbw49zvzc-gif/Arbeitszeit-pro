// Arbeitszeit Pro 0.1


const sollzeit = 7 * 60; // 7 Stunden in Minuten
const pause = 45;        // automatische Pause


const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");


const workTime = document.getElementById("workTime");
const overtime = document.getElementById("overtime");
const status = document.getElementById("status");
const date = document.getElementById("date");



// Datum anzeigen

const heute = new Date();

date.innerHTML =
    heute.toLocaleDateString("de-DE");




// gespeicherte Zeiten laden

let startTime =
    localStorage.getItem("startTime");

let endTime =
    localStorage.getItem("endTime");





function minutenZuZeit(minuten) {

    let stunden =
        Math.floor(minuten / 60);

    let minutenRest =
        minuten % 60;


    return (
        stunden +
        ":" +
        minutenRest.toString().padStart(2,"0")
    );
}





function berechnen() {


    if (!startTime) {

        workTime.innerHTML = "0:00";
        overtime.innerHTML = "0:00";

        return;

    }



    let start =
        new Date(startTime);


    let ende =
        endTime
        ? new Date(endTime)
        : new Date();



    let minuten =
        Math.floor(
            (ende - start) / 60000
        );



    let arbeitszeit =
        minuten - pause;



    if (arbeitszeit < 0) {

        arbeitszeit = 0;

    }



    workTime.innerHTML =
        minutenZuZeit(arbeitszeit);



    let saldo =
        arbeitszeit - sollzeit;



    if (saldo >= 0) {

        overtime.innerHTML =
            "+" + minutenZuZeit(saldo);

    }

    else {

        overtime.innerHTML =
            "-" + minutenZuZeit(Math.abs(saldo));

    }


}





startButton.onclick = function(){


    startTime =
        new Date().toISOString();


    localStorage.setItem(
        "startTime",
        startTime
    );


    localStorage.removeItem(
        "endTime"
    );


    status.innerHTML =
        "Arbeitszeit läuft";


    berechnen();


};





stopButton.onclick = function(){


    if (!startTime) {

        alert(
            "Bitte zuerst Kommen drücken."
        );

        return;

    }



    endTime =
        new Date().toISOString();


    localStorage.setItem(
        "endTime",
        endTime
    );


    status.innerHTML =
        "Arbeitszeit beendet";


    berechnen();


};





// Aktualisierung jede Minute

setInterval(
    berechnen,
    60000
);



berechnen();
