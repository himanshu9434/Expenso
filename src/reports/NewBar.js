import React, {useState, useContext, useEffect} from "react"
import {BarChart , CartesianGrid , XAxis , YAxis, Tooltip , Legend , Bar, ResponsiveContainer} from "recharts"
import axios from "axios"
import {AuthContext} from "../shared/context/auth-context"


function NewBarChart (props) {
    
    const [rows,setRows] = useState([0,0,0,0,0,0])
    const auth = useContext(AuthContext)

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
                console.log("Connection Failed. Kindly Refresh")
            })
          }
    
      }, [auth.toggle,auth.userId])

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
        <ResponsiveContainer height = "80vh">        
            <BarChart data = {data} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey = "time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
        </ResponsiveContainer>

    )
}
export default  NewBarChart