<template>
  <div class="overlay">
    <img src="@/assets/images/logo_generica_teste.png" alt="Logo" class="logo">
    <div class="title-screen">
      <h1>WHERE THE HELL BEGINS</h1>
      <div class="menu-options">
        <div @click="$emit('start')">Pressione Iniciar</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['start']
}
</script>

<style scoped>

.overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

.logo {
  width: 180px;
  margin-bottom: 20px;
  filter: drop-shadow(0 0 15px rgba(255, 190, 90, 0.7))
          drop-shadow(0 0 30px rgba(255, 150, 50, 0.4))
          drop-shadow(0 0 60px rgba(255, 120, 40, 0.3));
}

.title-screen h1 {
  font-size: 4rem;
  color: #d9c18c;
  letter-spacing: 8px;
  text-shadow: 0 0 20px rgba(255, 215, 130, 0.8),
               0 0 40px rgba(255, 200, 100, 0.5);
}

.menu-options {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.menu-options div {
  cursor: pointer;
  font-size: 1.5rem;
  color: #c7b389;
  transition: color 0.3s;
  font-family: 'UnifrakturCook', cursive;
}

.menu-options div:hover {
  color: #ffe6a3;
}
</style>