<template>
  <div class="contact-page">
    <NavBar />
    <div class="page-banner"><h1>{{ langStore.t('contact.title') }}</h1></div>
    <section class="section">
      <div class="container contact-grid">
        <div class="contact-info">
          <h2>{{ langStore.currentLocale === 'zh' ? (companyInfo?.about_zh || '广州森昊展览有限公司') : (companyInfo?.about_en || 'Guangzhou Senhao Exhibition Co., Ltd.') }}</h2>
          <div class="info-item">
            <span class="info-label">电话</span>
            <span>{{ companyInfo?.phone || '17666711277' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">邮箱</span>
            <span>{{ companyInfo?.email || 'senhaoexpo@foxmail.com' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">地址</span>
            <span>{{ companyInfo?.address_zh || '广州市天河区棠东东路13号2层' }}</span>
          </div>
        </div>
        <div class="contact-image">
          <img src="@/assets/contact-map.jpg" alt="SenHao" />
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
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

const langStore = useLangStore()
const companyInfo = ref(null)

onMounted(async () => {
  try {
    const r = await getCompanyInfo()
    if (r.code === 0) companyInfo.value = r.data
  } catch (e) {}
})
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.contact-info h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 32px;
}

.info-item {
  display: flex;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #e8ecf1;
  font-size: 0.95rem;
  color: var(--color-text);
}

.info-label {
  font-weight: 600;
  color: var(--color-primary);
  min-width: 50px;
  flex-shrink: 0;
}

.contact-image img {
  width: 100%;
  border-radius: var(--radius);
}

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; gap: 40px; }
}
</style>
