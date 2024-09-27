// app/api/sendMessage/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';
import { createFlexMessage } from '@/lib/flexmessage';

export async function POST(request) {
    try {
        const { userId, token, cart, shop } = await request.json();

        // สร้าง Flex Message
        const flexMessage = createFlexMessage(cart, shop);

        const data = {
            "to": userId,
            "messages": [
                {
                    "type": "flex",
                    "altText": "ใบรายการอาหาร",
                    "contents": flexMessage
                }
            ]
        };

        const response = await axios.post('https://api.line.me/v2/bot/message/push', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({
            error: error.response ? error.response.data : 'Error'
        }, { status: 500 });
    }
}
