import React from 'react';
import { FaRegClock } from "react-icons/fa6";
import Link from 'next/link';

const CardShop = ({ detail }) => {
    // console.log('detail',detail)
    return (
        <Link href={`/s/${detail.num}`} passHref>
            <div className='w-full bg-white p-4 mb-2 rounded-lg border shadow-md transition-transform transform hover:scale-105 duration-300 cursor-pointer'>
                <div className='flex items-center'>
                    {/* ภาพร้าน */}
                    <div className='drop-shadow-md'>    
                        <img className='h-[80px] w-[80px] rounded-md object-cover' src={detail.imgUrl} alt={detail.name} />
                    </div>
                    
                    {/* รายละเอียดร้าน */}
                    <div className='pl-4 flex-1'>
                        <h2 className='font-bold text-lg text-gray-800'>{detail.name}</h2>
                        <p className='text-sm text-gray-600'>{detail.title}</p>
                        <div className='flex items-center text-gray-500 text-sm mt-2'>
                            <FaRegClock className='mr-1' />
                            <p>{detail.time}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CardShop;
