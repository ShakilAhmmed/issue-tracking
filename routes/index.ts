import express, { Router } from 'express';
import exampleController from '../controllers/exampleController';

let router: Router = express.Router();

router.get('/example', exampleController.index).post('/example', exampleController.store);

router
  .get('/example/:id', exampleController.show)
  .delete('/example/:id', exampleController.destroy);

export default router;
