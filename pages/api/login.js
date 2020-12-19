import pick from 'lodash/pick';
import { loginUser } from '@/lib/db';

export default async function handler(req, res) {
  const user = await loginUser(req.body);
  const response = pick(user, ['name', 'email','image_url']);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(response));
}
