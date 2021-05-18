import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import _ from 'lodash'
import Header from '../components/header'
import CreatePost from '../components/createPost'
import { QUERY_USER_PROFILE, QUERY_POSTS } from '../graphql/query'
import PostModal from '../components/postModal'
import Post from '../components/post'

interface PostComponentProps {
  me: any
  setVisible: any
}

const Container = styled.div`
  background: #f0f2f5;
  height: 100vh;
`
const PostContainer = styled.div`
  min-width: 590px;
  width: 590px;
  height: 100px;
  margin: 0 auto;
`
const SinglePostContainer = styled.div`
  margin-top: 10px;
`

const PostLists = () => {
  const { data } = useQuery(QUERY_POSTS)
  const posts = _.get(data, 'posts', [])
  return (
    <>
      {posts.map((post: any) => (
        <SinglePostContainer key={post?.postId}>
          <Post post={post} />
        </SinglePostContainer>
      ))}
    </>
  )
}

const PostComponent = ({ me, setVisible }: PostComponentProps) => {
  return (
    <PostContainer>
      <CreatePost me={me} setVisible={setVisible} />
      <PostLists />
    </PostContainer>
  )
}
const Home = () => {
  const { data } = useQuery(QUERY_USER_PROFILE)
  const me = _.get(data, 'userProfile', {})
  const [createPostVisible, setCreatePostVisible] = useState(false)

  return (
    <Container>
      <Header me={me} />
      <PostComponent me={me} setVisible={setCreatePostVisible}></PostComponent>
      <PostModal visible={createPostVisible} setVisible={setCreatePostVisible} me={me} />
    </Container>
  )
}
export default Home
