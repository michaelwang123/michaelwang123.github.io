# md2zhihu 使用指南

## 📋 概述

md2zhihu 是一个将 Markdown 文档转换为适合知乎发布格式的工具。它可以将 Mermaid 图表转换为图片，优化表格显示，并自动处理图片链接。

## 🔧 环境准备

### 1. Python 虚拟环境

#### 激活现有环境
```bash
# 激活 convert 虚拟环境
source convert/bin/activate
```

#### 创建新环境（如需要）
```bash
# 创建新的虚拟环境
python3 -m venv convert

# 激活环境
source convert/bin/activate

# 升级 pip
pip install --upgrade pip
```

### 2. 系统依赖安装

#### 安装 pandoc（必需）
```bash
# macOS 使用 Homebrew 安装
brew install pandoc

# Ubuntu/Debian
sudo apt-get install pandoc

# CentOS/RHEL
sudo yum install pandoc
```

## 📦 md2zhihu 安装

### 激活环境并安装
```bash
# 1. 激活 Python 环境
source convert/bin/activate

# 2. 安装 md2zhihu
pip install md2zhihu

# 3. 验证安装
which md2zhihu
md2zhihu --help
```

## 🚀 使用方法

### 基本命令格式
```bash
md2zhihu <markdown文件路径> -r <仓库路径>
```

### 常用示例

#### 1. 转换单个文件
```bash
# 激活环境
source convert/bin/activate

# 转换博客文章（推送到当前仓库）
md2zhihu content/posts/skill-learning/flink-python/blog_geo_fence_system/index.md -r .

# 转换博客文章（推送到专用图片仓库）
md2zhihu content/posts/skill-learning/flink-python/blog_geo_fence_system/index.md -r git@github.com:michaelwang123/images.git
```

#### 2. 转换到指定目录
```bash
md2zhihu your_article.md -r . --output-dir custom_output
```

#### 3. 批量转换
```bash
# 转换目录下所有markdown文件
find content/posts -name "*.md" -exec md2zhihu {} -r . \;
```

## 📁 输出结构

转换完成后会生成：
```
_md2/
├── index.md              # 转换后的主文件
├── index/                # 图片资源目录
│   ├── diagram1.jpg      # Mermaid图表转换的图片
│   ├── diagram2.jpg
│   └── ...
└── .git/                 # Git仓库（用于图片托管）
```

## ⚙️ 配置参数

### 常用参数说明
- `-r, --repo`: 指定Git仓库URL，用于推送和托管图片资源
- `-d, --output-dir`: 指定输出目录（默认：_md2）
- `--asset-output-dir`: 指定图片资源存储目录
- `--platform`: 目标平台（默认：zhihu）

### 重要参数详解

#### `-r, --repo` vs `--asset-output-dir` 的区别

**`-r, --repo`（推荐使用）**：
- 指定Git仓库URL，用于推送图片到远程仓库
- 支持SSH格式：`git@github.com:user/repo.git`
- 支持分支指定：`git@github.com:user/repo.git@branch_name`
- 可以使用 `.` 来指定当前目录的Git仓库
- 图片会自动生成CDN链接（如：jsDelivr）

**`--asset-output-dir`（本地模式）**：
- 只指定本地图片存储目录
- 图片使用相对路径引用
- 不会推送到远程仓库
- 适合本地预览或手动管理图片

### 使用示例对比

#### 1. 使用 `-r` 推送到远程仓库（推荐）
```bash
# 推送到当前仓库
md2zhihu article.md -r .

# 推送到指定的图片仓库
md2zhihu article.md -r git@github.com:michaelwang123/images.git

# 推送到指定分支（可选）
md2zhihu article.md -r git@github.com:michaelwang123/images.git@main
```

#### 2. 使用 `--asset-output-dir` 本地模式
```bash
# 本地模式，图片存储在本地
md2zhihu article.md --asset-output-dir ./images

# 组合使用
md2zhihu article.md \
  --output-dir converted \
  --asset-output-dir converted/assets \
  --platform zhihu
```

#### 3. 输出差异对比
**使用 `-r` 的输出**：
```markdown
![图片](https://cdn.jsdelivr.net/gh/michaelwang123/images@main/img/diagram.jpg)
```

**本地模式的输出**：
```markdown
![图片](./images/diagram.jpg)
```

## 🔍 功能特性

### 支持的转换
- ✅ **Mermaid 图表** → 图片（自动生成CDN链接）
- ✅ **Markdown 表格** → HTML表格（更好显示）
- ✅ **代码块** → 知乎格式代码块
- ✅ **图片链接** → CDN加速链接

### 自动处理
- 图片自动上传到GitHub仓库
- 生成CDN链接（jsDelivr）
- 表格格式优化
- 链接格式转换

## 🛠️ 常见问题

### 1. pandoc 未找到错误
```bash
FileNotFoundError: [Errno 2] No such file or directory: 'pandoc'
```
**解决方法**：
```bash
# macOS
brew install pandoc

# Linux
sudo apt-get install pandoc  # Ubuntu/Debian
sudo yum install pandoc      # CentOS/RHEL
```

### 2. Git 推送权限错误
```bash
git@github.com: Permission denied (publickey)
```
**解决方法**：
- 确保 SSH 密钥已配置
- 或者使用转换后的本地文件（不影响转换功能）

### 3. 依赖安装失败
```bash
# 清理pip缓存重新安装
pip cache purge
pip install --no-cache-dir md2zhihu
```

## 📝 完整使用流程

### Step 1: 环境准备
```bash
# 进入项目目录
cd /path/to/your/hugo/project

# 激活Python环境
source convert/bin/activate

# 确认工具可用
which md2zhihu
pandoc --version
```

### Step 2: 执行转换
```bash
# 转换文章
md2zhihu content/posts/your-article/index.md -r .

# 检查输出
ls -la _md2/
```

### Step 3: 使用转换结果
```bash
# 查看转换后的文件
cat _md2/index.md

# 复制内容到知乎编辑器
# 图片链接已自动处理，可直接使用
```

## 💡 最佳实践

### 1. 文档结构优化
- 使用清晰的标题层级
- 合理使用 Mermaid 图表
- 表格数据结构化

### 2. 图片处理
- Mermaid 图表会自动转换为图片
- 本地图片建议预先上传到图床
- 保持图片文件名简洁

#### 图片仓库选择建议
- **专用图片仓库**：使用 `git@github.com:michaelwang123/images.git`
  - 优点：图片统一管理，不会污染主项目仓库
  - 适合：长期维护，图片较多的情况
- **当前仓库**：使用 `-r .`
  - 优点：简单方便，一体化管理
  - 适合：图片较少，偶尔使用的情况

### 3. 批量处理
```bash
# 创建批量转换脚本
cat > convert_all.sh << 'EOF'
#!/bin/bash
source convert/bin/activate

find content/posts -name "index.md" | while read file; do
    echo "Converting: $file"
    md2zhihu "$file" -r .
done
EOF

chmod +x convert_all.sh
./convert_all.sh
```

## 🔗 相关链接

- [md2zhihu GitHub](https://github.com/drdrxp/md2zhihu)
- [Pandoc 官网](https://pandoc.org/)
- [Mermaid 文档](https://mermaid-js.github.io/mermaid/)

---

**更新时间**: 2024-12-19  
**适用版本**: md2zhihu latest, Python 3.9+