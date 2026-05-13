<template>
  <div class="admin-layout">
    <AdminSidebar />
    <main class="admin-main">
      <h2 style="margin-bottom:20px">{{ langStore.t('admin.contacts.title') }}</h2>
      <table class="admin-table">
        <thead><tr><th>{{ langStore.t('admin.contacts.name') }}</th><th>{{ langStore.t('admin.contacts.company') }}</th><th>{{ langStore.t('admin.contacts.email') }}</th><th>{{ langStore.t('admin.contacts.phone') }}</th><th>{{ langStore.t('admin.contacts.date') }}</th><th>{{ langStore.t('admin.contacts.read') }}</th><th>{{ langStore.t('admin.common.actions') }}</th></tr></thead>
        <tbody>
          <tr v-for="item in list" :key="item.id" :class="{ unread: !item.is_read }">
            <td>{{ item.name }}</td><td>{{ item.company }}</td><td>{{ item.email }}</td><td>{{ item.phone }}</td>
            <td>{{ formatDate(item.created_at) }}</td><td>{{ item.is_read ? langStore.t('admin.common.yes') : langStore.t('admin.common.no') }}</td>
            <td><button @click="viewDetail(item)" class="btn-sm">{{ langStore.t('admin.contacts.view') }}</button><button @click="toggleRead(item)" class="btn-sm">{{ item.is_read ? langStore.t('admin.contacts.markUnread') : langStore.t('admin.contacts.markRead') }}</button></td>
          </tr>
        </tbody>
      </table>
      <div v-if="detail" class="modal-overlay" @click.self="detail = null">
        <div class="modal"><h3>{{ langStore.t('admin.contacts.detail') }}</h3>
          <p><strong>{{ langStore.t('admin.contacts.name') }}:</strong> {{ detail.name }}</p><p><strong>{{ langStore.t('admin.contacts.company') }}:</strong> {{ detail.company }}</p>
          <p><strong>{{ langStore.t('admin.contacts.position') }}:</strong> {{ detail.position }}</p><p><strong>{{ langStore.t('admin.contacts.phone') }}:</strong> {{ detail.phone }}</p>
          <p><strong>{{ langStore.t('admin.contacts.email') }}:</strong> {{ detail.email }}</p><p><strong>{{ langStore.t('admin.contacts.address') }}:</strong> {{ detail.address }}</p>
          <p><strong>{{ langStore.t('admin.contacts.message') }}:</strong> {{ detail.message }}</p>
          <button @click="detail = null" class="btn">{{ langStore.t('admin.common.close') }}</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLangStore } from '@/stores/lang'
import { getContacts, markContactRead } from '@/api/contacts'
import AdminSidebar from '@/components/AdminSidebar.vue'

const langStore = useLangStore()

const list = ref([]); const detail = ref(null)
async function fetch() { try { const r = await getContacts({ limit: 100 }); if (r.code === 0) list.value = r.data.list } catch {} }
onMounted(fetch)
function viewDetail(item) { detail.value = item }
function formatDate(d) { return d ? new Date(d).toLocaleDateString() : '' }
async function toggleRead(item) { try { await markContactRead(item.id, item.is_read ? 0 : 1); item.is_read = item.is_read ? 0 : 1; fetch() } catch {} }
</script>

<style scoped>
.admin-layout { display: flex; }
.admin-main { flex: 1; margin-left: 220px; padding: 30px; background: var(--color-bg); }
.admin-table { width: 100%; background: var(--color-white); border-radius: var(--radius); box-shadow: var(--shadow-sm); }
.admin-table th, .admin-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 0.9rem; }
.unread { background: rgba(201,168,76,0.05); font-weight: 600; }
.btn-sm { padding: 4px 12px; border: 1px solid #e2e8f0; border-radius: 4px; cursor: pointer; margin-right: 4px; background: var(--color-white); }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; }
.modal { background: var(--color-white); padding: 30px; border-radius: var(--radius); width: 90%; max-width: 500px; max-height: 80vh; overflow-y: auto; }
.modal p { margin-bottom: 8px; }
</style>
