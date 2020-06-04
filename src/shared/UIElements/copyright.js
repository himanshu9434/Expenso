import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
      <div style = {{paddingBottom: "1rem" , width:"100%" ,display : "flex", flexWrap : "wrap", justifyContent:  "center", alignSelf : "flex-end"}}>
      <Typography variant="body3" color="textSecondary" align="center">
        {'Copyright © '}
        </Typography>
        <Typography variant="body3" color="textSecondary" align="center">
        <Link color="inherit">
          Expenso
        </Link>{' '}{new Date().getFullYear()}{'.'}
      </Typography>
      </div>
    );
  }
  export default Copyright