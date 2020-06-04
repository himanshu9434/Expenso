import React , {useState,useEffect,useContext} from "react"
import axios from "axios"
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Snackbars from "../../shared/UIElements/snackbar"
import {useSnackbar} from "../../shared/hook/snackbar-hook"
import { useLoading } from "../../shared/hook/loading-hook"
import Grid from '@material-ui/core/Grid';
import {AuthContext} from "../../shared/context/auth-context"
import LinearProgress from '@material-ui/core/LinearProgress';
    
const useStyles = makeStyles(theme => ({
    root: {
        width : "100%",
        position:"absolute"
    },
  
    appBarSpacer: theme.mixins.toolbar,
    content: {
        padding : theme.spacing(1)
    },
    paper: {
        margin : theme.spacing(0,"auto"),
        padding : theme.spacing(2),
        width : "50%",
        [theme.breakpoints.down('xs')] :{
          width : "80%"
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
  }));


const UpdateProfile =  () =>  {

    const {open,message,severity,handleSeverity,handleClose,handleMessage,handleOpen} = useSnackbar()
    const [loading,setLoad,unsetLoad] = useLoading()
    const [values, setValues] =useState({
        firstName: '',
        currentPassword: '',
        lastName: '',
        email: '',
        newPassword : '',
        showPassword: false,
        passwordToggle : true,
      });
    const auth = useContext(AuthContext)

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

    const handleApi = (prop,value) => {
        setValues((prev) => {
            return {...prev , [prop] : value}
        })
    } 

    useEffect(() => {
        const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/user/userdata/${auth.userId}`
        if (auth.userId){
        setLoad()
            axios({
            method: 'get',
            url: `${API_PATH}`,
            headers: { 'content-type': 'application/json' },
            })
            .then(result => {
                unsetLoad()
                const {firstName,lastName,email} = result.data.existingUser
                handleApi('firstName' , firstName)
                handleApi('lastName' , lastName)
                handleApi('email' , email)
            })
            .catch(error => {
                unsetLoad()
                handleSeverity("error")
                if(error.response){
                    handleMessage(error.response.data.message)}
                else
                    {handleMessage("Something went wrong. Please Refresh")}
    
                handleOpen()
            })
        }
        
    }, [auth.userId])

    const onSubmitHandler = () =>{
        let data 
        if (values.passwordToggle){
            data = {
                firstName : values.firstName,
                lastName : values.lastName,
            }
        }
        else {
            data = {
                firstName : values.firstName,
                lastName : values.lastName,
                currentPassword : values.currentPassword,
                newPassword : values.newPassword
            }
        }
        const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/user/update/${auth.userId}`
        setLoad()
        axios({
        method: 'patch',
        url: `${API_PATH}`,
        headers: { 'content-type': 'application/json' },
        data:data
        })
        .then(result => {
            const {firstName , lastName} = result.data.existingUser
            handleApi('firstName' , firstName)
            handleApi('lastName' , lastName)
            handleApi('currentPassword', "")
            handleApi('newPassword', "")
            unsetLoad()
            handleSeverity("success")
            handleMessage("Profile Updated")
            handleOpen()
        })
        .catch(error => {
            unsetLoad()
            handleSeverity("error")
            if(error.response){
                handleMessage(error.response.data.message)}
            else
                {handleMessage("Something went wrong")}

            handleOpen()
        })
        }

        const handleClickShowPassword = () => {
            setValues({ ...values, showPassword: !values.showPassword });
          };
        
          const passwordHandler = () => {
            setValues({ ...values, passwordToggle: !values.passwordToggle });
          }

      const classes = useStyles();

    return (
        <div className={classes.root}>
            <Snackbars open={open} message = {message} handleClose={handleClose} severity= {severity} />

            <div className={classes.appBarSpacer} />
            <main className={classes.content}>
                <Paper className={classes.paper} elevation = {3}>
                <Typography variant="h3" gutterBottom color = "primary"> 
                        Profile
                    </Typography>
                <Grid container spacing = {3}>
                    <Grid item md= {6} xs = {12} hidden = {!values.passwordToggle}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={values.firstName}
                            label="First Name"
                            variant="outlined"
                            onChange={handleChange('firstName')}
                            />
                    </Grid>
                    <Grid item md= {6} xs = {12}hidden = {!values.passwordToggle}>
                        <TextField
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                value={values.lastName}
                                label="Last Name"
                                variant="outlined"
                                onChange={handleChange('lastName')}
                                />
                    </Grid>
                    <Grid item xs= {12} hidden = {!values.passwordToggle}>
                        <TextField
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                value = {values.email}
                                label="Email"
                                variant="outlined"
                                disabled
                                onChange={()=>{}}
                                />
                    </Grid>
                    <Grid item xs= {12} hidden = {values.passwordToggle}>
                        <FormControl 
                            variant="outlined" 
                            fullWidth 
                            autoFill = {false}
                            InputLabelProps={{ shrink: true }}
                            >
                            <InputLabel>Current Password</InputLabel>
                            <OutlinedInput
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.currentPassword}
                                onChange={handleChange('currentPassword')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                labelWidth={125}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs= {12} hidden = {values.passwordToggle}>
                        <FormControl variant="outlined" fullWidth autoFill = {false}  >
                            <InputLabel>New Password</InputLabel>
                            <OutlinedInput
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.newPassword}
                                onChange={handleChange('newPassword')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                labelWidth={105}
                            />
                            </FormControl>
                    </Grid>
                    
                    <Grid container xs= {12} item style = {{justifyContent : "center"}} spacing = {2}>
                        <Grid  item  sm={12} md = {6} style = {{textAlign : "center"}}>
                            <Button variant="contained" color={(values.passwordToggle) ? "primary" : "secondary"} onClick = {passwordHandler}>
                            {(values.passwordToggle) ? "Change Passsword" : "Change Details"}
                            </Button>
                        </Grid>
                            <Grid item sm={12} md = {6} style = {{textAlign : "center"}}>
                                <Button variant="contained" color="primary" onClick = {onSubmitHandler}>
                                {(values.passwordToggle) ? "Update Details" : "Update Password"}
                                </Button>
                        </Grid>
                    
                    </Grid>

                </Grid>
                { loading && <LinearProgress color = "secondary"/>}
                </Paper>
            </main>
    </div>
    )
}

export default UpdateProfile
