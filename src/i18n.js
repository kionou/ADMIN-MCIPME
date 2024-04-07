import { createI18n } from 'vue-i18n'
import fr from '@/locales/fr.json'
import en from '@/locales/en.json'


export default createI18n({
  locale:  'en',
  legacy: false,
  globalInjection: true,
  fallbackLocale:  'en',
  messages:{
    fr:fr,
    en:en
}
})





