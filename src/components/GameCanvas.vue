<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Ball from './Ball.vue'
import Boss from './Boss.vue'
import Weapon from './Weapon.vue'
import AmmoDisplay from './AmmoDisplay.vue'

export default {
  name: 'GameCanvas',
  components: {
    Ball,
    Boss,
    Weapon,
    AmmoDisplay
  },
  setup() {
    // Dados reativos
    const fixedPositions = [240, 400, 560, 880, 1040, 1200]
    const occupiedPositions = ref(new Array(6).fill(false))
    const balls = ref([])
    const ballIdCounter = ref(0)
    const bossVisible = ref(true)
    const ammo = ref(6)
    const maxAmmo = 6
    const reloading = ref(false)
    const ballInterval = ref(null)
    const ballCreationTimeout = ref(null)

    // Métodos
    const setupEventListeners = () => {
      document.addEventListener('keydown', handleKeyDown)
    }

    const startBallCreationInterval = () => {
      ballInterval.value = setInterval(() => {
        createBall()
      }, 1500)
    }

    const clearIntervals = () => {
      clearInterval(ballInterval.value)
      clearTimeout(ballCreationTimeout.value)
      balls.value.forEach(ball => {
        clearTimeout(ball.removalTimeout)
      })
    }

    const createBall = () => {
      const availableIndices = occupiedPositions.value
        .map((occupied, index) => (!occupied ? index : null))
        .filter(index => index !== null)

      if (availableIndices.length === 0) {
        ballCreationTimeout.value = setTimeout(createBall, 200)
        return
      }

      const randomIndex = Math.floor(Math.random() * availableIndices.length)
      const positionIndex = availableIndices[randomIndex]
      
      // Atualização reativa sem $set
      occupiedPositions.value[positionIndex] = true

      const newBall = {
        id: ballIdCounter.value++,
        positionIndex,
        removalTimeout: setTimeout(() => {
          removeBall(ballIdCounter.value - 1)
        }, 4000)
      }

      balls.value.push(newBall)

      const delay = Math.random() * 1000 + 500
      ballCreationTimeout.value = setTimeout(createBall, delay)
    }

    const removeBall = (ballId) => {
      const ballIndex = balls.value.findIndex(b => b.id === ballId)
      if (ballIndex === -1) return

      const ball = balls.value[ballIndex]
      occupiedPositions.value[ball.positionIndex] = false
      clearTimeout(ball.removalTimeout)
      balls.value.splice(ballIndex, 1)
    }

    const handleBallClick = (ballId) => {
      if (!shoot()) return
      removeBall(ballId)
    }

    const handleCanvasClick = () => {
      shoot()
    }

    const shoot = () => {
      if (reloading.value || ammo.value <= 0) {
        return false
      }
      ammo.value--
      return true
    }

    const handleKeyDown = (event) => {
      if (event.key === 'r' && !reloading.value && ammo.value < maxAmmo) {
        reload()
      }
    }

    const reload = () => {
      reloading.value = true
      setTimeout(() => {
        ammo.value = maxAmmo
        reloading.value = false
      }, 500)
    }

    // Lifecycle hooks
    onMounted(() => {
      occupiedPositions.value = new Array(fixedPositions.length).fill(false)
      createBall()
      setupEventListeners()
      startBallCreationInterval()
    })

    onBeforeUnmount(() => {
      clearIntervals()
      document.removeEventListener('keydown', handleKeyDown)
    })

    // Expor para o template
    return {
      fixedPositions,
      balls,
      bossVisible,
      ammo,
      maxAmmo,
      handleBallClick,
      handleCanvasClick
    }
  }
}
</script>

<template>
  <div class="game-container">
    <div id="canvas" ref="canvas" @click="handleCanvasClick">
      <AmmoDisplay :ammo="ammo" :maxAmmo="maxAmmo" />
      <Boss v-if="bossVisible" />
      <Weapon @weapon-clicked="shoot" />
      
      <Ball
        v-for="ball in balls"
        :key="ball.id"
        :position-x="fixedPositions[ball.positionIndex]"
        :id="ball.id"
        @ball-clicked="handleBallClick"
      />
    </div>
  </div>
</template>

<style scoped>
#canvas {
  position: relative;
  width: 1440px;
  height: 600px;
  border: 2px solid #333;
  background-image: url("imagens/teste.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden; /* Adicionado para conter as bolas */
}

/* Adicione estas novas regras */
.ball-container {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.ball-envelope {
  position: absolute;
  transform: translate(-50%, -50%); /* Centraliza a bola na posição */
  pointer-events: auto; /* Permite interação com a bola */
}
</style>