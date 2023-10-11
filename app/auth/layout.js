import AuthLayout from '@/components/Layouts/AuthLayout'
export const metadata = () => {
	return {
		title: 'Authentication | Passpoint Go',
		description: '',
	}
}

const Layout = ({children}) => {
	return (
		<AuthLayout>
			{children}
		</AuthLayout>
	)
}

export default Layout
