import React,{useContext} from 'react'
import {myContextData} from '../../context/ContextDataFromServer'
//CSS
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function ExamsTable() {
    const {state} = useContext(myContextData)
    return (
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type Exams</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.map((state) => (
            <TableRow
              key={state.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {state.name}
              </TableCell>
              <TableCell align="right">{state.email}</TableCell>
              <TableCell align="right">{state.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default ExamsTable
