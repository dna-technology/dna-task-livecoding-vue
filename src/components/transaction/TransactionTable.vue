
<template>
  <table>
    <tr>
      <td>Date</td>
      <td>Amount</td>
      <td>UserId</td>
    </tr>
    <TransactionRow v-for="transaction in paginatedTransactions" :key="transaction.id" :transaction="transaction" />
  </table>
  <div> <button :disabled="prevButtonDisabled" @click="page--">prev</button> <button :disabled="nextButtonDisabled" @click="page++">next</button> </div>
</template>

<script setup lang="ts">
import TransactionRow from './TransactionRow.vue';
import { defineProps, computed, ref  } from 'vue';
import {type Transaction} from '../../types/Transaction.type'
const props = defineProps<{
  transactions: Transaction[]
}>()
const page = ref(1)
const paginatedTransactions = computed(() => {
  return props.transactions?.slice((page.value - 1) * 10, page.value * 10) || []
})
const nextButtonDisabled = computed(() => {
  return page.value * 10 >= props.transactions.length
})
const prevButtonDisabled = computed(() => {
  return page.value === 1
})
</script>

<style scoped>

</style>