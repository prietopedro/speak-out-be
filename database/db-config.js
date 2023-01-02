const environment = process.env.DB_ENV || 'production';

const knex = require('knex');

const knexConfig = require('../knexfile.js')[environment];

try{
    knex(knexConfig)
}catch(e){
    console.log(e)
}
module.exports = knex(knexConfig);
