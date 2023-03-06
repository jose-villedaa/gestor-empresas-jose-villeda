const { Schema, model } = require('mongoose');

const MunicipioSchema = Schema({
    municipio: {
        type: String,
        required: [true , 'El municipio es obligatorio']
    },
});

module.exports = model('Municipio', MunicipioSchema);