<script>
export default {
  name: 'Weapon',
  computed: {
    weaponStyle() {
      return {
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%) rotate(0deg)'
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit('weapon-clicked')
    }
  }
}
</script>

<template>
  <div class="arma" :style="weaponStyle" @click="handleClick"></div>
</template>



<style scoped>
.arma {
  position: absolute;
  width: 500px;
  height: 200px;
  transform-origin: center bottom;
  transition: transform 0.05s linear;
  background-image: url("imagens/personagem.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>