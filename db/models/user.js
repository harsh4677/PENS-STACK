'use strict';
const {
  Model,
  DataTypes,
} = require('sequelize');

const sequelize = require('../../config/database');
const bcrypt = require('bcrypt');
const AppError = require('../../utils/appError');

module.exports = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userType: {
    type: DataTypes.ENUM('0', '1', '2'),
    allowNull: false,
    validate:{
      notNull:{
        msg: 'UserType cannot be null',
      },
      notEmpty:{
        msg: 'UserType cannot be empty',
      }
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notNull:{
        msg: 'First Name cannot be null',
      },
      notEmpty:{
        msg: 'First Name cannot be empty',
      }
    }
    
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notNull:{
        msg: 'Last Name cannot be null',
      },
      notEmpty:{
        msg: 'Last Name cannot be empty',
      }
    }
    
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notNull:{
        msg: 'Email cannot be null',
      },
      notEmpty:{
        msg: 'Email cannot be empty',
      },
      isEmail:{
        msg: 'Invalid email id'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notNull:{
        msg: 'Password cannot be null',
      },
      notEmpty:{
        msg: 'Password cannot be empty',
      }
    }
  },
  confirmPassword:{
    type: DataTypes.VIRTUAL,
    set(value){
      if(this.password.length < 7){
        throw new AppError('Password length must be greater than 7', 400)
      }
      if(value == this.password){
        const hashPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashPassword);

      }else{
        throw new AppError('Password and Confirm Password must be same', 400)
      }
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    type: DataTypes.DATE,
  }
},{
  paranoid: true,
  freezeTableName: true,
  modelName: 'user',
});
