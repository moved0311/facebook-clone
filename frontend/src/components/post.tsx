import React from 'react'
import styled from 'styled-components'
import Card from './card'
import Avatar from './avatar'

interface HeaderProps {
  author: any
}

const HeaderContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`
const UserInfoContainer = styled.div`
  flex: 1;
  margin-left: 10px;
`
const MoreOptionContainer = styled.div`
  cursor: pointer;
`
const MoreOptionIcon = styled.img`
  width: 20px;
  height: 20px;
`
const UserName = styled.div`
  font-size: 15px;
  font-weight: bold;
`

const Header = ({ author }: HeaderProps) => {
  const { firstName, lastName } = author
  return (
    <HeaderContainer>
      <Avatar size={38} />
      <UserInfoContainer>
        <UserName>{`${firstName}${lastName}`}</UserName>
      </UserInfoContainer>
      <MoreOptionContainer>
        <MoreOptionIcon src="/assets/icon/more-options.png" alt="more option" />
      </MoreOptionContainer>
    </HeaderContainer>
  )
}

function Post({ post }: any) {
  const { content, author } = post
  return (
    <Card padding="12px 16px">
      <Header author={author}></Header>
      <div>{content}</div>
    </Card>
  )
}

export default Post
