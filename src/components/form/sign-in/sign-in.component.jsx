import React, { useState, useContext } from 'react'
import './sign-in.styles.scss'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// Components
import FormInput from '../../shared/form-input/form-input.component'
import Button from '../../shared/button/button.component'
// Services
import { signInUser } from '../../../services/auth.services'
// Providers
import { AuthContext } from '../../../providers/AuthProvider'

const initialValues = {
    email: '',
    password: ''
}
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must have atleast 6 characters')
        .required('Password is required')
})


export const SignInForm = ({modeSetter}) => {
    const { setAuth } = useContext(AuthContext)
    const [submitted, setSubmit] = useState(false)

    const submitForm = (values, { setSubmitting, setErrors, resetForm }) => {
        signInUser(values)
            .then(res => {
                console.log(res)
                setSubmit(false)
                setSubmitting(false)
                if (!res.data.auth) {
                    setErrors(res.data);
                } else {
                    resetForm({})
                    setAuth({type: 'save', token: res.data.token })
                }
            })
            .catch(error => {
                console.log('CATCHED ERROR', error)
                setSubmit(false)
                setSubmitting(false)
            })
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={submitted}
            validateOnBlur={submitted}
            onSubmit={(values, actions) => submitForm(values, actions)}>
            {({ isSubmitting }) => (
                <Form noValidate>
                    <Field type="email" component={FormInput} name="email" placeholder="Enter your email"/>
                    <Field type="password" component={FormInput} name="password" placeholder="Enter your password"/>
                    <Button handleClick={() => setSubmit(true)} disabled={isSubmitting} rounded={true} type="submit" text="Sign In" />
                    <p onClick={() => modeSetter('sign-up')}>I don't have an account</p>
                </Form>
            )}
        </Formik>
    )
}