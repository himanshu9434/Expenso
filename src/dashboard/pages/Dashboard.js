import React , {useContext} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from '../components/Chart';
import Savings from '../components/savings';
import LastExpenses from '../components/lastExpenses';
import {Redirect} from "react-router-dom";
import {AuthContext} from "./../../shared/context/auth-context"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    zIndex : 1,
    position: "absolute",
    marginLeft: "58px",
    [theme.breakpoints.down('xs')]: {
      marginLeft : "0px"
    },
  },


  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    width : "100%",
    [theme.breakpoints.down("xs")]: {
      width : "100vw"
    },
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom:theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));


function Dashboard(props) {

const auth = useContext(AuthContext) 
const classes = useStyles();
const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


if (!auth.userId)
    return <Redirect to = "/" />
else
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth={true} className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9} >
              <Paper className={fixedHeightPaper} elevation = {2}>
                <Chart />
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper className={fixedHeightPaper} elevation = {2}>
                <Savings/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation = {2}>
                <LastExpenses/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
export default (Dashboard)