import React from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Logout = () => {

const Logout = (()=>{ 

    window.localStorage.removeItem('currentUser');
    window.location.reload();
})

  return (
    <ExitToAppIcon style={{position:"absolute" , right:20 ,top:20 }} onClick={()=>Logout()}></ExitToAppIcon>
  )
}

export default Logout