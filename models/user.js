'use strict';
const {
  Model
} = require('sequelize');
const bcrpyt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: { msg: 'Username is required' },
        notNull: { msg: 'Username is required' },

      }
    },
    email:  {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: { msg: 'Email is required' },
        notNull: { msg: 'Email is required' },
        isEmail: {msg: 'Must be an valid Email'}
      }
    },
    password:  {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: { msg: 'Password is required' },
        notNull: { msg: 'Password is required' },
        isIncludeChar() {
          const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
          if(!regularExpression.test(this.password)) throw new Error('Password must include a number and a special expression')
        },
        len:{
          args: [8],
          msg: "Password must be minimal 8 and maximum of 20 characters"
        }

      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeSave',(user)=>{
    const salt = bcrpyt.genSaltSync(10);
    user.password = bcrpyt.hashSync(user.password, salt);
    user.role = 'user'

  })
  
  return User;

  
};