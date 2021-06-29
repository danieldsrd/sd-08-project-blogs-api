const express = require('express');
const { BlogPost, Category, User } = require('../models');
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

router.get('/', validateJWT, async (req, res) => {
  try {
    const posts = await BlogPost.findAll();
    const findByIds = await Promise.all(posts.map(async (post) => {
      const userById = await User.findOne({ 
        where: { id: post.dataValues.userId },
        attributes: { exclude: ['password'] },
      });
      const categoryById = await Category.findOne({ where: { id: post.dataValues.id } });
      return ({
        ...post.dataValues,
        user: { ...userById.dataValues },
        categories: [{ ...categoryById.dataValues }],
      });
    }));
    res.status(200).json(findByIds);
  } catch (e) {
    res.status(400).send({ message: 'error' });
  }
});

router.get('/:id', validateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post does not exist' });
    const userById = await User.findOne({ 
      where: { id: post.dataValues.userId },
      attributes: { exclude: ['password'] },
    });      
    const categoryById = await Category.findOne({ where: { id: post.dataValues.id } });      
    const result = {
      ...post.dataValues,
      user: { ...userById.dataValues },
      categories: [{ ...categoryById.dataValues }],
    };
    return res.status(200).json(result);
  } catch (e) {
    res.status(400).send({ message: 'error' });
  }
});

module.exports = router;