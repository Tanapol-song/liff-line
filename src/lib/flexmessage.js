
export const createFlexMessage = (cart,shop) => {
    console.log('cartFlex',cart)
    console.log("shop",shop)
   
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
