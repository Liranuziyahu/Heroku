import React,{useEffect , useContext , useState} from 'react'
import { useParams , useLocation } from "react-router-dom";
import {ContextFromServer} from '../../context'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ExamPage = () => {
  const params = useParams();
  const {AnswersByExamID ,exams} = useContext(ContextFromServer)
  const [exam, setExam] = useState()
  const [user , setUser] = useState()
  const location = useLocation()
  const { data } = location?.state

  const score = {
    float: 'right',
    marginRight:50,
    fontSize:70,
    width:200,
    height:200,
    color:'red',
    border:'3px solid red',
    borderRadius:'50%',
    textAlign:'center',
    textJustify:'center',
    transform: 'rotate(0.96turn)',
    padding:'40px',
  }
  const reload = {
   position: 'absolute',
   top:'calc(50% - 32px)',
   left:'calc(50% - 32px)'
  }

  useEffect(async ()=>{
   let answers = await AnswersByExamID(params.id)
   console.log(answers);

   setExam(answers)
  },[exams])
  return (
    <>

      {
     exam == undefined 
     ? 
      <Box style={reload} sx={{ display: 'flex' }}>
        <CircularProgress size="4rem"/>
     </Box> 
    :
    exam?.message ? 
    <div> {exam?.message} </div>
      :
     [
        <div style={score}>{data.score}</div>,

        exam?.map(answer => (
        <div key={answer.questionID} style={{marginBottom:20}}>
          <div>{answer.questionTheQuestion}</div>
          <div style={answer.questionTrueAnswer == answer.answer1 ? {color:'green'}: (answer.answer1 == answer.userAnswer && answer.userAnswer != answer.questionTrueAnswer )?{color:'red'}:null}>1. {answer.answer1}</div>
          <div style={answer.questionTrueAnswer == answer.answer2 ? {color:'green'}: (answer.answer2 == answer.userAnswer && answer.userAnswer != answer.questionTrueAnswer )?{color:'red'}:null}>2. {answer.answer2}</div>
          <div style={answer.questionTrueAnswer == answer.answer3 ? {color:'green'}: (answer.answer3 == answer.userAnswer && answer.userAnswer != answer.questionTrueAnswer )?{color:'red'}:null}>3. {answer.answer3}</div>
          <div style={answer.questionTrueAnswer == answer.answer4 ? {color:'green'}: (answer.answer4 == answer.userAnswer && answer.userAnswer != answer.questionTrueAnswer )?{color:'red'}:null}>4. {answer.answer4}</div>
        </div>))  
      ]    
      }
    </>
  )
}

export default ExamPage