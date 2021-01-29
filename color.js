const Jimp = require('jimp') 
const fs = require('fs')

module.exports = {
    get_average_rgb: function(path){
        const filesNames = fs.readdirSync(path);
        let mcolorimages = [];
        filesNames.forEach(file => {
            if(file.includes('.jpg')){
                Jimp.read(path + file,function (err, image) {
                    let width = image.bitmap.width;
                    let height = image.bitmap.height;
                    let rgba = []
                    for(i = 0; i < width; i++){
                        for(j = 0; j < height; j++){
                            x = i;
                            y = j; 
                            hex = image.getPixelColor(x, y);
                            // returns the colour of that pixel e.g. 0xFFFFFFFF
                            hex = Jimp.intToRGBA(hex);
                            // e.g. converts 0xFFFFFFFF to {r: 255, g: 255, b: 255, a:255}
                            rgba.push(hex);
                        }
                    }
                    let r = 0;
                    let g = 0;
                    let b = 0;
                    let a =0;
                    for(i = 0; i < rgba.length; i++){
                        r = rgba[i].r + r
                        g = rgba[i].g + g
                        b = rgba[i].b + b
                        a = rgba[i].a + a
                    }
                    mr = r / rgba.length;
                    mg = g / rgba.length;
                    mb = b / rgba.length;
                    ma = a / rgba.length;
                    hex = Jimp.rgbaToInt(mr, mg, mb, ma);
                    hex = hex.toString(16);
                    console.log('HEX: ' + hex);
                    mcolorimages.push(hex)
                    return hex
                    });
            }
            
                
        })
    }
}