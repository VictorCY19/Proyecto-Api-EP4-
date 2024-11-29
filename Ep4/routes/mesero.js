const express = require('express')
const router = express.Router()
const meseroController = require('../controllers/meseroController')

router.post('/registrar', meseroController.crearMesero)
router.get('/', meseroController.obtenerMesero)
router.put('/actualizar/:id', meseroController.actualizarMesero)
router.delete('/desactivar/:id', meseroController.desactivarMesero)

module.exports = router