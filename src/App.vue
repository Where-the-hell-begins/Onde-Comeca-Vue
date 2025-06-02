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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  height: 100%;
  background-color: #181818;
  cursor: crosshair;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>