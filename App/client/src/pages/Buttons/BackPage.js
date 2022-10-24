import React from 'react'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackPage = () => {
    const navigate = useNavigate();
    
  return (<Button variant="contained" color="error" onClick={()=>navigate(-1)} startIcon={<ArrowBackIcon/>}>Back</Button>)
}
export default BackPage