import React, { useState } from 'react'
import './sign-up.styles.scss'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// Components
import FormInput from '../../shared/form-input/form-input.component'
import Button from '../../shared/button/button.component'
// Services
import { signUpUser } from '../../../services/auth.services'

const initialValues = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    verify_password: ''
}
const validationSchema = Yup.object({
    fullname: Yup.string()
        .required('Fullname is required'),
    username: Yup.string()
        .min(5, 'Username must have atleast 5 characters')
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must have atleast 6 characters')
        .required('Password is required'),
    verify_password: Yup.string()
        .required('Verification is required')
        .oneOf([Yup.ref("password"), null], "Passwords do not match")
})

export const SignUpForm = ({modeSetter}) => {
    const [submitted, setSubmit] = useState(false)
    
    const submitForm = (values, { setSubmitting, setErrors, resetForm }) => {
        signUpUser(values).then(res => {
            if (!res.data.auth) {
                setErrors(res.data);
            } else {
                console.log('Success', res.auth)
                resetForm({})
            }
            setSubmit(false)
            setSubmitting(false)
        })
    }
    return (
        <React.Fragment>
            {/* <button>Login with Gmail</button> */}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnChange={submitted}
                validateOnBlur={submitted}
                onSubmit={(values, actions) => submitForm(values, actions)}>
                <Form noValidate>
                    <Field type="text" component={FormInput} name="fullname" placeholder="Enter your fullname"/>
                    <Field type="text" component={FormInput} name="username" placeholder="Enter your username"/>
                    <Field type="email" component={FormInput} name="email" placeholder="Enter your email"/>
                    <Field type="password" component={FormInput} name="password" placeholder="Enter your password"/>
                    <Field type="password" component={FormInput} name="verify_password" placeholder="Verify your password"/>
                    <Button handleClick={() => setSubmit(true)} type="submit" text="Sign Up" rounded={true} />
                    <p onClick={() => modeSetter('sign-in')}>I already have an account</p>
                </Form>
            </Formik>
        </React.Fragment>
    )
}