// worldex-server/src/controllers/auth.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { success, fail } = require('../utils/response');

async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return fail(res, 'Username and password required');
  }
  const user = await db('users').where({ username }).first();
  if (!user) {
    return fail(res, 'Invalid credentials');
  }
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return fail(res, 'Invalid credentials');
  }
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  return success(res, { token, user: { id: user.id, username: user.username, role: user.role } });
}

module.exports = { login };
