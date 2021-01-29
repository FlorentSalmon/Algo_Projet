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
    let width = image.bitmap.width;
    let height = image.bitmap.height;
    let rgba = []
    for(i = 0; i < width; i++){
        for(j = 0; j < height; j++){
            x = i;
            y = j; 
            hex = image.getPixelColor(x, y);
            // returns the colour of that pixel e.g. 0xFFFFFFFF
            hex = Jimp.intToRGBA(hex);
            // e.g. converts 0xFFFFFFFF to {r: 255, g: 255, b: 255, a:255}
            rgba.push(hex);
        }
    }
    let r = 0;
    let g = 0;
    let b = 0;
    let a =0;
    for(i = 0; i < rgba.length; i++){
        r = rgba[i].r + r
        g = rgba[i].g + g
        b = rgba[i].b + b
        a = rgba[i].a + a
    }
    mr = r / rgba.length;
    mg = g / rgba.length;
    mb = b / rgba.length;
    ma = a / rgba.length;
    hex = Jimp.rgbaToInt(mr, mg, mb, ma);
    console.log('HEX: ' + hex);
    return hex
    });
}
    

            

function isAction(arg, i, saving){
    if(arg[i] == '-action'){
        if(arg[i+1] == 'sort_date'){
            fileInput = sort.sort_date(arg[i+2], arg[i+3]);
            // Tri par date (Chemin entrant, Chemin sortant)
            if(saving == true){
                save.save_img(arg[i-1], fileInput)
                 // Télécharge les images 
            }
        }
        if(arg[i+1] == 'sort_titre'){
            fileInput = sort.sort_titre(arg[i+2], arg[i+3]);
            // Tri par titre (Chemin entrant, Chemin sortant)
            if(saving == true){
                save.save_img(arg[i-1], fileInput)
                // Télécharge les images
            }
        }
        if(arg[i+1] == 'search_date'){
            if(arg[i+4] == 'true'){
                fileInput = search.search_date_sorted(arg[i+2], arg[i+3])
                // Recherche par date trié (Chemin entrant, Chemin sortant, true)
                if(saving == true){
                    save.save_img(arg[i-1], fileInput)
                    // Télécharge les images
                }
            }
            if(arg[i+4] == 'false'){
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
            get_average_rgb(arg[i+2])
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

