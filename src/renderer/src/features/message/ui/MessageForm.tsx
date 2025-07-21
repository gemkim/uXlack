import { MessageDto } from '@renderer/entities/message/types'
import { useMyProfile, useSelectedProjectProfileList } from '@renderer/entities/profile/model/slice'
import { ProfileDto } from '@renderer/entities/profile/types'
import { useSelectedProject } from '@renderer/entities/project/model/slice'
import ProfileIcon from '@renderer/features/profile/ui/ProfileIcon'
import { SOCKET_EVENT } from '@renderer/shared/lib/socket/conetants/socket-event'
import { useSocket } from '@renderer/shared/lib/socket/model/slice'
import { cn } from '@renderer/shared/lib/utils/utils'
import { Button } from '@renderer/shared/ui/Button/Button'
import { useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

export default function MessageForm() {
  const myProfile = useMyProfile()

  const selectedProject = useSelectedProject()
  const projectProfileList = useSelectedProjectProfileList()

  const socket = useSocket()

  const { register, handleSubmit, reset, control, setValue } = useForm<{ message: string }>()
  const message = useWatch({ control, name: 'message' })

  const isTagVisible = message ? message.includes('@') : false
  const [assigneeList, setAssigneeList] = useState<ProfileDto[]>([])

  function onSubmit(msg: { message: string }) {
    if (!myProfile) return
    if (!selectedProject) return
    if (!socket) return

    const newMessage: MessageDto = {
      projectId: selectedProject._id,
      senderId: myProfile._id!,
      content: msg.message,
      type: 'text',
      status: 'sent',
      assigneeIdList: assigneeList.map((p) => p._id)
    }

    socket.emit(SOCKET_EVENT.sendMessage, selectedProject._id, newMessage)
    reset()
    setAssigneeList([])
  }

  function handleAddAssignee(profile: ProfileDto) {
    const tagLine = message.includes('@')

    if (tagLine) {
      // @만 있을 때와 @다음에 문자가 있을 때 모두 처리
      if (!assigneeList.some((p) => p._id === profile._id)) {
        setAssigneeList((prev) => [...prev, profile])
      }

      const newMessage = message.replace(/@[^\s]*/, '')
      setValue('message', newMessage)
    }
  }

  function handleRemoveAssignee(profileId: string) {
    setAssigneeList((prev) => prev.filter((p) => p._id !== profileId))
  }

  useEffect(() => {
    setAssigneeList([])
  }, [selectedProject])

  return (
    <form className="w-full relative " onSubmit={handleSubmit(onSubmit)}>
      {isTagVisible && (
        <div className="absolute bottom-full left-0 mb-2 w-[200px] bg-white border flex flex-col rounded-md shadow-md">
          {projectProfileList.map((profile, idx) => (
            <div key={profile._id} className={cn('gap-2', idx !== 0 && 'border-t')}>
              <Button
                className="flex items-center gap-2 w-full size-full"
                type="button"
                onClick={() => handleAddAssignee(profile)}
              >
                <div className="size-8 rounded-full overflow-hidden">
                  <ProfileIcon profile={profile} />
                </div>
                <span>{profile.name}</span>
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="absolute bottom-full right-0 flex gap-2 mb-2">
        {assigneeList.map((profile) => (
          <Button
            key={profile._id}
            className="text-xs !py-0.5 !px-1 shadow-md border"
            type="button"
            onClick={() => handleRemoveAssignee(profile._id)}
          >
            @ {profile.name}
          </Button>
        ))}
      </div>
      <div className="flex w-full p-2 bg-white/20 border shadow-md rounded-md outline-0 gap-2">
        <input className="flex-1" {...register('message')} />
      </div>
    </form>
  )
}
