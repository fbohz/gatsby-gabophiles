import React, {useState, useContext} from "react"
import styled from "styled-components"
import {FirebaseContext} from '../components/Firebase'
import { navigate } from "gatsby"
import {Form, Input, Button} from "../components/common/index"

const Signup = () => {
    const {firebase} = useContext(FirebaseContext)
    const [error, setError] = useState('')

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
              }).catch(e => {
                console.log(e)
                setError(e.message)
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
            {
            !!error && <span>{error}</span>
            }
            <Button type="submit">Signup</Button>
        </Form>
    )
}

export default Signup