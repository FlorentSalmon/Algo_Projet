const fs = require('fs')
const request = require('request')  

module.exports = {
    save_img: function(pathfolder, fileInput){
        const download = (url, path, callback) => {
            request.head(url, (err, res, body) => {
            request(url)
            .pipe(fs.createWriteStream(path))
            .on('close', callback)
            })
            }
            const data = fs.readFileSync(fileInput)
                movies = JSON.parse(data);
                // Récupération des liens de chaque images du fichier .json
                for(i = 0; i < movies.length; i++){
                    const url = movies[i].poster;
                    const path = pathfolder + movies[i].id + '.jpg';
                    download(url, path, () => {
                })
            }
            // Ajout du fichier.json dans le dossier
            movies = JSON.stringify(movies, null, 2);
            fs.writeFileSync(pathfolder + 'moviesForImages.json',movies)
    }
}        