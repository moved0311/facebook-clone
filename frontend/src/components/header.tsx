import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Avatar from './avatar'

interface HeaderProps {
  me: any
}
interface IconProps {
  src: string
}

const Container = styled.div`
  width: 100%;
  height: 56px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Icon = styled.img`
  height: 40px;
`
const InnerIcon = styled.img`
  height: 20px;
`
const GreyCircle = styled.div`
  background: #e4e6eb;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
`
const RightContainer = styled.div`
  margin-right: 16px;
  display: flex;
  align-items: center;
`
const AvatarContainer = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`
const AvatarImageContainer = styled.div`
  margin-right: 5px;
`

const WrapIcon = (props: IconProps) => {
  const { src } = props
  return (
    <GreyCircle>
      <InnerIcon src={src} alt="error" />
    </GreyCircle>
  )
}

const AvatarComponent = ({ user }: any) => {
  const { lastName } = user
  return (
    <AvatarContainer>
      <AvatarImageContainer>
        <Avatar size={28} />
      </AvatarImageContainer>
      {lastName}
    </AvatarContainer>
  )
}

const Header = ({ me }: HeaderProps) => {
  return (
    <Container>
      <Link to="/">
        <Icon src="/assets/icon/facebook.png" />
      </Link>
      <RightContainer>
        <AvatarComponent user={me} />
        <Link to="/login" onClick={() => localStorage.removeItem('token')}>
          <WrapIcon src="/assets/icon/logout.png" />
        </Link>
      </RightContainer>
    </Container>
  )
}
export default Header
