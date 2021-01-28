fs = require('fs')
const request = require('request')

module.exports = {
    add_Date: function(fileIn, fileOut){
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
}
