function benchmark(){
    console.time('benchmarkTest');
    var sum = 0;
    for ( var i = 0; i < 100; i += 1) {
        sum += i;
    }
    console.info('somme des entiers de 1 à 100 %d', sum);
    console.timeEnd('benchmarkTest');
}
benchmark();