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
				destination: '/auth/login',
				permanent: true,
			},
			{
				source: '/kyc',
				destination: '/kyc/business-type',
				permanent: true,
			},
			{
				source: '/dashboard/public-profile-setup',
				destination: '/dashboard/public-profile-setup/identity',
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
