import React, { useState } from "react"
// import { Link } from "gatsby"
import {useAuth} from '../components/Firebase'

import Layout from "../components/layout"

const Login = () => {
  const [formValues, setFormValues] = useState({email: '', password: ''})
  const {firebase} = useAuth()

  function handleSubmit(e) {
    e.preventDefault()
    firebase.login({email: formValues.email, password: formValues.password})
  }

  function handleChange(e){
      e.persist()
      setFormValues(values => ({
          ...values,
          [e.target.name]: e.target.value
      }))
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <input value={formValues.email} onChange={handleChange} placeholder="email" type="email" name="email"></input>
        <input value={formValues.password} onChange={handleChange} placeholder="password" type="password" name="password"></input>
        <button>Login</button>
      </form>
    </Layout>
  )
}

export default Login
