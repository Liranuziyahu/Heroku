import React ,{useContext, useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import {useNavigate} from "react-router-dom";
import {myContextData} from '../context/ContextDataFromServer'
//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,Button } from 'react-bootstrap';

const Login = () => {
    const {setDataUserLogged ,setIsAuth} =  useContext(myContextData)
    const [loginMessage , setLoginMessage] = useState('')
    let navigate = useNavigate();

    const checkAuto = (autoLogin) => {
        autoLogin.preventDefault()
        axios.post('http://localhost:8080/user/login',{email:autoLogin.target[0].value , password:autoLogin.target[1].value})
        .then(user => {
            if(!user.data)
           {
            setLoginMessage('Password Worng')
           }
           else {
            setDataUserLogged(user.data)
            setIsAuth(true)
            let path = user.data.roleID == 1 ? 'Administrator':'User'
            localStorage.setItem('currentUser' , JSON.stringify(user.data)) 
            navigate(`${path}`)
           }
        })
        .catch(err =>console.log('Email or password not true'))
    }

    return (
        <div > 
            <Form style={{"width":"30%","margin":"auto","marginTop":"40px"}} 
                onSubmit ={(e)=>{checkAuto(e)} }>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <div style={{color:"red" , fontWeight:"700"}}>{loginMessage}</div>
                <Link  to="new" >
                     You dont have account yet?
                </Link>
                <Button variant="primary" type="submit"
                    style={{"width":"100px","marginLeft":"calc(50% - 50px)"}}>
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Login

     