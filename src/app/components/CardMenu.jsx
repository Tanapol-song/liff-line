import React from 'react'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const CardMenu = ({ item, onClick }) => {
    return (
        <div onClick={onClick} className='w-full bg-white p-2 border-b-2 border-gray-500/20'>
            <div className='flex'>
                <img className='w-[50px] h-[50px] rounded-md' src={item?.img} />
                <div className='flex w-full justify-between pl-4'>
                    <div className='flex justify-between w-full'>
                        <p>{item?.name}</p>
                        <p>{item?.price} บาท</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardMenu