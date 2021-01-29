const fs = require('fs')

function swap(tab,a,b){
    let tmp = tab[a];
    tab[a] = tab[b];
    tab[b] = tmp;
}

function partitionner_date(tab,premier,dernier,pivot){
    swap(tab,pivot,dernier);
    j = premier;
    for(i = premier;i<=dernier-1;i++){
        if( tab[i].release_date <= tab[dernier].release_date){
            swap(tab,i,j)
            // Change tab[i] et tab[dernier]
            j++;
        }
    }
    swap(tab,dernier,j)
    return j;
  

  function tri_rapide_date(tab,premier, dernier){
    if(premier<dernier){
        let pivot = Math.ceil((premier + dernier) / 2);
        pivot = partitionner_date(tab,premier,dernier,pivot);
        tri_rapide_date(tab,premier, pivot-1);
        tri_rapide_date(tab,pivot+1,dernier);
    }
    return tab;
  }
}

function search_sorted(movies){
    /**
     * Fonction qui va trié par film le plus récent
     */
    //pour i allant de (taille de movie)-1 à 1
    for( let i = movies.length -1; i>=1;i--){
        //pour j allant de 0 à i-1
        for(let j = 0; j<=i-1; j++){
        //si movies[j+1]["release_date"] < movies[j]["release_date"]
            if(movies[j+1]["release_date"] < movies[j]["release_date"]){
            //échanger movies[j+1] avec movies[j]
            swap(movies,j+1,j)
            }
        }
    }
    return movies;
}

function isInDescription(word, description){
    /**
     * Fonction qui va comparer si le mot demander est présent dans la description
     */
    description = description.split(' ');
    // création d'un tableau et qui effectue une sépération après chaque espace (' ')

    for(let i =0; 1 < description.length; i++){
        // Tour de boucle pour chaque mot dans le tableau
        if(description[i].toLowerCase() == word){
            // Si le mot clé est présent dans le tableau
            return true;
        }
    }
    return false;
}

module.exports = {
    search_date_sorted: function(fileIn, date){
        /**
         * Fonction qui recherche les films par année et les trier
         */
        const data = fs.readFileSync(fileIn)
        movies = JSON.parse(data); 
        let start = new Date().getTime();
        let moviesWithDate = [];
        for(i = 0; i < movies.length; i++){
            index = movies[i];
            if(index['title'].includes('('+date+')')){
                // Si la date demandé est présente dans le titre
                moviesWithDate.push(movies[i]);
                // Envoie le film dans le tableau moviesWithDate
            } 
        }
        moviesWithDate = search_sorted(moviesWithDate)
        // Tri film plus récent
        let stop = new Date().getTime(); 
        console.log("\nThe program took " + (stop - start) + "ms\n"); 
        moviesWithDate = JSON.stringify(moviesWithDate, null, 2);
        fs.writeFileSync('Json/movies' + date + '.json',moviesWithDate)
        // Ecrit le tableau dans un fichier json
        console.info('Recherche de tous les films de ' + date);
        return 'Json/movies' + date + '.json'
    },




    search_date_no_sorted: function(fileIn, date){
        /**
         * Fonction qui recherche les films par année sans les trier
         */
        const data = fs.readFileSync(fileIn)
        movies = JSON.parse(data); 
        let start = new Date().getTime();
        let moviesWithDate = [];
        for(i = 0; i < movies.length; i++){
            index = movies[i];
            if(index['title'].includes('('+date+')')){
            // Si la date demandé est présente dans le titre
                moviesWithDate.push(movies[i]);
                // Envoie le film dans le tableau moviesWithDate
            } 
        }
        let stop = new Date().getTime(); 
        console.log("\nThe program took " + (stop - start) + "ms\n"); 
        moviesWithDate = JSON.stringify(moviesWithDate, null, 2);
        fs.writeFileSync('Json/movies' + date + '.json',moviesWithDate)
        // Ecrit le tableau dans un fichier json
        console.info('Recherche de tous les films de ' + date);
        return 'Json/movies' + date + '.json'
    },

    search_key_word: function(fileIn ,key_word, genre){
        /**
         * Fonction qui recherche par mot clé et par genre
         */
        const data = fs.readFileSync(fileIn)
            let start = new Date().getTime();   
            movies = JSON.parse(data); 
            let moviesWithKeyWord = [];
            for(i = 0; i < movies.length; i++){
                const index = movies[i];
                try{
                    for(j=0; j < index.genres.length; j++){
                        if(isInDescription(key_word, index.overview) && index.genres[j].toLowerCase() == genre.toLowerCase()){
                             // Si le mot clé est présent dans la description et le genre rentré est égal au genre du film
                            moviesWithKeyWord.push(index);
                            // Envoie le film dans le tableau moviesWithKeyWord
                            }
                        } 
                    }
                catch(TypeError) {}
            }
            tri_rapide_date(moviesWithKeyWord, 0, moviesWithKeyWord.length-1)
            console.log(moviesWithKeyWord[moviesWithKeyWord.length-1]);
            let stop = new Date().getTime(); 
            console.log("\nThe program took " + (stop - start) + "ms\n"); 
    }
}