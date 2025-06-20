import { IconCheck } from "@renderer/shared/assets/svgs";
import { useToast } from "@renderer/shared/hooks/useToast";
import { cn } from "@renderer/shared/lib/utils/utils";
import { createPortal } from "react-dom";


export const Toast = () => {
  const { toasts } = useToast();

  return createPortal(
    <div className="fixed bottom-0 left-1/2 z-[9999] pb-[10px] -translate-x-1/2 flex flex-col items-center gap-[10px]">
      {toasts.map(({ id, visible, message, type }) => (
        <div
          key={id}
          className={cn(
            "relative overflow-hidden rounded border-l-[5px] transition-all duration-300 ease-in-out",
            visible ? "opacity-100 animate-toast-up" : "opacity-0 translate-y-full",
            type === "success" && "border-l-[#0C9463]",
            type === "error" && "border-l-[#e8392c]",
            type !== "success" && type !== "error" && "border-l-[#333A73]" // default
          )}
        >
          <div
            className={cn(
              "flex items-center gap-[5px] px-[16px] bg-white py-[8px] border border-l-0",
              type === "success" && "border-[#0C9463]",
              type === "error" && "border-[#e8392c]",
              type !== "success" && type !== "error" && "border-[#dbdbdb]"
            )}
          >
            <span className="flex items-center">
              <IconCheck />
            </span>
            <span className={cn(
              'text-[14px]',
              type === "success" && "text-[#0C9463]",
              type === "error" && "text-[#e8392c]",
              type !== "success" && type !== "error" && "text-[#333A73]"
            )}>{message}</span>
          </div>
        </div>
      ))}
    </div>,
    document.body
  );
};
