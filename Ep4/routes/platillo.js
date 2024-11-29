const express = require('express')
const router = express.Router()
const platillosController = require('../controllers/platillosController')

router.post('/registrar', platillosController.crearPlatillo)
router.get('/:id', platillosController.obtenerPlatillo)
router.put('/actualizar/:id', platillosController.actualizarPlatillo)
router.delete('/eliminar/:id', platillosController.eliminarPlatillo)

module.exports = router