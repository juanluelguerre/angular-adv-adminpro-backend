/*
 * Route/path: 'api/hospitales'
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { 
    getHospitales, 
    crearHospital,
    actualizarHospital, 
    borrarHospital 
    } = require('../controllers/hospitales');

const router = Router();

// Controller.
// Note: No include parenthesis as part as function !!!!
router.get('/', validarJWT, getHospitales);

router.post('/',
    [
        validarJWT,
        check('nombre', 'Hospital name required').not().isEmpty(),
        validarCampos
    ],
    crearHospital
);

router.put('/:id',
    [
    ],
    actualizarHospital
);

router.delete('/:id',
    validarJWT,
    borrarHospital
);

module.exports = router; 