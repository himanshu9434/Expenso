import axios from 'axios';
import {Link as Linkto } from "react-router-dom";
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Error from "../../shared/modals/error-modal"
import Loading from "../../shared/modals/loading-modal"


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
    maxWidth : "400px",
      padding : theme.spacing(5),
      display : "flex",
      flexDirection : "column",
    justifyContent : "center",
    alignItems : "center",
      [theme.breakpoints.down('xs')] :{
        width : "100%",
      }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  gridContainer : {
    padding : theme.spacing(0,2)

  },
  gridItem : {
    textAlign : "center"
  }

}));

export default function SignUpPage(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Error errortext={props.error} errorUnset = {props.errorUnset}/>
    <Container component="main" className  = {classes.container}>
    
      <CssBaseline />
      <Paper variant="outlined" className={classes.paperitem} elevation= {5}>
      <Typography component="h1" variant="h4">
                Expenso
              </Typography>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <div style = {{height : "2em"}}></div>
          <Grid container className = {classes.grid} spacing = {3}>
            <Grid item container xs = {12} spacing = {2} className = {classes.gridContainer}>
                <Grid item xs={12} sm={6} >
                  <TextField
                    autoComplete="first Name"
                    name="firstName"
                    variant="outlined"
                    value = {props.firstName}
                    required
                    fullWidth
                    id="firstName"
                    label="First name"
                    autoFocus
                    onChange = {props.handleChange}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    value = {props.lastName}
                    required
                    fullWidth
                    id="lastName"
                    label="Last name"
                    name="lastName"
                    autoComplete="lname"
                    onChange = {props.handleChange}
                    size="small"
                  />
                </Grid>
            </Grid>
            <Grid item xs={12} className = {classes.gridItem}>
              <TextField
                variant="outlined"
                value = {props.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange = {props.handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} className = {classes.gridItem}>
              <TextField
                variant="outlined"
                value = {props.password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {props.handleChange}
                size="small"
              />
            </Grid>
            <Grid container  item  xs={12} className = {classes.gridItem} justify = 'space-between' > 
            <Grid item>
                <Linkto to = "/" style = {{textDecoration:"none"}}>
              <Link variant="button" underline = 'none'>
                Sign in instead
              </Link>
              </Linkto>
            </Grid>
            <Grid item>

                <Button
                  onClick = {props.handleFormSubmit}
                  disabled = {(props.email&&props.password&&props.firstName&&props.lastName)?false:true}
                  name = "sign Up"
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
          </Grid>
            
            </Grid>
          </Grid>
      <div>{(props.response==="true" && props.response!=="") ?
            <Typography component="h1" variant="h5">Email Already Exists</Typography>:
            (props.response==="false" && props.response!=="") ?
            <Typography component="h1" variant="h5">Registration Successful</Typography>:
            <h1> </h1>
  }</div>
  
      </Paper>
      { props.loading && <LinearProgress color = "secondary"/>}
    </Container>
    </div>
  );
}