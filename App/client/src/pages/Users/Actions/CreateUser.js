import React,{useContext} from 'react'
import { FormControl } from '@mui/material';
import { Form,Col,Row,Button } from 'react-bootstrap';
import {ContextFromServer} from '../../../context'
import {myContextData} from '../../../context/ContextDataFromServer'
import Stack from '@mui/material/Stack';

import BackPage from '../../Buttons/BackPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateUser = () => {
    const {createUser ,user ,setUser , checkCategory , categoryExam} = useContext(ContextFromServer)
    const {dataUserLogged} = useContext(myContextData)
    return (
        <div style={{"width":"80%","marginLeft":"20%","marginTop":"40px"}}>
             <FormControl  style={{"width":"50%", "marginLeft":"10%"}} onSubmit = {(e)=> {
                 e.preventDefault();
                 if(categoryExam.length != 0)
                 createUser(user , categoryExam)
                else
                    alert('Choose Category to Test')
                }} >
            <Form >
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Email
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control onChange = {((e)=>setUser({...user,['userEmail']:e.target.value}))} type="email" placeholder="Email" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                    Password
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control onChange = {((e)=>setUser({...user,['userPassword']:e.target.value }))} type="password" placeholder="Password" required/>
                    </Col>
                </Form.Group>
                
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalName" >
                    <Form.Label column sm={2}>
                    Full Name
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control onChange = {((e)=>setUser({...user,['userName']:e.target.value}))} type="text" placeholder="Full name" />
                    </Col>
                </Form.Group>

               
                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>
                        Category
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Check
                        type="checkbox"
                        label="React"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        onClick = {((e)=>{checkCategory(e.target.checked,'2')})}
                        />
                        <Form.Check
                        type="checkbox"
                        label="Angular"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        onClick ={((e)=>{checkCategory(e.target.checked,'3')})}
                        />
                        <Form.Check
                        type="checkbox"
                        label="JS"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                        onClick = {((e)=>{checkCategory(e.target.checked,'1')})}
                        />
                    </Col>
                    </Form.Group>
                </fieldset>
                {
                    dataUserLogged?.roleID == 1 || (JSON.parse(localStorage?.getItem('currentUser')))?.roleID  == 1 
                    ?(
                        <Form.Check
                            type="checkbox"
                            label="Administrator"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios5"
                            onChange={(e)=>{
                                if(e.target.checked)
                                    setUser({...user,['roleID']:'1'})
                                else
                                    setUser({...user,['roleID']:'2'})
                            }}
                        />):null
                }
                    <Form.Group as={Row} className="mb-3"  style={{marginTop:20}}>
                    <Stack  direction="row" spacing={2}>
                        <Button type="submit" >Sign up</Button>
                        <BackPage/>
                    </Stack >
                </Form.Group>
            </Form>
        </FormControl>
        </div>
    )
}

export default CreateUser
