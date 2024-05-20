'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.hasMany(models.StockQuote, { foreignKey: 'userId' });
		}
	}
	User.init({
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		role: {
			type: DataTypes.ENUM('user', 'admin'),
			allowNull: false,
		}
	}, {
		sequelize,
		modelName: 'User',
	});
	return User;
}
