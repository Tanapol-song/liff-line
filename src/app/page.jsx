"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardShop from './components/CardShop'

import { services } from '@/lib/enums'
import { updateField } from './redux/slice/userSlice'
import { usePathname } from 'next/navigation'
const HomePage = () => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const user = useSelector((state => state.user.user))

  useEffect(() => {
    dispatch(updateField(({ field: ['user', 'cart'], payload: [] })))
  }, [pathName])

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className='container px-4'>
      {user?.userId === null ?
        <p>Loadling....</p> :
        <div>
          <h1 className='text-lg font-bold my-2'>ร้านอาหารสำหรับคุณ</h1>
          {shuffleArray(services)?.map((item, index) => {
            return (<CardShop key={index}
              detail={item}
            />)
          })}
        </div>
      }

    </div>
  )
}
export default HomePage