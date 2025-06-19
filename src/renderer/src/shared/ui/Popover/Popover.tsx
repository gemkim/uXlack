import useOnOutsideClick from '@renderer/shared/hooks/useOnOutsideClick'
import { cn } from '@renderer/shared/lib/utils/utils'
import { PopoverProps } from '@renderer/shared/types/overlayProps'
import { AnimatePresence, Variants, motion } from 'motion/react'

const popoverVariants: Variants = {
  initial: (option) => ({
    opacity: 0,
    translateX: option.isToLeft ? 30 : -30
  }),
  animate: (option) => ({
    opacity: 1,
    translateX: 0,
    translateY: option.isToTop ? '-100%' : 0,
    transition: {
      opacity: { duration: 0.2 },
      translateX: { duration: 0.2 },
      translateY: { duration: 0 }
    }
  }),
  exit: (option) => ({
    opacity: 0,
    translateX: option.isToLeft ? 30 : -30
  })
}

export default function Popover(props: PopoverProps) {
  const { isOpen, close, unmount, triggerRect, children } = props
  const { x, y, width } = triggerRect

  const ref = useOnOutsideClick(() => {
    close()
    if (unmount) {
      setTimeout(() => {
        unmount()
      }, 600)
    }
  })

  const isToLeft = x > window.innerWidth / 2
  const isToTop = y > window.innerHeight / 2
  const gap = 20
  const halfOfTriggerWidth = width / 2

  const margins = {
    marginTop: `${y}px`,
    marginBottom: `${window.innerHeight - y}px`,
    marginLeft: isToLeft ? 'auto' : `${x + gap + halfOfTriggerWidth}px`,
    marginRight: isToLeft ? `${window.innerWidth - x + gap + halfOfTriggerWidth}px` : 'auto'
  }

  return (
    <div className="fixed left-0 top-0 w-screen h-screen z-[90] pointer-events-none">
      {/* popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // transition={{ type: 'spring', duration: 5, stiffness: 200, damping: 20 }}
            variants={popoverVariants}
            ref={ref}
            custom={{ isToLeft, isToTop }}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn(
              'p-4 bg-white rounded-md max-w-[50%] w-max max-h-[50%] pointer-events-auto shadow-md border'
            )}
            style={margins}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
