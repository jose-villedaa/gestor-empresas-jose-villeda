const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const Empresa = require('../models/empresa');
const Sucursal = require('../models/sucursal')

const coleccionesPermitidas = [
    'empresa',
    'sucursal',
];


const buscarSucursales = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino );  //TRUE

    if ( esMongoID ) {
        const sucursal = await Sucursal.findById(termino);
        return res.json({
            //results: [ usuario ]
            results: ( sucursal ) ? [ sucursal ] : [] 
            //Preugntar si el usuario existe, si no existe regresa un array vacio
        });
    } 

    //Expresiones regulares, buscar sin impotar mayusculas y minusculas (DIFIERE DE EL)
    const regex = new RegExp( termino, 'i');

    const sucursal = await Sucursal.find({
        $or: [ { nombre: regex }, { direccion: regex } ],
        $and: [ { estado: true } ]
    });

    res.json({
        results: sucursal
    })

}

const buscarEmpresas = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino );  //TRUE

    if ( esMongoID ) {
        const empresa = await Empresa.findById(termino);
        return res.json({
            //results: [ usuario ]
            results: ( empresa ) ? [ empresa ] : [] 
            //Preugntar si el usuario existe, si no existe regresa un array vacio
        });
    } 

    //Expresiones regulares, buscar sin impotar mayusculas y minusculas (DIFIERE DE EL)
    const regex = new RegExp( termino, 'i');

    const empresa = await Empresa.find({
        $or: [ { nombre: regex }],
        $and: [ { estado: true } ]
    });

    res.json({
        results: empresa
    })

}


const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `La colección: ${ coleccion } no existe en la DB
                  Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    }


    switch (coleccion) {
        case 'empresa':
            buscarEmpresas(termino, res);
        break;
        case 'sucursal':
            buscarSucursales(termino, res);
           
        break;
        default:
            res.status(500).json({
                msg: 'Ups, se me olvido hacer esta busqueda...'
            });
        break;
    }

}


module.exports = {
    buscar
}