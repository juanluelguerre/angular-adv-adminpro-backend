const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        // TODO: Use Passwrod as a environment variable.
        mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online');

    } catch (err) {
        console.log(`Error trying to connect to DB.`);
    }
}

module.exports = {
    dbConnection
}