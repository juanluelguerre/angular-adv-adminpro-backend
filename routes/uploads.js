/*
 * Route/path: 'api/uploads'
 */

const { Router } = require('express');
const expressFileUpload  = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, getImage } = require('../controllers/uploads');

const router = Router();

// NOTE: app.use (xxx) and router.use(...) work in the same way !!!
router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload);

router.get('/:tipo/:foto', getImage);

module.exports = router;