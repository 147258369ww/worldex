// worldex-server/src/controllers/contacts.js
const db = require('../config/db');
const { success } = require('../utils/response');

async function submit(req, res) {
  const { name, company, position, phone, email, address, message } = req.body;
  if (!name || !company || !phone || !email) {
    return res.json({ code: 1, message: 'Required fields missing' });
  }
  await db('contacts').insert({ name, company, position, phone, email, address, message });
  return success(res, null, 'Submitted successfully');
}

async function getAll(req, res) {
  const { page = 1, limit = 20 } = req.query;
  const query = db('contacts');
  const total = await query.clone().count('id as count').first();
  const rows = await query
    .orderBy('created_at', 'desc')
    .limit(parseInt(limit))
    .offset((parseInt(page) - 1) * parseInt(limit));
  return success(res, {
    list: rows,
    total: total.count,
    page: parseInt(page),
    limit: parseInt(limit)
  });
}

async function markRead(req, res) {
  const { is_read } = req.body;
  await db('contacts').where({ id: req.params.id }).update({ is_read: is_read ? 1 : 0 });
  return success(res);
}

module.exports = { submit, getAll, markRead };
