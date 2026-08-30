/* ==========================================
   AUDITIVE NIGHTMARE
   LOADING BAR
========================================== */


/* ==========================================
   MODE TEST
========================================== */

/*
true  = tu choisis une date fictive
false = vraie date actuelle
*/

const TEST_MODE = false;


/*
Date utilisée uniquement en mode TEST.

Tu peux changer cette date pour tester.

Exemple :

2026-08-30T18:00:00

ou

2026-10-31T00:00:00
*/

const TEST_DATE = "2026-09-30T18:00:00";


/* ==========================================
   DATES DU LOADING
========================================== */

const START_DATE =
    new Date("2026-08-26T18:00:00").getTime();

const END_DATE =
    new Date("2026-10-31T00:00:00").getTime();


/* ==========================================
   CHECKPOINTS
========================================== */

const EVENTS = [

    ["2026-08-26T18:00:00", 'STORY "LOADING"'],

    ["2026-08-27T12:00:00", "REEL — OFF A X 1"],

    ["2026-08-29T18:00:00", "REEL — OFF A X 2"],

    ["2026-09-02T12:00:00", "REEL — OFF A X 3 AVEC DATE"],

    ["2026-09-04T18:00:00", "DROP — REEL DROP TEASE EP"],

    ["2026-09-08T18:00:00", "REEL — LEANSPILL → RETAFFER EVIL_1"],

    ["2026-09-11T18:00:00", "REEL — BADDIE ZONE"],

    ["2026-09-16T12:00:00", "POST — FIT PIC"],

    ["2026-09-22T18:00:00", "REEL — I SEE SNAKES"],

    ["2026-09-25T12:00:00", "REEL — LEANSPILL"],

    ["2026-09-30T20:00:00", "REEL — PLAYAH + TEASE BARRE LOADING"],

    ["2026-10-02T00:00:00", "DROP — PLAYAH"],

    ["2026-10-02T18:00:00", "MUSIC VIDEO — PLAYAH → TRACKLIST"],

    ["2026-10-07T20:00:00", "REEL — I SEE SNAKES"],

    ["2026-10-14T18:00:00", "REEL — BURNYOEYES + DATE DU PROJET"],

    ["2026-10-19T18:00:00", "REEL — LEANSPILL TEASE MUSIC VIDEO"],

    ["2026-10-21T18:00:00", "MUSIC VIDEO — LEANSPILL + DATE DU PROJET"],

    ["2026-10-22T12:00:00", "TEASER OUT NOW — LEANSPILL"],

    ["2026-10-29T12:00:00", "REEL — LOADING + ARE YOU READY ?"],

    ["2026-10-31T00:00:00", "DROP — AUDITIVE NIGHTMARE"]

].map(event => {

    return {
        time: new Date(event[0]).getTime(),
        label: event[1]
    };

});


/* ==========================================
   ELEMENTS DE LA PAGE
========================================== */

const bar =
    document.getElementById("progress-bar");

const percent =
    document.getElementById("percentage");

const date =
    document.getElementById("date");

const status =
    document.getElementById("status");

const enter =
    document.getElementById("enter");

const checkpoints =
    document.getElementById("checkpoints");
checkpoints.style.display = "none";
const testButton =
    document.getElementById("test-button");

testButton.style.display = "none";

/* ==========================================
   DATE ACTUELLE
========================================== */

function getCurrentTime() {

    if (TEST_MODE) {

        return new Date(
            TEST_DATE
        ).getTime();

    }

    return Date.now();

}


/* ==========================================
   CALCUL DE LA PROGRESSION
========================================== */

function getProgress(currentTime) {

    const total =
        END_DATE - START_DATE;

    const elapsed =
        currentTime - START_DATE;

    let progress =
        (elapsed / total) * 100;


    /*
    Empêche la barre d'aller
    en dessous de 0 ou au-dessus de 100
    */

    progress =
        Math.max(
            0,
            Math.min(100, progress)
        );


    return progress;

}


/* ==========================================
   CHECKPOINTS
========================================== */

function displayCheckpoints(currentTime) {

    checkpoints.innerHTML = "";


    EVENTS.forEach(event => {

        const completed =
            currentTime >= event.time;


        const element =
            document.createElement("div");


        element.className =
            completed
                ? "checkpoint completed"
                : "checkpoint";


        const eventDate =
            new Date(event.time)
                .toLocaleString(
                    "fr-FR",
                    {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                );


        element.textContent =
            `${completed ? "[✓]" : "[ ]"} ${eventDate} — ${event.label}`;


        checkpoints.appendChild(
            element
        );

    });

}


/* ==========================================
   MISE À JOUR
========================================== */

function update() {

    const currentTime =
        getCurrentTime();


    const progress =
        getProgress(
            currentTime
        );


    /* BARRE */

    bar.style.width =
        progress + "%";


    /* POURCENTAGE */

    percent.textContent =
        progress.toFixed(2) + "%";


    /* DATE */

    date.textContent =
        new Date(
            currentTime
        ).toLocaleString(
            "fr-FR"
        );


    /* CHECKPOINTS */

    displayCheckpoints(
        currentTime
    );


    /* FIN */

    if (progress >= 100) {

        status.textContent =
            "LOADING COMPLETE";

        enter.classList.add(
            "active"
        );

    }

    else {

        status.textContent =
            TEST_MODE
                ? "TEST MODE"
                : "PLEASE WAIT...";

        enter.classList.remove(
            "active"
        );

    }

}


/* ==========================================
   BOUTON TEST
========================================== */

/*
Clique dessus pour afficher dans
la console la date actuellement simulée.
*/

testButton.addEventListener(
    "click",
    () => {

        console.log(
            "TEST DATE :",
            TEST_DATE
        );

        console.log(
            "PROGRESSION :",
            getProgress(
                getCurrentTime()
            ).toFixed(2) + "%"
        );

    }
);


/* ==========================================
   LANCEMENT
========================================== */

update();


/*
Actualisation toutes les secondes
*/

setInterval(
    update,
    1000
);
