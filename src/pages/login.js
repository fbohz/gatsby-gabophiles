import React, { useState, useContext } from "react"
import { navigate } from "gatsby"
import {FirebaseContext} from '../components/Firebase'

import {Form, Input, Button, ErrorMessage} from "../components/common/index"

const Login = () => {
  const [formValues, setFormValues] = useState({email: '', password: ''})
  const {firebase} = useContext(FirebaseContext)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    firebase.login({email: formValues.email, password: formValues.password}).then(() => {
        navigate("/")
      }).catch(e => {
          console.log(e)
          setError(e.message)
      })
  }

  function handleChange(e){
      e.persist()
      setError('')
      setFormValues(values => ({
          ...values,
          [e.target.name]: e.target.value
      }))
  }

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Input value={formValues.email} onChange={handleChange} placeholder="email" type="email" name="email" required></Input>
        <Input value={formValues.password} onChange={handleChange} placeholder="password" type="password" name="password" required></Input>
        {
            !!error && <ErrorMessage><small>{error}</small></ErrorMessage>
        }
        <Button>Login</Button>
      </Form>
    </section>
  )
}

export default Login