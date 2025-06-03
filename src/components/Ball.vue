<script>
export default {
  name: 'Ball',
  props: {
    positionX: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    envelopeStyle() {
      return {
        left: `${this.positionX - 25}px`,
        top: '300px'
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit('ball-clicked', this.id)
    }
  }
}
</script>

<template>
  <div 
    class="ball-envelope"
    :style="{
      left: `${positionX}px`,
      top: '50%',
      transform: 'translate(-50%, -50%)'
    }"
    @click.stop="handleClick"
  >
    <div class="circulo"></div>
    <div class="bola"></div>
  </div>
</template>



<style scoped>
.ball-envelope {
  position: absolute;
}

.bola {
  background-color: red;
  transform-origin: center;
  animation: growAndFade 4s ease-out forwards;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
}

.circulo {
  border: 1px solid white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  animation: fadeIn 5s ease-out forwards;
}


@keyframes fadeIn {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes growAndFade {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
}
</style>