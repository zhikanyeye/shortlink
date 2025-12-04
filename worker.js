const HTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>青云量子短链</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZmF2aWNvbkdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzNiODJmNjtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4YjVjZjY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2VjNDg5OTtzdG9wLW9wYWNpdHk6MSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgcng9IjgiIGZpbGw9IiMwZjE3MmEiIHN0cm9rZT0idXJsKCNmYXZpY29uR3JhZGllbnQpIiBzdHJva2Utd2lkdGg9IjEiLz4KICA8cGF0aCBkPSJNMTAgMTZjMC0yLjIgMS44LTQgNC00aDJ2MmgtMmMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDJoMnYyaC0yYy0yLjIgMC00LTEuOC00LTR6IiBmaWxsPSJ1cmwoI2Zhdmljb25HcmFkaWVudCkiLz4KICA8cGF0aCBkPSJNMjIgMTZjMCAyLjItMS44IDQtNCA0aC0ydi0yaDJjMS4xIDAgMi0uOSAyLTJzLS45LTItMi0yaC0ydi0yaDJjMi4yIDAgNCAxLjggNCA0eiIgZmlsbD0idXJsKCNmYXZpY29uR3JhZGllbnQpIi8+CiAgPHJlY3QgeD0iMTMiIHk9IjE1IiB3aWR0aD0iNiIgaGVpZ2h0PSIyIiByeD0iMSIgZmlsbD0idXJsKCNmYXZpY29uR3JhZGllbnQpIi8+Cjwvc3ZnPg==">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-blue: #3b82f6;
            --primary-purple: #8b5cf6;
            --primary-pink: #ec4899;
            --secondary-blue: #1e40af;
            --accent-gold: #f59e0b;
            --dark-bg: #0f172a;
            --dark-surface: #1e293b;
            --dark-surface-2: #334155;
            --light-text: #f8fafc;
            --muted-text: #94a3b8;
            --success-green: #10b981;
            --error-red: #ef4444;
            --warning-orange: #f97316;
            --border-color: #475569;
            --hover-border: #64748b;
            --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            --gradient-primary: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-purple) 50%, var(--primary-pink) 100%);
            --gradient-dark: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            background: var(--dark-bg);
            color: var(--light-text);
            min-height: 100vh;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
        }

        /* 动态背景 */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 20% 50%, var(--primary-blue) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, var(--primary-purple) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, var(--primary-pink) 0%, transparent 50%);
            opacity: 0.1;
            z-index: -2;
            animation: float 8s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
        }

        /* 网格背景 */
        body::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(var(--border-color) 1px, transparent 1px),
                linear-gradient(90deg, var(--border-color) 1px, transparent 1px);
            background-size: 50px 50px;
            opacity: 0.03;
            z-index: -1;
        }

        .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            position: relative;
            z-index: 1;
        }

        .main-card {
            background: var(--gradient-dark);
            border: 1px solid var(--border-color);
            border-radius: 24px;
            padding: 2.5rem;
            width: 100%;
            max-width: 480px;
            box-shadow: var(--shadow-xl);
            backdrop-filter: blur(20px);
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .main-card:hover {
            border-color: var(--hover-border);
            box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
        }

        .main-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: var(--gradient-primary);
            opacity: 0.5;
        }

        .header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .title {
            font-size: clamp(1.75rem, 4vw, 2.5rem);
            font-weight: 700;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.75rem;
            line-height: 1.2;
        }

        .subtitle {
            color: var(--muted-text);
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
        }

        .feature-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(59, 130, 246, 0.1);
            color: var(--primary-blue);
            padding: 0.6rem 1.2rem;
            border-radius: 50px;
            font-size: 0.85rem;
            font-weight: 500;
            margin-bottom: 1.5rem;
            border: 1px solid rgba(59, 130, 246, 0.2);
            backdrop-filter: blur(10px);
        }

        .form-group {
            margin-bottom: 1.5rem;
            position: relative;
        }

        .form-label {
            display: block;
            color: var(--light-text);
            font-weight: 500;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
            transition: color 0.2s ease;
        }

        .form-input, .form-select {
            width: 100%;
            padding: 1rem 1.25rem;
            background: var(--dark-surface);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            color: var(--light-text);
            font-size: 1rem;
            transition: all 0.3s ease;
            position: relative;
            min-height: 44px;
        }

        .form-input:focus, .form-select:focus {
            outline: none;
            border-color: var(--primary-blue);
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            background: var(--dark-surface-2);
        }

        .form-input:hover, .form-select:hover {
            border-color: var(--hover-border);
        }

        .form-input::placeholder {
            color: var(--muted-text);
        }

        .generate-btn {
            width: 100%;
            padding: 1.25rem 2rem;
            background: var(--gradient-primary);
            border: none;
            border-radius: 12px;
            color: white;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            margin-bottom: 1.5rem;
            box-shadow: var(--shadow-md);
            min-height: 44px;
        }

        .generate-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }

        .generate-btn:active {
            transform: translateY(0);
        }

        .generate-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .generate-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }

        .generate-btn:hover:not(:disabled)::before {
            left: 100%;
        }

        .result-card {
            background: var(--dark-surface);
            border: 1px solid var(--success-green);
            border-radius: 16px;
            padding: 1.5rem;
            margin-top: 1.5rem;
            display: none;
            animation: slideIn 0.5s ease;
        }

        .result-card.active {
            display: block;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .result-title {
            color: var(--success-green);
            font-weight: 600;
            margin-bottom: 1rem;
            font-size: 0.95rem;
        }

        .short-link {
            display: block;
            color: var(--primary-blue);
            text-decoration: none;
            word-break: break-all;
            padding: 0.75rem;
            background: var(--dark-bg);
            border-radius: 8px;
            margin-bottom: 1rem;
            transition: all 0.2s ease;
            border: 1px solid var(--border-color);
        }

        .short-link:hover {
            background: var(--dark-surface-2);
            border-color: var(--primary-blue);
        }

        .copy-btn {
            width: 100%;
            padding: 0.75rem 1rem;
            background: var(--primary-blue);
            border: none;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.9rem;
            min-height: 44px;
        }

        .copy-btn:hover {
            background: var(--secondary-blue);
            transform: translateY(-1px);
        }

        .copy-btn.copied {
            background: var(--success-green);
        }

        .error-message {
            color: var(--error-red);
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: none;
            animation: shake 0.5s ease;
        }

        .error-message.show {
            display: block;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 23, 42, 0.8);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(4px);
        }

        .loading-content {
            background: var(--dark-surface);
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            border: 1px solid var(--border-color);
            box-shadow: var(--shadow-xl);
        }

        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--border-color);
            border-radius: 50%;
            border-top-color: var(--primary-blue);
            animation: spin 1s ease-in-out infinite;
            margin: 0 auto 1rem;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .loading-text {
            color: var(--muted-text);
            font-weight: 500;
        }

        .footer {
            text-align: center;
            margin-top: 2rem;
            color: var(--muted-text);
            font-size: 0.8rem;
        }

        /* 移动端优化 */
        @media (max-width: 640px) {
            .container {
                padding: 1rem;
                justify-content: center;
                min-height: 100vh;
            }

            .main-card {
                padding: 1.5rem;
                border-radius: 20px;
                margin: 0.5rem 0;
                max-width: 100%;
            }

            .title {
                font-size: 1.5rem;
            }

            .subtitle {
                font-size: 0.9rem;
            }

            .feature-badge {
                font-size: 0.8rem;
                padding: 0.5rem 1rem;
            }

            .form-input, .form-select {
                padding: 0.875rem 1rem;
                font-size: 16px;
                min-height: 44px;
            }

            .generate-btn {
                padding: 1rem 1.5rem;
                font-size: 1rem;
                min-height: 44px;
            }

            .result-card {
                padding: 1.25rem;
            }

            .short-link {
                padding: 0.625rem;
                font-size: 0.9rem;
            }

            .copy-btn {
                min-height: 44px;
            }
        }

        @media (max-width: 480px) {
            .main-card {
                padding: 1.25rem;
                border-radius: 16px;
            }

            .header {
                margin-bottom: 1.5rem;
            }

            .title {
                font-size: 1.375rem;
            }

            .form-group {
                margin-bottom: 1rem;
            }
        }

        /* 添加超小屏幕支持 */
        @media (max-width: 375px) {
            .main-card {
                padding: 1rem;
                margin: 0.25rem;
            }
            
            .container {
                padding: 0.5rem;
            }
            
            .title {
                font-size: 1.25rem;
            }
        }

        /* 触摸设备优化 */
        @media (hover: none) and (pointer: coarse) {
            .generate-btn:hover {
                transform: none;
            }
            
            .copy-btn:hover {
                transform: none;
            }
        }

        /* 高对比度模式支持 */
        @media (prefers-contrast: high) {
            :root {
                --border-color: #64748b;
                --hover-border: #94a3b8;
            }
        }

        /* 减少动画偏好支持 */
        @media (prefers-reduced-motion: reduce) {
            *, ::before, ::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }

        /* 暗色模式优化 */
        @media (prefers-color-scheme: dark) {
            :root {
                --dark-bg: #000000;
                --dark-surface: #111111;
                --dark-surface-2: #1a1a1a;
            }
        }
    </style>
</head>
<body>
    <div class="loading-overlay" id="loadingOverlay">
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <div class="loading-text">正在生成量子链接...</div>
        </div>
    </div>

    <div class="container">
        <div class="main-card">
            <div class="header">
                <div class="feature-badge">
                    ⚡ 极速生成 · 🔒 安全可靠
                </div>
                <h1 class="title">青云量子短链</h1>
                <p class="subtitle">将长链接转换为简洁易记的短链接</p>
            </div>

            <form id="linkForm">
                <div class="form-group">
                    <label class="form-label" for="originalUrl">
                        🔗 原始链接
                    </label>
                    <input 
                        type="url" 
                        id="originalUrl"
                        class="form-input"
                        placeholder="请输入完整的URL（如：https://example.com）"
                        required
                        autocomplete="url"
                    >
                    <div class="error-message" id="urlError"></div>
                </div>

                <div class="form-group">
                    <label class="form-label" for="customPath">
                        ✨ 自定义后缀
                    </label>
                    <input 
                        type="text" 
                        id="customPath"
                        class="form-input"
                        placeholder="可选：留空自动生成随机后缀"
                        pattern="[A-Za-z0-9_-]{3,20}"
                        autocomplete="off"
                    >
                    <div class="error-message" id="pathError"></div>
                </div>

                <div class="form-group">
                    <label class="form-label" for="expiration">
                        ⏰ 有效期设置
                    </label>
                    <select id="expiration" class="form-select">
                        <option value="604800">7天有效期</option>
                        <option value="2592000">30天有效期</option>
                        <option value="7776000">90天有效期</option>
                        <option value="15552000">180天有效期</option>
                        <option value="0">永久有效</option>
                    </select>
                </div>

                <button type="submit" class="generate-btn" id="generateBtn">
                    🚀 生成量子链接
                </button>
            </form>

            <div class="result-card" id="resultCard">
                <div class="result-title">🎉 链接生成成功！</div>
                <a href="#" class="short-link" id="shortLink" target="_blank"></a>
                <button type="button" class="copy-btn" id="copyBtn">
                    📋 复制链接
                </button>
            </div>
        </div>

        <div class="footer">
            <p>© 2024 青云量子短链 · 让分享更简单</p>
        </div>
    </div>

    <script>
        // DOM 元素
        const form = document.getElementById('linkForm');
        const generateBtn = document.getElementById('generateBtn');
        const loadingOverlay = document.getElementById('loadingOverlay');
        const resultCard = document.getElementById('resultCard');
        const shortLink = document.getElementById('shortLink');
        const copyBtn = document.getElementById('copyBtn');
        const urlError = document.getElementById('urlError');
        const pathError = document.getElementById('pathError');

        // 工具函数
        function showError(element, message) {
            element.textContent = message;
            element.classList.add('show');
            setTimeout(() => element.classList.remove('show'), 5000);
        }

        function hideError(element) {
            element.classList.remove('show');
        }

        function showLoading() {
            loadingOverlay.style.display = 'flex';
            generateBtn.disabled = true;
        }

        function hideLoading() {
            loadingOverlay.style.display = 'none';
            generateBtn.disabled = false;
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

        // 复制功能
        async function copyToClipboard() {
            try {
                await navigator.clipboard.writeText(shortLink.href);
                copyBtn.textContent = '✅ 已复制！';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.textContent = '📋 复制链接';
                    copyBtn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('复制失败:', err);
                
                // 降级方案
                const textArea = document.createElement('textarea');
                textArea.value = shortLink.href;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    copyBtn.textContent = '✅ 已复制！';
                    copyBtn.classList.add('copied');
                    
                    setTimeout(() => {
                        copyBtn.textContent = '📋 复制链接';
                        copyBtn.classList.remove('copied');
                    }, 2000);
                } catch (e) {
                    alert('复制失败，请手动复制链接');
                }
                
                document.body.removeChild(textArea);
            }
        }

        // 表单验证
        function validateForm() {
            const originalUrl = document.getElementById('originalUrl').value.trim();
            const customPath = document.getElementById('customPath').value.trim();
            let isValid = true;

            hideError(urlError);
            hideError(pathError);

            if (!originalUrl) {
                showError(urlError, '请输入原始链接');
                isValid = false;
            } else if (!isValidUrl(originalUrl)) {
                showError(urlError, '请输入有效的URL格式（必须包含 http:// 或 https://）');
                isValid = false;
            }

            if (customPath && !isValidPath(customPath)) {
                showError(pathError, '后缀只能包含3-20位字母、数字、下划线或连字符');
                isValid = false;
            }

            return isValid;
        }

        // 表单提交处理
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            if (!validateForm()) {
                return;
            }

            const originalUrl = document.getElementById('originalUrl').value.trim();
            const customPath = document.getElementById('customPath').value.trim();
            const expiration = document.getElementById('expiration').value;

            showLoading();
            resultCard.classList.remove('active');

            try {
                const response = await fetch('/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        originalUrl,
                        customPath,
                        expiration
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    shortLink.href = data.shortUrl;
                    shortLink.textContent = data.shortUrl;
                    resultCard.classList.add('active');
                    
                    // 清空表单
                    document.getElementById('originalUrl').value = '';
                    document.getElementById('customPath').value = '';
                    
                    // 滚动到结果
                    resultCard.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                } else {
                    if (data.error === '后缀已被占用') {
                        showError(pathError, data.error);
                    } else {
                        alert('生成失败：' + (data.error || '未知错误'));
                    }
                }
            } catch (error) {
                console.error('请求失败:', error);
                alert('网络请求失败，请检查网络连接后重试');
            } finally {
                hideLoading();
            }
        });

        // 复制按钮事件
        copyBtn.addEventListener('click', copyToClipboard);

        // 实时验证
        document.getElementById('originalUrl').addEventListener('input', function() {
            if (this.value && !isValidUrl(this.value)) {
                showError(urlError, 'URL格式不正确');
            } else {
                hideError(urlError);
            }
        });

        document.getElementById('customPath').addEventListener('input', function() {
            if (this.value && !isValidPath(this.value)) {
                showError(pathError, '后缀格式不正确');
            } else {
                hideError(pathError);
            }
        });

        // 阻止表单的默认提交行为
        document.addEventListener('DOMContentLoaded', function() {
            // 添加一些初始化动画
            setTimeout(() => {
                document.querySelector('.main-card').style.transform = 'translateY(0)';
                document.querySelector('.main-card').style.opacity = '1';
            }, 100);
        });

        // PWA 支持
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                // 可以在这里注册 Service Worker
            });
        }
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
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;",
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
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        const response = await fetch(url, {
            method: 'HEAD',
            headers: { 'User-Agent': 'QingYun-URL-Validator-Bot' },
            redirect: 'follow',
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        return response.ok;
    } catch (error) {
        console.log('URL validation warning:', error.name, '- allowing URL creation');
        return true;
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
                if (!data.originalUrl) {
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

                // 自动生成或验证自定义后缀
                let customPath = data.customPath ? data.customPath.trim() : '';
                
                if (!customPath) {
                    // 自动生成6位随机字符串
                    let attempts = 0;
                    const maxAttempts = 5;
                    
                    while (attempts < maxAttempts) {
                        customPath = Math.random().toString(36).substring(2, 8);
                        const existing = await env.URL_DB.get(customPath);
                        if (!existing) {
                            break;
                        }
                        attempts++;
                    }
                    
                    if (attempts === maxAttempts) {
                        return new Response(JSON.stringify({ error: '生成短链接失败，请重试' }), {
                            status: 500,
                            headers: addResponseHeaders({ 
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*' 
                            })
                        });
                    }
                } else {
                    // 验证自定义后缀格式
                    if (!/^[A-Za-z0-9_-]{3,20}$/.test(customPath)) {
                        return new Response(JSON.stringify({ error: '无效的自定义后缀格式' }), {
                            status: 400,
                            headers: addResponseHeaders({ 
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*' 
                            })
                        });
                    }
                    
                    // 检查后缀是否已被占用
                    const existing = await env.URL_DB.get(customPath);
                    if (existing) {
                        return new Response(JSON.stringify({ error: '后缀已被占用' }), {
                            status: 409,
                            headers: addResponseHeaders({ 
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*' 
                            })
                        });
                    }
                }

                // 检查URL可访问性
                if (!await isValidTargetUrl(data.originalUrl)) {
                    console.log('URL validation returned false but continuing anyway');
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
                await env.URL_DB.put(customPath, JSON.stringify(urlData), 
                    expiration ? { expirationTtl: expiration } : undefined);

                // 返回成功响应
                return new Response(JSON.stringify({
                    shortUrl: `${requestUrl.origin}/${customPath}`
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

                // 执行重定向
                return Response.redirect(urlData.url, 302);
            }

            // 处理 manifest.json 请求
            if (path === 'manifest.json') {
                const manifest = {
                    "name": "青云量子短链",
                    "short_name": "青云短链",
                    "start_url": "/",
                    "display": "standalone",
                    "background_color": "#0f172a",
                    "theme_color": "#3b82f6",
                    "icons": [
                        {
                            "src": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJpY29uR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzYjgyZjY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4YjVjZjY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZWM0ODk5O3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiByeD0iNDgiIGZpbGw9IiMwZjE3MmEiIHN0cm9rZT0idXJsKCNpY29uR3JhZGllbnQpIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNNjAgOTZjMC0xMy4yIDEwLjgtMjQgMjQtMjRoMTJ2MTJoLTEyYy02LjYgMC0xMiA1LjQtMTIgMTJzNS40IDEyIDEyIDEyaDEydjEyaC0xMmMtMTMuMiAwLTI0LTEwLjgtMjQtMjR6IiBmaWxsPSJ1cmwoI2ljb25HcmFkaWVudCkiLz48cGF0aCBkPSJNMTMyIDk2YzAgMTMuMi0xMC44IDI0LTI0IDI0aC0xMnYtMTJoMTJjNi42IDAgMTItNS40IDEyLTEycy01LjQtMTItMTItMTJoLTEydi0xMmgxMmMxMy4yIDAgMjQgMTAuOCAyNCAyNHoiIGZpbGw9InVybCgjaWNvbkdyYWRpZW50KSIvPjxyZWN0IHg9Ijc4IiB5PSI5MCIgd2lkdGg9IjM2IiBoZWlnaHQ9IjEyIiByeD0iNiIgZmlsbD0idXJsKCNpY29uR3JhZGllbnQpIi8+PC9zdmc+",
                            "sizes": "192x192",
                            "type": "image/svg+xml"
                        },
                        {
                            "src": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJpY29uR3JhZGllbnQ1MTIiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzYjgyZjY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4YjVjZjY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZWM0ODk5O3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iMTI4IiBmaWxsPSIjMGYxNzJhIiBzdHJva2U9InVybCgjaWNvbkdyYWRpZW50NTEyKSIgc3Ryb2tlLXdpZHRoPSI4Ii8+PHBhdGggZD0iTTE2MCAyNTZjMC0zNS4yIDI4LjgtNjQgNjQtNjRoMzJ2MzJoLTMyYy0xNy42IDAtMzIgMTQuNC0zMiAzMnMxNC40IDMyIDMyIDMyaDMydjMyaC0zMmMtMzUuMiAwLTY0LTI4LjgtNjQtNjR6IiBmaWxsPSJ1cmwoI2ljb25HcmFkaWVudDUxMikiLz48cGF0aCBkPSJNMzUyIDI1NmMwIDM1LjItMjguOCA2NC02NCA2NGgtMzJ2LTMyaDMyYzE3LjYgMCAzMi0xNC40IDMyLTMyczLxNC40LTMyLTMyLTMyaC0zMnYtMzJoMzJjMzUuMiAwIDY0IDI4LjggNjQgNjR6IiBmaWxsPSJ1cmwoI2ljb25HcmFkaWVudDUxMikiLz48cmVjdCB4PSIyMDgiIHk9IjI0MCIgd2lkdGg9Ijk2IiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9InVybCgjaWNvbkdyYWRpZW50NTEyKSIvPjwvc3ZnPg==",
                            "sizes": "512x512",
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
    }
};
