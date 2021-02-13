import { createCredential, getUser } from '@/lib/db';
import { handleError } from '@/lib/errors';
import { generateToken, json, verifyToken } from '@/lib/utils';
import { generateAttestationOptions, verifyAttestationResponse } from '@simplewebauthn/server';

const RELYING_PARTY_NAME = 'WebAuthn API Demo';
const RELYING_PARTY_ID = 'localhost';
const RELYING_PARTY_ORIGIN = 'http://localhost:3000';

export default async function handler(req, res) {
  try {
    const token = req.headers.authorization.replace(/^bearer\s+/gi, '');
    const payload = verifyToken(token);
    const user = await getUser(payload.uid);

    if (req.method === 'GET') {
      const attestation = generateAttestationOptions({
        rpName: RELYING_PARTY_NAME,
        rpID: RELYING_PARTY_ID,
        userID: user.uid,
        userName: user.uid,
        userDisplayName: user.name,
        attestationType: 'none',
      });
      const response = {
        attestation,
        token: generateToken({ uid: user.uid, challenge: attestation.challenge }),
      };

      json(res, 200, response);
    } else if (req.method === 'POST') {
      const verification = await verifyAttestationResponse({
        credential: req.body,
        expectedChallenge: payload.challenge,
        expectedOrigin: RELYING_PARTY_ORIGIN,
        expectedRPID: RELYING_PARTY_ID,
      });
      const credential = await createCredential(verification.attestationInfo, user);
      json(res, 200, credential);
    }
  } catch (error) {
    const { statusCode, message } = handleError(error);
    console.log(error, message);
    json(res, statusCode, message);
  }
}
