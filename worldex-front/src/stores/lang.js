import { defineStore } from 'pinia'
import zh from '@/locales/zh'
import en from '@/locales/en'

const messages = { zh, en }

export const useLangStore = defineStore('lang', {
  state: () => ({
    locale: localStorage.getItem('lang') || 'zh'
  }),
  getters: {
    t: (state) => (path) => {
      const keys = path.split('.')
      let val = messages[state.locale]
      for (const key of keys) {
        if (val) val = val[key]
      }
      return val || path
    },
    currentLocale: (state) => state.locale
  },
  actions: {
    setLocale(locale) {
      this.locale = locale
      localStorage.setItem('lang', locale)
    }
  }
})
