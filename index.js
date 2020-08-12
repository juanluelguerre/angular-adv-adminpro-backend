// Add '.env' variable to Process.en
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Initialize express
const app = express();

// CORS configuration
app.use(cors());

//  Read and body parse. Parse body must be placed before middelware use ('/api/...)
app.use ( express.json() );

// Database initialization.
dbConnection();

app.use('/api/usuarios',    require('./routes/usuarios'));
app.use('/api/login',       require('./routes/auth'));

// Print all environment varibles
// console.log( process.env );

// app.get('/api/usuarios', (req, res) => {
//     // res.status(400).json({
//     res.json({
//         ok: true,
//         usuarios: [{
//             id: '1',
//             nombre: 'Juanlu'
//         }]
//     })
// });

app.listen(process.env.PORT, () => {
    console.log('Server running at ' + process.env.PORT);
});