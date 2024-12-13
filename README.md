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

```css
/* 通用样式 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    cursor: none; /* 隐藏默认光标 */
}

/* 页面加载时 */
body {
    font-family: Arial, sans-serif;
    height: 100%;
    overflow-x: hidden;
    opacity: 0;
    transition: opacity 0.5s ease;
    cursor: none; /* 隐藏默认光标 */
}

body.loaded {
    opacity: 1;
}


/* 自定义光标样式 */
.cursor {
    position: fixed;
    width: 10px;
    height: 10px;
    background-color: rgb(0, 0, 0);  /* 默认光标颜色 */
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;  /* 反转光标下方区域的颜色 */
    filter: invert(1);  /* 反转颜色（负片效果） */
    transition: width 0.3s ease, height 0.3s ease, transform 0.3s ease;  /* 动态调整光标大小 */
}

/* 鼠标悬浮在可点击元素时，光标放大 */
button:hover .cursor, a:hover .cursor, img:hover .cursor {
    transform: scale(2);  /* 放大光标 */
    width: 20px;  /* 放大后的光标宽度 */
    height: 20px;  /* 放大后的光标高度 */
}

/* 图片容器不放大光标 */
.image-container, .image-container img {
    pointer-events: none; /* 禁用光标事件，让这些元素不触发光标放大效果 */
}

/* 顶栏样式 */
header {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    padding: 22px 180px;
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
}

.social-icon {
    width: 24px;
    height: 24px;
    transition: transform 0.2s ease;
    vertical-align: middle;
    transform: translateY(-2px);
}

.social-icon:hover {
    transform: scale(1.1) translateY(-2px);
}

.logo {
    height: 45px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    z-index: 10;
    left: 8%;
    top: 1%; /* 或者设置一个合适的值 */
}


/* 右侧内容 */
.header-right {
    margin-left: auto; /* 推动右侧内容到右边 */
}

.header-right a {
    color: black;
    text-decoration: none;
    margin-left: 15px;
    font-weight: bold;
}

.header-right a:hover {
    text-decoration: underline;
}

/* 图片展示部分 */
.image-section {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.image-container {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    opacity: 1;
    transition: opacity 1s ease-in-out;
    position: absolute;
}

.image-container img.hidden {
    opacity: 0;
}

/* 图片切换按钮 */
button {
    position: absolute;
    top: 50%;
    background: none;  /* 去掉背景色 */
    color: rgba(255, 255, 255, 0.801);
    font-size: 28px;
    border: none;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease; /* 轻微的缩放效果 */
}

button:active {
    transform: scale(0.9); /* 点击时稍微缩小 */
}

.prev-button {
    left: 20px;
}

.next-button {
    right: 20px;
}

/* 内容部分 */
.content-section {
    padding: 60px 300px;
    background-color: #f5f5f5;
    display: grid;
    grid-template-columns: repeat(2, 1fr);  /* 每行显示两张图片 */
    gap: 20px;  /* 图片之间的间距 */
    justify-items: center;  /* 居中对齐图片 */
}

.content-item {
    display: flex;
    flex-direction: column;
    align-items: center;  /* 使图片和文字居中 */
    text-align: center;
}

.content-image {
    width: 100%;
    height: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);  /* 阴影效果 */
    transition: transform 0.3s ease, box-shadow 0.3s ease;  /* 平滑的过渡效果 */
}

.content-image:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);  /* 悬停时阴影效果加深 */
}

.content-description {
    margin-top: 10px;  /* 图片和文字之间的间距 */
    font-size: 14px;  /* 文字大小 */
    color: #777;  /* 浅灰色文字 */
    font-family: 'Arial', sans-serif;  /* 字体 */
    line-height: 1.5;  /* 行间距 */
    max-width: 80%;  /* 控制文字最大宽度 */
}


/* 移动端适配 */
@media (max-width: 768px) {
    .cursor {
        display: none;  /* 移动端设备隐藏自定义光标 */
    }

    .content-section {
        padding: 40px 10px;  /* 减小上下左右的间距 */
        grid-template-columns: 1fr;  /* 每行显示一张图片 */
    }

    .content-description {
        font-size: 12px;  /* 更小的文字 */
        line-height: 1.4;  /* 更紧凑的行间距 */
        max-width: 100%;  /* 文字区域占满宽度 */
    }

    .content-image {
        max-width: 90%;  /* 更严格限制图片最大宽度 */
    }

    .image-container {
        width: 100vw;  /* 容器宽度为视口宽度 */
        height: 100vh; /* 容器高度为视口高度 */
        display: flex;
        justify-content: center;  /* 水平居中对齐 */
        align-items: center;      /* 垂直居中对齐 */
        overflow: hidden;         /* 防止超出容器的部分 */
    }

    .image-container img {
        transform: rotate(90deg);  /* 旋转图片90度 */
        width: auto;               /* 宽度自适应 */
        height: auto;              /* 高度自适应 */
        max-width: 218%;           /* 最大宽度为容器的宽度 */
        object-fit: cover;        /* 保持原比例且完整显示 */
    }

    /* 显示一个切换按钮，位于右上角 */
    .menu-toggle {
        position: absolute;  /* 更改为 absolute */
        top: 15px;
        right: 15px;
        --color: #ffffff;
        width: 36px;
        height: 36px;
        padding: 20px;
        margin: 0;
        outline: none;
        border: none;
        background: none;
        cursor: pointer;
        z-index: 101;
        mix-blend-mode: difference;  /* 反转光标下方区域的颜色 */
        -webkit-tap-highlight-color: transparent;
        svg {
            width: 64px;
            height: 48px;
            top: 8px;
            left: -20px;
            stroke: var(--color);
            stroke-width: 2px;
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
            display: block;
            position: absolute;
            mix-blend-mode: difference;  /* 反转光标下方区域的颜色 */
            path {
                transition: stroke-dasharray var(--duration, .85s) var(--easing, ease) var(--delay, 0s), stroke-dashoffset var(--duration, .85s) var(--easing, ease) var(--delay, 0s);
                stroke-dasharray: var(--array-1, 26px) var(--array-2, 100px);
                stroke-dashoffset: var(--offset, 126px);
                transform: translateZ(0);
                &:nth-child(2) {
                    --duration: .7s;
                    --easing: ease-in;
                    --offset: 100px;
                    --array-2: 74px;
                }
                &:nth-child(3) {
                    --offset: 133px;
                    --array-2: 107px;
                }
            }
        }
    }

    .menu-toggle.active {
        svg {
            path {
                --offset: 57px;
                &:nth-child(1),
                &:nth-child(3) {
                    --delay: .15s;
                    --easing: cubic-bezier(.2, .4, .2, 1.1);
                }
                &:nth-child(2) {
                    --duration: .4s;
                    --offset: 2px;
                    --array-1: 1px;
                }
                &:nth-child(3) {
                    --offset: 58px;
                }
            }
        }
    }

    /* 按钮点击后禁用滚动的样式 */
    body.no-scroll {
        overflow: hidden;
    }

    /* 顶栏默认状态，保持隐藏 */
    header {
        visibility: hidden; /* 默认隐藏顶栏 */
        background-color: #fff; /* 保证背景为白色 */
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 100vh;
        display: flex;
        flex-direction: column; /* 竖向排列 */
        justify-content: center; /* 内容居中 */
        align-items: center;
        z-index: 100;
        padding: 30px 0; /* 调整竖向排列的内边距 */
        opacity: 0;  /* 初始透明度为0 */
        transition: transform 0.5s ease, opacity 0.5s ease, visibility 0s 0.5s; /* 添加过渡效果 */
    }

    /* 顶栏显示时的样式 */
    .show-header header {
        visibility: visible;  /* 顶栏可见 */
        transform: translateY(0);  /* 顶栏显示 */
        opacity: 1;  /* 顶栏完全可见 */
        transition: transform 0.5s ease, opacity 0.5s ease, visibility 0s; /* 添加过渡效果 */
    }

    /* 保持 header-left 始终显示 */
    .logo {
        position: absolute;  /* 更改为 absolute */
        top: 25px;  /* 距离顶部一定间距 */
        left: 25px; /* 距离左侧一定间距 */
        z-index: 200;  /* 确保社交图标在顶层，不会被其他内容遮挡 */
    }

    /* 其他社交图标、图片展示部分等的样式保持不变 */
    .social-icon {
        position: fixed; /* 使用固定定位 */
        bottom: 30px; /* 距离底部20px */
        right: 30px;  /* 距离右侧20px */
    }

    .image-section {
        height: 100vh;  /* 确保图片部分在移动端满屏显示 */
    }

    /* 右侧内容 */
    .header-right {
        margin-left: 0; /* 禁用 margin-left: auto */
    }

    .header-right a {
        display: block;
        margin-bottom: 20px;  /* 每个链接竖着排列 */
        text-align: center;
    }

    /* 加载动画 */
    #loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);  /* 背景为黑色透明 */
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease-out;  /* 动画淡出效果 */
    }

    .loader-spinner {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(45deg, #3498db, #2ecc71);  /* 渐变背景 */
        animation: pulse 1.5s infinite ease-in-out;  /* 缩放动画 */
    }

    /* 缩放效果 */
    @keyframes pulse {
        0%, 100% {
            transform: scale(0.8);
            opacity: 0.7;
        }
        50% {
            transform: scale(1);
            opacity: 1;
        }
    }
}



}

```js
let currentImageIndex = 0;

// 处理图片切换功能
function changeImage(direction) {
    const images = document.querySelectorAll('.image-container img');  // 获取所有图片
    images[currentImageIndex].classList.add('hidden');  // 当前图片淡出

    // 更新图片索引
    currentImageIndex += direction;

    // 确保索引循环
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }

    // 让下一个图片淡入
    images[currentImageIndex].classList.remove('hidden');
}

// 监听滚动事件以处理动态效果
document.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;

    // 如果页面滚动超过一定距离，触发其他内容的显示
    const contentSection = document.querySelector('.content-section');
    if (scrollPosition > 0) {
        contentSection.style.opacity = 1;
        contentSection.style.transform = 'translateY(0)';
    } else {
        contentSection.style.opacity = 0;
        contentSection.style.transform = 'translateY(50px)';
    }
});

// 页面加载完成后隐藏加载动画
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';  // 逐渐淡出加载动画
    setTimeout(() => {
        loader.style.display = 'none';  // 隐藏加载动画
    }, 300);  // 延时以确保动画效果完成

    document.body.classList.add('loaded');  // 页面内容淡入
});

// 获取光标元素
const cursor = document.querySelector('.cursor');

// 监听鼠标移动事件
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // 设置光标的位置
    cursor.style.left = `${mouseX - cursor.offsetWidth / 2}px`;
    cursor.style.top = `${mouseY - cursor.offsetHeight / 2}px`;
});

// 鼠标悬浮在按钮、链接等元素时放大光标
const clickableElements = document.querySelectorAll('button, a, img, .header-left, .logo');

// 确保只有这些元素会放大光标，避免 image-container 放大
clickableElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.width = '20px';  // 放大后的宽度
        cursor.style.height = '20px'; // 放大后的高度
    });
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.width = '10px';  // 恢复光标宽度
        cursor.style.height = '10px'; // 恢复光标高度
    });
});

// 排除 image-container 的影响
const imageContainer = document.querySelector('.image-container');
imageContainer.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.width = '10px';  // 恢复默认光标大小
    cursor.style.height = '10px';
});

// 判断设备类型并隐藏光标（移动设备）
if (/Mobi|Android/i.test(navigator.userAgent)) {
    if (cursor) {
        cursor.style.display = 'none';  // 在移动设备上隐藏光标
    }
}

// 菜单按钮点击效果
document.querySelectorAll('.menu-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        document.body.classList.toggle('show-header');
        btn.classList.toggle('active');
    });
});

// 禁止页面滚动的功能
document.querySelectorAll('.menu-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        // 切换滚动禁用
        document.body.classList.toggle('no-scroll');
    });
});

}
