export const createFlexMessage = (cart, shop) => {
    const foodItems = cart.map(order => ({
        "type": "box",
        "layout": "vertical",
        "contents": [
            {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                    {
                        "type": "box",
                        "layout": "baseline",
                        "spacing": "sm",
                        "contents": [
                            {
                                "type": "text",
                                "text": order.name,
                                "size": "sm",
                                "color": "#555555",
                                "flex": 1
                            },
                            {
                                "type": "text",
                                "text": `${order.price} บาท`,
                                "size": "sm",
                                "color": "#111111",
                                "flex": 1,
                                "align": "end"
                            },
                        ]
                    },
                ]
            },
            {
                "type": "text",
                "text": `x${order?.total}`,
                "size": "sm",
                "color": "#555555",
                "flex": 1,
                "align": "end"
            },
            {
                "type": "text",
                "text": order.des ? order.des : "-",
                "size": "xs",
                "color": "#397cf1",
                "wrap": true,
                "margin": "md"
            }
        ]
    }));

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
                    "text": shop.detail.logcation,
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
                            "size": "md",
                            "color": "#555555"
                        },
                        {
                            "type": "text",
                            "text": `${cart.reduce((sum, item) => sum + (item.price * item.total), 0)} บาท`,
                            "size": "md",
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
                    "layout": "vertical",
                    "margin": "md",
                    "contents": [
                        {
                            "type": "text",
                            "text": "โปรดชำระเงินตามยอดรายการทั้งหมด",
                            "size": "sm",
                            "color": "#555555",
                            "flex": 0
                        },
                        {
                            "type": "text",
                            "text": "ธนาคารไทยพาณิช",
                            "size": "sm",
                            "color": "#555555",
                            "flex": 0
                        },
                        {
                            "type": "text",
                            "text": "เลขบัญชี 417-099-5406 ",
                            "size": "sm",
                            "color": "#555555",
                            "flex": 0
                        },
                        {
                            "type": "text",
                            "text": "หากชำระเงินแล้วโปรดส่งสลิปให้แอดมิน",
                            "size": "sm",
                            "color": "#ff0400",
                            "flex": 0
                        },
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
                            "text": "ขอบคุณที่ใช้บริการเรา ClickBike",
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
