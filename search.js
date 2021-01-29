const fs = require('fs')

function swap(tab,a,b){
    let tmp = tab[a];
    tab[a] = tab[b];
    tab[b] = tmp;
}

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
        const data = fs.readFileSync(fileIn)
            let start = new Date().getTime();
            movies = JSON.parse(data);
            let moviesSortedwithDate = search_sorted(movies, date);
            
            let stop = new Date().getTime(); 
            console.log("\nThe program took " + (stop - start) + "ms\n"); 
            moviesSortedWithDate = JSON.stringify(moviesSortedWithDate, null, 2);
            fs.writeFileSync('Json/movies' + date + '.json',moviesSortedwithDate)
        return 'Json/movies' + date + '.json'
    },




    search_date_no_sorted: function(fileIn, date){
        const data = fs.readFileSync(fileIn)
        movies = JSON.parse(data); 
        let start = new Date().getTime();
        let moviesWithDate = [];
        for(i = 0; i < movies.length; i++){
            index = movies[i];
            if(index['title'].includes('('+date+')')){
                moviesWithDate.push(movies[i]);
            } 
        }
        let stop = new Date().getTime(); 
        console.log("\nThe program took " + (stop - start) + "ms\n"); 
        moviesWithDate = JSON.stringify(moviesWithDate, null, 2);
        fs.writeFileSync('Json/movies' + date + '.json',moviesWithDate)
        console.info('Recherche de tous les films de ' + date);
        return 'Json/movies' + date + '.json'
    },

    search_key_word: function(fileIn ,key_word, genre){
        const data = fs.readFileSync(fileIn)
            let start = new Date().getTime();   
            movies = JSON.parse(data); 
            let moviesWithKeyWord = [];
            for(i = 0; i < movies.length; i++){
                const index = movies[i];
                try{
                    for(j=0; j < index.genres.length; j++){
                        if(isInDescription(key_word, index.overview) && index.genres[j].toLowerCase() == genre.toLowerCase()){
                            moviesWithKeyWord.push(index);
                            }
                        } 
                    }
                catch(TypeError) {}
            }
            //pour i allant de (taille de movie)-1 à 1
            for( let i = moviesWithKeyWord.length -1; i>=1;i--){
            //pour j allant de 0 à i-1
                for(let j = 0; j<=i-1; j++){
                //si movies[j+1]["title"] < movies[j]["title"]
                    if(moviesWithKeyWord[j+1]["release_date"] < moviesWithKeyWord[j]["release_date"]){
                    //échanger T[j+1] avec T[j]
                    swap(moviesWithKeyWord,j+1,j)
                    }
                }
            }
            console.log(moviesWithKeyWord[moviesWithKeyWord.length-1]);
            let stop = new Date().getTime(); 
            console.log("\nThe program took " + (stop - start) + "ms\n"); 
    }
}