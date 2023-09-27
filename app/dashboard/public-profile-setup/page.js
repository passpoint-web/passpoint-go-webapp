
'use client'
import BackBtn from '@/components/Btn/Back'
import React from 'react'
import { useRouter } from 'next/navigation'

const PublicProfile = () => {
  const {back} = useRouter()
  return (
    <div>
    <BackBtn onClick={()=>back()} />
    </div>
  )
}

export default PublicProfile
