import React, { useEffect, useState } from 'react'
import { FaShoppingBasket } from "react-icons/fa";
import { useSelector } from 'react-redux';

import axios from 'axios';
const FooterCart = ({ shop }) => {
    const { cart, userId } = useSelector((state) => state.user.user)
    const [totalPrice, setTotalPrice] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    console.log("shop",shop.detail.tell)
    useEffect(() => {
        let total = 0;
        cart?.forEach((item, i) => (total += (item.price * item.total)))
        setTotalPrice(total)
    }, [cart])
    
    //Submit order
    const token = `0iukf5QtNSeDbv4BGUy7k47z9OsNixCCDMdoG7Ntq18dtGEy0llO3zaExUevo1uD8i2t2Pbymm6L+LJSe1r8kXbQfFIE97wFfv1YUfDfb3DVm7kyvHIXveaEc9lUz+oWwv58PqSMNq8lUVe6SV0P0gdB04t89/1O/w1cDnyilFU=`
    const goToLine = async () => {
        if (isLoading) return;
        try {
            setIsLoading(true);
            const data = {
                userId: userId, // ต้องเป็น userId ที่ต้องการส่งข้อความถึง
                token: token,   // ใส่ token ของ LINE API
                // message: "flexMessage"
                cart:cart,
                shop:shop
            };

            await axios.post('/api/sendMessage', data) // เรียก API Route ใน Next.js
                .then((res) => {
                    console.log('res', res);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };
 console.log("cart",cart)
    return (
        <div className='w-full bg-blue-700 py-2  px-4 sticky bottom-0 rounded-t-lg'>
            <div className='flex items-center justify-between'>
                <div className='flex bg-blue-800 items-center gap-1 px-2 rounded-lg'>
                    <FaShoppingBasket className='text-white' />
                    <p className='text-white'>{cart ? cart.length : 0}</p>
                </div>
                <div className='px-4 py-2'>
                    <button onClick={goToLine}>
                        <p className='text-white'>
                            ยืนยันสั่งอาหาร
                        </p>
                    </button>
                </div>
                <p className='text-white'><span>{totalPrice}</span> บาท</p>
            </div>
        </div>
    )
}

export default FooterCart