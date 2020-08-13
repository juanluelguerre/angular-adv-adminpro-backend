const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const deleteImage =(path) =>{    
    if (fs.existsSync(path)){
        // Delete old image
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipo, id, fileName) => {

    let oldPath = "";
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico){
                console.log('Medico not found');
                return false;
            }
            oldPath = `./uploads/medicos/${medico.img}`;
            deleteImage(oldPath);

            medico.img = fileName;
            await medico.save();
            return true;
            
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital){
                console.log('Hospital not found');
                return false;
            }
            oldPath = `./uploads/hospitales/${hospital.img}`;
            deleteImage(oldPath);

            hospital.img = fileName;
            await hospital.save();
            return true;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario){
                console.log('Usuario not found');
                return false;
            }
            oldPath = `./uploads/usuarios/${usuario.img}`;
            deleteImage(oldPath);

            usuario.img = fileName;
            await usuario.save();
            return true;
        default:
            break;
    }


}

module.exports = {
    actualizarImagen
}