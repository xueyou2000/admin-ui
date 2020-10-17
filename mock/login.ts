import { Request, Response } from 'express';

export default {
  'GET /test': {
    status: 999,
    message: '业务出错了',
  },
  'GET /test2': (req: Request, res: Response) => {
    res.status(401).send({
      status: 401,
      message: 'Unauthorized',
    });
  },
};
