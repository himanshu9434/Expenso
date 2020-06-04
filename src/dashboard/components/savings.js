import React , {useState,useEffect,useContext}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import axios from "axios";
import {AuthContext} from "../../shared/context/auth-context"
import {useError} from "../../shared/hook/error-hook"
import Error from "../../shared/modals/error-modal"
import {useLoading} from "../../shared/hook/loading-hook"
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles(theme=>({
  entryDate: {
    alignSelf:"flex-start",
    flex: 1,
  },
}));

export default function Deposits(props) {
  const classes = useStyles();
  const [amount,setAmount]=useState(0)
  const [loading,setLoad,unsetLoad] = useLoading()
  let d =new Date()
  const [error,errorSet,errorUnset] = useError()
  const auth = useContext(AuthContext)
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]
  useEffect(() => {
    if (auth.userId){
      setLoad()
      const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/expense/savings/${auth.userId}`
      axios({
        method: 'get',
        url: `${API_PATH}`,
        headers: { 'content-type': 'application/json' },
        })
        .then(result => {
            unsetLoad()
            setAmount(result.data.savingsAmount)
          }).catch(error=>{
              unsetLoad()
              errorSet("Connection Failed. Kindly Refresh")
          })
        }
  
    }, [auth.userId,auth.toggle])

  return (
    <React.Fragment>
      
      <Error errortext={error} errorUnset={errorUnset} />
      <Title>Current Savings</Title>
      {(amount>0)?
            <Typography component="p" variant="h4"  >
          {`₹${amount}`}</Typography>
        :<Typography component="p" variant="h4"  color = "secondary">
          {`₹${amount}`}</Typography>
        }
      
      <Typography color="textSecondary" className = {classes.entryDate}>
        on {`${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()} `}
      </Typography>
      { loading && <LinearProgress color = "secondary"/>}
    </React.Fragment>
  );
}

