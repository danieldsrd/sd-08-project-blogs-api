

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: {
      type: DataTypes.STRING,      
      validate: {
        len: {
          args: [8, 32],
          msg: '"displayName" length must be at least 8 characters long',
        },
      },
    },
    email: { 
      type: DataTypes.STRING,
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
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: '"password" is required',
        },
        len: {
          args: [6, 6],
          msg: '"password" length must be 6 characters long',
        }
      }
    },
    image: DataTypes.STRING
  },
  {
    timestamps: false,
    tableName: 'Users'
  });
  return User;
};