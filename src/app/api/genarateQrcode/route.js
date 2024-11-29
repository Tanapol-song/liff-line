import { NextResponse } from 'next/server';
import generatePayload  from 'promptpay-qr'
import qrcode from 'qrcode'

export async function POST(request) {
    try {
        const { phoneNumber, amount } = await request.json();
        console.log("phoneNumber",phoneNumber)
        console.log("amount",amount)

        const payload = generatePayload(phoneNumber,{amount});
        const qrCodeDataURL = await qrcode.toDataURL(payload)
        return NextResponse.json({qrCodeDataURL});
    } catch (error) {
        return NextResponse.json({
            error: error.response ? error.response.data : 'Error'
        }, { status: 500 });
    }
}
