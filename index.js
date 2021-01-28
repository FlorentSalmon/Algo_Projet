fs = require('fs')

function read_and_write_file(fileIn, fileOut){
    fs.readFile(fileIn,{encoding: 'utf8'},function(err,data) {
        if(err) return console.error(err);
        movies = JSON.parse(data);
        for(i = 0; i < movies.length; i++){
            let index = movies[i];
            let date = new Date(index['release_date'] * 1000);
            let year = date.getFullYear();
            let title = index['title'] + ' (' + year + ')';
            index['title'] = title;
        }
        movies = JSON.stringify(movies, null, 3);

        fs.writeFile(fileOut,movies,function(err) {
            if(err) return console.error(err);
            console.log('done');
            })
    })
}

//read_and_write_file('Json/movies.json', 'Json/moviesDate.json');

function sort_date(){
    console.log('Winner')
}

function sort_titre(){
    console.log('Looser')
}

function save_image() {
const fs = require('fs')
const request = require('request')
const download = (url, path, callback) => { request.head(url, (err, res, body) => {
request(url) .pipe(fs.createWriteStream(path)) .on('close', callback)
}) }
const url = 'https://...'
const path = './images/image.png'
download(url, path, () => { console.log('✅ Done!')
})
}

arg = process.argv;
for(i = 0; i < arg.length; i++){
    if(arg[i] == '-action'){
        if(arg[i+1] == 'sort_date'){
            sort_date();
        }
        if(arg[i+1] == 'sort_titre'){
            sort_titre();
        }
    }
    if(arg[i] == "--h" || arg[i] == "--help"){
        console.log("Voici une aide à ce que peut faire le programme: \n" + 
        "\t --help: Résumé de toutes les actions possibles \n" + 
        "\t -action: Permet de réaliser des actions: \n" + 
        "\t \t -sort_date: sort_date ./fichierEntrer.json ./fichierSortie.json ; Pour oragniser votre fichjier dans l'ordre annuel \n" + 
        "\t \t -sort_titre: sort_titre ./fichierEntrer.json ./fichierSortie.json ; Pour oragniser votre fichjier dans l'ordre alphabetique\n" +
        "\t \t -search_date: search_date ./fichierEntrer.json <year> <sorted>(true or false) ; Pour chercher tous les films d'une certaine année \n" +
        "\t \t -search_key_word: search_key_word ./fichierEntrer.json <key_word> <genre> ; Pour chercher tous les films d'un genre donnée avec un mot-clé présent dans sa description'\n" +
        "\t \t -color <CheminDossier> ; Pour connaitre la couleur moyenne des affiches de films \n");
    }
}
