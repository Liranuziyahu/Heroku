import React ,{useContext, useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import {useNavigate} from "react-router-dom";
import {myContextData} from '../context/ContextDataFromServer'
import {ContextFromServer} from '../context/index'

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,Button } from 'react-bootstrap';

const Login = () => {
    const {setDataUserLogged ,setIsAuth } =  useContext(myContextData)
    const {API} =  useContext(ContextFromServer)

    const [loginMessage , setLoginMessage] = useState('')
    let navigate = useNavigate();

    const checkAuto = async (autoLogin) => {
        autoLogin.preventDefault()
        await axios.post(API+'users/login',{email:autoLogin.target[0].value , password:autoLogin.target[1].value})
        .then(user => {
            if(user.data === "wrong password")
           {
            setLoginMessage(user.data)
           }
           else {
            setDataUserLogged(user.data)
            setIsAuth(true)
            let path = user.data.roleID == 1 ? 'Administrator':'User'
            localStorage.setItem('currentUser' , JSON.stringify(user.data)) 
            navigate(`${path}`)
           }
        })
        .catch(err => console.log(err))

    //For Hosting Services
        if(autoLogin.target[0].value=='host@gmail.com' && autoLogin.target[1].value=='myhost')
        {   
            setDataUserLogged({userEmail:'host@gmail.com' , userName:'Host',roleID:1})
            setIsAuth(true)
            navigate(`/Administrator`)
        }
        
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

     