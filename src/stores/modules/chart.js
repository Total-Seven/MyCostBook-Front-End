import { defineStore } from "pinia";

const store = {
    state() {
        return {
            menu: 'Exp',  // Exp、Inc、Trf
            tab: 'Year',    // Year Month Week Day
            /**
             * 渲染data[menu.value]
             *     data[menu.value].tab.value
             *     data[menu.value].tab.value.time
             */
            data: {
                Exp: {
                    nowTime: { Year: '2023', Month: 'February', Week: 'Fifth Week', Day: 'Monday' },  //由后端取每个时间最后一个元素的值生成
                    Year: {
                        time: ['2022', '2023', '2024'],  // 用户账单中所有的年份 比如只有2022-24
                        "amouont_2022": 222,
                        "amouont_2023": 709.1,
                        "amouont_2024": 333,
                        "top_obj": {
                            "2022": [
                                {
                                    "_billLedger": "我的账本",
                                    "amount": 222,
                                    "percentage": "100.0%",
                                    "number": 1,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ],
                            "2023": [
                                {
                                    "_billLedger": "购物清单",
                                    "amount": 503,
                                    "percentage": "70.9%",
                                    "number": 2,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                },
                                {
                                    "_billLedger": "我的账本",
                                    "amount": 206.1,
                                    "percentage": "29.1%",
                                    "number": 7,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ],
                            "2024": [
                                {
                                    "_billLedger": "我的账本",
                                    "amount": 333,
                                    "percentage": "100.0%",
                                    "number": 1,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ]
                        },
                        "pie_obj": {
                            "2022": [
                                [
                                    "我的账本",
                                    222
                                ]
                            ],
                            "2023": [
                                [
                                    "购物清单",
                                    503
                                ],
                                [
                                    "我的账本",
                                    206.1
                                ]
                            ],
                            "2024": [
                                [
                                    "我的账本",
                                    333
                                ]
                            ]
                        },
                        "total_amount": 1264.1,
                        "pie_array": [],
                        "line_array": [
                            [
                                "2022",
                                222
                            ],
                            [
                                "2023",
                                709.1
                            ],
                            [
                                "2024",
                                333
                            ]
                        ],
                        "top_array": []
                    },
                    Month: {
                        time: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    },
                    Week: {
                        time: ['First Week', 'Second Week', 'Third Week', 'Fourth Week', 'Fifth Week']
                    },
                    Day: {
                        time: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                    },
                },
                Inc: {
                    nowTime: { Year: '2023', Month: 'February', Week: 'Fifth Week', Day: 'Monday' },  //由后端取每个时间最后一个元素的值生成
                    Year: { time: ['2022', '2023', '2024'], },
                    Month: {
                        time: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    },
                    Week: { time: ['First Week', 'Second Week', 'Third Week', 'Four Week', 'Fifth Week'] },
                    Day: { time: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
                },
                Trf: {
                    nowTime: { Year: '2023', Month: 'February', Week: 'Fifth Week', Day: 'Monday' },  //由后端取每个时间最后一个元素的值生成
                    Year: { time: ['2022', '2023', '2024'], },
                    Month: {
                        time: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    },
                    Week: { time: ['First Week', 'Second Week', 'Third Week', 'Four Week', 'Fifth Week'] },
                    Day: { time: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
                },
            }
        }
    },
    getters: {},
    actions: {},

}
const useChartStore = defineStore('Chart', store)

export default useChartStore