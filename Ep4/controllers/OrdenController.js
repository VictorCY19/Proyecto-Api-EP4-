const Orden = require('../models/Orden'); 


exports.crearOrden = async (req, res) => {
    try {
        const { id_mesa, platillos, estado } = req.body;
        if (!id_mesa || !platillos || platillos.length === 0) {
            return res.status(400).json({ mensaje: 'Faltan datos para crear la orden' });
        }
        const nuevaOrden = new Orden({
            id_mesa,
            platillos,
            estado: estado || 'pendiente', 
        });
       await nuevaOrden.save();
        res.status(201).json({
            mensaje: 'Orden creada con éxito',
            orden: nuevaOrden,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear la orden', error });
    }
};


exports.obtenerOrden = async (req, res) => {
    try {
        const orden = await Orden.findById(req.params.id).populate('platillos.platillo_id');
        if (!orden) {
            return res.status(404).json({ mensaje: 'Orden no encontrada' });
        }
        res.status(200).json(orden);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener la orden', error });
    }
};


exports.actualizarEstadoOrden = async (req, res) => {
    try {
        const { estado } = req.body;
        
        if (!estado) {
            return res.status(400).json({ mensaje: 'El estado es requerido' });
        }

        const orden = await Orden.findByIdAndUpdate(
            req.params.id,
            { estado },
            { new: true }  
        );

        if (!orden) {
            return res.status(404).json({ mensaje: 'Orden no encontrada' });
        }

        res.status(200).json({
            mensaje: 'Estado de la orden actualizado',
            orden,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar el estado de la orden', error });
    }
};

exports.eliminarOrden = async (req, res) => {
    try {
        const orden = await Orden.findByIdAndDelete(req.params.id);

        if (!orden) {
            return res.status(404).json({ mensaje: 'Orden no encontrada' });
        }

        res.status(200).json({ mensaje: 'Orden eliminada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar la orden', error });
    }
};
