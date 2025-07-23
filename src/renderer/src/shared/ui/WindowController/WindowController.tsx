import { IconClose, IconExpand, IconLine } from '@renderer/shared/assets/svgs'

export default function WindowController() {
  const handleMinimizeClick = () => window.electron.ipcRenderer.send('window-minimize')
  const handleMaximizeClick = () => window.electron.ipcRenderer.send('window-maximize')
  const handleCloseClick = () => window.electron.ipcRenderer.send('window-close')

  return (
    <div className='flex gap-2 items-center group'>
      &nbsp;
      <button
        className='size-[13px] rounded-full p-0.5 bg-[#FFBD2E] flex items-center justify-center'
        onClick={handleMinimizeClick}
      >
        <IconLine className='size-[10px] opacity-0 group-hover:opacity-100 transition-opacity' />
      </button>
      <button
        className='size-[13px] rounded-full p-0.5 bg-[#28C840] flex items-center justify-center'
        onClick={handleMaximizeClick}
      >
        <IconExpand className='size-[10px] opacity-0 group-hover:opacity-100 transition-opacity' />
      </button>
      <button
        className='size-[13px] rounded-full p-0.5 bg-[#FF5F57] flex items-center justify-center'
        onClick={handleCloseClick}
      >
        <IconClose className='size-[10px] opacity-0 group-hover:opacity-100 transition-opacity' />
      </button>
    </div>
  )
}
