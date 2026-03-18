// --- TRIP DATA FILE ---
// Version: 3.1.0 (Cross-border Chain Fallback & Native Linkify Edition)

const tripData = {
    "meta": { 
        "title": "尊榮商務・東京房總6日細胞解碼之旅", 
        "mainTitle": "TS商務赴日考察團" 
    },
    "missionSummary": {
        "yakiniku": { "completed": true, "description": "燒肉 (Day 5: 叙々苑 品川)" },
        "kaitenSushi": { "completed": true, "description": "迴轉壽司 (Day 3: くら寿司 台場店)" },
        "ramen": { "completed": true, "description": "拉麵店 (Day 4: TOKYO豚骨BASE)" },
        "pasta": { "completed": false, "description": "義大利麵" },
        "tonkatsu": { "completed": true, "description": "豬排飯 (Day 3: 邁泉豬排 青山本店)" },
        "familyRestaurant": { "completed": true, "description": "家庭餐廳 (Day 5 選項B: Denny's 秋葉原店)" },
        "afternoonTea": { "completed": true, "description": "下午茶 (Day 5 選項A: Shibuya Sky 酒吧)" },
        "fastFood": { "completed": false, "description": "速食店" },
        "bGradeGourmet": { "completed": true, "description": "B級美食 (Day 4: つばめグリル 品川駅前店)" }
    },
    "dailyData": {
        "day1": {
            "title": "尊榮啟程・南房總秘境溫泉",
            "date": "2026-04-10 (五)",
            "location": "台灣 → 成田 → 南房總",
            "timeAnalysis": { "travel": 5.0, "activity": 2.5 },
            "insights": {
                "dailyInsight": {
                    "title": "💡 每日大師洞察",
                    "items": [
                        "商務啟程：將長程移動時間轉化為高專注度的策略規劃期，是高階經理人維持大局觀的必備技能。",
                        "在地創生：南房總地區的『道の駅 富浦 枇杷俱樂部』展現了日本如何將地方創生、農產精緻化與觀光完美結合的商業模式。"
                    ]
                }
            },
            "timeline": [
                { 
                    "time": "07:30", "type": "🍚", "event": "早餐: 松屋 桃園機場周邊店", "placeKey": "松屋 桃園機場周邊店", 
                    "description": "日式連鎖丼飯，高效率獲取晨間能量。", 
                    "cost": "NT$150", "stay": "45m" 
                },
                { 
                    "time": "09:00", "type": "✈️", "event": "長榮航空 BR198 啟航", "description": "商務艙尊榮環境。", 
                    "extraInfo": [{ "type": "strategy", "text": "🎯 旅遊達人布萊N 建議：航程中可預先準備好 Visit Japan Web 的 QR Code，落地通關更順暢。" }], 
                    "cost": "無", "stay": "3.5h" 
                },
                { 
                    "time": "14:00", "type": "🚌", "event": "專車接送: 成田機場 → 南房總", "placeKey": "成田機場", 
                    "description": "搭乘專屬巴士前往渡假飯店。", 
                    "extraInfo": [{ "type": "recommend", "text": "🌟 順遊建議：車程將經過『道の駅 富浦 枇杷俱樂部』，曾獲日本全國道の駅最優秀賞，特產枇杷霜淇淋不容錯過。" }], 
                    "cost": "無", "stay": "2.5h" 
                },
                { 
                    "time": "17:00", "type": "🏨", "event": "入住 & 晚宴: 南房總美爵溫泉度假酒店", "placeKey": "南房總美爵溫泉度假酒店", 
                    "description": "享受房總半島特產海鮮自助晚宴（正餐）。", 
                    "cost": "無", "stay": "過夜", "parkingInfo": "住客免費停車" 
                }
            ],
            "intel": { 
                "supply": { "title": "🏪 鄉間唯一補給", "items": ["7-Eleven 南房總富浦多田良店 - 飯店周邊唯一大型超商，請於入住前買齊房內宵夜與當地限定甜點。"] }
            }
        },
        "day2": {
            "title": "櫻花盛會・台日友好之夜",
            "date": "2026-04-11 (六)",
            "location": "南房總 → 東京台場",
            "timeAnalysis": { "travel": 2.5, "activity": 6.5 },
            "insights": {
                "dailyInsight": {
                    "title": "💡 每日大師洞察",
                    "items": [
                        "商務社交：櫻花季是日本企業極為重視的時節，以此作為破冰話題，極有助於建立長遠的信任關係。",
                        "都市規劃：台場海濱地區 的無電線桿設計與立體人車分道，是東京臨海副都心開發的絕佳縮影。"
                    ]
                }
            },
            "timeline": [
                { "time": "08:00", "type": "🍽️", "event": "早餐: 飯店日式自助餐", "description": "房總產地直送野菜。", "cost": "已含", "stay": "1h" },
                { 
                    "time": "10:00", "type": "🌸", "event": "活動: 台日友好國際櫻花交流會", 
                    "description": "全天交流盛會，午餐享用日式特製便當（正餐）。", 
                    "extraInfo": [{ "type": "strategy", "text": "🎯 專家建議：交流會位於『日本都市景觀 100 選』之核心示範區內，可觀察其空間規劃。" }], 
                    "cost": "無", "stay": "6.5h" 
                },
                { 
                    "time": "18:00", "type": "☕", "event": "海景下午茶: Starbucks 台場 Aqua City 店", "placeKey": "Starbucks 台場 Aqua City 店", 
                    "description": "全東京視野最開闊的星巴克。", 
                    "extraInfo": [
                        { "type": "photo", "text": "📸 社群媒體推薦：在此露台可同時捕捉彩虹大橋與自由女神像，是『日本百景』級別的構圖點。" },
                        { "type": "recommend", "text": "🔥 必訪理由：雖然台灣也有星巴克，但這裡經常販售日本限定的『哈密瓜星冰樂』或『櫻花季限定周邊』，輕食菜單也完全不同！" }
                    ], 
                    "cost": "¥700", "stay": "1h" 
                },
                { "time": "19:30", "type": "🍣", "event": "晚餐: 築地玉壽司 台場店", "placeKey": "築地玉壽司 台場店", "description": "正宗壽司定食，俯瞰東京灣夜景（正餐）。", "cost": "¥4,000", "stay": "1.5h" },
                { 
                    "time": "21:30", "type": "🏨", "event": "入住: 東京台場希爾頓酒店", "placeKey": "東京台場希爾頓酒店", 
                    "description": "入住台場灣區第一線酒店 (連泊首日)。", 
                    "extraInfo": [{ "type": "photo", "text": "📸 夜遊打卡：步行 3 分鐘即達名列『日本夜景 100 選』的 台場海濱公園，是放鬆心靈的絕佳場域。" }], 
                    "cost": "無", "stay": "過夜" 
                }
            ],
            "intel": { 
                "supply": { "title": "🏪 台場商圈深夜機能", "items": ["Lawson お台場海濱公園前店 - 網紅極推的高評價門市，宵夜與炸雞君首選。", "マツモトキヨシ Aqua City店 - 營業較晚，適合快速補齊『休足時間』等舒緩用品。"] }
            }
        },
        "day3": {
            "title": "神宮巡禮・演藝饗宴慶功",
            "date": "2026-04-12 (日)",
            "location": "台場 → 明治神宮 → 台場",
            "timeAnalysis": { "travel": 1.5, "activity": 7.5 },
            "insights": {
                "dailyInsight": {
                    "title": "💡 每日大師洞察",
                    "items": [
                        "文化溯源：明治神宮的百年造林計畫與『和魂洋才』理念，至今仍是日本企業永續經營（SDGs）的標竿。",
                        "產業觀察：連鎖迴轉壽司的自動化送餐軌道與計盤系統，完美展現了日本餐飲業應對缺工的數位轉型對策。"
                    ]
                }
            },
            "timeline": [
                { "time": "08:00", "type": "☕", "event": "早餐: Tully's Coffee 台場店", "placeKey": "Tully's Coffee 台場店", "description": "快速商務早餐。", "cost": "¥1,000", "stay": "45m" },
                { 
                    "time": "09:30", "type": "⛩️", "event": "文化體驗: 明治神宮", "placeKey": "明治神宮", 
                    "description": "漫步『日本歷史公園 100 選』之鎮守之森。", 
                    "extraInfo": [{ "type": "recommend", "text": "📸 社群媒體推薦：別錯過來自台灣阿里山的巨型檜木大鳥居，以及象徵『和魂洋才』的酒樽牆。" }], 
                    "cost": "無", "stay": "2.5h" 
                },
                { "time": "12:00", "type": "🍛", "event": "午餐: 邁泉豬排 青山本店", "placeKey": "邁泉豬排 青山本店", "description": "解鎖任務：老字號豬排定食（正餐）。", "extraInfo": [{ "type": "recommend", "text": "🎯 旅遊達人林氏璧 建議：本店由公共澡堂(錢湯)改建，挑高天花板極具特色，絕對值得排隊品嚐。" }], "cost": "¥2,500", "stay": "1.5h" },
                { "time": "14:30", "type": "🎤", "event": "專屬演藝: 楊烈演唱會", "description": "高水準演藝交流活動。", "cost": "無", "stay": "2h" },
                { 
                    "time": "19:00", "type": "🍣", "event": "晚餐: くら寿司 台場店", "placeKey": "くら寿司 台場店", 
                    "description": "解鎖任務：迴轉壽司體驗（正餐）。", 
                    "extraInfo": [
                        { "type": "recommend", "text": "🔥 必吃理由：雖然台灣也有藏壽司，但日本當地店鋪擁有許多台灣絕對吃不到的『在地漁獲/季節限定品項』，且扭蛋機常有日本獨佔的最新動漫聯名！" },
                        { "type": "strategy", "text": "🍣 在地備案：若仍想嘗試台灣沒有的在地品牌，推薦直接前往隔壁 AQUA CITY 6樓的『吉丸水産』享受職人現捏的迴轉壽司。" }
                    ], 
                    "cost": "¥3,000", "stay": "1.5h" 
                },
                { "time": "21:00", "type": "🏨", "event": "住宿: 東京台場希爾頓酒店", "placeKey": "東京台場希爾頓酒店", "description": "台場連泊第二晚 (在地生活探索)。", "cost": "無", "stay": "過夜" }
            ],
            "intel": { 
                "supply": { "title": "🛒 深夜機能切換 (超市/居酒屋)", "items": ["マルエツ お台場店 - 在地主婦最愛的生鮮超市，採買草莓與平價水果。", "権八 お台場 - 營業至深夜，具備濃厚江戶風情的網紅串燒名店。", "吉野家 デックス東京ビーチ店 - 24小時提供熱食的深夜救贖。"] }
            }
        },
        "day4": {
            "title": "專業培訓・前進東京品川",
            "date": "2026-04-13 (一)",
            "location": "台場 → 品川",
            "timeAnalysis": { "travel": 1.0, "activity": 5.0 },
            "insights": {
                "dailyInsight": {
                    "title": "💡 每日大師洞察",
                    "items": [
                        "區域發展：品川作為磁浮中央新幹線的起點，正進行大規模的『高輪Gateway』重劃，是東京下一個十年的經濟引擎。",
                        "商業效率：觀察 ecute 品川 車站內商場的動線設計與高翻桌率，這是鐵道商圈坪效的極致表現。"
                    ]
                }
            },
            "timeline": [
                { 
                    "time": "08:00", "type": "🍚", "event": "早餐: 松屋 台場店", "placeKey": "松屋 台場店", 
                    "description": "日式連鎖朝食。", 
                    "extraInfo": [{ "type": "recommend", "text": "🔥 必吃理由：日本當地的松屋擁有豐富的『期間限定定食』（如漢堡排或特製咖哩），米飯質地與牛肉醬汁比例也與海外店有著微妙且道地的差異！" }],
                    "cost": "¥600", "stay": "45m" 
                },
                { "time": "11:30", "type": "🍽️", "event": "午餐: つばめグリル 品川駅前店", "placeKey": "つばめグリル 品川駅前店", "description": "百年洋食漢堡排定食（正餐）。", "cost": "¥1,500", "stay": "1h" },
                { 
                    "time": "13:30", "type": "🧬", "event": "培訓: 高輪カネオビル (TS公司)", "placeKey": "高輪カネオビル (TS公司)", 
                    "description": "細胞解碼課程與博士講座。", 
                    "extraInfo": [{ "type": "recommend", "text": "⛩️ 榮耀點：周邊有『東京十社』之一的 品川神社，其境內擁有關東最大的 品川神社富士塚，是極佳的微型朝聖點。" }], 
                    "cost": "無", "stay": "4.5h" 
                },
                { "time": "18:00", "type": "☕", "event": "下午茶: Blue Bottle 品川店", "placeKey": "Blue Bottle 品川店", "description": "商務轉場最佳沉澱處。", "cost": "¥800", "stay": "45m" },
                { 
                    "time": "19:30", "type": "🍜", "event": "晚餐: TOKYO 豚骨 BASE (ecute品川)", "placeKey": "TOKYO 豚骨 BASE (ecute品川)", 
                    "description": "解鎖任務：一風堂監製拉麵（正餐）。", 
                    "extraInfo": [
                        { "type": "recommend", "text": "🍜 必吃理由：雖然是一風堂監製，但此品牌是專為 JR 東日本打造的車站限定品牌，提供台灣一風堂吃不到的結合東京醬油風格的特殊豚骨風味！" },
                        { "type": "strategy", "text": "🍥 在地備案：若想吃完全不同的流派，品川站外的『麺達七人衆 品達』有著名的蒙古湯麵中本可供選擇。" }
                    ],
                    "cost": "¥1,200", "stay": "1h" 
                },
                { "time": "21:00", "type": "🏨", "event": "住宿: 品川王子大飯店", "placeKey": "品川王子大飯店", "description": "品川交通樞紐之中心 (連泊首日)。", "cost": "無", "stay": "過夜" }
            ],
            "intel": { 
                "supply": { "title": "🏮 品川初夜探索 (居酒屋與急救)", "items": ["品川駅 港南口 居酒屋街 - 穿過車站即達，充滿昭和風情的上班族聚餐聖地。", "7-Eleven 品川站新高輪店 - 位於飯店內，零距離補給。", "トモズ 品川店 - 營業較晚的高階藥妝，適合補充B群與護眼藥水。"] }
            }
        },
        "day5": {
            "title": "進階研討・商務與夥伴交流",
            "date": "2026-04-14 (二)",
            "location": "品川",
            "timeAnalysis": { "travel": 0.5, "activity": 7.5 },
            "insights": {
                "dailyInsight": {
                    "title": "💡 每日大師洞察",
                    "items": [
                        "消費心理：觀察澀谷或 秋葉原電器街 的垂直型商場設計，其強迫客流由上而下滲透的『噴泉效應』，是極佳的零售動線案例。",
                        "高端宴客：叙々苑 品川 不僅是頂級和牛燒肉，其無微不至的桌邊服務與隱私空間規劃，是日本高階商務宴客的標準模式。"
                    ]
                }
            },
            "options": {
                "optionA": {
                    "label": "高空景觀與潮流商務 (澀谷)",
                    "timeline": [
                        { "time": "08:30", "type": "☕", "event": "早餐: Starbucks 品川 Prince Hotel 店", "placeKey": "Starbucks 品川 Prince Hotel 店", "description": "高效率晨間咖啡與熱壓三明治（提供正餐級熱量）。", "cost": "¥1,000", "stay": "45m" },
                        { "time": "10:30", "type": "🏢", "event": "研討: 高輪分部進階座談", "description": "商務交流與研討。", "cost": "無", "stay": "2h" },
                        { "time": "13:00", "type": "🍱", "event": "午餐: 澀谷 Scramble Square 美食街定食", "placeKey": "澀谷 Scramble Square 美食街定食", "description": "景觀商場內之精緻日式定食（正餐）。", "cost": "¥1,500", "stay": "1h" },
                        { 
                            "time": "14:30", "type": "🏙️", "event": "半日遊: SHIBUYA SKY", "placeKey": "SHIBUYA SKY", 
                            "description": "澀谷最高地標。", 
                            "extraInfo": [
                                { "type": "recommend", "text": "🥂 任務：前往 46 樓 Shibuya Sky 酒吧，解鎖下午茶任務。" }, 
                                { "type": "strategy", "text": "🎯 專家建議：從此處可遠眺『日本 100 名城』江戶城 (皇居外苑) 的廣闊綠地。" }
                            ],
                            "cost": "自理", "stay": "3.5h" 
                        },
                        { "time": "18:30", "type": "🥩", "event": "晚餐: 叙々苑 品川", "placeKey": "叙々苑 品川", "description": "頂級和牛燒肉盛宴（正餐）。", "cost": "¥10,000", "stay": "2h" },
                        { "time": "21:00", "type": "🏨", "event": "住宿: 品川王子大飯店", "placeKey": "品川王子大飯店", "description": "品川連泊第二晚 (終極採購指南)。", "cost": "無", "stay": "過夜" }
                    ]
                },
                "optionB": {
                    "label": "動漫聖地與秋葉原電器 (秋葉原)",
                    "timeline": [
                        { 
                            "time": "08:30", "type": "🍚", "event": "早餐: すき家 品川東口店", "placeKey": "すき家 品川東口店", 
                            "description": "連鎖牛丼，快速飽食。", 
                            "extraInfo": [{ "type": "recommend", "text": "🔥 必吃理由：すき家 在日本有著獨特的『極上起司牛丼』以及期間限定的海鮮丼，清晨來一碗熱騰騰的豚汁更是台灣沒有的體驗！" }],
                            "cost": "¥600", "stay": "45m" 
                        },
                        { "time": "10:30", "type": "🏢", "event": "研討: 高輪分部進階座談", "description": "商務交流與研討。", "cost": "無", "stay": "2h" },
                        { 
                            "time": "13:00", "type": "🎮", "event": "半日遊: 秋葉原電器街 與 動漫巡禮", "placeKey": "秋葉原電器街", 
                            "description": "採購技術設備與模型。", 
                            "extraInfo": [{ "type": "recommend", "text": "📸 社群媒體推薦：此處為多部動畫聖地，更是 Yodobashi Camera 秋葉原店 旗艦店所在地，免稅電器一站買齊。" }], 
                            "cost": "自理", "stay": "4.5h" 
                        },
                        { "time": "18:00", "type": "🍛", "event": "晚餐: Denny's 秋葉原店", "placeKey": "Denny's 秋葉原店", "description": "解鎖任務：正宗日式家庭餐廳體驗（正餐），品嚐多汁漢堡排與蛋包飯。", "cost": "¥1,800", "stay": "1.5h" },
                        { "time": "20:30", "type": "🏨", "event": "住宿: 品川王子大飯店", "placeKey": "品川王子大飯店", "description": "品川連泊第二晚 (終極採購指南)。", "cost": "無", "stay": "過夜" }
                    ]
                }
            },
            "intel": { 
                "supply": { "title": "🛍️ 終極掃貨地圖 (品川周邊)", "items": ["ドン・キホーテ 品川港南口店 - 24H 營業的驚安殿堂，免稅伴手禮最後掃貨防線。", "京急ストア 品川店 - 飯店地下的在地超市，營業至晚間10點，搶買特價生鮮便當。", "すき家 品川東口店 - 24小時營業，逛完唐吉訶德後打包牛丼回房間的最佳收尾。"] }
            }
        },
        "day6": {
            "title": "滿載賦歸・重返溫暖的家",
            "date": "2026-04-15 (三)",
            "location": "品川 → 成田 → 台灣",
            "timeAnalysis": { "travel": 4.5, "activity": 1.0 },
            "insights": {
                "dailyInsight": {
                    "title": "💡 每日大師洞察",
                    "items": [
                        "知識轉化：利用機場貴賓室與商務艙的專屬隱私空間，完成這趟考察的最後收斂，將『所見』具體化為下一季的行動策略。"
                    ]
                }
            },
            "timeline": [
                { 
                    "time": "08:30", "type": "🍚", "event": "早餐: 吉野家 品川站前店", "placeKey": "吉野家 品川站前店", 
                    "description": "最後的日式連鎖早餐。", 
                    "extraInfo": [{ "type": "recommend", "text": "🔥 必吃理由：日本吉野家的『特選黑毛和牛壽喜燒』或『鯖魚朝食定食』品質極高，是離開日本前最具代表性的平民朝食體驗。" }],
                    "cost": "¥600", "stay": "45m" 
                },
                { 
                    "time": "10:00", "type": "🚌", "event": "機場接駁: 前往 成田機場", "placeKey": "成田機場", 
                    "description": "專車接送。", 
                    "extraInfo": [
                        { "type": "recommend", "text": "🌟 順遊建議：若報到後時間充裕，成田周邊的 成田山新勝寺 是名震關東的歷史名勝。" }, 
                        { "type": "strategy", "text": "🏪 機場採購：出境前的免稅店 FaSoLa TAX FREE 成田空港 是消耗剩餘日圓現金的最佳戰場。" }
                    ], 
                    "cost": "已含", "stay": "2h" 
                },
                { "time": "13:25", "type": "✈️", "event": "長榮航空 BR183 啟程", "description": "商務艙精緻餐飲（午餐正餐），平安抵台。", "cost": "已含", "stay": "3.5h" }
            ],
            "intel": { 
                "supply": { "title": "✈️ 機場免稅最後防線", "items": ["FaSoLa TAX FREE 成田空港 - 伴手禮與電器最後掃貨"] }
            }
        }
    },
    "detailedHighlights": [
        { 
            "name": "明治神宮", "placeKey": "明治神宮",
            "type": "景點", 
            "expertRec": "都會森林中的心靈避風港。", "historyCulture": "百年永續造林計畫的完美實踐，象徵和魂洋才的包容力。",
            "focusPoints": "<ul class='list-disc list-inside'><li>穿越台灣阿里山神木大鳥居</li><li>沈浸在代代木森林的負離子中</li></ul>"
        },
        { 
            "name": "SHIBUYA SKY", "placeKey": "SHIBUYA SKY",
            "type": "景點", 
            "expertRec": "東京天際線的最強俯視角。", "historyCulture": "見證澀谷『百年一遇』大規模都市更新的至高點。",
            "focusPoints": "<ul class='list-disc list-inside'><li>Sky Edge 邊緣拍攝無邊際感</li><li>遠眺江戶城遺址與富士山方向</li></ul>"
        }
    ],
    "accommodation": [
        { 
            "day": "1", "city": "南房總", 
            "name": "Grand Mercure Minamiboso", "placeKey": "南房總美爵溫泉度假酒店", 
            "parking": "免費", 
            "convenienceStores": [{ "brand": "7-11", "name": "南房總富浦多田良店", "placeKey": "7-Eleven 南房總富浦多田良店" }] 
        },
        { 
            "day": "2-3", "city": "台場", 
            "name": "Hilton Tokyo Odaiba", "placeKey": "東京台場希爾頓酒店", 
            "parking": "¥2,000/晚", 
            "convenienceStores": [{ "brand": "Lawson", "name": "お台場海濱公園前店", "placeKey": "Lawson お台場海濱公園前店" }] 
        },
        { 
            "day": "4-5", "city": "品川", 
            "name": "品川王子大飯店", "placeKey": "品川王子大飯店", 
            "parking": "住客優惠", 
            "convenienceStores": [{ "brand": "7-11", "name": "品川站新高輪店", "placeKey": "7-Eleven 品川站新高輪店" }] 
        }
    ],
    "themedGuidesData": {
        "amulets": { 
            "title": "⛩️ 神社御守攻略", 
            "description": "嚴選本行程中必入手的強力能量守護。", 
            "items": [
                { "name": "明治神宮", "placeKey": "明治神宮", "prefecture": "東京都", "popular": "開運木鈴 (KODAMA)", "special": "由神宮內倒伏的神木雕刻而成，聲音清脆" },
                { "name": "品川神社", "placeKey": "品川神社", "prefecture": "東京都", "popular": "金運御守與洗錢體驗", "special": "境內『阿那稻荷神社』的一粒萬倍神水加持" }
            ] 
        },
        "souvenirs": { 
            "title": "🛍️ 伴手禮情報", 
            "description": "品川樞紐站與人氣商場的嚴選伴手禮。", 
            "items": [
                { "name": "ecute 品川", "placeKey": "ecute 品川", "items": ["VERY RUBY CUT 草莓夾心餅", "一風堂拉麵禮盒 (機場不一定買得到)"] },
                { "name": "atré 品川", "placeKey": "atré 品川", "items": ["Blue Bottle 專屬烘焙咖啡豆"] }
            ] 
        },
        "animePilgrimage": { 
            "title": "🎥 聖地巡禮", 
            "description": "無縫融入經典 ACG 作品的現實取景地。", 
            "items": [
                { "name": "數碼寶貝大冒險", "locations": ["台場富士電視台", "彩虹大橋"] },
                { "name": "天氣之子", "locations": ["台場海濱公園"] }
            ] 
        }
    },
    "awardsData": {
        "top100": [
            { 
                "title": "🌃 日本夜景 100 選", "theme": "border-indigo-400", 
                "locations": [{ "name": "台場海濱公園", "placeKey": "台場海濱公園", "prefecture": "東京都", "details": "彩虹大橋、東京鐵塔與屋形船燈火交織出的無敵海灣夜景。" }] 
            },
            { 
                "title": "🏙️ 日本都市景觀 100 選", "theme": "border-blue-400", 
                "locations": [{ "name": "台場海濱地區", "placeKey": "台場海濱地區", "prefecture": "東京都", "details": "融合未來感建築與開闊親水空間的臨海副都心典範。" }] 
            },
            { 
                "title": "🍦 道の駅最優秀賞", "theme": "border-yellow-400", 
                "locations": [{ "name": "道の駅 富浦 枇杷俱樂部", "placeKey": "道の駅 富浦 枇杷俱樂部", "prefecture": "千葉縣", "details": "曾獲全國道の駅大獎第一名，南房總公路旅行的絕對指標。" }] 
            },
            { 
                "title": "🏯 日本 100 名城", "theme": "border-slate-400", 
                "locations": [{ "name": "江戶城 (皇居外苑)", "placeKey": "江戶城 (皇居外苑)", "prefecture": "東京都", "details": "前德川幕府權力核心，其雄偉的城垣與護城河見證了日本三百年的和平與發展。" }] 
            }
        ],
        "greatThree": [
            { 
                "title": "⛩️ 東京十社 (精選)", "theme": "border-red-400", "status": "地區精選", 
                "description": "明治天皇欽定，負責守護新首都（舊江戶）的十座代表性古老神社。", 
                "location": { "name": "品川神社", "placeKey": "品川神社", "prefecture": "東京都" }, 
                "others": "芝大神宮、神田明神等其餘九社", "alternative_title": "境內特殊亮點", "alternatives": ["品川神社富士塚 (高達 15 公尺，號稱『品川富士』)"] 
            },
            { 
                "title": "🌲 日本歷史公園 100 選", "theme": "border-emerald-400", "status": "地區精選", 
                "description": "東京都會區最重要的生態綠洲，由十萬株捐贈樹木所構成的人造森林。", 
                "location": { "name": "明治神宮", "placeKey": "明治神宮", "prefecture": "東京都" }, 
                "others": "代代木公園、上野恩賜公園等", "alternative_title": "核心文化亮點", "alternatives": ["明治神宮鎮守之森"] 
            }
        ]
    },
    "seasonalData": {
        "spring": { "title": "春 (3-5月)", "theme_color": "bg-pink-100", "icon": "🌸", "highlights": ["千鳥淵櫻花盛開", "明治神宮新綠漫步"], "foods": ["時令草莓", "初鰹"] },
        "summer": { "title": "夏 (6-8月)", "theme_color": "bg-blue-100", "icon": "☀️", "highlights": ["東京灣大華火祭", "隅田川屋形船納涼"], "foods": ["國產鰻魚", "山梨水蜜桃"] },
        "autumn": { "title": "秋 (9-11月)", "theme_color": "bg-orange-100", "icon": "🍁", "highlights": ["神宮外苑銀杏大道", "高尾山賞楓"], "foods": ["丹波栗子", "鹽烤秋刀魚"] },
        "winter": { "title": "冬 (12-2月)", "theme_color": "bg-indigo-100", "icon": "❄️", "highlights": ["台場彩虹大橋冬季點燈", "新年神社初詣 (參拜)"], "foods": ["松葉蟹", "關東煮與熱清酒"] }
    },
    "transportPass": { "title": "核心交通：專車接駁與 Apple Pay Suica", "details": { "類型": "公司專車 + 數位行動支付", "有效期限": "全程六天" }, "description": "完美結合長途專車的舒適度與市區地鐵的機動性。" },
    "transportPassAnalysis": "<p><strong>交通精算師解析：</strong> 本次行程跨越大範圍的千葉縣（南房總）與東京都心。由於主要城際移動（機場 ⇔ 房總 ⇔ 都心）皆已依賴專車接送，強烈建議<strong>不需購買昂貴的 JR Pass 或廣域周遊券</strong>。在東京都內的自由活動時間（如 Day 5 的澀谷/秋葉原），建議直接在手機錢包綁定 <strong>Apple Pay Suica</strong> 或使用實體西瓜卡，以應付 JR 山手線與地下鐵頻繁且跨系統的靈活轉乘，這在金錢與時間效益上是最佳解。</p>",
    "transportSummary": [
        { "day": 1, "route": "成田機場 → 南房總美爵酒店", "transport": "專屬商務巴士", "time": "14:00 - 16:30", "cost": "已含" },
        { "day": 2, "route": "南房總 → 東京台場", "transport": "專屬商務巴士", "time": "15:00 - 17:30", "cost": "已含" },
        { "day": 6, "route": "品川 → 成田機場第一航廈", "transport": "專屬商務巴士", "time": "10:00 - 12:00", "cost": "已含" }
    ],
    "transportTactics": ["<span class='emphasis'>行李無縫轉運：</span>大件行李將由專車底層巴士隨車移動，更換飯店時不需自行提著行李擠電車，達成真正的尊榮商務體驗。", "<span class='emphasis'>市區置物櫃戰術：</span>在澀谷 (Day 5 選項A) 或秋葉原 (選項B) 進行大量採購時，請優先尋找車站內的投幣式置物櫃（Coin Locker，支援 Suica 付款），解放雙手以利後續觀光。"],
    "prepList": { 
        "description": "赴日商務考察與高效採購的精準裝備清單。", 
        "categories": [
            { "category": "💼 商務裝備與電子耗材", "items": ["商務輕便西裝與防皺襯衫", "名片準備 50 張以上（雙手遞交）", "高瓦數快充插頭與行動電源", "筆電簡報轉接線材（HDMI/Type-C）"] },
            { "category": "👕 季節穿搭與日用品 (四月春季)", "items": ["洋蔥式穿搭法：應對白天日曬與夜晚東京灣海風的巨大溫差", "防風薄外套與極度舒適的防滑好走便鞋", "個人常備藥物（胃藥、止痛藥等）", "休足時間（強烈建議第一晚即於超商購入）"] },
            { "category": "📱 數位與票券", "items": ["Visit Japan Web 申報完成 QR Code 截圖", "手機綁定好 Apple Pay / Google Pay 的 Suica 卡", "唐吉訶德與 Bic Camera 等大型量販店之數位免稅折價券"] }
        ] 
    },
    "prepMemos": [
        { "title": "⛩️ 特有文化禮節與參拜", "content": "進入神聖的神社領域（如明治神宮）前，請於手水舍依序洗左手、右手、漱口以淨身；於本殿參拜時，請遵循「二拜、二拍手、一拜」的嚴格規矩。此外，飯店溫泉入浴前必須在淋浴區將身體完全洗淨，且毛巾絕對不可入水池。" },
        { "title": "🍺 飲食習慣與潛規則", "content": "若晚間前往居酒屋聚餐，多數店家會主動送上一小碟名為「お通し (Otooshi)」的付費小菜，這是當地約定俗成的座位費文化，請視為體驗的一部分。此外，正宗的日本拉麵湯頭普遍較為濃郁偏鹹，若需調整，部分店家可接受向店員詢問「味薄め (Aji usume)」。" }
    ],
    "prepExpertTips": [
        { "title": "💳 退稅規範 (Tax-Free) 實戰", "content": "於唐吉訶德或藥妝店購物滿 5,000 日圓即可享有免稅。請務必隨身攜帶「實體護照」（不可使用照片影本）。需特別注意：消耗品（如藥妝、食品）退稅後會被封裝在特製免稅袋中，離開日本境內前絕對不可拆封；而一般物品（如電器、衣物）則可直接在日本境內拆開使用。" },
        { "title": "🎫 數位票證極致運用", "content": "Suica 除了搭乘地鐵外，更能廣泛用於車站內的便利商店、飲料自動販賣機、甚至是部分連鎖松屋/吉野家的結帳，能大幅減少攜帶零錢硬幣的麻煩，提升行動效率。" }
    ]
};
