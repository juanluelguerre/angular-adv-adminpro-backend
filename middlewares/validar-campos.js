const { response } = require('express');
const { validationResult } = require ('express-validator')

const validarCampos = (req, res = response, next) => {
    // Error results after validation checks
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();
}

module.exports = {
    validarCampos
}