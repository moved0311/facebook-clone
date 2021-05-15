import React from 'react'
import styled from 'styled-components'
import Card from './card'
import Avatar from './avatar'

interface CreatePostProps {
  me: any
  setVisible: any
}

const CreatePostContainer = styled.div`
  padding: 12px 16px 10px;
`
const Header = styled.div`
  display: flex;
  align-items: center;
`
const CreatePostInput = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border-width: 0;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  color: #65676b;
  padding: 8px 12px;
  margin-left: 10px;
  cursor: pointer;
`
const CreatePost = ({ me, setVisible }: CreatePostProps) => {
  const { lastName } = me
  return (
    <Card mt={10}>
      <CreatePostContainer>
        <Header>
          <Avatar size={40} />
          <CreatePostInput onClick={() => setVisible(true)}>What's on your mind, {lastName}</CreatePostInput>
        </Header>
      </CreatePostContainer>
    </Card>
  )
}
export default CreatePost
