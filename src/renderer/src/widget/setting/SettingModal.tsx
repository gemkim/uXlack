import { OverlayProps } from '@renderer/shared/types/overlayProps'
import Modal from '@renderer/shared/ui/Modal/Modal'

export default function SettingModal(props: OverlayProps) {
  return (
    <Modal {...props}>
      <div className="w-[80vw] h-[80vh]"></div>
    </Modal>
  )
}
