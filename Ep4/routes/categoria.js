const express = require('express')
const router = express.Router()
const categoriaController = require('../controllers/categoriaController')

router.post('/registrar', categoriaController.crearCategoria)
router.get('/', categoriaController.obtenerCategorias)
router.put('/actualizar/:id', categoriaController.actualizarCategoria)
router.delete('/eliminar/:name', categoriaController.eliminarCategoria)

module.exports = router