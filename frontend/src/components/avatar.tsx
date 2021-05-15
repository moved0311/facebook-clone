import React from 'react'
import styled from 'styled-components'

interface AvatarProps {
  size: number
}
interface ImageProps {
  src: string
  size: number
}
const AvatarImage = styled.img<ImageProps>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  border-radius: 50%;
`
function Avatar({ size }: AvatarProps) {
  return <AvatarImage src={`https://picsum.photos/${size}`} alt="avatar img error" size={size} />
}

export default Avatar
