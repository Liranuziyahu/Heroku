import  React ,{useState , useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const currenciesList = [
  {
    value: 'userID',
    label: 'ID',
  },
  {
    value: 'userName',
    label: 'User Name',
  },
  {
    value: 'userEmail',
    label: 'Email',
  }
];

export default function SelectTextFields({setUserSearch}) {

  const [currency, setCurrency] = useState('userID');
  const [currencies, setCurrencies] = useState(currenciesList);
  const handleChange = event => setCurrency(event.target.value);

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  useEffect(() =>{
    if(window.location.pathname == '/Administrator/Candidates')
    setCurrencies(currencies => [...currencies , {value: 'categoryExamsName',label: 'Type'},{value: 'score',label: 'Score'}])
  },[])
 
  return (
      <div style={{display:'flex', marginBottom:20}}>
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: isMobile? '30vw' : '25ch' }}} noValidate autoComplete="off">
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            value={currency}
            onChange={handleChange}
            >
              {currencies.map(option => 
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
              )}
            </TextField>
        </Box>
        <FormControl variant="filled" style={{marginTop:'7px'}}>
            <FilledInput
             sx={{width: isMobile? '50vw' : '25ch'  }}
             id="component-filled" 
             onChange={(e) => setUserSearch({"search":e.target.value ,"catagorey":currency})} />
        </FormControl>         
    </div>
  )}