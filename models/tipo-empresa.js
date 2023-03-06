const { Schema, model } = require('mongoose');

const TipoSchema = Schema({
    tipo: {
        type: String,
        required: [true , 'El tipo de empresa es obligatorio']
    },
});


module.exports = model('Tipo', TipoSchema);