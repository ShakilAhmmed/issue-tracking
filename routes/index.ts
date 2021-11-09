import express, { Router } from 'express';
import exampleController from '../controllers/exampleController';
import userController from '../controllers/userController';

let router: Router = express.Router();

router.get('/example', exampleController.index).post('/example', exampleController.store);
router
	.get('/users', userController.index)
	.post('/users', userController.validation, userController.store);

router
	.get('/example/:id', exampleController.show)
	.delete('/example/:id', exampleController.destroy);

export default router;
