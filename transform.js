fs = require('fs')
const request = require('request')

module.exports = {
    add_Date: function(fileIn, fileOut){
        // Lecture du fichier .json
        fs.readFile(fileIn,{encoding: 'utf8'},function(err,data) {
            if(err) return console.error(err);
            let start = new Date().getTime();
            movies = JSON.parse(data);
            // Boucle avoir tous les release_date 
            for(i = 0; i < movies.length; i++){
                let index = movies[i];
                let date = new Date(index['release_date'] * 1000);
                // Récupération de l'année de la Date créer
                let year = date.getFullYear();
                // Ajout de l'année entre parenthèses
                let title = index['title'] + ' (' + year + ')';
                index['title'] = title;
            }
            let stop = new Date().getTime(); 
            console.log("\nThe program took " + (stop - start) + "ms\n");
            movies = JSON.stringify(movies, null, 3);
            // écriture du nouveau fichier en .json
            fs.writeFile(fileOut,movies,function(err) {
                if(err) return console.error(err);
                console.log('done');
                })
        })
        return fileOut;
    }
}
