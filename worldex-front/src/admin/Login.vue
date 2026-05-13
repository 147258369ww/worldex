<template>
  <div class="admin-login">
    <form @submit.prevent="handleLogin" class="login-form">
      <h1>{{ langStore.t('admin.login.title') }}</h1>
      <input v-model="username" :placeholder="langStore.t('admin.login.username')" required />
      <input v-model="password" type="password" :placeholder="langStore.t('admin.login.password')" required />
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit" class="btn btn-primary">{{ langStore.t('admin.login.submit') }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLangStore } from '@/stores/lang'

const router = useRouter()
const authStore = useAuthStore()
const langStore = useLangStore()
const username = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  try {
    const res = await authStore.login(username.value, password.value)
    if (res.code === 0) router.push('/admin')
    else error.value = res.message || langStore.t('admin.login.failed')
  } catch (e) { error.value = langStore.t('admin.login.networkError') }
}
</script>

<style scoped>
.admin-login { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--color-bg); }
.login-form { background: var(--color-white); padding: 40px; border-radius: var(--radius); box-shadow: var(--shadow-md); width: 100%; max-width: 400px; }
.login-form h1 { text-align: center; margin-bottom: 24px; color: var(--color-primary); }
.login-form input { width: 100%; padding: 12px; margin-bottom: 16px; border: 1px solid #e2e8f0; border-radius: var(--radius); font-family: var(--font-body); }
.login-form .btn { width: 100%; }
.error { color: #ef4444; margin-bottom: 12px; font-size: 0.9rem; text-align: center; }
</style>
