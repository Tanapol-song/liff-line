"use client"
import React, { useEffect, useState } from 'react'

import { services } from '@/lib/enums';
import { IoIosArrowBack } from "react-icons/io";
import { IoLocation } from "react-icons/io5";

//components
import CardMenu from '@/app/components/CardMenu';
import PopupMenu from '@/app/components/PopupMenu';
import FooterCart from '@/app/components/FooterCart';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const page = ({ params }) => {
    const { shopId } = params;
    const router = useRouter()
    const { cart } = useSelector((state) => state.user.user)
    const [shopDetail, setShopDetail] = useState(null)

    const [isOpen, setIsOpen] = useState(false)
    const [onSeletedMenu, setOnSeletedMenu] = useState(null)

    useEffect(() => {
        const current = services.find((shop) => shop.num === shopId)
        setShopDetail(current)
    }, [shopId])

    // console.log("shopDetail",shopDetail)
    const handleBackPage = () => {
        router.push('/');
    }

    const handleAddOrder = (index) => {
        const isSeletedMenu = shopDetail?.foods.find((_, i) => (i === index))
        if (isSeletedMenu) {
            setIsOpen(true)
            setOnSeletedMenu(isSeletedMenu)
        }
    }

    const handleClosePopup = () => {
        if (isOpen) {
            setOnSeletedMenu(null)
            setIsOpen(false)
        }
    }

    return (
        <div>
            {shopDetail === null ?
                <p>loading...</p> :
                <div className='w-full flex flex-col'>
                    <div className='w-full bg-white shadow-md border-b-2 border-gray-500/30 px-1 py-2'>
                        <div className='w-full px-4'>
                            <button onClick={handleBackPage}>
                                <IoIosArrowBack size={18} />
                            </button>
                            <h2 className='text-lg font-bold'>{shopDetail?.name}</h2>
                            <p className='text-xs text-gray-500'>{shopDetail?.detail.logcation} | <span>{shopDetail?.detail.tell}</span></p>
                            <div className='flex'>
                                <div className='bg-blue-700 py-1 px-3 rounded-full mt-2'>
                                    <p className='text-white text-xs '>เมนูทั้งหมด</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='m-4'>
                        {shopDetail?.foods.map((menu, index) => {
                            return (
                                <CardMenu onClick={() => handleAddOrder(index)} key={index} item={menu} />
                            )
                        })
                        }
                    </div>
                    <PopupMenu menu={onSeletedMenu} isOpen={isOpen} onClose={handleClosePopup} />
                    {/* Footer payment */}
                    {cart?.length > 0 &&
                        <FooterCart shop={shopDetail} />
                    }
                </div>
            }
        </div>

    )
}

export default page