// worldex-server/src/routes/admin.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const bannersController = require('../controllers/banners');
const exhibitionsController = require('../controllers/exhibitions');
const newsController = require('../controllers/news');
const contactsController = require('../controllers/contacts');
const companyController = require('../controllers/company');
const usersController = require('../controllers/users');
const uploadController = require('../controllers/upload');

// Banners
router.get('/banners', auth, bannersController.getAll);
router.get('/banners/:id', auth, bannersController.getOne);
router.post('/banners', auth, bannersController.create);
router.put('/banners/:id', auth, bannersController.update);
router.delete('/banners/:id', auth, bannersController.remove);

// Exhibitions
router.get('/exhibitions', auth, exhibitionsController.getAll);
router.get('/exhibitions/:id', auth, exhibitionsController.getOne);
router.post('/exhibitions', auth, exhibitionsController.create);
router.put('/exhibitions/:id', auth, exhibitionsController.update);
router.delete('/exhibitions/:id', auth, exhibitionsController.remove);

// News
router.get('/news', auth, newsController.getAll);
router.post('/news', auth, newsController.create);
router.put('/news/:id', auth, newsController.update);
router.delete('/news/:id', auth, newsController.remove);

// Contacts
router.get('/contacts', auth, contactsController.getAll);
router.put('/contacts/:id', auth, contactsController.markRead);

// Company Info
router.get('/company-info', auth, companyController.getAdmin);
router.put('/company-info', auth, companyController.update);

// Users
router.get('/users', auth, usersController.getAll);
router.post('/users', auth, usersController.create);
router.put('/users/:id', auth, usersController.update);
router.delete('/users/:id', auth, usersController.remove);

// Upload
router.post('/upload', auth, (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (!err) return next();
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ code: 1, message: '图片不能超过 20MB' });
    }
    return res.status(400).json({ code: 1, message: err.message || '图片上传失败' });
  });
}, uploadController.uploadFile);

module.exports = router;
