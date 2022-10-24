import  React ,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


const currencies = [
    {
      value: '1',
      label: 'JS',
    },
    {
      value: '2',
      label: 'React',
    },
    {
      value: '3',
      label: 'Angular',
    }
  ];

const InputAddToCategory = ({props}) => {
  const handleChange = (event) => props.setCategory(event.target.value)

    return (
        <>
          <div style={{display:'flex', marginBottom:20}}>
            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}} noValidate autoComplete="off">
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Category"
                  value={props.category}
                  onChange={(event)=> handleChange(event)}
                  >
                      {currencies.map(option => 
                          <MenuItem key={option.value} value={option.label}>
                            {option.label}
                          </MenuItem>
                          )}
                </TextField>
            </Box>
    </div>
        </>
    )
}

export default InputAddToCategory

// Repositore = מאגר