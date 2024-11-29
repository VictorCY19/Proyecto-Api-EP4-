const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')

router.post('/registrar', clienteController.crearCliente)
router.get('/:id', clienteController.obtenerCliente)
router.put('/actualizar/:id', clienteController.actualizarCliente)
router.delete('/eliminar/:id', clienteController.eliminarCliente)

module.exports = router