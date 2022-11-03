import React , {useState , useEffect} from 'react'
import {createContext} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const ContextFromServer = createContext()

const ContextServer = ({children}) => {
  const userModle = {"userName":'',"userEmail":'',"userPassword":'',"roleName":'2'}
  const [user, setUser] = useState(userModle)
  const [allUsers,setAllUsers] = useState({})
  const [exams,setExams] = useState({})
  const [questionsJS , setQuestionsJS] = useState([])
  const [questionsReact , setQuestionsReact] = useState([])
  const [questionsAngular , setQuestionsAngular] = useState([])
  const [categoryExam , setCategoryExam] = useState([])
  const [updateContext , setUpdateContext] = useState(false)
  const API = 'https://queezer.herokuapp.com/'
  const navigate = useNavigate();

  useEffect(async () =>{
    await axios.get(API+`users`).then(data => setAllUsers(data?.data))
    await axios.get(API+`exams`).then(data => setExams(data?.data))
    await axios.get(API+`questions`)
    .then(data => {
      setQuestionsJS(data?.data.filter(question => question.categoryExamsName == 'JS'))
      setQuestionsReact(data?.data.filter(question => question.categoryExamsName == 'React'))
      setQuestionsAngular(data?.data.filter(question => question.categoryExamsName == 'Angular'))
    })
  },[updateContext])

/////////Question/////////
  //Create 
  const createQuestion = async (category , question ) =>{
    if(category=='JS')
        question['categoryExamsID'] = '1'
    if(category=='React')
        question['categoryExamsID'] = '2'
    if(category=='Angular')
        question['categoryExamsID'] = '3'
    axios.post(API+'questions',question)
}

/////////User/////////
  //Create
  const createUser = (async (user , categorys)=>{

    await axios.post(API+'users',user)
    .then(res => {
      if(res.data.message!= undefined) 
        alert(res.data.message)
      else
      {
        axios.post(API+'exams',{userID:res.data.userID, categorys:categorys})
        setUser(userModle)
        setCategoryExam([])
        setUpdateContext(!updateContext)
        navigate(-1)  
      }
    })
    .catch(err => err)
  })
  //Edit
  const editUser = (user => axios.put(API+`users/${user.userID}`,user))
  //Delete 
  const deleteUser = (async userID => await axios.delete(API+`users/${userID}`))

/////////Exam/////////
  //Create
  const createExam = (async exam => await axios.post(API+'exams/',exam))
  //Update specific exam - for change score
  const editExam = (async exam => await axios.put(API+`exams/${exam.examsID}`,exam))
  //Delete All Exams 
  const DeleteAllExams = (async userID => {
    await DeleteAnswersByID(userID)  
    await axios.delete(API+`exams/deleteAll/${userID}`)
  })
  //Update Exams User ask to test
  const updateExams = ( async (exam , categorys) => {
      await DeleteAnswersByID(exam.userID)
      await DeleteAllExams(exam.userID)
      .then(async res => {
        await createExam({userID:exam.userID, categorys:categorys})
      })
      .then(() => setUpdateContext(!updateContext))    //Update Context for new data's DB
      setCategoryExam([])
  }) 

/////////Answers Exam/////////
  //Create
  const CreateAnswersExam = (answers =>{
    answers.map( answer => axios.post(API+'answer',answer))
  })
  //Detele
  const DeleteAnswersByID = ( async id =>{
    await axios.delete(API+`answer/${id}`)
  })
  //Get by ID
  const AnswersByExamID = (async examID =>{
    return  axios.get(API+`answer/${examID}`)
    .then(res=>  res.data)
  })

/////////Function/////////
  const checkCategory = (boolen , type) =>{
    if(boolen)
    {
        let catboolen = false
        categoryExam.map?.(exam =>{if(exam == type) return catboolen == true})
        if(!catboolen) setCategoryExam(categoryExam => [...categoryExam ,type])
    }
    else{
       let sliceArr = categoryExam.filter(exam => exam != type)
       setCategoryExam(sliceArr)
    }
}

  return (
    <div>
        <ContextFromServer.Provider value={{API ,user , setUser ,createUser,deleteUser,allUsers,setAllUsers ,setUpdateContext,updateContext,exams , questionsJS , questionsReact , questionsAngular ,editUser ,createQuestion ,editExam , createExam , updateExams , checkCategory , categoryExam ,CreateAnswersExam,DeleteAllExams,DeleteAnswersByID,AnswersByExamID}}>
          {children}
        </ContextFromServer.Provider>
    </div>
  )
}

export default ContextServer