
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import toast from '@/components/Toast'
import 'react-toastify/dist/ReactToastify.css'


const Page = () => {
	useEffect(() => {
		toast({ type: 'info', message: 'Hello world!' })
	}, [])
	return (
		<div>
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
		</div>
	)
}

export default Page
