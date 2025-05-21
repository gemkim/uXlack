import { useProjectActions } from '@renderer/entities/project/model/slice'
import { ProjectDto } from '@renderer/entities/project/types/types'
import { useFetch } from '@renderer/shared/hooks/useFetch'
import { useEffect, useState } from 'react'
import { ProfileDto } from '../../entities/profile/types/index'

/**
 * Loader 들은 최초 실행시에만 데이터를 fetch하고
 *
 * 이후 데이터의 실시간 변화는 소켓으로 처리함.
 */

export default function ProjectLoader({ myProfile }: { myProfile: ProfileDto }) {
  const [hasLoaded, setHasLoaded] = useState(false)

  const { addProjectList } = useProjectActions()

  const { data: projectDataList } = useFetch<ProjectDto[]>(
    'post',
    '/project/getProjectList',
    { profileId: myProfile._id },
    [myProfile._id],
    hasLoaded
  )

  useEffect(() => {
    if (!projectDataList) return
    if (hasLoaded) return

    addProjectList(projectDataList)
    setHasLoaded(true)
  }, [projectDataList])

  return null
}
