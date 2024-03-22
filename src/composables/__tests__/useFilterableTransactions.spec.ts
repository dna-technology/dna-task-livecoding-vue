import { ref } from 'vue'
import  useFilterableTransactions  from '../useFilterableTransactions'
import { describe, it, expect } from 'vitest'

describe('useFilterableTransactions', () => {
  it('filters transactions based on merchantId, startDate, and endDate', () => {
    const merchantId = ref('123')
    const startDate = ref('2022-01-01')
    const endDate = ref('2022-01-31')

    const { data, amount, setData } = useFilterableTransactions(merchantId, startDate, endDate)

    const transactions = [
      { merchantId: '123', date: '2022-01-05', amount: 100 },
      { merchantId: '123', date: '2022-01-06', amount: 150 },
      { merchantId: '123', date: '2022-02-06', amount: 175 },
      { merchantId: '456', date: '2022-01-10', amount: 200 },
      { merchantId: '123', date: '2022-02-01', amount: 300 },
    ]
    setData(transactions as any)

    expect(data.value).toEqual([
      { merchantId: '123', date: '2022-01-05', amount: 100, unixDate: (new Date('2022-01-05')).getTime() },
      { merchantId: '123', date: '2022-01-06', amount: 150, unixDate: (new Date('2022-01-06')).getTime() },
    ])

    expect(amount.value).toBe('250.00')
  })

  it('returns all data when no filters are provided', () => {
    const { data, amount, setData } = useFilterableTransactions()

    const transactions = [
      { merchantId: '123', date: '2022-01-05', amount: 100 },
      { merchantId: '456', date: '2022-01-10', amount: 200 },
    ]
    setData(transactions as any)

    // Assert nothing is filtered
    expect(data.value).toEqual([
      { merchantId: '123', date: '2022-01-05', amount: 100, unixDate: (new Date('2022-01-05')).getTime() },
      { merchantId: '456', date: '2022-01-10', amount: 200, unixDate: (new Date('2022-01-10')).getTime() },
    ])

    // Assert amount is 300
    expect(amount.value).toBe('300.00')
  })
})