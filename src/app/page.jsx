"use client"
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CardShop from './components/CardShop'

import { services } from '@/lib/enums'
const page = () => {
  const user = useSelector((state => state.user.user))

  console.log(user)
  return (
    <div className='container px-4'>
      {user?.userId === null ?
        <p>Loadling....</p> :
        <div>
          <h1 className='text-lg font-bold my-2'>ร้านอาหารสำหรับคุณ</h1>
          {services.map((item, index) => {
            return <CardShop key={index}
              detail={item}
            />
          })}
        </div>

      }

    </div>
  )
}
export default page