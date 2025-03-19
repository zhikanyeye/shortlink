const HTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📎青云量子短链</title>
    <style>
        :root {
            --neon-blue: #4d7cff;
            --neon-purple: #9d4dff;
            --cyber-black: #0a0a12;
            --cyber-gray: #1a1a2a;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', system-ui, sans-serif;
        }

        body {
            background: var(--cyber-black);
            color: white;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            background-image: 
                radial-gradient(var(--neon-purple) 1px, transparent 0),
                radial-gradient(var(--neon-blue) 1px, transparent 0);
            background-size: 50px 50px;
            background-position: 0 0, 25px 25px;
        }

        .cyber-container {
            border: 2px solid var(--neon-blue);
            border-radius: 12px;
            padding: 2rem;
            width: 100%;
            max-width: 800px;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 30px rgba(77, 124, 255, 0.2);
            position: relative;
            overflow: hidden;
        }

        .cyber-container::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                45deg,
                transparent 48%,
                var(--neon-blue) 50%,
                transparent 52%
            );
            animation: scan 4s linear infinite;
            opacity: 0.1;
        }

        @keyframes scan {
            0% { transform: translate(0,0) rotate(0deg); }
            100% { transform: translate(-25%,-25%) rotate(360deg); }
        }

        h1 {
            text-align: center;
            margin-bottom: 2rem;
            font-size: 2.5rem;
            background: linear-gradient(45deg, var(--neon-blue), var(--neon-purple));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 20px rgba(77, 124, 255, 0.4);
        }

        .input-group {
            margin-bottom: 1.5rem;
            position: relative;
        }

        input, select {
            width: 100%;
            padding: 1rem;
            background: var(--cyber-gray);
            border: 1px solid var(--neon-blue);
            color: white;
            border-radius: 6px;
            transition: all 0.3s ease;
        }

        input:focus, select:focus {
            outline: none;
            border-color: var(--neon-purple);
            box-shadow: 0 0 15px rgba(157, 77, 255, 0.3);
        }

        button {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(45deg, var(--neon-blue), var(--neon-purple));
            border: none;
            color: white;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: transform 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        button:hover {
            transform: translateY(-2px);
        }

        button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
        }

        button::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                45deg,
                transparent 48%,
                rgba(255,255,255,0.1) 50%,
                transparent 52%
            );
            animation: scan 3s linear infinite;
        }

        .result {
            margin-top: 1.5rem;
            padding: 1rem;
            background: var(--cyber-gray);
            border-radius: 6px;
            text-align: center;
            display: none;
            word-break: break-all;
        }

        .result.active {
            display: block;
            animation: appear 0.5s ease;
        }

        @keyframes appear {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .error-message {
            color: #ff4d4d;
            margin-top: 0.5rem;
            font-size: 0.9rem;
            display: none;
        }

        .error-message.show {
            display: block;
            animation: appear 0.3s ease;
        }

        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
            margin-left: 10px;
            vertical-align: middle;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .result a {
            color: var(--neon-blue);
            text-decoration: none;
            position: relative;
            display: inline-block;
            margin: 10px 0;
            padding: 5px 10px;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .result a:hover {
            text-decoration: underline;
            transform: translateY(-2px);
        }

        .copy-button {
            display: inline-block;
            margin-top: 10px;
            padding: 5px 15px;
            background: var(--neon-blue);
            border: none;
            border-radius: 4px;
            color: white;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            width: auto;
        }

        .copy-button:hover {
            background: var(--neon-purple);
        }

        #loading-indicator {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            padding: 20px;
            border-radius: 10px;
            display: none;
            z-index: 1000;
        }
    </style>
</head>
<body>
    <div id="loading-indicator">处理中...</div>
    <div class="cyber-container">
        <h1>📎 青云量子短链</h1>
        
        <div class="input-group">
            <input type="url" id="originalUrl" 
                   placeholder="输入你的长链接 (必须包含 http:// 或 https://)" 
                   required>
            <div class="error-message" id="urlError"></div>
        </div>

        <div class="input-group">
            <input type="text" id="customPath" 
                   placeholder="自定义后缀 (例如: mylink)"
                   pattern="[A-Za-z0-9_-]{3,20}" 
                   title="3-20位字母/数字/下划线/连字符">
            <div class="error-message" id="pathError"></div>
        </div>

        <div class="input-group">
            <select id="expiration">
                <option value="604800">7天有效期</option>
                <option value="2592000">30天有效期</option>
                <option value="7776000">90天有效期</option>
                <option value="15552000">180天有效期</option>
                <option value="0">永久有效</option>
            </select>
        </div>

        <button id="generateBtn" type="button">生成量子链接</button>

        <div class="result" id="result">
            <p>你的短链接已生成：</p>
            <a id="shortLink" target="_blank"></a>
            <br>
            <button class="copy-button" type="button" onclick="copyToClipboard()">复制链接</button>
        </div>
    </div>

    <script>
        async function copyToClipboard() {
            const link = document.getElementById('shortLink').href;
            try {
                await navigator.clipboard.writeText(link);
                const copyBtn = document.querySelector('.copy-button');
                copyBtn.textContent = '已复制！';
                setTimeout(() => {
                    copyBtn.textContent = '复制链接';
                }, 2000);
            } catch (err) {
                console.error('复制失败:', err);
                alert('复制失败，请手动复制');
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            const generateBtn = document.getElementById('generateBtn');
            const urlError = document.getElementById('urlError');
            const pathError = document.getElementById('pathError');
            const loadingIndicator = document.getElementById('loading-indicator');

            function validateInput(input, errorElement, message) {
                if (!input.value) {
                    errorElement.textContent = message;
                    errorElement.classList.add('show');
                    return false;
                }
                errorElement.classList.remove('show');
                return true;
            }

            function isValidUrl(url) {
                try {
                    new URL(url);
                    return true;
                } catch {
                    return false;
                }
            }

            function isValidPath(path) {
                return /^[A-Za-z0-9_-]{3,20}$/.test(path);
            }

            function showLoading() {
                loadingIndicator.style.display = 'block';
                generateBtn.disabled = true;
            }

            function hideLoading() {
                loadingIndicator.style.display = 'none';
                generateBtn.disabled = false;
            }

            generateBtn.addEventListener('click', async function() {
                const originalUrl = document.getElementById('originalUrl').value;
                const customPath = document.getElementById('customPath').value;
                const expiration = document.getElementById('expiration').value;

                urlError.classList.remove('show');
                pathError.classList.remove('show');
                document.getElementById('result').classList.remove('active');

                // 验证表单
                if (!validateInput(document.getElementById('originalUrl'), urlError, '请输入原始链接')) {
                    return;
                }
                if (!isValidUrl(originalUrl)) {
                    urlError.textContent = '请输入有效的URL（必须包含 http:// 或 https://）';
                    urlError.classList.add('show');
                    return;
                }

                if (!validateInput(document.getElementById('customPath'), pathError, '请输入自定义后缀')) {
                    return;
                }
                if (!isValidPath(customPath)) {
                    pathError.textContent = '后缀只能包含3-20位字母、数字、下划线或连字符';
                    pathError.classList.add('show');
                    return;
                }

                showLoading();

                try {
                    const requestData = {
                        originalUrl,
                        customPath,
                        expiration
                    };

                    const response = await fetch('/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestData)
                    });
                    
                    const data = await response.json();
                    
                    if (response.ok) {
                        const shortLink = document.getElementById('shortLink');
                        shortLink.href = data.shortUrl;
                        shortLink.textContent = data.shortUrl;
                        document.getElementById('result').classList.add('active');
                        
                        document.getElementById('originalUrl').value = '';
                        document.getElementById('customPath').value = '';
                    } else {
                        if (data.error === '后缀已被占用') {
                            pathError.textContent = data.error;
                            pathError.classList.add('show');
                        } else {
                            alert(data.error || '生成短链接失败');
                        }
                    }
                } catch (error) {
                    console.error('请求失败:', error);
                    alert('网络请求失败，请稍后重试');
                } finally {
                    hideLoading();
                }
            });
        });
    </script>
</body>
</html>
`;

// 有效期选项配置
const expirationOptions = {
    '604800': 7 * 24 * 3600,
    '2592000': 30 * 24 * 3600,
    '7776000': 90 * 24 * 3600,
    '15552000': 180 * 24 * 3600,
    '0': null
};

// 安全响应头配置
const securityHeaders = {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
};

// 缓存控制配置
const cacheControl = {
    'static': 'public, max-age=86400',
    'redirect': 'public, max-age=3600',
    'api': 'no-store'
};

// 添加响应头函数
function addResponseHeaders(headers = {}, type = 'api') {
    return {
        ...headers,
        ...securityHeaders,
        'Cache-Control': cacheControl[type]
    };
}

// URL有效性检查函数
async function isValidTargetUrl(url) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(url, {
            method: 'HEAD',
            headers: { 'User-Agent': 'QingYun-URL-Validator-Bot' },
            redirect: 'follow',
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        return response.ok;
    } catch (error) {
        console.error('URL validation error:', error.name);
        return false;
    }
}

// 速率限制检查函数
async function checkRateLimit(ip, env) {
    const key = `ratelimit:${ip}`;
    const limit = 100;
    const window = 3600;

    let counter = await env.URL_DB.get(key);
    counter = counter ? parseInt(counter) : 0;

    if (counter >= limit) {
        return false;
    }

    await env.URL_DB.put(key, counter + 1, { expirationTtl: window });
    return true;
}

// 清理过期URL的函数
async function cleanupExpiredUrls(env) {
    const now = Date.now();
    const batchSize = 100;
    let cursor;
    let deletionPromises = [];
    
    try {
        do {
            const list = await env.URL_DB.list({ cursor, limit: batchSize });
            cursor = list.cursor;
            
            for (const key of list.keys) {
                try {
                    const value = await env.URL_DB.get(key.name);
                    if (!value) continue;
                    
                    const data = JSON.parse(value);
                    
                    if (data.expires && data.expires < now) {
                        deletionPromises.push(env.URL_DB.delete(key.name));
                    }
                } catch (error) {
                    console.error(`清理数据解析失败: ${key.name}`, error);
                }
            }
            
            if (deletionPromises.length > 0) {
                await Promise.allSettled(deletionPromises);
                deletionPromises = [];
            }
        } while (cursor);
    } catch (error) {
        console.error('清理过期URL时发生错误:', error);
    }
}

export default {
    async fetch(request, env) {
        try {
            // 验证必要的环境变量
            if (!env.URL_DB) {
                return new Response('配置错误：缺少数据库绑定', { 
                    status: 500,
                    headers: addResponseHeaders({ 'Content-Type': 'text/plain;charset=utf-8' })
                });
            }

            // 添加请求大小限制
            const contentLength = request.headers.get('content-length');
            if (contentLength && parseInt(contentLength) > 512 * 1024) {
                return new Response('请求体过大', { 
                    status: 413,
                    headers: addResponseHeaders({ 'Content-Type': 'text/plain;charset=utf-8' })
                });
            }

            const requestUrl = new URL(request.url);
            const path = requestUrl.pathname.slice(1);
            
            // 处理CORS预检请求
            if (request.method === 'OPTIONS') {
                return new Response(null, {
                    headers: addResponseHeaders({
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Max-Age': '86400'
                    })
                });
            }

            // 返回主页
            if (path === '' || path === 'index.html') {
                return new Response(HTML, {
                    headers: addResponseHeaders({ 
                        'Content-Type': 'text/html;charset=utf-8'
                    }, 'static')
                });
            }

            // 处理创建短链接请求
            if (path === 'create' && request.method === 'POST') {
                const ip = request.headers.get('cf-connecting-ip') || 
                          request.headers.get('x-real-ip') || 
                          'unknown';
                
                // 检查速率限制
                if (!await checkRateLimit(ip, env)) {
                    return new Response(JSON.stringify({ error: '请求过于频繁，请稍后再试' }), {
                        status: 429,
                        headers: addResponseHeaders({ 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Retry-After': '3600'
                        })
                    });
                }

                // 解析请求体
                let data;
                try {
                    const text = await request.text();
                    console.log('收到的原始数据:', text);
                    data = JSON.parse(text);
                } catch (e) {
                    console.error('JSON解析错误:', e);
                    return new Response(JSON.stringify({ 
                        error: '无效的JSON格式',
                        details: e.message
                    }), {
                        status: 400,
                        headers: addResponseHeaders({ 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*' 
                        })
                    });
                }
                
                // 验证必要参数
                if (!data.originalUrl || !data.customPath) {
                    return new Response(JSON.stringify({ error: '缺少必要参数' }), {
                        status: 400,
                        headers: addResponseHeaders({ 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*' 
                        })
                    });
                }

                // 验证URL格式
                try {
                    new URL(data.originalUrl);
                } catch {
                    return new Response(JSON.stringify({ error: '无效的URL格式' }), {
                        status: 400,
                        headers: addResponseHeaders({ 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*' 
                        })
                    });
                }

                // 验证自定义后缀格式
                if (!/^[A-Za-z0-9_-]{3,20}$/.test(data.customPath)) {
                    return new Response(JSON.stringify({ error: '无效的自定义后缀格式' }), {
                        status: 400,
                        headers: addResponseHeaders({ 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*' 
                        })
                    });
                }

                // 检查URL可访问性
                if (!await isValidTargetUrl(data.originalUrl)) {
                    return new Response(JSON.stringify({ error: '目标URL不可访问或响应超时' }), {
                        status: 400,
                        headers: addResponseHeaders({ 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*' 
                        })
                    });
                }

                // 检查后缀是否已被占用
                const existing = await env.URL_DB.get(data.customPath);
                if (existing) {
                    return new Response(JSON.stringify({ error: '后缀已被占用' }), {
                        status: 409,
                        headers: addResponseHeaders({ 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*' 
                        })
                    });
                }

                // 计算过期时间
                const expiration = data.expiration in expirationOptions ?
                    expirationOptions[data.expiration] : null;

                // 构建URL数据对象
                const urlData = {
                    url: data.originalUrl,
                    expires: expiration ? Date.now() + expiration * 1000 : null,
                    createdAt: Date.now(),
                    createdBy: ip,
                    lastAccessed: null,
                    accessCount: 0
                };

                // 存储URL数据
                await env.URL_DB.put(data.customPath, JSON.stringify(urlData), 
                    expiration ? { expirationTtl: expiration } : undefined);

                // 返回成功响应
                return new Response(JSON.stringify({
                    shortUrl: `${requestUrl.origin}/${data.customPath}`
                }), {
                    headers: addResponseHeaders({ 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*' 
                    })
                });
            }

            // 处理短链接重定向
            if (path !== '' && path !== 'create' && path !== 'manifest.json') {
                const record = await env.URL_DB.get(path);
                if (!record) {
                    return new Response('短链接不存在', { 
                        status: 404,
                        headers: addResponseHeaders({ 
                            'Content-Type': 'text/plain;charset=utf-8' 
                        })
                    });
                }

                let urlData;
                try {
                    urlData = JSON.parse(record);
                } catch (e) {
                    return new Response('短链接数据损坏', { 
                        status: 500,
                        headers: addResponseHeaders({ 
                            'Content-Type': 'text/plain;charset=utf-8' 
                        })
                    });
                }
                
                // 检查链接是否过期
                if (urlData.expires && Date.now() > urlData.expires) {
                    env.URL_DB.delete(path).catch(console.error);
                    
                    return new Response('短链接已过期', { 
                        status: 410,
                        headers: addResponseHeaders({ 
                            'Content-Type': 'text/plain;charset=utf-8' 
                        })
                    });
                }

                // 更新访问统计
                const updatedData = {
                    ...urlData,
                    lastAccessed: Date.now(),
                    accessCount: (urlData.accessCount || 0) + 1
                };
                
                env.URL_DB.put(path, JSON.stringify(updatedData), 
                    urlData.expires ? { expirationTtl: Math.floor((urlData.expires - Date.now()) / 1000) } : undefined)
                    .catch(console.error);

                // 执行重定向
                return Response.redirect(urlData.url, 302);
            }

            // 处理 manifest.json 请求
            if (path === 'manifest.json') {
                const manifest = {
                    "name": "📎青云量子短链",
                    "short_name": "青云短链",
                    "start_url": "/",
                    "display": "standalone",
                    "background_color": "#0a0a12",
                    "theme_color": "#4d7cff",
                    "icons": [
                        {
                            "src": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='192' height='192'%3E%3Cpath fill='%234d7cff' d='M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z'/%3E%3C/svg%3E",
                            "sizes": "192x192",
                            "type": "image/svg+xml"
                        }
                    ]
                };
                
                return new Response(JSON.stringify(manifest), {
                    headers: addResponseHeaders({ 
                        'Content-Type': 'application/json'
                    }, 'static')
                });
            }

            // 处理其他请求
            return new Response('Not Found', { 
                status: 404,
                headers: addResponseHeaders({ 
                    'Content-Type': 'text/plain;charset=utf-8' 
                })
            });

        } catch (error) {
            console.error('Worker error:', error);
            return new Response('服务器错误', { 
                status: 500,
                headers: addResponseHeaders({ 
                    'Content-Type': 'text/plain;charset=utf-8' 
                })
            });
        }
    },

    // 添加定时任务处理过期数据清理
    async scheduled(event, env, ctx) {
        ctx.waitUntil(cleanupExpiredUrls(env));
    }
};
