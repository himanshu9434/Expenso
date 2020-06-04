import React , {useContext,useEffect} from 'react';
import axios from "axios"
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';   
import {AuthContext} from "../shared/context/auth-context"
import AddExpense from "../expense/components/AddExpense"
import AddIncome from "../income/components/AddIncome"
import {useHistory} from "react-router-dom"
import {useLoading} from "../shared/hook/loading-hook"
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Hidden from '@material-ui/core/Hidden';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import DrawerList from "../shared/UIElements/sidebar/ListItems"


const Header = (props) =>{

    const history = useHistory()
    const auth = useContext(AuthContext)
    const [open, setOpen] = React.useState(false);
    const [incomeLoading,setIncomeLoad,unsetIncomeLoad] = useLoading()
    const [expenseLoading,setExpenseLoad,unsetExpenseLoad] = useLoading()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
  
  
    const handleMenu = (event) => setAnchorEl(event.currentTarget)
    const handleMenuClose = () => setAnchorEl(null)
    const handleDrawerOpen = () => setOpen(true)
    const handleDrawerClose = () => setOpen(false)
    const handleExpense = () => setExpenseLoad()
    const handleIncome = () => setIncomeLoad()
    const handleLogout = () => history.push("/logout") 

    useEffect(() => {
      const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/utilities/${auth.userId}`
      if (auth.userId)
      {axios({
        method: 'get',
        url: `${API_PATH}`,
        headers: { 'content-type': 'application/json' },
        })
        .then(result => {
              auth.setUtility(result.data.utilities)
          }).catch(error=>{
              console.log("Connection Failed. Kindly Refresh")
          })}
          
    }, [auth.userId])
      
    const drawerWidth = 240;
    const useStyles = makeStyles(theme => ({
        appBar: {
          position : "fixed",
            zIndex: theme.zIndex.drawer + 1,
            width : "100%",
          },
          appBarSpacer: theme.mixins.toolbar,
        menuButtonHidden: {
            display: 'none',
          },
        brandTitle: {
            textAlign : "left",
          },
          nameTitle: {
            flexGrow: 1,
            textAlign : "center",
          },
        drawerPaper : {
            position: 'fixed',
            zIndex : "999",
            height : `100vh`,
            whiteSpace: 'nowrap',
            width: drawerWidth,
            
            [theme.breakpoints.down('xs')]: {
              width:"100vw",
              padding : 0,
              display : "flex",
              alignItems : "center",
              justifyContent : "center",
            },
            transition: theme.transitions.create('all', {
              easing: theme.transitions.easing.easeIn,
              duration: theme.transitions.duration.shorter,
            }),
          },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('all', {
              easing: theme.transitions.easing.easeIn,
              duration: theme.transitions.duration.shorter,
            }),

            [theme.breakpoints.up('xs')]: {
              width: theme.spacing(9),
            },
            [theme.breakpoints.down('xs')]: {
              width:0,
            },
          },
        toolbarIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            ...theme.mixins.toolbar,
          },
        button: {
            margin: theme.spacing(1),
          },

    }));

    const classes = useStyles();
    console.log(auth)

    return(
        <React.Fragment >
            <AddExpense loading = {expenseLoading} unsetLoad = {unsetExpenseLoad}/>
            <AddIncome loading = {incomeLoading} unsetLoad = {unsetIncomeLoad} />
            <AppBar position="absolute" className={clsx(classes.appBar, )} >
                <Toolbar className={classes.toolbar}>
                    <Hidden smUp>
                      <IconButton
                          edge="start"
                          color="inherit"
                          aria-label="open drawer"
                          onClick={handleDrawerOpen}
                          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                      >
                      <MenuIcon />
                      </IconButton>
                      <IconButton onClick={handleDrawerClose}
                          edge="start"
                          color="inherit"
                          aria-label="open drawer"
                          className={clsx(classes.menuButton, !open && classes.menuButtonHidden)}>
                        <ChevronLeftIcon />
                      </IconButton>
                    </Hidden>
                    <Hidden xsDown>
                    <Link onClick = {()=>history.push("/") } style={{ textDecoration: 'none',cursor: "pointer" }}>
                    <Typography component="h1" variant="h6" color="textPrimary"  noWrap className={classes.brandTitle} >
                        EXPENSO
                      </Typography></Link>
                      </Hidden>
                    <Typography component="h1" variant="h6" color="textPrimary" noWrap className={classes.nameTitle}>
                        Welcome {(auth.userName) && (auth.userName[0].toUpperCase()+auth.userName.slice(1))}
                    </Typography>
                    <Hidden smDown>
                    <Button   
                        variant="contained"
                        color="default"
                        size="small"
                        onClick = {handleIncome}
                        className={classes.button}
                        startIcon={<AddIcon />}
                    > Add Income
                    </Button>
                    </Hidden>
                    <Hidden smDown>
                    <Button   
                        variant="contained"
                        color="secondary"
                        onClick = {handleExpense}
                        size="small"
                        className={classes.button}
                        startIcon={<AddIcon />}
                    >Add Expense
                    </Button>
                    </Hidden>
                    <Hidden smDown>
                    <Button   
                        variant="contained"
                        color="default"
                        onClick = {handleLogout}
                        size="small"
                        className={classes.button}
                        startIcon={<ExitToAppIcon />}
                    >Logout
                    </Button></Hidden>
                    <Hidden mdUp>
                      <div >
                        <IconButton
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleMenu}
                          color="inherit"
                        >
                          <FormatListBulletedIcon />
                        </IconButton>
                        <Menu
                          id="menu-appbar"
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          open={openMenu}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={handleMenuClose}>
                            <Button   
                                variant="contained"
                                color="default"
                                size="small"
                                onClick = {handleIncome}
                                className={classes.button}
                                startIcon={<AddIcon />}
                              > Add Income
                            </Button>
                          </MenuItem>
                          <MenuItem onClick={handleMenuClose}>
                            <Button    
                                variant="contained"
                                color="secondary"
                                onClick = {handleExpense}
                                size="small"
                                className={classes.button}
                                startIcon={<AddIcon />}
                              >Add Expense
                            </Button>
                          </MenuItem>
                          <MenuItem onClick={handleMenuClose} style = {{display: "flex" , justifyContent : "center"}}>
                            <Button   
                                variant="contained"
                                color="default"
                                onClick = {handleLogout}
                                style = {{textAlign : "center"}}
                                size="small"
                                className={classes.button}
                                startIcon={<ExitToAppIcon />}
                                >Logout
                            </Button>
                          </MenuItem>
                          
                        </Menu>
                      </div>
                    </Hidden>
                </Toolbar>
            </AppBar>

            <Drawer
                  variant="permanent"
                  classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),}}
                  open={open}
                  onMouseEnter = {handleDrawerOpen}
                  onMouseLeave = {handleDrawerClose}
              >
                <div className={classes.appBarSpacer} />

                <DrawerList handleDrawerClose = {handleDrawerClose} open = {open}/>
                
              </Drawer>
              
        </React.Fragment>
    )
}
export default Header