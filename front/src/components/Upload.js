import React,{ useState, Fragment } from 'react'
import styled from 'styled-components'
import { FaUpload } from 'react-icons/fa'
import { post } from 'axios'
import Loading from '../image/Loading.gif'
import { baseurl } from '../App'

const StyledDiv = styled.div`
  width: 100vw;

  h1 {
    text-align: center;
    font-size: 5rem;
    font-weight: bolder;
    color: green;
    margin-top: 4rem;
  }

  svg {
    display: block;
    margin: 4rem auto;
    font-size: 15rem;
    color: #3E92CC;
  }

  input {
    display: block;
    margin: 2rem auto;
  }

  button {
    padding: 1.5rem 6rem;
    display: block;
    margin: 2rem auto;
    background-color: #3E92CC;
    border: none;
    font-weight: bolder;
    color: white;
  }

  img {
    display: block;
    margin: 2rem auto;
  }
`

const Upload = () => {
  const [file, setFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState({})

  const onFormSubmit = async e => {
    e.preventDefault()
    setIsProcessing(true)

    try{
      const res = await fileUpload(file)
      setStatus(res)
    }catch(err){
      console.log(err);
      setStatus({data: "Someting Wrong :("})
    }
    setIsProcessing(false)
  }
  
  const onChange = e => {
    setFile(e.target.files[0])
  }
  
  const fileUpload = (file) => {
    const url = `${baseurl}upload`
    const formData = new FormData()
    formData.append('somevideo',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }

  return (
    <StyledDiv>
      {!isProcessing ?
      (<Fragment>
        {status && status.status === 200 ? <h1>{status.data}</h1> : <h1 style={{color: "red"}}>{status.data}</h1>}
        <form onSubmit={e => onFormSubmit(e)}>
          <FaUpload />
          <input type="file" onChange={e => onChange(e)} />
          <button type="submit">Upload</button>
        </form>
      </Fragment>):
      (<img src={Loading} alt="Loading" />)}
      
    </StyledDiv>
  )
}

export default Upload
