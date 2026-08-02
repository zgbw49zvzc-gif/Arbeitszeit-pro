// Arbeitszeit Pro 1.0
// Kalenderanzeige


function zeigeKalender() {


    const feld =
    document.getElementById(
        "kalenderInhalt"
    );


    if(!feld) return;



    let daten =
    ladeDaten();



    if(
        daten.eintraege.length === 0
    ){

        feld.innerHTML =
        "Noch keine Einträge";

        return;

    }





    feld.innerHTML = "";




    daten.eintraege
    .slice(0,30)
    .forEach(
    eintrag => {



        let element =
        document.createElement(
            "div"
        );


        element.className =
        "zeile";



        element.innerHTML =

        `

        <span>

        ${eintrag.datum}

        <br>

        ${eintrag.art}

        </span>


        <strong>

        ${eintrag.zeit}

        h

        </strong>

        `;



        feld.appendChild(
            element
        );


    });


}





zeigeKalender();
