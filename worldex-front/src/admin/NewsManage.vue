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
import { getAdminNews, createNews, updateNews, deleteNews } from '@/api/news'
import { uploadFile } from '@/api/upload'
import AdminSidebar from '@/components/AdminSidebar.vue'

import 'tinymce/tinymce'
import 'tinymce/models/dom/model'
import 'tinymce/themes/silver'
import 'tinymce/icons/default'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/link'
import Editor from '@tinymce/tinymce-vue'

const langStore = useLangStore()

const list = ref([]); const showForm = ref(false); const editing = ref(null)
const form = reactive({ title_zh: '', title_en: '', summary_zh: '', summary_en: '', content_zh: '', content_en: '', published_at: '', is_active: true, cover_image: '' })

const editorConfig = {
  height: 500,
  skin_url: '/tinymce/skins/ui/oxide',
  content_css: '/tinymce/skins/content/default/content.css',
  plugins: 'autolink link',
  toolbar: 'undo redo | bold italic underline strikethrough | alignleft aligncenter alignright | link uploadimage',
  setup: (editor) => {
    editor.ui.registry.addButton('uploadimage', {
      icon: 'image',
      tooltip: '插入图片',
      onAction: () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = async () => {
          const file = input.files[0]
          if (!file) return
          editor.setProgressState(true)
          try {
            const res = await uploadFile(file)
            if (res.code === 0) {
              editor.insertContent(`<img src="${res.data.url}" alt="" style="max-width:100%;" />`)
              editor.fire('change')
              editor.fire('input')
            }
          } catch { /* upload failed, ignore */ }
          editor.setProgressState(false)
        }
        input.click()
      }
    })
  },
  menubar: false,
}

async function fetch() { try { const r = await getAdminNews({ limit: 100 }); if (r.code === 0) list.value = r.data.list } catch {} }
onMounted(fetch)
function openForm(item) { editing.value = item || null; if (item) Object.assign(form, item); else Object.assign(form, { title_zh: '', title_en: '', summary_zh: '', summary_en: '', content_zh: '', content_en: '', published_at: '', is_active: true, cover_image: '' }); showForm.value = true }
async function handleUpload(e) { const f = e.target.files[0]; if (!f) return; try { const r = await uploadFile(f); if (r.code === 0) form.cover_image = r.data.url } catch {} }
async function handleSave() { try { if (editing.value?.id) await updateNews(editing.value.id, { ...form }); else await createNews({ ...form }); showForm.value = false; fetch() } catch {} }
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
.field-label { display: block; font-size: 0.9rem; font-weight: 500; margin-bottom: 6px; color: var(--color-text); }
</style>
