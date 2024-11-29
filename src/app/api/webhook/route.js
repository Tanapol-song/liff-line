import axios from "axios";
import { NextResponse } from 'next/server';
import { createReplyMessage } from "@/lib/replymessage";

const formatTimeStamp = (timestamp) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat('th-TH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Bangkok' // กำหนดเขตเวลาเป็นเวลาไทย
    }).format(date);
}

export async function POST(req) {
    try {
        const tokenPublic = process.env.NEXT_PUBLIC_LINE_CHANNEL_ACCESS_TOKEN
        const tokenAdmin = process.env.NEXT_PUBLIC_LINE_TWO_CHANNEL_ACCESS_TOKEN

        const userOderAdmin = process.env.NEXT_PUBLIC_USERID_ADMIN
        const userAdmin_1 = process.env.NEXT_PUBLIC_USERID_ADMIN_1
        const userAdmin_2 = process.env.NEXT_PUBLIC_USERID_ADMIN_2

        const userDriver_1 = process.env.NEXT_PUBLIC_USERID_DRIVER_1
        const userDriver_2 = process.env.NEXT_PUBLIC_USERID_DRIVER_2
        const userDriver_3 = process.env.NEXT_PUBLIC_USERID_DRIVER_3

        const body = await req.json();
        const { events } = body
        const lineEvent = events[0]
        const userMessage = events[0].message.text
        const replyToken = lineEvent.replyToken
        const timestamp = formatTimeStamp(lineEvent.timestamp);

        if (!events || events.length === 0) {
            return NextResponse.json({ message: 'No events received' }, { status: 400 });
        }
        if ((userMessage === "อัตราค่าจัดส่ง") || (userMessage === "ร้านอาหารแนะนำ") || (userMessage === "โปรโมทร้านกับเรา") || (userMessage === "ติดต่อเรา")) {
            const data = createReplyMessage(userMessage, replyToken);
            await axios.post('https://api.line.me/v2/bot/message/reply', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenPublic}`
                }
            });
        }
        if (userMessage == 'ok') {
            if ((userOderAdmin) || (userAdmin_1) || (userAdmin_2)) {
                const userIds = [userOderAdmin, userDriver_1, userDriver_2, userDriver_3];
                const pushMessage = {
                    "messages": [
                        {
                            "type": "text",
                            "text": `📢 ลูกค้าชำระเงินเรียบร้อย!\n🕐 ${timestamp}`,
                        },
                    ]
                }
                const sendMessage = userIds.map(userIds => {
                    return axios.post('https://api.line.me/v2/bot/message/push',
                        { to: userIds, ...pushMessage },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${tokenAdmin}`,
                            }
                        });
                });
                await Promise.all(sendMessage);
            }
        }
        console.log("events", events)
        return NextResponse.json({ status: 200 })
    } catch (error) {
        return NextResponse.json({
            error: error.response ? error.response.data : 'Error'
        }, { status: 500 })
    }
}