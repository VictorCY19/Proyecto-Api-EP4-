const express = require('express')
const mongoose = require('mongoose')
const bodyParse = require('body-parser')
const routesc = require('./routes/cliente') 
const routesct = require('./routes/categoria') 
const routesp = require('./routes/platillo')
const routesm = require('./routes/mesero')
const routeso = require('./routes/orden')


const app = express()

app.use(bodyParse.json())
app.use(express.static('paginas'))

mongoose.connect('mongodb://127.0.0.1:27017/ep4', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('BD conectado'))
    .catch(err => console.error('BD no encontrado:', err))

app.use('/api/clientes', routesc)
app.use('/api/categorias', routesct)
app.use('/api/platillos', routesp)
app.use('/api/mesero', routesm)
app.use('/api/orden', routeso)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en elpuerto:  ${PORT}`)
})