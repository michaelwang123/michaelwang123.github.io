#!/bin/bash

# Git代理管理脚本
# 使用方法：./git-proxy-manager.sh [enable|disable|status]

PROXY_HOST="127.0.0.1"
PROXY_PORT="7890"
PROXY_URL="http://${PROXY_HOST}:${PROXY_PORT}"

case "$1" in
    enable)
        echo "启用GitHub代理..."
        git config --global http.https://github.com.proxy $PROXY_URL
        echo "已启用GitHub代理: $PROXY_URL"
        ;;
    disable)
        echo "禁用GitHub代理..."
        git config --global --unset http.https://github.com.proxy
        echo "已禁用GitHub代理"
        ;;
    status)
        echo "当前代理配置:"
        git config --list | grep proxy || echo "未配置代理"
        ;;
    *)
        echo "使用方法: $0 [enable|disable|status]"
        echo "  enable  - 启用GitHub代理"
        echo "  disable - 禁用GitHub代理"
        echo "  status  - 查看当前代理状态"
        ;;
esac 