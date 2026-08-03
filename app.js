// Arbeitszeit Pro 1.0
// Hauptprogramm


let daten = datenLaden();



const $ = id =>
document.getElementById(id);




function heuteDatum(){

    return new Date()
    .toLocaleDateString(
        "de-DE"
    );

}



function aktuelleZeit(){

    return new Date()
    .toLocaleTimeString(
        "de-DE"
    );

}





function uhrStart(){

    setInterval(()=>{


        $("datum").innerHTML =
        heuteDatum();


        $("uhrzeit").innerHTML =
        aktuelleZeit();


        aktualisieren();


    },1000);

}




function kommen(){


    let jetzt =
    new Date();



    daten.aktuellerTag.datum =
    heuteDatum();


    daten.aktuellerTag.kommen =
    jetzt.toLocaleTimeString(
        "de-DE",
        {
            hour:"2-digit",
            minute:"2-digit"
        }
    );



    daten.aktuellerTag.gehen =
    null;



    daten.aktuellerTag.status =
    "Anwesend";



    datenSpeichern(daten);


    aktualisieren();


}






function gehen(){


    if(
        !daten.aktuellerTag.kommen
    ){

        alert(
        "Bitte zuerst Kommen drücken."
        );

        return;

    }



    daten.aktuellerTag.gehen =

    new Date()
    .toLocaleTimeString(
        "de-DE",
        {
            hour:"2-digit",
            minute:"2-digit"
        }
    );



    daten.aktuellerTag.status =
    "Feierabend";



    tagSpeichern();



    daten.aktuellerTag =
    {

        datum:null,

        kommen:null,

        gehen:null,

        pause:daten.einstellungen.pause,

        status:"Nicht gestartet"

    };



    datenSpeichern(daten);



    aktualisieren();

}





function tagBerechnen(){


    let tag =
    daten.aktuellerTag;



    if(
        !tag.kommen
    )
    return null;



    let jetzt =
    tag.gehen ||

    new Date()
    .toLocaleTimeString(
        "de-DE",
        {
            hour:"2-digit",
            minute:"2-digit"
        }
    );



    let anwesenheit =

    zeitZuDezimal(

        tag.kommen,

        jetzt

    );



    let pause =

    tag.pause / 60;



    let arbeit =

    Number(

        (
        anwesenheit -
        pause
        )

        .toFixed(2)

    );



    let soll =
    daten.einstellungen.sollzeit;



    let saldo =

    Number(

        (
        arbeit -
        soll
        )

        .toFixed(2)

    );



    let ende =

    new Date();



    ende.setHours(
        Number(
        tag.kommen.split(":")[0]
        )
    );


    ende.setMinutes(
        Number(
        tag.kommen.split(":")[1]
        )
        +
        (
        soll * 60
        )
        +
        tag.pause
    );



    return {


        anwesenheit,

        pause,

        arbeit,

        saldo,


        feierabend:

        ende.toLocaleTimeString(
            "de-DE",
            {
            hour:"2-digit",
            minute:"2-digit"
            }
        )


    };


}








function tagSpeichern(){


    let wert =
    tagBerechnen();


    if(!wert)
    return;



    daten.eintraege.unshift({


        datum:
        daten.aktuellerTag.datum,


        art:
        "Arbeitszeit",


        kommen:
        daten.aktuellerTag.kommen,


        gehen:
        daten.aktuellerTag.gehen,


        stunden:
        wert.arbeit,


        saldo:
        wert.saldo


    });



    daten.zeitkonto +=
    wert.saldo;



}






function nachtragSpeichern(){


    let datum =
    $("nachtragDatum").value;



    let kommen =
    $("nachtragKommen").value;


    let gehen =
    $("nachtragGehen").value;



    let pause =
    Number(
    $("nachtragPause").value
    );



    let art =
    $("nachtragArt").value;



    let bemerkung =
    $("nachtragBemerkung").value;



    let arbeit =

    zeitZuDezimal(
        kommen,
        gehen
    )
    -
    pause / 60;



    daten.eintraege.unshift({


        datum,

        art,

        kommen,

        gehen,

        pause,

        stunden:

        Number(
        arbeit.toFixed(2)
        ),

        bemerkung


    });



    datenSpeichern(daten);


    verlaufAnzeigen();


}








function verlaufAnzeigen(){


    let feld =
    $("verlauf");


    feld.innerHTML="";



    daten.eintraege
    .forEach(
    e=>{


        feld.innerHTML +=

        `

        <div class="eintrag">

        ${e.datum}<br>

        ${e.art}

        <br>

        ${formatDezimal(e.stunden)}

        </div>

        `;


    });


}







function aktualisieren(){


    let wert =
    tagBerechnen();



    if(!wert)
    return;



    $("status").innerHTML =
    daten.aktuellerTag.status;



    $("kommenAnzeige").innerHTML =
    daten.aktuellerTag.kommen || "--:--";



    $("gehenAnzeige").innerHTML =
    daten.aktuellerTag.gehen || "--:--";



    $("anwesenheit").innerHTML =
    formatDezimal(
        wert.anwesenheit
    );



    $("pauseAnzeige").innerHTML =
    formatDezimal(
        wert.pause
    );



    $("arbeitszeit").innerHTML =
    formatDezimal(
        wert.arbeit
    );



    $("saldo").innerHTML =
    formatDezimal(
        wert.saldo
    );


    $("zeitkonto").innerHTML =
    formatDezimal(
        daten.zeitkonto
    );


    $("feierabend").innerHTML =
    wert.feierabend;


}






function einstellungenSpeichern(){


    daten.einstellungen.sollzeit =

    Number(
    $("sollzeitEinstellung").value
    );


    daten.einstellungen.pause =

    Number(
    $("pauseEinstellung").value
    );



    datenSpeichern(daten);


}






$("kommenButton")
.onclick =
kommen;


$("gehenButton")
.onclick =
gehen;


$("nachtragSpeichern")
.onclick =
nachtragSpeichern;


$("einstellungenSpeichern")
.onclick =
einstellungenSpeichern;




uhrStart();

verlaufAnzeigen();

aktualisieren();
