import pick from 'lodash/pick';
import { getCredentials, getUser } from '@/lib/db';
import { json, verifyToken } from '@/lib/utils';
import { handleError } from '@/lib/errors';

export default async function handler(req, res) {
  try {
    const token = req.headers.authorization.replace(/^bearer\s+/gi, '');
    const payload = verifyToken(token);
    const user = await getUser(payload.uid);
    const credentials = await getCredentials(user);

    const response = credentials.map((credential) => pick(credential, ['id']));
    json(res, 200, response);
  } catch (error) {
    const { statusCode, message } = handleError(error);
    console.log(error, message);
    json(res, statusCode, message);
  }
}
