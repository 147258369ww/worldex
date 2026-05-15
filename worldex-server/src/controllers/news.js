// worldex-server/src/controllers/news.js
const db = require('../config/db');
const { success, fail } = require('../utils/response');

async function getPublic(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const query = db('news').where({ is_active: 1 });
  const total = await query.clone().count('id as count').first();
  const rows = await query
    .orderBy('published_at', 'desc')
    .select('id', 'title_zh', 'title_en', 'summary_zh', 'summary_en', 'published_at')
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
  const row = await db('news').where({ id: req.params.id }).first();
  if (!row) return fail(res, 'Not found');
  return success(res, row);
}

async function getAll(req, res) {
  const { page = 1, limit = 20 } = req.query;
  const query = db('news');
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

async function create(req, res) {
  const data = { ...req.body };
  delete data.created_at;
  delete data.updated_at;
  if (data.images && typeof data.images === 'string') {
    data.images = JSON.stringify(JSON.parse(data.images));
  }
  const [id] = await db('news').insert(data);
  return success(res, { id });
}

async function update(req, res) {
  const data = { ...req.body };
  delete data.created_at;
  delete data.updated_at;
  if (data.images && typeof data.images === 'string') {
    data.images = JSON.stringify(JSON.parse(data.images));
  }
  await db('news').where({ id: req.params.id }).update(data);
  return success(res);
}

async function remove(req, res) {
  await db('news').where({ id: req.params.id }).del();
  return success(res);
}

module.exports = { getPublic, getOne, getAll, create, update, remove };
