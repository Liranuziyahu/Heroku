import React ,{useContext} from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import {myContextData} from '../context/ContextDataFromServer'



const ProtectedUserRoute = () => {
    const { dataUserLogged , isAuth } = useContext(myContextData)
    const isUser = (isAuth && dataUserLogged?.roleID =='2') || (JSON.parse(localStorage?.getItem('currentUser')))?.roleID =='2'
  return (
    isUser ? <Outlet></Outlet>: <Navigate to="/"/>  )
}

export default ProtectedUserRoute