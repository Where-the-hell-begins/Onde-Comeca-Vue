<template>
  <div class="overlay container text-center">
    <h2 class="mb-4">Configurações</h2>
    <div class="settings-content">
      <p>⚙️ Opções em desenvolvimento.</p>
      <button class="btn-back" @click="$emit('back')">Voltar</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['back']
}
</script>

<style scoped>

.overlay.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

h2 {
  color: #e8c58a;
  text-shadow: 0 0 10px rgba(255, 200, 100, 0.8);
  font-size: 2.5rem;
}

.settings-content {
  background: rgba(20, 15, 10, 0.8);
  border: 1px solid #c2a869;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 30px rgba(200, 150, 80, 0.5);
}

.btn-back {
  margin-top: 2rem;
  color: #e6d6b8;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-family: 'UnifrakturCook', cursive;
  padding: 0.5rem 1rem;
  transition: all 0.3s;
}

.btn-back:hover {
  color: #ffe6a3;
  text-shadow: 0 0 5px rgba(255, 215, 130, 0.8);
}
</style>