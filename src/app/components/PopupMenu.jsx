import { CloudLightning } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { FiMinus, FiPlus } from "react-icons/fi";
// import { RiArrowDownWideLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { updateField } from '../redux/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const PopupMenu = ({ isOpen, onClose, menu }) => {
    const dispatch = useDispatch();
    const { cart, userId } = useSelector((state) => state.user.user)
    const [isOrderCount, setIsOrderCount] = useState(0)
    const [des, setDes] = useState("")

    useEffect(() => {
        setIsOrderCount(0)
    }, [isOpen])
    useEffect(() => {
        console.log('cart', cart)
    }, [dispatch])

    const handlePlusOrder = () => {
        if (isOrderCount < 100) {
            setIsOrderCount((curr) => (curr + 1))
        }
    }

    const handleMinusOrder = () => {
        if (isOrderCount > 0) {
            setIsOrderCount((curr) => (curr - 1))
        }
    }

    const addToCart = () => {
        if (menu && isOrderCount > 0) {
            const order = {
                name: menu?.name,
                price: menu?.price,
                total: isOrderCount,
                des: des,
            }
            console.log('order', order)
            dispatch(updateField(({ field: ['user', 'cart'], payload: [...cart, order] })))
            onClose();
        }
    }

    return (
        <div className={`w-full  transition-all ${isOpen ? 'h-svh' : 'h-0'} bg-transparent z-50 fixed bottom-0 overflow-hidden`}>
            <div className='w-full h-full relative'>
                <div className={`w-full bg-white h-2/4 shadow-2xl border-t-4 border-blue-700 absolute bottom-0 rounded-t-md `}>
                    <div className='w-full h-full relative'>
                        {/* Button */}
                        <button onClick={onClose} className='absolute right-2 top-2'>
                            <IoClose size={20} />
                        </button>

                        <div className='px-4 py-2 flex flex-col items-center justify-around w-full h-full'>
                            {/* Detail Menu */}
                            <div className='w-full flex flex-col'>
                                <div className='w-full flex items-center justify-between mb-2'>
                                    <p className='text-lg font-medium'>{menu?.name}</p>
                                    <p className='text-lg font-medium'>{menu?.price} บาท</p>
                                </div>
                                <div className=''>
                                    <p className='text-sm text-gray-500 mb-1'>รายละเอียดเพิ่มเติม</p>
                                    <textarea
                                        rows={4}
                                        placeholder='เช่น เผ็ดน้อย..'
                                        value={des}
                                        onChange={(evt) => setDes(evt.target.value)}
                                        className='bg-gray-400/20 w-full text-sm resize-none rounded-md py-1 px-2 focus:outline-none border border-transparent focus:border-blue-700'
                                    />
                                </div>
                            </div>

                            {/* Section add or delete order */}
                            <div className='w-full flex justify-center  flex-col gap-2'>
                                <div className='flex gap-2 justify-center items-center'>
                                    <button onClick={handleMinusOrder} className='bg-white py-1 px-4 border rounded-full border-blue-500'>
                                        <FiMinus size={15} className='text-blue-700' />
                                    </button>
                                    <p className='text-base font-bold text-blue-800'>{isOrderCount}</p>
                                    <button onClick={handlePlusOrder}  className='bg-white py-1 px-4 border rounded-full border-blue-500'>
                                        <FiPlus size={15} className='text-blue-700' />
                                    </button>
                                </div>
                                <div className='flex justify-center'>
                                    <button onClick={addToCart} className='bg-blue-800 py-1 px-5 rounded-full'>
                                        <p className='text-xs font-medium text-white '>เพิ่มไปยังตะกร้า</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupMenu