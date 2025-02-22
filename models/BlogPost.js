const { contentValidate, titleValidate } = require('../services/postValidate');

module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: {
      type: DataTypes.STRING,
      ...titleValidate,
    },
    content: {
      type: DataTypes.STRING,
      ...contentValidate,
    },
    userId: {
      type: DataTypes.INTEGER, 
      foreignKey: true,
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false });
  return BlogPost;
};