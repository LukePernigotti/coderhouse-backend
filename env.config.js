require('dotenv').config();

const {
  DATASOURCE,
  DB_PASSWORD,
  EMAIL_ADDRESS,
  NODE_ENV,
  PORT,
  PRIVATE_KEY
} = process.env;

module.exports = {
  DATASOURCE,
  DB_PASSWORD,
  EMAIL_ADDRESS,
  NODE_ENV,
  PORT,
  PRIVATE_KEY
}