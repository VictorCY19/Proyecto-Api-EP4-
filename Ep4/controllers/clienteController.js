const Cliente = require('../models/Clientes')

exports.crearCliente = async (req, res)=>{
    const {name, email, tel, dni} = req.body
    if(!name || !email || !tel || !dni){
        return res.status(400).send('Los campos obligatorios')
    }
    try {
        const clienteExist = await Cliente.findOne({
            email
        })
        if(clienteExist){
            return res.status(400).send('Cliente ya registrado')
        }

        const nuevocli = new Cliente ({
            name,
            email,
            tel,
            dni
        })

        await nuevocli.save()
        res.status(201).send('Cliente Registrado')
    } catch (error) {
        console.log(error)
        res.status(400).send('hubo un error al registrar el cliente')
    }
}

exports.obtenerCliente = async(req, res) =>{
    const {id} = req.params
    if(!id){
        return res.status(400).send('Id del cliente es obligatorio')
    }
    try {
       const cliente = await Cliente.findById(id)
       if(!cliente){
        return res.status(404).send('Cliente no encontrado')
       }
       res.status(200).json(cliente)
    } catch (error) {
        res.status(500).send('Hubo un error: ' + error.message)
    }
}

exports.eliminarCliente = async (req, res) =>{
    const {id} = req.params
    if(!id){
        return res.status(400).send('Id del cliente es obligatorio')
    }
    try {
        const clienteEliminado = await Cliente.findByIdAndDelete(id)
        if(!clienteEliminado){
            return res.status(404).send('Cliente no encontrado')
        }

        res.status(200).send('Cliente eliminado correctamente')
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error al eliminar el cliente')
    }
}

exports.actualizarCliente = async (req, res) => {
    const { id } = req.params
    const { name, email, tel, dni } = req.body

    if (!id || !name || !email || !tel || !dni) {
        return res.status(400).send('Todos los campos son obligatorios')
    }

    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate(
            id,
            { name, email, tel, dni },
            { new: true, runValidators: true }
        )

        if (!clienteActualizado) {
            return res.status(404).send('Cliente no encontrado')
        }

        res.status(200).send('Cliente actualizado correctamente')
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error al actualizar el cliente')
    }
}