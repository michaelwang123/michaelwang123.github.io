const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function convertWebToPDF() {
  console.log('🚀 启动浏览器...');
  
  // 启动浏览器 - 使用系统Chrome
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-extensions'
    ]
  });

  try {
    const page = await browser.newPage();
    
    // 设置视口大小
    await page.setViewport({
      width: 1280,
      height: 720,
      deviceScaleFactor: 1
    });

    console.log('📄 访问网站: https://michaelwang123.github.io/posts/myself/');
    
    // 访问网站
    await page.goto('https://michaelwang123.github.io/posts/myself/', {
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 30000
    });

    // 等待页面完全加载
    console.log('⏳ 等待页面完全加载...');
    await page.waitForTimeout(3000);

    // 强制设置为暗色主题
    console.log('🌙 设置暗色主题...');
    await page.evaluate(() => {
      // 检查是否有主题切换功能
      const themeToggle = document.querySelector('#theme-toggle');
      if (themeToggle) {
        // 如果当前不是暗色主题，则切换
        const currentTheme = document.documentElement.getAttribute('data-theme') || 
                           (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        if (currentTheme !== 'dark') {
          themeToggle.click();
        }
      }
      
      // 强制设置暗色主题相关的类和属性
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      
      // 设置localStorage确保主题持久化
      if (typeof Storage !== 'undefined') {
        localStorage.setItem('pref-theme', 'dark');
      }
    });

    // 等待主题切换生效
    await page.waitForTimeout(1000);

    // 移除可能影响PDF的元素
    await page.evaluate(() => {
      // 移除滚动条
      document.documentElement.style.overflow = 'visible';
      document.body.style.overflow = 'visible';
      
      // 移除可能的固定定位元素
      const fixedElements = document.querySelectorAll('*');
      fixedElements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.position === 'fixed' || style.position === 'sticky') {
          el.style.position = 'relative';
        }
      });
    });

    console.log('📑 生成PDF...');

    // 获取当前日期
    const now = new Date();
    const dateStr = now.toLocaleDateString('zh-CN');
    const fileName = `Michael博客_暗色主题_${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2,'0')}${now.getDate().toString().padStart(2,'0')}.pdf`;

    // 生成PDF
    await page.pdf({
      path: fileName,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666;">
          <span style="margin-left: 20px;">Michael的技术博客</span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666; display: flex; justify-content: space-between; padding: 0 20px;">
          <span>生成日期: ${dateStr}</span>
          <span>第 <span class="pageNumber"></span> 页 / 共 <span class="totalPages"></span> 页</span>
          <span>https://michaelwang123.github.io/posts/myself/</span>
        </div>
      `,
      preferCSSPageSize: false,
    });

    console.log(`✅ PDF生成成功: ${fileName}`);
    console.log(`📁 文件位置: ${path.resolve(fileName)}`);
    
    // 获取文件大小
    const stats = fs.statSync(fileName);
    const fileSizeInMB = (stats.size / (1024*1024)).toFixed(2);
    console.log(`📊 文件大小: ${fileSizeInMB} MB`);

  } catch (error) {
    console.error('❌ 转换失败:', error.message);
  } finally {
    await browser.close();
    console.log('🔚 浏览器已关闭');
  }
}

// 执行转换
convertWebToPDF(); 