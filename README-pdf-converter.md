# 🚀 GitHub Pages to PDF 转换器

这个工具使用 **Puppeteer** 将你的 GitHub Pages 网站转换为专业的 PDF 文档。

## ✅ 转换成功！

已成功将 https://michaelwang123.github.io/ 转换为PDF：

- 📄 **文件名**: `Michael博客_20250625.pdf`
- 📁 **位置**: `/Users/michael/Documents/codes/golang/hugo/michaelwang123.github.io/`
- 📊 **大小**: 0.90 MB
- 🎯 **格式**: A4, 带页眉页脚
- 🎨 **特点**: 保留原始样式和背景

## 🛠️ 使用方法

### 1. 安装依赖
```bash
npm install
```

### 2. 运行转换
```bash
node convert-to-pdf.js
# 或者
npm run convert
```

### 3. 查看结果
生成的PDF文件会保存在当前目录下，文件名格式：`Michael博客_YYYYMMDD.pdf`

## ⚙️ 配置选项

脚本支持以下自定义选项：

### PDF 设置
- **格式**: A4
- **页边距**: 上下20mm, 左右15mm
- **背景**: 保留网站原始背景
- **页眉**: 显示网站标题
- **页脚**: 显示生成日期、页码、网站URL

### 浏览器设置
- **模式**: 新版无头模式
- **视口**: 1280x720
- **超时**: 30秒
- **等待**: 网络空闲 + DOM加载完成

## 🎨 PDF 特色

- ✅ **完整保留网站样式**
- ✅ **专业的页眉页脚**
- ✅ **中文日期格式**
- ✅ **自动页码**
- ✅ **移除固定定位元素**
- ✅ **优化打印效果**

## 📋 系统要求

- **Node.js**: 14.0+
- **Chrome浏览器**: 需要安装在系统中
- **操作系统**: macOS (脚本已针对macOS优化)

## 🔄 自定义其他网站

如需转换其他网站，修改 `convert-to-pdf.js` 中的URL：

```javascript
await page.goto('https://your-website.com/', {
  waitUntil: ['networkidle0', 'domcontentloaded'],
  timeout: 30000
});
```

## 📦 文件结构

```
├── convert-to-pdf.js      # 主转换脚本
├── package.json           # 依赖配置
├── README-pdf-converter.md # 使用说明
└── Michael博客_YYYYMMDD.pdf # 生成的PDF文件
```

## 🔧 故障排除

### Chrome 路径问题
如果遇到Chrome路径错误，检查以下路径：
- macOS: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- Windows: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- Linux: `/usr/bin/google-chrome`

### 网络超时
如果网站加载缓慢，可以增加超时时间：
```javascript
timeout: 60000  // 60秒
```

### 内存不足
对于大型网站，可以增加内存限制：
```javascript
args: ['--max-old-space-size=4096']
```

## 🌟 功能特点

- 🚀 **快速转换**: 平均30秒完成
- 🎯 **高质量**: 保留原始网站视觉效果
- 🔧 **可定制**: 支持多种PDF选项
- 📱 **响应式**: 自动适配移动端内容
- 🌐 **多语言**: 支持中文等多种语言

## 💡 使用提示

1. **最佳实践**: 在网站内容稳定时进行转换
2. **性能优化**: 关闭不必要的浏览器扩展
3. **文件管理**: 定期清理生成的PDF文件
4. **版本控制**: 建议将PDF文件添加到.gitignore

---

**✨ 转换完成！现在你可以随时将你的GitHub Pages博客保存为PDF进行分享或打印。** 