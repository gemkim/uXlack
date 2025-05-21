import { AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react'
import { fetchApi } from '../lib/api'

type Method = 'get' | 'post' | 'put' | 'delete'

export function useFetch<T>(
  method: Method,
  endpoint: string,
  payload: any = {},
  deps: React.DependencyList = [],
  skip = false
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    if (skip) return

    let cancelled = false

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const config: AxiosRequestConfig = {
          method,
          url: endpoint
        }

        if (method === 'get' || method === 'delete') {
          config.params = payload
        } else {
          config.data = payload
        }

        const res = await fetchApi.request(config)

        if (!cancelled) {
          setData(res.data.data ?? null)
        }
      } catch (err) {
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => {
      cancelled = true
    }
  }, [skip, ...deps])

  return { data, loading, error }
}
