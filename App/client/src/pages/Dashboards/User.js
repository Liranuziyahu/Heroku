import React , {useContext} from 'react'
import { Link } from 'react-router-dom'
import {myContextData} from '../../context/ContextDataFromServer'

const User = () => {
  const {dataUserLogged} = useContext(myContextData)
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  
  return (
  <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center',marginTop:250,fontSize:20}}>
    <div>Hello {currentUser.userName? currentUser.userName : dataUserLogged.userName} </div>
    <div>Welcome to our exam</div>
    <div>When you are ready you can <Link to='Questionnaire'>Start</Link></div>
  </div>
  )
}

export default User