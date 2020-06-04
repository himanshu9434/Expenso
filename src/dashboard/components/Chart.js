  
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import Error from "../../shared/modals/error-modal"
import {useState,useEffect,useContext} from "react"
import axios from "axios"
import {AuthContext} from "../../shared/context/auth-context"
import {useError} from "../../shared/hook/error-hook"


export default function Chart(props) {

  const [rows,setRows] = useState([0,0,0,0,0,0])
  const [error,errorSet,errorUnset] = useError()
  const auth = useContext(AuthContext)
  const theme = useTheme();
  
  useEffect(() => {
    const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/expense/charts/${auth.userId}`
    if(auth.userId){
    axios({
      method: 'get',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' },
      })
      .then(result => {
            setRows(result.data.list)
        }).catch(error=>{
            errorSet("Connection Failed. Kindly Refresh")
        })
      }

  }, [auth.toggle,auth.userId,errorSet])

  function createData(time, amount) {
    return { time, amount };
  }
  let d1 = new Date()
  let d2 = new Date()
  let d3 = new Date()
  let d4 = new Date()
  let d5 = new Date()
  let d6 = new Date()
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
  const data = [
    createData(monthNames[d1.getMonth(d1.setMonth(d1.getMonth()-5))], rows[0]),
    createData(monthNames[d2.getMonth(d2.setMonth(d2.getMonth()-4))], rows[1]),
    createData(monthNames[d3.getMonth(d3.setMonth(d3.getMonth()-3))], rows[2]),
    createData(monthNames[d4.getMonth(d4.setMonth(d4.getMonth()-2))], rows[3]),
    createData(monthNames[d5.getMonth(d5.setMonth(d5.getMonth()-1))], rows[4]),
    createData(monthNames[d6.getMonth(d6.setMonth(d6.getMonth()-0))], rows[5]),
  ]

  return (
    <React.Fragment>
      <Error errortext={error} errorUnset={errorUnset} />
      <Title>Past 6 Months</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
                    
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary} domain={[0, 'dataMax + 1000']}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Expense
            </Label>
          </YAxis>

        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}