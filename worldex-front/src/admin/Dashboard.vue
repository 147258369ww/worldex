<template>
  <div class="admin-layout">
    <AdminSidebar />
    <main class="admin-main">
      <h2>{{ langStore.t('admin.dashboard.title') }}</h2>
      <div class="stats-grid">
        <div class="stat-card"><span class="stat-num">{{ stats.exhibitions }}</span><span class="stat-label">{{ langStore.t('admin.dashboard.exhibitions') }}</span></div>
        <div class="stat-card"><span class="stat-num">{{ stats.news }}</span><span class="stat-label">{{ langStore.t('admin.dashboard.news') }}</span></div>
        <div class="stat-card"><span class="stat-num">{{ stats.contacts }}</span><span class="stat-label">{{ langStore.t('admin.dashboard.messages') }}</span></div>
        <div class="stat-card"><span class="stat-num">{{ stats.banners }}</span><span class="stat-label">{{ langStore.t('admin.dashboard.banners') }}</span></div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLangStore } from '@/stores/lang'
import { getAdminExhibitions } from '@/api/exhibitions'
import { getAdminNews } from '@/api/news'
import { getContacts } from '@/api/contacts'
import { getAdminBanners } from '@/api/banners'
import AdminSidebar from '@/components/AdminSidebar.vue'

const langStore = useLangStore()

const stats = ref({ exhibitions: 0, news: 0, contacts: 0, banners: 0 })

onMounted(async () => {
  try { const r = await getAdminExhibitions({ limit: 1 }); stats.value.exhibitions = r.data?.total || 0 } catch {}
  try { const r = await getAdminNews({ limit: 1 }); stats.value.news = r.data?.total || 0 } catch {}
  try { const r = await getContacts({ limit: 1 }); stats.value.contacts = r.data?.total || 0 } catch {}
  try { const r = await getAdminBanners(); stats.value.banners = r.data?.length || 0 } catch {}
})
</script>

<style scoped>
.admin-layout { display: flex; min-height: 100vh; }
.admin-main { flex: 1; margin-left: 220px; padding: 30px; background: var(--color-bg); }
.admin-main h2 { color: var(--color-primary); margin-bottom: 24px; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
.stat-card { background: var(--color-white); padding: 24px; border-radius: var(--radius); box-shadow: var(--shadow-sm); text-align: center; }
.stat-num { display: block; font-size: 2rem; font-weight: 700; color: var(--color-primary); }
.stat-label { font-size: 0.85rem; color: var(--color-text-light); }
</style>
