const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
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
    }
});

HospitalSchema.method('toJSON', function(){
    // Avoid to send no needed fields !
    const { __v, ...object } = this.toObject();
    return object;
}, { collection: 'hospitales'} );

// Mongoose, add "s" to plularize
module.exports = model( 'Hospital', HospitalSchema );