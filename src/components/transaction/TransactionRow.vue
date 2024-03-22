<template>
  <tr>
    <td>{{ transaction.date }}</td>
    <td>{{ transaction.amount }}</td>
    <td>{{ transaction.userId }} </td>
    <td> <RouterLink :to="`/transaction-details/${transaction.id}`">Show Details</RouterLink> </td>
  </tr>
</template>

<script setup lang="ts">
import { defineProps} from 'vue';
import { type Transaction } from '../../types/Transaction.type'
defineProps<{
  transaction: Transaction
}>()
</script>

<style scoped>

</style>