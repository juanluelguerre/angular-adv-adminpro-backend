const { response } = require('express')
const Hospital = require('../models/hospital')

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img')

    res.json({
        ok: true,
        hospitales
    })
}

const crearHospital = async (req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitadCreated = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitadCreated
        })
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: `Unexpected error`
        })
    }
}

const actualizarHospital = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital not found'
            });
        }

        // 1) Opción 1
        // hospital.nombre = req.body.nombre;

        // 2) opción 2
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        // {new: true} --> last changes in DB updated !
        const hospitalUpdated = await Hospital.findOneAndUpdate(id, cambiosHospital, { new: true });

        res.json({
            ok: true,
            hospitalUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'unexpected error found!'
        })
    }
}

const borrarHospital = async (req, res = response) => {

    const id = req.params.id;

    try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital not found'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital has been deleted successfully'
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
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}