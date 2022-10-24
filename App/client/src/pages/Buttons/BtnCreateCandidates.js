import React from 'react'
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@mui/material/styles';



const BtnCreateCandidates = () => {
    const theme = useTheme();
    const useStyles = makeStyles(()=>({
        button:{
            width:'80vw',
            [theme.breakpoints.up('sm')]:{
                width:'auto',
            }
        }
    }))

    const styles = useStyles()
    return (
        <Link to="/new" > 
            <Button  variant="outlined" size="small" className={styles.button} >
                <AddIcon/>
            </Button>   
        </Link>  
    )}
export default BtnCreateCandidates
