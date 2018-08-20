//password handler
const crypto = require('crypto');
const {key} = require('../config');

module.exports = password => crypto.createHmac('sha1', key).update(password).digest('hex'); 
