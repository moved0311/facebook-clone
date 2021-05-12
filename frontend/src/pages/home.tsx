import React from 'react'
import styled from 'styled-components'
import Header from '../components/header'

const Container = styled.div`
  background: #f0f2f5;
  height: 100vh;
`

const Home = () => {
  return (
    <Container>
      <Header />
    </Container>
  )
}
export default Home
