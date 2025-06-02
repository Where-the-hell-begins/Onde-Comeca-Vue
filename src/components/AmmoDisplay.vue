<script>
export default {
  name: 'AmmoDisplay',
  props: {
    ammo: {
      type: Number,
      required: true
    },
    maxAmmo: {
      type: Number,
      default: 6
    }
  }
}
</script>

<template>
  <div id="municao">
    <span 
      v-for="(bullet, index) in maxAmmo" 
      :key="index"
      class="bala"
      :class="{ 'apagada': index >= ammo }"
    >⏺︎</span>
  </div>
</template>



<style scoped>
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
</style>