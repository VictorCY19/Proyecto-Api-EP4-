const Platillos = require('../models/Platillos')

exports.crearPlatillo = async (req, res) =>{
    try {
        const { name, ingredients, price, images } = req.body
        const platillo = new Platillos({ name, ingredients, price, images });
        await platillo.save();
        res.status(201).json(platillo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.obtenerPlatillo = async (req, res) =>{
    try {
        const platillo = await Platillos.findById(req.params.id);
        if (!platillo) return res.status(404).json({ message: 'Plato no encontrado' });
        res.status(200).json(platillo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.actualizarPlatillo = async (req, res) => {
    try {
        const { name, ingredients, price, images } = req.body;
        const platillo = await Platillos.findByIdAndUpdate(
        req.params.id,
        { name, ingredients, price, images },
        { new: true }
        );
        if (!platillo) return res.status(404).json({ message: 'Plato no encontrado' });
        res.status(200).json(platillo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.eliminarPlatillo = async (req, res) => {
    try {
        const platillo = await Platillos.findByIdAndDelete(req.params.id);
        if (!platillo) return res.status(404).json({ message: 'Plato no encontrado' });
        res.status(200).json({ message: 'Plato eliminado' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}