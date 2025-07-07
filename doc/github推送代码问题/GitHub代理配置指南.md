# GitHub代理配置指南

## 1. 为什么需要使用代理访问GitHub？

### 1.1 网络访问限制
- **地理位置限制**：在中国大陆，GitHub的访问经常受到网络限制，导致连接不稳定
- **DNS解析问题**：GitHub的域名解析可能被干扰，导致无法正常访问
- **连接超时**：直接连接GitHub服务器经常出现超时问题

### 1.2 常见问题表现
- `git clone` 命令执行缓慢或失败
- `git push` 和 `git pull` 操作超时
- 网页访问GitHub时加载缓慢
- 出现 "Failed to connect to github.com port 443" 错误

### 1.3 使用代理的好处
- **稳定连接**：通过代理服务器建立稳定的GitHub连接
- **提高速度**：减少网络延迟，提高访问速度
- **解决限制**：绕过地理位置和网络限制

## 2. 如何使用代理？

### 2.1 前提条件
- 已安装并运行代理软件（如FlClash、Clash等）
- 确认代理软件的端口号（通常为7890）

### 2.2 检查代理软件状态

```bash
# 检查代理端口是否在运行
lsof -i :7890

# 查看当前Git配置
git config --list | grep proxy
```

### 2.3 配置方法

#### 方法一：仅为GitHub配置代理（推荐）

```bash
# 为GitHub域名配置代理
git config --global http.https://github.com.proxy http://127.0.0.1:7890

# 验证配置
git config --list | grep proxy
```

#### 方法二：配置全局Git代理

```bash
# 配置全局HTTP代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

#### 方法三：使用代理管理脚本

创建代理管理脚本 `git-proxy-manager.sh`：

```bash
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
```

使用脚本：

```bash
# 添加执行权限
chmod +x git-proxy-manager.sh

# 启用代理
./git-proxy-manager.sh enable

# 查看状态
./git-proxy-manager.sh status

# 禁用代理
./git-proxy-manager.sh disable
```

### 2.4 测试配置

```bash
# 测试Git操作
git push origin main

# 或者测试克隆
git clone https://github.com/username/repository.git
```

### 2.5 取消代理配置

```bash
# 取消GitHub专用代理
git config --global --unset http.https://github.com.proxy

# 取消全局代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 3. 常见问题解决

### 3.1 代理端口问题
如果7890端口不可用，可以：
1. 检查代理软件设置，确认正确的端口号
2. 修改配置中的端口号：
   ```bash
   git config --global http.https://github.com.proxy http://127.0.0.1:你的端口号
   ```

### 3.2 连接仍然失败
1. 确认代理软件正在运行
2. 检查代理软件的代理模式设置
3. 尝试重启代理软件

### 3.3 部分操作正常，部分失败
这通常是因为只配置了HTTP代理，可以尝试：
```bash
# 同时配置HTTP和HTTPS
git config --global http.https://github.com.proxy http://127.0.0.1:7890
git config --global https.https://github.com.proxy http://127.0.0.1:7890
```

## 4. 最佳实践

1. **推荐使用GitHub专用代理**：只对GitHub使用代理，不影响其他Git仓库
2. **定期检查代理状态**：确保代理软件正常运行
3. **备份配置**：记录有效的代理配置，便于重新设置
4. **测试验证**：配置后及时测试Git操作是否正常

## 5. 注意事项

- 代理配置是全局的，会影响所有Git仓库操作
- 如果代理软件关闭，需要取消代理配置或重新启动代理软件
- 不同的代理软件可能使用不同的端口号，需要根据实际情况调整
- 配置后首次使用可能需要等待几秒钟建立连接

---

*本指南基于FlClash代理软件编写，适用于macOS系统。其他代理软件和系统可能需要相应调整。* 