import * as uuid from 'uuid';
import { PrismaClient } from '@prisma/client';
import { getGravatarUrl, hashSHA256 } from '@/lib/utils';

const client = new PrismaClient();

export async function registerUser(data) {
  data.uid = uuid.v4().replace(/\-/g, '');
  data.image_url = getGravatarUrl(data.email);
  data.password = hashSHA256(data.password);

  return client.user.create({ data });
}

export async function loginUser(data) {
  data.password = hashSHA256(data.password);

  return client.user.findFirst({ where: data });
}