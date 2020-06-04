import React from 'react';



export  function useSnackbar(){
    const [open, setOpen] = React.useState(false);
const [message,setMessage] = React.useState()
const [severity,setSeverity] = React.useState()

const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };
  
  const handleMessage=(message)=>{
      setMessage(message)
  }
const handleSeverity = (severity)=>{
    setSeverity(severity)
}
    return {handleOpen,handleClose,handleMessage,handleSeverity,message,open,severity}
}