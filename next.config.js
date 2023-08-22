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
		]
	},
	images: {
		// for countries api
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'flagcdn.com',
				port: '',
				pathname: '/w320/**',
			},
		],
	},
}

module.exports = nextConfig
