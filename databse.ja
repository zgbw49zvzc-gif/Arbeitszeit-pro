// Arbeitszeit Pro 0.3
// Lokale Datenbank


function datumHeute() {

    const datum = new Date();

    return datum.toLocaleDateString(
        "de-DE"
    );

}




function ladeTage() {

    return JSON.parse(

        localStorage.getItem(
            "arbeitstage"
        )

    ) || [];

}





function speichereTag(tag) {


    let tage = ladeTage();


    tage.unshift(tag);


    localStorage.setItem(

        "arbeitstage",

        JSON.stringify(tage)

    );

}





function zeigeTage() {


    const bereich =
    document.getElementById(
        "tage"
    );


    if (!bereich) {
        return;
    }



    let tage = ladeTage();



    if (tage.length === 0) {

        bereich.innerHTML =
        "<p>Noch keine Einträge</p>";

        return;

    }




    bereich.innerHTML = "";



    tage.slice(0,10)
    .forEach(tag => {



        let element =
        document.createElement(
            "div"
        );


        element.className =
        "tag";



        element.innerHTML =

        `
        <span>
        ${tag.datum}
        </span>

        <span>
        ${tag.saldo}
        </span>
        `;



        bereich.appendChild(
            element
        );

    });


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
