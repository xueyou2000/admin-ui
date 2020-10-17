import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';

export default delay(
  {
    'POST /auth/login/captcha': (req: Request, res: Response) => {
      const { username, password } = req.body;
      if (username === 'admin' && password === 'admin') {
        return res.send({
          status: 0,
          res: {
            userId: 1,
            token: 'xxxxx',
            expire: 14000,
          },
        });
      } else {
        return res.send({
          status: -1,
          message: '账号密码错误',
        });
      }
    },
  },
  4000,
);
