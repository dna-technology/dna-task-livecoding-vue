import { ref, computed } from 'vue'
import { type Ref } from 'vue'
import { type Transaction } from '../types/Transaction.type';

type TransactionWithDateAsTimestamp = Transaction & { unixDate: number }

export default function useFilterableTransactions(merchantId?: Ref<string>, startDate?: Ref<string>, endDate?: Ref<string>) {
  //@TODO - TERRIBLE. filtering like that should always be done on backend side
  // so the frontend only handles the result

  const rawData = ref<TransactionWithDateAsTimestamp[]>([])
  const startDateUnix = computed(() => { 
    return (new Date(startDate?.value || '')).getTime()
  })
  const endDateUnix = computed(() => { 
    return (new Date(endDate?.value || '')).getTime()
  })

  const filteredData = computed(() => {
    return rawData.value.filter((transaction: TransactionWithDateAsTimestamp) => {
        if (
          (!merchantId?.value || merchantId.value === transaction.merchantId) &&
          (!startDate?.value || startDateUnix.value < transaction.unixDate) &&
          (!endDate?.value || endDateUnix.value > transaction.unixDate)
        ) {
          return true
        }
    })
  })
  //@TODO using separate reduce for readiness, performance wise we could use the loop
  // in filteredData or even better just get this from backend because we can
  // be displaying only a portion of all orders (because of pagination)
  const amount = computed(() => +filteredData.value.reduce((sum, current) => sum + current.amount, 0).toFixed(2))

  const setData = (data: Transaction[]) => { 
    rawData.value = data.map((el) => {
      return {
        ...el,
        unixDate: (new Date(el.date)).getTime()
      }
    })
  }

  return {
    data: filteredData,
    amount,
    setData,
  }
}