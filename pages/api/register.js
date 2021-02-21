import pick from 'lodash/pick';
import { createUser } from '@/lib/db';
import { generateToken, json } from '@/lib/utils';
import { handleError } from '@/lib/errors';

export default async function handler(req, res) {
  try {
    const user = await createUser(req.body);
    const token = generateToken({ uid: user.uid });

    const response = {
      user: pick(user, ['name', 'email', 'image_url']),
      token,
    };

    json(res, 200, response);
  } catch (error) {
    const { statusCode, message } = handleError(error);
    json(res, statusCode, message);
  }
}
