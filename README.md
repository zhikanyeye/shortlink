# ShortLink 短链接服务 | URL Shortener Service

<div align="center">

[English](./README.md) | [简体中文](./README.zh-CN.md)

一个优雅的短链接服务，基于 JavaScript 构建，可一键部署至 Cloudflare Workers。

An elegant URL shortening service built with JavaScript, ready for one-click deployment to Cloudflare Workers.

</div>

## ✨ 特性 | Features

- 🚀 轻量级实现，性能优异
- 🔐 安全可靠的链接重定向
- ⚡ 支持 Cloudflare Workers 一键部署
- 🌍 全球 CDN 加速
- 🎯 简单易用的 API 接口
- 📊 基础访问统计功能

## 🚀 快速开始 | Quick Start

### 一键部署 | One-Click Deploy

1. 点击下方按钮一键部署到 Cloudflare Workers：

   [![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/zhikanyeye/shortlink)

2. 登录你的 Cloudflare 账户（如果还没有，请先注册）

3. 选择要部署的域名和子域名

4. 等待部署完成即可使用

### 手动部署 | Manual Deployment

1. 克隆仓库：

```bash
git clone https://github.com/zhikanyeye/shortlink.git
cd shortlink
```

2. 安装依赖：

```bash
npm install
```

3. 配置 Cloudflare：

```bash
npm install -g wrangler
wrangler login
```

4. 修改 `wrangler.toml` 配置：

```toml
name = "shortlink"
type = "javascript"
account_id = "your_account_id"
workers_dev = true
```
5. 部署 KV 存储：
   按照[KV绑定](./Cloudflare Workers KV 数据库配置.md)里的方法部署KV数据库，否则无法存储数据

6. 部署到 Cloudflare Workers：

```bash
wrangler publish
```

## 🔨 使用方法 | Usage

### 创建短链接 | Create Short URL

```bash
curl -X POST https://your-worker.your-subdomain.workers.dev/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/very-long-url"}'
```

响应 | Response:
```json
{
  "shortUrl": "https://your-worker.your-subdomain.workers.dev/abc123",
  "originalUrl": "https://example.com/very-long-url"
}
```

### 访问短链接 | Access Short URL

直接在浏览器中访问生成的短链接，将自动重定向到原始 URL。

Simply visit the generated short URL in your browser, and you will be automatically redirected to the original URL.

## ⚙️ 配置选项 | Configuration Options

在 `wrangler.toml` 中可以配置以下选项：

The following options can be configured in `wrangler.toml`:

```toml
[vars]
URL_LENGTH = "6"        # 短链接长度 | Short URL length
ALLOW_LISTED_HOSTS = "" # 允许的域名列表（可选）| Allowed domains (optional)
```

## 📦 API 文档 | API Documentation

### 创建短链接 | Create Short URL

- **Endpoint**: `/api/shorten`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "url": "https://example.com/your-long-url"
  }
  ```
- **Response**:
  ```json
  {
    "shortUrl": "https://your-domain.com/abc123",
    "originalUrl": "https://example.com/your-long-url"
  }
  ```

### 获取短链接信息 | Get Short URL Info

- **Endpoint**: `/api/info/:shortId`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "shortId": "abc123",
    "originalUrl": "https://example.com/your-long-url",
    "created": "2025-03-01T08:13:59Z",
    "visits": 42
  }
  ```

## 🤝 贡献指南 | Contributing

欢迎提交 Pull Request 或创建 Issue！

Contributions are welcome! Feel free to submit a Pull Request or create an Issue.

## 📄 开源许可 | License

本项目采用 MIT 许可证，详见 [LICENSE](./LICENSE) 文件。

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
