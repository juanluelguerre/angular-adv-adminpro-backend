const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    }, 
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'        
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'        
    }
});

MedicoSchema.method('toJSON', function(){
    // Avoid to send no needed fields !
    const { __v, ...object } = this.toObject();
    return object;
}); //, { collection: 'medicos'}); /* Mongoose pluralize automaticalley adding "s" if we don't specify it */

// Mongoose, add "s" to plularize
module.exports = model( 'Medico', MedicoSchema );