import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';

export default delay(
  {
    // 'POST /captcha/get': (req: Request, res: Response) => {
    //   const { captchaType } = req.body;
    //   if (captchaType === 'blockPuzzle') {
    //     return res.send({
    //       repCode: '0000',
    //       repData: {
    //         token: 'd1e502a71bb04da7968e68b1b2247249',
    //         jigsawImageBase64:
    //           'iVBORw0KGgoAAAANSUhEUgAAAC8AAACbCAYAAADyfMLPAAARzklEQVR42u2ad2zc93nG80+CAkVTpKjhxI0z6tiN7QzFSFpbNuLK27IsS7',
    //         originalImageBase64:
    //           'iVBORw0KGgoAAAANSUhEUgAAATYAAACbCAIAAABnKyB6AACAAElEQVR42iS7hVKj67quPU7n33tNH9JN4xAIxEhC3N3dhSS4uzYuIUbc3fHg7cPWXLP2efwvvaqueupNGmgqzfXd9x',
    //         secretKey: 'CVHsMxw3uP3T80MS',
    //       },
    //     });
    //   } else {
    //     return res.send({
    //       repCode: '9999',
    //       repMsg: '仅支持滑块验证',
    //     });
    //   }
    // },

    'POST /auth/login': (req: Request, res: Response) => {
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
