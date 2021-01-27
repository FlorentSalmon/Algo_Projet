fs = require('fs')

fs.readFile('Json/movies2.json',{encoding: 'utf8'},function(err,data) {
    if(err) return console.error(err);
    movies = JSON.parse(data);
    for(i = 0; i < movies.length; i++){
        let index = movies[i];
        let date = new Date(index['release_date'] * 1000);
        let year = date.getFullYear();
        let title = index['title'] + '( ' + year + ' )';
        index['title'] = title;
    }
    console.log(movies);
})
