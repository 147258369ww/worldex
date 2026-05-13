<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-col">
        <h3>SenHao</h3>
        <p>{{ info?.address_zh || '广州市' }}</p>
        <p>{{ info?.phone || '020-83276765' }}</p>
        <p>{{ info?.email || 'senhaoexpo@foxmail.com' }}</p>
      </div>
      <div class="footer-col">
        <h4>{{ langStore.t('nav.overseas') }}</h4>
        <router-link to="/overseas">{{ langStore.t('nav.overseas') }}</router-link>
        <router-link to="/domestic">{{ langStore.t('nav.domestic') }}</router-link>

      </div>
      <div class="footer-col">
        <h4>{{ langStore.t('nav.news') }}</h4>
        <router-link to="/news">{{ langStore.t('nav.news') }}</router-link>
        <router-link to="/contact">{{ langStore.t('nav.contact') }}</router-link>
      </div>
    </div>
    <div class="footer-bottom">
      <p>{{ langStore.t('footer.copyright') }}</p>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLangStore } from '@/stores/lang'
import { getCompanyInfo } from '@/api/company'

const langStore = useLangStore()
const info = ref(null)

onMounted(async () => {
  try {
    const res = await getCompanyInfo()
    if (res.code === 0) info.value = res.data
  } catch (e) {}
})
</script>

<style scoped>
.footer { background: var(--color-primary); color: rgba(255,255,255,0.8); padding: 60px 0 0; margin-top: auto; }
.footer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
.footer-col h3 { color: var(--color-accent); font-size: 1.3rem; margin-bottom: 12px; }
.footer-col h4 { color: var(--color-white); margin-bottom: 12px; }
.footer-col p { margin-bottom: 6px; font-size: 0.9rem; }
.footer-col a { display: block; margin-bottom: 8px; font-size: 0.9rem; transition: color 0.2s; }
.footer-col a:hover { color: var(--color-accent); }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); margin-top: 40px; padding: 20px 0; text-align: center; font-size: 0.85rem; }
@media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr; text-align: center; } }
</style>
