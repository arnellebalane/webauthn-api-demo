import { createCredential, getUser } from '@/lib/db';
import { handleError } from '@/lib/errors';
import { generateToken, json, verifyToken } from '@/lib/utils';
import { generateAttestastion, verifyAttestation } from '@/lib/webauthn';

export default async function handler(req, res) {
  try {
    const token = req.headers.authorization.replace(/^bearer\s+/gi, '');
    const payload = verifyToken(token);
    const user = await getUser(payload.uid);

    if (req.method === 'GET') {
      const attestation = await generateAttestastion(user);
      const response = {
        attestation,
        token: generateToken({ uid: user.uid, challenge: attestation.challenge }),
      };

      json(res, 200, response);
    } else if (req.method === 'POST') {
      const verification = await verifyAttestation(req.body, payload.challenge);
      const credential = await createCredential(verification.authnrData, user);
      json(res, 200, credential);
    }
  } catch (error) {
    const { statusCode, message } = handleError(error);
    console.log(error, message);
    json(res, statusCode, message);
  }
}
