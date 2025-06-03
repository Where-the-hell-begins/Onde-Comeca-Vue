<script>
import GameCanvas from './components/GameCanvas.vue'
import TitleScreen from './components/TitleScreen.vue'
import MainMenu from './components/MainMenu.vue'
import CharacterSelect from './components/CharacterSelect.vue'
import SettingsScreen from './components/SettingsScreen.vue'

export default {
  components: {
    GameCanvas,
    TitleScreen,
    MainMenu,
    CharacterSelect,
    SettingsScreen
  },
  data() {
    return {
      screen: 'title',
      selectedCharacter: null,
      characters: [
        {
          name: 'Reaper Bill',
          description: 'Pistoleiro morto-vivo, ressuscitado para caçar as forças do inferno.',
          image: 'https://i.pinimg.com/736x/9b/e9/50/9be95049887c336a5bea6e25feed3c2d.jpg'
        },
        {
          name: 'Lilith Flame',
          description: 'Bruxa do deserto com pacto demoníaco reverso.',
          image: 'https://i.pinimg.com/736x/08/46/55/08465588aa672e99967c1636728afbd9.jpg'
        },
        {
          name: 'Father Graves',
          description: 'Exorcista com espingarda sagrada e passado sombrio.',
          image: 'https://i.pinimg.com/736x/d2/0d/04/d20d043b427f8263d0c6621bb9338c5a.jpg'
        }
      ]
    }
  },
  methods: {
    startGame(character = null) {
      this.selectedCharacter = character
      this.screen = 'game'
    },
    backToMenu() {
      this.screen = 'menu'
    }
  },
  mounted() {
    window.addEventListener('click', () => {
      const music = document.getElementById('bg-music')
      if (music) {
        music.play().catch(() => {})
      }
    }, { once: true })
  }
}
</script>

<template>
  <div id="app">
    <audio id="bg-music" src="./assets/audio/Rise up Dead Man (Instrumental).mp3" autoplay loop></audio>

    <TitleScreen v-if="screen === 'title'" @start="screen = 'menu'" />
    <MainMenu v-else-if="screen === 'menu'" 
              @characters="screen = 'characters'" 
              @settings="screen = 'settings'"
              @start-game="startGame()"
              @back="screen = 'title'" />
    <CharacterSelect v-if="screen === 'characters'" 
                     :characters="characters"
                     @back="screen = 'menu'"
                     @select-character="startGame" />
    <SettingsScreen v-if="screen === 'settings'" @back="screen = 'menu'" />
    
    <GameCanvas v-if="screen === 'game'"
                :character="selectedCharacter"
                @back="backToMenu" />
  </div>
</template>

<style>
/* Estilos IDÊNTICOS ao original */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  height: 100%;
  background-color: black;
  background-image: radial-gradient(circle at center, rgba(255, 204, 153, 0.05) 0%, transparent 70%);
  color: #e0d8c3;
  font-family: 'UnifrakturCook', cursive;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spark {
  position: absolute;
  width: 5px;
  height: 5px;
  background: rgba(255, 165, 0, 0.8);
  border-radius: 50%;
  pointer-events: none;
  animation: spark-animation 1s forwards;
}

@keyframes spark-animation {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--x), var(--y)) scale(0);
    opacity: 0;
  }
}
</style>