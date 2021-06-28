const express = require('express');
const { Category } = require('../models');
const { validateJWT } = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', validateJWT, async (req, res) => {
  const { name } = req.body;

  Category.create({ name })
    .then((category) => res.status(201).json(category))
    .catch((err) => res.status(400).json({ message: err.errors[0].message }));
});

router.get('/', validateJWT, async (req, res) => {
  Category.findAll()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      res.status(500).json({ message: err.errors[0].message });
    });
});

module.exports = router;