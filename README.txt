# ALBUM TEASER — GitHub Pages

## 1. Modifier les dates

Ouvre `script.js` et modifie uniquement la partie :

const EVENTS = [
  { date: "2026-08-25", label: "START" },
  ...
];

Le premier événement correspond à 0%.
Le dernier correspond à 100%.

La barre progresse automatiquement avec le temps entre les événements.

## 2. Tester le site sur ton PC

Le plus simple :

- ouvre `index.html` dans ton navigateur.

Pour tester la page finale immédiatement, tu peux temporairement mettre la dernière date dans `script.js` à une date passée.

Exemple :
{ date: "2026-08-01", label: "FINAL REVEAL" }

Recharge ensuite la page : le bouton ENTER doit apparaître.

## 3. Mettre tes images

Crée un dossier :

assets/

Puis ajoute :

image-01.jpg
image-02.jpg
image-03.jpg
image-04.jpg

Tu peux changer les noms dans `archive.html`.

## 4. Mettre sur GitHub Pages

Crée un nouveau repository GitHub.

Envoie les fichiers :

index.html
archive.html
style.css
script.js
archive.js
assets/

Puis :

Settings
→ Pages
→ Deploy from a branch
→ main
→ / (root)
→ Save

GitHub te donnera une adresse du type :

https://TON-PSEUDO.github.io/NOM-DU-REPO/

Le lien est directement partageable.

## 5. Tester sans attendre la vraie date

Dans `script.js`, remplace temporairement la dernière date par une date passée.

Une fois le fonctionnement vérifié, remets la vraie date.

## IMPORTANT

La progression est calculée par rapport à l'heure/date du visiteur.

Donc quelqu'un qui ouvre le site depuis un autre pays peut avoir une très légère différence autour de minuit.
Pour un teasing artistique, ce système est généralement suffisant.

Si tu veux une progression qui soit absolument identique pour tout le monde à la seconde près, il faudra passer par une heure de référence UTC ou un petit backend.
