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
      {/* <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul> */}
    </Container>
  )
}
export default Home
