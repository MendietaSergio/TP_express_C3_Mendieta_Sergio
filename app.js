const express = require('express');
const fs = require('fs');
const app = express();

app.listen(3030,()=> console.log("Servidor corriendo en el puerto 3030"));

let rutaHome = require('./routes/home');
let rutaSucursales = require('./routes/sucursales');
let rutaMarcas =require('./routes/marcas');
let rutaAutos = require('./routes/autos');



app.use("/",rutaHome);
app.use('/sucursales',rutaSucursales)
app.use('/marcas',rutaMarcas);
app.use('/autos',rutaAutos);

app.get('*', (req, res) => {
res.status(404).send('404 not found. <br> ¡Houston, poseemos problemas!');
});