// Arbeitszeit Pro 1.0
// Datenspeicherung


function ladeDaten() {

    return JSON.parse(
        localStorage.getItem("arbeitszeitPro")
    ) || {

        eintraege: [],

        zeitkonto: 0,

        start: null,

        ende: null,

        einstellungen: {

            sollzeit: 7,

            pause: 45

        }

    };

}




function speichereDaten(daten) {

    localStorage.setItem(

        "arbeitszeitPro",

        JSON.stringify(daten)

    );

}




function heute() {

    return new Date()
    .toLocaleDateString(
        "de-DE"
    );

}




function zeitInMinuten(zeit) {

    let teile =
    zeit.split(":");


    return (

        Number(teile[0]) * 60

        +

        Number(teile[1])

    );

}




function minutenZuZeit(minuten) {


    let minus =
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

    stunden
    +
    ":"
    +
    rest
    .toString()
    .padStart(2,"0");



    return minus
    ?
    "-" + text
    :
    "+" + text;

}
