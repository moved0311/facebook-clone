import React, { useState } from 'react'
import styled from 'styled-components'
import { Mask } from '../constants/styles'
import Card from './card'
import Avatar from './avatar'
import { useMutation } from '@apollo/client'
import { CREATE_POST } from '../graphql/mutation'
import { QUERY_POSTS } from '../graphql/query'

interface PostModalProps {
  visible: boolean
  setVisible: any
  me: any
}
interface UserComponentProps {
  me: any
}

const Center = styled.div`
  margin: 0 auto;
`
const Header = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`
const Hr = styled.div`
  width: 100%;
  height: 1px;
  background: #f0f0f0;
`
const CrossIconContainer = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e4e6eb;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 20px;
  cursor: pointer;
`
const CrossIcon = styled.img`
  width: 20px;
  height: 20px;
`
const UserComponentContainer = styled.div`
  height: 72px;
  padding: 16px;
  display: flex;
  align-items: center;
`
const UserName = styled.div`
  margin-left: 10px;
`
const PostContentContainer = styled.textarea`
  width: 100%;
  height: 154px;
  border: none;
  padding: 0 16px 16px;
  resize: none;
  outline: none;
  font-size: 24px;
`
const AddToYourPostContainer = styled.div`
  width: 100%;
  height: 58px;
  border-radius: 8px;
  border: 1px solid #d7d8db;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  padding: 16px;
`
const Bottom = styled.div`
  padding-left: 16px;
  padding-right: 16px;
`

interface ButtonProps {
  isDisable: boolean
}
const Button = styled.div<ButtonProps>`
  cursor: ${(p) => (p.isDisable ? 'not-allowed' : 'pointer')};
  font-size: 15px;
  background: ${(p) => (p.isDisable ? '#e4e6eb' : '#1877f2')};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  height: 36px;
  margin-top: 16px;
`
const IconContainer = styled.div`
  width: 240px;
  display: flex;
  justify-content: space-around;
`
interface IconProps {
  backgroundPos: string
  backgroundSize: string
  image: string
}
const Icon = styled.div<IconProps>`
  height: 24px;
  width: 24px;
  background-image: ${(p) => `url(${p.image})`};
  background-position: ${(p) => p.backgroundPos};
  background-size: ${(p) => p.backgroundSize};
  background-repeat: no-repeat;
  display: inline-block;
`

const UserComponent = ({ me }: UserComponentProps) => {
  const { lastName } = me
  return (
    <UserComponentContainer>
      <Avatar size={40} />
      <UserName>{lastName}</UserName>
    </UserComponentContainer>
  )
}
const AddToYourPost = () => {
  return (
    <AddToYourPostContainer>
      Add to Your Post
      <IconContainer>
        <Icon backgroundPos="0px -130px" backgroundSize="26px 328px" image="/assets/icon/post.png" />
        <Icon backgroundPos="0px -52px" backgroundSize="26px 328px" image="/assets/icon/post.png" />
        <Icon backgroundPos="0px -26px" backgroundSize="26px 328px" image="/assets/icon/post.png" />
        <Icon backgroundPos="0px -286px" backgroundSize="26px 312px" image="/assets/icon/post1.png" />
        <Icon backgroundPos="0px 0px" backgroundSize="26px 52px" image="/assets/icon/post2.png" />
      </IconContainer>
    </AddToYourPostContainer>
  )
}

function PostModal({ visible, setVisible, me }: PostModalProps) {
  const [content, setContent] = useState('')

  // mutation
  const [createPost] = useMutation(CREATE_POST, {
    onCompleted: () => {
      setContent('')
      setVisible(false)
    },
  })

  const handlePost = () => {
    let input = { content }
    createPost({
      variables: { input },
      refetchQueries: [
        {
          query: QUERY_POSTS,
        },
      ],
    })
  }
  return (
    <>
      {visible && (
        <Mask opacity={0.3}>
          <Center>
            <Card width={500} height={428}>
              <Header>
                <Title>Create Post</Title>
                <CrossIconContainer onClick={() => setVisible(false)}>
                  <CrossIcon src="/assets/icon/cross.png" alt="cross" />
                </CrossIconContainer>
              </Header>
              <Hr />
              <UserComponent me={me} />
              <PostContentContainer
                placeholder={`What's on your mind, ${me.lastName}`}
                onChange={(e) => setContent(e.target.value)}
              />
              <Bottom>
                <AddToYourPost />
                <Button isDisable={content.length === 0} onClick={() => handlePost()}>
                  Post
                </Button>
              </Bottom>
            </Card>
          </Center>
        </Mask>
      )}
    </>
  )
}

export default PostModal
