<script setup>
defineProps({
    muni: Number,
    maxmuni: Number
});
</script>

<template>
    <div id="municao">
        <span v-for="i in maxmuni" :key="i" class="bala" :class="{ apagada: i > muni }">
            🔥
        </span>
    </div>
</template>
