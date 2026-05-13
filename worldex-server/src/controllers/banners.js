// worldex-server/src/controllers/banners.js
const db = require('../config/db');
const { success, fail } = require('../utils/response');

async function getPublic(req, res) {
  const rows = await db('banners').where({ is_active: 1 }).orderBy('sort_order', 'asc');
  return success(res, rows);
}

async function getAll(req, res) {
  const rows = await db('banners').orderBy('sort_order', 'asc');
  return success(res, rows);
}

async function getOne(req, res) {
  const row = await db('banners').where({ id: req.params.id }).first();
  if (!row) return fail(res, 'Not found');
  return success(res, row);
}

async function create(req, res) {
  const { title_zh, title_en, image, link, sort_order, is_active } = req.body;
  const [id] = await db('banners').insert({
    title_zh, title_en, image, link,
    sort_order: sort_order || 0,
    is_active: is_active ?? 1
  });
  return success(res, { id });
}

async function update(req, res) {
  const { title_zh, title_en, image, link, sort_order, is_active } = req.body;
  await db('banners').where({ id: req.params.id }).update({
    title_zh, title_en, image, link, sort_order, is_active
  });
  return success(res);
}

async function remove(req, res) {
  await db('banners').where({ id: req.params.id }).del();
  return success(res);
}

module.exports = { getPublic, getAll, getOne, create, update, remove };
