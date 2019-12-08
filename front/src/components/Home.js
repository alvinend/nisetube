import React from 'react'
import styled from 'styled-components'
import MainBg from '../image/main-bg.jpg'

const StyledDiv = styled.div`
  min-height: 100%;
  background-size: cover;
  background-image: url(${MainBg});

  div {
    height: 40vw;
    padding-top: 15rem;
    margin-left: 3rem;
    font-weight: bold;
    color: white;
    text-shadow: -2px -2px 2px rgba(150, 150, 150, 0.94);

    h3 {
      font-size: 3rem;
    }

    h1 {
      line-height: 6rem;
      font-size: 5rem;
    }
  }
`

const Home = () => {
  return (
    <StyledDiv>
      <div>
        <h3>ようこそ</h3>
        <h1>NiseTubeへ</h1>
      </div>
    </StyledDiv>
  )
}

export default Home
