import { HttpClient } from '../helpers'

function AuthService() {
	return {
		login: (values: any) => {
			return HttpClient.post('/admin/auth/login', values)
		},
		logout() {
			return HttpClient.post('/admin/auth/logout', {})
		},
		register: (values: any) => {
			return HttpClient.post('/admin/auth/register', values)
		},
		verifyOtp: (values: any) => {
			return HttpClient.post('/admin/auth/verify-email-otp', values)
		},
		forgetPassword: (values: any) => {
			return HttpClient.post('/admin/auth/forgot-password', values)
		},
		resetPassword: (values: any) => {
			return HttpClient.post('/admin/auth/reset-password', values)
		},
		changePassword: (values: any) => {
			return HttpClient.post('/admin/change-password', values)
		},
		updateProfile: (values: any, id: any) => {
			return HttpClient.patch('/admin/' + id, values)
		},
		dashboardData: () => {
			return HttpClient.get('/dashboard')
		},
	}
}

export default AuthService()