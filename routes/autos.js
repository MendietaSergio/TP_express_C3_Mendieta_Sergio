const express = require('express');
const router = express.Router();

let autosController = require('../controllers/autosController');

router.get('/',autosController.index);
router.get('/:idMarca/:dato?',autosController.idRutaMarca);

module.exports = router;