import {Request, Response} from 'express';
import HttpResponse from '../constants/Response';

let exampleController = {
    index: async (request: Request, response: Response): Promise<Response> => {
        return response.status(HttpResponse.HTTP_OK).json({
            data: 'from index'
        });
    },
    store: async (request: Request, response: Response): Promise<Response> => {
        let {name} = request.body;
        return response.json({
            data: `hello from store ${name}`
        });
    },
    show: async (request: Request, response: Response): Promise<Response> => {
        let {id} = request.params;
        return response.json({
            data: `hello from show ${id}`
        });
    },
    update: async (request: Request, response: Response): Promise<Response> => {
        return response.json({
            data: 'hello from update'
        });
    },
    destroy: async (request: Request, response: Response): Promise<Response> => {
        return response.json({
            data: 'hello from destroy'
        });
    }
};

export default exampleController;
