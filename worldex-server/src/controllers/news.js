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
  try {
    const { page = 1, limit = 20 } = req.query;
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);
    const query = db('news');
    const total = await query.clone().count('id as count').first();
    const rows = await query
      .orderBy('created_at', 'desc')
      .limit(limitNum)
      .offset((pageNum - 1) * limitNum);
    return success(res, {
      list: rows,
      total: total.count,
      page: pageNum,
      limit: limitNum
    });
  } catch (e) {
    console.error('Failed to load admin news:', e);
    return fail(res, '新闻列表加载失败，请检查服务器日志');
  }
}

async function create(req, res) {
  const data = { ...req.body };
  delete data.id;
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
  try {
    await db('news').where({ id: req.params.id }).update(data);
    return success(res);
  } catch (e) {
    if (e.code === 'ER_TRUNCATED_WRONG_VALUE') {
      return fail(res, '日期时间格式错误，请检查发布日期字段');
    }
    return fail(res, e.message);
  }
}

async function remove(req, res) {
  await db('news').where({ id: req.params.id }).del();
  return success(res);
}

module.exports = { getPublic, getOne, getAll, create, update, remove };
