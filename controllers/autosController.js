let fs = require('fs');

let baseDatos = JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'));

module.exports = autosController ={
    index: (req,res)=>{
        let lista={};
        let contador=0;
        res.set({'content-type':'text/plain; charset=utf-8'})
        res.write("Estos son todos los autos que disponemos, en diferentes sucursales.\n\n")
        res.write("=====================================================================================\n")
        //itero en la concensionarias.json
        baseDatos.forEach(concesionaria => {
            res.write("\nSucursal: "+concesionaria.sucursal+"\n\n");
            //itero en auto
            concesionaria.autos.forEach(auto => {  
                //agrego el objeto en una lista 
                lista=auto;
                contador++;
                //muestro esa objeto con sos propiedades y valores correspondientes
                res.write("Marca: "+lista.marca+"\nModelo: "+lista.modelo+"\nAnio: "+lista.anio+"\n\n")        
            });
            res.write("=====================================================================================\n");
        });
        if(contador>0){
            res.end("El total de autos disponibles es de: "+contador+" en todas nuestas sucursales");
        }        
    },
    idRutaMarca: (req,res) =>{
        let contadorMarca = 0;
        let contadorColor = 0;
        let contadorAnio= 0;
        res.set({'content-type':'text/plain; charset=utf-8'})
        //asigo lo que ingresa en la url
        let marcaId = req.params.idMarca;
        //asigno el dato que ingresa por url opcional
        let dato = req.params.dato;
        //itero en concesionarias.json
        baseDatos.forEach(concesionaria => {
            //itero en autos
            concesionaria.autos.forEach(auto => {
                //comparo si la marca esta en autos y si ingreso algun otro dato
                if(auto.marca==marcaId && dato == undefined){
                    contadorMarca++;
                    //muestro los detalles de la marca ingresada
                    res.write("Marca: "+auto.marca+"\nModelo: "+auto.modelo+"\nAnio: "+auto.anio+"\nColor: "+auto.color+"\n\n");
                //comparo si la marca y el dato adicional, estan en auto.
                }else if(auto.marca == marcaId && dato == auto.color){
                    contadorColor++;
                    //muestro los detalles de la marca y color ingresado
                    res.write("Marca: "+auto.marca+"\nModelo: "+auto.modelo+"\nAnio: "+auto.anio+"\nColor: "+auto.color+"\n\n");
                //comparo si la marca y el dato adicional estan en auto
                }else if(auto.marca === marcaId && dato == auto.anio){
                    contadorAnio++;
                    //muestro los detalles de la amrca y el color ingresado
                    res.write("Marca: "+auto.marca+"\nModelo: "+auto.modelo+"\nAnio: "+auto.anio+"\nColor: "+auto.color+"\n\n");
                }
            });
        });//muestro el contador de autos en base a lo que ingreso para ver en la url
        if(contadorMarca>0){
            res.end("El total de autos de "+marcaId+" es de "+contadorMarca);
        }else if(contadorColor>0){
            res.end("El total de autos con el color "+dato+" es de "+contadorColor);
        }else if(contadorAnio>0){
            res.end("El total de autos del año "+dato+" es de "+contadorAnio);
        };     
        //itero en concesionarias.json   
        baseDatos.forEach(concesionaria => {
            //itero en autos
            concesionaria.autos.forEach(auto => {   
                //si el usuario igresa una marca que no exista, entra en la condicion
                if(auto.marca !=marcaId && dato == undefined){
                    res.end("La marca "+marcaId+" no existe.");
                //si el usuario ingresa una marca pero un año que no tengamos, entra en la condicion
                }else if(auto.marca == marcaId && dato != Number (auto.anio)){
                    res.end("El año que ingresó no esta asociado con un auto.");
                //si el usuario ingresa una marca pero el color no esta asociado con uno de nuestros autos, entra en la condicion.                
                }else if (auto.marca == marcaId && dato != auto.color){
                    res.end("La marca existe, pero el color que ingresó no esta asociado con uno de nuestros autos.");
                }
            });
        });
    },
};