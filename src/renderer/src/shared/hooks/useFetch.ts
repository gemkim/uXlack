import React, { useEffect, useState } from 'react'
import { fetchApi } from '../lib/api'
import { AxiosRequestConfig } from 'axios'

export function useFetch<T>(
  endpoint: string,
  config: AxiosRequestConfig<any> = {},
  deps: React.DependencyList = []
) {
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    let ignore = false
    if (ignore) return

    fetchApi.get(endpoint, config).then((res) => {
      if (!ignore) {
        setData(res.data.data ?? null)
      }
    })

    return () => {
      ignore = true
    }
  }, [endpoint, ...deps])

  return { data }
}
