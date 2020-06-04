import React , {useState, useEffect,useContext} from 'react';
import {Doughnut} from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from "axios"
import {AuthContext} from "../shared/context/auth-context"
import randomcolor from 'randomcolor'
import {MuiPickersUtilsProvider,DatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
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
        padding : "1rem"
    },
    datePicker : {
        display : "inline-block",
        paddingBottom : ".5rem",
        alignSelf : "center",
        
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

function DoughnutChart(props){

    const [apidata, setapiData] = useState([])
    const [data,setData] = useState({})
    const auth = useContext(AuthContext)
    const [selectedDate, handleDateChange] = useState(new Date());
    const [sum, setsum] = useState(0)
    const [isData , setIsData] = useState(false)

    useEffect(() => {
        const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/expense/categoryWiseMonthData/${auth.userId}`
        if(auth.userId){
        axios({
          method: 'post',
          url: `${API_PATH}`,
          headers: { 'content-type': 'application/json' },
          data : {selectedDate}
          })
          .then(result => {
                setapiData(result.data.sortedData)
                setIsData(true)
                
            }).catch(error=>{
                console.log(error.response)
            })
          }
}, [auth.toggle,auth.userId,selectedDate])

    useEffect(() => {
        let categoryLabel = apidata.map(item => item.category)
        let amountData = apidata.map(item=>item.amount)

        if (apidata.length>0)
            setsum( amountData.reduce((total,num)=>total+num))

        setData({
            labels: categoryLabel,
            datasets: [{
                data: amountData,
                backgroundColor: apidata.map(item => randomcolor())
            }]
            
        })
    }, [apidata])

    const classes = useStyles()
    return (
      <div className = {classes.container} >
        <Typography component="p" variant="h5"  color = "primary" className = {classes.heading}>Category Wise Expenditure for the Month</Typography>
        <div className = {classes.datePicker}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
        disableFuture
        autoOk = {true}
        openTo="month"
        views={["month", "year"]}
        label="Select Month And Year"
        value={selectedDate}
        onChange={handleDateChange}
      /></MuiPickersUtilsProvider></div>
      <div className = {classes.chartContainer}>
        {(sum===0 && isData) ? <h1>No Data Available. Please Add Expenses for the Given Date</h1>:
        <React.Fragment>
            <Hidden smUp>
                <Doughnut data={data} className = {classes.chart} options={{ maintainAspectRatio: false }}/>
            </Hidden>
            <Hidden xsDown>
                <Doughnut data={data} className = {classes.chart}  />
            </Hidden> 
            
        </React.Fragment>
        }
        </div>
      </div>
    );
}

export default DoughnutChart