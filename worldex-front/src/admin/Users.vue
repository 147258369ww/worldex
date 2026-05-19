<template>
  <div class="admin-layout">
    <AdminSidebar />
    <main class="admin-main">
      <div class="admin-header"><h2>{{ langStore.t('admin.users.title') }}</h2><button @click="openForm()" class="btn btn-primary">{{ langStore.t('admin.common.add') }}</button></div>
      <table class="admin-table">
        <thead><tr><th>{{ langStore.t('admin.users.username') }}</th><th>{{ langStore.t('admin.users.role') }}</th><th>{{ langStore.t('admin.users.created') }}</th><th>{{ langStore.t('admin.common.actions') }}</th></tr></thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.username }}</td><td>{{ item.role === 'admin' ? langStore.t('admin.users.admin') : langStore.t('admin.users.editor') }}</td><td>{{ formatDate(item.created_at) }}</td>
            <td><button @click="openForm(item)" class="btn-sm">{{ langStore.t('admin.common.edit') }}</button><button @click="handleDelete(item.id)" class="btn-sm btn-danger">{{ langStore.t('admin.common.delete') }}</button></td>
          </tr>
        </tbody>
      </table>
      <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
        <div class="modal">
          <h3>{{ editing?.id ? langStore.t('admin.common.edit') : langStore.t('admin.common.create') }} {{ langStore.t('admin.users.title') }}</h3>
          <input v-model="form.username" :placeholder="langStore.t('admin.users.username')" />
          <input v-model="form.password" type="password" :placeholder="langStore.t('admin.users.password')" />
          <select v-model="form.role"><option value="admin">{{ langStore.t('admin.users.admin') }}</option><option value="editor">{{ langStore.t('admin.users.editor') }}</option></select>
          <div v-if="formError" class="form-error">{{ formError }}</div>
          <div class="modal-actions"><button @click="handleSave" class="btn btn-primary">{{ langStore.t('admin.common.save') }}</button><button @click="showForm = false" class="btn">{{ langStore.t('admin.common.cancel') }}</button></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useLangStore } from '@/stores/lang'
import { getUsers, createUser, updateUser, deleteUser } from '@/api/users'
import AdminSidebar from '@/components/AdminSidebar.vue'

const langStore = useLangStore()

const list = ref([]); const showForm = ref(false); const editing = ref(null)
const formError = ref('')
const form = reactive({ username: '', password: '', role: 'editor' })

async function fetch() { try { const r = await getUsers(); if (r.code === 0) list.value = r.data } catch {} }
onMounted(fetch)
function openForm(item) { editing.value = item || null; formError.value = ''; if (item) { form.username = item.username; form.password = ''; form.role = item.role } else { form.username = ''; form.password = ''; form.role = 'editor' }; showForm.value = true }
async function handleSave() {
  formError.value = ''
  if (!form.username.trim()) {
    formError.value = '请填写用户名'
    return
  }
  if (!editing.value?.id && !form.password) {
    formError.value = '创建用户时必须填写密码'
    return
  }
  try {
    const data = { role: form.role, username: form.username.trim() }
    if (form.password) data.password = form.password
    if (editing.value?.id) await updateUser(editing.value.id, data)
    else await createUser(data)
    showForm.value = false
    fetch()
  } catch (e) {
    formError.value = e?.response?.data?.message || e.message || '保存失败'
  }
}
async function handleDelete(id) { if (!confirm(langStore.t('admin.common.deleteConfirm'))) return; try { await deleteUser(id); fetch() } catch {} }
function formatDate(d) { return d ? new Date(d).toLocaleDateString() : '' }
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
.modal input, .modal select { width: 100%; padding: 10px; margin-bottom: 12px; border: 1px solid #e2e8f0; border-radius: var(--radius); font-family: var(--font-body); }
.modal-actions { display: flex; gap: 12px; margin-top: 16px; }
.form-error { color: #ef4444; background: #fef2f2; border: 1px solid #fecaca; padding: 10px 14px; border-radius: 6px; margin-bottom: 12px; font-size: 0.9rem; }
</style>
