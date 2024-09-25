import React, { useEffect, useState } from 'react'
import { FaShoppingBasket } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';

import axios from 'axios';
const FooterCart = ({ shop }) => {
    const router = useRouter()
    const pathname = usePathname();
    const { cart, userId } = useSelector((state) => state.user.user)
    const [totalPrice, setTotalPrice] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const token = `0iukf5QtNSeDbv4BGUy7k47z9OsNixCCDMdoG7Ntq18dtGEy0llO3zaExUevo1uD8i2t2Pbymm6L+LJSe1r8kXbQfFIE97wFfv1YUfDfb3DVm7kyvHIXveaEc9lUz+oWwv58PqSMNq8lUVe6SV0P0gdB04t89/1O/w1cDnyilFU=`

    useEffect(() => {
        let total = 0;
        cart?.forEach((item, i) => (total += (item.price * item.total)))
        setTotalPrice(total)
    }, [cart])


    const goToLine = async () => {
        if (isLoading) return;
        try {
            setIsLoading(true);
            const data = {
                userId: userId, // ต้องเป็น userId ที่ต้องการส่งข้อความถึง
                token: token,   // ใส่ token ของ LINE API
                // message: "flexMessage"
                cart: cart,
                shop: shop,
                qrCodeDataURL: qrCodeDataUrl
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

    console.log('pathname',pathname)
    const handleNextPage = ()=>{
        router.push(`${pathname}/cart`)
    }
    return (
        <div onClick={handleNextPage} className='w-full bg-blue-700 py-2  px-4 fixed bottom-0 rounded-t-lg cursor-pointer'>
            <div className='flex items-center justify-between'>
                <div className='flex bg-blue-800 items-center gap-1 px-2 rounded-lg'>
                    <FaShoppingBasket className='text-white' />
                    <p className='text-white'>{cart ? cart.length : 0}</p>
                </div>
                <div className='px-4 py-2'>
                        <p className='text-white'>
                            ดูตะกร้าสินค้า
                        </p>
                </div>
                <p className='text-white'><span>{totalPrice}</span> บาท</p>
            </div>
        </div>
    )
}

export default FooterCart