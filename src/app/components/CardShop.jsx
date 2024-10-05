import React from 'react';
import { FaRegClock } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

const CardShop = ({ detail }) => {
    const router = useRouter();

    const handleNextPage =()=>{
        router.push(`/s/${detail.num}`)
    }
    
    return (
            <div onClick={handleNextPage} className='w-full bg-white p-4 mb-2 rounded-lg border shadow-md transition-transform transform hover:scale-105 duration-300 cursor-pointer'>
                <div className='flex items-center'>
                    {/* ภาพร้าน */}
                        <img className='h-[80px] w-[80px] rounded-md object-cover' src={`img/shop${detail.num}.png`} alt={detail.name} />
                    
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
    );
}

export default CardShop;
