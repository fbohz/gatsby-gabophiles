import React, {useState, useContext} from "react"
import styled from "styled-components"
import {FirebaseContext} from '../components/Firebase'
import { navigate } from "gatsby"
import {Form, Input, Button, ErrorMessage} from "../components/common/index"

const Signup = () => {
    const {firebase} = useContext(FirebaseContext)
    const [error, setError] = useState('')

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if (formValues.password === formValues.confirmPassword) {
              firebase.signup({
                  email: formValues.email,
                  password: formValues.password,
                  username: formValues.username
              }).then(() => {
                navigate("/")
              }).catch(e => {
                console.log(e)
                setError(e.message)
            })
        } else {
            setError('Password and Confirm Password Must Match')
        }

        console.log(formValues)

    }

    const handleChange = (e) => {
        e.persist()
        setError('')
        setFormValues(currentValues => ({
            ...currentValues,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input onChange={handleChange} value={formValues.username} name="username" placeholder="username" type="text" required />
            <Input onChange={handleChange} value={formValues.email} name="email" placeholder="email" type="email" required />
            <Input onChange={handleChange} value={formValues.password} name="password" placeholder="password" type="password" minLength={6} required />
            <Input onChange={handleChange} value={formValues.confirmPassword} name="confirmPassword" placeholder="confirm password" type="password" minLength={6} required />
            {
                !!error && <ErrorMessage><small>{error}</small></ErrorMessage>
            }
            <Button type="submit">Signup</Button>
        </Form>
    )
}

export default Signup