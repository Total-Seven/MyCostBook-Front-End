import { defineStore } from "pinia";

const store = {
    state() {
        return {
            menu: 'Exp',  // Exp、Inc、Trf
            tab: ['Day', 'Week', 'Month', 'Year'],    // Year Month Week Day
            current_tab: 'Month',
            current_dateIndex: '2',
            /**
             * 渲染data[menu.value]
             *     data[menu.value].tab.value
             *     data[menu.value].tab.value.time
             */
            data: {
                Exp: {
                    nowTime: { Year: '2023', Month: 'February', Week: 'Fifth Week', Day: 'Monday' },  //由后端取每个时间最后一个元素的值生成
                    Year: {
                        "time": [
                            "2017",
                            "2018",
                            "2019",
                            "2020",
                            "2022",
                            "2023",
                            "2024",
                            "2025"
                        ],
                        "amouont_2022": "257.13",
                        "amouont_2023": "766.53",
                        "amouont_2024": "333.00",
                        "top_obj": {
                            "2017": [
                                {
                                    "billLedger": "我的账本",
                                    "amount": "55.90",
                                    "percentage": "50.4%",
                                    "number": 10,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                },
                                {
                                    "billLedger": "Chart测试账本",
                                    "amount": "55.00",
                                    "percentage": "49.6%",
                                    "number": 10,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ],
                            "2018": [
                                {
                                    "billLedger": "我的账本",
                                    "amount": "9.90",
                                    "percentage": "100.0%",
                                    "number": 1,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ],
                            "2019": [
                                {
                                    "billLedger": "我的账本",
                                    "amount": "9.90",
                                    "percentage": "100.0%",
                                    "number": 1,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ],
                            "2020": [
                                {
                                    "billLedger": "我的账本",
                                    "amount": "9.90",
                                    "percentage": "100.0%",
                                    "number": 1,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ],
                            "2022": [
                                {
                                    "billLedger": "我的账本",
                                    "amount": "255.13",
                                    "percentage": "99.2%",
                                    "number": 4,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                },
                                {
                                    "billLedger": "Chart测试账本",
                                    "amount": "2.00",
                                    "percentage": "0.8%",
                                    "number": 2,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ],
                            "2023": [
                                {
                                    "billLedger": "购物清单",
                                    "amount": "503.00",
                                    "percentage": "65.6%",
                                    "number": 2,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                },
                                {
                                    "billLedger": "我的账本",
                                    "amount": "263.53",
                                    "percentage": "34.4%",
                                    "number": 15,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ],
                            "2024": [
                                {
                                    "billLedger": "我的账本",
                                    "amount": "333.00",
                                    "percentage": "100.0%",
                                    "number": 1,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ],
                            "2025": [
                                {
                                    "billLedger": "我的账本",
                                    "amount": "9.90",
                                    "percentage": "100.0%",
                                    "number": 1,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ]
                        },
                        "pie_obj": {
                            "2017": [
                                [
                                    "我的账本",
                                    55.90
                                ],
                                [
                                    "Chart测试账本",
                                    55.00
                                ]
                            ],
                            "2018": [
                                [
                                    "我的账本",
                                    9.90
                                ]
                            ],
                            "2019": [
                                [
                                    "我的账本",
                                    9.90
                                ]
                            ],
                            "2020": [
                                [
                                    "我的账本",
                                    9.90
                                ]
                            ],
                            "2022": [
                                [
                                    "我的账本",
                                    255.13
                                ],
                                [
                                    "Chart测试账本",
                                    2.00
                                ]
                            ],
                            "2023": [
                                [
                                    "购物清单",
                                    503.00
                                ],
                                [
                                    "我的账本",
                                    263.53
                                ]
                            ],
                            "2024": [
                                [
                                    "我的账本",
                                    333.00
                                ]
                            ],
                            "2025": [
                                [
                                    "我的账本",
                                    9.90
                                ]
                            ]
                        },
                        "total_amount": "1507.16",
                        "line_array": [
                            [
                                "2017",
                                110.90
                            ],
                            [
                                "2018",
                                9.90
                            ],
                            [
                                "2019",
                                9.90
                            ],
                            [
                                "2020",
                                9.90
                            ],
                            [
                                "2022",
                                257.13
                            ],
                            [
                                "2023",
                                766.53
                            ],
                            [
                                "2024",
                                333.00
                            ],
                            [
                                "2025",
                                9.90
                            ]
                        ]
                    },
                    Month: {

                        "time": [
                            "This Month",
                            "2023-01",
                            "2022-12",
                        ],
                        "total_amount": "765.42",
                        "line_array": [
                            [
                                "2023-02",
                                765.42
                            ],
                            [
                                "2023-01",
                                1.11
                            ],
                            [
                                "2022-12",
                                13.12
                            ]
                        ],
                        "pie_obj": {
                            "2023-02": [
                                [
                                    "购物清单",
                                    503.00
                                ],
                                [
                                    "我的账本",
                                    262.42
                                ]
                            ],
                            "2023-01": [
                                [
                                    "我的账本",
                                    1.11
                                ]
                            ],
                            "2022-12": [
                                [
                                    "我的账本",
                                    12.12
                                ],
                                [
                                    "Chart测试账本",
                                    1.00
                                ]
                            ]
                        },
                        "top_obj": {
                            "2023-02": [
                                {
                                    "billLedger": "购物清单",
                                    "amount": "503.00",
                                    "percentage": "65.7%",
                                    "number": 2,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                },
                                {
                                    "billLedger": "我的账本",
                                    "amount": "262.42",
                                    "percentage": "34.3%",
                                    "number": 14,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ],
                            "2023-01": [
                                {
                                    "billLedger": "我的账本",
                                    "amount": "1.11",
                                    "percentage": "100.0%",
                                    "number": 1,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ],
                            "2022-12": [
                                {
                                    "billLedger": "我的账本",
                                    "amount": "12.12",
                                    "percentage": "92.4%",
                                    "number": 1,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                },
                                {
                                    "billLedger": "Chart测试账本",
                                    "amount": "1.00",
                                    "percentage": "7.6%",
                                    "number": 1,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ]
                        },
                        "before_3Month": {
                            "lastlast month": "2022-12",
                            "last month": "2023-01",
                            "this month": "2023-02",
                            "Now-BeiJing-Time": "2023-02-27 19:14:20"
                        }
                    },
                    Week: {


                        "time": [
                            "last Week",
                            "This Week",
                            "lllast Week"
                        ],
                        "total_amount": "0.00",
                        "line_array": [
                            [
                                "last Week",
                                709.10
                            ],
                            [
                                "This Week",
                                54.20
                            ],
                            [
                                "lllast Week",
                                2.11
                            ]
                        ],
                        "pie_obj": {
                            "last Week": [
                                [
                                    "购物清单",
                                    503.00
                                ],
                                [
                                    "我的账本",
                                    206.10
                                ]
                            ],
                            "This Week": [
                                [
                                    "我的账本",
                                    54.20
                                ]
                            ],
                            "lllast Week": [
                                [
                                    "我的账本",
                                    2.11
                                ]
                            ]
                        },
                        "top_obj": {
                            "last Week": [
                                {
                                    "billLedger": "购物清单",
                                    "amount": "503.00",
                                    "percentage": "70.9%",
                                    "number": 2,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                },
                                {
                                    "billLedger": "我的账本",
                                    "amount": "206.10",
                                    "percentage": "29.1%",
                                    "number": 7,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ],
                            "This Week": [
                                {
                                    "billLedger": "我的账本",
                                    "amount": "54.20",
                                    "percentage": "100.0%",
                                    "number": 6,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ],
                            "lllast Week": [
                                {
                                    "billLedger": "我的账本",
                                    "amount": "2.11",
                                    "percentage": "100.0%",
                                    "number": 1,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ]
                        },
                        "before_4Week": {
                            "lllast week": "2023-02-06T00:00:00.000Z",
                            "lastlast week": "2023-02-13T00:00:00.000Z",
                            "last week": "2023-02-20T00:00:00.000Z",
                            "this week": "2023-02-27T00:00:00.000Z",
                            "Now-BeiJing-Time": "2023-02-27T00:00:00.000Z"
                        }
                    },
                    Day: {
                        "time": [
                            "02-22",
                            "02-26",
                            "Today"
                        ],
                        "today": "02-27",
                        "now_total_amount": "54.20",
                        "line_array": [
                            [
                                "02-22",
                                154.10
                            ],
                            [
                                "02-26",
                                555.00
                            ],
                            [
                                "02-27",
                                54.20
                            ]
                        ],
                        "pie_obj": {
                            "02-22": [
                                [
                                    "我的账本",
                                    95.10
                                ]
                            ],
                            "02-26": [
                                [
                                    "购物清单",
                                    444.00
                                ]
                            ],
                            "02-27": [
                                [
                                    "我的账本",
                                    54.20
                                ]
                            ]
                        },
                        "top_obj": {
                            "02-22": [
                                {
                                    "billLedger": "我的账本",
                                    "amount": "95.10",
                                    "percentage": "61.7%",
                                    "number": 6,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ],
                            "02-26": [
                                {
                                    "billLedger": "购物清单",
                                    "amount": "444.00",
                                    "percentage": "80.0%",
                                    "number": 1,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ],
                            "02-27": [
                                {
                                    "billLedger": "我的账本",
                                    "amount": "54.20",
                                    "percentage": "100.0%",
                                    "number": 6,
                                    "avatar": "https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png"
                                }
                            ]
                        },
                        "before_7day": "2023-02-20T00:00:00.000Z",
                        "now": "2023-02-27T19:10:54.697Z"
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
const useChartStore = defineStore('Chart', store + 96)

export default useChartStore