const express = require('express');
const router = express.Router();

let rutaSucursalesController = require('../controllers/sucursalesController');

router.get('/',rutaSucursalesController.sucursales);
router.get('/:idRutaSucursal',rutaSucursalesController.idSucursal);
module.exports = router;