import React,{useState, useEffect} from 'react'
import { get } from 'axios'
import { baseurl } from '../App'
import Loading from '../image/Loading.gif'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledDiv = styled.div`
  margin: 5rem 2rem;
  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    height: 100%;
  }

  li {
    display: block;
    height: 10rem;
    background-color: #3E92CC;
    width: 30%;
    margin: 2rem 1rem;
    text-align: center;
    line-height:2;
    font-size: 2rem;
    color: white;
    font-weight: bolder;

    span {
      display: block;
      font-size: 1rem;
    }
  }
`

const List = () => {
  const [isProcessing, setIsProcessing] = useState(true)
  const [lists, setLists] = useState([])

  useEffect(() => {
    const fetchData = async () =>{
      const url = `${baseurl}getlist`
      const res = await get(url)
      setLists(res.data)
      setIsProcessing(false)
    }
    fetchData()
    
  },[])

  return (
    <StyledDiv>
      {isProcessing ? (<img src={Loading} alt="Loading" />):
      (<ul>
        {lists.map(list => 
        <li key={list.fileID}>
          <Link to={`/video/${list.fileID}`}>
            {list.originalname}
            <span>{list.ext}</span>
          </Link>
        </li>)}
      </ul>)}
    </StyledDiv>
  )
}

export default List
