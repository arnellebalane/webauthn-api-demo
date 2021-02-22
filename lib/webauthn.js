import base64url from 'base64url';
import { Fido2Lib } from 'fido2-library';

const RELYING_PARTY_NAME = 'WebAuthn API Demo';
const RELYING_PARTY_ID = process.env.RELYING_PARTY_ID;
const RELYING_PARTY_ORIGIN = process.env.RELYING_PARTY_ORIGIN;

const fido = new Fido2Lib({
  timeout: 30000,
  rpId: RELYING_PARTY_ID,
  rpName: RELYING_PARTY_NAME,
  challengeSize: 128,
  attestation: 'none',
  cryptoParams: [-7],
});

export async function generateAttestastion(user) {
  const attestation = await fido.attestationOptions();
  attestation.user = {
    id: user.uid,
    name: user.email,
    displayName: user.name,
  };
  attestation.challenge = base64url(attestation.challenge);
  return attestation;
}

export async function verifyAttestation(response, challenge) {
  response.id = new ArrayBuffer(base64url.toBuffer(response.id));
  response.rawId = new ArrayBuffer(base64url.toBuffer(response.rawId));
  const expectations = {
    challenge,
    origin: RELYING_PARTY_ORIGIN,
    factor: 'either',
  };
  return fido.attestationResult(response, expectations);
}

export async function generateAssertion(credentials, user) {
  const assertion = await fido.assertionOptions();
  assertion.challenge = base64url(assertion.challenge);
  assertion.allowCredentials = credentials.map((credential) => ({
    id: credential.id,
    type: 'public-key',
  }));
  assertion.userVerification = 'discouraged';
  return assertion;
}

export async function verifyAssertion(response, user, credential, challenge) {
  response.id = new ArrayBuffer(base64url.toBuffer(response.id));
  response.rawId = new ArrayBuffer(base64url.toBuffer(response.rawId));
  const expectations = {
    challenge,
    origin: RELYING_PARTY_ORIGIN,
    factor: 'either',
    publicKey: credential.public_key,
    prevCounter: credential.counter,
    userHandle: null,
  };
  return fido.assertionResult(response, expectations);
}
