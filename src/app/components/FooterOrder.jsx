'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Fragment } from 'react'

import PaymentModal from '@/app/components/PaymentModal';
import axios from 'axios'

const FooterOrder = () => {

    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const [totalPrice, setTotalPrice] = useState(0)
    const { cart, userId } = useSelector((state) => state.user.user)
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState(null)
    const promptpay = "0969565976"

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
            await axios.post('/api/genarateQrcode', data)
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        setShowModal(true)
                        console.log(res.data.qrCodeDataURL)
                        setQrCodeDataUrl(res.data.qrCodeDataURL)
                    }
                })
                .catch((err) => {
                    console.log(err)
                });

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Fragment>
            <div className='w-full bg-white fixed bottom-0 py-4 px-4 shadow-black shadow-lg'>
                <div className='flex flex-col'>
                    <div className='flex items-center justify-between pb-4'>
                        <h1>
                            ราคารวม
                        </h1>
                        <p>{totalPrice}<span> บาท</span></p>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button onClick={generateQrcode} className='w-full bg-blue-700 rounded-md py-1'>
                            <p className='text-white'>ถัดไป</p>
                        </button>
                    </div>
                </div>

            </div>
            <PaymentModal isVisible={showModal} isQrcodeUrl={qrCodeDataUrl}/>
        </Fragment>
    )
}

export default FooterOrder