import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import toast from '@/components/Toast'
import 'react-toastify/dist/ReactToastify.css'

const App = ({ Component, pageProps }) => {
	useEffect(() => {
		toast({ type: 'info', message: 'Hello world!' })
	}, [])

	return (
		<>
			<Component {...pageProps} />
			<ToastContainer
				position="top-right"
				autoClose={8000}
				hideProgressBar={false}
				newestOnTop={false}
				draggable={false}
				pauseOnVisibilityChange
				closeOnClick
				pauseOnHover
			/>
		</>
	)
}

export default App
