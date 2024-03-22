<script setup lang="ts">
import { ref } from 'vue';
import useAPi from '../composables/useApi';
import NumberBox from '@/components/NumberBox.vue';
import { type Transaction } from '../types/Transaction.type';
import { type Merchant } from '../types/Merchant.type';
const { fetchTransactions, fetchMerchants } = useAPi()
import useFilterableTransactions from '@/composables/useFilterableTransactions';
const  { amount, setData, data } = useFilterableTransactions()
const transactions = ref<Transaction[]>([]);
const merchants = ref<Merchant[]>([]);
try {
  transactions.value =  await fetchTransactions();
  merchants.value = await fetchMerchants()
  setData(transactions.value)
} catch (err) {
  // TODO - implement some error notification to end user
}
</script>

<template>
  <main>
    <NumberBox :number="amount" currency-sign="$" label="Profit" />
    <NumberBox :number="transactions.length" label="Transactions" />
    <NumberBox :number="merchants.length" label="Merchants" />
  </main>
</template>

<style lang="scss" scoped>
  main {
    display: flex;
    padding: 4rem 2rem;
  }
</style>
