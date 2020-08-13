
const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No valid tipo: hospitales/medicos/usuarios'
        })
    }

    // Validate file exists
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }

    // Process image. Thanks to Middleware express-fileupload
    // "imagen" -> same name indicated (using Postman for instanace) !
    const file = req.files.imagen;
    const shortName = file.name.split('.');
    const fileExtension = shortName[shortName.length - 1];

    // validate extensions
    const validExtensions = ['png', 'jgp', 'jpeg', 'gif'];
    if (!validExtensions.includes(fileExtension)) {
        return res.status(400).json({
            ok: false,
            msg: 'Only valid extensions allowed: png/jpg/jpeg/gif'
        })
    }

    // Path to save image
    const fileName = `${uuidv4()}.${fileExtension}`

    // Move image
    const currentPath = `./uploads/${tipo}/${fileName}`;
    file.mv(currentPath, err => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error tying to move image'
            });
        }
    });

    // Update database
    actualizarImagen(tipo, id, fileName);

    res.json({
        ok: true,
        msg: 'File Uploaded successfully',
        fileName
    })
}

const getImage = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // 
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const defaultImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(defaultImg);
    }

}
module.exports = {
    fileUpload,
    getImage
}