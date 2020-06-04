
import React , {useState,useEffect,useContext } from 'react';
import {Bar} from 'react-chartjs-2';
import randomcolor from 'randomcolor'
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {AuthContext} from "../shared/context/auth-context"
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
    container:{
        width : "100%",
        height : "100%",
        display : "flex",
        flexWrap : "wrap",
        flexDirection : "column"
    },
    heading : {
        padding : "1rem",
    },
    chartContainer : {
        [theme.breakpoints.down('xs')] : {
            height : '90vw',
            width : "100%"
        }
    },
    chart : {
        [theme.breakpoints.down('xs')] : {
            height : '100%',
        }
    }

    }));

function BarChart () {
    const auth = useContext(AuthContext)

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]
    let d1 = new Date()
    let d2 = new Date()
    let d3 = new Date()
    let d4 = new Date()
    let d5 = new Date()
    let d6 = new Date()

    const [rows,setRows] = useState([])
    const [data, setData] = useState()
    const [min,setMin] = useState(0)

    useEffect(() => {
        const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/expense/charts/${auth.userId}`
        if (auth.userId){
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
    },[auth.userId,auth.toggle])

    useEffect(() => {
        if (rows.length>0){
            setData(
                {
                    datasets: [{
                        data:rows,
                        label : "Expenses",
                        backgroundColor: randomcolor(),
                    }],
                    labels: [
                        monthNames[d1.getMonth(d1.setMonth(d1.getMonth()-5))],
                        monthNames[d2.getMonth(d2.setMonth(d2.getMonth()-4))],
                        monthNames[d3.getMonth(d3.setMonth(d3.getMonth()-3))],
                        monthNames[d4.getMonth(d4.setMonth(d4.getMonth()-2))],
                        monthNames[d5.getMonth(d5.setMonth(d5.getMonth()-1))],
                        monthNames[d6.getMonth(d6.setMonth(d6.getMonth()-0))]
                    ]
                },
            )
            if (data){
            setMin( Math.min(...rows))
            }
        }
        
    }, [rows,auth.toggle])

    const classes = useStyles()

    return (
      <div  className = {classes.container} >
        <Typography component="p" variant="h5"  color = "primary" className = {classes.heading}>Expenses For last 6 Months</Typography>
        <div className = {classes.chartContainer}>
        <React.Fragment>
            <Hidden smUp>
            <Bar
                className = {classes.chart} 
                data={data}
                options = {{
                    maintainAspectRatio: false,
                    scales :  {
                        yAxes: [{
                            type: 'linear',
                            position: 'left',
                            ticks : {
                                min: min,
                            }
                        }]
                    }
                }}
            />
            </Hidden>
            <Hidden xsDown>
            <Bar
                className = {classes.chart} 
                data={data}
                options = {{
                    maintainAspectRatio: true,
                    scales :  {
                        yAxes: [{
                            type: 'linear',
                            position: 'left',
                            ticks : {
                                min: min,
                            }
                        }]
                    }
                }}
            />
            </Hidden> 
        </React.Fragment>
        </div>
        
      </div>
    );
};
export default BarChart