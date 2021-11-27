'use strict';

import { Model } from 'sequelize';

interface UserAttributes {
	name: string;
	email: string;
	password: string;
	status: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
	class User extends Model<UserAttributes> implements UserAttributes {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		public email!: string;
		public name!: string;
		public password!: string;
		public status!: boolean;

		static associate(models: any) {
			// define association here
		}
	}

	User.init(
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			status: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: 'User'
		}
	);
	return User;
};
