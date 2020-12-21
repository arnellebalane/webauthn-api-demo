import 'dotenv/config';
import jwt from 'jsonwebtoken';
import pick from 'lodash/pick';
import { getUser } from '@/lib/db';

export default async function handler(req, res) {
  const token = req.headers.authorization.replace(/^Bearer\s+/i, '');
  const payload = jwt.verify(token, process.env.SECRET);

  const user = await getUser(payload.uid);
  const response = pick(user, ['name', 'email', 'image_url']);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(response));
}
