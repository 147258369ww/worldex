<template>
  <div class="exhibition-page">
    <NavBar />
    <div class="page-banner">
      <div class="container">
        <h1>{{ langStore.t('exhibition.title_domestic') }}</h1>
        <p class="hero-subtitle">{{ langStore.t('exhibition.subtitle_domestic') }}</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div v-if="list.length === 0" class="no-data">{{ langStore.t('exhibition.no_data') }}</div>
        <div class="exhibition-grid">
          <router-link
            v-for="(item, idx) in list"
            :key="item.id"
            :to="`/exhibition/${item.id}`"
            class="exhibition-card"
            :style="{ animationDelay: idx * 80 + 'ms' }"
          >
            <div class="card-img-wrap">
              <img :src="item.image || '/placeholder.jpg'" :alt="item.name_zh" class="card-img" />
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ langStore.currentLocale === 'zh' ? item.name_zh : item.name_en }}</h3>
              <p class="card-meta">{{ formatDateRange(item.date_from, item.date_to) }} | {{ langStore.currentLocale === 'zh' ? item.city_zh : item.city_en }}, {{ langStore.currentLocale === 'zh' ? item.country_zh : item.country_en }}</p>
              <p class="card-pubdate">{{ formatPubDate(item.created_at) }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLangStore } from '@/stores/lang'
import { getExhibitions } from '@/api/exhibitions'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

const langStore = useLangStore()
const list = ref([])

const formatDate = (d) => {
  if (!d) return ''
  const dt = new Date(d)
  const y = dt.getFullYear()
  const m = String(dt.getMonth() + 1).padStart(2, '0')
  const day = String(dt.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

const formatDateRange = (from, to) => {
  if (!from && !to) return ''
  if (!to) return formatDate(from)
  const f = new Date(from)
  const t = new Date(to)
  if (f.getFullYear() === t.getFullYear() && f.getMonth() === t.getMonth()) {
    return `${f.getFullYear()}.${String(f.getMonth() + 1).padStart(2, '0')}.${String(f.getDate()).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
  }
  return `${formatDate(from)}-${formatDate(to)}`
}

const formatPubDate = (d) => {
  if (!d) return ''
  const dt = new Date(d)
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`
}

onMounted(async () => {
  try {
    const res = await getExhibitions({ type: 'domestic', limit: 50 })
    if (res.code === 0) list.value = res.data.list
  } catch (e) {}
})
</script>

<style scoped>
.no-data { text-align: center; color: var(--color-text-muted); padding: 40px 0; }

.exhibition-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2%;
}

.exhibition-card {
  background: var(--color-white);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  animation: fadeSlideIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.exhibition-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.card-img-wrap {
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.exhibition-card:hover .card-img {
  transform: scale(1.04);
}

.card-body {
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.card-title {
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: normal;
  line-height: 1.4;
  color: var(--color-text);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  font-family: var(--font-heading);
  font-size: 14px;
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-pubdate {
  font-size: 12px;
  color: var(--color-text-muted);
  margin: 0;
  margin-top: auto;
  padding-top: 4px;
  position: relative;
}

.card-pubdate::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #f2f2f2;
  transition: background 0.3s;
}

.exhibition-card:hover .card-pubdate::before {
  background: var(--color-accent-content);
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 900px) {
  .exhibition-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .exhibition-grid { grid-template-columns: 1fr; }
}
</style>
