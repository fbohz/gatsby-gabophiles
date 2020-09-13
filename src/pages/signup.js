import React, {useState, useContext} from "react"
import styled from "styled-components"
import {FirebaseContext} from '../components/Firebase'

import {Form, Input, Button} from "../components/common/index"

const Signup = () => {
    const {firebase} = useContext(FirebaseContext)

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if (formValues.password === formValues.confirmPassword) {
              firebase.signup({
                  email: formValues.email,
                  password: formValues.password
              }).then(() => {
                navigate("/")
              })
        }

        console.log(formValues)

    }

    const handleChange = (e) => {
        e.persist()
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input onChange={handleChange} value={formValues.email} name="email" placeholder="email" type="email" required />
            <Input onChange={handleChange} value={formValues.password} name="password" placeholder="password" type="password" minLength={3} required />
            <Input onChange={handleChange} value={formValues.confirmPassword} name="confirmPassword" placeholder="confirm password" type="password" minLength={3} required />
            <Button type="submit">Signup</Button>
        </Form>
    )
}

export default Signup