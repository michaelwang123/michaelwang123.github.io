#!/bin/bash

echo "🚀 开始部署到Gitee Pages..."

# 1. 构建Hugo网站
echo "📦 构建Hugo网站..."
hugo --minify

# 2. 检查构建是否成功
if [ $? -ne 0 ]; then
    echo "❌ Hugo构建失败"
    exit 1
fi

# 3. 提交所有更改
echo "📝 提交更改..."
git add .
git commit -m "Update blog content $(date '+%Y-%m-%d %H:%M:%S')"

# 4. 推送到GitHub（保持同步）
echo "🔄 推送到GitHub..."
git push origin main

# 5. 推送到Gitee
echo "🚀 推送到Gitee..."
git push gitee main

# 6. 提示手动启用Gitee Pages
echo ""
echo "✅ 代码已推送到Gitee"
echo "📋 接下来请手动操作："
echo "   1. 访问：https://gitee.com/michaelwang123/michaelwang123.github.io"
echo "   2. 点击 '服务' -> 'Gitee Pages'"
echo "   3. 选择 'main' 分支"
echo "   4. 部署目录选择 'public'"
echo "   5. 点击 '启动' 或 '更新'"
echo ""
echo "🌐 Gitee Pages地址将是："
echo "   https://michaelwang123.gitee.io"
echo ""
echo "🎉 部署完成！" 