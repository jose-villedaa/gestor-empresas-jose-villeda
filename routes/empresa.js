const { Router } = require("express");
const { check } = require("express-validator");
const {
  getEmpresas,
  postEmpresa,
  putEmpresa,
  deleteUsuario,
  putAgregarSucursal,
} = require("../controllers/empresa");
const {
  esTipoEmpresaValido,
  emailExiste,
  existeSucursalPorId,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarSucursal } = require("../middlewares/validar-sucursal");
const router = Router();

router.get("/mostrar", getEmpresas);



router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 5 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('tipo').custom(  esTipoEmpresaValido ),
    validarCampos,
] ,postEmpresa);

router.put(
  "/editar",
  [
    validarJWT,
    validarCampos,
  ],
  putEmpresa
);

router.put('/agregarSucursal/:id', [
  validarJWT,
  check('id', 'No es un id de Mongo Valido').isMongoId(),
  check('id').custom(existeSucursalPorId),
  validarCampos,
], putAgregarSucursal);

router.delete(
  "/eliminar",
  [
    validarJWT,
    validarCampos,
  ],
  deleteUsuario
);

module.exports = router;

// ROUTES
