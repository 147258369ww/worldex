<template>
  <div class="admin-layout">
    <AdminSidebar />
    <main class="admin-main">
      <div class="admin-header"><h2>{{ langStore.t('admin.exhibitions.title') }}</h2><button @click="openForm()" class="btn btn-primary">{{ langStore.t('admin.common.add') }}</button></div>
      <table class="admin-table">
        <thead><tr><th>{{ langStore.t('admin.exhibitions.nameZh') }}</th><th>{{ langStore.t('admin.exhibitions.type') }}</th><th>{{ langStore.t('admin.exhibitions.city') }}</th><th>{{ langStore.t('admin.exhibitions.date') }}</th><th>{{ langStore.t('admin.common.active') }}</th><th>{{ langStore.t('admin.common.actions') }}</th></tr></thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.name_zh }}</td><td>{{ item.type === 'overseas' ? langStore.t('admin.exhibitions.overseas') : langStore.t('admin.exhibitions.domestic') }}</td><td>{{ item.city_zh }}</td><td>{{ item.date_from }}</td>
            <td>{{ item.is_active ? langStore.t('admin.common.yes') : langStore.t('admin.common.no') }}</td>
            <td><button @click="openForm(item)" class="btn-sm">{{ langStore.t('admin.common.edit') }}</button><button @click="handleDelete(item.id)" class="btn-sm btn-danger">{{ langStore.t('admin.common.delete') }}</button></td>
          </tr>
        </tbody>
      </table>
      <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
        <div class="modal">
          <h3>{{ editing?.id ? langStore.t('admin.common.edit') : langStore.t('admin.common.create') }} {{ langStore.t('admin.exhibitions.title') }}</h3>
          <select v-model="form.type"><option value="overseas">{{ langStore.t('admin.exhibitions.overseas') }}</option><option value="domestic">{{ langStore.t('admin.exhibitions.domestic') }}</option></select>
          <input v-model="form.name_zh" :placeholder="langStore.t('admin.exhibitions.nameZh')" /><input v-model="form.name_en" :placeholder="langStore.t('admin.exhibitions.nameEn')" />
          <input v-model="form.city_zh" :placeholder="langStore.t('admin.exhibitions.cityZh')" /><input v-model="form.country_zh" :placeholder="langStore.t('admin.exhibitions.countryZh')" />
          <input v-model="form.venue_zh" :placeholder="langStore.t('admin.exhibitions.venueZh')" />
          <input v-model="form.date_from" type="date" /><input v-model="form.date_to" type="date" />
          <textarea v-model="form.intro_zh" :placeholder="langStore.t('admin.exhibitions.introZh')" rows="3"></textarea>
          <input type="file" @change="handleUpload" />
          <div class="modal-actions"><button @click="handleSave" class="btn btn-primary">{{ langStore.t('admin.common.save') }}</button><button @click="showForm = false" class="btn">{{ langStore.t('admin.common.cancel') }}</button></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useLangStore } from '@/stores/lang'
import { getAdminExhibitions, createExhibition, updateExhibition, deleteExhibition } from '@/api/exhibitions'
import { uploadFile } from '@/api/upload'
import AdminSidebar from '@/components/AdminSidebar.vue'

const langStore = useLangStore()

const list = ref([]); const showForm = ref(false); const editing = ref(null)
const form = reactive({ type: 'overseas', name_zh: '', name_en: '', city_zh: '', country_zh: '', venue_zh: '', date_from: '', date_to: '', intro_zh: '', intro_en: '', image: '', is_active: true, sort_order: 0 })

async function fetch() { try { const r = await getAdminExhibitions({ limit: 100 }); if (r.code === 0) list.value = r.data.list } catch {} }
onMounted(fetch)

function openForm(item) { editing.value = item || null; if (item) Object.assign(form, item); else Object.assign(form, { type: 'overseas', name_zh: '', name_en: '', city_zh: '', country_zh: '', venue_zh: '', date_from: '', date_to: '', intro_zh: '', intro_en: '', image: '', is_active: true, sort_order: 0 }); showForm.value = true }
async function handleUpload(e) { const f = e.target.files[0]; if (!f) return; try { const r = await uploadFile(f); if (r.code === 0) form.image = r.data.url } catch {} }
async function handleSave() { try { if (editing.value?.id) await updateExhibition(editing.value.id, { ...form }); else await createExhibition({ ...form }); showForm.value = false; fetch() } catch {} }
async function handleDelete(id) { if (!confirm(langStore.t('admin.common.deleteConfirm'))) return; try { await deleteExhibition(id); fetch() } catch {} }
</script>

<style scoped>
.admin-layout { display: flex; }
.admin-main { flex: 1; margin-left: 220px; padding: 30px; background: var(--color-bg); }
.admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.admin-table { width: 100%; background: var(--color-white); border-radius: var(--radius); box-shadow: var(--shadow-sm); }
.admin-table th,.admin-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #e2e8f0; font-size:0.9rem; }
.btn-sm { padding: 4px 12px; border: 1px solid #e2e8f0; border-radius: 4px; cursor: pointer; margin-right: 4px; background: var(--color-white); }
.btn-danger { color: #ef4444; border-color: #ef4444; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; }
.modal { background: var(--color-white); padding: 30px; border-radius: var(--radius); width: 90%; max-width: 500px; max-height: 80vh; overflow-y: auto; }
.modal select,.modal input,.modal textarea { width: 100%; padding: 10px; margin-bottom: 12px; border: 1px solid #e2e8f0; border-radius: var(--radius); font-family: var(--font-body); }
.modal-actions { display: flex; gap: 12px; margin-top: 16px; }
</style>
