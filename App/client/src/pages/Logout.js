import React from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Link} from 'react-router-dom'
const Logout = () => {

const LogoutButton = (()=>{ 

    window.localStorage.removeItem('currentUser');
    window.location.reload();
})

  return (
    
          <ExitToAppIcon style={{position:"absolute" , right:20 ,top:20}} onClick={()=>LogoutButton()}>
            <Link to ='/'></Link>
          </ExitToAppIcon>
  )
}

export default Logout