import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
//Component 
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {ContextFromServer} from '../../context/index'
import FileOpenIcon from '@mui/icons-material/FileOpen';
import EmailIcon from '@mui/icons-material/Email';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import axios from 'axios';
import { makeStyles } from '@mui/styles';

function Candidates({exam}) {
    const {API} =  useContext(ContextFromServer)

    const useStyles = makeStyles( () => ({
        list: {
            maxWidth:300,
            textAlign:"center",
        },
      }));
      const styles= useStyles()


    const {AnswersByExamID} = useContext(ContextFromServer)
    const senderMail = async  (id ) => {
        let answers = await AnswersByExamID(id)
        try{
            axios.post(API+'exams/send-exam',{"answers": answers ,"to": exam.userEmail})
        }
        catch(err){ console.error(err)}
    }

    return (
        <TableRow>
            <TableCell className={styles.list}>{exam?.userID}</TableCell>
            <TableCell className={styles.list}> {exam?.userName}</TableCell>
            <TableCell className={styles.list}>{exam?.userEmail}</TableCell>
            <TableCell className={styles.list}>{exam?.categoryExamsName}</TableCell>
            <TableCell className={styles.list}>{exam?.score}</TableCell>
            <TableCell  sx={{display:'flex',justifyContent: 'center'}}>
                 <Link to ={`${exam?.examsID}`}  state={{ data: exam }}><FileOpenIcon  color="action"/></Link>
                 {
                    exam?.sent == 0 ? <EmailIcon onClick={() => senderMail(exam.examsID)} color="action"/> : <MarkEmailReadIcon color="action"/>
                 }
            </TableCell>

        </TableRow>
        
)}
export default Candidates
