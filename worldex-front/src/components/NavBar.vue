<template>
  <nav class="navbar">
    <div class="navbar-inner container">
      <router-link to="/" class="logo">
        <span class="logo-text">{{ langStore.currentLocale === 'zh' ? '森昊展览' : 'SenHao' }}</span>
      </router-link>
      <div class="nav-links" :class="{ open: mobileOpen }">
        <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="nav-link" @click="mobileOpen = false">
          {{ item.label }}
        </router-link>
        <button class="lang-btn" @click="toggleLang">{{ langStore.currentLocale === 'zh' ? 'EN' : '中文' }}</button>
      </div>
      <button class="hamburger" @click="mobileOpen = !mobileOpen">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLangStore } from '@/stores/lang'

const langStore = useLangStore()
const mobileOpen = ref(false)

const navItems = computed(() => [
  { path: '/', label: langStore.t('nav.home') },
  { path: '/overseas', label: langStore.t('nav.overseas') },
  { path: '/domestic', label: langStore.t('nav.domestic') },

  { path: '/news', label: langStore.t('nav.news') },
  { path: '/contact', label: langStore.t('nav.contact') },
])

function toggleLang() {
  langStore.setLocale(langStore.currentLocale === 'zh' ? 'en' : 'zh')
}
</script>

<style scoped>
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  background: var(--color-primary); box-shadow: var(--shadow-md);
}
.navbar-inner { display: flex; align-items: center; justify-content: space-between; height: 70px; }
.logo-text { font-size: 1.5rem; font-weight: 700; color: var(--color-white); }
.nav-links { display: flex; align-items: center; gap: 24px; }
.nav-link { font-size: 0.9rem; color: rgba(255,255,255,0.85); font-weight: 500; transition: color 0.2s; }
.nav-link:hover, .nav-link.router-link-active { color: var(--color-accent); }
.lang-btn { background: transparent; border: 1px solid var(--color-accent); color: var(--color-accent); padding: 4px 12px; border-radius: var(--radius); cursor: pointer; font-size: 0.8rem; font-weight: 600; transition: all 0.2s; }
.lang-btn:hover { background: var(--color-accent); color: var(--color-primary); }
.hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
.hamburger span { display: block; width: 24px; height: 2px; background: var(--color-white); transition: all 0.3s; }
@media (max-width: 768px) {
  .hamburger { display: flex; }
  .nav-links {
    position: fixed; top: 70px; left: 0; right: 0; bottom: 0;
    background: var(--color-primary); flex-direction: column; justify-content: center; gap: 32px;
    transform: translateX(100%); transition: transform 0.3s;
  }
  .nav-links.open { transform: translateX(0); }
  .nav-link { font-size: 1.2rem; }
}
</style>
