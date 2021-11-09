import { Request, Response } from 'express';
import HttpResponse from '../constants/Response';
import { success, error } from '../helpers/apiResponse';
import config from '../config/app';
import { body, validationResult } from 'express-validator';
import Models from '../models';
import { Model } from 'sequelize';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

let { User } = Models;

let userController = {
	index: async (request: Request, response: Response): Promise<Response> => {
		try {
			let users = await User.findAll();

			return response
				.status(HttpResponse.HTTP_OK)
				.send(success(users, 'users fetched successfully', HttpResponse.HTTP_OK));
		} catch (exception: any) {
			return response
				.status(HttpResponse.HTTP_INTERNAL_SERVER_ERROR)
				.send(error(exception.message, HttpResponse.HTTP_INTERNAL_SERVER_ERROR));
		}
	},
	store: async (request: Request, response: Response): Promise<Response> => {
		try {
			const errors = validationResult(request);
			if (!errors.isEmpty()) {
				return response
					.status(HttpResponse.HTTP_UNPROCESSABLE_ENTITY)
					.json({ errors: errors.array() });
			}
			let { name, email, password, status } = request.body;
			let encryptPassword = await bcrypt.hash(password, 10);
			const userForm = await User.create({ name, email, password: encryptPassword, status });
			let payload = {
				user_id: userForm.id,
				email,
			};
			let additional = { expiresIn: '7days' };
			const token = jsonwebtoken.sign(payload, config.token, additional);
			let userInfo = {
				user: userForm,
				token,
			};

			return response
				.status(HttpResponse.HTTP_CREATED)
				.send(success(userInfo, 'user created successfully', HttpResponse.HTTP_CREATED));
		} catch (exception: any) {
			console.log(exception);
			return response
				.status(HttpResponse.HTTP_INTERNAL_SERVER_ERROR)
				.send(error(exception.message, HttpResponse.HTTP_INTERNAL_SERVER_ERROR));
		}
	},
	show: async (request: Request, response: Response): Promise<Response> => {
		let { id } = request.params;

		return response.json({
			data: `hello from show ${id}`,
		});
	},
	update: async (request: Request, response: Response): Promise<Response> => {
		return response.json({
			data: 'hello from update',
		});
	},
	destroy: async (request: Request, response: Response): Promise<Response> => {
		return response.json({
			data: 'hello from destroy',
		});
	},
	validation: (): Array<any> => {
		return [
			body('name', 'Name is Required').exists(),
			body('email', 'Email is Required')
				.exists()
				.custom(value => {
					if (value) {
						return User.findOne({ where: { email: value } }).then((user: Model) => {
							if (user) {
								return Promise.reject('Email is Taken');
							}
						});
					}
				}),
			body('email', 'Must be valid email').normalizeEmail().isEmail(),
			body('password', 'Password is Required').exists(),
			body('status', 'Status is Required').exists(),
		];
	},
};

export default userController;
