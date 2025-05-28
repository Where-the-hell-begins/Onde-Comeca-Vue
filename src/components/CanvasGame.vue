<script setup>
import { ref, onMounted } from 'vue';
import Arma from './Arma.vue';
import Boss from './Boss.vue';
import Bola from './Bola.vue';
import Municao from './Municao.vue';

const muni = ref(6);
const maxmuni = 6;
const angulo = ref(0);
const bolas = ref([]);

const posicoesFixas = [240, 400, 560, 880, 1040, 1200];
const ocupadas = ref(posicoesFixas.map(() => false));
const posicaoBoss = 720;

// Função para criar bolas
function criarBola() {
    const livres = posicoesFixas
        .map((_, i) => !ocupadas.value[i] ? i : null)
        .filter(i => i !== null);

    if (livres.length === 0) {
        setTimeout(criarBola, 200);
        return;
    }

    const indice = livres[Math.floor(Math.random() * livres.length)];
    ocupadas.value[indice] = true;

    const id = Date.now() + Math.random();
    bolas.value.push({ id, x: posicoesFixas[indice] - 25, y: 300, indice });

    setTimeout(() => {
        removerBola(id);
    }, 4000);

    const delay = Math.random() * 1000 + 500;
    setTimeout(criarBola, delay);
}

function removerBola(id) {
    const bola = bolas.value.find(b => b.id === id);
    if (bola) {
        ocupadas.value[bola.indice] = false;
        bolas.value = bolas.value.filter(b => b.id !== id);
        tiro();
    }
}

// Função do tiro
function tiro() {
    if (muni.value > 0) {
        muni.value--;
    }
}

// Mira e ângulo da arma
function moverMira(e) {
    const canvas = document.getElementById('canvas');
    const rect = canvas.getBoundingClientRect();
    const armaX = rect.left + canvas.clientWidth / 2;
    const armaY = rect.top + canvas.clientHeight;

    const dx = e.clientX - armaX;
    const dy = e.clientY - armaY;

    angulo.value = Math.atan2(dy, dx);
}

function disparar() {
    tiro();
}

onMounted(() => {
    criarBola();
});
</script>

<template>
    <div id="canvas" @mousemove="moverMira" @click="disparar">
        <Municao :muni="muni" :maxmuni="maxmuni" />
        <Boss />
        <Arma :angulo="angulo" />
        <Bola v-for="bola in bolas" :key="bola.id" :x="bola.x" :y="bola.y" @acertou="removerBola(bola.id)" />
    </div>
</template>
