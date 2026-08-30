/*
==================================================
        AUDITIVE NIGHTMARE — LOADING SYSTEM
==================================================

PROGRESSION RÉELLE :

START
26/08/2026 — 18:00
= 0%

END
31/10/2026 — 00:00
= 100%


MODE TEST :
TEST_MODE = true

Puis modifie TEST_DATE pour simuler
n'importe quelle date.

Quand tu veux remettre le vrai temps :
TEST_MODE = false
==================================================
*/


/* ================================================
   CONFIGURATION
================================================ */

// Mets true pour tester une date fictive
// Mets false pour utiliser la vraie date/heure
const TEST_MODE = true;


// Date fictive utilisée en mode TEST
const TEST_DATE = "2026-09-30T18:00:00";


// Début du loading
const START_DATE = new Date(
    "2026-08-26T18:00:00"
).getTime();


// Fin du loading
const END_DATE = new Date(
    "2026-10-31T00:00:00"
).getTime();



/* ================================================
   TES ÉVÉNEMENTS / CHECKPOINTS
================================================

Les lignes sans date ne sont PAS incluses.

26/08 18:00
27/08 12:00
29/08 18:00
02/09 12:00
etc.
*/

const EVENTS = [

    {
        date: "2026-08-26T18:00:00",
        label: 'STORY "LOADING"'
    },

    {
        date: "2026-08-27T12:00:00",
        label: "REEL — OFF A X 1"
    },

    {
        date: "2026-08-29T18:00:00",
        label: "REEL — OFF A X 2"
    },

    {
        date: "2026-09-02T12:00:00",
        label: "REEL — OFF A X 3 AVEC DATE"
    },

    {
        date: "2026-09-04T18:00:00",
        label: "DROP — REEL DROP TEASE EP"
    },

    {
        date: "2026-09-08T18:00:00",
        label: "REEL — LEANSPILL → RETAFFER EVIL_1"
    },

    {
        date: "2026-09-11T18:00:00",
        label: "REEL — BADDIE ZONE"
    },

    {
        date: "2026-09-16T12:00:00",
        label: "POST — FIT PIC"
    },

    {
        date: "2026-09-22T18:00:00",
        label: "REEL — I SEE SNAKES"
    },

    {
        date: "2026-09-25T12:00:00",
        label: "REEL — LEANSPILL"
    },

    {
        date: "2026-09-30T20:00:00",
        label: "REEL — PLAYAH + TEASE BARRE LOADING"
    },

    {
        date: "2026-10-02T00:00:00",
        label: "DROP — PLAYAH"
    },

    {
        date: "2026-10-02T18:00:00",
        label: "MUSIC VIDEO — PLAYAH → TRACKLIST DEDANS"
    },

    {
        date: "2026-10-07T20:00:00",
        label: "REEL — I SEE SNAKES"
    },

    {
        date: "2026-10-14T18:00:00",
        label: "REEL — BURNYOEYES + DATE DU PROJET"
    },

    {
        date: "2026-10-19T18:00:00",
        label: "REEL — LEANSPILL TEASE MUSIC VIDEO"
    },

    {
        date: "2026-10-21T18:00:00",
        label: "MUSIC VIDEO — LEANSPILL + DATE DU PROJET"
    },

    {
        date: "2026-10-22T12:00:00",
        label: "TEASER OUT NOW — LEANSPILL"
    },

    {
        date: "2026-10-29T12:00:00",
        label: "REEL — LOADING + ARE YOU READY ?"
    },

    {
        date: "2026-10-31T00:00:00",
        label: "DROP — AUDITIVE NIGHTMARE"
    }

].map(event => ({

    ...event,

    time: new Date(event.date).getTime()

})).sort((a, b) => a.time - b.time);



/* ================================================
   ELEMENTS HTML
================================================ */

const progressBar =
    document.getElementById("progress");

const percentage =
    document.getElementById("percentage");

const dateDisplay =
    document.getElementById("date");

const status =
    document.getElementById("status");

const enter =
    document.getElementById("enter");



/* ================================================
   OBTENIR LA DATE ACTUELLE
================================================ */

function getCurrentTime() {

    // MODE TEST
    if (TEST_MODE) {

        return new Date(
            TEST_DATE
        ).getTime();

    }


    // MODE RÉEL
    return Date.now();

}



/* ================================================
   CALCUL DU POURCENTAGE
================================================ */

function calculateProgress(currentTime) {

    const totalDuration =
        END_DATE - START_DATE;


    const elapsed =
        currentTime - START_DATE;


    let progress =
        (elapsed / totalDuration) * 100;


    // Bloque entre 0 et 100
    progress = Math.max(
        0,
        Math.min(100, progress)
    );


    return progress;

}



/* ================================================
   FORMATAGE DE LA DATE
================================================ */

function formatDate(timestamp) {

    return new Date(timestamp)
        .toLocaleString(
            "fr-FR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );

}



/* ================================================
   AFFICHAGE DES CHECKPOINTS
================================================ */

function renderCheckpoints(currentTime) {

    const container =
        document.getElementById("checkpoints");


    // Si tu n'as pas encore créé
    // l'élément #checkpoints dans ton HTML,
    // on ne fait rien.
    if (!container) return;


    container.innerHTML =
        EVENTS.map(event => {

            const completed =
                currentTime >= event.time;


            const date =
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


            return `
                <div class="checkpoint ${
                    completed ? "completed" : ""
                }">

                    <span class="checkpoint-date">
                        ${date}
                    </span>

                    <span class="checkpoint-status">
                        ${completed ? "[✓]" : "[ ]"}
                    </span>

                    <span class="checkpoint-label">
                        ${event.label}
                    </span>

                </div>
            `;

        }).join("");

}



/* ================================================
   MISE À JOUR PRINCIPALE
================================================ */

function updateLoading() {

    const currentTime =
        getCurrentTime();


    const progress =
        calculateProgress(
            currentTime
        );


    /* --------------------------------
       BARRE
    -------------------------------- */

    progressBar.style.width =
        `${progress}%`;


    /* --------------------------------
       POURCENTAGE EXACT
    -------------------------------- */

    percentage.textContent =
        `${progress.toFixed(2)}%`;


    /* --------------------------------
       DATE AFFICHÉE
    -------------------------------- */

    dateDisplay.textContent =
        formatDate(
            currentTime
        );


    /* --------------------------------
       CHECKPOINTS
    -------------------------------- */

    renderCheckpoints(
        currentTime
    );


    /* --------------------------------
       FIN DU LOADING
    -------------------------------- */

    if (progress >= 100) {

        percentage.textContent =
            "100.00%";


        status.textContent =
            "LOADING COMPLETE";


        if (enter) {

            enter.classList.add(
                "active"
            );

        }

    }


    /* --------------------------------
       LOADING EN COURS
    -------------------------------- */

    else {

        status.textContent =
            TEST_MODE
                ? "TEST MODE"
                : "PLEASE WAIT...";


        if (enter) {

            enter.classList.remove(
                "active"
            );

        }

    }

}



/* ================================================
   LANCEMENT
================================================ */

updateLoading();



/* ================================================
   ACTUALISATION
================================================ */

/*
En mode réel :
mise à jour chaque seconde.

En mode TEST :
la valeur reste celle de TEST_DATE.
*/

setInterval(
    updateLoading,
    1000
);
