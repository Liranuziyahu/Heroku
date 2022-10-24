import React,{useEffect , useContext , useState} from 'react'
import axios from 'axios'
import {ContextFromServer} from '../../context'
import AlertDialog from './Actions/AlertDialog'
//CSS
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';


const User = ({props}) => {
  const {updateContext , setUpdateContext  , DeleteAllExams ,deleteUser} = useContext(ContextFromServer)

  const DeleteUser = async userID => {
    await DeleteAllExams(userID)
    await deleteUser(userID)
    .then(res => setUpdateContext(!updateContext))
  }


  const useStyles = makeStyles( () => ({
    list: {
        maxWidth:300,
        textAlign:"center",
    },
  }));
  const styles= useStyles()

  
  return (
    <>
    
          {
            <TableRow
              key={props?.user.userID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell className={styles.list} component="th" scope="row">{props?.user.userID}</TableCell>
              <TableCell className={styles.list}>{props?.user.userEmail}</TableCell>
              <TableCell className={styles.list}>{props?.user.userName}</TableCell>
              <TableCell className={styles.list}>{props?.user.roleName}</TableCell>
              <TableCell className={styles.list}>
                <EditIcon onClick={() => {props.setUserToChange(props.user); return props.setEditCompUser(!props.editUser)}}/>
                <AlertDialog props={{DeleteUser ,"user": props?.user }}/>
              </TableCell>
              
            </TableRow>
          }
     </>
     )
}

export default User  