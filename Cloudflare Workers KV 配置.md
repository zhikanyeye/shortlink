# Cloudflare Workers KV 配置指南

## 1. 创建 KV 数据库

### 1.1 通过 Wrangler CLI 创建

```bash
# 安装 Wrangler CLI（如果还没安装）
npm install -g wrangler

# 登录到 Cloudflare
wrangler login

# 创建名为 "URL_DB" 的 KV 数据库
wrangler kv:namespace create "URL_DB"
```

执行后会看到类似输出：
```
🌀 Creating namespace with title "shortlink-URL_DB"
✨ Success!
Add the following to your wrangler.toml:
kv_namespaces = [
  { binding = "URL_DB", id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }
]
```

### 1.2 为生产环境创建独立的 KV 数据库
```bash
wrangler kv:namespace create "URL_DB" --env production
```

## 2. 配置 wrangler.toml

### 2.1 基础配置

```toml
name = "shortlink"
main = "src/index.js"
compatibility_date = "2025-03-01"

# 开发环境 KV 配置
kv_namespaces = [
  { binding = "URL_DB", id = "第一次创建时返回的ID" }
]

# 生产环境 KV 配置
[env.production]
kv_namespaces = [
  { binding = "URL_DB", id = "生产环境创建时返回的ID" }
]
```

### 2.2 环境变量说明

代码中使用的环境变量：
```javascript
env.URL_DB  // KV 数据库的绑定名称，必须与 wrangler.toml 中的 binding 一致
```

## 3. KV 数据结构

代码使用的 KV 存储结构：
```javascript
{
  // Key: 自定义短链接路径（例如: 'mylink'）
  // Value: 
  {
    "url": "原始URL",
    "expires": "过期时间戳（可选）",
    "createdAt": "创建时间戳",
    "createdBy": "创建者IP",
    "lastAccessed": "最后访问时间",
    "accessCount": "访问次数"
  }
}
```

## 4. 部署和验证

### 4.1 部署到开发环境
```bash
wrangler publish
```

### 4.2 部署到生产环境
```bash
wrangler publish --env production
```

### 4.3 验证 KV 设置
```bash
# 检查 KV 命名空间是否创建成功
wrangler kv:namespace list

# 测试 KV 读写
curl -X POST https://你的域名/create \
  -H "Content-Type: application/json" \
  -d '{
    "originalUrl": "https://example.com",
    "customPath": "test123",
    "expiration": "604800"
  }'
```

## 5. 常见问题解决

### 5.1 找不到 KV 绑定
错误信息：`KV binding "URL_DB" not found`

解决方法：
1. 检查 wrangler.toml 中的配置：
```toml
kv_namespaces = [
  { binding = "URL_DB", id = "你的KV命名空间ID" }
]
```
2. 确保 KV 命名空间已创建：
```bash
wrangler kv:namespace list
```

### 5.2 KV 操作失败
错误信息：`Failed to execute KV operation`

解决方法：
1. 确认 Wrangler 已登录：
```bash
wrangler login
```
2. 验证 KV 权限：
```bash
wrangler kv:key list --namespace-id="你的KV命名空间ID"
```

## 6. 重要说明

1. **命名规范**：
   - KV 绑定名称必须为 `URL_DB`
   - 此名称在代码中被硬编码使用

2. **数据限制**：
   - 单个 KV 条目最大 25MB
   - 每秒最多 1000 次读取操作
   - 每秒最多 100 次写入操作

3. **环境隔离**：
   - 开发环境和生产环境使用不同的 KV 命名空间
   - 确保数据互不干扰

4. **数据备份**：
建议定期备份 KV 数据：
```bash
# 导出 KV 数据
wrangler kv:bulk export --namespace-id="你的KV命名空间ID" backup.json

# 必要时导入数据
wrangler kv:bulk put --namespace-id="你的KV命名空间ID" backup.json
```
