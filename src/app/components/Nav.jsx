"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { FaBasketShopping } from "react-icons/fa6";
import { useRouter } from 'next/navigation'

const Nav = () => {
    const user = useSelector((state => state.user.user))
    const cart = useSelector((state) => state.user.cart)

    const router = useRouter()
    //console.log(cart?.length)
    //console.log('Proflie', user)

    const handleCartPage = () => {
        router.push('/Cart');
    }

    return (
        <nav className='w-full bg-white border-b shadow-sm py-2 px-4'>
            <div className='flex items-center justify-between'>
                <div className='flex text-lg font-semibold'>
                    <p className='text-blue-700'>Welcome <span className='text-black'>{user?.displayName}</span></p>
                </div>
                <div className='flex items-center gap-3'>
                    <button onClick={handleCartPage} className=' relative'>
                        <FaBasketShopping size={22} className='cursor-pointer text-gray-700' />
                        {cart?.length > 0 &&
                            <div className='absolute -top-1 -right-1'>
                                <div className='bg-red-500 py-[2px] px-[5px] rounded-full'>
                                    <p className='text-white text-[9px] font-semibold'>{cart?.length}</p>
                                </div>
                            </div>
                        }
                    </button>
                    <img className='w-[30px] h-[30px] rounded-full' src={user?.pictureUrl} />
                </div>
            </div>
        </nav>
    )
}

export default Nav