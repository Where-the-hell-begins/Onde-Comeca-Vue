import { createApp } from 'vue'
import App from './App.vue'

const loadFont = () => {
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap'
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}

loadFont()

createApp(App).mount('#app')