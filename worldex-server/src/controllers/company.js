// worldex-server/src/controllers/company.js
const db = require('../config/db');
const { success } = require('../utils/response');

async function getPublic(req, res) {
  const row = await db('company_info').where({ id: 1 }).first();
  return success(res, row);
}

async function getAdmin(req, res) {
  const row = await db('company_info').where({ id: 1 }).first();
  return success(res, row);
}

async function update(req, res) {
  const { updated_at, created_at, id, ...data } = req.body;
  await db('company_info').where({ id: 1 }).update(data);
  return success(res);
}

module.exports = { getPublic, getAdmin, update };
