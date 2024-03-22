<template>
  <div>
    <pre>
      {{ transaction }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useAPi from '@/composables/useApi';
import { useRoute } from 'vue-router';
const { fetchTransaction } = useAPi();
// why fetching again? - useally we want to have more information on details view
// + data could have been updated
// + we need to make sure that if we share the link to specific order user will be able to see it
// not based on the list view
const transaction = ref({})
const route = useRoute()
try {
  transaction.value = await fetchTransaction(route.params.id as string)
} catch (err) {
  // TODO handle error notification to user
}

</script>

<style scoped>

</style>