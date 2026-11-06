(function () {
  "use strict";

  // Each entry contains the original copy, Traditional Chinese, and US English.
  // Text nodes are updated in place so embedded icons and interactive elements survive.
  var messages = [
    ["TrafArch 是一款 Android 交通卡读取工具：贴近卡片即可查看可读取的余额与最近行程，支持保存卡片、导出记录与 JT/T 1179 乘车码解析。", "TrafArch 是一款 Android 交通卡讀取工具：靠近卡片即可查看可讀取的餘額與最近行程，支援儲存卡片、匯出紀錄與 JT/T 1179 乘車碼解析。", "TrafArch is an Android transit card reader. Tap a card to view available balances and recent trips, save cards, export records, and decode JT/T 1179 transit QR codes."],
    ["TrafArch — 读懂交通卡，留住每次出行", "TrafArch — 讀懂交通卡，留住每次出行", "TrafArch — Read your transit cards. Keep every journey."],
    ["读懂交通卡，留住每次出行。查看余额与最近行程，保存读过的每一张卡。", "讀懂交通卡，留住每次出行。查看餘額與最近行程，儲存讀過的每一張卡。", "Read your transit cards. Keep every journey. View balances and recent trips, and save every card you read."],
    ["跳到主要内容", "跳至主要內容", "Skip to main content"],
    ["TrafArch 首页", "TrafArch 首頁", "TrafArch home"],
    ["主导航", "主導覽", "Main navigation"],
    ["功能", "功能", "Features"],
    ["使用指南", "使用指南", "How to use"],
    ["卡种支持", "支援卡種", "Supported cards"],
    ["常见问题", "常見問題", "FAQ"],
    ["切换到深色模式", "切換至深色模式", "Switch to dark mode"],
    ["切换到浅色模式", "切換至淺色模式", "Switch to light mode"],
    ["下载应用", "下載應用程式", "Download"],
    ["打开菜单", "開啟選單", "Open menu"],
    ["关闭菜单", "關閉選單", "Close menu"],
    ["切换语言", "切換語言", "Change language"],
    ["移动导航", "行動版導覽", "Mobile navigation"],
    ["隐私政策", "隱私政策", "Privacy policy"],
    ["让交通卡里的信息，清晰可见", "讓交通卡裡的資訊，清晰可見", "Your transit card, clearly explained"],
    ["读懂交通卡，", "讀懂交通卡，", "Read your transit cards."],
    ["留住", "留住", "Keep "],
    ["每次出行。", "每次出行。", "every journey."],
    ["余额、行程，还有沿途的点滴。", "餘額、行程，還有沿途的點滴。", "Your balance, your trips, and the moments along the way. "],
    ["TrafArch 帮你读懂交通卡，留存自己的出行记录。", "TrafArch 幫你讀懂交通卡，留存自己的出行紀錄。", "TrafArch helps you read your transit cards and keep a record of your travels."],
    ["下载 Android 应用", "下載 Android 應用程式", "Download for Android"],
    ["了解使用方式", "瞭解使用方式", "See how it works"],
    ["仅提供信息读取与展示，不提供充值、支付或修改卡片功能。", "僅提供資訊讀取與顯示，不提供儲值、付款或修改卡片功能。", "Reads and displays information only. Top-ups, payments, and card modifications are not supported."],
    ["TrafArch 交互演示", "TrafArch 互動示範", "TrafArch interactive demo"],
    ["我的出行", "我的出行", "My journeys"],
    ["每段旅程，都值得留存", "每段旅程，都值得留存", "Every journey is worth keeping"],
    ["我的交通卡", "我的交通卡", "My transit cards"],
    ["读取完成", "讀取完成", "Read complete"],
    ["应用演示内容", "應用程式示範內容", "App demo views"],
    ["卡片概览", "卡片概覽", "Overview"],
    ["最近行程", "最近行程", "Recent trips"],
    ["本地档案", "本機存檔", "Saved cards"],
    ["上海公共交通卡", "上海公共交通卡", "Shanghai Public Transport Card"],
    ["交通联合", "交通聯合", "T-Union"],
    ["可读取余额", "可讀取餘額", "Available balance"],
    ["查看全部", "查看全部", "View all"],
    ["地铁 2 号线", "地鐵 2 號線", "Metro Line 2"],
    ["人民广场", "人民廣場", "People’s Square"],
    ["陆家嘴", "陸家嘴", "Lujiazui"],
    ["今天 08:42", "今天 08:42", "Today, 8:42 AM"],
    ["公交 71 路", "公車 71 路", "Bus 71"],
    ["延安东路", "延安東路", "East Yan’an Road"],
    ["静安寺", "靜安寺", "Jing’an Temple"],
    ["昨天 18:20", "昨天 18:20", "Yesterday, 6:20 PM"],
    ["最近读取的 3 段行程", "最近讀取的 3 段行程", "Your 3 most recent trips"],
    ["沿着时间，回看走过的路。", "沿著時間，回看走過的路。", "Look back at the places you’ve been."],
    ["人民广场 → 陆家嘴", "人民廣場 → 陸家嘴", "People’s Square → Lujiazui"],
    ["延安东路 → 静安寺", "延安東路 → 靜安寺", "East Yan’an Road → Jing’an Temple"],
    ["地铁 1 号线", "地鐵 1 號線", "Metro Line 1"],
    ["徐家汇 → 上海火车站", "徐家匯 → 上海火車站", "Xujiahui → Shanghai Railway Station"],
    ["昨天 08:36", "昨天 08:36", "Yesterday, 8:36 AM"],
    ["卡片只保留有限条记录，记得及时保存。", "卡片只保留有限筆紀錄，記得及時儲存。", "Cards store a limited number of records. Save them regularly."],
    ["留在本机的出行记忆", "留在本機的出行記憶", "Your journeys, saved locally"],
    ["读取快照、卡片名称，随时回来查看。", "讀取快照、卡片名稱，隨時回來查看。", "Revisit your card names and saved snapshots anytime."],
    ["我的上海交通卡", "我的上海交通卡", "My Shanghai transit card"],
    ["示例档案 · 尾号 6821", "範例存檔 · 尾號 6821", "Sample card · ending in 6821"],
    ["已保存的记录保存在你的设备中。", "已儲存的紀錄保存在你的裝置中。", "Saved records stay on your device."],
    ["保存这张卡", "儲存這張卡", "Save this card"],
    ["再次读取", "再次讀取", "Read again"],
    ["试着切换标签，探索你的出行档案", "試著切換分頁，探索你的出行存檔", "Switch tabs to explore your journeys"],
    ["· 演示数据", "· 示範資料", "· Sample data"],
    ["贴卡即读", "靠卡即讀", "Tap to read"],
    ["行程一目了然", "行程一目瞭然", "Trips at a glance"],
    ["档案保存在本机", "存檔保存在本機", "Saved on your device"],
    ["开源，持续完善", "開源，持續完善", "Open source, always improving"],
    ["01 / 功能一览", "01 / 功能一覽", "01 / Features"],
    ["不止于读卡，", "不止於讀卡，", "Read your cards."],
    ["也为每一次出行留档。", "也為每一次出行留檔。", "Keep every journey."],
    ["把卡片里零散的信息，", "把卡片裡零散的資訊，", "Turn the details on your cards"],
    ["整理成看得懂、找得到的记录。", "整理成看得懂、找得到的紀錄。", "into records that are easy to read and find."],
    ["走过的路，清晰可见", "走過的路，清晰可見", "See where you’ve been"],
    ["查看卡内保留的交易和乘车记录，", "查看卡內保留的交易和乘車紀錄，", "View transactions and trips stored on your card."],
    ["结合内置数据识别线路与站点。", "結合內建資料識別路線與站點。", "Built-in reference data helps identify routes and stations."],
    ["地铁 2 号线：人民广场至陆家嘴，途经南京东路", "地鐵 2 號線：人民廣場至陸家嘴，途經南京東路", "Metro Line 2: People’s Square to Lujiazui via East Nanjing Road"],
    ["上海地铁", "上海地鐵", "Shanghai Metro Line"],
    ["号线", "號線", ""],
    ["南京东路", "南京東路", "East Nanjing Road"],
    ["每张卡，都有自己的档案", "每張卡，都有自己的存檔", "A place for every card"],
    ["保存读取快照、自定义卡片名称，", "儲存讀取快照、自訂卡片名稱，", "Save snapshots and give your cards custom names."],
    ["让熟悉的卡片和记录随时可寻。", "讓熟悉的卡片和紀錄隨時可尋。", "Find your favorite cards and records anytime."],
    ["日常通勤", "日常通勤", "Daily commute"],
    ["周末出游", "週末出遊", "Weekend outings"],
    ["交通联合卡", "交通聯合卡", "T-Union card"],
    ["乘车码，也能读", "乘車碼，也能讀", "Read transit QR codes, too"],
    ["相机扫描或相册导入，解析符合 JT/T 1179 标准的乘车码。", "相機掃描或相簿匯入，解析符合 JT/T 1179 標準的乘車碼。", "Scan with your camera or import an image to decode transit QR codes that follow the JT/T 1179 standard."],
    ["扫描 · 导入 · 解析", "掃描 · 匯入 · 解析", "Scan · Import · Decode"],
    ["留存，也可以导出", "留存，也可以匯出", "Save it. Export it."],
    ["查看历次保存的结果，按需导出文本。分享前记得检查个人信息。", "查看歷次儲存的結果，依需匯出文字。分享前記得檢查個人資訊。", "Review saved results and export them as text when needed. Check for personal information before sharing."],
    ["保存 · 重命名 · 导出", "儲存 · 重新命名 · 匯出", "Save · Rename · Export"],
    ["想了解更多？深入一点", "想瞭解更多？深入一點", "Take a closer look"],
    ["在“专家”页面查看详细读取结果，为了解数据或排查问题提供线索。", "在「專家」頁面查看詳細讀取結果，為瞭解資料或排查問題提供線索。", "Explore detailed read results on the Expert screen to understand the data or troubleshoot issues."],
    ["详细信息 · 读取诊断", "詳細資訊 · 讀取診斷", "Details · Read diagnostics"],
    ["02 / 使用指南", "02 / 使用指南", "02 / How to use"],
    ["简单四步，", "簡單四步，", "Four simple steps."],
    ["开启你的出行档案。", "開啟你的出行存檔。", "Start saving your journeys."],
    ["准备一台支持 NFC 的 Android 手机，", "準備一台支援 NFC 的 Android 手機，", "All you need is an NFC-enabled Android phone"],
    ["还有一张你想了解的交通卡。", "還有一張你想瞭解的交通卡。", "and a transit card you’d like to read."],
    ["先下载 TrafArch", "先下載 TrafArch", "Get TrafArch"],
    ["开启 NFC", "開啟 NFC", "Turn on NFC"],
    ["在手机系统设置中打开 NFC，启动 TrafArch。", "在手機系統設定中開啟 NFC，啟動 TrafArch。", "Enable NFC in your phone’s settings, then open TrafArch."],
    ["贴卡，稍等片刻", "靠卡，稍等片刻", "Hold your card nearby"],
    ["将一张卡贴近手机背面感应区，保持不动，直到读取结束。", "將一張卡靠近手機背面感應區，保持不動，直到讀取結束。", "Hold one card against the NFC area on the back of your phone. Keep it still until the read finishes."],
    ["查看余额与行程", "查看餘額與行程", "View your balance and trips"],
    ["查看本次读到的卡片信息，进入“行程”回看最近记录。", "查看本次讀到的卡片資訊，進入「行程」回看最近紀錄。", "Check the information read from your card, then open Trips to review recent records."],
    ["保存，下次再见", "儲存，下次再見", "Save it for later"],
    ["保存卡片后随时回看。也可在设置中开启读取后自动保存。", "儲存卡片後隨時回看。也可在設定中開啟讀取後自動儲存。", "Save your card to revisit it anytime. You can also enable automatic saving after each read in Settings."],
    ["03 / 卡种支持", "03 / 支援卡種", "03 / Supported cards"],
    ["熟悉的交通卡，", "熟悉的交通卡，", "Your everyday transit card."],
    ["试着读一读。", "試著讀一讀。", "Give it a tap."],
    ["城市、卡种与发行批次各不相同。", "城市、卡種與發行批次各不相同。", "Support varies by city, card type, and issue."],
    ["可显示的内容，以实际读取结果为准。", "可顯示的內容，以實際讀取結果為準。", "Available information depends on what your card allows us to read."],
    ["按卡片类型筛选", "依卡片類型篩選", "Filter by card type"],
    ["全部卡种", "全部卡種", "All types"],
    ["实体交通卡", "實體交通卡", "Physical cards"],
    ["乘车码", "乘車碼", "Transit QR codes"],
    ["搜索卡种或城市", "搜尋卡種或城市", "Search cards or cities"],
    ["卡片类型", "卡片類型", "Card type"],
    ["可读取的内容", "可讀取的內容", "What you can read"],
    ["支持情况", "支援情況", "Support"],
    ["公开可访问的卡片信息、钱包余额、交易与乘车记录；线路与站点识别取决于卡内记录和参考数据。", "公開可存取的卡片資訊、錢包餘額、交易與乘車紀錄；路線與站點識別取決於卡內紀錄和參考資料。", "Publicly accessible card details, wallet balances, transactions, and trips. Route and station identification depends on card records and reference data."],
    ["支持读取", "支援讀取", "Supported"],
    ["城市一卡通", "城市一卡通", "City transit cards"],
    ["部分城市和卡种的卡片信息、余额及记录，具体可读取内容因卡片而异。", "部分城市和卡種的卡片資訊、餘額及紀錄，具體可讀取內容因卡片而異。", "Card details, balances, and records for selected cities and card types. Available information varies by card."],
    ["部分支持", "部分支援", "Partial"],
    ["地方交通卡", "地方交通卡", "Local transit cards"],
    ["已有以下城市的读取路径，支持情况取决于具体卡片版本。", "已有以下城市的讀取方式，支援情況取決於具體卡片版本。", "Reading is implemented for the following cities. Support depends on the card version."],
    ["北京", "北京", "Beijing"],
    ["上海", "上海", "Shanghai"],
    ["武汉通", "武漢通", "Wuhan Tong"],
    ["羊城通", "羊城通", "Yang Cheng Tong"],
    ["深圳通", "深圳通", "Shenzhen Tong"],
    ["苏州", "蘇州", "Suzhou"],
    ["天府通", "天府通", "Tianfu Tong"],
    ["部分城市", "部分城市", "Select cities"],
    ["部分 FeliCa 卡片", "部分 FeliCa 卡片", "Selected FeliCa cards"],
    ["提供识别和部分信息读取；Suica 可尝试读取开放服务中的余额与历史，取决于卡片和手机 NFC 能力。", "提供識別和部分資訊讀取；Suica 可嘗試讀取開放服務中的餘額與歷史，取決於卡片和手機 NFC 能力。", "Identification and limited information reading. Suica balances and history may be readable through open services, depending on the card and your phone’s NFC capabilities."],
    ["八达通相关产品", "八達通相關產品", "Octopus products"],
    ["支持部分产品识别，尚未实现港币钱包余额与交易读取。全国通交通联合侧金额不等于港币余额。", "支援部分產品識別，尚未實作港幣錢包餘額與交易讀取。全國通交通聯合側金額不等於港幣餘額。", "Some products can be identified. HKD wallet balances and transactions cannot currently be read. The T-Union amount on Octopus China T-Union cards is not the HKD balance."],
    ["识别有限", "識別有限", "Limited"],
    ["标准乘车码", "標準乘車碼", "Standard transit QR codes"],
    ["支持 JT/T 1179 标准乘车码的相机扫描与图片导入，不适用于所有支付码和城市自有格式。", "支援 JT/T 1179 標準乘車碼的相機掃描與圖片匯入，不適用於所有付款碼和城市自有格式。", "Camera scanning and image import for JT/T 1179 transit QR codes. Not all payment codes or city-specific formats are supported."],
    ["标准支持", "標準支援", "JT/T 1179"],
    ["没有找到匹配的卡种，试试其他关键词。", "沒有找到符合的卡種，試試其他關鍵字。", "No matching card types. Try another search."],
    ["共 6 类卡种与乘车码。卡片仅保留有限条最近记录，及时保存可以留存已读到的信息。", "共 6 類卡種與乘車碼。卡片僅保留有限筆最近紀錄，及時儲存可以留存已讀到的資訊。", "6 card and transit QR code categories. Cards store a limited number of recent records. Save them regularly to keep what you’ve read."],
    ["共 {count} 类匹配。卡片仅保留有限条最近记录，及时保存可以留存已读到的信息。", "共 {count} 類符合。卡片僅保留有限筆最近紀錄，及時儲存可以留存已讀到的資訊。", "Matches: {count} categories. Cards store a limited number of recent records. Save them regularly to keep what you’ve read."],
    ["由你保管，也由你掌握", "由你保管，也由你掌握", "Your records. Your control."],
    ["你的记录，", "你的紀錄，", "Your journeys."],
    ["留在你的手机里。", "留在你的手機裡。", "On your phone."],
    ["查看隐私政策", "查看隱私政策", "Read the privacy policy"],
    ["档案在本机", "存檔在本機", "Stored on your device"],
    ["已保存的卡片、读取快照与设置都保存在本机，方便之后回看。", "已儲存的卡片、讀取快照與設定都保存在本機，方便之後回看。", "Saved cards, read snapshots, and settings stay on your device for you to revisit."],
    ["线路识别使用本地数据", "路線識別使用本機資料", "Local data for route recognition"],
    ["参考数据随应用提供。系统扫码、模型下载及在线反馈等功能可能需要网络。", "參考資料隨應用程式提供。系統掃碼、模型下載及線上意見回饋等功能可能需要網路。", "Reference data comes with the app. System scanning, model downloads, and online feedback may require an internet connection."],
    ["分享前，多看一眼", "分享前，多看一眼", "Check before you share"],
    ["导出文件和运行日志可能含卡片标识与行程。公开分享前，请检查并遮盖个人信息。", "匯出檔案和執行日誌可能含卡片識別資訊與行程。公開分享前，請檢查並遮蔽個人資訊。", "Exports and logs may contain card identifiers and trips. Review and redact personal information before sharing publicly."],
    ["04 / 常见问题", "04 / 常見問題", "04 / FAQ"],
    ["还有些小疑问？", "還有些小疑問？", "Still have questions?"],
    ["关于读取、记录与使用，", "關於讀取、紀錄與使用，", "Reading cards, saving trips, getting started."],
    ["你可能想知道的都在这里。", "你可能想知道的都在這裡。", "Find answers to common questions here."],
    ["加入反馈群", "加入意見回饋群組", "Join the feedback group"],
    ["贴卡后没有反应，或读取失败？", "靠卡後沒有反應，或讀取失敗？", "Nothing happens when I tap, or the read fails. What should I do?"],
    ["确认手机支持 NFC 并已开启。调整卡片与手机背面的贴合位置，保持不动，避免叠放多张卡。较厚的保护壳或金属配件也可能影响感应。", "確認手機支援 NFC 並已開啟。調整卡片與手機背面的貼合位置，保持不動，避免疊放多張卡。較厚的保護殼或金屬配件也可能影響感應。", "Make sure your phone supports NFC and that it’s turned on. Adjust the card’s position against the back of your phone and hold it still. Avoid stacking cards. Thick cases or metal accessories may interfere."],
    ["若能感应但读取不完整，可能是卡片未适配、未开放相关数据或通信未完成。可以重试，并通过应用内“设置 → 反馈”提交问题。", "若能感應但讀取不完整，可能是卡片尚未支援、未開放相關資料或通訊未完成。可以重試，並透過應用程式內「設定 → 意見回饋」回報問題。", "If the card is detected but the read is incomplete, it may be unsupported, the data may be restricted, or communication may have been interrupted. Try again and report the issue under Settings → Feedback in the app."],
    ["为什么没有站名，只显示编码？", "為什麼沒有站名，只顯示編碼？", "Why do I see codes instead of station names?"],
    ["站名识别需要卡片记录与内置参考数据匹配。未收录或编码含义不明时，会保留原始编码或显示“未匹配”，不一定代表没有读到记录。发卡城市也可能与实际乘车城市不同。", "站名識別需要卡片紀錄與內建參考資料相符。未收錄或編碼含義不明時，會保留原始編碼或顯示「未匹配」，不一定代表沒有讀到紀錄。發卡城市也可能與實際乘車城市不同。", "Station names require a match between card records and built-in reference data. Unknown codes are kept as-is or marked as unmatched; this doesn’t necessarily mean no records were read. The issuing city may also differ from the city you traveled in."],
    ["没有 NFC，可以使用吗？", "沒有 NFC，可以使用嗎？", "Can I use TrafArch without NFC?"],
    ["可以使用乘车码解析功能，通过相机扫描或从相册导入符合 JT/T 1179 标准的二维码。相机扫码需要相机权限；首次识别可能需要联网下载模型。系统扫码需要 Google Play 服务，可在设置中选择是否开启。", "可以使用乘車碼解析功能，透過相機掃描或從相簿匯入符合 JT/T 1179 標準的 QR Code。相機掃碼需要相機權限；首次識別可能需要連網下載模型。系統掃碼需要 Google Play 服務，可在設定中選擇是否開啟。", "Yes. Scan or import an image of a JT/T 1179 transit QR code. Camera scanning requires camera permission, and the first scan may need an internet connection to download a model. System scanning requires Google Play services and can be enabled in Settings."],
    ["八达通全国通金额为什么不等于港币余额？", "八達通全國通金額為什麼不等於港幣餘額？", "Why is the Octopus China T-Union amount different from the HKD balance?"],
    ["交通联合侧金额与港币钱包余额含义不同，不能互相替代。“港币余额未读取”表示本次没有读出实际港币余额，请通过八达通官方渠道核对。", "交通聯合側金額與港幣錢包餘額含義不同，不能互相替代。「港幣餘額未讀取」表示本次沒有讀出實際港幣餘額，請透過八達通官方管道核對。", "The T-Union amount and HKD wallet balance are different values and cannot be used interchangeably. “HKD balance not read” means the actual HKD balance wasn’t retrieved. Check it through official Octopus channels."],
    ["更新应用时提示不兼容，怎么办？", "更新應用程式時提示不相容，怎麼辦？", "What if an app update says it’s incompatible?"],
    ["不同来源或签名的安装包可能无法覆盖安装，请核对发布说明。卸载应用可能删除本地卡片档案，遇到更新错误时，请先了解原因，避免直接卸载。", "不同來源或簽章的安裝套件可能無法覆蓋安裝，請核對版本說明。解除安裝應用程式可能刪除本機卡片存檔，遇到更新錯誤時，請先瞭解原因，避免直接解除安裝。", "Packages from different sources or with different signatures may not install over an existing version. Check the release notes. Uninstalling may delete your local card archives, so investigate update errors before uninstalling."],
    ["下一段旅程，从这里开始", "下一段旅程，從這裡開始", "Your next journey starts here"],
    ["带上 TrafArch，", "帶上 TrafArch，", "Take TrafArch along."],
    ["留住每次出行。", "留住每次出行。", "Keep every journey."],
    ["在 GitHub 上了解项目", "在 GitHub 上瞭解專案", "Explore the project on GitHub"],
    ["友情链接", "友情連結", "Friends and related projects"],
    ["沿途，还有这些好朋友", "沿途，還有這些好朋友", "Good company along the way"],
    ["AstroRail · 星途", "AstroRail · 星途", "AstroRail"],
    ["读懂交通卡，留住每次出行", "讀懂交通卡，留住每次出行", "Read your transit cards. Keep every journey."],
    ["页脚导航", "頁尾導覽", "Footer navigation"],
    ["反馈群", "意見回饋群組", "Feedback group"],
    ["TrafArch 独立设计预览：贴近一张交通卡，查看余额与行程，将每一次出行保存在本机。", "TrafArch 獨立設計預覽：靠近一張交通卡，查看餘額與行程，將每一次出行保存在本機。", "TrafArch design preview: tap a transit card to view balances and trips, and save your journeys on your device."],
    ["TrafArch · Apron 设计预览", "TrafArch · Apron 設計預覽", "TrafArch · Apron Design Preview"],
    ["TrafArch 预览页首页", "TrafArch 預覽頁首頁", "TrafArch preview home"],
    ["设计预览", "設計預覽", "Design preview"],
    ["正式官网", "正式官網", "Official website"],
    ["查看正式官网", "查看正式官網", "Visit the official website"],
    ["已保存示例", "已儲存範例", "Sample saved"],
    ["刚刚保存 · 尾号 6821 · 演示数据", "剛剛儲存 · 尾號 6821 · 示範資料", "Just saved · ending in 6821 · Sample data"],
    ["示例卡片已加入“本地档案”，可切换标签查看。此操作仅作页面演示。", "範例卡片已加入「本機存檔」，可切換分頁查看。此操作僅作頁面示範。", "Sample card added to Saved cards. Switch tabs to view it. This is a website demo only."],
    ["正在读取…", "正在讀取…", "Reading…"],
    ["正在读取", "正在讀取", "Reading"],
    ["演示读取完成。实际读卡请在 Android 应用中进行。", "示範讀取完成。實際讀卡請在 Android 應用程式中進行。", "Demo read complete. Use the Android app to read a real card."],
  ];

  var locales = ["zh-CN", "zh-Hant", "en-US"];
  var catalog = new Map(messages.map(function (entry) { return [entry[0], entry]; }));
  var policyPages = { "zh-CN": "privacy.html", "zh-Hant": "privacy-zh-Hant.html", "en-US": "privacy-en.html" };
  var root = document.documentElement;
  var isPolicy = document.body.classList.contains("policy-page");
  var languageKey = "trafarch-language";
  var language;
  var bindings = [];
  var languageButton = document.getElementById("language-toggle");
  var languageMenu = document.getElementById("language-menu");

  function normalizeLanguage(value) {
    if (!value) return null;
    if (/^zh-(hant|tw|hk|mo)(-|$)/i.test(value)) return "zh-Hant";
    if (/^zh(-|$)/i.test(value)) return "zh-CN";
    if (/^en(-|$)/i.test(value)) return "en-US";
    return null;
  }

  function initialLanguage() {
    // A policy URL explicitly selects its existing, fully translated document.
    if (isPolicy) return normalizeLanguage(root.lang) || "zh-CN";
    var requested = normalizeLanguage(new URL(location.href).searchParams.get("lang"));
    if (requested) return requested;
    try {
      var saved = normalizeLanguage(localStorage.getItem(languageKey));
      if (saved) return saved;
    } catch (error) { /* Language switching also works without storage. */ }
    var preferred = navigator.languages || [navigator.language];
    for (var index = 0; index < preferred.length; index += 1) {
      var supported = normalizeLanguage(preferred[index]);
      if (supported) return supported;
    }
    return "zh-CN";
  }

  function t(message, values) {
    var entry = catalog.get(message);
    var translated = entry ? entry[locales.indexOf(language)] : message;
    return translated.replace(/\{(\w+)\}/g, function (match, key) {
      return values && Object.prototype.hasOwnProperty.call(values, key) ? values[key] : match;
    });
  }

  if (!isPolicy) {
    var walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      var node = walker.currentNode;
      if (node.parentElement.closest("script, style, .icon, #language-menu")) continue;
      var source = node.textContent.trim();
      if (catalog.has(source)) bindings.push({ node: node, source: source, original: node.textContent });
    }
    document.querySelectorAll("[aria-label], [placeholder], meta[content], img[alt]").forEach(function (element) {
      ["aria-label", "placeholder", "content", "alt"].forEach(function (attribute) {
        var source = element.getAttribute(attribute);
        if (catalog.has(source)) bindings.push({ node: element, attribute: attribute, source: source });
      });
    });
  }

  function localizedUrl(href, targetLanguage) {
    var url = new URL(href, location.href);
    url.searchParams.set("lang", targetLanguage);
    return url.pathname + url.search + url.hash;
  }

  function updateLinks() {
    document.querySelectorAll('a[href]').forEach(function (link) {
      if (link.closest("#language-menu")) return;
      var url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      if (/\/privacy(?:-en|-zh-Hant)?\.html$/.test(url.pathname)) {
        url.pathname = url.pathname.replace(/[^/]+$/, policyPages[language]);
        link.href = url.pathname + url.search + url.hash;
      } else if (link.getAttribute("href").charAt(0) !== "#" && /\/(?:index\.html|apron-preview\.html)?$/.test(url.pathname)) {
        link.href = localizedUrl(url.href, language);
      }
    });
    languageMenu.querySelectorAll("a").forEach(function (link) {
      var target = link.lang;
      if (target === language) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
      if (isPolicy) {
        var url = new URL(policyPages[target], location.href);
        url.search = location.search;
        url.hash = location.hash;
        link.href = url.pathname + url.search + url.hash;
      } else link.href = localizedUrl(location.href, target);
    });
  }

  function setLanguage(value, persist) {
    language = normalizeLanguage(value) || "zh-CN";
    root.lang = language;
    bindings.forEach(function (binding) {
      if (binding.attribute) binding.node.setAttribute(binding.attribute, t(binding.source));
      else binding.node.textContent = binding.original.replace(binding.source, function () { return t(binding.source); });
    });
    languageButton.setAttribute("aria-label", t("切换语言"));
    languageButton.title = t("切换语言") + " · " + { "zh-CN": "简体中文", "zh-Hant": "繁體中文", "en-US": "English (US)" }[language];
    languageMenu.setAttribute("aria-label", t("切换语言"));
    updateLinks();
    if (persist) {
      try { localStorage.setItem(languageKey, language); } catch (error) { /* Selection remains active for this page. */ }
      if (!isPolicy) {
        try { history.replaceState(null, "", localizedUrl(location.href, language)); } catch (error) { /* Also supports local file previews. */ }
      }
    }
    window.dispatchEvent(new CustomEvent("trafarch:languagechange", { detail: { language: language } }));
  }

  function closeLanguageMenu(restoreFocus) {
    languageMenu.hidden = true;
    languageButton.setAttribute("aria-expanded", "false");
    if (restoreFocus) languageButton.focus();
  }

  languageButton.addEventListener("click", function () {
    if (!languageMenu.hidden) return closeLanguageMenu(false);
    updateLinks();
    languageMenu.hidden = false;
    languageButton.setAttribute("aria-expanded", "true");
    (languageMenu.querySelector("a[aria-current]") || languageMenu.querySelector("a")).focus();
  });
  languageMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      if (isPolicy) {
        try { localStorage.setItem(languageKey, link.lang); } catch (error) { /* The destination URL still selects its language. */ }
        return;
      }
      event.preventDefault();
      setLanguage(link.lang, true);
      closeLanguageMenu(true);
    });
  });
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".language-switcher")) closeLanguageMenu(false);
  });
  document.addEventListener("focusin", function (event) {
    if (!event.target.closest(".language-switcher")) closeLanguageMenu(false);
  });
  document.addEventListener("keydown", function (event) {
    if (languageMenu.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeLanguageMenu(true);
    } else if (languageMenu.contains(event.target) && ["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      var links = Array.from(languageMenu.querySelectorAll("a"));
      var index = links.indexOf(document.activeElement);
      if (event.key === "Home") index = 0;
      else if (event.key === "End") index = links.length - 1;
      else index = (index + (event.key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
      links[index].focus();
    }
  });

  window.TrafArchI18n = { t: t };
  setLanguage(initialLanguage(), false);
})();
