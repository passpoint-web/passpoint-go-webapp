'use client'
import { useEffect, useState } from "react"
import { getToken } from "@/services/localService";
import { useRouter } from "next/navigation"
import FullScreenLoader from "@/components/Modal/FullScreenLoader"

const LoginLayout = ({children}) => {
  const {back} = useRouter()
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    const auth = await getToken()
    if (auth) {
      back()
    } else {
      setLoading(false)
    }
  }

  useEffect(()=>{
    checkAuth()
  },[])

  if (loading) {
    return <FullScreenLoader /> 
  }

  return (
    <>
      {children}
    </>
  )
}

export default LoginLayout
