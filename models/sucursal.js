const { Schema, model } = require('mongoose');

const SucursalSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la sucursal es obligatorio']
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es obligatoria' ],
    },
    municipio: {
        type: String,
        required: [true, 'El municipio es obligatorio' ],
    },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
});


module.exports = model('Sucursal', SucursalSchema);