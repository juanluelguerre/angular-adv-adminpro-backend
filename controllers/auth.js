
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify')

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
        const token = await generarJWT(userDB.id);

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

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);
        let usuario;

        const userDB = await Usuario.findOne({ email });
        if (!userDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '', /* no need password. Authenticaton from Google */
                img: picture,
                google: true
            })
        } else {
            usuario = userDB;
            usuario.google = true;
            // usuario.password = ''; /* Remove old password to have only one auth method*/
        }

        await usuario.save();

        // Generate JWT (Token)
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: true,
            msg: 'Google token not valid'
        });
    }




}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    // Generate JWT (Token)
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    })
}


module.exports = {
    login,
    googleSignIn,
    renewToken
}