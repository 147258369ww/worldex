<template>
  <div class="exhibition-detail-page">
    <NavBar />
    <div class="page-banner"><h1>{{ langStore.currentLocale === 'zh' ? exhibition?.name_zh : exhibition?.name_en || '' }}</h1></div>
    <section class="section">
      <div class="container detail-content">
        <router-link to="/overseas" class="back-link" v-if="exhibition?.type === 'overseas'">← {{ langStore.t('exhibition.back') }}</router-link>
        <router-link to="/domestic" class="back-link" v-else>← {{ langStore.t('exhibition.back') }}</router-link>
        <div v-if="exhibition" class="detail">
          <img v-if="exhibition.image" :src="exhibition.image" :alt="exhibition.name_zh" class="detail-cover" />
          <div class="detail-info">
            <div class="detail-row">
              <span class="detail-label">{{ langStore.t('exhibition.filter_date') }}</span>
              <span>{{ formatDateRange(exhibition.date_from, exhibition.date_to) }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">{{ langStore.t('exhibition.filter_city') }}</span>
              <span>{{ langStore.currentLocale === 'zh' ? exhibition.city_zh : exhibition.city_en }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">{{ langStore.t('exhibition.filter_country') }}</span>
              <span>{{ langStore.currentLocale === 'zh' ? exhibition.country_zh : exhibition.country_en }}</span>
            </div>
            <div class="detail-row" v-if="langStore.currentLocale === 'zh' ? exhibition.venue_zh : exhibition.venue_en">
              <span class="detail-label">场馆</span>
              <span>{{ langStore.currentLocale === 'zh' ? exhibition.venue_zh : exhibition.venue_en }}</span>
            </div>
          </div>
          <div class="detail-intro" v-if="langStore.currentLocale === 'zh' ? exhibition.intro_zh : exhibition.intro_en">
            <h3>简介</h3>
            <p>{{ langStore.currentLocale === 'zh' ? exhibition.intro_zh : exhibition.intro_en }}</p>
          </div>
        </div>
        <div v-else class="loading">Loading...</div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLangStore } from '@/stores/lang'
import { getExhibition } from '@/api/exhibitions'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()
const langStore = useLangStore()
const exhibition = ref(null)

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

watch(() => route.params.id, async (id) => {
  exhibition.value = null
  try {
    const res = await getExhibition(id)
    if (res.code === 0) exhibition.value = res.data
  } catch (e) {}
}, { immediate: true })
</script>

<style scoped>
.detail-content {
  max-width: 800px;
}

.back-link {
  display: inline-block;
  margin-bottom: 24px;
  color: var(--color-accent);
  font-weight: 600;
}

.detail-cover {
  width: 100%;
  max-height: 450px;
  object-fit: cover;
  border-radius: var(--radius);
  margin-bottom: 24px;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
  padding: 20px;
  background: var(--color-white);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
}

.detail-row {
  display: flex;
  gap: 16px;
  font-size: 0.95rem;
}

.detail-label {
  font-weight: 600;
  color: var(--color-text);
  min-width: 60px;
  flex-shrink: 0;
}

.detail-intro {
  line-height: 1.8;
}

.detail-intro h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 12px;
}

.detail-intro p {
  color: var(--color-text);
  white-space: pre-wrap;
}
</style>
