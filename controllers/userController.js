const express = require('express');
const { User } = require('../models');
const tokenGen = require('../middlewares/validateJWT');
const router = express.Router();

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  
  User.create({ displayName, email, password, image })
    .then((newUser) => {
      const token = tokenGen({ displayName, email, password, image });
      return res.status(201).json({ token: token });
    })
    .catch((err) => {
      if (err.errors[0].validatorKey === 'not_unique') {
        return res.status(409).json({ message: 'User already registered'});
      } else {
        return res.status(400).json({ message: err.errors[0].message });  
      }        
    });
});

module.exports = router;