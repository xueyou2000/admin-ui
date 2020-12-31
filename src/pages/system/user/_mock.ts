import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';

export default delay(
  {
    'POST /api/system/user/findByPage/:pageSize/:current': (req: Request, res: Response) => {
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
    'POST /api/system/user/add': {
      status: 0,
    },
    'POST /api/system/user/remove': {
      status: 0,
    },
    'POST /api/system/user/update': {
      status: 0,
    },
    'POST /api/system/user/resetPwd': {
      status: 0,
    },
    'POST /api/system/user/changeStatus': {
      status: 0,
    },
    'POST /api/system/user/get/:userId': {
      status: 0,
      res: {
        userId: 1,
        deptId: 1,
        userName: 'XueYou',
        userType: 'boss',
        email: 'xueyoucd@gmail.com',
        phonenumber: '15521451231',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        sex: '1',
        remark: '海纳百川，有容乃大',
        admin: 'TRUE',
        roleIds: [],
      },
    },
  },
  600,
);
