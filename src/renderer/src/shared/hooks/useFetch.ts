import React, { useEffect, useState } from 'react'
import { fetchApi } from '../lib/api'

type Endpoint = 'project'

export function useFetch<T>(endpoint: Endpoint, deps: React.DependencyList = []) {
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    let ignore = false
    if (ignore) return

    fetchApi.get(`/${endpoint}`).then((res) => {
      if (!ignore) {
        setData(res.data)
      }
    })

    return () => {
      ignore = true
    }
  }, [endpoint, ...deps])

  return { data }
}
