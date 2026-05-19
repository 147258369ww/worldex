<template>
  <div class="admin-layout">
    <AdminSidebar />
    <main class="admin-main">
      <div class="admin-header"><h2>{{ langStore.t('admin.news.title') }}</h2><button @click="openForm()" class="btn btn-primary">{{ langStore.t('admin.common.add') }}</button></div>
      <table class="admin-table">
        <thead><tr><th>{{ langStore.t('admin.news.titleZh') }}</th><th>{{ langStore.t('admin.news.published') }}</th><th>{{ langStore.t('admin.common.active') }}</th><th>{{ langStore.t('admin.common.actions') }}</th></tr></thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.title_zh }}</td><td>{{ item.published_at }}</td><td>{{ item.is_active ? langStore.t('admin.common.yes') : langStore.t('admin.common.no') }}</td>
            <td><button @click="openForm(item)" class="btn-sm">{{ langStore.t('admin.common.edit') }}</button><button @click="handleDelete(item.id)" class="btn-sm btn-danger">{{ langStore.t('admin.common.delete') }}</button></td>
          </tr>
        </tbody>
      </table>
      <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
        <div class="modal">
          <h3>{{ editing?.id ? langStore.t('admin.common.edit') : langStore.t('admin.common.create') }} {{ langStore.t('admin.news.title') }}</h3>
          <input v-model="form.title_zh" :placeholder="langStore.t('admin.news.titleZh')" /><input v-model="form.title_en" :placeholder="langStore.t('admin.news.titleEn')" />
          <input v-model="form.summary_zh" :placeholder="langStore.t('admin.news.summaryZh')" />
          <input v-model="form.summary_en" :placeholder="langStore.t('admin.news.summaryEn')" />
          <label class="field-label">{{ langStore.t('admin.news.contentZh') }}</label>
          <Editor v-model="form.content_zh" :init="editorConfig" license-key="gpl" />
          <label class="field-label" style="margin-top:12px">{{ langStore.t('admin.news.contentEn') }}</label>
          <Editor v-model="form.content_en" :init="editorConfig" license-key="gpl" />
          <input v-model="form.published_at" type="date" />
          <label style="display:flex;align-items:center;gap:8px;margin-bottom:12px"><input type="checkbox" v-model="form.is_active" /> {{ langStore.t('admin.common.active') }}</label>
          <div v-if="saveError" class="save-error">{{ saveError }}</div>
          <div class="modal-actions"><button @click="handleSave" class="btn btn-primary">{{ langStore.t('admin.common.save') }}</button><button @click="showForm = false" class="btn">{{ langStore.t('admin.common.cancel') }}</button></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useLangStore } from '@/stores/lang'
import { getAdminNews, createNews, updateNews, deleteNews } from '@/api/news'
import { uploadFile } from '@/api/upload'
import AdminSidebar from '@/components/AdminSidebar.vue'

import 'tinymce/tinymce'
import 'tinymce/models/dom/model'
import 'tinymce/themes/silver'
import 'tinymce/icons/default'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import Editor from '@tinymce/tinymce-vue'

const langStore = useLangStore()

const list = ref([]); const showForm = ref(false); const editing = ref(null); const saveError = ref('')
const form = reactive({ title_zh: '', title_en: '', summary_zh: '', summary_en: '', content_zh: '', content_en: '', published_at: '', is_active: true, cover_image: '' })
const maxImageSize = 20 * 1024 * 1024

const editorConfig = {
  height: 500,
  skin_url: '/tinymce/skins/ui/oxide',
  content_css: '/tinymce/skins/content/default/content.css',
  language: 'zh_CN',
  language_url: '/tinymce/langs/zh_CN.js',
  plugins: 'autolink link image',
  toolbar: 'undo redo | bold italic underline strikethrough | alignleft aligncenter alignright | link image',
  images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
    const blob = blobInfo.blob()
    if (blob.size > maxImageSize) {
      reject('图片不能超过 20MB')
      return
    }
    const file = new File([blob], blobInfo.filename(), { type: blob.type || 'image/png' })
    uploadFile(file).then(res => {
      if (res.code === 0) {
        resolve(res.data.url)
      } else {
        reject(res.message || 'Upload failed')
      }
    }).catch(err => {
      reject(err?.response?.data?.message || err.message || 'Upload failed')
    })
  }),
  menubar: false,
}

async function fetch() { try { const r = await getAdminNews({ limit: 100 }); if (r.code === 0) list.value = r.data.list } catch {} }
onMounted(fetch)
function openForm(item) { editing.value = item || null; if (item) { const copy = { ...item }; if (copy.published_at) copy.published_at = copy.published_at.split('T')[0]; Object.assign(form, copy); } else Object.assign(form, { title_zh: '', title_en: '', summary_zh: '', summary_en: '', content_zh: '', content_en: '', published_at: '', is_active: true, cover_image: '' }); showForm.value = true }
async function handleSave() { saveError.value = ''; const payload = { ...form }; if (payload.published_at) { const d = new Date(payload.published_at); payload.published_at = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); } try { if (editing.value?.id) await updateNews(editing.value.id, payload); else await createNews(payload); showForm.value = false; fetch() } catch (e) { saveError.value = e?.response?.data?.message || e.message || '保存失败' } }
async function handleDelete(id) { if (!confirm(langStore.t('admin.common.deleteConfirm'))) return; try { await deleteNews(id); fetch() } catch {} }
</script>

<style scoped>
.admin-layout { display: flex; }
.admin-main { flex: 1; margin-left: 220px; padding: 30px; background: var(--color-bg); }
.admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.admin-table { width: 100%; background: var(--color-white); border-radius: var(--radius); box-shadow: var(--shadow-sm); }
.admin-table th,.admin-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #e2e8f0; font-size:0.9rem; }
.btn-sm { padding: 4px 12px; border: 1px solid #e2e8f0; border-radius: 4px; cursor: pointer; margin-right: 4px; background: var(--color-white); }
.btn-danger { color: #ef4444; border-color: #ef4444; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: var(--color-white); padding: 30px; border-radius: var(--radius); width: 90%; max-width: 900px; max-height: 80vh; overflow-y: auto; }
.modal input, .modal textarea { width: 100%; padding: 10px; margin-bottom: 12px; border: 1px solid #e2e8f0; border-radius: var(--radius); font-family: var(--font-body); }
.modal-actions { display: flex; gap: 12px; margin-top: 16px; }
.save-error { color: #ef4444; background: #fef2f2; border: 1px solid #fecaca; padding: 10px 14px; border-radius: 6px; margin-bottom: 12px; font-size: 0.9rem; }
.field-label { display: block; font-size: 0.9rem; font-weight: 500; margin-bottom: 6px; color: var(--color-text); }
</style>
