<script setup>
const emit = defineEmits(['acertou']);
const props = defineProps({
    x: Number,
    y: Number
});

function acertou() {
    emit('acertou');
}
</script>

<template>
    <div class="envelope" :style="{ left: `${x}px`, top: `${y}px`, position: 'absolute' }" @click="acertou">
        <div class="circulo"></div>
        <div class="bola"></div>
    </div>
</template>
