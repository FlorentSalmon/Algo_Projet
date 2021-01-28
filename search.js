const fs = require('fs')
const request = require('request')

function findM(tab){
    return Math.floor(tab.length / 2);
}

function search_sorted(movies,date){
    
}

function isInDescription(word, description){
    description = description.split(' ');

    for(let i =0; 1 < description.length; i++){
        if(description[i].toLowerCase() == word){
            return true;
        }
    }
    return false;
}

module.exports = {
    search_date_sorted: function(fileIn, date){
        fs.readFile(fileIn,{encoding: 'utf8'},function(err,data) {
            if(err) return console.error(err);
            movies = JSON.parse(data);
            let moviesSortedwithDate = search_sorted(movies, date);
            
            moviesSortedWithDate = JSON.stringify(moviesSortedWithDate, null, 2);
            fs.writeFile('Json/movies' + date + '.json',moviesSortedwithDate,function(err) {
                if(err) return console.error(err);
                console.info('done');
                })
        })
    },




    search_date_no_sorted: function(fileIn, date){
        fs.readFile(fileIn,{encoding: 'utf8'},function(err,data) {
            if(err) return console.error(err);   
            movies = JSON.parse(data); 
            let moviesWithDate = [];
            for(i = 0; i < movies.length; i++){
                index = movies[i];
                if(index['title'].includes('('+date+')')){
                    moviesWithDate.push(movies[i]);
                } 
            }
            moviesWithDate = JSON.stringify(moviesWithDate, null, 2);
            fs.writeFile('Json/movies' + date + '.json',moviesWithDate,function(err) {
                if(err) return console.error(err);
                console.info('done');
                })
        })
        fileInput = 'Json/movies' + date + '.json';
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
                    const path = './images/'+movies[i].id+'.png';
                    download(url, path, () => {
                })
            }
        })
        console.info('Recherche de tous les films de ' + date);
    },

    search_key_word: function(fileIn ,key_word, genre){
        fs.readFile(fileIn,{encoding: 'utf8'},function(err,data) {
            if(err) return console.error(err);   
            movies = JSON.parse(data); 
            let moviesWithKeyWord = [];
            for(i = 0; i < movies.length; i++){
                const index = movies[i];
                try{
                    for(j=0; j < index.genres.length; j++){
                        if(isInDescription(key_word, index.overview) && index.genres[j].toLowerCase() == genre.toLowerCase()){
                            console.log(index);
                            moviesWithKeyWord.push(index);
                            }
                        } 
                    }
                catch(TypeError) {}
               
            }
            moviesWithKeyWord = JSON.stringify(moviesWithKeyWord, null, 2);
            fs.writeFile('Json/movies' + key_word + '.json',moviesWithKeyWord,function(err) {
                if(err) return console.error(err);
                console.info('done');
            }) 
        })
    }
}