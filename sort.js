fs = require('fs')

function swap(tab,a,b){
    let tmp = tab[a];
    tab[a] = tab[b];
    tab[b] = tmp;
  }
  
function tri_titre(movies){
    //pour i allant de (taille de movie)-1 à 1
    for( let i = movies.length -1; i>=1;i--){
        //pour j allant de 0 à i-1
        for(let j = 0; j<=i-1; j++){
            //si movies[j+1]["title"] < movies[j]["title"]
            if(movies[j+1]["title"] < movies[j]["title"]){
                //échanger T[j+1] avec T[j]
                swap(movies,j+1,j)
            }
        }
    }
}

function tri_date(movies){
    //pour i allant de (taille de movie)-1 à 1
    for( let i = movies.length -1; i>=1;i--){
        //pour j allant de 0 à i-1
        for(let j = 0; j<=i-1; j++){
            //si movies[j+1]["title"] < movies[j]["title"]
            if(movies[j+1]["release_date"] < movies[j]["release_date"]){
                //échanger T[j+1] avec T[j]
                swap(movies,j+1,j)
            }
        }
    }
}

module.exports ={
    sort_date: function(fileIn, fileOut){
        fs.readFile(fileIn,{encoding: 'utf8'},function(err,data) {
            if(err) return console.error(err);
            movies = JSON.parse(data);
            tri_date(movies);
    
            movies = JSON.stringify(movies, null, 2);
            fs.writeFile(fileOut,movies,function(err) {
                if(err) return console.error(err);
                console.log('done');
                })
        })
    }
}

module.exports = {
    sort_titre: function(fileIn, fileOut){
        fs.readFile(fileIn,{encoding: 'utf8'},function(err,data) {
            if(err) return console.error(err);
            movies = JSON.parse(data);
            tri_titre(movies);
    
            movies = JSON.stringify(movies, null,2);
            fs.writeFile(fileOut,movies,function(err) {
                if(err) return console.error(err);
                console.log('done');
                })
        })
        console.info("Tri dans l'ordre alphabetique des films");
    }
}
