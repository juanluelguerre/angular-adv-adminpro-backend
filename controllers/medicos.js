const { response } = require('express')
const Medico = require('../models/medico')

const getMedicos = async (req, res = response) => {
   
    const medicos = await Medico.find()
                                //.populate('medico', 'nombre img')
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img')

    res.json({
        ok: true,
        medicos
    })

}

const crearMedico = async (req, res = response) => {
    const uid = req.uid;

    const medico = new Medico({
        usuario: uid, 
        ...req.body
    });
    
    try {

        const medicoCreated = await medico.save();

        res.json({
            ok: true,
            hospital: medicoCreated
        })
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: `Unexpected error`
        })
    }
}

const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
}

const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarMedico'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}