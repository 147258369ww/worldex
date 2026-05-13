// worldex-server/src/routes/public.js
const express = require('express');
const router = express.Router();

const bannersController = require('../controllers/banners');
const exhibitionsController = require('../controllers/exhibitions');
const newsController = require('../controllers/news');
const contactsController = require('../controllers/contacts');
const companyController = require('../controllers/company');
const authController = require('../controllers/auth');

router.get('/banners', bannersController.getPublic);
router.get('/exhibitions', exhibitionsController.getPublic);
router.get('/exhibitions/:id', exhibitionsController.getOne);
router.get('/news', newsController.getPublic);
router.get('/news/:id', newsController.getOne);
router.get('/company-info', companyController.getPublic);
router.post('/contacts', contactsController.submit);
router.post('/auth/login', authController.login);

module.exports = router;
