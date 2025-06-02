<script>
import GameCanvas from './components/GameCanvas.vue'

export default {
  name: 'App',
  components: {
    GameCanvas
  }
}
</script>

<template>
  <div id="app">
    <GameCanvas />
  </div>
</template>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #181818;
  cursor: crosshair;
  overflow: hidden;
}
</style>