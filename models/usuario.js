const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.method('toJSON', function(){
    // Avoid to send no needed fields !
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

// Mongoose, add "s" to plularize
module.exports = model( 'Usuario', UsuarioSchema );