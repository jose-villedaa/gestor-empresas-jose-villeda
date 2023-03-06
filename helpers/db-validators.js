const Tipo = require('../models/tipo-empresa');
const Municipio = require('../models/municipio');
const Empresa = require('../models/empresa');
const Sucursal = require('../models/sucursal');

//Este archivo maneja validaciones personalizadas

const esTipoEmpresaValido = async( tipo = '' ) => {

    const existeTipoEmpresa = await Tipo.findOne( { tipo } );

    if ( !existeTipoEmpresa ) {
        throw new Error(`El tipo de empresa ${ tipo } no está registrado en la DB`);
    }

}

const esMunicipioValido = async( municipio = '' ) => {

    const existeMunicipio = await Municipio.findOne( { municipio } );

    if ( !existeMunicipio ) {
        throw new Error(`El municipio ${ municipio } no está registrado como parte de la ciudad de Guatemala`);
    }

}


const emailExiste = async( correo = '' ) => {

    //Verificamos si el correo ya existe en la DB
    const existeEmail = await Empresa.findOne( { correo } );

    //Si existe (es true) lanzamos excepción
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }

}


const existeEmpresaPorId = async(id) => {

    //Verificar si el ID existe
    const existeEmpresa = await Empresa.findById(id);

    if ( !existeEmpresa ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}

const existeSucursalPorId = async(id) => {

    //Verificar si el ID existe
    const existeSucursal = await Sucursal.findById(id);

    if ( !existeSucursal ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}


/*const existeCategoriaPorId = async(id) => {

    //Verificar si el ID existe
    const existeCategoria = await Sucursal.findById(id);

    if ( !existeCategoria ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}*/


/*const existeProductoPorId = async(id) => {

    //Verificar si el ID existe
    const existeProducto = await Producto.findById(id);

    if ( !existeProducto ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}*/



module.exports = {
    esTipoEmpresaValido,
    emailExiste,
    existeEmpresaPorId,
    esMunicipioValido,
    existeSucursalPorId
}