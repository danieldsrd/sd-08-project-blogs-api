const express = require('express');
const { BlogPost } = require('../models');
const { Category } = require('../models');
const { validateJWT } = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', validateJWT, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user.id;
  
  if (!categoryIds) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }

  const categoryValue = await Category.findOne({ where: { id: categoryIds } });

  BlogPost.create({ title, content, userId, categoryIds })
    .then((poster) => {
      if (!categoryValue) {
        res.status(400).json({ message: '"categoryIds" not found' });
      }      
      res.status(201).json(poster);
    })
    .catch((err) => {
      if (err.errors) {
        return res.status(400).json({ message: err.errors[0].message });
      }
    });
});

module.exports = router;