import React from 'react'
import liff from '@line/liff';


const PaymentModal = ({ isVisible, isQrcodeUrl }) => {
    if (!isVisible) return null;

    const handleCloseLiff = () =>{
        liff.closeWindow();
    }
    return (
        <div className='fixed inset-0 bg-black bg-opacity-10 backdrop-blur-[2px] flex items-center justify-center'>
            <div className='w-full flex flex-col px-6'>
                <div className='flex flex-col bg-white drop-shadow-md items-center justify-center py-2 gap-y-2 rounded-md'>
                    <p>โปรดสแกน Qrcode เพื่อชำระเงิน</p>
                    <img className='w-[300px] h-[300px]' src={isQrcodeUrl} />
                    <button onClick={handleCloseLiff} className='bg-blue-700 rounded-md px-6 py-1'>
                        <p className='text-white'>กลับสู่หน้า line</p>
                    </button>
                    <p className='text-sm'>กรุณส่งรูป Qrcode ให้แอดมินตรวจสอบยอดชำระ</p>
                </div>
            </div>
        </div>
    )
}

export default PaymentModal