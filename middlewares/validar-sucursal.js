const { response, request } = require("express");
const Empresa = require("../models/empresa");

const Sucursal = require("../models/sucursal");

const validarSucursal = async (req = request, res = response, next) => {
  const id = req.empresa.id;

  const _idSucursal = req.params.id;

  const existeDato = await Empresa.findById(id);

  if (existeDato) {
    const query = { _id: id, sucursal: _idSucursal };
    const existeDatoColeccion = await Empresa.find(query);
    if (existeDatoColeccion.length != 0) {
      res.json({
        msg: `La sucursal con el id: ${_idSucursal} ya esta registrada en la empresa`,
      });
    }
  } else {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }
};

module.exports = {
  validarSucursal,
};
