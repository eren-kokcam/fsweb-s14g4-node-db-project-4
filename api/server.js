const express = require('express');
const tarifRouter = require('./tarif-router');

const server = express();

server.use(express.json());

server.use('/api/tarifler', tarifRouter);

server.get('/', (req, res) => {
  res.json({ message: 'Yemek Tarifi API\'ye Hoş Geldiniz' });
});

module.exports = server;
