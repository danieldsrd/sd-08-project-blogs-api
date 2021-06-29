const express = require('express');
const { User } = require('../models');
const createToken = require('../services/createJWT');
const { validateJWT } = require('../middlewares/validateJWT');

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

router.get('/', validateJWT, async (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: err.errors[0].message });
    });
});

router.get('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;

  User.findByPk(id)
    .then((user) => {
      if (user === null) {
        return res.status(404).json({ message: 'User does not exist' });
      }
      return res.status(200).json(user);
  })
    .catch(() => res.status(500).json({ message: 'Error' }));
});

router.delete('/me', validateJWT, async (req, res) => {
  const reqUser = req.user.id;
  try {
    const deletedUser = await User.destroy({ where: { id: reqUser } });
    if (deletedUser === 1) return res.status(204).end();
  } catch (e) {
    res.status(400).send({ message: 'error' });
  }
});

module.exports = router;