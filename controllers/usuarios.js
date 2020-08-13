const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;

    // Filter, but no set "," separator
    // const usuarios = await Usuario
    //     .find({}, 'nombre email role google')
    //     .skip(desde)
    //     .limit(5)

    // const total = await Usuario.count();

    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),

        Usuario.countDocuments()
    ]);

    // res.status(400).json({ 
    res.json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuario = async (req, res = response) => {

    const { email, password, nombre } = req.body;

    try {

        const emailExists = await Usuario.findOne({ email });

        if (emailExists) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            })
        }

        const usuario = new Usuario(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generate JWT (Token)
        const token = await generarJWT(usuario.id);

        // res.status(400).json({
        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: '. Please review your logs for more detail'
        });
    }
}

const actualizarUsuario = async (req, res = response) => {

    //TODO: Validate token and check correct user

    const uid = req.params.id;

    try {

        const userDB = await Usuario.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User with this id ∫does not exist'
            })
        }

        const { password, google, email, ...fields } = req.body;

        if (userDB.email !== req.body.email) {
            const emailExists = await Usuario.findOne({ email });
            if (emailExists) {
                return res.status(400).json({
                    ok: false,
                    msg: 'User already exist with this email'
                })
            }
        }

        fields.email = email;

        // Remove unnecesaries data to avoid to be updated. So using "delete" Mongoose does not update it.
        // Use ...fields instead !!
        //
        // delete fields.password;
        // delete fields.google;

        const updatedUser = await Usuario.findByIdAndUpdate(uid, fields, { new: true });

        res.json({
            ok: true,
            msg: updatedUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `Unexpected error ${error}`
        });
    }
}

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const deletedUser = await Usuario.findByIdAndDelete(uid);
        if (!deletedUser) {
            res.status(400).json({
                ok: false,
                msg: 'User does not exist'
            })
        }

        res.json({
            ok: true,
            uid
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `Unexpected error ${error}`
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}