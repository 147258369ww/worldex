<template>
  <aside class="admin-sidebar">
    <router-link to="/admin" class="sidebar-logo">{{ langStore.t('admin.sidebar.brand') }}</router-link>
    <nav class="sidebar-nav">
      <router-link to="/admin" class="sidebar-link">{{ langStore.t('admin.sidebar.dashboard') }}</router-link>
      <router-link to="/admin/banners" class="sidebar-link">{{ langStore.t('admin.sidebar.banners') }}</router-link>
      <router-link to="/admin/exhibitions" class="sidebar-link">{{ langStore.t('admin.sidebar.exhibitions') }}</router-link>

      <router-link to="/admin/news" class="sidebar-link">{{ langStore.t('admin.sidebar.news') }}</router-link>
      <router-link to="/admin/contacts" class="sidebar-link">{{ langStore.t('admin.sidebar.messages') }}</router-link>
      <router-link to="/admin/users" class="sidebar-link">{{ langStore.t('admin.sidebar.users') }}</router-link>
      <router-link to="/admin/settings" class="sidebar-link">{{ langStore.t('admin.sidebar.settings') }}</router-link>
    </nav>
    <button @click="logout" class="logout-btn">{{ langStore.t('admin.sidebar.logout') }}</button>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLangStore } from '@/stores/lang'

const router = useRouter()
const authStore = useAuthStore()
const langStore = useLangStore()

function logout() { authStore.logout(); router.push('/admin/login') }
</script>

<style scoped>
.admin-sidebar { width: 220px; min-height: 100vh; background: var(--color-primary); display: flex; flex-direction: column; padding: 20px 0; position: fixed; left: 0; top: 0; }
.sidebar-logo { color: var(--color-accent); font-weight: 700; padding: 0 20px 20px; border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 20px; display: block; }
.sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 4px; padding: 0 12px; }
.sidebar-link { padding: 10px 12px; color: rgba(255,255,255,0.7); border-radius: 6px; font-size: 0.9rem; transition: all 0.2s; }
.sidebar-link:hover, .sidebar-link.router-link-active { background: var(--color-primary-light); color: var(--color-accent); }
.logout-btn { margin: 12px; padding: 10px; background: transparent; border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.7); border-radius: var(--radius); cursor: pointer; }
.logout-btn:hover { border-color: #ef4444; color: #ef4444; }
</style>
