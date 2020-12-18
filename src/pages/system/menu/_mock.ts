import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';
import menus from './resource/menus.json';

export default delay(
  {
    'POST /api/system/menu/findByPage/:pageSize/:pageNum': (req: Request, res: Response) => {
      return res.send({
        status: 0,
        res: {
          current: 1,
          records: menus,
          total: menus.length,
        },
      });
    },
    'POST /api/system/menu/add': {
      status: 0,
    },
    'POST /api/system/menu/update': {
      status: 0,
    },
    'POST /api/system/menu/remove': {
      status: 0,
    },
  },
  600,
);
