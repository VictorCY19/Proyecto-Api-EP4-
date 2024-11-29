const {Schema, model} = require('mongoose')

const clienteSchema = new Schema({

    name:{ type: String, required:true },
    email: { type: String, required:true, unique:true },
    tel:{ type: Number, required:true },
    dni: { type: Number, required:true }
    
})

module.exports = model('Cliente', clienteSchema)