// worldex-server/src/controllers/upload.js
const { success } = require('../utils/response');

async function uploadFile(req, res) {
  if (!req.file) {
    return res.json({ code: 1, message: 'No file uploaded' });
  }
  const url = '/uploads/' + req.file.filename;
  return success(res, { url });
}

module.exports = { uploadFile };
