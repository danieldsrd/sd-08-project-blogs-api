const titleValidate = {  
  allowNull: false,   
  validate: {
    notNull: {
      args: true,
      msg: '"title" is required',
    },
    notEmpty: {
      msg: '"title" is required',
    },
  },
};

const contentValidate = {
  allowNull: false,
  validate: {
    notNull: {
      args: true,
      msg: '"content" is required',
    },
    notEmpty: {
      msg: '"content" is required',
    },
  },
};

module.exports = {
  titleValidate,
  contentValidate,
};
