import React from 'react'

interface userAvatarProps 
  extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

export default function UserAvatar(props: userAvatarProps) {
  return (
    <img src="test" alt="test" />
  )
}
