import React ,{useState,useContext} from 'react';
import axios from "axios"
import validate from "validate.js"
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import {MuiPickersUtilsProvider,DatePicker} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import LinearProgress from '@material-ui/core/LinearProgress';
import {AuthContext} from "../../shared/context/auth-context"
import {useSnackbar} from "../../shared/hook/snackbar-hook"
import Snackbars from "../../shared/UIElements/snackbar"
import  { useLoading } from "../../shared/hook/loading-hook"




export default function AddExpense(props) {


const auth = useContext(AuthContext)
const {open,message,severity,handleSeverity,handleClose,handleMessage,handleOpen} = useSnackbar()
const [loading,setLoad,unsetLoad] = useLoading()
const [amount, setAmount] = useState('')
const modes = auth.utilities.expense_modes
const categories = auth.utilities.expense_categories
const [category,setCategory] = useState("")
const [mode, setMode] = useState("")
const [date, setDate] = useState(new Date())
const [details, setDetails] = useState()

let constraints = {
    amount:{
        numericality: {
            greaterThan: 0,
            message:"is not valid."
          }
    },
    category : {presence: {allowEmpty: false}},
    mode : {
        presence: {allowEmpty: false}
    },
    date : {
        presence: {allowEmpty: false}
    },
    
}

const submitHandler = ()=>{
    let validatorfunc = validate({amount : amount,mode:mode,category : category,date : date},constraints,{format: "flat"})
    if (validatorfunc){
        handleSeverity("error")
        handleMessage(validatorfunc[0])
        handleOpen()
    }
    else{
        setLoad()

    const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/expense/add/${auth.userId}`
    axios({
    method: 'post',
    url: `${API_PATH}`,
    headers: { 'content-type': 'application/json' },
    data:{amount:amount,
        category:category,
        mode:mode,
        date:date,
        details:details}
    })
    .then(result => {
            console.log(result)
            unsetLoad()
            handleSeverity("success")
            handleMessage("Expense Added")
            handleOpen()
            setAmount("")
            setCategory(categories[0])
            setMode(modes[0])
            setDate(new Date())
            setDetails("")
            props.unsetLoad()
            auth.setToggle(!auth.toggle)
        }).catch(error=>{
            unsetLoad()
            handleSeverity("error")
            if(error.response.data.message){
                handleMessage(error.response.data.message)}
            else
                {handleMessage("Something went wrong")}

            handleOpen()
            
        })
    }

}

  
  return (
    <React.Fragment>

    <Snackbars open={open} message = {message} handleClose={handleClose} severity= {severity} />
    <div>
      <Dialog open={props.loading} onClose={props.unsetLoad} aria-labelledby="Add-Expense">
        <DialogTitle id="form-dialog-title">Add Expense</DialogTitle>
        <DialogContent>
          <Grid container spacing ={1}>
            <Grid item xs = {12} sm = {6}>
                <InputLabel htmlFor="standard-adornment-amount" small>Amount</InputLabel>
                <Input
                    id="standard-adornment-amount"
                    value={amount}
                    autoFocus
                    fullWidth
                    size="small"
                    onChange={(event)=>setAmount(event.target.value)}
                    startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                />
                </Grid>
                <Grid item xs = {12} sm = {6}>
                <TextField
                    id="selectCategory"
                    select
                    label="Category"
                    fullWidth
                    required
                    defaultValue={categories[0]}
                    value={category}
                    size="small"
                    onChange={(event)=>setCategory(event.target.value)}
                >
                    {categories.map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                </TextField>
                </Grid>

                <Grid item xs = {12} sm = {6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                
                <DatePicker
                    autoOk
                    label="Select Date"
                    fullWidth
                    disableFuture
                    size="small"
                    value={date}
                    onChange={(date)=>setDate(date)}
                />
                    
                </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs = {12} sm = {6}>
                <TextField
                    id="selectMode"
                    select
                    fullWidth
                    label="Mode"
                    defaultValue={modes[0]}
                    size="small"
                    value={mode}
                    onChange={(event)=>setMode(event.target.value)}
                >
                    {modes.map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>
                    ))}
                </TextField>
                </Grid>
                        <Grid item xs = {12}>
            
                <TextField
                id="addDetails"
                fullWidth
                label="Add Details"
                size="small"    
                multiline
                rowsMax={4}
                value={details}
                onChange={(event)=>{setDetails(event.target.value)}}
                />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.unsetLoad} color="primary">
            Cancel
          </Button>
          <Button onClick={submitHandler} color="primary">
            Add Expense
          </Button>
        </DialogActions>
        { loading && <LinearProgress color = "secondary"/>}
        
      </Dialog>
    </div>
    </React.Fragment>
  );
}