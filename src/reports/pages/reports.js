import React,{useContext,useEffect} from "react"
import Container from '@material-ui/core/Container';
import BarChart from "../BarChart"
import DoughnutChart from  "../doughnut"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {AuthContext} from "../../shared/context/auth-context"

const useStyles = makeStyles((theme) => ({
    root: {
      position:"absolute",
      width : "100%",
      marginLeft: "70px",
      [theme.breakpoints.down('xs')]: {
          marginLeft : "0px"
  },
    },
    container: {
      padding : theme.spacing(1),
      width : "100%"
      },
    appBarSpacer: theme.mixins.toolbar,
    paper: {
      margin : theme.spacing(0,"auto"),
      padding : theme.spacing(2),
      width : "50%",

      [theme.breakpoints.down('sm')] :{
        width : "80%"
      },
      [theme.breakpoints.down('xs')] :{
        width : "100%"
      }
  },
    gridContainer : {

    },
    gridItem : {
    }

  }));

function Reports (){
    const classes = useStyles();
    const auth = useContext(AuthContext)

    useEffect(() => {

    }, [auth.toggle])

  return (
    <div className={classes.root}>
      <div className={classes.appBarSpacer} />
        <Container maxWidth={true} className={classes.container}>
          <Paper className = {classes.paper}>
            <Grid container spacing = {1} className = {classes.gridContainer}>
              <Grid item xs = {12} className = {classes.gridItem}>             
                <DoughnutChart />
              </Grid>
              <Grid item xs = {12}>
                <BarChart />  
              </Grid>
            </Grid>
          </Paper>
      </Container>
    </div>
  )
}

export default Reports