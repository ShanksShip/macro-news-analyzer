# MacroInsight - 宏观新闻分析工具

MacroInsight 是一款专业的宏观经济新闻分析工具，利用人工智能对金融和经济新闻进行深度分析，评估其对不同资产类别的潜在市场影响。该工具为投资者、分析师和金融专业人士提供了结构化的多维度分析，帮助做出更明智的投资决策。

## 项目概述

该项目使用 TypeScript、Next.js 和 Tailwind CSS 重新实现了原 Python 版本的 MacroInsight。新版本可直接部署到 Vercel，并通过浏览器端直接发送 API 请求，无需服务端接口。

## 核心功能

### 1. 多维度影响分析
- **影响时长评估**：区分长期（数月至数年）、中期（数周至数月）和短期（数小时至数天）影响，基于经济理论和历史先例提供支持
- **影响方向与范围**：评估对股票、债券、商品、外汇和加密货币市场的影响方向（利好/利空/中性）
- **影响力度分析**：预测市场波动幅度，与历史相似事件对比，识别敏感因素和超预期情景
- **影响消退指标**：提供关键监测指标、建议监测时间窗口和潜在二次效应分析

### 2. 资产类别细分分析
- **股票市场**：细分行业影响差异
- **债券市场**：收益率曲线变化评估
- **商品市场**：能源、贵金属、农产品等不同商品类别分析
- **外汇市场**：主要货币对影响评估
- **加密货币市场**：主要加密货币影响分析
- **跨市场传导效应**：评估市场间的相互影响

### 3. 可视化与报告
- **影响力度雷达图**：直观展示不同资产类别的影响程度
- **结构化展示**：条件格式化的资产类别影响表格
- **详细分析报告**：可导出完整的 Markdown 格式分析报告

### 4. 自定义 AI 模型
- **支持多种模型**：预设 DeepSeek 模型，可自定义添加其他模型
- **API 接口配置**：可自定义设置不同模型的 API 接口与密钥
- **灵活切换**：在分析过程中可快速切换不同的 AI 模型

## 技术栈

- **前端框架**：Next.js 14（React 18）
- **状态管理**：Zustand
- **UI 框架**：Tailwind CSS + Shadcn UI 组件库
- **图表可视化**：Recharts
- **AI 集成**：支持 DeepSeek、OpenAI 等 API
- **类型系统**：TypeScript

## 安装与使用

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发环境运行

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

### 部署到 Vercel

本项目可以直接部署到 Vercel 平台：

1. Fork 或克隆本仓库
2. 在 Vercel 上导入项目
3. 部署完成后，可直接访问您的 Vercel 域名使用应用

## 使用指南

### 基本使用流程

1. 首次使用时，点击右上角设置按钮，配置 API 密钥
2. 在主页的文本框内粘贴宏观经济/金融新闻内容
3. 选择是否需要详细分析和图表展示
4. 点击"分析新闻"按钮
5. 查看生成的多维度分析结果
6. 可选择下载完整分析报告（Markdown 格式）

### 自定义 AI 模型

1. 点击右上角设置按钮
2. 在"添加新模型"部分填写：
   - 模型名称
   - API 端点 URL
   - API 密钥（可选）
3. 点击"添加模型"按钮
4. 在模型列表中选择要使用的模型

## 项目结构

```
/
├── src/                 # 源代码目录
│   ├── app/             # Next.js 应用页面
│   ├── components/      # UI 组件
│   │   ├── ui/          # 基础 UI 组件
│   │   └── ...          # 业务组件
│   ├── lib/             # 工具函数
│   ├── store/           # 状态管理
│   └── types/           # TypeScript 类型定义
├── public/              # 静态资源
├── next.config.mjs      # Next.js 配置
├── package.json         # 项目依赖
├── tailwind.config.js   # Tailwind 配置
└── tsconfig.json        # TypeScript 配置
```

## 开发扩展

### 添加新的分析维度

如需添加新的分析维度，您需要：

1. 在 `types/news-analysis.ts` 中扩展 `NewsAnalysisResponse` 类型
2. 在 `lib/analyze-news.ts` 的提示词模板中添加新的分析要求
3. 在 `components/analysis-results.tsx` 中添加新的结果展示组件
4. 在 `lib/generate-report.ts` 中更新报告生成逻辑

### 支持新的模型提供商

如需支持新的 AI 模型提供商，您可以：

1. 在设置对话框中直接添加新模型，或
2. 在 `store/news-store.ts` 中修改 `DEFAULT_MODELS` 数组

## 贡献与反馈

欢迎通过 Issues 和 Pull Requests 参与项目改进。

## 许可证

MIT License

## 免责声明

本工具仅供参考，不构成投资建议。使用本工具进行的任何投资决策风险由用户自行承担。

