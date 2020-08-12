const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid
            // nombre, 
            // etc....        
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('JWT cannot be generate !');
            } else {
                resolve(token);
            }

        });
    });
}

module.exports = {
    generarJWT
}