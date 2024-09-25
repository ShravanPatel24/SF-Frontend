import { Button } from 'react-bootstrap'
import AuthLayout from '../AuthLayout'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useForgotPassword from './useForgotPassword'
import { FormInput, VerticalForm, PageBreadcrumb } from '@/components'

const ForgotPassword = () => {
	const { loading, otpSent, sendOtp, verifyOtp } = useForgotPassword()

	const schemaResolver = yupResolver(
		yup.object().shape({
			email: yup
				.string()
				.email('Please enter a valid email')
				.required('Please enter email'),
		})
	)

	const otpSchemaResolver = yupResolver(
		yup.object().shape({
			otp: yup.string().required('Please enter OTP'),
		})
	)

	return (
		<div>
			<PageBreadcrumb title="Forgot Password" />
			<AuthLayout
				authTitle="Forgot Password?"
				helpText={
					otpSent
						? 'Please enter the OTP sent to your email.'
						: "Enter your email address and we'll send you an OTP to reset your password."
				}>
				{otpSent ? (
					<VerticalForm<{ otp: string }>
						onSubmit={(data: { otp: string }) => verifyOtp(data.otp)}
						resolver={otpSchemaResolver}>
						<FormInput
							label="OTP"
							type="text"
							name="otp"
							placeholder="Enter OTP"
							containerClass="mb-3"
							required
						/>
						<Button
							variant="soft-primary"
							className="w-100"
							type="submit"
							disabled={loading}>
							Verify OTP
						</Button>
					</VerticalForm>
				) : (
					<VerticalForm<{ email: string }>
						onSubmit={sendOtp}
						resolver={schemaResolver}>
						<FormInput
							label="Email address"
							type="email"
							name="email"
							placeholder="Enter your email"
							containerClass="mb-3"
							required
						/>
						<Button
							variant="soft-primary"
							className="w-100"
							type="submit"
							disabled={loading}>
							Send OTP
						</Button>
					</VerticalForm>
				)}
			</AuthLayout>
		</div>
	)
}

export default ForgotPassword