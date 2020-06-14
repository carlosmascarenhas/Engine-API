
const environment = process.env.NODE_ENV || 'production';
const configuration = require('../../knexfile')[environment];
const connection = require('knex')(configuration);  

module.exports = connection;