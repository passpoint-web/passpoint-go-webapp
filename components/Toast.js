import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export const notify = (text) => toast(text)
const Toast = () => {
	return (<ToastContainer />)
}

export default Toast