export default function useAPi() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL

  function url(path: string) {
    return `${baseUrl}/${path}`
  }
  // @TODO - move to axios to allow typing
  const fetchMerchants = async () => {
    const response = await fetch(url('merchants'))
    const parsed = await response.json()
    return parsed
  }
  const fetchTransactions = async () => {
    const response = await fetch(url('transactions'))
    const parsed = await response.json()
    return parsed
  }

  const fetchTransaction = async (id: string) => {
    const response = await fetch(url(`transactions/${id}`))
    const parsed = await response.json()
    return parsed
  }

  return {
    fetchTransactions,
    fetchTransaction,
    fetchMerchants,
  }
}