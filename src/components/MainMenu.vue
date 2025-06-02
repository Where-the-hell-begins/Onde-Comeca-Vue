<template>
  <div class="overlay">
    <div class="menu-options">
      <div @mouseover="createSpark" @click="$emit('characters')">Iniciar Jogo</div>
      <div @mouseover="createSpark" @click="$emit('settings')">Configurações</div>
      <div @mouseover="createSpark" @click="$emit('back')">Voltar</div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['characters', 'settings', 'back'],
  methods: {
    createSpark(event) {
      const spark = document.createElement('div')
      spark.className = 'spark'
      document.body.appendChild(spark)

      const x = Math.random() * 100 - 50
      const y = Math.random() * -100 - 50

      spark.style.setProperty('--x', `${x}px`)
      spark.style.setProperty('--y', `${y}px`)
      spark.style.left = `${event.clientX}px`
      spark.style.top = `${event.clientY}px`

      spark.addEventListener('animationend', () => {
        spark.remove()
      })
    }
  }
}
</script>

<style scoped>
/* Estilo IDÊNTICO ao original */
.overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

.menu-options {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.menu-options div {
  cursor: pointer;
  font-size: 1.5rem;
  color: #c7b389;
  transition: color 0.3s;
  font-family: 'UnifrakturCook', cursive;
}

.menu-options div:hover {
  color: #ffe6a3;
}
</style>