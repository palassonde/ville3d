# ville3d

Generation procedural d'une ville

## Auteur
* Pierre-Alexandre Lassonde
* Julien Perron


## Serveur

* $ java Server
* Port : 8080
* localhost:8080/

## Mouvement

* Flèche de direction
* D pour decendre (axe Y)
* U pour monter (axe Y)

## Composition des fichier

* Cellule.js : Contient les élément important d'une cellule
* checkForm.js : Vérifie les informations du formulaire
* load.js : Charge tous les élément JSON
* main.js : Contient le squelette de Three.js (create / update)
* modelJson.js : Contient les information trouver au chargement de fichier JSON
* mouvement.js : Contient le code pour le mouvement dans l'application
* planher.js : Créer une grille de cellule et positionne des object (batiment,parc,..)
* ville.js : Créer un "plancher", camera, lumière + mise à jour du contenu.
* Tween.js : Code qui permet de faire des tween dans three.js