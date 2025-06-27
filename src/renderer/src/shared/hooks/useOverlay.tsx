import { overlay, useCurrentOverlay, useOverlayData } from 'overlay-kit'
import React from 'react'

export default function useOverlay() {
  const overlayData = useOverlayData()
  const currentOverlay = useCurrentOverlay()

  /**
   * @param overlayId 오버레이 아이디
   * @returns 오버레이 존재 여부
   *
   * 입력 받은 overlayId를 가진 overlay가 열려있는지 여부를 반환
   */
  const isOverlayOpen = (overlayId: string) => overlayData[overlayId]

  /**
   * @param overlayId 특정 오버레이를 닫을 때 사용
   *
   * 인자가 없으면 최상단 오버레이를 닫음.
   *
   * 일반적인 경우 해당 함수 없이 togglePopover, toggleModal로 on/off 처리를 할 수 있지만
   *
   * trigger외의 다른 동작에서 overlay를 닫아야 하는 경우에 사용
   */
  function closeOverlay(overlayId?: string) {
    if (!currentOverlay) return

    const targetOverlayId = overlayId ?? currentOverlay

    overlay.close(targetOverlayId)
    setTimeout(() => {
      overlay.unmount(targetOverlayId)
    }, 300)
  }

  /**
   * 모든 오버레이를 닫음 (close, unmount)
   */
  function closeAllOverlay() {
    overlay.closeAll()
    setTimeout(() => {
      overlay.unmountAll()
    }, 300)
  }

  /**
   * 모달 오버레이 토글
   * @param ModalComponent 모달 컴포넌트
   * @param overlayId 모달 오버레이 아이디
   */
  function toggleModal(ModalComponent: React.ComponentType<any>, overlayId: string) {
    if (isOverlayOpen(overlayId)) {
      closeOverlay(overlayId)
    } else {
      overlay.open((controller) => <ModalComponent {...controller} />, { overlayId })
    }
  }

  /**
   * 팝오버 오버레이 토글
   * @param PopoverComponent 팝오버 컴포넌트
   * @param event 팝오버 트리거 이벤트
   * @param overlayId 팝오버 오버레이 아이디
   */
  function togglePopover(
    PopoverComponent: React.ComponentType<any>,
    event: React.MouseEvent<HTMLButtonElement>,
    overlayId: string
  ) {
    const rect = event.currentTarget.getBoundingClientRect()

    if (isOverlayOpen(overlayId)) {
      closeOverlay(overlayId)
    } else {
      overlay.open((controller) => <PopoverComponent {...controller} triggerRect={rect} />, {
        overlayId
      })
    }
  }

  return { closeOverlay, toggleModal, closeAllOverlay, togglePopover }
}
