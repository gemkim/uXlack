import { useProjectActions } from '@renderer/entities/project/model/slice'
import { ProjectDto } from '@renderer/entities/project/types/types'
import { useFetch } from '@renderer/shared/hooks/useFetch'
import { useEffect, useState } from 'react'
import { ProfileDto } from '../../entities/profile/types/index'
import { useMessageActions } from '@renderer/entities/message/model/slice'
import { useInviteActions } from '@renderer/entities/invite/model/slice'

/**
 * Loader 들은 최초 실행시에만 데이터를 fetch하고
 *
 * 이후 데이터의 실시간 변화는 소켓으로 처리함.
 */

export default function BootstrapLoader({ myProfile }: { myProfile: ProfileDto }) {
  const [hasLoaded, setHasLoaded] = useState(false)

  const { addProjectList } = useProjectActions()
  const { setMessageListByProjectId } = useMessageActions()
  const { setInviteList } = useInviteActions()

  const { data: bootstrapData } = useFetch<any>(
    'post',
    '/auth/bootstrap',
    {},
    [myProfile._id],
    hasLoaded
  )

  useEffect(() => {
    console.log(bootstrapData)
    if (!bootstrapData) return
    if (hasLoaded) return

    console.log(bootstrapData)

    addProjectList(bootstrapData.projectList)
    setInviteList(bootstrapData.inviteList)
    setMessageListByProjectId(bootstrapData.messageListByProjectId)

    setHasLoaded(true)
  }, [bootstrapData])

  return null
}
