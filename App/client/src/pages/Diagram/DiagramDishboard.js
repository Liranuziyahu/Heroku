import React,{useEffect,useState , useContext} from 'react'
import axios from 'axios'
import Diagram from './Diagram'
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
    import {ContextFromServer} from './../../context/index'

const DiagramDishboard = () => {
const [examJS , setExamJS] = useState([])     
const [examRact , setExamRact] = useState([])
const [examAngular , setExamAngular] = useState([])
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

const {API} =  useContext(ContextFromServer)


    useEffect(async () => {
        await axios.get(API+`exams`)
        .then(data => {
            // console.log(data.data)
            let x = data.data.filter(exam => exam.categoryExamsName == 'JS')
            setExamJS(x)
            let y = data.data.filter(exam => exam.categoryExamsName =='React')
            setExamRact(y)
            let z = data.data.filter(exam => exam.categoryExamsName == 'Angular')
            setExamAngular(z)
        })
       },[])
  return (
      <Grid container 
        justifyContent="center"
        alignItems="center"
        spacing={isMobile ? 4 : 12} >
        <Grid style={{marginRight: isMobile ? 0 : 100}} item xs={isMobile ? 12 : 4} >
            <Diagram props={{name:'Angular',value:examAngular,type:'Circle',exams:[examJS , examRact , examAngular] , isMobile:isMobile}}/>
        </Grid>
            <Grid item xs={isMobile ? 12 : 4} >
                <Diagram  props={{name:'JS',value:examJS,type:'Line' , isMobile:isMobile}} />
                <Diagram  props={{name:'React',value:examRact,type:'Line' , isMobile:isMobile}}/>
                <Diagram  props={{name:'Angular',value:examAngular,type:'Line', isMobile:isMobile}}/>
             </Grid>
      </Grid>

  )
}

export default DiagramDishboard