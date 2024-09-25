import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import AuthLayout from '../AuthLayout'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useForgotPassword from '../ForgotPassword/useForgotPassword'
import { FormInput, VerticalForm, PageBreadcrumb } from '@/components'
import { useEffect } from 'react'

const ResetPassword = () => {
	const { resetPassword } = useForgotPassword()
	const location = useLocation()
	const navigate = useNavigate()

	// Retrieve the token from location.state
	const token = location.state?.token

	// If token is missing, redirect to forgot password page
	useEffect(() => {
		if (!token) {
			navigate('/auth/forgot-password')
		}
	}, [token, navigate])

	const schemaResolver = yupResolver(
		yup.object().shape({
			newPassword: yup
				.string()
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
					'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (!, @, #, etc.)'
				)
				.required('Please enter a new password'),
			confirmPassword: yup
				.string()
				.oneOf([yup.ref('newPassword'), undefined], 'Passwords must match')
				.required('Please confirm your new password'),
		})
	)

	// If token is still not present, don't render the form
	if (!token) {
		return null
	}

	return (
		<div>
			<PageBreadcrumb title="Reset Password" />
			<AuthLayout
				authTitle="Reset Password"
				helpText="Please enter your new password below.">
				<VerticalForm<{ newPassword: string; confirmPassword: string }>
					onSubmit={(data: { newPassword: string }) =>
						resetPassword(data.newPassword, token)
					}
					resolver={schemaResolver}>
					<FormInput
						label="New Password"
						type="password"
						name="newPassword"
						placeholder="Enter new password"
						containerClass="mb-3"
						required
					/>
					<FormInput
						label="Confirm New Password"
						type="password"
						name="confirmPassword"
						placeholder="Confirm new password"
						containerClass="mb-3"
						required
					/>
					<Button variant="soft-primary" className="w-100" type="submit">
						Reset Password
					</Button>
				</VerticalForm>
			</AuthLayout>
		</div>
	)
}

export default ResetPassword