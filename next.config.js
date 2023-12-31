/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
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
				source: '/kyc/individual',
				destination: '/kyc/individual/identity',
				permanent: true,
			},
			{
				source: '/kyc/corporate',
				destination: '/kyc/corporate/business',
				permanent: true,
			},
			{
				source: '/business-profile-setup',
				destination: '/business-profile-setup/identity',
				permanent: true,
			},
			{
				source: '/settings',
				destination: '/settings/activity',
				permanent: true,
			},
			{
				source: '/business-profile',
				destination: '/business-profile/preview',
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
				protocol: 'https',
				hostname: 'chart.googleapis.com',
				port: '',
				pathname: '/chart',
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
