<template>
  <div class="admin-layout">
    <AdminSidebar />
    <main class="admin-main">
      <h2>{{ langStore.t('admin.settings.title') }}</h2>
      <form @submit.prevent="handleSave" class="settings-form">
        <h3>{{ langStore.t('admin.settings.aboutZh') }}</h3><textarea v-model="form.about_zh" rows="4"></textarea>
        <h3>{{ langStore.t('admin.settings.aboutEn') }}</h3><textarea v-model="form.about_en" rows="4"></textarea>
        <h3>{{ langStore.t('admin.settings.addressZh') }}</h3><input v-model="form.address_zh" />
        <h3>{{ langStore.t('admin.settings.addressEn') }}</h3><input v-model="form.address_en" />
        <h3>{{ langStore.t('admin.settings.phone') }}</h3><input v-model="form.phone" />
        <h3>{{ langStore.t('admin.settings.email') }}</h3><input v-model="form.email" />
        <h3>{{ langStore.t('admin.settings.partnersZh') }}</h3><textarea v-model="form.partners_zh" rows="3"></textarea>
        <h3>{{ langStore.t('admin.settings.partnersEn') }}</h3><textarea v-model="form.partners_en" rows="3"></textarea>
        <button type="submit" class="btn btn-primary">{{ langStore.t('admin.common.save') }}</button>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLangStore } from '@/stores/lang'
import { getAdminCompanyInfo, updateCompanyInfo } from '@/api/company'
import AdminSidebar from '@/components/AdminSidebar.vue'

const langStore = useLangStore()

const form = ref({ about_zh:'', about_en:'', address_zh:'', address_en:'', phone:'', email:'', partners_zh:'', partners_en:'' })

onMounted(async () => { try { const r = await getAdminCompanyInfo(); if (r.code === 0) Object.assign(form.value, r.data) } catch {} })

async function handleSave() { try { await updateCompanyInfo(form.value); alert(langStore.t('admin.settings.saved')) } catch {} }
</script>

<style scoped>
.admin-layout { display: flex; }
.admin-main { flex: 1; margin-left: 220px; padding: 30px; background: var(--color-bg); }
.settings-form { background: var(--color-white); padding: 30px; border-radius: var(--radius); box-shadow: var(--shadow-sm); max-width: 700px; }
.settings-form h3 { margin: 16px 0 8px; color: var(--color-primary); font-size:1rem; }
.settings-form input, .settings-form textarea { width: 100%; padding: 10px; margin-bottom: 8px; border: 1px solid #e2e8f0; border-radius: var(--radius); font-family: var(--font-body); }
</style>
