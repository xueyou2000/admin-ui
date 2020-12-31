import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';

export default delay(
  {
    'POST /api/system/dept/findByPage/:pageSize/:current': (req: Request, res: Response) => {
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
    'POST /api/system/dept/add': {
      status: 0,
    },
    'POST /api/system/dept/remove': {
      status: 0,
    },
    'POST /api/system/dept/update': {
      status: 0,
    },
    'POST /api/system/dept/role/:roleId': {
      status: 0,
      res: [],
    },
    'POST /api/system/dept/all': {
      status: 0,
      res: [],
    },
    'POST /api/system/dept/findEnableDepts': {
      status: 0,
      res: [],
    },
  },
  600,
);
