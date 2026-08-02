// Arbeitszeit Pro
// Datenbank Verwaltung


function datumHeute() {

    let heute = new Date();

    return heute.toISOString()
        .split("T")[0];

}



function ladeTage() {

    return JSON.parse(
        localStorage.getItem("arbeitstage")
    ) || [];

}




function speichereTag(eintrag) {

    let tage = ladeTage();


    tage.push(eintrag);


    localStorage.setItem(
        "arbeitstage",
        JSON.stringify(tage)
    );

}




function alleTage() {

    return ladeTage();

}
