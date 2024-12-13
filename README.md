## 项目简介：自定义光标与图片展示网站

![图片展示](https://cllli.oss-cn-beijing.aliyuncs.com/Cli/2.png)

## 项目概述

该项目是一个互动性强的网页，结合了自定义光标、图片展示、动态滚动效果以及页面加载动画。其主要特点是提升用户交互体验，适用于个人作品集、摄影展示网站、艺术项目页面等。通过自定义的视觉效果和功能，让页面充满动感。

### 核心功能

1. **自定义光标**
   - 隐藏默认光标，显示一个圆形的自定义光标。
   - 光标在用户悬停在可点击元素（如按钮、链接、图片）时放大，增强视觉互动效果。
   - 移动设备上自动隐藏自定义光标，避免干扰。

2. **图片展示与切换**
   - 支持多张图片展示，用户可以通过左右按钮切换图片，切换时采用淡入淡出动画效果。
   - 图片切换支持循环，确保用户无论点击多少次都能返回到合适的图片。

3. **动态滚动效果**
   - 当用户滚动页面时，页面内容逐渐显现，利用 CSS 的平滑过渡效果控制内容的出现与隐藏，提升页面的互动感。

4. **页面加载动画**
   - 页面加载时，显示一个渐变缩放的加载动画，加载完成后，页面内容以平滑淡入效果展示。

5. **响应式设计**
   - 使用媒体查询确保页面在不同屏幕尺寸下均能良好显示，特别是优化了移动端用户体验。

## 技术栈

- **HTML5**：负责页面结构，定义页面元素如图片、按钮、导航等。
- **CSS3**：用于页面样式，涵盖自定义光标、图片展示、加载动画等视觉效果。
- **JavaScript**：实现页面的交互功能，包括图片切换、滚动事件处理、自定义光标行为。

## 核心技术实现

### 1. **自定义光标**
使用 CSS 和 JavaScript 控制光标的外观和行为。当鼠标悬浮在指定元素上时，光标会放大，并且具有动态过渡效果。

```html
/* 自定义光标样式 */
.cursor {
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8"> <!-- 设置字符编码为UTF-8 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- 适配移动端视口 -->
    <title>Cllli</title> <!-- 网页标题 -->
    <link rel="stylesheet" href="styles.css"> <!-- 引入外部CSS样式 -->
    <link rel="icon" href="https://cllli.oss-cn-beijing.aliyuncs.com/logo/logo.png" type="image/x-icon"> <!-- 网站图标 -->
</head>
<body>
    <!-- 页面加载动画 -->
    <div id="loader">
        <div class="loader-spinner"></div> <!-- 加载动画样式 -->
    </div>

    <!-- 自定义光标 -->
    <div class="cursor"></div> <!-- 定义自定义光标 -->

    <!-- 顶部导航栏 -->
    <div class="logo">
        <!-- SVG图标 -->
        <svg viewBox="0 0 200 200">
            <path class="cls-1" d="M.15,93.14c0-28.97.16-57.94-.15-86.91C..."/>
            <path class="cls-1" d="M39.33,93.02c0-29.11,0-58.21-.01-87.32,0-3.05..."/>
            <path class="cls-1" d="M89.96,92.53c0-29.11.03-58.22-.04-87.32,0-3.15..."/>
            <path class="cls-1" d="M73.48,93.07c0,29.3-.03,58.6.04,87.89,0,3.12..."/>
            <path class="cls-2" fill="#fa0202" d="M124.03,11.96c0,2.33-.31,4.71.06,6.98..."/>
        </svg>
    </div>
    
    <!-- 页面头部右侧的导航链接 -->
    <header>
        <div class="header-right">
            <a href="https://photography.cllli.com/" target="_blank">photograph</a> <!-- 链接到摄影页面 -->
            <a href="https://tv.cllli.com/" target="_blank">TV</a> <!-- 链接到TV页面 -->
            <a href="https://www.instagram.com/shutterbug.xiang/profilecard/?igsh=dHJrZGtqZ2NiOTJ2" target="_blank">
                <img src="https://cllli.oss-cn-beijing.aliyuncs.com/logo/ins.svg" alt="Instagram" class="social-icon"> <!-- Instagram图标 -->
            </a>
        </div>
    </header>

    <!-- 移动端的菜单按钮 -->
    <button class="menu-toggle">
        <svg viewBox="0 0 64 48">
            <path  d="M19,15 L45,15 C70,15 58,-2 49.0177126,7 L19,37"></path>
            <path  d="M19,24 L45,24 C61.2371586,24 57,49 41,33 L32,24"></path>
            <path  d="M45,33 L19,33 C-8,33 6,-2 22,14 L45,37"></path>
        </svg>
    </button>

    <main>
        <!-- 图片展示部分 -->
        <section class="image-section">
            <div class="image-container">
                <!-- 多张图片，使用不同的类名来控制显示与隐藏 -->
                <img src="https://cllli.oss-cn-beijing.aliyuncs.com/images/20241207-2L5A8057.jpg" alt="展示图片" class="image visible">
                <img src="https://cllli.oss-cn-beijing.aliyuncs.com/images/f.jpg" alt="展示图片" class="image hidden">
                <img src="https://cllli.oss-cn-beijing.aliyuncs.com/images/20241207-2L5A8053.jpg" alt="展示图片" class="image hidden">
                <img src="https://cllli.oss-cn-beijing.aliyuncs.com/images/de89e175964ea370db482c82d9fcdd16.jpg" alt="展示图片" class="image hidden">
            </div>
        </section>

        <!-- 图片切换按钮 -->
        <button class="prev-button" onclick="changeImage(-1)">&#10094;</button> <!-- 上一张图片按钮 -->
        <button class="next-button" onclick="changeImage(1)">&#10095;</button> <!-- 下一张图片按钮 -->

        <!-- 内容部分 -->
        <section class="content-section">
            <!-- 每个内容项包含一张图片和一个描述 -->
            <div class="content-item">
                <img src="https://cllli.oss-cn-beijing.aliyuncs.com/img/7de5319f1cbed15a88fb7914f4332d8d.jpg" alt="Image 3" class="content-image">
                <p class="content-description">泊霞湾</p>
            </div>
            <div class="content-item">
                <img src="https://cllli.oss-cn-beijing.aliyuncs.com/img/e930c42a931d586517b928ff4ce93850.jpg" alt="Image 4" class="content-image">
                <p class="content-description">无题</p>
            </div>
            <div class="content-item">
                <img src="https://cllli.oss-cn-beijing.aliyuncs.com/images/3.jpg" alt="Image 4" class="content-image">
                <p class="content-description">老铁山</p>
            </div>
            <div class="content-item">
                <img src="https://cllli.oss-cn-beijing.aliyuncs.com/img/f44f9ac111d05c024a97de87b0817f2b.jpg" alt="Image 3" class="content-image">
                <p class="content-description">富国公园</p>
            </div>

        </section>
    </main>

    <script src="script.js"></script> <!-- 引入外部JS脚本 -->
</body>
</html>

}


}
