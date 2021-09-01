const express = require('express');

const connection = require('./database/connection');

const routes = express.Router();

routes.get('/registros', async (request, response) =>{
    const registros = await connection('registros').select('*');

    return response.json(registros);

});

routes.post('/registros', async (request, response) =>{
    const { pais, datab } = request.body;
    
    await connection('registros').insert( {
        pais,
        datab,
    });
    
});

module.exports = routes;
