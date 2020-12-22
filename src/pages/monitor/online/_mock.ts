import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';

export default delay(
  {
    'POST /api/monitor/online/list': (req: Request, res: Response) => {
      return res.send({
        status: 0,
        res: [
          {
            browser: 'Chrome 8 87.0.4280.88',
            deptName: 'XueYou科技',
            ipaddr: '127.0.0.1',
            loginLocation: '内网IP',
            loginName: 'admin',
            loginTime: '2020-12-21 14:08:21',
            os: ' Intel Mac OS X 11_1_0',
            tokenId: 'fa51764a-6132-479f-bec3-f747f693c4b1',
          },
        ],
      });
    },
    'POST /api/monitor/online/forceLogout': {
      status: 0,
    },
  },
  600,
);
