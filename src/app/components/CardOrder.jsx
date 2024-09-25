'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

//icons
import { BsTrash3 } from "react-icons/bs";
import { FiMinus, FiPlus } from "react-icons/fi";
import { updateField } from '../redux/slice/userSlice';
import { useRouter } from 'next/navigation';

const CardOrder = () => {
    const dispatch = useDispatch();
    const rounter = useRouter();
    const { cart, userId } = useSelector((state) => state.user.user)

    useEffect(()=>{
        if(cart.length <= 0){
            rounter.replace('/')
        }
    },[cart])

    const handleAddTotal = (index) => {
        const isorderTotal = cart?.find((_, i) => (i === index))
        console.log("isorderTotal", isorderTotal)
        if (isorderTotal) {
            let total = isorderTotal.total + 1;
            dispatch(updateField(({ field: ['user', 'cart', index, 'total'], payload: total })))
        }
    }

    const handleMinusTotal = (index) => {
        const isorderTotal = cart?.find((_, i) => (i === index))
        console.log("isorderTotal", isorderTotal)
        if (isorderTotal) {
            let total = isorderTotal.total - 1;
            if (total > 0) {
                dispatch(updateField(({ field: ['user', 'cart', index, 'total'], payload: total })))
            }
        }
    }

    const handleDeleteOrder = (index) => {
        const updataCart = cart?.filter((_, i) => (i !== index))
        dispatch(updateField(({ field: ['user', 'cart'], payload: updataCart })))
    }

    return (
        <div className='flex flex-col w-full'>
            {cart.map((item, index) => {
                return (
                    <div key={index} className='w-full flex flex-col bg-white p-2 mb-2 rounded-lg border shadow-md transition-transform transform'>
                        <div className='flex items- justify-between'>
                            <h3 className='text-gray-600 text-lg font-medium'>
                                {item.name}
                            </h3>
                            <button onClick={() => handleDeleteOrder(index)}>
                                <BsTrash3 className='text-blue-600' />
                            </button>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-blue-700 text-xl font-medium'>{item.price}<span className='text-gray-600 text-base'> บาท</span></p>
                            <div className='flex py-1 items-center gap-6'>
                                <div className='flex bg-white shadow-gray-700/20 shadow-md rounded-full px-1 py-1 items-center'>
                                    <button onClick={() => handleMinusTotal(index)} ><FiMinus size={15} className='text-blue-700' /></button>
                                </div>
                                <p className='text-gray-600 text-base'>{item.total}</p>
                                <div className='flex bg-white shadow-gray-700/20 shadow-md rounded-full px-1 py-1 items-center'>
                                    <button onClick={() => handleAddTotal(index)}><FiPlus size={15} className='text-blue-700' /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CardOrder