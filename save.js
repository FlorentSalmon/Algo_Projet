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
            fs.readFile(fileInput,{encoding: 'utf8'},function(err,data) {
                if(err) return console.error(err);
                movies = JSON.parse(data);
                for(i = 0; i < movies.length; i++){
                    const url = movies[i].poster;
                    const path = pathfolder + movies[i].id + '.jpg';
                    download(url, path, () => {
                })
            }
            movies = JSON.stringify(movies, null, 2);
            fs.writeFile(fileInput,movies,function(err) {
                if(err) return console.error(err);                
                })
        })
    }
}        