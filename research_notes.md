# 源材料提取与初步设计依据

## 任务核心

- 服务对象：**Sambisari Temple（Candi Sambisari）**，位于印度尼西亚日惹特区 Sleman Regency、Kalasan 一带。
- 语言策略：用户最新要求优先，实施 **印度尼西亚语（本地语言）与英语** 双语切换，不混入中文界面内容。
- 形态：一页式景点科普落地页，并提供 Privacy、Terms、Cookie Settings 三个独立二级页面。
- 语气：独立、非营利、客观的游客信息指南；不包含商户推荐、虚构评价或预订导流。

## 内容与功能清单

1. Hero、历史语境、考古/建筑解读、游览动线、真实影像、实用信息与 FAQ。
2. 实用信息须覆盖门票/费用、停车、厕所、餐饮类别、住宿类别、商超、加油/充电、机场/公交/出租车、最佳游览时段与建议停留时长，以及附近景点类别。
3. 使用用户给定的 Google Maps iframe，并将界面地区语言调整为印尼语。
4. 内嵌 TouristAttraction/LocalBusiness 与 FAQPage JSON-LD；加入 favicon 与同源图形 logo；提供准确、非编造的免责声明、隐私、条款与 Cookie 内容。
5. 真实影像应优先来自可公开使用、且与场地相符的来源；每张影像须不重复使用。

## 已访问的参考站点观察

| 来源 | 可借鉴元素 | 避免照搬之处 |
|---|---|---|
| Parque de la Salud | 首屏真实照片、半透明事实卡片、长篇科普段落、FAQ 与独立合规页 | 绿色城市公园调性与组件节奏不符合下沉式古寺的考古气质 |
| Fort Rotterdam | 印尼语优先、档案式叙事、强烈标题排版、时间线与空间解读、暖白纸张背景 | 不复制其堡垒图形与红砖建筑配色；Sambisari 应体现火山石与下沉发掘现场 |
| Puri Saren Agung Ubud | 文化语境优先、设施信息保持中立、引用可变信息时提示复核、独立合规页与清晰的交通信息 | 不使用巴厘宫殿的仪式意象或高饱和热带装饰；Sambisari 应突出考古发掘与中爪哇石构 |

## 需要进一步核实

- 官方或可信公共资料中的历史、开馆时间、费用、评分和具体设施状态。
- 可合法使用的真实照片及其来源标识。
- 从日惹机场与市区抵达的实用途径；页面仅描述交通类型与以实时信息为准的提示。

## 地图链接核验

用户给定的 Google Maps 短链接已解析至 **Sambisari Temple / Candi Sambisari**，坐标显示为 **-7.7625591, 110.4469551**，地址与材料中的 Purwomartani、Kalasan、Kabupaten Sleman、Daerah Istimewa Yogyakarta 55571 一致。页面公开信息在访问时显示评分 **4.6/5（8,142 条）** 与“营业中、16:00 关闭”。

> 评分、评论数量、开放状态和费用具有变动性：页面会标注其为来自 Google Maps 的访问时快照，并提示出行前复核。不得把单条用户评价中的费用作为稳定事实。

## 已核验的内容事实与叙事边界

| 主题 | 可使用的事实 | 主要公开来源 |
|---|---|---|
| 地点 | 位于 Purwomartani、Kalasan、Kabupaten Sleman、DI Yogyakarta；距日惹市中心约 15 km 向东北 | Sleman Tourism |
| 历史 | 1966 年由当地农民在耕作中偶然发现；随后经历多年发掘与修复，1987 年完成修复 | Purwomartani Village、Jogja Cagar、Sleman Tourism |
| 年代与宗教 | 出土金片上的古爪哇文支持约 9 世纪的年代判断，场所具有湿婆教（Siwaistis）背景；具体建造年份学术上仍有不同解释 | Purwomartani Village、Jogja Cagar |
| 空间 | 一座面向西方的主殿、三座附属祠；石材主要为安山岩；遗址下沉约 6.5 m | Purwomartani Village、Jogja Cagar |
| 建筑细节 | 主殿内有 Lingga 与 Yoni；外壁龛位涉及 Durga、Ganesha、Agastya；访客应仅在开放步道和允许范围内观察 | Purwomartani Village、Jogja Cagar |

## 页面采用的措辞规则

- 以“约 9 世纪”“常被解释为”“公开资料显示”替代无充分一致来源的精确归因。
- 明确将日常营业、票价、停车、无障碍与本地交通描述为“出行前核对”，不把易变信息表述为保证。
- 页面在“来源与延伸阅读”中链接 Purwomartani Village、Jogja Cagar、Sleman Tourism、Indonesia.travel 与 Google Maps；不引用或推广具体商户。

## 真实照片的使用记录

| 图片用途 | 来源页面 | 作者 | 许可 |
|---|---|---|---|
| 首屏实景 | Wikimedia Commons: Candi Sambisari main temple 2013-11-28 01 | Crisco 1492 | CC BY-SA 3.0 Unported |
| 遗址鸟瞰/空间图 | Wikimedia Commons: Candi Sambisari, Hindu Temple of Java Indonesia 2013 b | TeshTesh | CC BY-SA 3.0 Unported |

页面将在图片附近和“图片与许可”处保留作者、CC BY-SA 3.0 与来源页链接，并明确生成的档案纹理/图形只作为视觉辅助、并不替代遗址实拍。
