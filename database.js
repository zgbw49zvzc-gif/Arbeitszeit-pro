// Arbeitszeit Pro
// Datenbank Verwaltung



function ladeEintraege() {


    return JSON.parse(

        localStorage.getItem(
            "eintraege"
        )

    ) || [];

}




function speichereEintrag(eintrag) {


    let liste =
    ladeEintraege();



    liste.unshift(
        eintrag
    );



    localStorage.setItem(

        "eintraege",

        JSON.stringify(
            liste
        )

    );


}







function ladeZeitkonto() {


    return Number(

        localStorage.getItem(
            "zeitkonto"
        )

    ) || 0;


}







function speichereZeitkonto(wert) {


    localStorage.setItem(

        "zeitkonto",

        wert

    );


}







function formatDatum() {


    return new Date()

    .toLocaleDateString(
        "de-DE"
    );


}







function zeigeEintraege() {


    const liste =
    document.getElementById(
        "liste"
    );



    if (!liste) {

        return;

    }





    let eintraege =
    ladeEintraege();




    if (
        eintraege.length === 0
    ) {


        liste.innerHTML =
        "<p>Noch keine Einträge</p>";


        return;

    }







    liste.innerHTML = "";





    eintraege
    .slice(0,20)
    .forEach(
    eintrag => {



        let div =
        document.createElement(
            "div"
        );



        div.className =
        "tag";



        div.innerHTML =


        `

        <div>

        <strong>
        ${eintrag.art}
        </strong>

        <br>

        <span class="klein">

        ${eintrag.datum}

        ${
        eintrag.notiz
        ?
        " - " + eintrag.notiz
        :
        ""
        }

        </span>

        </div>


        <div>

        ${eintrag.zeit} h

        </div>

        `;



        liste.appendChild(
            div
        );



    });


}
