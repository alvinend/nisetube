import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  margin: 3rem 0;

  video {
    max-width: 80vw;
    display : block;
    margin: 0 auto;
  }
`

const Video = (props) => {
  
  return (
    <StyledDiv>
      <video id="videoPlayer" controls>
        <source src={`http://localhost:5000/video/${props.match.params.videoID}`} type="video/mp4" />
      </video>
    </StyledDiv>
  )
}

export default Video
