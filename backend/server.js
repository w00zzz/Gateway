const express = require('express');
const app = express();
const endpointRouter = require('./endpoints');


app.use('/api', endpointRouter);
app.listen(3001, () => {
  console.log('Server backend corriendo en el puerto 3001...')
  console.log('http://localhost:3001/api/gateways')
})
