import React, {useState,useEffect,useContext} from "react"
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {AuthContext} from "../../shared/context/auth-context"
import Loading from "../../shared/modals/loading-modal"
import { useLoading } from "../../shared/hook/loading-hook"
import {useHistory} from "react-router-dom"


const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const  Logout = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const [loading,setLoad,unsetLoad]=useLoading()

    useEffect(() => {
        setLoad()
        auth.logout()
        history.push("/")
        return () => {
            unsetLoad()
        }
    }, [])
    const classes = useStyles();
    return (
        <div>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    )
}
export default Logout