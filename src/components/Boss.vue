<script>
export default {
  name: 'Boss',
  props: {
    positionX: {
      type: Number,
      default: 720
    }
  },
  computed: {
    bossStyle() {
      return {
        left: `${this.positionX - 50}px`,
        top: '250px'
      }
    }
  }
}
</script>

<template>
  <div class="boss" :style="bossStyle"></div>
</template>



<style scoped>
.boss {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: blue;
  border-radius: 50%;
}
</style>