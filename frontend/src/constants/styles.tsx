import styled from 'styled-components'
interface MaskProps {
  opacity?: number
}
export const Mask = styled.div<MaskProps>`
  background: ${(p) => `rgba(255, 255, 255,${p.opacity ? p.opacity : '0.8'})`};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding-top: 10%;
`
