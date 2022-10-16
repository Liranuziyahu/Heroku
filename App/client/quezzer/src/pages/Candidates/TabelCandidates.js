import React,{useContext, useState} from 'react'
//Component
import {ContextFromServer} from '../../context/'
import Candidates from './Candidates'
//MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputSearch from '../Buttons/InputSearch';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const TabelCandidates = () => {
    const {exams} = useContext(ContextFromServer)
    const [userSearch ,setUserSearch] = useState({search:"" , catagorey:""})
    exams?.sort?.((exam1 , exam2)=>{
      return exam1.userID - exam2.userID
    })
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };
    return (
      <>
        <InputSearch setUserSearch = {setUserSearch}></InputSearch>
        <TableContainer component={Paper}>  
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="center">User ID</TableCell>
                <TableCell align="center">User Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Score</TableCell>
                <TableCell align="center">Exam</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                userSearch.search?
                  (
                    exams?.map?.((exam ,index)=>{
                    let entryCategory = eval(`exam.${userSearch?.catagorey}`)?.toString()?.toLowerCase()
                    if(entryCategory?.includes?.(userSearch.search?.toString()?.toLowerCase()))
                        return <Candidates key={index} exam = {exam}/>
                    })
                  ): exams?.length != undefined ?
                  exams?.slice(5 * page - 5, 5 * page)?.map?.((exam,index) => <Candidates  key = {index} exam = {exam}/>) : null
                }
            </TableBody>
          </Table>
      </TableContainer>
            
      <Stack direction="row" spacing={2} sx={{marginTop:2 , justifyContent: 'center'}}>
            <Pagination count={exams?.length > 0 ? exams?.length /5 % 1 == 0 ? exams?.length / 5 : Number.parseInt(exams?.length / 5) + 1 : 0}
              onChange={handleChange}
            />
      </Stack>
    </>
  )
}
export default TabelCandidates
