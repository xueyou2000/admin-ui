import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';

export default delay(
  {
    'POST /api/system/role/findByPage/:pageSize/:current': (req: Request, res: Response) => {
      var pageNum = parseInt(req.params.current);
      var pageSize = parseInt(req.params.pageSize);

      return res.send({
        status: 0,
        res: {
          current: pageNum,
          records: [],
          total: 0,
        },
      });
    },
    'POST /api/system/role/add': {
      status: 0,
    },
    'POST /api/system/role/remove': {
      status: 0,
    },
    'POST /api/system/role/update': {
      status: 0,
    },
    'POST /api/system/role/authDataScope': {
      status: 0,
    },
    'POST /api/system/role/all': {
      status: 0,
      res: [],
    },
  },
  600,
);
