import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {Link as Linkto} from "react-router-dom";
import Error from "../../shared/modals/error-modal"
import LinearProgress from '@material-ui/core/LinearProgress';

  const useStyles = makeStyles(theme => ({
    root : {
      width : "100%",
      position:"absolute",
      height : "100vh"
  },
    container :{
      height : "100%",
      display : "flex",
      justifyContent : "center",
      alignItems : "center"
    },
    paperitem: {
        padding : theme.spacing(5),
        [theme.breakpoints.down('xs')] :{
          width : "100%",
        }
    },
    avatar: {
      margin: theme.spacing(1),
      width: theme.spacing(7),
      height: theme.spacing(7),
      backgroundColor: theme.palette.secondary.main,
    },
    grid : {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent :'center',

    },
    gridItem : {
      margin : theme.spacing(0.5),
      [theme.breakpoints.down("xs")] : {
        width : "15rem"
      },
      width : "20rem",
      textAlign : "center"
    }
  }));

function LoginPage(props){
    const classes = useStyles();
    return(
      <div className={classes.root}>
        <Error errortext={props.error} errorUnset = {props.errorUnset}/>
        <Container component="main" className = {classes.container}>
          <CssBaseline />
            <Paper className={classes.paperitem} elevation= {3}>
            <Grid Container className = {classes.grid}>
              <Grid item className = {classes.gridItem}>
            <Typography component="h1" variant="h4">
                Expenso
              </Typography></Grid>
              <Grid item >
              <Avatar className={classes.avatar} variant  = "medium" >
              </Avatar></Grid>
              <Grid item className = {classes.gridItem}>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              </Grid>
              <Grid item className = {classes.gridItem}>
              
                <TextField
                  variant="outlined"
                  margin="normal"
                  value = {props.email}
                  required
                  autoFocus
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange = {props.handleChange}
                /></Grid>
                <Grid item className = {classes.gridItem}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  value = {props.password}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange = {props.handleChange}
                  autoComplete="current-password"
                />
                </Grid>
                <Grid item className = {classes.gridItem}>
                <Button
                  onClick = {props.handleFormSubmit}
                  disabled = {(props.email&&props.password)?false:true}
                  name = "signIn"
                  fullWidth
                  variant="contained"
                  color="primary"
                
                >
                  Sign In
                </Button>
                </Grid>
                <Grid item className = {classes.gridItem}></Grid>
                <Grid item className = {classes.gridItem}>
                      <Linkto to="/SignUp" style = {{textDecoration:"none"}}>
                          <Link variant="button" underline = 'none'>
                              {"Don't have an account? Register"}
                          </Link>
                      </Linkto>
                      </Grid>

              </Grid>
              { props.loading && <LinearProgress color = "secondary"/>}
            </Paper>
    </Container>
    </div>
    )
}
export default LoginPage