import React , {useContext , useState} from 'react'
import axios from 'axios'
//Component
import User from './User'
import {ContextFromServer} from '../../context'
//MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

const TableUsers = ({props}) => {
    const {allUsers} = useContext(ContextFromServer)
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };
  return (
    <div style={{overflowX: 'hidden'}}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">User ID</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">User Name</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Tools</TableCell>
            </TableRow>  
      
          </TableHead>
          <TableBody>
            {
              props.userSearch.search ?  
                (
                  allUsers.map((user , index)=>{
                    let entryCategory = eval(`user?.${props.userSearch?.catagorey}`)?.toString().toLowerCase()
                    if(entryCategory?.includes(props.userSearch?.search?.toString().toLowerCase()))
                      return <User key ={index} props = {{"user":user , "setEditCompUser":props.setEditCompUser ,"editUser":props.editUser ,"setUserToChange":props.setUserToChange}}/>
                  })
                )
              : allUsers.length != undefined ?
              allUsers.slice(5 * page - 5, 5 * page).map?.((user) => <User key={user.userID}
                  props={{"user": user , "setEditCompUser":props.setEditCompUser,"editUser":props.editUser ,"setUserToChange":props.setUserToChange}}/>) : null
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" spacing={2} sx={{marginTop:2 , justifyContent: 'center'}}>
            <Pagination 
            count = {
              allUsers.length > 0 ? allUsers.length /5 % 1 == 0 ? allUsers.length / 5 : Number.parseInt(allUsers.length / 5) + 1 : 0}
              onChange={handleChange}
            />
      </Stack>

    </div>
  )
}

export default TableUsers