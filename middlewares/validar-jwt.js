
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token available.'
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: `No valid token ${error}`
        })
    }
}

const validadADMIN_ROLE = async (req, res, next) => {
    
    const uid = req.uid;

    try {
        const userDB = await Usuario.findById(uid);    

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User does not exist'
            });
        }

        if (userDB.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok: false,
                msg: 'Yo do not have priviles for that.'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        resk.status(500).json({
            ok: false,
            msg: 'Error trying to validate admin role. Please, contact with your administrator.'
        });
    }
}

// TODO: this middleware must be change to use a new route instead of it
const validadADMIN_ROLE_o_MismoUsuario = async (req, res, next) => {
    
    const uid = req.uid;
    const id = req.params.id;

    try {
        const userDB = await Usuario.findById(uid);    

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User does not exist'
            });
        }

        // No admin or user and loged user are the same
        if (userDB.role !== 'ADMIN_ROLE' && uid !== id){
            return res.status(403).json({
                ok: false,
                msg: 'Yo do not have priviles for that.'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        resk.status(500).json({
            ok: false,
            msg: 'Error trying to validate admin role. Please, contact with your administrator.'
        });
    }
}

module.exports = {
    validarJWT,
    validadADMIN_ROLE,
    validadADMIN_ROLE_o_MismoUsuario
}