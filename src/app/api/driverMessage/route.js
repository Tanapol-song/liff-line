import axios from "axios";
import { NextResponse } from 'next/server';
import { createDriverMessage } from '@/lib/drivermessge';


export async function POST(request) {
    try {
        const { cart, shop, latitued, longitued } = await request.json();
        const tokenAdmin = process.env.NEXT_PUBLIC_LINE_TWO_CHANNEL_ACCESS_TOKEN
        const userAdmin = process.env.NEXT_PUBLIC_USERID_ADMIN
        const flexMessage = createDriverMessage(cart, shop)

        const userOderAdmin = process.env.NEXT_PUBLIC_USERID_ADMIN
        const userDriver_1 = process.env.NEXT_PUBLIC_USERID_DRIVER_1
        const userDriver_2 = process.env.NEXT_PUBLIC_USERID_DRIVER_2
        const userDriver_3 = process.env.NEXT_PUBLIC_USERID_DRIVER_3

        // const data = {
        //     "to": userOderAdmin,
        //     "messages": [
        //         {
        //             "type": "flex",
        //             "altText": "ใบรายการอาหาร",
        //             "contents": flexMessage
        //         },
        //         {
        //             "type": "text",
        //             "text": "**ตำแหน่งจัดส่งอาหารโปรดรอการยันยืนจากแอดมิน",
        //         },
        //         {
        //             "type": "text",
        //             "text": `https://www.google.com/maps/search/?api=1&query=${latitued},${longitued}&openExternalBrowser=1`,
        //         },
        //     ]
        // };
        // await axios.post('https://api.line.me/v2/bot/message/push', data, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${tokenAdmin}`
        //     }
        // });
        const userIds = [userOderAdmin, userDriver_1, userDriver_2, userDriver_3];
        const dataMessage = {
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
        const sendMessage = userIds.map(userIds => {
            return axios.post('https://api.line.me/v2/bot/message/push',
                { to: userIds, ...dataMessage },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenAdmin}`,
                    }
                });
        });
        await Promise.all(sendMessage);

        return NextResponse.json({ status: 200 })
    } catch (error) {
        return NextResponse.json({
            error: error.response ? error.response.data : 'Error'
        }, { status: 500 });
    }
}