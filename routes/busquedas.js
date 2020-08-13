/*
 * Route/path: 'api/all/:busqueda'
 */

const { Router } = require('express');
const { getAll, getDocsCollections } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda', validarJWT, getAll);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocsCollections);

module.exports = router;