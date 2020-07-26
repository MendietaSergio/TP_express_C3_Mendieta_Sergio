let fs = require('fs');

let baseDatos = JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'));
module.exports = homeController = {
    index: (req,res)=>{
        res.set({'content-type':'text/plain; charset=utf-8'})
        let contadorDeAutos =0;
        //cartel bienvenida
        res.write("¡Bienvenido al sitio web de la concesionaría!\n\n");
        //itero en concesionarias.json
        baseDatos.forEach(sucursales => {            
            //muestro los nombres de las sucursales
            res.write( sucursales.sucursal +"    ");
            sucursales.autos.forEach(autoDentroDeAutos => {
                //cuento los autos
                contadorDeAutos++;                    
            });
        });
        res.write("\n\nEl total de autos que tenemos es de "+contadorDeAutos);
        res.end();
    },
};