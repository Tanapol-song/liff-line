'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Fragment } from 'react'

import PaymentModal from '@/app/components/PaymentModal';
import axios from 'axios'

const FooterOrder = ({ shop }) => {
    const router = useRouter();
    const { cart, userId } = useSelector((state) => state.user.user)
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState(null)

    const promptpay = "0969565976"
    const token = `0iukf5QtNSeDbv4BGUy7k47z9OsNixCCDMdoG7Ntq18dtGEy0llO3zaExUevo1uD8i2t2Pbymm6L+LJSe1r8kXbQfFIE97wFfv1YUfDfb3DVm7kyvHIXveaEc9lUz+oWwv58PqSMNq8lUVe6SV0P0gdB04t89/1O/w1cDnyilFU=`

    useEffect(() => {
        let total = 0;
        cart?.forEach((item, i) => (total += (item.price * item.total)))
        setTotalPrice(total)
    }, [cart])

    const generateQrcode = async () => {
        try {
            const data = {
                phoneNumber: promptpay,
                amount: totalPrice
            };
            const res = await axios.post('/api/genarateQrcode', data)
            if (res.status >= 200 && res.status < 300) {
                setShowModal(true)
                console.log(res.data.qrCodeDataURL)
                setQrCodeDataUrl(res.data.qrCodeDataURL)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const goToLine = async () => {
        if (isLoading) return
        try {
            setIsLoading(true);
            const data = {
                userId: userId,
                token: token,
                cart: cart,
                shop: shop,
            };
            const res = await axios.post('/api/sendMessage', data)
            if (res.status >= 200 && res.status < 300) {
                await generateQrcode();
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };
   console.log("cart",cart)
    return (
        <Fragment>
            <div className='w-full bg-white fixed bottom-0 py-4 px-4 shadow-black shadow-lg'>
                <div className='flex flex-col'>
                    <div className='flex items-end justify-between'>
                        <h1 className='text-gray-600 font-medium'>
                            ราคารวม
                        </h1>
                        <div className='flex items-end gap-2'>
                            <h1 className='text-2xl text-red-700 font-medium'>{totalPrice}</h1>
                            <p className='text-md text-gray-600 font-medium'>บาท</p>
                        </div>
                    </div>
                    <p className='py-2 text-sm text-orange-700'>โปรดเช็ครายการทั้งหมดก่อน</p>
                    <div className='flex items-center justify-center'>
                        <button onClick={goToLine} className='w-full bg-blue-700 rounded-md py-1'>
                            <p className='text-white'>ชำระเงิน</p>
                        </button>
                    </div>
                </div>

            </div>
            <PaymentModal isVisible={showModal} isQrcodeUrl={qrCodeDataUrl} />
        </Fragment>
    )
}

export default FooterOrder