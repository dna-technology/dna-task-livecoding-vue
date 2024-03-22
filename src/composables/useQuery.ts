import { useRoute, useRouter } from 'vue-router';
export default function useQuery() {
  const route = useRoute()
  const router = useRouter()

  function queryGetterAndSetter(name: string) {
    return {
      get() {
        return route.query[name] as string;
      },
      set(newValue: any) {
        router.push({query: {
          ...route.query,
          [name]: newValue
        }})
      }
    }
  }

  return { queryGetterAndSetter }
}