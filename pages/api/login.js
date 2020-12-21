import pick from 'lodash/pick';
import { loginUser } from '@/lib/db';
import { generateToken, json } from '@/lib/utils';
import { INCORRECT_CREDENTIALS_ERROR } from '@/lib/errors';

export default async function handler(req, res) {
  const user = await loginUser(req.body);

  if (!user) {
    return json(res, 400, {
      error_code: INCORRECT_CREDENTIALS_ERROR,
      message: 'Email or password is incorrect.',
    });
  }

  const response = {
    user: pick(user, ['name', 'email', 'image_url']),
    token: generateToken({ uid: user.uid }),
  };
  json(res, 200, response);
}
