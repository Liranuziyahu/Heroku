import React ,{useContext , useState} from 'react'
import { Form,Col,Row } from 'react-bootstrap';
import {ContextFromServer} from '../../../context/index'
import { FormControl } from '@mui/material';

const ChangeUserData = ({props}) => {
  // setUser(props.userToChange)
  const { editUser , updateExams  , setUpdateContext , updateContext ,checkCategory,categoryExam } = useContext(ContextFromServer)
//Check category , where User change category for test 

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Change Details</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"onClick={()=>props.setEditCompUser(false)}></button>
        </div>
        <div className="modal-body">        
          <FormControl onSubmit={async(e)=>{
            e.preventDefault();
            if(categoryExam.length != 0)
            {
             editUser({...props.userToChange, 'userEmail':e.target[0].value ,'userPassword':e.target[1].value}) //change userEmail and Password
              .then(res => {
                updateExams(props.userToChange , categoryExam)  //change Exams
                props.setEditCompUser(false)                   //Close Component Page
              })
              .catch(err => alert('Enter Password'))                                                          
            }else
            alert('Choose Category to Test')                                                                     
            }}
            > 
            <Form>  
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" readOnly value={props.userToChange?.userEmail}/>
              <Form.Label>Password address</Form.Label>

              <Form.Control type="password" placeholder="Enter password"
               />

              <Form.Group as={Row} className="mb-3" style={{marginTop:25}}>
                <Form.Label as="legend" column sm={2} >
                    Categoria
                </Form.Label>
                  <Col sm={10} style={{marginLeft:25}}>
                    <Form.Check
                    type="checkbox"
                    label="JS"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    onClick = {((e)=>{checkCategory(e.target.checked,'1')})} /*JS*/
                    />
                    <Form.Check
                    type="checkbox"
                    label="React"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    onClick = {((e)=>{checkCategory(e.target.checked,'2')})}/*React*/
                    />

                    <Form.Check
                    type="checkbox"
                    label="Anular"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    onClick = {((e)=>{checkCategory(e.target.checked,'3')})}/*Angular*/
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                    <button type="submit" className="btn btn-primary" >Save changes</button>

                    </Col>
                </Form.Group>
            </Form>
          </FormControl> 
         
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>props.setEditCompUser(false)}>Close</button>
        </div>
      </div>  
    </div>
  )
}

export default ChangeUserData