import 'dotenv/config';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { UNAUTHORIZED_ERROR } from './errors';

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

export function verifyToken(payload) {
  try {
    return jwt.verify(payload, process.env.SECRET);
  } catch (error) {
    throw new Error(UNAUTHORIZED_ERROR);
  }
}

export function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}
