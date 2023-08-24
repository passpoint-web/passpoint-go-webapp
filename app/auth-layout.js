import './globals.css'
import AuthHeader from '@/components/Auth/Header'
import FullScreenLoader from '@/components/Modal/FullScreenLoader'
// import {notify} from '@/components/Toast'
import Head from 'next/head'
// import { useEffect } from 'react'
export default function AuthLayout({ children, btn, pageTitle = '', fullScreenLoader }) {
	// useEffect(()=>{
	// 	notify('yoyoyoy')
	// },[])
	
	return (
		<div>
			<Head>
				<title>{`${pageTitle} | Auth | Passpoint Go`}</title>
			</Head>
			<AuthHeader btn={btn || {}} />
			{children}
			{fullScreenLoader ? <FullScreenLoader /> : <></>}
		</div>
	)
}
