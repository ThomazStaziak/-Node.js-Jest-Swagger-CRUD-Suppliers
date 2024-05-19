'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StockQuote extends Model {
    static associate(models) {
      StockQuote.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  StockQuote.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    open: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    high: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    low: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    close: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'StockQuote',
  });
  return StockQuote;
};
