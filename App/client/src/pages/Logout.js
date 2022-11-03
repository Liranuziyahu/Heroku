import React from 'react'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Link} from 'react-router-dom'
const Logout = () => {

const Logout = (()=>{ 

    window.localStorage.removeItem('currentUser');
    window.location.reload();
})

  return (
    
          <ExitToAppIcon style={{position:"absolute" , right:20 ,top:20}} onClick={()=>Logout()}>
            <Link to ='/'></Link>
          </ExitToAppIcon>
  )
}

export default Logout