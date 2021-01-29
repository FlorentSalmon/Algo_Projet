const { title } = require('process');
const benchmark = require("./benchmark");
const search = require('./search');
const transform = require('./transform');
const sort = require('./sort')
const fs = require('fs')
const request = require('request');
const save = require('./save')
const Jimp = require('jimp') 
 

function get_average_rgb(path){
Jimp.read(path,function (err, image) {
    image.getPixelColor(x, y);
    // returns the colour of that pixel e.g. 0xFFFFFFFF
    Jimp.intToRGBA(hex);
    // e.g. converts 0xFFFFFFFF to {r: 255, g: 255, b: 255, a:255}
    });
}
    

            

function isAction(arg, i, saving){
    if(arg[i] == '-action'){
        if(arg[i+1] == 'sort_date'){
            fileInput = sort.sort_date(arg[i+2], arg[i+3]);
            if(saving == true){
                save.save_img(arg[i-1], fileInput)
            }
        }
        if(arg[i+1] == 'sort_titre'){
            fileInput = sort.sort_titre(arg[i+2], arg[i+3]);
            if(saving == true){
                save.save_img(arg[i-1], fileInput)
            }
        }
        if(arg[i+1] == 'search_date'){
            if(arg[i+4] == 'true'){
                fileInput = search.search_date_sorted(arg[i+2], arg[i+3])
                if(saving == true){
                    save.save_img(arg[i-1], fileInput)
                }
            }
            if(arg[i+4] == 'false'){
                fileInput = search.search_date_no_sorted(arg[i+2], arg[i+3])
                if(saving == true){
                    save.save_img(arg[i-1], fileInput)
                }
            }
        }
        if(arg[i+1] == 'search_key_word'){
            search.search_key_word(arg[i+2], arg[i+3], arg[i+4])
        }
        if(arg[i+1] == 'color'){
            get_average_rgb('./images/618.jpg')
        }
    }
}
arg = process.argv;
saving = false;
for(i = 0; i < arg.length; i++){
    if(arg[i] == '-save'){
        isAction(arg, i+2, true);
        saving = true;
    }else if(saving == false){
        isAction(arg, i, false);
    }
    
    if(arg[i] == "--h" || arg[i] == "--help"){
        console.log("Voici une aide à ce que peut faire le programme: \n" + 
        "\t --help\--h: Résumé de toutes les actions possibles \n" +
        "\t -save: Pour sauvegarder les images de films des diférentes action demandés \n" + 
        "\t -action: Permet de réaliser des actions: \n" + 
        "\t \t -sort_date: sort_date ./fichierEntrer.json ./fichierSortie.json ; Pour oragniser votre fichjier dans l'ordre annuel \n" + 
        "\t \t -sort_titre: sort_titre ./fichierEntrer.json ./fichierSortie.json ; Pour oragniser votre fichjier dans l'ordre alphabetique\n" +
        "\t \t -search_date: search_date ./fichierEntrer.json <year> <sorted>(true or false) ; Pour chercher tous les films d'une certaine année \n" +
        "\t \t -search_key_word: search_key_word ./fichierEntrer.json <key_word> <genre> ; Pour chercher tous les films d'un genre donnée avec un mot-clé présent dans sa description'\n" +
        "\t \t -color <CheminDossier> ; Pour connaitre la couleur moyenne des affiches de films \n");
    }
}

