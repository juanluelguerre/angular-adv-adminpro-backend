// Add '.env' variable to Process.en
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Initialize express
const app = express();

// CORS configuration
app.use  (cors() );

// Database initialization.
dbConnection();

// Print all environment varibles
// console.log( process.env );

app.get( '/', (req, res) =>{
    // res.status(400).json({
        res.json({
        ok: true,
        msg: 'Hello World !'
    })
} );

app.listen( process.env.PORT, () => {
    console.log('Server running at ' + process.env.PORT);
});