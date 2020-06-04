import React , {useState,useEffect,useContext} from "react"
import axios from "axios"
import MaterialTable,{MTableToolbar} from 'material-table'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {AuthContext} from "../../shared/context/auth-context"
import {useError} from "../../shared/hook/error-hook"
import Error from "../../shared/modals/error-modal"
import {useSnackbar} from "../../shared/hook/snackbar-hook"
import Snackbars from "../../shared/UIElements/snackbar"
import {useLoading} from "../../shared/hook/loading-hook"
import LinearProgress from '@material-ui/core/LinearProgress';

import {MuiPickersUtilsProvider,DatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
 
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width : "95vw",
        zIndex : 1,
        position:"absolute",
        marginLeft: "58px",
        height : "100%",
        [theme.breakpoints.down('xs')]: {
          marginLeft : 0,
          width : "100vw",
        },
    },
  
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
    },
    container: {
      paddingTop: theme.spacing(2),
      paddingBottom:theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflowX: "auto",
      flexDirection: 'column',
    },
    toolbarContainer : {
      display : "flex",
      alignItems : "flex-end",
    },
    formControl: {
      flexBasis : "9rem",
      marginLeft : theme.spacing(2),
    },
    datePickerClass : {
      marginLeft : theme.spacing(1),
      flexBasis : "9rem"
    },
    button : {
      marginLeft :theme.spacing(1),
      paddingRight: theme.spacing(1),
      marginRight : "auto",
    },
    amount : {
      alignSelf : "flex-end",
      paddingRight: theme.spacing(2),
      textAlign: "right",
      transition : "all , .2s"
    }
  }));
  
const AllExpenses =()=>{
    const classes = useStyles();
    const [rows,setRows] = useState([])
    const [totalAmount,setTotalAmount] = useState(0)
    const [timePeriod, setTimePeriod] = useState('today')
    const [datePicker,setDatePicker] = useState(false)
    const [startTime,setStartTime] = useState(new Date())
    const [endTime,setEndTime] = useState(new Date())
    const {open,message,severity,handleSeverity,handleClose,handleMessage,handleOpen} = useSnackbar()
    const auth = useContext(AuthContext)
    const [loading,setLoad,unsetLoad] = useLoading()
    const [error,errorSet,errorUnset] = useError()

    const handleChange = (event) => {
      setTimePeriod(event.target.value);
    };

    let expense_categories = auth.utilities.expense_categories
    let expense_modes = auth.utilities.expense_modes
    useEffect(() => {
        const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/expense/${auth.userId}`
        setLoad()
        if (auth.userId){
        axios({
          method: 'get',
          url: `${API_PATH}`,
          headers: { 'content-type': 'application/json' },
          })
          .then(result => {
            unsetLoad()
            setTimePeriod('today')
            setRows(result.data.expenses)
            }).catch(error=>{
                unsetLoad()
                if(error.response){
                    errorSet(error.response.data.message)}
                else{
                    errorSet("Something went wrong")}
            })}
    
      }, [auth.userId,auth.toggle])

      const handleClick = ()=>{
        const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/expense/getExpenseByTime/${auth.userId}`
        setLoad()
        if(auth.userId){
        axios({
          method: 'post',
          url: `${API_PATH}`,
          headers: { 'content-type': 'application/json' },
          data : {
            startTime,
            endTime
          }
          })
          .then(result => {
            unsetLoad()
            setRows(result.data.expenses)
            }).catch(error=>{
              unsetLoad()
              if(error.response){
                  errorSet(error.response.data.message)}
              else{
                  errorSet("Something went wrong")}
            })
          }
      } 

      useEffect(()=>{
        let date = new Date()
        let month = date.getMonth()
        let year = date.getFullYear()
        switch (timePeriod) {
          case "today" : {
            let month = date.getMonth()
            let year = date.getFullYear()
            let day = date.getDate()
            setStartTime(new Date(year,month,day,0))
            setEndTime(new Date())
            setDatePicker(false)
            break
          }
          case "thisMonth" : {
            setStartTime(new Date (year,month,1))
            setEndTime(new Date())
            setDatePicker(false)
            break
            
          }
          case "lastMonth" : {
            setStartTime(new Date(year,month-1))
            setEndTime(new Date (new Date(year, month)-1))
            setDatePicker(false)
            break
          }
          case "lastThreeMonth" : {
            const month = date.getMonth()-2
            const year = date.getFullYear()
            setStartTime(new Date(year,month))
            setEndTime(new Date ())
            setDatePicker(false)
            break
          }
          case "allTime" : { 
            setStartTime(new Date(1970))
            setEndTime(new Date())
            setDatePicker(false)
            break
          }
          case "custom" : {
            let month = date.getMonth()
            let year = date.getFullYear()
            let day = date.getDate()
            setStartTime(new Date(year,month,day,0))
            setEndTime(new Date())
            setDatePicker(true)
            break
          }
          default : {}
        }
      },[timePeriod])

      useEffect(()=>{
        if(rows.length>0){
          setTotalAmount(rows.map(item => item.amount).reduce((total,num)=> {return total + num}))
        }
        else {
          setTotalAmount(0)
        }
      },[rows])
    return(
    <div className={classes.root} style = {{overflowY : "scroll"}}>
    <Snackbars open={open} message = {message} handleClose={handleClose} severity= {severity} />
    <Error errortext={error} errorUnset={errorUnset} />
      <main className={classes.content} >
        <div className={classes.appBarSpacer} />
        <Container maxWidth={true} className={classes.container}>
            <Paper >
                <MaterialTable            
                    title={<Typography 
                    component="p" 
                    variant="h5" 
                    color = "primary" 
                    className = {classes.heading}
                    >All Expenses</Typography>}
                    columns={[
                        {title: 'Amount', field: 'amount' , required : true},
                        { title: 'Category', field: 'category', 
                            lookup : expense_categories.reduce((obj,curr) => ({...obj , [curr] : `${curr}`}),{})
                           },
                            
                        { title: 'Mode', field: 'mode',
                            lookup : expense_modes.reduce((obj,curr) => ({...obj , [curr] : `${curr}`}),{})
                    },
                        { title: 'Date', field: 'date', type: 'date' , required : true },
                        { title: 'Details', field: 'details' },
                    ]}
                    data={rows}
                    options={{
                        exportButton: true,
                        grouping: true,
                    }}
                    components={{
                      Toolbar: props => (
                        <div>
                          <MTableToolbar {...props} />
                          <div className = {classes.toolbarContainer}>
                            <FormControl className={classes.formControl}>
                              <InputLabel id="select-time-period">Select Time Period</InputLabel>
                              <Select
                                labelId="select-time-period"
                                id="select-time"
                                value={timePeriod}
                                onChange={handleChange}
                              >
                                <MenuItem value={"today"}>Today</MenuItem>
                                <MenuItem value={"thisMonth"}>This Month</MenuItem>
                                <MenuItem value={"lastMonth"}>Last Month</MenuItem>
                                <MenuItem value={"lastThreeMonth"}>Last 3 Months</MenuItem>                                
                                <MenuItem value={"allTime"}>All Time</MenuItem>
                                <MenuItem value={"custom"}>Custom</MenuItem>
                              </Select>
                              </FormControl>
                              {(datePicker) && 
                                <div className = {classes.datePickerClass}>
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <DatePicker
                                  variant="inline"
                                  disableFuture
                                  autoOk = {true}
                                  
                                  views={["date","month", "year"]}
                                  label="Select Start Date"
                                  value={startTime}
                                  onChange={setStartTime}
                                  /></MuiPickersUtilsProvider>
                                </div>}
                              {(datePicker) && 
                                <div className = {classes.datePickerClass}>
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <DatePicker
                                  variant="inline"
                                  disableFuture
                                  autoOk = {true}
                                  
                                  views={["date","month", "year"]}
                                  label="Select End Date"
                                  value={endTime}
                                  onChange={setEndTime}
                                  /></MuiPickersUtilsProvider>
                                </div>
                              }
                              <Button variant="outlined" size="small" className = {classes.button} onClick = {handleClick}>Fetch</Button>
                              <div className = {classes.amount}>
                                  <Typography 
                                  component="p" 
                                  variant="h6" 
                                  color = "secondary" 
                                  className = {classes.heading}
                                  >{`Total Amount : ${totalAmount}`}</Typography>
                                  </div>
                          </div>
                        </div>
                      ),
                    }}
                      editable={{
                        onRowUpdate: (newData, oldData) =>{
                            const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/expense/update/${oldData.id}`
                            return axios({
                                method: 'patch',
                                url: `${API_PATH}`,
                                headers: { 'content-type': 'application/json' },
                                data : {newData}
                                })
                                .then(result => {
                                      const data = rows
                                      const index = data.indexOf(oldData)
                                      data[index] = result.data.expense
                                      setRows(data)                        
                                      handleSeverity("success")
                                      handleMessage("Expense Updated")
                                      auth.setToggle(!auth.toggle)
                                      handleOpen()
                                  }).catch(error=>{
                                    if(error.response){handleMessage(error.response.data.message)}
                                    else{handleMessage("Something went wrong")}

                                    handleSeverity("error")  
                                    handleOpen()

                                  })
                        },
                        onRowDelete: oldData =>{
                            const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/expense/delete/${oldData.id}`
                            return axios({
                                method: 'delete',
                                url: `${API_PATH}`,
                                headers: { 'content-type': 'application/json' }
                            })
                            .then(result => {
                                let data = rows
                                const index = data.indexOf(oldData)
                                data.splice(index,1)
                                setRows(data)
                                handleSeverity("success")
                                handleMessage("Expense Deleted")
                                auth.setToggle(!auth.toggle)
                                handleOpen()

                            }).catch(error => {
                                if(error.response){
                                    handleMessage(error.response.data.message)
                                }
                                else{
                                    handleMessage("Something went wrong")}
                                
                                handleSeverity("error")  
                                handleOpen()
                            })
                        }
                      }}
                />
                { loading && <LinearProgress color = "secondary"/>}
            </Paper>
        </Container>
      </main>
    </div>
    )
}
export default AllExpenses