import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exists',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please input a valid email',
        },
        isEmail: {
          args: true,
          msg: 'Invalid Email',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty',
        },
        isMoreThan4Characters(value) {
          if (value.length < 4) {
            throw new Error('Password should be more than 4 characters');
          }
        },
      },
    },
    displayPicture: DataTypes.STRING,
  }, {});
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};
