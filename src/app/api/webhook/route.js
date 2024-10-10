import axios from "axios";
import { NextResponse } from 'next/server';
import { createReplyMessage } from "@/lib/replymessage";

export async function POST(req) {
    try {
        const token = process.env.NEXT_PUBLIC_LINE_CHANNEL_ACCESS_TOKEN
        const body = await req.json();
        const { events } = body
        const lineEvent = events[0]
        const userId = lineEvent.source.userId
        const userMessage = events[0].message.text
        const replyToken = lineEvent.replyToken

        if (!events || events.length === 0) {
            return NextResponse.json({ message: 'No events received' }, { status: 400 });
        }
        if (userMessage == 'Success') {
            if (userId == 'Ub252c0e982a04013df91dc597a400d39') {
                const data = createReplyMessage(userMessage, replyToken);
                const response = await axios.post('https://api.line.me/v2/bot/message/reply', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                return NextResponse.json(response.data);
            }
        }
        return NextResponse.json({ status: 200 })
        console.log("events", events)
    } catch (error) {
        return NextResponse.json({
            error: error.response ? error.response.data : 'Error'
        }, { status: 500 })
    }
}