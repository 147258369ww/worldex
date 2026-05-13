// worldex-server/src/controllers/exhibitions.js
const db = require('../config/db');
const { success, fail } = require('../utils/response');

async function getPublic(req, res) {
  const { type, page = 1, limit = 12 } = req.query;
  let query = db('exhibitions').where({ is_active: 1 });
  if (type) query = query.where({ type });
  const total = await query.clone().count('id as count').first();
  const rows = await query
    .orderBy('sort_order', 'asc')
    .orderBy('date_from', 'desc')
    .limit(parseInt(limit))
    .offset((parseInt(page) - 1) * parseInt(limit));
  return success(res, {
    list: rows,
    total: total.count,
    page: parseInt(page),
    limit: parseInt(limit)
  });
}

async function getOne(req, res) {
  const row = await db('exhibitions').where({ id: req.params.id }).first();
  if (!row) return fail(res, 'Not found');
  return success(res, row);
}

async function getAll(req, res) {
  const { type, page = 1, limit = 20 } = req.query;
  let query = db('exhibitions');
  if (type) query = query.where({ type });
  const total = await query.clone().count('id as count').first();
  const rows = await query
    .orderBy('sort_order', 'asc')
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

async function create(req, res) {
  const [id] = await db('exhibitions').insert(req.body);
  return success(res, { id });
}

async function update(req, res) {
  await db('exhibitions').where({ id: req.params.id }).update(req.body);
  return success(res);
}

async function remove(req, res) {
  await db('exhibitions').where({ id: req.params.id }).del();
  return success(res);
}

module.exports = { getPublic, getOne, getAll, create, update, remove };
