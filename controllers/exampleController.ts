import { Request, Response } from 'express';
import HttpResponse from '../constants/Response';
import ResourceController from '../interfaces/ResourceController';

let exampleController: ResourceController = {
  index: (request: Request, response: Response): Response => {
    return response.status(HttpResponse.HTTP_OK).json({
      data: 'hello from index'
    });
  },
  store: (request: Request, response: Response): Response => {
    let { name } = request.body;
    return response.json({
      data: `hello from store ${name}`
    });
  },
  show: (request: Request, response: Response): Response => {
    let { id } = request.params;
    return response.json({
      data: `hello from show ${id}`
    });
  },
  update: (request: Request, response: Response): Response => {
    return response.json({
      data: 'hello from update'
    });
  },
  destroy: (request: Request, response: Response): Response => {
    return response.json({
      data: 'hello from destroy'
    });
  }
};

export default exampleController;
