const express = require('express');
const router = express.Router();
const ordenController = require('../controllers/OrdenController');  


router.post('/registrar', ordenController.crearOrden);
router.get('/:id', ordenController.obtenerOrden);
router.put('/actualizar/:id', ordenController.actualizarEstadoOrden);
router.delete('/eliminar/:id', ordenController.eliminarOrden);

module.exports = router;
