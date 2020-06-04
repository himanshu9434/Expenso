import React , {Suspense} from 'react';
import SignUp from "./users/auth/SignUp"
import { makeStyles } from '@material-ui/core/styles';
import {ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from "./users/auth/Login"
import Dashboard from "./dashboard/pages/Dashboard"
import NotFoundPage from "./NotFoundPage"
// import AllExpenses from "./expense/components/expenseDisplay"
// import AllIncomes from "./income/components/incomeDisplay"
// import Reports from "./reports/pages/reports"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import {AuthContext} from "./shared/context/auth-context"
import {useAuth} from "./shared/hook/auth-hook"
// import LogoutPage from "./users/pages/logoutPage"
import Header from "./Layout/header"
// import UpdateProfile from './users/pages/profile';
// import Settings from "./settings/settings"
import LinearProgress from '@material-ui/core/LinearProgress';

const AllExpenses = React.lazy(()=>import("./expense/components/expenseDisplay"))
const AllIncomes = React.lazy(()=>import("./income/components/incomeDisplay"))
const Reports = React.lazy(()=>import("./reports/pages/reports"))
const UpdateProfile = React.lazy(()=>import('./users/pages/profile'))
const Settings = React.lazy(()=>import("./settings/settings"))
const LogoutPage = React.lazy(()=>import("./users/pages/logoutPage"))


function App(){
  const [isLoggedIn,userName,userId,login,logout,toggle,setToggle,utilities,setUtility,theme,primary,setprimary,secondary,setsecondary,paper,setpaper,background,setbackground,colorText,setcolorText] = useAuth()
  const useStyles = makeStyles(theme => ({
    root: {
        width:"100%",
        display: 'flex',
        justifyContent:'flex-start',
      }}))
  const classes = useStyles();
  let routes
  routes = (
  <Switch>
    <Route exact path = "/">
      <Login />
    </Route>
    <Route exact path = "/SignUp">
      <SignUp />
    </Route>
    <Route exact path = "/Dashboard">
      <Dashboard />
    </Route>
    <Route exact path = "/Expenses">
      <AllExpenses />    
    </Route>
    <Route exact path = "/Incomes">
      <AllIncomes />    
    </Route>
    <Route exact path = "/Profile">
      <UpdateProfile />    
    </Route>
    <Route exact path = "/Reports">
      <Reports />    
    </Route>
    <Route exact path = "/Settings">
      <Settings />    
    </Route>
    <Route exact path = "/logout">
      <LogoutPage />
    </Route>
    <Route exact path = "/404">
      <NotFoundPage />
    </Route>
    <Redirect to = "/404"/>
  </Switch>)
  return(
    <AuthContext.Provider value={{
              isLoggedIn,userName,userId,login,logout,toggle,setToggle,
              utilities,setUtility,
              theme,primary,setprimary,secondary,setsecondary,paper,setpaper,background,setbackground,colorText,setcolorText
            }}>
      <ThemeProvider theme = {theme}>
        <Router>
        <div className={classes.root}>
        <CssBaseline />
          {isLoggedIn && <Header />}
            <Suspense 
              fallback = {
                <div className = "loading">
                  <LinearProgress color = "secondary"/>
                  </div>
                }>
              {routes}
            </Suspense>
        </div>
        </Router>
    </ThemeProvider>
    </AuthContext.Provider>
  )
}
export default App