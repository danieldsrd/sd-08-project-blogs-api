const displayNameValidate = {     
  validate: {
    len: {
      args: [8, 32],
      msg: '"displayName" length must be at least 8 characters long',
    },
  },
};

const emailValidate = {
  allowNull: false,
  validate: {
    notNull: {
      args: true,
      msg: '"email" is required',
    },
    notEmpty: {
      msg: '"email" is required',
    },
    isEmail: {          
      msg: '"email" must be a valid email',
    },
  },
};

const passwordValidate = {
  allowNull: false,
  validate: {
    notNull: {
      args: true,
      msg: '"password" is required',
    },
    len: {
      args: [6, 6],
      msg: '"password" length must be 6 characters long',
    },
  },
};

module.exports = {
  displayNameValidate,
  emailValidate,
  passwordValidate,
};
