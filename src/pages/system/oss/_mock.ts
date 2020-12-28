import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';

export default delay(
  {
    'POST /api/system/oss/findByPage/:pageSize/:current': (req: Request, res: Response) => {
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
    'POST /api/system/oss/add': {
      status: 0,
    },
    'POST /api/system/oss/remove': {
      status: 0,
    },
    'POST /api/system/oss/update': {
      status: 0,
    },
  },
  600,
);
