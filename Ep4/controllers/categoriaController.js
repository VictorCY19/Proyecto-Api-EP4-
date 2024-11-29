const Categoria = require('../models/Categorias')

exports.crearCategoria = async (req, res) => {
    const {name, desc} = req.body
    if(!name || !desc){
        return res.status(400).send('Los campos obligatorios')
    }
    try {
        const categoriaExist = await Categoria.findOne({
            name
        })
        if(categoriaExist){
            return res.status(400).send('Categoria registrada')
        }

        const nuevaCat = new Categoria ({
            name,
            desc
        })

        await nuevaCat.save()
        res.status(201).send('Categoria añandida!')
    } catch (error) {
        console.log(error)
        res.status(400).send('hubo un error al registrar el cliente')
    } 
}

exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find()
        if (categorias.length === 0) {
            return res.status(404).send('No hay categorías disponibles')
        }
        res.status(200).json(categorias)
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error al obtener las categorías')
    }
}

exports.eliminarCategoria = async (req, res) => {
    const { name } = req.params

    if (!name) {
        return res.status(400).send('El nombre de la categoría es obligatorio')
    }

    try {
        const categoriaEliminada = await Categoria.findOneAndDelete({ name })

        if (!categoriaEliminada) {
            return res.status(404).send('Categoría no encontrada')
        }

        res.status(200).send('Categoría eliminada correctamente')
    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error al eliminar la categoría')
    }
}

exports.actualizarCategoria = async (req, res) => {
    const { id } = req.params
    const { name, desc } = req.body

    if (!id || (!name && !desc)) {
        return res.status(400).send('El ID y al menos un campo (name o desc) son obligatorios')
    }

    try {
        const categoriaActualizada = await Categoria.findByIdAndUpdate(
            id,
            { name, desc },
            { new: true, runValidators: true } // Retorna la categoría actualizada
        )

        if (!categoriaActualizada) {
            return res.status(404).send('Categoría no encontrada')
        }

        res.status(200).send('Categoría actualizada correctamente')
    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error al actualizar la categoría')
    }
}