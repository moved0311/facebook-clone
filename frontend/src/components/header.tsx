import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { QUERY_USERS } from '../graphql/query'
import _ from 'lodash'

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
const AvatarImage = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
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
        <AvatarImage src="https://picsum.photos/28/28" alt="avatar img error" />
      </AvatarImageContainer>
      {lastName}
    </AvatarContainer>
  )
}

const Header = () => {
  let userId = localStorage.getItem('token')
  const { data } = useQuery(QUERY_USERS, { variables: { filter: { userId: userId } } })
  const me = _.get(data, 'users[0]', {})
  return (
    <Container>
      <Link to="/">
        <Icon src="/assets/icon/facebook.png" />
      </Link>
      <RightContainer>
        <AvatarComponent user={me} />
        <Link to="/login">
          <WrapIcon src="/assets/icon/logout.png" />
        </Link>
      </RightContainer>
    </Container>
  )
}
export default Header
