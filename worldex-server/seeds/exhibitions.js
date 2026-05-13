require('dotenv').config();
const db = require('../src/config/db');

async function seed() {
  await db('exhibitions').del();

  const exhibitions = [
    // ── 海外展览 ──
    {
      type: 'overseas',
      name_zh: '2026第36届巴西里约热内卢食品及商超展SER',
      name_en: 'The 36th SER Food & Supermarket Expo 2026',
      date_from: '2026-03-17', date_to: '2026-03-19',
      city_zh: '里约热内卢', city_en: 'Rio de Janeiro',
      country_zh: '巴西', country_en: 'Brazil',
      venue_zh: 'Riocentro里约展览中心', venue_en: 'Riocentro Exhibition Center',
      image: 'https://picsum.photos/seed/brazil2026/800/500',
      intro_zh: '南美洲最大的食品和商超行业展览会之一，汇聚全球优质供应商和采购商。',
      intro_en: 'One of the largest food and supermarket trade fairs in South America.',
      sort_order: 1, is_active: 1
    },
    {
      type: 'overseas',
      name_zh: '2026马来西亚国际食品及饮料展MIFB',
      name_en: 'Malaysia International Food & Beverage Fair 2026',
      date_from: '2026-06-10', date_to: '2026-06-12',
      city_zh: '吉隆坡', city_en: 'Kuala Lumpur',
      country_zh: '马来西亚', country_en: 'Malaysia',
      venue_zh: 'KLCC吉隆坡会议中心', venue_en: 'KLCC Convention Centre',
      image: 'https://picsum.photos/seed/malaysia2026/800/500',
      intro_zh: '东盟地区最具影响力的食品饮料行业专业展会。',
      intro_en: 'The most influential food and beverage trade show in the ASEAN region.',
      sort_order: 2, is_active: 1
    },
    {
      type: 'overseas',
      name_zh: '2026印尼国际食品及加工包装展IIFB',
      name_en: 'Indonesia International Food & Beverage Expo 2026',
      date_from: '2026-05-20', date_to: '2026-05-22',
      city_zh: '雅加达', city_en: 'Jakarta',
      country_zh: '印度尼西亚', country_en: 'Indonesia',
      venue_zh: 'JIExpo雅加达国际展览中心', venue_en: 'JIExpo Jakarta',
      image: 'https://picsum.photos/seed/indonesia2026/800/500',
      intro_zh: '印尼及东南亚地区食品加工与包装领域的旗舰展会。',
      intro_en: 'Flagship exhibition for food processing and packaging in Indonesia and SE Asia.',
      sort_order: 3, is_active: 1
    },
    {
      type: 'overseas',
      name_zh: '2026第30届俄罗斯莫斯科国际食品展WorldFood Moscow',
      name_en: 'WorldFood Moscow 2026 – 30th Edition',
      date_from: '2026-09-15', date_to: '2026-09-18',
      city_zh: '莫斯科', city_en: 'Moscow',
      country_zh: '俄罗斯', country_en: 'Russia',
      venue_zh: 'Crocus Expo国际展览中心', venue_en: 'Crocus Expo IEC',
      image: 'https://picsum.photos/seed/russia2026/800/500',
      intro_zh: '俄罗斯及独联体国家规模最大的综合性食品展览会。',
      intro_en: 'The largest comprehensive food exhibition in Russia and the CIS countries.',
      sort_order: 4, is_active: 1
    },
    {
      type: 'overseas',
      name_zh: '2026泰国国际食品展THAIFEX-Anuga Asia',
      name_en: 'THAIFEX-Anuga Asia 2026',
      date_from: '2026-05-27', date_to: '2026-05-31',
      city_zh: '曼谷', city_en: 'Bangkok',
      country_zh: '泰国', country_en: 'Thailand',
      venue_zh: 'IMPACT会展中心', venue_en: 'IMPACT Exhibition Center',
      image: 'https://picsum.photos/seed/thailand2026/800/500',
      intro_zh: '亚太地区规模最大、最具影响力的食品饮料行业盛会。',
      intro_en: 'The largest and most influential F&B trade event in the Asia-Pacific region.',
      sort_order: 5, is_active: 1
    },
    {
      type: 'overseas',
      name_zh: '2026中东迪拜国际食品展Gulfood',
      name_en: 'Gulfood 2026 – Dubai World Trade Centre',
      date_from: '2026-02-16', date_to: '2026-02-20',
      city_zh: '迪拜', city_en: 'Dubai',
      country_zh: '阿联酋', country_en: 'UAE',
      venue_zh: '迪拜世界贸易中心', venue_en: 'Dubai World Trade Centre',
      image: 'https://picsum.photos/seed/dubai2026/800/500',
      intro_zh: '全球最大的年度食品和饮料贸易展览会之一。',
      intro_en: 'One of the world\'s largest annual food and beverage trade exhibitions.',
      sort_order: 6, is_active: 1
    },

    // ── 国内展览 ──
    {
      type: 'domestic',
      name_zh: '2026第137届中国进出口商品交易会（广交会）',
      name_en: 'The 137th Canton Fair 2026',
      date_from: '2026-04-15', date_to: '2026-05-05',
      city_zh: '广州', city_en: 'Guangzhou',
      country_zh: '中国', country_en: 'China',
      venue_zh: '广交会展馆', venue_en: 'Canton Fair Complex',
      image: 'https://picsum.photos/seed/canton2026/800/500',
      intro_zh: '中国规模最大、历史最悠久的综合性国际贸易盛会。',
      intro_en: 'China\'s largest and oldest comprehensive international trade fair.',
      sort_order: 1, is_active: 1
    },
    {
      type: 'domestic',
      name_zh: '2026中国国际食品和饮料展览会SIAL China',
      name_en: 'SIAL China 2026',
      date_from: '2026-05-18', date_to: '2026-05-20',
      city_zh: '上海', city_en: 'Shanghai',
      country_zh: '中国', country_en: 'China',
      venue_zh: '上海新国际博览中心', venue_en: 'Shanghai New International Expo Centre',
      image: 'https://picsum.photos/seed/sial2026/800/500',
      intro_zh: '亚洲最大的食品饮料展览会，汇聚全球优质食品品牌。',
      intro_en: 'Asia\'s largest food and beverage exhibition, gathering global food brands.',
      sort_order: 2, is_active: 1
    },
    {
      type: 'domestic',
      name_zh: '2026中国国际渔业博览会',
      name_en: 'China Fisheries & Seafood Expo 2026',
      date_from: '2026-10-28', date_to: '2026-10-30',
      city_zh: '青岛', city_en: 'Qingdao',
      country_zh: '中国', country_en: 'China',
      venue_zh: '红岛国际会议展览中心', venue_en: 'Hongdao International Convention Center',
      image: 'https://picsum.photos/seed/fisheries2026/800/500',
      intro_zh: '全球最大的水产贸易展会之一，汇聚全球渔业企业。',
      intro_en: 'One of the world\'s largest seafood trade shows.',
      sort_order: 3, is_active: 1
    },
    {
      type: 'domestic',
      name_zh: '2026中国国际进口博览会（进博会）',
      name_en: 'China International Import Expo 2026 (CIIE)',
      date_from: '2026-11-05', date_to: '2026-11-10',
      city_zh: '上海', city_en: 'Shanghai',
      country_zh: '中国', country_en: 'China',
      venue_zh: '国家会展中心（上海）', venue_en: 'National Exhibition Center (Shanghai)',
      image: 'https://picsum.photos/seed/ciie2026/800/500',
      intro_zh: '全球首个以进口为主题的国家级博览会。',
      intro_en: 'The world\'s first national-level expo themed on import.',
      sort_order: 4, is_active: 1
    },
    {
      type: 'domestic',
      name_zh: '2026亚洲果蔬博览会',
      name_en: 'Asia Fruit Logistica 2026',
      date_from: '2026-09-02', date_to: '2026-09-04',
      city_zh: '深圳', city_en: 'Shenzhen',
      country_zh: '中国', country_en: 'China',
      venue_zh: '深圳会展中心', venue_en: 'Shenzhen Convention Center',
      image: 'https://picsum.photos/seed/fruit2026/800/500',
      intro_zh: '亚洲领先的新鲜果蔬行业国际贸易展览会。',
      intro_en: 'Asia\'s leading international trade fair for the fresh fruit and vegetable industry.',
      sort_order: 5, is_active: 1
    },
    {
      type: 'domestic',
      name_zh: '2026中国国际包装展Sino-Pack',
      name_en: 'Sino-Pack 2026 – China International Packaging Exhibition',
      date_from: '2026-03-04', date_to: '2026-03-06',
      city_zh: '广州', city_en: 'Guangzhou',
      country_zh: '中国', country_en: 'China',
      venue_zh: '广交会展馆B区', venue_en: 'Canton Fair Complex Area B',
      image: 'https://picsum.photos/seed/sinopack2026/800/500',
      intro_zh: '华南地区最具规模的包装行业专业展会。',
      intro_en: 'The largest packaging industry exhibition in South China.',
      sort_order: 6, is_active: 1
    },
    {
      type: 'domestic',
      name_zh: '2026中国（深圳）跨境电商展览会',
      name_en: 'CCBEC 2026 – China (Shenzhen) Cross-border E-commerce Expo',
      date_from: '2026-02-17', date_to: '2026-02-19',
      city_zh: '深圳', city_en: 'Shenzhen',
      country_zh: '中国', country_en: 'China',
      venue_zh: '深圳国际会展中心', venue_en: 'Shenzhen World Exhibition Center',
      image: 'https://picsum.photos/seed/ccbec2026/800/500',
      intro_zh: '国内最具影响力的跨境电商行业展会之一。',
      intro_en: 'One of China\'s most influential cross-border e-commerce trade fairs.',
      sort_order: 7, is_active: 1
    }
  ];

  await db('exhibitions').insert(exhibitions);
  console.log(`${exhibitions.length} exhibitions inserted`);
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
