import { InviteDto } from '@renderer/entities/invite/types'
import { useFetch } from '@renderer/shared/hooks/useFetch'
import React, { useEffect, useState } from 'react'
import { ProfileDto } from '../../entities/profile/types/index'
import { useInviteActions } from '@renderer/entities/invite/model/slice'

/**
 * Loader 들은 최초 실행시에만 데이터를 fetch하고
 *
 * 이후 데이터의 실시간 변화는 소켓으로 처리함.
 */

export default function InviteLoader({ myProfile }: { myProfile: ProfileDto }) {
  const [hasLoaded, setHasLoaded] = useState(false)

  const { setInviteList } = useInviteActions()

  const { data: inviteDataList } = useFetch<InviteDto[]>(
    'post',
    '/invite/get-received',
    {},
    [myProfile._id],
    hasLoaded
  )

  useEffect(() => {
    if (!inviteDataList) return
    if (hasLoaded) return

    setInviteList(inviteDataList)
    setHasLoaded(true)
  }, [inviteDataList])

  return null
}
