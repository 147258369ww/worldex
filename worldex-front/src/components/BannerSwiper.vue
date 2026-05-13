<template>
  <div class="banner-swiper" v-if="banners.length">
    <div class="banner-track" :style="{ transform: `translateX(-${current * 100}%)` }">
      <div v-for="(banner, i) in banners" :key="i" class="banner-slide" :style="{ backgroundImage: `url(${banner.image})` }">
        <div class="banner-overlay">
          <div class="container">
            <h2>{{ langStore.currentLocale === 'zh' ? banner.title_zh : banner.title_en }}</h2>
            <a v-if="banner.link" :href="banner.link" class="btn btn-primary">{{ langStore.t('home.banner_cta') }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="banner-dots" v-if="banners.length > 1">
      <button v-for="(b, i) in banners" :key="i" :class="{ active: i === current }" @click="current = i"></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useLangStore } from '@/stores/lang'
import { getBanners } from '@/api/banners'

const langStore = useLangStore()
const banners = ref([])
const current = ref(0)

onMounted(async () => {
  try {
    const res = await getBanners()
    if (res.code === 0) banners.value = res.data
  } catch (e) {}
})

let timer
function startAuto() {
  if (banners.value.length <= 1) return
  timer = setInterval(() => {
    current.value = (current.value + 1) % banners.value.length
  }, 5000)
}
function stopAuto() { clearInterval(timer) }

onMounted(() => startAuto())
onUnmounted(() => stopAuto())
</script>

<style scoped>
.banner-swiper { position: relative; height: 80vh; min-height: 500px; overflow: hidden; }
.banner-track { display: flex; height: 100%; transition: transform 0.5s ease-in-out; }
.banner-slide { min-width: 100%; height: 100%; background-size: cover; background-position: center; }
.banner-overlay { width: 100%; height: 100%; background: linear-gradient(to bottom, rgba(10,22,40,0.3), rgba(10,22,40,0.7)); display: flex; align-items: center; }
.banner-overlay h2 { font-size: 2.5rem; color: var(--color-white); max-width: 600px; margin-bottom: 20px; }
.banner-dots { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); display: flex; gap: 10px; }
.banner-dots button { width: 12px; height: 12px; border-radius: 50%; border: 2px solid var(--color-white); background: transparent; cursor: pointer; transition: background 0.2s; }
.banner-dots button.active { background: var(--color-accent); border-color: var(--color-accent); }
@media (max-width: 768px) { .banner-swiper { height: 50vh; min-height: 350px; } .banner-overlay h2 { font-size: 1.5rem; } }
</style>
