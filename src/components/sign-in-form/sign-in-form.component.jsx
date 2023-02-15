import { useState } from 'react'
import { useDispatch } from 'react-redux'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import { googleSignInStart, emailSignInStart } from '../../store/user/user.action'

import './sign-in-form.styles.scss'

const defaultFormFields = {
	email: '',
	password: '',
}

const SignInForm = () => {
	const dispatch = useDispatch()
	const [formFields, setFormFields] = useState(defaultFormFields)
	const { email, password } = formFields

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const signInWithGoogle = async () => {
		dispatch(googleSignInStart())
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		try {
			dispatch(emailSignInStart(email, password))
			resetFormFields()
		} catch (error) {
			switch (error.code) {
				case 'auth/user-not-found':
					alert('No user associated with this email')
					break

				case 'auth/wrong-password':
					alert('Incorrect password for email')
					break

				default:
					console.log(error)
					break
			}
		}
	}

	const handleChange = (event) => {
		const { name, value } = event.target

		setFormFields({ ...formFields, [name]: value })
	}

	return (
		<div className='sign-up-container'>
			<h2>Already have an account</h2>
			<span>Sign In with your Email and Password</span>
			<form onSubmit={handleSubmit}>
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

				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button
						type='button'
						buttonType='google'
						onClick={signInWithGoogle}
					>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm
