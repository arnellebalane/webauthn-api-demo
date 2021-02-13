import * as uuid from 'uuid';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { getGravatarUrl } from '@/lib/utils';

const client = new PrismaClient();

const SALT_ITERATIONS = 10;

export async function registerUser(data) {
  data.uid = uuid.v4().replace(/\-/g, '');
  data.image_url = getGravatarUrl(data.email);
  data.password = await bcrypt.hash(data.password, SALT_ITERATIONS);

  return client.user.create({ data });
}

export async function loginUser(data) {
  const user = await client.user.findFirst({ where: { email: data.email } });
  if (!user) {
    return null;
  }

  const passwordsMatch = await bcrypt.compare(data.password, user.password);
  return passwordsMatch ? user : null;
}

export async function getUser(uid) {
  return client.user.findFirst({ where: { uid } });
}
