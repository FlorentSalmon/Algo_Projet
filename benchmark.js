module.exports =  {
    benchmark : (program)  =>
    {
        let start = new Date().getTime(); 
        program(); 
        let stop = new Date().getTime(); 
        console.log("\nThe program took " + (stop - start) + "ms\n"); 
    }
}