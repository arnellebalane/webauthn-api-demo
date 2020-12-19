import crypto from 'crypto';

export function hashMD5(input) {
  return crypto.createHash('md5').update(input).digest('hex');
}

export function getGravatarUrl(email) {
  email = email.trim().toLowerCase();
  return `https://gravatar.com/avatar/${hashMD5(email)}`;
}
