import React from 'react'
import styled from 'styled-components'
import { FaUpload, FaList, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const StyledHeader = styled.div`
  background-color: #3E92CC;
  color: white;
  padding: 1.5rem 3rem;

  a {
    text-decoration: none;
    color: inherit;
  }

  &::after {
    content: "";
    clear: both;
    display: table;
  }
  
  .left {
    float: left;
    font-weight: bolder;
    font-size: 2rem;
    background-color: white;
    padding: 0.25rem 0.20rem;
    color: #3E92CC;
    border-radius: 0.2rem;

    span {
      background-color: #3E92CC;
      color: white;
      margin: 0 0.3rem;
      padding: 0 0.3rem;
    }
  }

  .right {
    float: right;
    line-height: 2.5rem;

    li {
      float: left;
      padding: 0 1rem;

      svg {
        padding: 0 0.5rem ;
      }
    }
  }

`

const StyledBody = styled.div``

const StyledFooter = styled.div`
  text-align: center;
  width: 100%;
  background-color: #3E92CC;
  color: white;
  padding: 1rem 0;

`

const Layout = ({children}) => {
  return (
    <div>
      <StyledHeader>
        <div className='left'>
          <Link to='/'>Nise<span>Tube</span></Link>
        </div>
        <div className='right'>
          <ul>
            <li><Link to='/'><FaHome /> Home</Link></li>
            <li><Link to='/upload'><FaUpload />Upload</Link></li>
            <li><Link to='/list'><FaList /> List</Link></li>
          </ul>
        </div>
      </StyledHeader>
      <StyledBody>
        {children}
      </StyledBody>
      <StyledFooter>
        Copyright Alvin 2019
      </StyledFooter>
    </div>
  )
}

export default Layout
