# 📎 青云量子短链

> 基于 Cloudflare Workers 的现代化短链接生成器  
> 具有优雅的渐变 UI 设计、完善的移动端适配和强大的安全特性

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/zhikanyeye/shortlink)
[![GitHub stars](https://img.shields.io/github/stars/zhikanyeye/shortlink?style=social)](https://github.com/zhikanyeye/shortlink)
[![GitHub forks](https://img.shields.io/github/forks/zhikanyeye/shortlink?style=social)](https://github.com/zhikanyeye/shortlink)

## ✨ 项目特色

### 🎨 现代化 UI 设计
- **渐变配色方案**: 蓝紫粉科技感渐变，告别单调界面
- **玻璃态效果**: 毛玻璃背景，半透明卡片设计
- **动态背景**: 浮动渐变球 + 网格背景动画
- **流畅动画**: CSS3 动画，丝滑的交互体验
- **卡片式布局**: 24px 圆角，层次分明的视觉效果

### 📱 移动端完美适配
- **响应式设计**: 适配手机、平板、桌面等所有设备
- **触摸优化**: 44px+ 按钮大小，符合人体工程学
- **防缩放处理**: iOS 设备输入框 16px 字体防止页面缩放
- **手势友好**: 触摸设备专用交互优化
- **PWA 支持**: 可添加到主屏幕，原生应用体验

### 🚀 强大的功能特性
- **极速响应**: 基于 Cloudflare 全球 CDN 网络
- **自定义后缀**: 3-20 位字母数字组合，易记易分享
- **灵活过期**: 7天/30天/90天/180天/永久，满足不同需求
- **实时验证**: URL 可访问性检查，避免无效链接
- **访问统计**: 记录访问次数、时间等详细数据
- **批量管理**: 支持定时清理过期链接

### 🔒 安全可靠保障
- **速率限制**: 每 IP 每小时限制 100 次请求
- **输入验证**: 严格的 URL 格式和后缀格式验证
- **安全响应头**: CSP、XSS 防护等安全策略
- **数据加密**: KV 存储数据结构化保存
- **错误处理**: 完善的异常捕获和用户提示

### ♿ 无障碍访问支持
- **高对比度**: 适应系统高对比度模式
- **减少动画**: 尊重用户的动画偏好设置
- **键盘导航**: 完整的键盘操作支持
- **屏幕阅读器**: 语义化 HTML，支持辅助技术

## 🚀 一键部署指南

### 方式一：Cloudflare Dashboard 一键部署 ⭐ 推荐

1. **点击一键部署按钮**  
   [![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/zhikanyeye/shortlink)

2. **登录 Cloudflare 账号**  
   如果没有账号，需要先注册：[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)

3. **授权 GitHub 仓库**  
   允许 Cloudflare 访问你的 GitHub 仓库

4. **配置项目设置**
   ```
   Worker 名称: shortlink-你的名字 (例如: shortlink-zhikanyeye)
   ```

5. **创建 KV 数据库**  
   在部署完成后，进入 Cloudflare Dashboard：
   - 进入 "Workers & Pages" → 你的项目
   - 点击 "Settings" → "Variables"
   - 在 "KV Namespace Bindings" 中添加：
     - Variable name: `URL_DB`
     - KV namespace: 点击 "Create" 创建新的命名空间

6. **完成部署**  
   访问分配的 `https://shortlink-你的名字.你的子域.workers.dev` 即可使用！

### 方式二：Wrangler CLI 部署

适合开发者或需要自定义配置的用户

#### 环境要求
- Node.js 16+ 
- npm 或 yarn

#### 部署步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/zhikanyeye/shortlink.git
   cd shortlink
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或
   yarn install
   ```

3. **安装 Wrangler CLI**
   ```bash
   npm install -g wrangler
   # 或
   yarn global add wrangler
   ```

4. **登录 Cloudflare**
   ```bash
   wrangler login
   ```

5. **创建 KV 命名空间**
   ```bash
   # 创建生产环境数据库
   wrangler kv:namespace create URL_DB
   
   # 创建预览环境数据库
   wrangler kv:namespace create URL_DB --preview
   ```
   
   命令会返回类似输出：
   ```
   🌀 Creating namespace with title "shortlink-URL_DB"
   ✨ Success!
   Add the following to your configuration file in your kv_namespaces array:
   { binding = "URL_DB", id = "1234567890abcdef1234567890abcdef" }
   ```

6. **更新配置文件**
   
   将返回的 ID 更新到 `wrangler.toml`：
   ```toml
   [[kv_namespaces]]
   binding = "URL_DB"
   id = "你的实际命名空间ID"
   preview_id = "你的预览命名空间ID"
   ```

7. **本地测试** (可选)
   ```bash
   npm run dev
   # 在浏览器访问 http://localhost:8787
   ```

8. **部署到生产环境**
   ```bash
   npm run deploy
   ```

9. **配置自定义域名** (可选)
   
   在 `wrangler.toml` 中添加：
   ```toml
   [[routes]]
   pattern = "short.yourdomain.com/*"
   zone_name = "yourdomain.com"
   ```

### 方式三：GitHub Actions 自动部署

适合团队协作或需要 CI/CD 的场景

1. **Fork 本仓库到你的 GitHub 账号**

2. **配置 GitHub Secrets**
   
   在你的仓库中添加以下 Secrets：
   - `CLOUDFLARE_API_TOKEN`: Cloudflare API Token
   - `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Account ID

3. **创建 KV 命名空间**
   
   在本地或 Cloudflare Dashboard 中创建 KV 命名空间

4. **推送代码触发部署**
   ```bash
   git push origin main
   ```

## 📁 项目结构

```
shortlink/
├── worker.js              # 🎯 核心 Worker 代码（包含 HTML、CSS、JS）
├── wrangler.toml          # ⚙️ Cloudflare Workers 配置
├── package.json           # 📦 项目依赖和脚本
├── .github/workflows/     # 🔄 GitHub Actions 工作流
│   └── deploy.yml         # 🚀 自动部署配置
├── .gitignore            # 🚫 Git 忽略文件
└── README.md             # 📖 项目文档
```

## 🔧 详细配置说明

### KV 数据库结构

短链接数据存储格式：
```json
{
  "url": "https://example.com",              // 原始 URL
  "expires": 1640995200000,                  // 过期时间戳（毫秒）
  "createdAt": 1640908800000,               // 创建时间戳
  "createdBy": "192.168.1.1",              // 创建者 IP
  "lastAccessed": 1640995000000,            // 最后访问时间
  "accessCount": 42                         // 访问次数
}
```

### 有效期配置

| 选项 | 时长 | 适用场景 |
|------|------|----------|
| 7天 | 604800秒 | 临时分享、活动链接 |
| 30天 | 2592000秒 | 短期项目、月度链接 |
| 90天 | 7776000秒 | 季度链接、中期项目 |
| 180天 | 15552000秒 | 半年期链接 |
| 永久 | 无限制 | 长期使用、重要链接 |

### 安全机制详解

#### 速率限制
- **限制规则**: 每 IP 每小时 100 次请求
- **存储方式**: KV 数据库，键名格式 `ratelimit:IP地址`
- **超限处理**: 返回 429 状态码，建议 1 小时后重试

#### URL 验证
- **格式检查**: 必须包含 `http://` 或 `https://`
- **可访问性**: 发送 HEAD 请求验证目标 URL
- **超时设置**: 5 秒超时，防止长时间等待

#### 输入验证
- **自定义后缀**: 3-20 位，只允许字母、数字、下划线、连字符
- **重复检查**: 确保后缀唯一性
- **恶意内容**: 基本的 XSS 防护

## 🌐 API 接口文档

### 创建短链接

**请求**
```http
POST /create
Content-Type: application/json

{
  "originalUrl": "https://example.com/very/long/url/path",
  "customPath": "mylink",
  "expiration": "604800"
}
```

**响应**
```json
{
  "shortUrl": "https://short.domain.com/mylink"
}
```

**错误响应**
```json
{
  "error": "后缀已被占用"
}
```

### 访问短链接

**请求**
```http
GET /mylink
```

**响应**
```http
HTTP/1.1 302 Found
Location: https://example.com/very/long/url/path
```

### 获取链接统计

**请求**
```http
GET /stats/mylink
```

**响应**
```json
{
  "shortUrl": "https://short.domain.com/mylink",
  "createdAt": "2025-01-27T00:00:00.000Z",
  "expiresAt": "2025-02-03T00:00:00.000Z",
  "isExpired": false,
  "lastAccessed": "2025-01-27T12:00:00.000Z",
  "accessCount": 42
}
```

### 健康检查

**请求**
```http
GET /health
```

**响应**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-27T00:00:00.000Z",
  "version": "2.1.0"
}
```

### API 文档

**请求**
```http
GET /api/docs
```

**响应**: 返回完整的 API 接口文档 JSON

## 🎯 使用场景

### 个人用户
- **社交媒体分享**: 美化长链接，提升分享体验
- **二维码生成**: 短链接便于生成简洁的二维码
- **统计分析**: 了解链接访问情况

### 企业用户
- **营销活动**: 追踪活动链接的点击效果
- **内部工具**: 简化内部系统长链接
- **客户服务**: 提供易记的产品链接

### 开发者
- **API 服务**: 集成到其他应用中
- **批量处理**: 使用脚本批量生成短链接
- **自定义域名**: 使用自己的域名提供服务

## 🛠️ 开发命令

```bash
# 🚀 项目开发
npm run dev              # 本地开发服务器
npm run deploy           # 部署到生产环境
npm run deploy:staging   # 部署到测试环境

# 📊 日志查看
npm run tail             # 实时查看 Worker 日志
npm run tail:staging     # 查看测试环境日志

# 🗄️ KV 数据库操作
npm run kv:list          # 列出所有短链接
npm run kv:get mylink    # 获取指定短链接信息
npm run kv:delete mylink # 删除指定短链接
npm run kv:create        # 创建新的 KV 命名空间
```

## 🔄 更新日志

### v2.1.0 (2025-01-27)
- 🔐 使用加密安全的随机路径生成（crypto API）
- 🛡️ 新增恶意URL检测机制
- 📊 实现访问统计自动更新
- 🏥 添加健康检查端点 `/health`
- 📖 添加API文档端点 `/api/docs`
- 📈 新增短链接统计查询 `/stats/{path}`
- 🤖 添加 robots.txt 支持
- 📅 版权年份自动更新

### v2.0.0 (2024-05-24)
- 🎨 全新 UI 设计，现代化渐变风格
- 📱 完全重写移动端适配
- ⚡ 添加实时表单验证
- 🔒 增强安全机制
- ♿ 新增无障碍访问支持
- 🚀 支持一键部署

### v1.0.0 (Initial Release)
- 🎯 基础短链接生成功能
- 📊 访问统计
- ⏰ 过期时间设置
- 🔐 基础安全验证

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 报告问题
- 使用 [GitHub Issues](https://github.com/zhikanyeye/shortlink/issues) 报告 bug
- 提供详细的复现步骤和环境信息

### 功能建议
- 在 Issues 中标记 `enhancement` 标签
- 详细描述功能需求和使用场景

### 代码贡献
1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Cloudflare Workers](https://workers.cloudflare.com/) - 提供强大的边缘计算平台
- [Inter Font](https://rsms.me/inter/) - 优秀的开源字体
- [GitHub](https://github.com/) - 代码托管平台
- 所有贡献者和用户的支持 💖

## 📞 联系方式

- **作者**: zhikanyeye
- **GitHub**: [@zhikanyeye](https://github.com/zhikanyeye)
- **项目地址**: [https://github.com/zhikanyeye/shortlink](https://github.com/zhikanyeye/shortlink)
- **问题反馈**: [GitHub Issues](https://github.com/zhikanyeye/shortlink/issues)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！⭐**

Made with ❤️ by [zhikanyeye](https://github.com/zhikanyeye)

</div>
