import { useState } from 'react'
import { useDispatch } from 'react-redux'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'


import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

import './sign-up-form.styles.scss'

import { signUpStart } from '../../store/user/user.action'

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields)
	const { displayName, email, password, confirmPassword } = formFields
	const dispatch = useDispatch()

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		if (password !== confirmPassword) {
			alert('Passwords do not match')
			return
		}

		try {
			signUpStart(email, password, displayName)
			resetFormFields()
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Cannot create user. Email already in use')
			} else {
				console.log('User creation encoutered an error', error)
			}
		}
	}

	const handleChange = (event) => {
		const { name, value } = event.target

		setFormFields({ ...formFields, [name]: value })
	}

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account ?</h2>
			<span>Sign Up with your Email and Password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					type='text'
					onChange={handleChange}
					name='displayName'
					value={displayName}
					required
				/>

				<FormInput
					label='Email'
					type='email'
					onChange={handleChange}
					name='email'
					value={email}
					required
				/>

				<FormInput
					label='Password'
					type='password'
					onChange={handleChange}
					name='password'
					value={password}
					required
				/>

				<FormInput
					label='Confirm Password'
					type='password'
					onChange={handleChange}
					name='confirmPassword'
					value={confirmPassword}
					required
				/>

				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	)
}

export default SignUpForm
