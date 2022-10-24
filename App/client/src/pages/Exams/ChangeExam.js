import React , {useEffect , useRef} from 'react'
import Button from '@mui/material/Button';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { makeStyles } from '@material-ui/core/styles';
import IsReload from '../Reload/IsReload'

const ChangeExam = ({props}) => {

  const refTitleDone = useRef();

  let nameExam = props?.storageQuestions?.[props.theExmControl+1]?.name
  const styleCenter ={
    width:700,
    position:'absolute',
    top:'35%',left:'calc(50% - 350px)'
  }
  const classes = useStyle();

   useEffect(() =>{ if(props.storageQuestions.length != 0) props.finishedExam()},[])

   setTimeout(() =>{
     if(refTitleDone.current!=null)
      {
        refTitleDone.current.style.display=''
      }
   },1000)
   
  return (
  <>

    {

      (props.storageQuestions.length != props.theExmControl + 1 && props.storageQuestions.length != 0)
      ? 
        <div style = {styleCenter}>
          <h1 style={{textAlign: 'center'}}>You are Ready for <span style={{color:'#1663be',fontWeight:'700'}}>{nameExam} </span>  Exam?</h1>
          <Button style={{width:'100%'}} onClick={() => props.changeExam()} variant="contained" endIcon={<AlarmOnIcon />}>
              I'm ready for that
          </Button>
        </div>
      :
      <>
        <IsReload />
       <h1 ref={refTitleDone} className={classes.reload}>Thank you very much for participating</h1>  
      </>
    } 
  </>
)}


const useStyle = makeStyles(theme =>({
  reload:{
    height:'100vh',display: 'flex',justifyContent: 'center',alignItems: 'center'
  }
}))
export default ChangeExam