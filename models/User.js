const { displayNameValidate,
  emailValidate,
  passwordValidate,
} = require('../services/userValidate');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: {
      type: DataTypes.STRING,
      ...displayNameValidate,
    },
    email: {
      type: DataTypes.STRING,
      ...emailValidate,
    },
    password: {
      type: DataTypes.STRING,
      ...passwordValidate,
    },
    image: DataTypes.STRING,
  }, { timestamps: false });
  return User;
};
