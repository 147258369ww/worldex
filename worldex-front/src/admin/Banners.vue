<template>
  <div class="admin-layout">
    <AdminSidebar />
    <main class="admin-main">
      <div class="admin-header"><h2>{{ langStore.t('admin.banners.title') }}</h2><button @click="openForm()" class="btn btn-primary">{{ langStore.t('admin.common.add') }}</button></div>
      <table class="admin-table">
        <thead><tr><th>{{ langStore.t('admin.banners.image') }}</th><th>{{ langStore.t('admin.banners.titleZh') }}</th><th>{{ langStore.t('admin.common.sort') }}</th><th>{{ langStore.t('admin.common.active') }}</th><th>{{ langStore.t('admin.common.actions') }}</th></tr></thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td><img :src="item.image" style="width:80px;height:50px;object-fit:cover;border-radius:4px" /></td>
            <td>{{ item.title_zh }}</td><td>{{ item.sort_order }}</td><td>{{ item.is_active ? langStore.t('admin.common.yes') : langStore.t('admin.common.no') }}</td>
            <td><button @click="openForm(item)" class="btn-sm">{{ langStore.t('admin.common.edit') }}</button><button @click="handleDelete(item.id)" class="btn-sm btn-danger">{{ langStore.t('admin.common.delete') }}</button></td>
          </tr>
        </tbody>
      </table>
      <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
        <div class="modal">
          <h3>{{ editing?.id ? langStore.t('admin.common.edit') : langStore.t('admin.common.create') }} {{ langStore.t('admin.banners.title') }}</h3>
          <input v-model="form.title_zh" :placeholder="langStore.t('admin.banners.titleZh')" />
          <input v-model="form.title_en" :placeholder="langStore.t('admin.banners.titleEn')" />
          <input v-model="form.link" :placeholder="langStore.t('admin.banners.link')" />
          <input type="number" v-model="form.sort_order" :placeholder="langStore.t('admin.banners.sortOrder')" />
          <label style="display:flex;align-items:center;gap:8px;margin-bottom:12px"><input type="checkbox" v-model="form.is_active" /> {{ langStore.t('admin.common.active') }}</label>
          <input type="file" @change="handleUpload" />
          <div v-if="form.image"><img :src="form.image" style="width:100%;max-height:200px;object-fit:cover;border-radius:4px;margin-top:8px" /></div>
          <div class="modal-actions"><button @click="handleSave" class="btn btn-primary">{{ langStore.t('admin.common.save') }}</button><button @click="showForm = false" class="btn">{{ langStore.t('admin.common.cancel') }}</button></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useLangStore } from '@/stores/lang'
import { getAdminBanners, createBanner, updateBanner, deleteBanner } from '@/api/banners'
import { uploadFile } from '@/api/upload'
import AdminSidebar from '@/components/AdminSidebar.vue'

const langStore = useLangStore()

const list = ref([]); const showForm = ref(false); const editing = ref(null)
const form = reactive({ title_zh: '', title_en: '', image: '', link: '', sort_order: 0, is_active: true })

async function fetch() { try { const r = await getAdminBanners(); if (r.code === 0) list.value = r.data } catch {} }
onMounted(fetch)

function openForm(item) {
  editing.value = item || null
  if (item) Object.assign(form, item)
  else Object.assign(form, { title_zh: '', title_en: '', image: '', link: '', sort_order: 0, is_active: true })
  showForm.value = true
}
async function handleUpload(e) { const f = e.target.files[0]; if (!f) return; try { const r = await uploadFile(f); if (r.code === 0) form.image = r.data.url } catch {} }
async function handleSave() { try { if (editing.value?.id) await updateBanner(editing.value.id, { ...form }); else await createBanner({ ...form }); showForm.value = false; fetch() } catch {} }
async function handleDelete(id) { if (!confirm(langStore.t('admin.common.deleteConfirm'))) return; try { await deleteBanner(id); fetch() } catch {} }
</script>

<style scoped>
.admin-layout { display: flex; min-height: 100vh; }
.admin-main { flex: 1; margin-left: 220px; padding: 30px; background: var(--color-bg); }
.admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.admin-table { width: 100%; background: var(--color-white); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-sm); }
.admin-table th, .admin-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #e2e8f0; font-size:0.9rem; }
.btn-sm { padding: 4px 12px; border: 1px solid #e2e8f0; border-radius: 4px; cursor: pointer; margin-right: 4px; background: var(--color-white); }
.btn-danger { color: #ef4444; border-color: #ef4444; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; }
.modal { background: var(--color-white); padding: 30px; border-radius: var(--radius); width: 90%; max-width: 500px; max-height: 80vh; overflow-y: auto; }
.modal h3 { margin-bottom: 16px; }
.modal input { width: 100%; padding: 10px; margin-bottom: 12px; border: 1px solid #e2e8f0; border-radius: var(--radius); font-family: var(--font-body); }
.modal-actions { display: flex; gap: 12px; margin-top: 16px; }
</style>
