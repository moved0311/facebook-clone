import React from 'react'
import styled from 'styled-components'

interface CardProps {
  children: any
  mt?: number
  width?: number
  height?: number
  padding?: string
}
interface ContainerProps {
  mt?: number
  width?: number
  height?: number
  padding?: string
}
const Container = styled.div<ContainerProps>`
  width: ${(p) => (p.width ? `${p.width}px` : '100%')};
  height ${(p) => p.height}px;
  background: white;
  border-radius: 8px;
  box-shadow: 0.5px 0.5px rgba(0, 0, 0, 0.2);
  margin-top: ${(p) => p.mt}px;
  padding: ${(p) => p.padding};
`

function Card({ children, mt, width, height, padding }: CardProps) {
  return (
    <Container mt={mt} width={width} height={height} padding={padding}>
      {children}
    </Container>
  )
}

export default Card
