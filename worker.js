const HTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CyberLink - 量子短链服务</title>
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
            background: rgba(10, 10, 18, 0.95);
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
    </style>
</head>
<body>
    <div class="cyber-container">
        <h1>⚡ CyberLink 量子短链</h1>
        
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

            generateBtn.addEventListener('click', async function() {
                const originalUrl = document.getElementById('originalUrl').value;
                const customPath = document.getElementById('customPath').value;
                const expiration = document.getElementById('expiration').value;
                const buttonOriginalText = '生成量子链接';

                urlError.classList.remove('show');
                pathError.classList.remove('show');
                document.getElementById('result').classList.remove('active');

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

                generateBtn.disabled = true;
                generateBtn.innerHTML = '生成中... <span class="loading"></span>';

                try {
                    const response = await fetch('/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ originalUrl, customPath, expiration })
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
                    console.error('Request failed:', error);
                    alert('网络请求失败: ' + error.message);
                } finally {
                    generateBtn.disabled = false;
                    generateBtn.textContent = buttonOriginalText;
                }
            });
        });
    </script>
</body>
</html>`;

const expirationOptions = {
    '604800': 7 * 24 * 3600,
    '2592000': 30 * 24 * 3600,
    '7776000': 90 * 24 * 3600,
    '15552000': 180 * 24 * 3600,
    '0': null
};

export default {
    async fetch(request, env) {
        try {
            const requestUrl = new URL(request.url);
            const path = requestUrl.pathname.slice(1);
            
            if (request.method === 'OPTIONS') {
                return new Response(null, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Max-Age': '86400'
                    }
                });
            }

            if (path === '' || path === 'index.html') {
                return new Response(HTML, {
                    headers: { 
                        'Content-Type': 'text/html;charset=utf-8'
                    }
                });
            }

            if (path === 'create' && request.method === 'POST') {
                const data = await request.json();
                
                if (!data.originalUrl || !data.customPath) {
                    return new Response(JSON.stringify({ error: '缺少必要参数' }), {
                        status: 400,
                        headers: { 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    });
                }

                try {
                    new URL(data.originalUrl);
                } catch {
                    return new Response(JSON.stringify({ error: '无效的URL格式' }), {
                        status: 400,
                        headers: { 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    });
                }

                if (!/^[A-Za-z0-9_-]{3,20}$/.test(data.customPath)) {
                    return new Response(JSON.stringify({ error: '无效的自定义后缀格式' }), {
                        status: 400,
                        headers: { 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    });
                }

                const existing = await env.URL_DB.get(data.customPath);
                if (existing) {
                    return new Response(JSON.stringify({ error: '后缀已被占用' }), {
                        status: 409,
                        headers: { 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    });
                }

                const expiration = data.expiration in expirationOptions ?
                    expirationOptions[data.expiration] : null;

                const urlData = {
                    url: data.originalUrl,
                    expires: expiration ? Date.now() + expiration * 1000 : null,
                    createdAt: Date.now(),
                    createdBy: request.headers.get('cf-connecting-ip') || 'anonymous'
                };

                await env.URL_DB.put(data.customPath, JSON.stringify(urlData));

                return new Response(JSON.stringify({
                    shortUrl: `${requestUrl.origin}/${data.customPath}`
                }), {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            }

            // 短链接重定向
            if (path !== '' && path !== 'create') {
                const record = await env.URL_DB.get(path);
                if (!record) {
                    return new Response('短链接不存在', { 
                        status: 404,
                        headers: { 
                            'Content-Type': 'text/plain;charset=utf-8',
                            'Access-Control-Allow-Origin': '*'
                        }
                    });
                }

                const urlData = JSON.parse(record);
                
                // 检查链接是否过期
                if (urlData.expires && Date.now() > urlData.expires) {
                    await env.URL_DB.delete(path);
                    return new Response('短链接已过期', { 
                        status: 410,
                        headers: { 
                            'Content-Type': 'text/plain;charset=utf-8',
                            'Access-Control-Allow-Origin': '*'
                        }
                    });
                }

                // 更新访问统计
                const updatedData = {
                    ...urlData,
                    lastAccessed: Date.now(),
                    accessCount: (urlData.accessCount || 0) + 1
                };
                
                // 异步更新统计数据
                env.URL_DB.put(path, JSON.stringify(updatedData)).catch(console.error);

                // 执行重定向，确保URL是完整的
                const targetUrl = urlData.url.startsWith('http') ? urlData.url : `https://${urlData.url}`;
                return Response.redirect(targetUrl, 302);
            }

        } catch (error) {
            console.error('Worker error:', error);
            return new Response('服务器错误: ' + error.message, { 
                status: 500,
                headers: { 
                    'Content-Type': 'text/plain;charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
    }
};
