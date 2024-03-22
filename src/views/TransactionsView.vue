<script setup lang="ts">
import { ref, computed } from 'vue';
import useAPi from '../composables/useApi';
import useQuery from '../composables/useQuery';
import useFilterableTransactions from '../composables/useFilterableTransactions'
import { type Merchant } from '../types/Merchant.type';
import { type Transaction } from '../types/Transaction.type';
import SelectInput from '@/components/SelectInput.vue'
import NumberBox from '@/components/NumberBox.vue';
import TransactionTable from '@/components/transaction/TransactionTable.vue'
const { queryGetterAndSetter } = useQuery()
const { fetchTransactions, fetchMerchants } = useAPi()

const merchants = ref<Merchant[]>([]);
const transactions = ref<Transaction[]>([]);

const merchant = computed(queryGetterAndSetter('merchant'))
const startDate = computed(queryGetterAndSetter('startDate'))
const endDate = computed(queryGetterAndSetter('endDate'))

try {
  merchants.value = await fetchMerchants();
} catch(err) {
  // TODO some error notification for user
}

const { data, setData, amount } =  useFilterableTransactions(merchant, startDate, endDate)
try {
  transactions.value =  await fetchTransactions();
  setData(transactions.value)
} catch(err) {
// TODO some error notification for user
}
</script>

<template>
  <main>
    <!-- TODO - filters could be abstracted to the separate component, making them reusable across aplication -->
    <div class="filters">
      <div class="filters__block">
        <p>Select merchant</p>
        <!-- TODO - this search should be searchable, but doing searchable select from scratch would be too time consuming -->
        <!-- and I don't want to install UI libraries for the interview because they can impose some decision-making regarding dats structure -->
        <SelectInput class="input" v-model="merchant" :options="merchants" blank-option-text="All merchants" />
      </div>
      <div class="filters__block">
        <p>Select startDate</p>
          <!-- TODO usually we would like to have more visially appealing date pickers -->
        <input class="input" label="startDate" type="date" id="startDate" name="startDate" v-model="startDate" />
      </div>
      <div class="filters__block">
        <p>Select endDate</p>
        <input class="input" label="endDate" type="date" id="endDate" name="endDate" v-model="endDate" />
      </div>
    </div>
    <div class="stats">
      <NumberBox :number="amount" currency-sign="$" label="Profit" />
      <NumberBox :number="data.length" label="Transactions" />
    </div>
    <TransactionTable :transactions="data"/>
  </main>
</template>

<style lang="scss" scoped>
  main {
    display: flex;
    padding: 4rem 2rem;
    flex-direction: column;
    .filters {
      flex-direction: row;
      display: flex;
      .__block {
        max-width: 30%;
        display: flex;
        flex-direction: column;
      }
    }
    .stats {
      flex-direction: row;
      display: flex;
    }

  }
</style>
