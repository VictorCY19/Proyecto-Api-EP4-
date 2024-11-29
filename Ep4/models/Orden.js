const mongoose = require('mongoose');

const ordenSchema = new mongoose.Schema({
  id_mesa: { type: Number, required: true },
  platillos: [
    {
      platillo_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Platillo', required: true },
      cantidad: { type: Number, required: true }
    }
  ],
  estado: { type: String, enum: ['pendiente', 'entregado', 'cancelado'], default: 'pendiente' },
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now }
});

const Orden = mongoose.model('Orden', ordenSchema);

module.exports = Orden;
