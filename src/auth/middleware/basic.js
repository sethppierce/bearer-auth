
'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { next('Invalid Login'); }
  let basic = req.headers.authorization.split(' ');

  let [username, pass] = base64.decode(basic[1]).split(':');

  try {
    req.user = await users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.error(e.message);
    res.status(403).send('Invalid Login');

  }
  
};