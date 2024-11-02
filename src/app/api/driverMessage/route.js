import axios from "axios";
import { NextResponse } from 'next/server';
import { createDriverMessage } from '@/lib/drivermessge';


export async function POST(request) {
    try {
        const { cart, shop, latitued, longitued } = await request.json();
        const tokenAdmin = process.env.NEXT_PUBLIC_LINE_TWO_CHANNEL_ACCESS_TOKEN
        const userAdmin = process.env.NEXT_PUBLIC_USERID_ADMIN
        const flexMessage = createDriverMessage(cart, shop)
        const data = {
            "to": userAdmin,
            "messages": [
                {
                    "type": "flex",
                    "altText": "ใบรายการอาหาร",
                    "contents": flexMessage
                },
                {
                    "type": "text",
                    "text": "**ตำแหน่งจัดส่งอาหารโปรดรอการยันยืนจากแอดมิน",
                },
                {
                    "type": "text",
                    "text": `https://www.google.com/maps/search/?api=1&query=${latitued},${longitued}&openExternalBrowser=1`,
                },
            ]
        };
        await axios.post('https://api.line.me/v2/bot/message/push', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenAdmin}`
            }
        });
        return NextResponse.json({ status: 200 })
    } catch (error) {
        return NextResponse.json({
            error: error.response ? error.response.data : 'Error'
        }, { status: 500 });
    }
}