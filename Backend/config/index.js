//config/index.js 

const connectDB = require('./db');
const env=require('./env');
const constants = require('./constants');

MediaSourceHandle.exports = {
    connectDB,
    ...env,
    ...constants
};
