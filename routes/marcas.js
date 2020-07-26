const express = require('express');
const router = express.Router();

let marcasController = require('../controllers/marcasController');

router.get('/',marcasController.index);
router.get('/:idMarca',marcasController.idPorMarca)

module.exports = router;