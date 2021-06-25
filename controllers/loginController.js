const express = require('express');
const { User } = require('../models');
const createToken = require('../services/createJWT');
const { emailPassValidate } = require('../services/loginValidate');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const { code, message } = emailPassValidate(email, password);
  if (!code && !message) {
    User.findOne({
      where: { email, password },
    }).then((userLogin) => {
        if (!userLogin) {
          return res.status(400).json({ message: 'Invalid fields' });
        } 
          const token = createToken(req.body);
          return res.status(200).json({ token });
      })
      .catch((err) => res.status(400).json({ message: err.errors[0].message }));  
  }
  return res.status(code).json({ message });
});

module.exports = router;