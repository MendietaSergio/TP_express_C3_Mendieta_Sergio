let fs = require('fs');
const { isRegExp } = require('util');
let baseDatos = JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'));
module.exports = marcasController = {
    index: (req,res) => {
        res.set({'content-type':'text/plain; charset=utf-8'})
        //contador de autos
        let contador=0;
        //lo uso para guardar las todas las marcas
        let arrayMarcas = [];
        res.write("Estos son todas las marcas que tenenos en nuestras concesionarias\n\n\n");
        //itero en concesionarias.json
        baseDatos.forEach(bDatos => {
            //itero dentro de autos
            bDatos.autos.forEach(auto => {
                //guardo todas las marcas sacado de auto.marca
                arrayMarcas.push(auto.marca)
            });            
        });
        //filtro las marcas duplicadas y las guardo en una variable
        let marcaFiltrada = arrayMarcas.filter((el, index) => arrayMarcas.indexOf(el) === index);        
        let marca;
        //itero en la variable con las marcas filtradas
        for (let index = 0; index < marcaFiltrada.length; index++) {
            contador++;
            //las guardo una por una, para luego mostrarlo mejorado
            marca=marcaFiltrada[index]
            //aca a la primer letra de cada marca, lo muestro con la letra mayuscula.
            res.write(marca[0].toUpperCase() + marca.slice(1)+"\n\n")            
        }
        res.write("En total, trabajamos con "+contador+" marcas.")
        res.end();        
    },
    idPorMarca:(req,res)=>{
        res.set({'content-type':'text/plain; charset=utf-8'})
        let contador=0;
        let idRutaMarca = req.params.idMarca;
        //itero en concesionarias.json
        baseDatos.forEach(bDatos => {
            //itero en autos de la base de datos
            bDatos.autos.forEach(auto => {
                //comparo si el url ingresado es igual al que se encuentra en auto,marca.
                if(idRutaMarca == auto.marca){
                    contador++;
                    //Muetro todas las marcas cuando entra en autos, marca.   
                    res.write("Marca: "+auto.marca+"\nModelo: "+auto.modelo+"\nAnio: "+auto.anio+"\n\n")
                }   
            });            
        });
        if(contador>0){
            res.end("En total tenemos "+contador+" autos con esa marca");
        }else{
            res.end("No disponemos esa marca");
        }        
    },
};
