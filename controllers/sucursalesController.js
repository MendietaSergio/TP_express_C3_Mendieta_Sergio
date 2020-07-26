let fs = require('fs');

let baseDatos = JSON.parse(fs.readFileSync('./data/concesionarias.json', 'utf-8'));
let conversor = require('../conversorDeEspacio');


module.exports = sucursalesController = {
    sucursales: (req, res) => {
        let contadorDeAutos = 0;
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf8' })
        res.write("Sucursales disponibles en: \n\n\n")
        
        //itero en concesionarias.json
        baseDatos.forEach(sucursal => {
            res.write("Sucursal: " + sucursal.sucursal + "\n");
            res.write("Dirección: " + sucursal.direccion + "\n");
            res.write("Telefono: " + sucursal.telefono + "\n\n\n");
            //itero en autos
            sucursal.autos.forEach(autoDentroDeAutos => {
                //cuento los autos
                contadorDeAutos++;
            });
        });
        res.write("El total de autos que tenemos es de " + contadorDeAutos);
        res.end();
    },
    idSucursal: (req, res) => {
        res.set({'content-type':'text/plain; charset=utf-8'})
        let contadorDeAutos = 0;
        //le asigo la ruta asignada por parametos a idruta.
        let idRuta = req.params.idRutaSucursal;
        //convierto los - en espacios.
        idRuta = conversor(idRuta);
        //itero en concesionarias.json   
        baseDatos.forEach(buscoEnSucursal => {
            //comparo idRuta con la sucursal y lo comparo pasandolo a minuscula.
            if (idRuta == buscoEnSucursal.sucursal.toLocaleLowerCase()) {
                //muestro informaciond de la sucursal               
                res.write("Sucursal: " + buscoEnSucursal.sucursal + "\n");
                res.write("Direccion: " + buscoEnSucursal.direccion);
                res.write("\nTelefono: " + buscoEnSucursal.telefono) + "\n\n";
                res.write("\n\n\n");
                //itero en autos
                buscoEnSucursal.autos.forEach(auto => {
                    contadorDeAutos++;
                    //muestro los autos de la sucursal
                    res.write("Marca: " + auto.marca + "\nModelo: " + auto.modelo + "\nAnio: " + auto.anio + "\nColor: " + auto.color + "\n\n");
                });
                res.write("\n\nEn esta sucursal tenemos un total de " + contadorDeAutos + " autos.");
                res.end();
            }
        });
        res.end("No encontré una surcursal en esa localidad..");
    },
};