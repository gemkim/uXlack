import { useEffect, useState } from 'react'
import { fetchApi } from '../lib/api'

type Endpoint = 'project'

export function useFetch<T>(endpoint: Endpoint) {
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    let ignore = false

    fetchApi.get(`/${endpoint}`).then((res) => {
      if (!ignore) {
        setData(res.data)
      }
    })

    return () => {
      ignore = true
    }
  }, [endpoint])

  return { data }
}
