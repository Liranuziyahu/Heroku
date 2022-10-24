import React ,{useContext, useEffect, useState} from 'react'
import InputSearch from '../Buttons/InputSearch'
import BtnCreateCandidates from '../Buttons/BtnCreateCandidates';
import ChangeUserData from './Actions/ChangeUserData';
import TableUsers from './TableUsers';
import {myContextData} from '../../context/ContextDataFromServer'
//CSS
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@mui/material/styles';



const UserPage = () => {
    const {user} = useContext(myContextData)
    const [userSearch ,setUserSearch] = useState({search:"" , category:""})
    const [editUser , setEditCompUser ] =useState(false)
    const [userToChange , setUserToChange] = useState(user)

    const theme = useTheme()
    const useStyle = makeStyles(() =>({
      btnCreateCandidates :{
        display: !editUser ?'block' :'none',
        marginBottom:'20px',
        textAlign:'center',
        [theme.breakpoints.up('sm')]:{
          textAlign:'right'
        }
      },
      inputSearch:{
        display: !editUser ?'block' :'none',
      }
    }))
    const styles = useStyle()

  return (
    <>
      <div className={styles.btnCreateCandidates}>
        <BtnCreateCandidates />
      </div>

      <div className={styles.inputSearch}>
        <InputSearch setUserSearch = {setUserSearch}></InputSearch>
      </div>

    {   
      editUser
      ?
      <ChangeUserData props={{"setEditCompUser":setEditCompUser,"userToChange":userToChange ,"setUserToChange":setUserToChange}} /> 
      : 
      <TableUsers props={{"userSearch":userSearch , "setEditCompUser":setEditCompUser , "editUser":editUser , setUserToChange}} />
    }
    </>
     )
}

export default UserPage