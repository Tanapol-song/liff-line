import { services } from "./enums";
export const createReplyMessage = (userMessage, replyToken) => {
    let message = [];
    if (userMessage === "อัตราค่าจัดส่ง") {
        message = [{
            "type": "text",
            "text": 'สวัสดีค่ะ/ครับ คุณลูกค้า🎉\nขอบคุณที่ให้ความสนใจในบริการของเราสำหรับค่าจัดส่งสินค้ามีดังนี้🔥\n\n📌เวลา 08.00 น. - 20.00 น.\n   🔺เริ่มต้น 35 บาท\n📌เวลา 20.00 น. - 00.00 น.\n    🔺เริ่มต้น 50 บาท\n\nหากคุณลูกค้าสั่งซื้อสินค้าเกินระยะทาง 2 กิโลเมตร เพิ่มกิโลเมตรละ 10 บาท ค่ะ/ครับ 🚚💨\nหากต้องการสอบถามข้อมูลเพิ่มเติม สามารถตอบกลับมาได้เลยนะคะ/ครับ เรายินดีให้บริการเสมอค่ะ/ครับ 😊\n\nขอบคุณค่ะ/ครับ\nClickBike'
        }]
    } else if (userMessage == "ร้านอาหารแนะนำ") {
        console.log("message", message)
        const RacShop = services.map((shop) => {
            const data = {
                "type": "bubble",
                "hero": {
                    "type": "image",
                    "url": "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
                    "size": "full",
                    "aspectRatio": "20:13",
                    "aspectMode": "cover"
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": shop?.name,
                            "weight": "bold",
                            "size": "xl"
                        },
                        {
                            "type": "text",
                            "text": shop?.title,
                            "size": "sm",
                            "color": "#AAAAAA"
                        }
                    ]
                },
                "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                        {
                            "type": "button",
                            "style": "primary",
                            "action": {
                                "type": "uri",
                                "label": "ดูเมนู",
                                "uri": `https://b3d1-101-109-28-182.ngrok-free.app/s/${shop?.num}`
                            }
                        }
                    ]
                }
            }
            return data
        })
        message = [{
            "type": "text",
            "text": 'ร้านอาหารแนะนำสำหรับลูกค้า🔥'
        },{
            "type": "flex",
            "altText": "ร้านอาหารแนะนำ",
            "contents": {
                "type": "carousel",
                "contents": RacShop
            }
        }]
        console.log('RacShop', RacShop)
    } else if (userMessage == "โปรโมทร้านกับเรา") {
        message = [{
            "type": "text",
            "text": 'สวัสดีค่ะ/ครับ\nเราคือแพลตฟอร์มที่รวมร้านค้าและบริการคุณภาพไว้ในที่เดียว ไม่ว่าจะเป็นอาหาร สินค้า หรือบริการต่าง ๆ🍽️🛍️\n\nหากท่านสนใจเป็นส่วนหนึ่งกับเรา\n🔸โปรดเพิ่มเพื่อน https://lin.ee/OVEL8mj\n\nขอบคุณที่สนใจเข้ามาเป็นส่วนหนึ่งของ Clicl Bike นะคะ💖\nเราจะส่งข่าวสารล่าสุดผ่านบัญชีทางการนี้ เตรียมรับได้เลย!📢'
        }]
    } else if (userMessage == "ติดต่อเรา") {
        message = [{
            "type": "text",
            "text": 'สวัสดีค่ะ! หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับบริการของเรา สามารถติดต่อเราได้ที่\n\n📞 เบอร์โทรศัพท์\n: 096-956-5976\n📧 อีเมล\n: Tanapol.Chaijaroen@gmail.com\n🌐lineServices@\n: https://lin.ee/OVEL8mj\n🌐lineDriver@\n: https://lin.ee/tWoeMHk\n\nClick Bike ยินดีให้บริการคุณเสมอ! ✨'
        }]
    }
    else {
        message = [{
            "type": "text",
            "text": 'สวัสดีครับ! 🎉 ขอบคุณที่ติดต่อเรานะครับ หากต้องการข้อมูลเพิ่มเติม คุณสามารถสอบถามได้ทุกเมื่อครับ 😊\n\nนี่คือข้อความยาวที่มีหลายบรรทัด เพื่อให้การทดสอบการตอบกลับมีความสมบูรณ์แบบมากยิ่งขึ้น!'
        }]
    }
    const ReplyMessage = {
        "replyToken": replyToken,
        "messages": message

    }
    return ReplyMessage;
}