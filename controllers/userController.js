const express = require('express');
const { User } = require('../models');
const createToken = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  
  User.create({ displayName, email, password, image })
    .then(() => {      
      const token = createToken(req.body);
      return res.status(201).json({ token });
    })
    .catch((err) => {
      if (err.errors[0].validatorKey === 'not_unique') {
        return res.status(409).json({ message: 'User already registered' });
      }     
      return res.status(400).json({ message: err.errors[0].message });     
    });
});

module.exports = router;