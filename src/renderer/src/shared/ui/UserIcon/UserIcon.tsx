import { cn } from '@renderer/shared/lib/utils/utils'

interface UserIconProps
  extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

export default function UserIcon(props: UserIconProps) {
  const { className, src, alt, ...attrs } = props
  return (
    <img
      className={cn('rounded-full size-[40px]', className)}
      src={src}
      alt={alt ?? '유저 아이콘'}
      {...attrs}
    />
  )
}
