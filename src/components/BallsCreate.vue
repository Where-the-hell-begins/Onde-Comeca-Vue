<script>
export default {
  data() {
    return {
      posicoesFixas: [],
      ocupadas: [],    
      balls: [],        
      ballInterval: null
    }
  },
  mounted() {
    this.initializePositions();
    this.startBallCreation();
  },
  beforeDestroy() {
    this.stopBallCreation();
  },
  methods: {
    initializePositions() {
      this.posicoesFixas = [240, 400, 560, 880, 1040, 1200];
      this.ocupadas = new Array(this.posicoesFixas.length).fill(false);

    },
    
    startBallCreation() {
      this.createBall();
    },
    
    stopBallCreation() {
      if (this.ballInterval) {
        clearTimeout(this.ballInterval);
      }
    },
    
    createBall() {
      const livres = this.posicoesFixas
        .map((_, i) => (!this.ocupadas[i] ? i : null))
        .filter(i => i !== null);

      if (livres.length === 0) {
        this.ballInterval = setTimeout(this.createBall, 200);
        return;
      }

      const indice = livres[Math.floor(Math.random() * livres.length)];
      this.ocupadas[indice] = true;

      const newBall = {
        id: Date.now(),
        position: {
          x: this.posicoesFixas[indice] - 25,
          y: 300
        },
        index: indice
      };

      this.balls.push(newBall);

      setTimeout(() => {
        this.removeBall(newBall.id);
      }, 4000);

      // Create next ball after random delay
      const delay = Math.random() * 1000 + 500;
      this.ballInterval = setTimeout(this.createBall, delay);
    },
    
    removeBall(ballId) {
      const ballIndex = this.balls.findIndex(b => b.id === ballId);
      if (ballIndex === -1) return;

      const ball = this.balls[ballIndex];
      this.ocupadas[ball.index] = false;
      this.balls.splice(ballIndex, 1);
    },
    
    handleBallClick(ballIndex) {
      if (!this.tiro()) return;
      this.removeBall(this.balls[ballIndex].id);
    },
    
    tiro() {
      // Your shooting logic here
      return true; // Return true if shooting is allowed
    }
  }
}
</script>

<template>
  <div class="game-container">
    <div 
      v-for="(ball, index) in balls" 
      :key="index"
      class="ball-envelope"
      :style="{
        position: 'absolute',
        left: `${ball.position.x}px`,
        top: `${ball.position.y}px`
      }"
      @click="handleBallClick(index)"
    >
      <div class="circulo"></div>
      <div class="bola"></div>
    </div>
  </div>
</template>



<style>
.game-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.ball-envelope {
  transition: all 0.2s;
}

.bola {
  /* Your ball styles */
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: red;
}

.circulo {
  /* Your circle styles */
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid black;
  position: absolute;
  top: -5px;
  left: -5px;
}
</style>