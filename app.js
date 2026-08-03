let startZeit = null;
let endZeit = null;
let zeitKonto = 0;

let sollzeit = 7;
let pauseMinuten = 45;


function uhrStarten(){

    setInterval(()=>{

        let jetzt = new Date();

        document.getElementById("datum").innerHTML =
        jetzt.toLocaleDateString("de-DE");


        document.getElementById("uhrzeit").innerHTML =
        jetzt.toLocaleTimeString("de-DE");


        berechnen();


    },1000);

}



function kommenStarten(){

    startZeit = new Date();

    document.getElementById("status").innerHTML =
    "🟢 Anwesend";


    document.getElementById("kommen").innerHTML =
    startZeit.toLocaleTimeString("de-DE",
    {
        hour:"2-digit",
        minute:"2-digit"
    });


    berechnen();

}





function gehenStoppen(){

    if(!startZeit){

        alert("Bitte zuerst Kommen drücken.");

        return;

    }


    endZeit = new Date();


    document.getElementById("gehen").innerHTML =
    endZeit.toLocaleTimeString("de-DE",
    {
        hour:"2-digit",
        minute:"2-digit"
    });


    document.getElementById("status").innerHTML =
    "🔴 Feierabend";


    berechnen();


    zeitKonto += berechneArbeitszeit();


    speichern();


}




function berechneArbeitszeit(){

    if(!startZeit) return 0;


    let ende = endZeit || new Date();


    let minuten =
    (ende - startZeit) / 60000;


    minuten -= pauseMinuten;


    return Number(
        (minuten / 60)
        .toFixed(2)
    );

}




function berechnen(){

    if(!startZeit)
    return;


    let jetzt =
    endZeit || new Date();


    let anwesenheit =

    (jetzt - startZeit) / 3600000;



    anwesenheit =
    Number(anwesenheit.toFixed(2));


    let arbeitszeit =
    berechneArbeitszeit();


    let saldo =
    arbeitszeit - sollzeit;


    document.getElementById("anwesenheit").innerHTML =
    anwesenheit.toFixed(2)
    .replace(".",",")
    +" h";


    document.getElementById("pause").innerHTML =
    (pauseMinuten/60)
    .toFixed(2)
    .replace(".",",")
    +" h";


    document.getElementById("arbeit").innerHTML =
    arbeitszeit.toFixed(2)
    .replace(".",",")
    +" h";


    document.getElementById("saldo").innerHTML =
    saldo.toFixed(2)
    .replace(".",",")
    +" h";


    document.getElementById("konto").innerHTML =
    zeitKonto.toFixed(2)
    .replace(".",",")
    +" h";



    let feier =
    new Date(startZeit);


    feier.setMinutes(
        feier.getMinutes()
        +
        (sollzeit*60)
        +
        pauseMinuten
    );


    document.getElementById("feierabend").innerHTML =
    feier.toLocaleTimeString(
        "de-DE",
        {
        hour:"2-digit",
        minute:"2-digit"
        }
    );

}





function nachtragSpeichern(){

    let eintrag = {


        datum:
        document.getElementById("nachDatum").value,


        kommen:
        document.getElementById("nachKommen").value,


        gehen:
        document.getElementById("nachGehen").value,


        pause:
        document.getElementById("nachPause").value,


        art:
        document.getElementById("nachArt").value


    };


    let liste =
    JSON.parse(
        localStorage.getItem("verlauf")
    )
    || [];


    liste.push(eintrag);


    localStorage.setItem(
        "verlauf",
        JSON.stringify(liste)
    );


    verlaufAnzeigen();

}





function verlaufAnzeigen(){

    let liste =
    JSON.parse(
        localStorage.getItem("verlauf")
    )
    || [];


    let feld =
    document.getElementById("verlauf");


    feld.innerHTML="";


    liste.forEach(e=>{


        feld.innerHTML +=

        `
        <p>
        ${e.datum}<br>
        ${e.art}<br>
        ${e.kommen} - ${e.gehen}
        </p>
        `;


    });


}




function einstellungenSpeichern(){


    sollzeit =
    Number(
        document.getElementById("sollzeit").value
    );


    pauseMinuten =
    Number(
        document.getElementById("pauseEinstellung").value
    );


}





uhrStarten();

verlaufAnzeigen();
