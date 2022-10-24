import React ,{useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const IsReload = () => {
  const classes = useStyle();
    setTimeout(() =>{
        if(refLoader.current!=null)
         {
           refLoader.current.style.display='none'
         }
      },1000)
   
       const refLoader = useRef();

  return (
    <>
        <Box ref={refLoader}  className={classes.reload}>
            <CircularProgress size="4rem"/>
        </Box>
    </>
   
  )
}

const useStyle = makeStyles(theme =>({
  reload:{
    height:'100vh',display: 'flex',justifyContent: 'center',alignItems: 'center'
  }
}))

export default IsReload

