/*
  CALENDRIER DU TEASING
  ---------------------
  Les lignes sans date ne sont volontairement PAS comptées
  dans la progression.
*/

const EVENTS = [
  { date: "2026-08-26T18:00:00", label: 'STORY "LOADING"' },
  { date: "2026-08-27T12:00:00", label: "REEL — OFF A X 1" },
  { date: "2026-08-29T18:00:00", label: "REEL — OFF A X 2" },
  { date: "2026-09-02T12:00:00", label: "REEL — OFF A X 3 AVEC DATE" },
  { date: "2026-09-04T18:00:00", label: "DROP — REEL DROP TEASE EP" },
  { date: "2026-09-08T18:00:00", label: "REEL — LEANSPILL → RETAFFER EVIL_1" },
  { date: "2026-09-11T18:00:00", label: "REEL — BADDIE ZONE" },
  { date: "2026-09-16T12:00:00", label: "POST — FIT PIC" },
  { date: "2026-09-22T18:00:00", label: "REEL — I SEE SNAKES" },
  { date: "2026-09-25T12:00:00", label: "REEL — LEANSPILL" },
  { date: "2026-09-30T20:00:00", label: "REEL — PLAYAH + TEASE BARRE LOADING" },
  { date: "2026-10-02T00:00:00", label: "DROP — PLAYAH" },
  { date: "2026-10-02T18:00:00", label: "MUSIC VIDEO — PLAYAH → TRACKLIST DEDANS" },
  { date: "2026-10-07T20:00:00", label: "REEL — I SEE SNAKES" },
  { date: "2026-10-14T18:00:00", label: "REEL — BURNYOEYES + DATE DU PROJET" },
  { date: "2026-10-19T18:00:00", label: "REEL — LEANSPILL TEASE MUSIC VIDEO" },
  { date: "2026-10-21T18:00:00", label: "MUSIC VIDEO — LEANSPILL + DATE DU PROJET" },
  { date: "2026-10-22T12:00:00", label: "TEASER OUT NOW — LEANSPILL" },
  { date: "2026-10-29T12:00:00", label: "REEL — LOADING + ARE YOU READY ?" },
  { date: "2026-10-31T00:00:00", label: "DROP — AUDITIVE NIGHTMARE" }
].map(event => ({
  ...event,
  time: new Date(event.date).getTime()
})).sort((a, b) => a.time - b.time);

const progressBar = document.getElementById("progress-bar");
const progressPercent = document.getElementById("progress-percent");
const progressDate = document.getElementById("progress-date");
const status = document.getElementById("status");
const milestones = document.getElementById("milestones");
const enterLink = document.getElementById("enter-link");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function calculateProgress(now) {
  const first = events[0].time;
  const last = events[events.length - 1].time;

  if (now <= first) return 0;
  if (now >= last) return 100;

  // Progression basée sur le temps réel écoulé,
  // pas sur le nombre d'événements.
  return ((now - first) / (last - first)) * 100;
}

function renderMilestones(now) {
  milestones.innerHTML = events.map(event => {
    const done = now >= event.time;
    const date = new Date(event.time).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });

    return `
      <div class="milestone ${done ? "done" : ""}">
        ${done ? "[✓]" : "[ ]"} ${date} — ${event.label}
      </div>
    `;
  }).join("");
}

function update() {
  const now = Date.now();
  const progress = clamp(calculateProgress(now), 0, 100);

  progressBar.style.width = `${progress}%`;
  progressPercent.textContent = `${progress.toFixed(2)}%`;

  progressDate.textContent = new Date(now).toLocaleString("fr-FR");

  if (progress >= 100) {
    status.textContent = "LOADING COMPLETE.";
    enterLink.classList.add("unlocked");
  } else {
    status.textContent = "loading...";
    enterLink.classList.remove("unlocked");
  }

  renderMilestones(now);
}

update();
setInterval(update, 1000);
