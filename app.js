// Arbeitszeit Pro 0.2
// Arbeitszeit, Überstunden und Zeitkonto


const sollzeit = 420; // 7 Stunden
const pause = 45;     // automatische Pause


const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

const workTime = document.getElementById("workTime");
const overtime = document.getElementById("overtime");
const status = document.getElementById("status");


// gespeicherte Daten

let startZeit = localStorage.getItem("startZeit");
let endeZeit = localStorage.getItem("endeZeit");

let zeitkonto = Number(
    localStorage.getItem("zeitkonto")
) || 0;



// Minuten in Stunden:Minuten umwandeln

function zeitFormat(minuten) {

    let negativ = minuten < 0;

    minuten = Math.abs(minuten);

    let stunden = Math.floor(minuten / 60);
    let minutenRest = minuten % 60;

    let ergebnis =
        stunden + ":" +
        minutenRest.toString().padStart(2,"0");


    return negativ ? "-" + ergebnis : ergebnis;

}



// Arbeitszeit berechnen

function berechnen() {


    if (!startZeit) {

        workTime.innerHTML = "0:00";
        overtime.innerHTML =
            zeitFormat(zeitkonto);

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



    workTime.innerHTML =
        zeitFormat(arbeitszeit);



    let tagessaldo =
        arbeitszeit - sollzeit;



    overtime.innerHTML =
        zeitFormat(tagessaldo);



    localStorage.setItem(
        "aktuellerTagSaldo",
        tagessaldo
    );


}




// Kommen

startButton.onclick = function() {


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




// Gehen

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



    // Tagessaldo zum Zeitkonto addieren

    let tagessaldo =
        Number(
            localStorage.getItem(
                "aktuellerTagSaldo"
            )
        ) || 0;



    zeitkonto =
        zeitkonto + tagessaldo;



    localStorage.setItem(
        "zeitkonto",
        zeitkonto
    );



    status.innerHTML =
        "Arbeitszeit beendet";


    berechnen();

};




// laufende Aktualisierung

setInterval(
    berechnen,
    60000
);



berechnen();
