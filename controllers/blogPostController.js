const express = require('express');
const { BlogPost } = require('../models');
const { validateJWT } = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', validateJWT, (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user.id;

  BlogPost.create({ title, content, userId, categoryIds })
    .then((poster) => {
      console.log('POSTTTTT', poster);
      res.status(201).json(poster);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: err.errors[0].message });
    });
});

module.exports = router;