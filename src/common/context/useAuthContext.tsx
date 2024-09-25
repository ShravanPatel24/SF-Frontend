import {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode,
	// useEffect
} from 'react'
import { User } from '@/types'
// import HttpClient from '../helpers/HttpClient';

const AuthContext = createContext<any>({})

export function useAuthContext() {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuthContext must be used within an AuthProvider')
	}
	return context
}

const authSessionKey = '_VELONIC_AUTH'

export function AuthProvider({ children }: { children: ReactNode }) {
	const [token, setToken] = useState(JSON.parse(localStorage.getItem('_VELONIC_AUTH') || '{}').token?.token || null);

	const [user, setUser] = useState(
		localStorage.getItem(authSessionKey)
			? JSON.parse(localStorage.getItem(authSessionKey) || '{}')
			: undefined
	)

	// useEffect(() => {
    //     if (token) {
    //         HttpClient.setAuthorizationHeader(token);
    //     } else {
    //         HttpClient.setAuthorizationHeader(process.env.BASIC_AUTH);
    //     }
    // }, [token]);

	const saveSession = useCallback(
		(user: User) => {
			localStorage.setItem(authSessionKey, JSON.stringify(user))
			setUser(user)
		},
		[setUser]
	)

	const removeSession = useCallback(() => {
		localStorage.removeItem(authSessionKey)
		setUser(undefined)
	}, [setUser])

	const logout = () => {
        setToken(null);
        localStorage.removeItem(authSessionKey);
    };

	return (
		<AuthContext.Provider
			value={{
				token,
				user,
				logout,
				isAuthenticated: Boolean(user),
				saveSession,
				removeSession,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
