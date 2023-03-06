const { request, response, json } = require("express");
const Sucursal = require("../models/sucursal");
const Empresa = require("../models/empresa");

const getSucursal = async (req = request, res = response) => {
  const query = { estado: true };

  const listaSucursal = await Promise.all([
    Sucursal.countDocuments(query),
    Sucursal.find(query).populate("empresa", "nombre"),
  ]);

  res.json({
    msg: "get Api - Sucursal",
    listaSucursal,
  });
};

const getSucursalesEmpresa = async (req = request, res = response) => {
  const _id = req.empresa.id;
  const query = { estado: true, empresa: _id };

  const listaEmpresas = await Promise.all([
    Sucursal.countDocuments(query),
    Sucursal.find(query).populate("empresa", "nombre",),
  ]);

  res.json({
    msg: "get Api - Controlador empresa",
    listaEmpresas,
  });
};

const postSucursal = async (req = request, res = response) => {
  const { estado, municipio, direccion, empresa, ...body } = req.body;
  const sucursalDB = await Sucursal.findOne({ nombre: body.nombre });
  const nombre = req.body.nombre.toUpperCase();

  if (sucursalDB) {
    return res.status(400).json({
      msg: `La sucursal ${sucursalDB.nombre}, ya existe en la DB`,
    });
  }

  //Generar la data a guardar
  const data = {
    nombre,
    municipio,
    direccion,
    empresa: req.empresa._id,
  };

  const sucursal = await Sucursal(data);

  //Guardar en DB
  await sucursal.save();

  res.status(201).json(sucursal);
};

const putSucursal = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, empresa, ...restoData } = req.body;

  if (restoData.nombre) {
    restoData.nombre = restoData.nombre.toUpperCase();
    restoData.empresa = req.empresa._id;
  }

  const sucursalActualizada = await Sucursal.findByIdAndUpdate(id, restoData, {
    new: true,
  });

  res.status(201).json({
    msg: "PUT EDITAR - SUCURSAL",
    sucursalActualizada,
  });
};

const deleteSucursal = async (req = request, res = response) => {
  const { id } = req.params;
  const idUser = req.empresa.id;
  const sucursalEliminada = await Sucursal.findByIdAndDelete(id);

  await Empresa.findByIdAndUpdate(idUser, { $pull: { sucursal: id } })

  res.json({
    msg: "DELETE SUCURSAL",
    sucursalEliminada,
  });
};

module.exports = {
  getSucursal,
  postSucursal,
  putSucursal,
  deleteSucursal,
  getSucursalesEmpresa
};
