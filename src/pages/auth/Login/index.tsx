import { Button } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AuthLayout from '../AuthLayout'
import useLogin from './useLogin'

// components
import { VerticalForm, FormInput, PageBreadcrumb } from '@/components'

interface UserData {
	emailOrPhone: string
	password: string
}

// const BottomLinks = () => {
// 	return (
// 		<Row>
// 			<Col xs={12} className="text-center">
// 				<p className="text-dark-emphasis">
// 					Don't have an account?{' '}
// 					<Link
// 						to="/auth/register"
// 						className="text-dark fw-bold ms-1 link-offset-3 text-decoration-underline"
// 					>
// 						<b>Sign up</b>
// 					</Link>
// 				</p>
// 			</Col>
// 		</Row>
// 	)
// }

const schemaResolver = yupResolver(
	yup.object().shape({
		emailOrPhone: yup.string().required('Please enter email/phone address'),
		password: yup.string().required('Please enter Password'),
	})
)
const Login = () => {
	const { loading, login, redirectUrl, isAuthenticated } = useLogin()
	return (
		<>
			<PageBreadcrumb title="Log In" />

			{isAuthenticated && <Navigate to={redirectUrl} replace />}

			<AuthLayout
				authTitle="Sign In"
				helpText="Enter your email address and password to access account."
				// bottomLinks={<BottomLinks />}
				// hasThirdPartyLogin
			>
				<VerticalForm<UserData>
					onSubmit={login}
					resolver={schemaResolver}
					defaultValues={{ emailOrPhone: '', password: '' }}>
					<FormInput
						label="Email/Phone"
						type="text"
						name="emailOrPhone"
						placeholder="Enter your email/phone"
						containerClass="mb-3"
						required
					/>
					<FormInput
						label="Password"
						name="password"
						type="password"
						required
						id="password"
						placeholder="Enter your password"
						containerClass="mb-3">
						<Link
							to="/auth/forgot-password"
							className="text-muted float-end"
							style={{ textDecoration: 'none', color: 'inherit' }}>
							<small
								style={{
									transition: 'color 0.2s ease-in-out',
									cursor: 'pointer',
								}}
								onMouseEnter={(e) => (e.currentTarget.style.color = '#007bff')}
								onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}>
								Forgot your password?
							</small>
						</Link>
					</FormInput>
					<FormInput
						label="Remember me"
						type="checkbox"
						name="checkbox"
						containerClass={'mb-3'}
					/>
					<div className="mb-0 text-start">
						<Button
							variant="soft-primary"
							className="w-100"
							type="submit"
							disabled={loading}>
							<i className="ri-login-circle-fill me-1" />{' '}
							<span className="fw-bold">Log In</span>{' '}
						</Button>
					</div>
				</VerticalForm>
			</AuthLayout>
		</>
	)
}

export default Login