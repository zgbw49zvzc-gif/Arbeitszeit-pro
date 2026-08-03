// Arbeitszeit Pro 1.0
// Speicherverwaltung


const SPEICHER =
"arbeitszeitPro";



function standardDaten() {


    return {


        eintraege: [],


        aktuellerTag: {

            datum: null,

            kommen: null,

            gehen: null,

            pause: 45,

            status: "Nicht gestartet"

        },


        zeitkonto: 0,


        einstellungen: {

            sollzeit: 7,

            pause: 45

        }


    };


}







function datenLaden() {


    let daten =
    localStorage.getItem(
        SPEICHER
    );


    if(daten) {

        return JSON.parse(daten);

    }


    return standardDaten();


}







function datenSpeichern(daten) {


    localStorage.setItem(

        SPEICHER,

        JSON.stringify(daten)

    );


}







function dezimal(stunden, minuten) {


    return Number(

        (

            stunden +

            minuten / 60

        ).toFixed(2)

    );


}







function zeitZuDezimal(
    start,
    ende
) {


    if(
        !start ||
        !ende
    )
    return 0;



    let a =
    new Date(
        "2000-01-01 " + start
    );


    let b =
    new Date(
        "2000-01-01 " + ende
    );



    let minuten =
    (

        b - a

    ) / 60000;



    return Number(

        (

        minuten / 60

        )

        .toFixed(2)

    );


}







function formatDezimal(
wert
) {


    return wert
    .toFixed(2)
    .replace(".", ",")
    +
    " h";


}
