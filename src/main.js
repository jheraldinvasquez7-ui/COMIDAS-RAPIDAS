import { createApp } from 'vue'
import * as QuasarLib from 'quasar'
import { Quasar, Notify, Dialog } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/dist/quasar.css'

import App from './App.vue'
import router from './routers/routes.js'
import './style.css'

const app = createApp(App)

// Registrar automáticamente todos los componentes Q de Quasar
for (const [key, value] of Object.entries(QuasarLib)) {
  if (key.startsWith('Q') && typeof value === 'object' && value !== null) {
    app.component(key, value)
  }
}

// Registrar directivas de Quasar
if (QuasarLib.ClosePopup) app.directive('close-popup', QuasarLib.ClosePopup)
if (QuasarLib.Ripple) app.directive('ripple', QuasarLib.Ripple)

app.use(Quasar, {
  plugins: {
    Notify,
    Dialog
  },
  config: {
    brand: {
      primary: '#B21E27',
      secondary: '#333333',
      accent: '#FFB300',
      dark: '#111111',
      positive: '#16a34a',
      negative: '#B21E27',
      info: '#0284c7',
      warning: '#eab308'
    },
    notify: {
      position: 'top-right',
      timeout: 2500
    }
  }
})

app.use(router)

app.mount('#app')
