
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verify email
        const userDB = await Usuario.findOne({ email })
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Bad email or bad password '
            })
        }

        // Verify password
        const validPassword = bcrypt.compareSync(password, userDB.password)
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Bad email or bad assword '
            })
        }

        // Generate JWT (Token)
        const token = await generarJWT( userDB.id );

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `Unexpected error. ${error}`
        })
    }
}

module.exports = {
    login
}