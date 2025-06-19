import { cn } from "@renderer/shared/lib/utils/utils";

// 🔹X 모양 버튼
interface CloseButtonPropsType {
  customClass?: string
  onClose: () => void
}

export function CloseButton ({
  customClass, 
  onClose
}:CloseButtonPropsType) {
  function handleClose () {
    onClose();
  }
  return (
    <button
      type="button"
      onClick={handleClose}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleClose();
        }
      }}
      className={
        cn('absolute top-0 right-0 w-[20px] h-[20px] overflow-hidden inline-block text-[0px] group', customClass&&customClass)
      }
      aria-label="닫기"
    >
      <span
        className="absolute top-1/2 left-1/2 w-[3px] h-full rounded bg-[#999]
          transition duration-200 ease-in-out
          translate-x-[-50%] translate-y-[-50%] rotate-[-45deg]
          group-hover:bg-[#444] group-hover:rotate-[45deg]"
      ></span>
      <span
        className="absolute top-1/2 left-1/2 w-[3px] h-full rounded bg-[#999]
          transition duration-200 ease-in-out
          translate-x-[-50%] translate-y-[-50%] rotate-[45deg]
          group-hover:bg-[#444] group-hover:rotate-[135deg]"
      ></span>
    </button>
  )
}