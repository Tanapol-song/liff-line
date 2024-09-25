export const createFlexMessage = (cart, shop, qrCodeDataURL) => {
    // console.log('cartFlex', cart)
    // console.log("shop", shop)
    const base64Data = qrCodeDataURL.split(',')[1];
    const image = atob(base64Data);

    console.log("image", image)
    //send Flex message
    const foodItems = cart.map(order => ({
        "type": "box",
        "layout": "horizontal",
        "contents": [
            {
                "type": "text",
                "text": order.name,
                "size": "sm",
                "color": "#555555",
                "flex": 0
            },
            {
                "type": "text",
                "text": `${order.price * order.total} บาท`,
                "size": "sm",
                "color": "#111111",
                "align": "end"
            }
        ]
    }))

    const flexMessage = {
        "type": "bubble",
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "text",
                    "text": "ใบรายการอาหาร",
                    "weight": "bold",
                    "color": "#1DB446",
                    "size": "sm"
                },
                {
                    "type": "text",
                    "text": shop.name,
                    "weight": "bold",
                    "size": "xxl",
                    "margin": "md"
                },
                {
                    "type": "text",
                    "text": shop.detail.logcation, // แก้ไขจาก `logcation` เป็น `location`
                    "size": "xs",
                    "color": "#aaaaaa",
                    "wrap": true
                },
                {
                    "type": "text",
                    "text": shop.detail.tell,
                    "size": "xs",
                    "color": "#aaaaaa",
                    "wrap": true
                },
                {
                    "type": "separator",
                    "margin": "xxl"
                },
                {
                    "type": "box",
                    "layout": "vertical",
                    "margin": "xxl",
                    "spacing": "sm",
                    "contents": foodItems // ใส่รายการอาหารจาก cart
                },
                {
                    "type": "separator",
                    "margin": "xxl"
                },
                {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                        {
                            "type": "text",
                            "text": "ราคารวม",
                            "size": "sm",
                            "color": "#555555"
                        },
                        {
                            "type": "text",
                            "text": `${cart.reduce((sum, item) => sum + (item.price * item.total), 0)} บาท`,
                            "size": "sm",
                            "color": "#111111",
                            "align": "end"
                        }
                    ]
                },
                {
                    "type": "separator",
                    "margin": "xxl"
                },
                // {
                //     "type": "image",
                //     "url": image, // ใส่ QR Code ในรูปแบบ Data URL
                //     "size": "full",
                //     "aspectRatio": "1:1"
                // },
                {
                    "type": "separator",
                    "margin": "xxl"
                },
                {
                    "type": "box",
                    "layout": "horizontal",
                    "margin": "md",
                    "contents": [
                        {
                            "type": "text",
                            "text": "ขอบคุณที่ใช้บริการเรา ClickBlike",
                            "size": "xs",
                            "color": "#aaaaaa",
                            "flex": 0
                        }
                    ]
                }
            ]
        },
        "styles": {
            "footer": {
                "separator": true
            }
        }
    }
    return flexMessage;
}
