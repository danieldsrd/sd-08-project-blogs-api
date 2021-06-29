const { Category, User } = require('../models');

const functionSearch = async (posts) => {
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
  return findByIds;
};

module.exports = functionSearch;