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

const getMedicoById = async (req, res = response) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById(id)
            //.populate('medico', 'nombre img')
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img')

        res.json({
            ok: true,
            medico
        });
    } catch (error) {
        res.json({
            ok: false,
            mesg: 'Médico not found'
        })
    }
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
            medico: medicoCreated
        })
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: `Unexpected error`
        })
    }
}

const actualizarMedico = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'Medico not found'
            });
        }

        // 1) Opción 1
        // medico.nombre = req.body.nombre;

        // 2) opción 2
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        // {new: true} --> last changes in DB updated !
        const medicoUpdated = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medicoUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'unexpected error found!'
        })
    }
}

const borrarMedico = async (req, res = response) => {
    const id = req.params.id;

    try {
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'Medico not found'
            });
        }
        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico has been deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'unexpected error found!'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
}