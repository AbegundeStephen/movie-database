import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/esm/Button"

const Login = props => {
    const [name,setName]=useState("")
    const [id,setId] = useState("")

    const onChangeName = e => {
        const name = e.target.value
        setName(name)
    }

    const onChangeId = e => {
        const id = e.target.value
        setId(id)
    }
    const login = () => {
        props.login({name:name,id:id})
        props.history.push("/")
    }
    return(
        <div>
            <Form style={{width:"50%",marginLeft:"20px"}}>
            <Form.Group>
                    
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter user name"
                    value={name}
                    onChange={onChangeName}/>
                   
                </Form.Group>
                <Form.Group>

                    <Form.Label>Enter id</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter Id"
                    value={id}
                    onChange={onChangeId}/>
                    <Button variant="primary" onClick={login}>Submit</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Login;