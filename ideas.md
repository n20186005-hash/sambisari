# Sambisari Temple — 设计构思

## 三个风格方向

### 方向一：地下遗址档案室
**Very Brief Intro：** 用考古测绘、岩层剖面与修复笔记建立克制而有深度的遗址阅读体验。页面让访客像翻阅一份开放的现场档案。  
**Probability：** 0.07

### 方向二：日惹晨雾庭园
**Very Brief Intro：** 以清晨、草地与火山石的安静对比为线索，强调遗址从田野中浮现的诗意。整体更偏感性、低饱和的旅行叙事。  
**Probability：** 0.04

### 方向三：石构几何志
**Very Brief Intro：** 用中爪哇寺庙的轴线、浮雕与比例感组织信息，呈现紧凑、理性的文化导览。视觉更偏抽象、平面与信息图式。  
**Probability：** 0.09

## 已选方向：地下遗址档案室

### Design Movement

**新地方主义（Critical Regionalism）与考古档案编辑设计**。借火山石、纸本地籍档案和考古发掘的测绘秩序，避免将古迹包装成泛化的“异域度假地”。

### Core Principles

1. **由下而上：** 以 Sambisari 的下沉地形为页面叙事主轴，信息从地表、发掘层到石构核心逐步推进。
2. **证据可读：** 事实卡、出处与“以现场/官方信息为准”提示保持可见，文案不作夸张承诺。
3. **石与纸并置：** 深色安山岩、旧纸、灰绿草地构成场地感；避免亮面科技感和旅游模板的商业装饰。
4. **低干扰的当代感：** 以清晰层级、短促动画和优先可访问性的互动，让内容承载体验。

### Color Philosophy

底色为温暖的 **Arsip Pualam（档案羊皮纸）**，让长篇科普易读；文字取近黑色的火山石；苔绿只用于提示地貌与行动入口；锈红用于编号与时间层，像考古标签而非促销色。核心颜色是 **Tuf Volcanic（火山凝灰石灰绿） #687460**，用于全站独有的识别点。

### Layout Paradigm

不使用常规的居中卡片矩阵。首屏采用左右不对称的“**切面 + 现场照片**”构图；下方的内容沿一条偏左的纵向发掘线排列，模块像出土标签、测绘纸条与石材注释从这条线旁生长。移动端将发掘线转为页面边缘的细线。

### Signature Elements

1. 带层位刻度的纵向“发掘线”与段落编号。
2. 可重复使用的浅色网格纸纹与测绘十字标。
3. 以 Sambisari 主殿轮廓提炼的几何石门符号，既作 logo，也派生 favicon。

### Interaction Philosophy

交互服务于“查证与定向”：语言切换应即时、保留滚动位置；FAQ 用原生可访问的展开方式；导航平滑定位到对应的考古层。按钮的反馈像翻动档案标签，简洁而明确。

### Animation

在 `prefers-reduced-motion` 之外，首屏标题与信息条以 180–260ms 的轻微上移淡入呈现；滚动段落仅淡入一次；图片悬停以 180ms 轻推和遮罩信息显现。动画仅使用 opacity 与 transform，并统一采用 `cubic-bezier(0.23, 1, 0.32, 1)`。

### Typography System

标题使用 **DM Serif Display**（印尼语与英语均具良好可读性），正文使用 **Manrope**；编号与数据使用 **IBM Plex Mono**。标题采用大字号、紧凑行高；正文维持较舒展的行距；避免使用 Inter。

### Brand Essence

**Sambisari Temple Guide 是面向好奇旅人的非营利现场阅读指南，用可核查的地理与历史信息解释一座从地下重见天日的中爪哇寺庙。**  
人格：**沉静、考据、在地**。

### Brand Voice

标题、CTA 与微文案采用简洁的观察语气，不用商业促销口吻。示例：

> “Read the temple from the ground up.”

> “Plan the route, then leave room to look.”

### Wordmark & Logo

图形为以负形切出的 Sambisari 主殿门洞，外框是地层般的三段拱线；图形右侧以大写小字距的 “SAMBISARI / FIELD GUIDE” 组成文字标。favicon 仅保留门洞与一条地层弧线，使用同一灰绿与石黑配色。

### Signature Brand Color

**Tuf Volcanic — #687460**

