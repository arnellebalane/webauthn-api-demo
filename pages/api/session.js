import 'dotenv/config';
import jwt from 'jsonwebtoken';
import pick from 'lodash/pick';
import { getUser } from '@/lib/db';
import { json } from '@/lib/utils';
import { UNAUTHORIZED_ERROR } from '@/lib/errors';

export default async function handler(req, res) {
  const token = req.headers.authorization.replace(/^Bearer\s+/i, '');
  const payload = jwt.verify(token, process.env.SECRET);

  try {
    const user = await getUser(payload.uid);
    const response = pick(user, ['name', 'email', 'image_url']);
    json(res, 200, response);
  } catch (error) {
    json(res, 401, {
      error_code: UNAUTHORIZED_ERROR,
    });
  }
}
