import pick from 'lodash/pick';
import { registerUser } from '@/lib/db';
import { generateToken } from '@/lib/utils';

export default async function handler(req, res) {
  const user = await registerUser(req.body);
  const token = generateToken({ uid: user.uid });

  const response = {
    user: pick(user, ['name', 'email', 'image_url']),
    token,
  };

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(response));
}
