require('dotenv').config();
const db = require('../src/config/db');

async function seed() {
  await db('news').del();

  // ── 新闻中心 ──
  const news = [
    {
      title_zh: '森昊携手巴西食品协会签署战略合作协议',
      title_en: 'SenHao Signs Strategic Cooperation Agreement with Brazilian Food Association',
      summary_zh: '近日，森昊与巴西食品协会正式签署战略合作协议，双方将在展会组织、企业对接、市场拓展等方面展开深度合作。',
      summary_en: 'SenHao and the Brazilian Food Association have signed a strategic cooperation agreement to collaborate on exhibition organization and market expansion.',
      content_zh: '<p>2026年3月，森昊展览（广州）有限公司与巴西食品协会（ABIA）在圣保罗正式签署战略合作协议。</p><p>根据协议，双方将在以下领域展开合作：</p><ul><li>联合组织中国企业参加巴西及南美地区食品展会</li><li>协助巴西优质食品企业进入中国市场</li><li>定期举办中巴食品行业线上及线下交流活动</li><li>共享行业数据与市场研究报告</li></ul><p>这一合作将为中国食品企业开拓南美市场提供更加便捷的渠道和专业的服务支持。</p>',
      content_en: '<p>In March 2026, SenHao and ABIA officially signed a strategic cooperation agreement in São Paulo.</p><p>The partnership covers joint exhibition organization, market entry support for Brazilian food companies into China, regular exchange events, and sharing of industry data and market research.</p>',
      cover_image: 'https://picsum.photos/seed/news-brazil/800/450',
      published_at: '2026-03-20 10:00:00', is_active: 1
    },
    {
      title_zh: '2026马来西亚国际食品展MIFB展位预订量突破预期',
      title_en: 'MIFB 2026 Booth Bookings Exceed Expectations',
      summary_zh: '2026年马来西亚国际食品及饮料展展位预订情况火热，目前已有超过80%的展位被预订，中国展区面积同比增长35%。',
      summary_en: 'Over 80% of booths for MIFB 2026 have been booked, with the China pavilion area growing 35% year-on-year.',
      content_zh: '<p>据马来西亚国际食品及饮料展（MIFB）组委会最新数据显示，2026年展会招展工作进展顺利，展位预订率已突破80%。</p><p>中国展区表现尤为亮眼，预订面积较2025年增长35%，反映出中国食品企业对东南亚市场的强烈信心。新增的展商主要集中在休闲食品、饮料、调味品和预制菜等领域。</p><p>森昊作为MIFB在中国的官方代理，目前仍有少量优质展位可供选择。有意向参展的企业请尽快联系我们的展会顾问。</p>',
      content_en: '<p>MIFB 2026 booth booking has exceeded 80%, with the China pavilion area up 35% vs 2025.</p><p>New exhibitors are concentrated in snack foods, beverages, condiments, and pre-made meals. SenHao, as the official agent for MIFB in China, still has limited premium booths available.</p>',
      cover_image: 'https://picsum.photos/seed/news-mifb/800/450',
      published_at: '2026-04-02 14:30:00', is_active: 1
    },
    {
      title_zh: '广交会期间森昊举办多场国际供需对接会',
      title_en: 'SenHao Hosts Multiple International Matchmaking Events During Canton Fair',
      summary_zh: '借第137届广交会之机，森昊将组织多场专题供需对接会，为参展企业与国际买家搭建精准对接平台。',
      summary_en: 'During the 137th Canton Fair, SenHao will organize multiple matchmaking sessions connecting exhibitors with international buyers.',
      content_zh: '<p>第137届广交会期间，森昊将在广州举办三场国际供需对接会，分别聚焦：</p><ul><li>食品及农产品专场（4月18日）</li><li>家居用品及礼品专场（4月25日）</li><li>五金及建材专场（5月4日）</li></ul><p>每场活动将邀请来自欧洲、中东、东南亚等地区的50余名优质采购商参与，为企业提供一对一洽谈机会。活动免费向广交会参展企业开放，名额有限，先到先得。</p>',
      content_en: '<p>Three matchmaking sessions will be held during the Canton Fair, focusing on food & agricultural products, home & gifts, and hardware & building materials.</p><p>Each session will bring 50+ quality buyers from Europe, the Middle East, and SE Asia for one-on-one meetings.</p>',
      cover_image: 'https://picsum.photos/seed/news-canton/800/450',
      published_at: '2026-04-08 09:00:00', is_active: 1
    },
    {
      title_zh: '森昊荣获"年度最佳海外展览服务机构"称号',
      title_en: 'SenHao Named "Best Overseas Exhibition Service Agency of the Year"',
      summary_zh: '中国展览行业协会授予森昊"年度最佳海外展览服务机构"称号，表彰其在推动中国企业出海参展方面的突出贡献。',
      summary_en: 'The China Exhibition Industry Association has named SenHao "Best Overseas Exhibition Service Agency of the Year" for its contributions to helping Chinese companies exhibit globally.',
      content_zh: '<p>在2026年中国展览行业年度评选活动中，森昊展览（广州）有限公司荣获"年度最佳海外展览服务机构"称号。</p><p>该奖项旨在表彰在海外展览服务领域表现卓越的机构。组委会表示，森昊凭借超过20年的行业经验、专业的服务团队，以及覆盖全球50余个国家和地区的展会资源网络，在众多候选机构中脱颖而出。</p>',
      content_en: '<p>SenHao was named "Best Overseas Exhibition Service Agency of the Year" at the 2026 China Exhibition Industry Annual Awards. The award recognizes the company\'s 20+ years of experience and its network covering 50+ countries.</p>',
      cover_image: 'https://picsum.photos/seed/news-award/800/450',
      published_at: '2026-04-15 16:00:00', is_active: 1
    },
    {
      title_zh: '2026中国国际进口博览会招展工作正式启动',
      title_en: 'Exhibitor Recruitment for CIIE 2026 Officially Launched',
      summary_zh: '2026中国国际进口博览会招展工作已全面启动，森昊作为官方指定招展代理，将为参展企业提供全程服务。',
      summary_en: 'Exhibitor recruitment for CIIE 2026 has officially launched. SenHao, as an officially designated recruitment agent, will provide full-service support.',
      content_zh: '<p>中国国际进口博览局宣布，2026年第八届进博会将于11月5日至10日在上海国家会展中心举办，展览面积预计超过36万平方米。</p><p>森昊作为进博会官方指定招展代理，可协助海外企业完成展位申请、展品运输、人员签证等全流程服务。</p>',
      content_en: '<p>The 8th CIIE will be held from November 5-10, 2026 at the National Exhibition Center in Shanghai, with an exhibition area expected to exceed 360,000 sqm. SenHao is an officially designated agent.</p>',
      cover_image: 'https://picsum.photos/seed/news-ciie/800/450',
      published_at: '2026-05-25 11:00:00', is_active: 1
    },
    {
      title_zh: '展会物流新政策解读：2026年ATA单证册电子化全面推行',
      title_en: 'New Exhibition Logistics Policy: Full Electronic ATA Carnet Implementation in 2026',
      summary_zh: '国际商会宣布2026年起全面推行ATA单证册电子化，将大幅简化展品临时进出口手续，为出国参展企业降本增效。',
      summary_en: 'The ICC announced full electronic ATA Carnet implementation from 2026, significantly simplifying temporary import/export procedures for exhibition goods.',
      content_zh: '<p>国际商会（ICC）宣布，自2026年起全面推行ATA单证册电子化系统。ATA单证册是国际通用的货物临时进出口通关文件，被业界称为"货物护照"。</p><p>电子化实施后，参展企业可通过在线系统完成单证册申领、海关核销等全部流程，预计通关效率提升60%以上，综合成本降低30%。</p>',
      content_en: '<p>The ICC announced full electronic ATA Carnet implementation from 2026. The ATA Carnet is an international customs document known as the "passport for goods." The electronic system will improve customs clearance efficiency by 60%+ and reduce costs by 30%.</p>',
      cover_image: 'https://picsum.photos/seed/news-ata/800/450',
      published_at: '2026-05-30 08:30:00', is_active: 1
    }
  ];

  await db('news').insert(news);

  console.log(`${news.length} news articles inserted`);
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
