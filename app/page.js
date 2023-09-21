

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Page = () => {
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
