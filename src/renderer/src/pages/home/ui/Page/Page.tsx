import Frame from '@renderer/shared/ui/Frame/Frame'
import WindowController from '@renderer/shared/ui/WindowController/WindowController'

export default function HomePage() {
  return (
    <div>
      <Frame className="justify-end">
        <WindowController />
      </Frame>
    </div>
  )
}
