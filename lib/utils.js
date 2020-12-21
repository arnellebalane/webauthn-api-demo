import 'dotenv/config';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export function hashMD5(input) {
  return crypto.createHash('md5').update(input).digest('hex');
}

export function getGravatarUrl(email) {
  email = email.trim().toLowerCase();
  return `https://gravatar.com/avatar/${hashMD5(email)}`;
}

export function generateToken(payload) {
  return jwt.sign(payload, process.env.SECRET, {
    expiresIn: '1d',
  });
}

export function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}
