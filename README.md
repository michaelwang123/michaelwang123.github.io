根据您提供的GitHub用户名和地址，我为您更新使用Hugo生成GitHub Pages的具体步骤：

1. 安装Hugo
```bash
brew install hugo
```

2. 创建新的Hugo站点
```bash
# 创建新的Hugo站点
hugo new site michaelwang123.github.io
cd michaelwang123.github.io
```

3. 初始化Git仓库并添加主题
```bash
# 初始化Git仓库
git init

# 添加主题（以PaperMod为例，这是一个流行的主题）
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
```

4. 配置站点
创建或编辑 `config.toml`：
```toml
baseURL = 'https://michaelwang123.github.io/'
languageCode = 'zh-cn'
title = 'Michael的博客'
theme = 'PaperMod'

# 其他配置项...
```

5. 创建新文章
```bash
# 创建新文章
hugo new posts/my-first-post.md
```

6. 在GitHub上创建仓库
- 登录您的GitHub账号 (michaelwang123)
- 创建一个新的仓库，命名为 `michaelwang123.github.io`
- 这个仓库名称必须严格遵循这个格式

7. 配置GitHub Actions自动部署
在项目根目录创建 `.github/workflows/hugo.yml`：
```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: recursive
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
      - name: Build
        run: hugo --minify
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

8. 推送代码到GitHub
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/michaelwang123/michaelwang123.github.io.git
git push -u origin main
```

9. 启用GitHub Pages
- 进入您的仓库设置 (https://github.com/michaelwang123/michaelwang123.github.io/settings)
- 找到Pages设置
- 选择 "GitHub Actions" 作为部署来源
- 等待部署完成

本地预览：
```bash
hugo server -D
```

完成这些步骤后，您的博客将会在 `https://michaelwang123.github.io` 上线。

注意事项：
1. 确保Git配置了正确的SSH密钥
2. 文章使用Markdown格式编写，放在 `content/posts` 目录下
3. 本地预览时可以实时查看更改效果
4. 推送到main分支后，GitHub Actions会自动构建和部署
5. 如果遇到部署问题，可以查看Actions页面的构建日志

建议：
1. 可以定制 `config.toml` 添加更多个性化设置
2. 考虑添加评论系统（如Disqus）
3. 可以设置自定义域名
4. 定期备份您的博客内容

        