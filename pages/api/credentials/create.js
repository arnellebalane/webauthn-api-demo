import { handleError } from '@/lib/errors';
import { json, verifyToken } from '@/lib/utils';

export default async function handler(req, res) {
  try {
    const token = req.headers.authorization.replace(/^bearer\s+/gi, '');
    const payload = verifyToken(token);
    console.log(payload);

    json(res, 200, {});
  } catch (error) {
    const { statusCode, message } = handleError(error);
    json(res, statusCode, message);
  }
}
