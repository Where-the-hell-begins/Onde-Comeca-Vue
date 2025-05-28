<script setup>
defineProps({
    angulo: Number
});
</script>
<template>
    <div class="arma" :style="{ transform: `translateX(-50%) rotate(${angulo}rad)` }"></div>
</template>
