#!/bin/bash

# 安装 Go
curl -OL https://golang.org/dl/go1.22.1.linux-amd64.tar.gz
rm -rf /usr/local/go
tar -C /usr/local -xzf go1.22.1.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin

# 安装 Hugo
curl -L https://github.com/gohugoio/hugo/releases/download/v0.123.8/hugo_extended_0.123.8_linux-amd64.tar.gz -o hugo.tar.gz
tar -xzf hugo.tar.gz
mv hugo /usr/local/bin/

# 构建网站
go mod download
hugo --gc --minify 