// import configureFakeBackend from './common/api/fake-backend'
import { AuthProvider, ThemeProvider } from './common/context'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllRoutes from './routes/Routes'

import './assets/scss/app.scss'
import './assets/scss/icons.scss'

// configureFakeBackend()

function App() {
	return (
		<ThemeProvider>
			<ToastContainer />
			<AuthProvider>
				<AllRoutes />
			</AuthProvider>
		</ThemeProvider>
	)
}

export default App
