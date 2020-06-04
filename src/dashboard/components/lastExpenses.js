import React ,{useState,useEffect,useContext}from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios"
import Title from './Title';
import {AuthContext} from "../../shared/context/auth-context"
import {useError} from "../../shared/hook/error-hook"
import Error from "../../shared/modals/error-modal"
import {Link as Linkto } from "react-router-dom";
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },    
}));

export default function Orders(props) {
  const [rows,setRows] = useState([])

  const [error,errorSet,errorUnset] = useError()
  const auth = useContext(AuthContext)

  useEffect(() => {
      const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/expense/lastExpenses/${auth.userId}`
      if (auth.userId)
      {axios({
        method: 'get',
        url: `${API_PATH}`,
        headers: { 'content-type': 'application/json' },
        })
        .then(result => {
              setRows(result.data.list)
          }).catch(error=>{
              errorSet("Connection Failed. Kindly Refresh")
          })}
  
    }, [auth.userId,auth.toggle,errorSet])

  const classes = useStyles();
  return (
    <React.Fragment>
      <Error errortext={error} errorUnset={errorUnset} />
      <Title>Recent Expenditure</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date.split("T")[0]}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{`₹${row.amount}`}</TableCell>
              <TableCell>{row.mode}</TableCell>
              <TableCell>{row.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault} >
          <Linkto to = "/Expenses" > See more Expenses </Linkto>
        </Link>
      </div>
    </React.Fragment>
  );
}