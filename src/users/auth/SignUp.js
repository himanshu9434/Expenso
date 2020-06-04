import React ,{useState,useContext} from 'react';
import axios from 'axios';
import SignUpPage from '../pages/SignUpPage';
import {AuthContext} from "../../shared/context/auth-context"
import {useError} from "../../shared/hook/error-hook"
import {useLoading} from "../../shared/hook/loading-hook"
import {Redirect} from "react-router-dom";

function SignUp(){
  const auth = useContext(AuthContext)
  const [error,errorSet,errorUnset] = useError()
  const [loading,setLoad,unsetLoad] = useLoading()
  const [firstName,setFirstName] = useState("")
  const [lastName,setlastName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")


    function handleChange(event){
        if (event.target.name === "firstName")
        setFirstName(event.target.value)
        if (event.target.name === "lastName")
        setlastName(event.target.value)
        if (event.target.name === "email")
        setEmail(event.target.value)
        if (event.target.name === "password")
        setPassword(event.target.value)
      }

    const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/user/signup`
    
    async function handleFormSubmit() {
      setLoad()
       await axios({
        method: 'post',
        url: `${API_PATH}`,
        headers: { 'content-type': 'application/json' },
        data: {
          firstName,
          lastName,
          email,
          password,
          expense_categories : ["FOOD","ENTERTAINMENT","HEALTH","TRAVEL","BILLS","SHOPPING","OTHERS"],
          expense_modes : ["CASH", "CARD","UPI","NETBANKING","OTHERS"],
          income_modes : ["CASH", "BANK","OTHERS"]
        }
        })
        .then(result => {
          const {userId,userName,theme} = result.data
            auth.login(userId,userName,theme)
            unsetLoad()
            errorSet("Registeration Successful")
          }).catch(error=>{
            unsetLoad()
            if(error.response)
            errorSet(error.response.data.message)
          })
    };
    if (auth.isLoggedIn){
      return (
        <Redirect to = "/Dashboard"/>
      )}

    return (
    <SignUpPage 
        email = {email}
        firstName = {firstName}
        lastName = {lastName}
        password = {password}
        handleChange = {handleChange}
        handleFormSubmit = {handleFormSubmit}
        loading = {loading}
        error = {error}
        errorUnset= {errorUnset}
        />
        );
  
}
export default SignUp