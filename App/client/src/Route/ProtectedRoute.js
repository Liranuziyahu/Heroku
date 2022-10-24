import React , {useContext,useEffect} from 'react'
import {Outlet, Navigate, useNavigate} from 'react-router-dom'
import {myContextData} from '../context/ContextDataFromServer'

const ProtectedRoute = () => {
    const { dataUserLogged , isAuth } = useContext(myContextData)
    const isAdmin = (isAuth && dataUserLogged?.roleID =='1') || (JSON.parse(localStorage?.getItem('currentUser')))?.roleID =='1' 
    return (
        <>   
           { isAdmin ? <Outlet></Outlet> : <Navigate to="User"/> } 
        </>
    )
}

export default ProtectedRoute
