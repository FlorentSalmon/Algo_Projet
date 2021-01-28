fs = require('fs')

function findM(tab){
    return Math.floor(tab.length / 2);
}

function search_sorted(movies,date){
    
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
    }
}


module.exports = {
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
        console.info('Recherche de tous les films de ' + date);
    }
}