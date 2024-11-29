const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const meseroSchema = new Schema({

    firstname:{ type: String, required:true },
    lastname: { type: String, required:true },
    email: { type: String, required:true, unique:true },
    password: { type: String, required:true },
    activo: {
        type: Boolean,
        default: true
      }
})

//Encripta la contraseña
meseroSchema.methods.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

//Compara la contraseña ingresada con la de DB, si es correcta es true, si no false
meseroSchema.methods.validatePassword = function (password){
    return bcrypt.compare(password, this.password)
}

module.exports = model('Meseros', meseroSchema)
