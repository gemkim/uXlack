import { Frame, WindowController } from '@renderer/shared/ui'

export function HomePage() {
  return (
    <div>
      <Frame className="justify-end">
        <WindowController />
      </Frame>
    </div>
  )
}
