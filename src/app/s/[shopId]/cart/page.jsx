"use client"
import React from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

//icon
import { IoIosArrowBack } from 'react-icons/io';

//component
import CardOrder from '@/app/components/CardOrder';
import FooterOrder from '@/app/components/FooterOrder';

const page = () => {
    const rounter = useRouter();
    const { cart, userId } = useSelector((state) => state.user.user)

    const handleBackPage = () => {
        rounter.back()
    }

    return (
            <div className='w-full h-full flex flex-col'>
                <div className='w-full flex flex-col px-4'>
                    {/* Header */}
                    <div className='w-full flex justify-center py-3 relative'>
                        <h1 className='text-gray-600'>ตะกร้าของฉัน</h1>
                        <button onClick={handleBackPage} className='absolute left-0 inset-y-0'>
                            <IoIosArrowBack size={18} />
                        </button>
                    </div>

                    {/* Container Card */}
                    <div className='w-full py-3'>
                        <CardOrder />
                    </div>
                </div>
                <FooterOrder />
            </div>
    )
}

export default page