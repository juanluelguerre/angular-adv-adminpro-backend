/*
 * Route/path: 'api/medicos'
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { 
    getMedicos, 
    crearMedico,
    actualizarMedico, 
    borrarMedico 
    } = require('../controllers/medicos');

const router = Router();

// Controller.
// Note: No include parenthesis as part as function !!!!
router.get('/', validarJWT, getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre', 'Doctor\'s name required').not().isEmpty(),
        check('hospital', 'Valid id required').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'Doctor\'s name required').not().isEmpty(),
        check('hospital', 'Valid id required').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);

router.delete('/:id',
    validarJWT,
    borrarMedico
);

module.exports = router; 