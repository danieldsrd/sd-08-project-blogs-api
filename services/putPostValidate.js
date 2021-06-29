// if (post.dataValues.userId !== reqUser) return res.status(401).json({ message: 'Unauthorized user' });
// if (req.body.categoryIds) return res.status(400).json({ message: 'Categories cannot be edited' });
// if (!title) return res.status(400).json({ message: '"title" is required' });
// if (!content) return res.status(400).json({ message: '"content" is required' });

const validatePostUser = (category, title, content) => {
  if (category) return { code: 400, message: 'Categories cannot be edited' };
  if (!title) return { code: 400, message: '"title" is required' };
  if (!content) return { code: 400, message: '"content" is required' };
  return { code: undefined, message: undefined };
};

module.exports = {
  validatePostUser,
};
