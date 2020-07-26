function conversor(letra) {
    let nuevaLetra ;
    for (let index = 0; index < letra.length; index++) {
        if(letra[index]=="-"){
            nuevaLetra = letra.replace("-"," ");
            letra= nuevaLetra;
            console.log("nueva: "+nuevaLetra);
        }        
    }
    return letra;
}
module.exports = conversor;