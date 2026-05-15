<template>
  <div class="home">
    <NavBar />
    <BannerSwiper />
    <section class="section intro-section" v-if="companyInfo && (langStore.currentLocale === 'zh' ? companyInfo.about_zh : companyInfo.about_en)">
      <div class="container">
        <h2 class="section-title">{{ langStore.t('home.intro_title') }}</h2>
        <div class="intro-layout">
          <div class="intro-image">
            <img :src="companyInfo.about_image || fallbackImage" alt="About Us" />
          </div>
          <div class="intro-text" v-html="langStore.currentLocale === 'zh' ? companyInfo.about_zh : companyInfo.about_en"></div>
        </div>
      </div>
    </section>
    <section class="section news-section" style="background: var(--color-white)">
      <div class="container">
        <h2 class="section-title">{{ langStore.t('home.news_title') }}</h2>
        <div class="news-hlist">
          <div v-if="newsList.length === 0" style="text-align:center;color:var(--color-text-light)">{{ langStore.t('news.no_data') }}</div>
          <div v-for="item in newsList" :key="item.id" class="news-hitem" @click="$router.push(`/news/${item.id}`)">
            <span class="news-hdate">{{ formatDate(item.published_at) }}</span>
            <span class="news-htitle">{{ langStore.currentLocale === 'zh' ? item.title_zh : item.title_en }}</span>
            <span class="news-hsummary">{{ langStore.currentLocale === 'zh' ? item.summary_zh : item.summary_en }}</span>
            <span class="news-harrow">→</span>
          </div>
        </div>
        <div style="text-align:center;margin-top:24px">
          <router-link to="/news" class="btn btn-outline">{{ langStore.t('news.read_more') }}</router-link>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLangStore } from '@/stores/lang'
import { getCompanyInfo } from '@/api/company'
import { getNews } from '@/api/news'
import NavBar from '@/components/NavBar.vue'
import BannerSwiper from '@/components/BannerSwiper.vue'
import Footer from '@/components/Footer.vue'
import fallbackImage from '@/assets/hero.png'

const langStore = useLangStore()
const companyInfo = ref(null)
const newsList = ref([])

onMounted(async () => {
  try { const r = await getCompanyInfo(); if (r.code === 0) companyInfo.value = r.data } catch (e) {}
  try { const r = await getNews({ page: 1, limit: 5 }); if (r.code === 0) newsList.value = r.data.list } catch (e) {}
})

function formatDate(d) { return d ? new Date(d).toLocaleDateString(langStore.currentLocale === 'zh' ? 'zh-CN' : 'en-US') : '' }
</script>

<style scoped>
.home { padding-top: 70px; }
.intro-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
}
.intro-image img {
  width: 100%;
  height: 340px;
  object-fit: cover;
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
}
.intro-text {
  color: var(--color-text-light);
  line-height: 1.8;
}

.news-hlist { display: flex; flex-direction: column; gap: 0; border-top: 1px solid #e2e8f0; }
.news-hitem { display: flex; align-items: center; gap: 20px; padding: 16px 0; border-bottom: 1px solid #e2e8f0; cursor: pointer; transition: background 0.2s; }
.news-hitem:hover { background: rgba(201,168,76,0.05); }
.news-hdate { min-width: 100px; font-size: 0.85rem; color: var(--color-text-light); }
.news-htitle { flex: 1; font-weight: 600; color: var(--color-primary); }
.news-hsummary { flex: 2; font-size: 0.9rem; color: var(--color-text-light); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.news-harrow { color: var(--color-accent); font-size: 1.2rem; }

.intro-section, .news-section {
  position: relative;
  overflow: hidden;
}
.intro-section::before {
  content: '';
  position: absolute;
  top: -120px;
  right: -100px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(166, 133, 40, 0.12) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}
.news-section::before {
  content: '';
  position: absolute;
  bottom: -100px;
  right: -80px;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(166, 133, 40, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

@media (max-width: 768px) {
  .intro-layout { grid-template-columns: 1fr; gap: 24px; }
  .intro-image img { height: 220px; }
  .news-hitem { flex-wrap: wrap; gap: 8px; }
  .news-hsummary { display: none; }
}
</style>
