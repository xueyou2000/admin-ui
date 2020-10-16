import { Request, Response } from 'express';

export default {
  'POST /captcha/get': (req: Request, res: Response) => {
    const { captchaType } = req.body;
    if (captchaType === 'blockPuzzle') {
      return res.send({
        status: 0,
        message: 'success',
        res: {
          token: 'd1e502a71bb04da7968e68b1b2247249',
          jigsawImageBase64:
            'iVBORw0KGgoAAAANSUhEUgAAAC8AAACbCAYAAADyfMLPAAARzklEQVR42u2ad2zc93nG80+CAkVTpKjhxI0z6tiN7QzFSFpbNuLK27IsS7',
          originalImageBase64:
            'iVBORw0KGgoAAAANSUhEUgAAATYAAACbCAIAAABnKyB6AACAAElEQVR42iS7hVKj67quPU7n33tNH9JN4xAIxEhC3N3dhSS4uzYuIUbc3fHg7cPWXLP2efwvvaqueupNGmgqzfXd9x',
          secretKey: 'CVHsMxw3uP3T80MS',
        },
      });
    } else {
      return res.send({
        status: 999,
        message: '仅支持滑块验证',
      });
    }
  },
  'GET /test': {
    status: 999,
    message: '业务出错了',
  },
  'GET /test2': (req: Request, res: Response) => {
    res.status(401).send({
      status: 401,
      message: 'Unauthorized',
    });
  },
};
