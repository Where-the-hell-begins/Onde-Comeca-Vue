<template>
  <div class="overlay container">
    <h2 class="text-center mb-4">Escolha seu Caçador</h2>
    <div class="character-select">
      <div class="character-list">
        <ul class="list-group">
          <li class="list-group-item" 
              v-for="(char, i) in characters" 
              :key="char.name"
              :class="{ active: selectedIndex === i }" 
              @click="selectedIndex = i">
            {{ char.name }}
          </li>
        </ul>
        <button class="btn-back" @click="$emit('back')">Voltar</button>
      </div>

      <div class="character-details" v-if="characters[selectedIndex]">
        <img :src="characters[selectedIndex].image" :alt="characters[selectedIndex].name">
        <h3>{{ characters[selectedIndex].name }}</h3>
        <p>{{ characters[selectedIndex].description }}</p>
        <button class="btn btn-warning mt-2" @click="$emit('select-character', characters[selectedIndex])">
          Selecionar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    characters: {
      type: Array,
      required: true
    }
  },
  emits: ['back', 'select-character'],
  data() {
    return {
      selectedIndex: 0
    }
  }
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

.character-select {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  max-width: 1000px;
}

.character-list {
  flex: 1;
  max-width: 300px;
}

.character-list .list-group {
  padding: 0;
  list-style: none;
}

.character-list .list-group-item {
  background: transparent;
  border: 2px solid #c2a869;
  color: #e6d6b8;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: color 0.3s, box-shadow 0.3s, transform 0.3s;
  font-family: 'UnifrakturCook', cursive;
  text-align: center;
  margin-bottom: 0.5rem;
}

.character-list .list-group-item:hover {
  color: red;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.8),
              0 0 20px rgba(255, 0, 0, 0.6),
              0 0 30px rgba(255, 50, 50, 0.4);
  transform: scale(1.05);
}

.character-details {
  flex: 2;
  min-width: 300px;
  min-height: 400px;
  background: rgba(20, 15, 10, 0.8);
  border: 1px solid #c2a869;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 30px rgba(200, 150, 80, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.character-details img {
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  object-fit: cover;
  height: 200px;
}

h2, h3 {
  color: #e8c58a;
  text-shadow: 0 0 10px rgba(255, 200, 100, 0.8);
}

.btn-back {
  margin-top: 2rem;
  color: #e6d6b8;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-family: 'UnifrakturCook', cursive;
}

.btn-back:hover {
  color: #ffe6a3;
}

.btn-warning {
  background: rgba(200, 150, 80, 0.3);
  border: 1px solid #c2a869;
  color: #e6d6b8;
  padding: 0.5rem 1rem;
  font-family: 'UnifrakturCook', cursive;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-warning:hover {
  background: rgba(200, 150, 80, 0.5);
  color: #ffe6a3;
}
</style>