import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';

let _captch: string | null = null;

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
    'POST /auth/mobile-captch': (req: Request, res: Response) => {
      const { mobile } = req.query;
      if (mobile && typeof mobile === 'string' && mobile.length > 10) {
        _captch = mobile.slice(0, 4);
        return res.send({
          status: 0,
          message: '发送成功',
        });
      } else {
        return res.send({
          status: -1,
          message: '手机号不正确',
        });
      }
    },
    'POST /auth/login/mobile': (req: Request, res: Response) => {
      const { captcha } = req.body;
      if (captcha === _captch) {
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
          message: '验证码错误',
        });
      }
    },
    'POST /auth/logout': {
      status: 0,
    },
  },
  700,
);
