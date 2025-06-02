<script>
export default {
  name: 'GameCanvas',
  data() {
    return {
      fixedPositions: [240, 400, 560, 880, 1040, 1200],
      occupiedPositions: Array(6).fill(false),
      balls: [],
      ballIdCounter: 0,
      bossPosition: 720,
      bossVisible: true,
      ammo: 6,
      maxAmmo: 6,
      reloading: false,
      weaponAngle: 0
    }
  },
  computed: {
    bossStyle() {
      return {
        left: `${this.bossPosition - 50}px`,
        top: '250px'
      }
    },
    weaponStyle() {
      return {
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%) rotate(0deg)'
      }
    }
  },
  mounted() {
    this.createBall();
    this.setupEventListeners();
    this.startBallCreationInterval();
  },
  beforeDestroy() {
    this.clearIntervals();
  },
  methods: {
    setupEventListeners() {
      document.addEventListener('keydown', this.handleKeyDown);
    },
    startBallCreationInterval() {
      this.ballInterval = setInterval(() => {
        this.createBall();
      }, 1500);
      
      this.ballCreationTimeout = setTimeout(() => {
        this.startBallCreationInterval();
      }, Math.random() * 1000 + 500);
    },
    clearIntervals() {
      clearInterval(this.ballInterval);
      clearTimeout(this.ballCreationTimeout);
      this.balls.forEach(ball => {
        clearTimeout(ball.removalTimeout);
      });
    },
    createBall() {
      const availablePositions = this.occupiedPositions
        .map((occupied, index) => (!occupied ? index : null))
        .filter(index => index !== null);
      
      if (availablePositions.length === 0) {
        return;
      }
      
      const positionIndex = availablePositions[Math.floor(Math.random() * availablePositions.length)];
      this.occupiedPositions[positionIndex] = true;
      
      const ballId = this.ballIdCounter++;
      const newBall = {
        id: ballId,
        positionIndex,
        envelopeStyle: {
          left: `${this.fixedPositions[positionIndex] - 25}px`,
          top: '300px'
        }
      };
      
      // Auto-removal after 4 seconds
      newBall.removalTimeout = setTimeout(() => {
        this.removeBall(ballId);
      }, 4000);
      
      this.balls.push(newBall);
    },
    removeBall(ballId) {
      const ballIndex = this.balls.findIndex(b => b.id === ballId);
      if (ballIndex === -1) return;
      
      const ball = this.balls[ballIndex];
      this.occupiedPositions[ball.positionIndex] = false;
      this.balls.splice(ballIndex, 1);
      clearTimeout(ball.removalTimeout);
    },
    handleBallClick(ballIndex) {
      if (!this.shoot()) return;
      
      const ball = this.balls[ballIndex];
      this.removeBall(ball.id);
    },
    handleCanvasClick() {
      this.shoot();
    },
    shoot() {
      if (this.reloading || this.ammo <= 0) {
        return false;
      }
      
      this.ammo--;
      return true;
    },
    handleKeyDown(event) {
      if (event.key === 'r' && !this.reloading && this.ammo < this.maxAmmo) {
        this.reload();
      }
    },
    reload() {
      this.reloading = true;
      setTimeout(() => {
        this.ammo = this.maxAmmo;
        this.reloading = false;
      }, 500);
    }
  }
}
</script>

<template>
  <div class="game-container">
    <div 
      id="canvas" 
      ref="canvas"
      @click="handleCanvasClick"
    >
      <div id="municao">
        <span 
          v-for="(bullet, index) in maxAmmo" 
          :key="index"
          class="bala"
          :class="{ 'apagada': index >= ammo }"
        >⏺︎</span>
      </div>
      
      <div 
        v-if="bossVisible"
        class="boss"
        :style="bossStyle"
      ></div>
      
      <div 
        class="arma"
        :style="weaponStyle"
      ></div>
      
      <div 
        v-for="(ball, index) in balls" 
        :key="ball.id"
        class="ball-envelope"
        :style="ball.envelopeStyle"
        @click.stop="handleBallClick(index)"
      >
        <div class="circulo"></div>
        <div class="bola"></div>
      </div>
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
}

.ball-envelope {
  position: absolute;
}

.bola {
  background-color: red;
  transform-origin: center;
  animation: growAndFade 4s ease-out forwards;
}

.circulo {
  border: 1px solid white;
  transform: translate(0%, 0%);
  animation: fadeIn 5s ease-out forwards;
}

.circulo, .bola {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.boss {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: blue;
  border-radius: 50%;
}

.arma {
  position: absolute;
  width: 500px;
  height: 200px;
  bottom: 0;
  left: 50%;
  transform-origin: center bottom;
  transform: translateX(-50%) rotate(0deg);
  transition: transform 0.05s linear;
  background-image: url("imagens/personagem.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

#municao {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 8px;
  z-index: 10;
}

.bala {
  font-size: 28px;
  color: white;
  transition: opacity 0.2s ease;
}

.bala.apagada {
  opacity: 0.2;
}

@keyframes fadeIn {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes growAndFade {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>