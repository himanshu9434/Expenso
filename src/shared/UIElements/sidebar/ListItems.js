import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import {Link as Linkto } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Copyright from "../copyright"
const useStyles = makeStyles(theme=> ({
    list :{
      display : "flex",
      flexDirection : "column",
    },
    link :{
      color : theme.palette.primary.dark,
      paddding : theme.spacing (2),
      marginBottom : theme.spacing(1.5),
      backgroundImage : `linear-gradient(120deg ,transparent 0%,transparent  50%  , ${theme.palette.secondary.main}  50%)`,
      backgroundSize :"250%",
      transition : 'all .2s ease',
      '&:hover' : {
        color : 'white',
        backgroundPosition : "100%",
        fontWeight : "900",
        transform : "translateX(10px)"
      },
    },
    icon : {
      color: "inherit",
      fontWeight : "inherit"
    },
    text : {
      fontWeight : "900",
    },

    dense : {
      fontWeight : "900"
    }

}))

function DrawerList ({handleDrawerClose,open}) {
  const classes = useStyles()
  return(
  <List className = {classes.list}>
    <Linkto to ="/Dashboard" style={{ textDecoration: 'none' }} onClick = {handleDrawerClose}>
    <ListItem button className = {classes.link}> 
      <ListItemIcon className = {classes.icon}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText dense primary="Dashboard" className = {classes.text}/>
    </ListItem>
    </Linkto>
    <Linkto to="/Expenses"   style={{ textDecoration: 'none' }} onClick = {handleDrawerClose}>
    <ListItem button className = {classes.link} >
      <ListItemIcon className = {classes.icon}>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Expense" className = {classes.text}/>
    </ListItem>
    </Linkto>
    <Linkto to="/Incomes"   style={{ textDecoration: 'none' }}  onClick = {handleDrawerClose}>
    <ListItem button className = {classes.link}>
      <ListItemIcon className = {classes.icon}>
        <PeopleIcon />
      </ListItemIcon >
      <ListItemText primary="Income" className = {classes.text} />
    </ListItem>
    </Linkto>
    <Linkto to="/Reports"  style={{ textDecoration: 'none' }}  onClick = {handleDrawerClose}>
    <ListItem button className = {classes.link}>
      <ListItemIcon className = {classes.icon} >
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" className = {classes.text}/>
    </ListItem>
    </Linkto>
    <Linkto to="/Profile"  style={{ textDecoration: 'none'}} onClick = {handleDrawerClose}>
    <ListItem button className = {classes.link}>
      <ListItemIcon className = {classes.icon} >
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" className = {classes.text}/>
    </ListItem>
    </Linkto>
    <Linkto to="/Settings"  style={{ textDecoration: 'none'}} onClick = {handleDrawerClose}>
    <ListItem button className = {classes.link}>
      <ListItemIcon className = {classes.icon} >
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" className = {classes.text}/>
    </ListItem>
    </Linkto>
    {open && <Copyright style={{alignSelf:"flex-end" }}/>}
    </List>

  )
}
export default DrawerList
