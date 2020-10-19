import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';

export default delay(
  {
    'POST /system/user/info': {
      status: 0,
      res: {
        userId: 1,
        deptId: 1,
        userName: 'XueYou',
        userType: 'boss',
        email: 'xueyoucd@gmail.com',
        phonenumber: '15521451231',
        sex: '1',
        buttons: ['system:user:list'],
      },
    },
  },
  700,
);
