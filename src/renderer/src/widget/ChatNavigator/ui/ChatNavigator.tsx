import { useProjectList, useSelectedProjectId } from '@renderer/entities/project'

export function ChatNavigator() {
  const projectList = useProjectList()
  const selectedProjectId = useSelectedProjectId()

  const selectedProject = projectList.find((project) => project.id === selectedProjectId)

  return (
    <div className="bg-gray-900 p-4 flex flex-col min-w-[180px] text-white">
      {selectedProject && (
        <>
          <div>
            {selectedProject.name} <br />
            <span className="text-sm">{selectedProject.memberList.length}명</span>
          </div>
          <button className="w-full text-left p-2 bg-gray-500">일정</button>

          <div className="mt-4 flex flex-col">
            <span>채팅</span>
            <button className="text-left"># 일반</button>
          </div>
        </>
      )}
    </div>
  )
}
