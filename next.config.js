/** @type {import('next').NextConfig} */
const nextConfig = {

	async redirects() {
		return [
			{
				source: '/auth',
				destination: '/auth/login',
				permanent: true,
			},
			{
				source: '/',
				destination: '/dashboard',
				permanent: true,
			},
			{
				source: '/dashboard/kyc/individual',
				destination: '/dashboard/kyc/individual/identity',
				permanent: true,
			},
			{
				source: '/dashboard/kyc/corporate',
				destination: '/dashboard/kyc/corporate/business',
				permanent: true,
			},
			{
				source: '/dashboard/business-profile-setup',
				destination: '/dashboard/business-profile-setup/identity',
				permanent: true,
			},
			{
				source: '/dashboard/settings',
				destination: '/dashboard/settings/activity',
				permanent: true,
			},
			{
				source: '/dashboard/business-profile',
				destination: '/dashboard/business-profile/preview',
				permanent: true,
			},
		]
	},
	images: {
		// for countries api
		domains: [''],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'flagcdn.com',
				port: '',
				pathname: '/w320/**',
			},
			{
				protocol: 'https',
				hostname: 's3-alpha-sig.figma.com',
				port: '',
				pathname: '/img/**',
			},
			{
				protocol: 'http',
				hostname: 'localhost:3000',
				port: '',
				pathname: '/',
			},
		],
	},
}

module.exports = nextConfig
