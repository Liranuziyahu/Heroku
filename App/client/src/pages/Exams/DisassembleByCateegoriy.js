import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { myContextData } from '../../context/ContextDataFromServer';
import { ContextFromServer } from '../../context/index';

import Exam from './Exam';

const DisassembleByCateegoriy = () => {
  const {dataUserLogged } =  useContext(myContextData)
  const {API} =  useContext(ContextFromServer)

  const [userExams , setUserExams] = useState([])
  let dataUser = JSON.parse(localStorage.getItem('currentUser')) 
  let currentUserTest = dataUserLogged ? dataUserLogged : dataUser

  useEffect(async()=>{
    await axios.get(API+`exams`)
      .then(exams => exams.data.map?.(exam =>{ if(exam.userID == currentUserTest?.userID && exam.done == 0 )  return exam }) )
      .then(exams => { exams.map((exam) =>{ if(exam != undefined) setUserExams(userExams => [...userExams,exam]) }) })
  },[])

  return (
    <> {<Exam userExams={userExams} />} </>
  );
};

export default DisassembleByCateegoriy;
