import React,{useState ,useContext ,useEffect} from 'react'
import ChangeExam from './ChangeExam';
import Question from './Question';
import {ContextFromServer} from '../../context/index'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Exam = ({userExams}) => {
  const {questionsJS , questionsReact , questionsAngular , editExam , CreateAnswersExam} = useContext(ContextFromServer)
  const [theExmControl , setTheExmControl] = useState(0);
  //question state
  const [theQuestionControl , setTheQuestionControl] = useState(0);
  const [storageQuestions , setStorageQuestions] = useState([])
  const [question , setQuestion] = useState([storageQuestions[theExmControl]?.questions[theQuestionControl]]);
  const [exam , setExam] = useState([storageQuestions[theExmControl]]);
  const [storageAnswers , setStorageAnswers] = useState([])

  const reload = {
    position: 'absolute',
    top:'calc(50% - 32px)',
    left:'calc(50% - 32px)'
   }

  const ChangeQuestion = () => setTheQuestionControl(theQuestionControl + 1)

  const changeExam = () => {
      setTheExmControl(theExmControl + 1)
      setTheQuestionControl(0)
  }

  const finishedExam = () => {
    CreateAnswersExam(storageAnswers)
    setStorageAnswers([])
    userExams.map(exam => {
      if(exam.categoryExamsName == storageQuestions?.[theExmControl].name )
      {
        const examDone = {
         "examsID":exam.examsID ,
         "categoryExamsID": exam.categoryExamsID ,
         "userID":exam.userID ,
         "score":storageQuestions?.[theExmControl].score,
         "done":true
        }
        editExam(examDone)
    }})
  }

  const storageQuestionArray = (userExams , questionsJS ,questionsReact , questionsAngular) =>{
    userExams?.map(exm=>{
      if(exm.categoryExamsName == 'JS') return setStorageQuestions( storageQuestions => [...storageQuestions,{examID:exm.examsID, name:'JS' ,questions:questionsJS ,score:0 }])
      if(exm.categoryExamsName == 'React') return setStorageQuestions( storageQuestions => [...storageQuestions,{examID:exm.examsID,name:'React' ,questions:questionsReact , score:0 }])
      if(exm.categoryExamsName == 'Angular') return setStorageQuestions( storageQuestions => [...storageQuestions,{examID:exm.examsID,name:"Angular" ,questions:questionsAngular ,score:0 }])
    })}

  useEffect(()=>{
    setStorageQuestions([])
    storageQuestionArray(userExams , questionsJS , questionsReact , questionsAngular)
  },[userExams , questionsJS , questionsReact , questionsAngular])
   
  useEffect(()=>{
    setQuestion(storageQuestions?.[theExmControl]?.questions?.[theQuestionControl])
    setExam(storageQuestions[theExmControl])
  },[theExmControl , theQuestionControl , storageQuestions])
    
  return (
   <>
   {
     (storageQuestions?.[theExmControl]?.questions?.length != theQuestionControl && storageQuestions.length != 0 )?
     <div>
       <input type='range' value={100*theQuestionControl/10}></input>
       <Question  props = {{question:question,exam:exam , ChangeQuestion , setStorageAnswers ,userExams: userExams[theExmControl]}}/>
     </div>
      :
      (
        <ChangeExam props = {{ exam ,theExmControl , changeExam , storageQuestions , theExmControl , finishedExam}}/>
      )
   }
        
   </>
    
  )
}

export default Exam
