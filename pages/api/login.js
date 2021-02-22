import pick from 'lodash/pick';
import { getCredential, getCredentials, loginUser, setCredentialCounter } from '@/lib/db';
import { generateToken, json, verifyToken } from '@/lib/utils';
import { INCORRECT_CREDENTIALS_ERROR } from '@/lib/errors';
import { generateAssertion, verifyAssertion } from '@/lib/webauthn';

export default async function handler(req, res) {
  const user = await loginUser(req.body);

  if (!user) {
    return json(res, 400, {
      error_code: INCORRECT_CREDENTIALS_ERROR,
      message: 'Email or password is incorrect.',
    });
  }

  if (req.body.credential) {
    const token = req.headers.authorization.replace(/^bearer\s+/gi, '');
    const payload = verifyToken(token);
    const credential = await getCredential(req.body.credential.id);
    console.log(credential, req.body);
    const verification = await verifyAssertion(req.body.credential, user, credential, payload.challenge);
    await setCredentialCounter(credential, verification.authnrData.counter);

    const response = {
      user: pick(user, ['name', 'email', 'image_url']),
      token: generateToken({ uid: user.uid }),
    };
    return json(res, 200, response);
  } else {
    const credentials = await getCredentials(user);
    if (credentials.length === 0) {
      const response = {
        user: pick(user, ['name', 'email', 'image_url']),
        token: generateToken({ uid: user.uid }),
      };
      return json(res, 200, response);
    }

    const assertion = await generateAssertion(credentials, user);
    const response = {
      assertion,
      token: generateToken({ challenge: assertion.challenge }),
    };
    return json(res, 200, response);
  }
}
