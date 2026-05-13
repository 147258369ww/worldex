// worldex-server/src/controllers/users.js
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { success, fail } = require('../utils/response');

async function getAll(req, res) {
  const rows = await db('users')
    .select('id', 'username', 'role', 'created_at')
    .orderBy('created_at', 'desc');
  return success(res, rows);
}

async function create(req, res) {
  const { username, password, role } = req.body;
  if (!username || !password) return fail(res, 'Username and password required');
  const existing = await db('users').where({ username }).first();
  if (existing) return fail(res, 'Username already exists');
  const password_hash = await bcrypt.hash(password, 10);
  const [id] = await db('users').insert({
    username,
    password_hash,
    role: role || 'editor'
  });
  return success(res, { id });
}

async function update(req, res) {
  const { username, password, role } = req.body;
  const data = { role };
  if (username) data.username = username;
  if (password) data.password_hash = await bcrypt.hash(password, 10);
  await db('users').where({ id: req.params.id }).update(data);
  return success(res);
}

async function remove(req, res) {
  const user = await db('users').where({ id: req.params.id }).first();
  if (user.role === 'admin') {
    const adminCount = await db('users').where({ role: 'admin' }).count('id as count').first();
    if (adminCount.count <= 1) return fail(res, 'Cannot delete the last admin');
  }
  await db('users').where({ id: req.params.id }).del();
  return success(res);
}

module.exports = { getAll, create, update, remove };
