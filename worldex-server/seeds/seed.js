require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../src/config/db');

async function seed() {
  const hash = await bcrypt.hash('admin123', 10);
  await db('users').insert({ username: 'admin', password_hash: hash, role: 'admin' }).onConflict('username').ignore();

  await db('company_info').where({ id: 1 }).update({
    about_zh: '广州森昊展览有限公司成立于2003年，是国内最早从事海外主办展览业务的展览公司。',
    about_en: 'Guangzhou SenHao Exhibition Co., Ltd. was established in 2003 and is one of the earliest exhibition companies in China to engage in overseas exhibition hosting business.',
    address_zh: '广州市天河区',
    address_en: 'Tianhe District, Guangzhou, China',
    phone: '020-83276765',
    email: 'senhaoexpo@foxmail.com'
  });

  await db('banners').insert([
    { title_zh: '海外展览', title_en: 'Overseas Exhibitions', image: '/uploads/placeholder.jpg', sort_order: 0 },
    { title_zh: '国内展览', title_en: 'Domestic Exhibitions', image: '/uploads/placeholder.jpg', sort_order: 1 }
  ]);

  await db('news').insert({
    title_zh: '欢迎访问森昊', title_en: 'Welcome to SenHao',
    summary_zh: '全新官网正式上线', summary_en: 'Our new website is now live',
    content_zh: '<p>感谢您的访问。</p>', content_en: '<p>Thank you for visiting.</p>',
    published_at: new Date(), is_active: 1
  });

  console.log('Seed data inserted');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
