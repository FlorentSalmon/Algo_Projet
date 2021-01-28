module.exports =  {//Export the function to use it anywhere
    benchmark : (program)  =>
    {
        let start = new Date().getTime(); 
        program(); 
        let stop = new Date().getTime(); 
        console.log("\nThe program took " + (stop - start) + "ms to execute\n"); 
    }
}