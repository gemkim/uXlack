import { ProjectIcon } from '@renderer/shared/ui'

export function MainNavigator() {
  return (
    <div className="p-2 h-screen bg-black flex flex-col gap-2">
      {[0, 1, 2, 3, 4].map((i) => (
        <ProjectIcon key={i} />
      ))}
    </div>
  )
}
