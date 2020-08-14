/*
 * Route/path: '/api/login'
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',
    [
        check('email', 'Email required').isEmail(),
        check('password', 'Password required').not().isEmpty(),
        validarCampos
    ],
    login
);

router.post('/google',
    [
        check('token', 'Google token required').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
);

module.exports = router;