<template>
  <div class="news-page">
    <NavBar />
    <div class="page-banner">
      <div class="container">
        <div class="breadcrumb">
          <router-link to="/">{{ langStore.t('nav.breadcrumb_home') }}</router-link>
          <span class="sep">&gt;</span>
          <span>{{ langStore.t('news.title') }}</span>
        </div>
        <h1>{{ langStore.t('news.title') }}</h1>
        <p class="hero-subtitle">{{ langStore.t('news.subtitle') }}</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div v-if="newsList.length === 0" class="no-data">{{ langStore.t('news.no_data') }}</div>
        <div class="news-hlist">
          <div v-for="item in newsList" :key="item.id" class="news-hitem" @click="$router.push(`/news/${item.id}`)">
            <span class="news-hdate">{{ formatDate(item.published_at) }}</span>
            <span class="news-htitle">{{ langStore.currentLocale === 'zh' ? item.title_zh : item.title_en }}</span>
            <span class="news-hsummary">{{ langStore.currentLocale === 'zh' ? item.summary_zh : item.summary_en }}</span>
            <span class="news-harrow">→</span>
          </div>
        </div>
        <div class="pagination" v-if="total > limit">
          <button :disabled="page <= 1" @click="page--">←</button>
          <span>{{ page }} / {{ Math.ceil(total / limit) }}</span>
          <button :disabled="page >= Math.ceil(total / limit)" @click="page++">→</button>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useLangStore } from '@/stores/lang'
import { getNews } from '@/api/news'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

const langStore = useLangStore()
const newsList = ref([])
const total = ref(0)
const page = ref(1)
const limit = 10

async function fetch() {
  try {
    const res = await getNews({ page: page.value, limit })
    if (res.code === 0) {
      newsList.value = res.data.list
      total.value = res.data.total
    }
  } catch (e) {}
}

watch(page, fetch)
onMounted(fetch)

function formatDate(d) { return d ? new Date(d).toLocaleDateString(langStore.currentLocale === 'zh' ? 'zh-CN' : 'en-US') : '' }
</script>

<style scoped>
.news-hlist {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-border);
}

.news-hitem {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  transition: background 0.2s;
}

.news-hitem:hover {
  background: rgba(166, 133, 40, 0.04);
}

.news-hdate {
  min-width: 100px;
  font-size: 12px;
  color: var(--color-text-muted);
}

.news-htitle {
  flex: 1;
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: normal;
  color: var(--color-text);
  transition: color 0.2s;
}

.news-hitem:hover .news-htitle {
  color: var(--color-hover-blue);
}

.news-hsummary {
  flex: 2;
  font-family: var(--font-heading);
  font-size: 14px;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 22px;
}

.news-harrow {
  color: var(--color-accent-content);
  font-size: 1.2rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 30px;
}

.pagination button {
  padding: 6px 16px;
  border: 1px solid var(--color-border);
  background: var(--color-white);
  border-radius: var(--radius);
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.no-data {
  text-align: center;
  color: var(--color-text-muted);
  padding: 40px 0;
}

@media (max-width: 768px) {
  .news-hitem { flex-wrap: wrap; gap: 8px; }
  .news-hsummary { display: none; }
}
</style>
