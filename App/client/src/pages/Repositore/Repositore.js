import  React , {useState , useContext}  from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { Form } from 'react-bootstrap';
import {ContextFromServer} from '../../context/index'
import InputAddToCategory from './InputAddToCategory';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';



const Repositore = () => {

  const theme = useTheme();
  const useStyles = makeStyles( () => ({
    list: {
        display:'flex',
        marginTop:20,
        justifyContent:'space-between',
        [theme.breakpoints.down('lg')]: {
          flexDirection: 'column'
        }
    },
  }));
    const styles= useStyles()
    const CleanForm = (e) => {
        e[0].value=''
        e[3].value=''
        e[4].value=''
        e[5].value=''
        e[6].value=''
        e[7].value=''
    }
    const builderQuestion = {
        "categoryExamsID":'',
        "questionTheQuestion": "",
        "questionTrueAnswer": "",
        "answer1": "" ,
        "answer2": "" ,
        "answer3": "" ,
        "answer4": "" ,
    }

    const [questionStructure , setquestionStructure ] = useState(builderQuestion)
    const [category, setCategory] = useState('JS');
    const {createQuestion} = useContext(ContextFromServer)


    return (
        <div >
            <InputAddToCategory props={{setCategory ,category}}/>
            <FormControl style={{display: 'flex'}} onSubmit ={(e)=>{
                e.preventDefault()
                setquestionStructure(builderQuestion)
                createQuestion(category , questionStructure)
                CleanForm(e.target)
                }}>
            <Form >
                    <TextField  multiline rows={3} fullWidth label="Question" id="Question" placeholder="typeing..." onChange={(e)=>setquestionStructure({...questionStructure,['questionTheQuestion']:e.target.value})}/>
                    <div className={styles.list}>
                        <TextField
                        id="standard-textarea"
                        label="Answer 1"
                        placeholder="typeing..."
                        variant="standard"
                        onChange={(e)=>setquestionStructure({...questionStructure,['answer1']:e.target.value})}/>

                        <TextField
                        id="standard-textarea"
                        label="Answer 2"
                        placeholder="typeing..."
                        variant="standard"
                        onChange={(e)=>setquestionStructure({...questionStructure,['answer2']:e.target.value})}/>

                        <TextField
                        id="standard-textarea"
                        label="Answer 3"
                        placeholder="typeing..."
                        variant="standard"
                        onChange={(e)=>setquestionStructure({...questionStructure,['answer3']:e.target.value})}/>

                        <TextField
                        id="standard-textarea"
                        label="Answer 4"
                        placeholder="typeing..."
                        variant="standard"
                        onChange={(e)=>setquestionStructure({...questionStructure,['answer4']:e.target.value})}/>

                        <TextField
                        id="standard-textarea"
                        label="True Answer"
                        placeholder="typeing..."
                        variant="standard"
                        onChange={(e)=>setquestionStructure({...questionStructure,['questionTrueAnswer']:e.target.value})}/>
                    </div>
                    <Button type="submit" style={{marginTop:50}}> Create a Question </Button>
                </Form >
            </FormControl>
        </div>
     
    )

}
 


export default Repositore
    
