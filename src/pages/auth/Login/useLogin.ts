import { authApi, useAuthContext } from '@/common'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { User } from '@/types'
import { toast } from 'react-toastify';

export default function useLogin() {
	const [loading, setLoading] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()

	const { isAuthenticated, saveSession } = useAuthContext()

	const redirectUrl = useMemo(
		() =>
			location.state && location.state.from
				? location.state.from.pathname
				: '/',
		[location.state]
	)

	const login = async ({ emailOrPhone, password }: User) => {
		setLoading(true)
		try {
			const res: any = await authApi.login({ emailOrPhone, password })
			if (res.code === 200) {
				if (res?.data?.tokens && res?.data?.tokens?.refresh) {
					saveSession({ ...(res?.data?.admin ?? {}), token: res?.data?.tokens?.refresh })
					window.location.reload();
					navigate(redirectUrl)
				}
			} else {
				toast.error(res?.message);
			}
		} finally {
			setLoading(false)
		}
	}

	return { loading, login, redirectUrl, isAuthenticated }
}
