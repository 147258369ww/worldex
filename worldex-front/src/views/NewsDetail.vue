<template>
  <div class="news-detail-page">
    <NavBar />
    <div class="page-banner"><h1>{{ article?.title_zh || '' }}</h1></div>
    <section class="section">
      <div class="container news-detail-content">
        <router-link to="/news" class="back-link">← {{ langStore.t('news.back') }}</router-link>
        <div v-if="article" class="article">
          <p class="article-date">{{ formatDate(article.published_at) }}</p>
          <img v-if="article.cover_image" :src="article.cover_image" :alt="article.title_zh" class="article-cover" />
          <div class="article-body" v-html="langStore.currentLocale === 'zh' ? article.content_zh : article.content_en"></div>
          <div v-if="gallery.length" class="article-gallery">
            <h4>图片</h4>
            <div class="gallery-grid">
              <img v-for="(img, i) in gallery" :key="i" :src="img" @click="lightbox = img" class="gallery-img" />
            </div>
          </div>
        </div>
        <div v-else class="loading">Loading...</div>
      </div>
    </section>
    <div v-if="lightbox" class="lightbox" @click="lightbox = null">
      <img :src="lightbox" />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLangStore } from '@/stores/lang'
import { getNewsDetail } from '@/api/news'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()
const langStore = useLangStore()
const article = ref(null)
const lightbox = ref(null)

const gallery = computed(() => {
  if (!article.value?.images) return []
  try {
    const imgs = typeof article.value.images === 'string' ? JSON.parse(article.value.images) : article.value.images
    return Array.isArray(imgs) ? imgs : []
  } catch { return [] }
})

onMounted(async () => {
  try {
    const res = await getNewsDetail(route.params.id)
    if (res.code === 0) article.value = res.data
  } catch (e) {}
})

function formatDate(d) { return d ? new Date(d).toLocaleDateString(langStore.currentLocale === 'zh' ? 'zh-CN' : 'en-US') : '' }
</script>

<style scoped>
.back-link { display: inline-block; margin-bottom: 24px; color: var(--color-accent); font-weight: 600; }
.article-date { color: var(--color-text-light); margin-bottom: 20px; }
.article-cover { width: 100%; max-height: 450px; object-fit: cover; border-radius: var(--radius); margin-bottom: 24px; }
.article-body { line-height: 1.8; margin-bottom: 30px; white-space: break-spaces; }
.article-gallery { margin-top: 30px; }
.article-gallery h4 { margin-bottom: 12px; color: var(--color-primary); }
.gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
.gallery-img { width: 100%; height: 150px; object-fit: cover; border-radius: var(--radius); cursor: pointer; transition: transform 0.2s; }
.gallery-img:hover { transform: scale(1.05); }
.lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; z-index: 2000; cursor: pointer; }
.lightbox img { max-width: 90vw; max-height: 90vh; border-radius: var(--radius); }
</style>
