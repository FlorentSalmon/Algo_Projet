const { title } = require('process');
const benchmark = require("./benchmark");
const search = require('./search');
const transform = require('./transform');
const sort = require('./sort')
const fs = require('fs')
const request = require('request')

/*
const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
    request(url)
    .pipe(fs.createWriteStream(path))
    .on('close', callback)
    })
    }
    fs.readFile(fileIn,{encoding: 'utf8'},function(err,data) {
        if(err) return console.error(err);
        movies = JSON.parse(data);
        for(i = 0; i < movies.length; i++){
            const url = movies[i].poster;
            const path = './images/'+movies[i].id+'.png';
            download(url, path, () => {
        })
    }
})*/
    

function save_image() {
    const request = require('request')
    const download = (url, path, callback) => { request.head(url, (err, res, body) => {
    request(url) .pipe(fs.createWriteStream(path)) .on('close', callback)
    }) }
    const url = 'https://...'
    const path = './images/image.png'
    download(url, path, () => { console.log('✅ Done!')
    })
}
search.search_key_word('./Json/movies.json','boy' , 'Action');

arg = process.argv;
for(i = 0; i < arg.length; i++){
    if(arg[i] == '-action'){
        if(arg[i+1] == 'sort_date'){
            let x =()=> {
                sort.sort_date(arg[i+2], arg[i+3]);
            }
            benchmark.benchmark(x);
        }
        if(arg[i+1] == 'sort_titre'){
            let x =()=> {
                sort.sort_titre(arg[i+2], arg[i+3]);
            }
            benchmark.benchmark(x);
        }
        if(arg[i+1] == 'search_date'){
            if(arg[i+4] == 'true'){
                let x = () => {
                    search.search_date_sorted(arg[i+2], arg[i+3])
                }
                benchmark.benchmark(x);
            }
            if(arg[i+4] == 'false'){
                let x = () => {
                    search.search_date_no_sorted(arg[i+2], arg[i+3])
                }
                benchmark.benchmark(x);
            }
        }
        if(arg[i+1] == 'search_key_word'){
            let x =()=> {
                search.search_key_word(arg[i+2], arg[i+3], arg[i+4])
            }
            benchmark.benchmark(x);
        }
    }
    if(arg[i] == "--h" || arg[i] == "--help"){
        console.log("Voici une aide à ce que peut faire le programme: \n" + 
        "\t --help\--h: Résumé de toutes les actions possibles \n" + 
        "\t -action: Permet de réaliser des actions: \n" + 
        "\t \t -sort_date: sort_date ./fichierEntrer.json ./fichierSortie.json ; Pour oragniser votre fichjier dans l'ordre annuel \n" + 
        "\t \t -sort_titre: sort_titre ./fichierEntrer.json ./fichierSortie.json ; Pour oragniser votre fichjier dans l'ordre alphabetique\n" +
        "\t \t -search_date: search_date ./fichierEntrer.json <year> <sorted>(true or false) ; Pour chercher tous les films d'une certaine année \n" +
        "\t \t -search_key_word: search_key_word ./fichierEntrer.json <key_word> <genre> ; Pour chercher tous les films d'un genre donnée avec un mot-clé présent dans sa description'\n" +
        "\t \t -color <CheminDossier> ; Pour connaitre la couleur moyenne des affiches de films \n");
    }
}

