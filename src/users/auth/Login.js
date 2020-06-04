import React , {useState, useContext} from "react"
import axios from "axios"
import {Redirect} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import {AuthContext} from "../../shared/context/auth-context"
import {useError} from "../../shared/hook/error-hook"
import {useLoading} from "../../shared/hook/loading-hook"

export default function SignIn() {
  
  const auth = useContext(AuthContext)
  const [email,setEmail] = useState("")
  const [password ,setPassword ] = useState("")
  const [error,errorSet,errorUnset] = useError()
  const [loading,setLoad,unsetLoad] = useLoading()

  function handleChange(event){
    if (event.target.name === "email")
    setEmail(event.target.value)
    else
    setPassword(event.target.value) 
  }

  const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/user/login`

  async function handleFormSubmit(){
    setLoad()
    await axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' },
      data: {email,password}
      })
      .then(result => {
        const {userId,userName,theme} = result.data
        unsetLoad()
        errorSet("Login Succesful")
        auth.login(userId,userName,theme)
        }).catch((error)=>{
          unsetLoad()
          if(error.response)
          errorSet(error.response.data.message)
          else
          console.log(error)
          
        })
  }

  if (auth.isLoggedIn){
    return (
      <Redirect to = "/Dashboard"/>
    )}

  else {
  return (
    <LoginPage 
          handleChange = {handleChange} 
          handleFormSubmit = {handleFormSubmit}
          email = {email}
          password = {password}
          error = {error}
          errorUnset= {errorUnset}
          loading={loading}
          />
  )
  }
}