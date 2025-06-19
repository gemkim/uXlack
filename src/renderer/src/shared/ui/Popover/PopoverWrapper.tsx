import useOnOutsideClick from "@renderer/shared/hooks/useOnOutsideClick";
import { cn } from '@renderer/shared/lib/utils/utils';
import { AnimatePresence, Variants, motion } from 'motion/react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";

// 🔹Popover.tsx와 동일 overlay 라이브러리 x, callback 받는 버전
interface PopoverWrapperPropsType {
  isOpen: boolean;
  target: HTMLElement | null;
  children?: React.ReactNode;
  onClose: () => void;
}

export interface PopoverRefType {
  refPopoverClose: () => void;
}

const popoverVariants: Variants = {
  initial: (option) => ({
    opacity: 0,
    translateX: option.isToLeft ? 30 : -30,
  }),
  animate: (option) => ({
    opacity: 1,
    translateX: 0,
    translateY: option.isToTop ? '-100%' : 0,
    transition: {
      opacity: { duration: 0.2 },
      translateX: { duration: 0.2 },
      translateY: { duration: 0 },
    },
  }),
  exit: (option) => ({
    opacity: 0,
    translateX: option.isToLeft ? 30 : -30,
  }),
};

export default(forwardRef<PopoverRefType, PopoverWrapperPropsType>( function PopoverWrapper({
  isOpen,
  target,
  children,
  onClose,
}: PopoverWrapperPropsType, ref) {
  const popoverWrapRef = useRef<HTMLDivElement | null>(null);
  const [isAni, setIsAni] = useState(isOpen);  // 사라지는 Ani를 위함.

  const { isToLeft, isToTop, margins } = useMemo(() => {
    if (!target) {
      return {
        isToLeft: false,
        isToTop: false,
        margins: {
          marginTop: '0px',
          marginBottom: 'auto',
          marginLeft: '0px',
          marginRight: 'auto',
        },
      };
    }
    const rect = target.getBoundingClientRect();
    const { x, y, width } = rect;
    const isToLeft = x > window.innerWidth / 2;
    const isToTop = y > window.innerHeight / 2;
    const gap = 20;
    const halfWidth = width / 2;

    const margins = {
      marginTop: `${y}px`,
      marginBottom: `${window.innerHeight - y}px`,
      marginLeft: isToLeft ? 'auto' : `${x + gap + halfWidth}px`,
      marginRight: isToLeft ? `${window.innerWidth - x + gap + halfWidth}px` : 'auto',
    };
    return { isToLeft, isToTop, margins };
  }, [target]);

  const popoverRef = useOnOutsideClick(() => {
    if (isAni) {
      setIsAni(false);
    }
  });

  // animation end 이후 
  const handleClose = () => {
    if(target) target.focus();
    onClose();
  };
  
  // sync
  useEffect(() => {
    setIsAni(isOpen);
  }, [isOpen]);

  // ✅ focus
  const handleAnimationComplete = useCallback(()=>{
    if(isOpen && popoverRef.current){
      popoverRef.current.focus()
    }
  },[isOpen])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab' && popoverRef.current) {
      const focusableElements: HTMLElement[] = [
        popoverRef.current,
        ...popoverRef.current.querySelectorAll<HTMLElement>(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), ' +
          'textarea:not([disabled]), button:not([disabled]), iframe, object, embed, ' +
          '[tabindex]:not([tabindex="-1"]), [contenteditable]'
        ),
      ];
      const firstFocus = focusableElements[0];
      const lastFocus = focusableElements[focusableElements.length - 1];
      if (focusableElements.length === 0) return;

      // 처음과 마지막에서 탭, 역 탭 진행 시
      if (e.shiftKey && document.activeElement === firstFocus) {
        e.preventDefault();
        lastFocus.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocus) { 
        e.preventDefault();
        firstFocus.focus();
      }
    }
    if (e.key === 'Escape') {
      setIsAni(false);
    }
  },[handleClose]);
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },[handleKeyDown]);

  // 외부에서 내부 기능 사용하기 위함(ani 사용하여 닫기 위해) 
  useImperativeHandle(ref, () => ({
    refPopoverClose: () => { // 닫기 
      setIsAni(false);
    },
  }));

  if (!target) return null;
  if (!isOpen && !isAni) return null;
  return (
    <div 
      ref={popoverWrapRef}
      className="fixed left-0 top-0 w-screen h-screen z-[90] pointer-events-none"
    >
      <AnimatePresence onExitComplete={handleClose}>
        {isAni && (
          <motion.div
            ref={popoverRef}
            tabIndex={0}
            variants={popoverVariants}
            custom={{ isToLeft, isToTop }}
            initial="initial"
            animate="animate"
            exit="exit"
            onAnimationComplete={handleAnimationComplete}
            className={cn(
              'p-4 bg-white rounded-md max-w-[50%] w-max max-h-[80%] pointer-events-auto shadow-md border'
            )}
            style={margins}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}));
