// Arbeitszeit Pro 1.0
// Hauptlogik


let daten = ladeDaten();


const arbeitszeitAnzeige =
document.getElementById("arbeitszeit");


const saldoAnzeige =
document.getElementById("saldo");


const kontoAnzeige =
document.getElementById("zeitkonto");


const statusAnzeige =
document.getElementById("status");



document.getElementById("heute").innerHTML =
heute();





function zeigeSeite(name) {


    document
    .querySelectorAll(".seite")
    .forEach(
        seite =>
        seite.classList.remove("aktiv")
    );


    document
    .getElementById(name)
    .classList.add("aktiv");


}





function kommen() {


    daten.start =
    new Date()
    .toISOString();



    daten.ende = null;


    speichereDaten(daten);



    statusAnzeige.innerHTML =
    "Arbeitszeit läuft";


    aktualisieren();


}





function gehen() {


    if(!daten.start) {


        alert(
        "Bitte zuerst Kommen drücken."
        );


        return;

    }




    daten.ende =
    new Date()
    .toISOString();



    let start =
    new Date(
        daten.start
    );


    let ende =
    new Date(
        daten.ende
    );



    let minuten =
    Math.floor(
        (ende-start)
        /
        60000
    );



    let pause =
    daten.einstellungen.pause;



    let arbeitszeit =
    minuten - pause;



    if(
        arbeitszeit < 0
    )

    arbeitszeit = 0;




    let soll =
    daten.einstellungen.sollzeit
    *
    60;




    let saldo =
    arbeitszeit - soll;



    daten.zeitkonto += saldo;



    daten.eintraege.unshift({

        datum: heute(),

        art: "Arbeitszeit",

        zeit: arbeitszeit,

        saldo: saldo

    });



    daten.start = null;



    speichereDaten(daten);



    statusAnzeige.innerHTML =
    "Feierabend";


    aktualisieren();


}






function speichern() {


    let art =
    document.getElementById("art")
    .value;


    let stunden =
    Number(
    document.getElementById("stunden")
    .value
    );


    let notiz =
    document.getElementById("notiz")
    .value;



    if(!stunden){

        alert(
        "Bitte Stunden eingeben."
        );

        return;

    }




    daten.eintraege.unshift({

        datum: heute(),

        art: art,

        zeit:
        stunden,

        notiz:
        notiz

    });



    speichereDaten(daten);



    alert(
    "Gespeichert"
    );



    aktualisieren();

}






function speichereEinstellungen(){


    daten.einstellungen.sollzeit =
    Number(
    document.getElementById("sollzeit")
    .value
    );


    daten.einstellungen.pause =
    Number(
    document.getElementById("pause")
    .value
    );



    speichereDaten(daten);


    alert(
    "Einstellungen gespeichert"
    );


}







function aktualisieren(){



    kontoAnzeige.innerHTML =
    minutenZuZeit(
        daten.zeitkonto
    );



    if(
    daten.start
    )

    {

        statusAnzeige.innerHTML =
        "Arbeitszeit läuft";


    }





}





aktualisieren();
