import { Request, Response } from 'express';

export default interface ResourceController {
  index: (request: Request, response: Response) => Response;
  store: (request: Request, response: Response) => Response;
  show: (request: Request, response: Response) => Response;
  update: (request: Request, response: Response) => Response;
  destroy: (request: Request, response: Response) => Response;
}
