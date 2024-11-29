const Mesero = require('../models/Meseros')
const bcrypt = require('bcryptjs')

exports.crearMesero = async (req, res)=>{

    const { firstname, lastname, email, password } = req.body
    if(!firstname || !lastname || !email || !password) {
        return res.status(400).send('Los campos obligatorios')
    }
    try {
        const meseroExist = await Mesero.findOne({ email })
        if(meseroExist){
            return res.status(400).send('Mesero ya registrado')
        }
        
        const passwordEncriptado = await bcrypt.hash(password, 10)
        const nuevoMesero = new Mesero({
            firstname,
            lastname,
            email,
            password: passwordEncriptado
        })
        await nuevoMesero.save()
        res.status(201).send('Mesero Registrado con éxito')
    } catch (error) {
        console.log(error)
        res.status(400).send('hubo un error')
    }
}

exports.obtenerMesero = async (req, res)=>{
    try {
        const meseros = await Mesero.find()
        res.status(200).json(meseros)
    } catch (error) {
        console.log(error)
        res.status(400).send('hubo un error')
    }
}

exports.actualizarMesero = async (req, res)=>{
    const { firstname, lastname, email, password } = req.body
    try {
        const mesero = await Mesero.findById(req.params.id)
        if(!mesero){
            return res.status(404).send('Mesero no encontrado')
        }

        const datosActualizados = {
            firstname: firstname || mesero.firstname,
            lastname: lastname || mesero.lastname,
            email: email || mesero.email,
            password: password ? await bcrypt.hash(password, 10) : mesero.password,
        }

        const meseroActualizado = await Mesero.findByIdAndUpdate(req.params.id, datosActualizados, { new: true })
        res.status(200).json(meseroActualizado)
    } catch (error) {
        console.log(error)
        res.status(400).send('hubo un error')
    }
}

exports.desactivarMesero = async (req, res)=>{
    try {
        const mesero = await Mesero.findById(req.params.id);
        if (!mesero) {
            return res.status(404).send('Mesero no encontrado')
        }
        await Mesero.findByIdAndUpdate(req.params.id, { activo: false })
        res.status(200).send('Mesero desactivado con éxito')
    } catch (error) {
        console.log(error)
        res.status(400).send('hubo un error')
    }
}
