import * as uuid from 'uuid';
import bcrypt from 'bcrypt';
import base64url from 'base64url';
import { PrismaClient } from '@prisma/client';
import { getGravatarUrl } from './utils';

const client = new PrismaClient();

const SALT_ITERATIONS = 10;

export async function createUser(data) {
  data.uid = uuid.v4().replace(/\-/g, '');
  data.image_url = getGravatarUrl(data.email);
  data.password = await bcrypt.hash(data.password, SALT_ITERATIONS);

  return client.user.create({ data });
}

export async function loginUser(data) {
  const user = await client.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    return null;
  }

  const passwordsMatch = await bcrypt.compare(data.password, user.password);
  return passwordsMatch ? user : null;
}

export async function getUser(uid) {
  return client.user.findFirst({ where: { uid } });
}

export async function createCredential(authenticatorData, user) {
  const data = {
    id: base64url(authenticatorData.get('credId')),
    public_key: authenticatorData.get('credentialPublicKeyPem'),
    counter: authenticatorData.get('counter'),
    fmt: authenticatorData.get('fmt'),
    user_id: user.id,
  };
  return client.credential.create({ data });
}

export async function getCredentials(user) {
  return client.credential.findMany({
    where: {
      user_id: user.id,
    },
  });
}

export async function getCredential(id) {
  return client.credential.findFirst({
    where: {
      id,
    },
  });
}

export async function setCredentialCounter(credential, counter) {
  return client.credential.update({
    where: {
      id: credential.id,
    },
    data: {
      counter,
    },
  });
}
