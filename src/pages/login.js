import React, { useState, useContext } from "react"
import { navigate } from "gatsby"
import {FirebaseContext} from '../components/Firebase'

import {Form, Input, Button} from "../components/common/index"

const Login = () => {
  const [formValues, setFormValues] = useState({email: '', password: ''})
  const {firebase} = useContext(FirebaseContext)

  function handleSubmit(e) {
    e.preventDefault()
    firebase.login({email: formValues.email, password: formValues.password}).then(() => {
        navigate("/")
      })
  }

  function handleChange(e){
      e.persist()
      setFormValues(values => ({
          ...values,
          [e.target.name]: e.target.value
      }))
  }

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Input value={formValues.email} onChange={handleChange} placeholder="email" type="email" name="email"></Input>
        <Input value={formValues.password} onChange={handleChange} placeholder="password" type="password" name="password"></Input>
        <Button>Login</Button>
      </Form>
    </section>
  )
}

export default Login