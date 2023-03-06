const { Router } = require("express");
const { check } = require("express-validator");
const {
  getSucursal,
  postSucursal,
  putSucursal,
  deleteSucursal,
  getSucursalesEmpresa
} = require("../controllers/sucursal");
const {
  existeSucursalPorId,
  esMunicipioValido
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

//Manejo de rutas

// Obtener todas las productos - publico
router.get('/', getSucursal);

router.post('/agregar', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('direccion', 'La direccion es obligatroria').not().isEmpty(),
  check('municipio', 'El municipio es obligatorio').not().isEmpty(),
  check('municipio').custom(  esMunicipioValido ),
  validarCampos,
] ,postSucursal);

router.get('/mostrarSucursales', [
  validarJWT,
  validarCampos,
], getSucursalesEmpresa);

router.put('/editar/:id', [
  validarJWT,
  check('id', 'No es un id de Mongo Válido').isMongoId(),
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('id').custom(existeSucursalPorId),
  check('municipio').custom(  esMunicipioValido ),
  validarCampos
], putSucursal);

router.delete('/eliminar/:id', [
  validarJWT,
  check('id', 'No es un id de Mongo Válido').isMongoId(),
  check('id').custom(existeSucursalPorId),
  validarCampos,
], deleteSucursal);



module.exports = router;

