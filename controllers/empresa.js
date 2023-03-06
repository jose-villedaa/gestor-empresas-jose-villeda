const { response, request } = require("express");
const bcrypt = require("bcryptjs");
//Importación del modelo
const Empresa = require("../models/empresa");
const Sucursal = require("../models/sucursal");

const getEmpresas = async (req = request, res = response) => {
  //condiciones del get
  const query = { estado: true };

  const listaEmpresa = await Promise.all([
    Empresa.countDocuments(query),
    Empresa.find(query),
  ]);

  res.json({
    msg: "get Api - Controlador Empresa",
    listaEmpresa,
  });
};


const postEmpresa = async (req = request, res = response) => {
  //Desestructuración
  const { nombre, correo, password, tipo } = req.body;
  const empresaGuardadaDB = new Empresa({ nombre, correo, password, tipo });

  //Encriptar password
  const salt = bcrypt.genSaltSync();
  empresaGuardadaDB.password = bcrypt.hashSync(password, salt);

  //Guardar en BD
  await empresaGuardadaDB.save();

  res.json({
    msg: "Post Api - Agregar Empresa",
    empresaGuardadaDB,
  });
};

const putAgregarSucursal = async (req = request, res = response) => {
  const  _id  = req.empresa.id;
  const { estado, sucursal, ...resto } = req.body;

  const sucursalAgregada = await Empresa.findByIdAndUpdate(
    _id,
    { $push: { sucursal: req.params.id } },
    { new: true }
  );

  res.status(201).json(sucursalAgregada);
};

const putEmpresa = async (req = request, res = response) => {
  const idUser = req.empresa.id;
  //Req.params sirve para traer parametros de las rutas
  const { _id, estado, ...resto } = req.body;
  //Si la password existe o viene en el req.body, la encripta
  if (resto.password) {
    //Encriptar password
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(resto.password, salt);
  }
  //Editar al usuario por el id
  const empresaEliminada = await Empresa.findByIdAndUpdate(idUser, resto);
  res.json({
    msg: "PUT editar user",
    empresaEliminada,
  });
};

const deleteUsuario = async (req = request, res = response) => {
  //Req.params sirve para traer parametros de las rutas
  const idUser = req.empresa.id;

  //Eliminar cambiando el estado a false
  const usuarioEliminado = await Empresa.findByIdAndUpdate(idUser, {
    estado: false,
  });

  res.json({
    msg: "DELETE eliminar Empresa",
    usuarioEliminado,
  });
};

module.exports = {
  getEmpresas,
  postEmpresa,
  putEmpresa,
  deleteUsuario,
  putAgregarSucursal,
};

// CONTROLADOR
