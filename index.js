// Tous les imports
const { title } = require('process');
const benchmark = require("./benchmark");
const search = require('./search');
const transform = require('./transform');
const sort = require('./sort')
const fs = require('fs')
const request = require('request');
const save = require('./save')
const Jimp = require('jimp')
const color = require('./color') 
 


    

            

function isAction(arg, i, saving){
    // Vérification du premier argument
    if(arg[i] == '-action'){
        // Vérification de l'action a réaliser
        if(arg[i+1] == 'transform'){
            fileInput = transform.add_Date(arg[i+2], arg[i+3]);
            // Ajout des dates (Chemin entrant, Chemin sortant)
            if(saving == true){
                save.save_img(arg[i-1], fileInput)
                 // Télécharge les images 
            }
        }
        // Vérification de l'action a réaliser
        if(arg[i+1] == 'sort_date'){
            fileInput = sort.sort_date(arg[i+2], arg[i+3]);
            // Tri par date (Chemin entrant, Chemin sortant)
            if(saving == true){
                save.save_img(arg[i-1], fileInput)
                 // Télécharge les images 
            }
        }
        // Vérification de l'action a réaliser
        if(arg[i+1] == 'sort_titre'){
            fileInput = sort.sort_titre(arg[i+2], arg[i+3]);
            // Tri par titre (Chemin entrant, Chemin sortant)
            if(saving == true){
                save.save_img(arg[i-1], fileInput)
                // Télécharge les images
            }
        }
        // Vérification de l'action a réaliser
        if(arg[i+1] == 'search_date'){
            // Vérification de l'action a réaliser
            if(arg[i+4] == 'true'){
                fileInput = search.search_date_sorted(arg[i+2], arg[i+3])
                // Recherche par date trié (Chemin entrant, Chemin sortant, true)
                if(saving == true){
                    save.save_img(arg[i-1], fileInput)
                    // Télécharge les images
                }
            }
            if(arg[i+4] == 'false'){
                // Vérification de l'action a réaliser
                fileInput = search.search_date_no_sorted(arg[i+2], arg[i+3])
                // Recherche par date non trié (Chemin entrant, Chemin sortant, false)
                if(saving == true){
                    save.save_img(arg[i-1], fileInput)
                    // Télécharge les images
                }
            }
        }
        if(arg[i+1] == 'search_key_word'){
            search.search_key_word(arg[i+2], arg[i+3], arg[i+4])
            // Recherche par mot clé (Chemin entrant, mot clé, genre)
        }
        if(arg[i+1] == 'color'){
            color.get_average_rgb(arg[i+2])
        }
    }
}
arg = process.argv;
saving = false;
// Menu de selection des entrées des arguments
for(i = 0; i < arg.length; i++){
    // Vérification du premier argument
    if(arg[i] == '-save'){
        isAction(arg, i+2, true);
        saving = true;
    }else if(saving == false){
        isAction(arg, i, false);
    }
    // Menu help pour avoir toutes les actions réalisables
    if(arg[i] == "--h" || arg[i] == "--help"){
        console.log("Voici une aide à ce que peut faire le programme: \n" + 
        "\t --help\--h: Résumé de toutes les actions possibles \n" +
        "\t -save: Pour sauvegarder les images de films des diférentes action demandés \n" + 
        "\t -action: Permet de réaliser des actions: \n" + 
        "\t \t -transform: transform ./fichierEntrer.json ./fichierSortie.json ; Pour ajouter les dates de sortis de chhaque film \n" +
        "\t \t -sort_date: sort_date ./fichierEntrer.json ./fichierSortie.json ; Pour oragniser votre fichjier dans l'ordre annuel \n" + 
        "\t \t -sort_titre: sort_titre ./fichierEntrer.json ./fichierSortie.json ; Pour oragniser votre fichjier dans l'ordre alphabetique\n" +
        "\t \t -search_date: search_date ./fichierEntrer.json <year> <sorted>(true or false) ; Pour chercher tous les films d'une certaine année \n" +
        "\t \t -search_key_word: search_key_word ./fichierEntrer.json <key_word> <genre> ; Pour chercher tous les films d'un genre donnée avec un mot-clé présent dans sa description'\n" +
        "\t \t -color <CheminDossier> ; Pour connaitre la couleur moyenne des affiches de films \n");
    }
}

