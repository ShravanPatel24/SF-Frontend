import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authApi } from '@/common'
 
export default function useForgotPassword() {
    const [loading, setLoading] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const navigate = useNavigate()
 
    // Send OTP to the email
    const sendOtp = async (data: any) => {
        const { email } = data;
        setLoading(true);
        try {
            const res: any = await authApi.forgetPassword({ email });
            if (res.code === 200) {
                setOtpSent(true);
                setEmail(email);
                const token = res.data.token;
                setToken(token);
                toast.success('OTP sent successfully.');
            } else {
                toast.error(res?.message || 'Failed to send OTP.');
            }
        } finally {
            setLoading(false);
        }
    };
 
 
    // Verify OTP and get token
    const verifyOtp = async (otp: string) => {
        setLoading(true);
        try {
            const res: any = await authApi.verifyOtp({ email, otp });
            if (res.code === 200) {
                if (token) {
                    navigate('/auth/reset-password', { state: { token } });
                    toast.success('OTP verified successfully.');
                } else {
                    toast.error('Token is missing. Please try again.');
                }
            } else {
                toast.error(res?.message || 'OTP verification failed.');
            }
        } finally {
            setLoading(false);
        }
    };
 
 
    // Reset password with the token
    const resetPassword = async (newPassword: string, token: string) => {
        setLoading(true);
        try {
            const res: any = await authApi.resetPassword({ token, newPassword });
            if (res.code === 200) {
                toast.success('Password reset successfully.');
                navigate('/auth/login');
            } else {
                toast.error(res?.message || 'Failed to reset password.');
            }
        } catch (error) {
            toast.error('An error occurred while resetting password.');
        } finally {
            setLoading(false);
        }
    }
 
    return { loading, otpSent, sendOtp, verifyOtp, resetPassword }
}