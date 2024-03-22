<script setup lang="ts">
type Props = {
  number: string| number
  label: string;
  currencySign?: string
}


defineProps<Props>()
</script>

<template>
  <div class="dashboard-box">
    <span>{{ number }}{{ currencySign }}</span> {{ label }}
  </div>
</template>