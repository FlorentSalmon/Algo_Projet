const fs = require('fs')
const request = require('request')

// Fonction pour echanger deux positions
function swap(tab,from,to){
    let tmp = tab[to];
    // Variable ou est stoquer tab[to]
    tab[to]= tab[from]; 
    // tab[to] devient tab[from]
    tab[from] = tmp;
    // et tab[from] devient tab[to]
  }
  
  // Fonction Tri Titre
  function partitionner_titre(tab,premier,dernier,pivot){
    swap(tab,pivot,dernier);
    // Echange pivot et dernier
    j = premier;
    for(i = premier;i<=dernier-1;i++){
        if( tab[i].title <= tab[dernier].title){
            // Condiction pour respecter l'ordre alphabetique
            swap(tab,i,j)
            // Change tab[i] et tab[dernier]
            j++;
        }
    }
    swap(tab,dernier,j)
    // Echanger dernier avec j
    return j;
  }
  
  // Fonction Tri Titre
  function tri_rapide_titre(tab,premier, dernier){
    if(premier<dernier){
        let pivot = Math.ceil((premier + dernier) / 2);
        pivot = partitionner_titre(tab,premier,dernier,pivot);
        tri_rapide_titre(tab,premier, pivot-1);
        tri_rapide_titre(tab,pivot+1,dernier);
    }
    return tab;
  }

  // Fonction Tri Date
  function partitionner_date(tab,premier,dernier,pivot){
    swap(tab,pivot,dernier);
    // Echange pivot et dernier
    j = premier;
    for(i = premier;i<=dernier-1;i++){
        if( tab[i].release_date <= tab[dernier].release_date){
            // Si la date actuel < la dernière date du fichier
            swap(tab,i,j)
            // Change tab[i] et tab[dernier]
            j++;
        }
    }
    swap(tab,dernier,j)
    // Echanger dernier avec j
    return j;
  }
  
  // Fonction Tri Date
  function tri_rapide_date(tab,premier, dernier){
    if(premier<dernier){
        let pivot = Math.ceil((premier + dernier) / 2);
        pivot = partitionner_date(tab,premier,dernier,pivot);
        tri_rapide_date(tab,premier, pivot-1);
        tri_rapide_date(tab,pivot+1,dernier);
    }
    return tab;
  }
   

module.exports ={
    sort_date: function(fileIn, fileOut){
        const data = fs.readFileSync(fileIn)
            let start = new Date().getTime();
            movies = JSON.parse(data);
            tri_rapide_date(movies, 0, movies.length - 1);
    
            let stop = new Date().getTime(); 
            console.log("\nThe program took " + (stop - start) + "ms\n"); 
            movies = JSON.stringify(movies, null,2);

            fs.writeFileSync(fileOut,movies)
        console.info("Tri dans l'ordre annuelle des films")        
        return fileOut
        
    },

    sort_titre: function(fileIn, fileOut){
        const data = fs.readFileSync(fileIn)
            let start = new Date().getTime();
            movies = JSON.parse(data);
            tri_rapide_titre(movies, 0, movies.length - 1);
    
            movies = JSON.stringify(movies, null,2);
            let stop = new Date().getTime(); 
            console.log("\nThe program took " + (stop - start) + "ms\n"); 
            fs.writeFileSync(fileOut,movies)
            console.info("Tri dans l'ordre alphabetique des films");
            return fileOut  
        
    }
}

