let currentImageIndex = 0;

// 动态创建并插入 @keyframes 动画规则
function injectZoomKeyframes() {
    const style = document.createElement('style');
    style.type = 'text/css';

    // 定义动画规则
    const keyframes = `
        @keyframes zoom {
            0% {
                transform: scale(1); /* 原始大小 */
            }
            100% {
                transform: scale(1.005); /* 轻微放大 */
            }
        }
        .zoom-animation {
            animation: zoom 5s infinite alternate ease-in-out; /* 应用动画 */
        }

        /* 移动端图片旋转效果 */
        @media screen and (max-width: 768px) {
            .rotate-mobile {
                transform: rotate(90deg) !important; /* 强制旋转90度 */
                transition: transform 0.3s ease; /* 添加平滑过渡 */
            }
        }
    `;

    style.innerHTML = keyframes; // 设置动画规则
    document.head.appendChild(style); // 插入到 <head>
}

// 应用背景缩放动画
function applyZoomEffectToImages() {
    const images = document.querySelectorAll('.image-container img'); // 获取所有图片
    images.forEach(img => {
        img.classList.add('zoom-animation'); // 添加动画类
    });
}

// 为移动端添加图片旋转效果
function applyRotationEffectOnMobile() {
    const images = document.querySelectorAll('.image-container img'); // 获取所有图片
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        // 为移动端设备上的图片添加旋转类
        images.forEach(img => {
            img.classList.add('rotate-mobile');
        });
    }
}

// 初始化缩放动画和旋转效果
function initializeEffects() {
    injectZoomKeyframes();
    applyZoomEffectToImages();
    applyRotationEffectOnMobile();
}

document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll('.image-container img');
    let currentIndex = Math.floor(Math.random() * images.length); // 生成随机索引

    // 隐藏所有图片
    images.forEach(img => img.classList.add('hidden'));

    // 仅显示随机选中的图片
    images[currentIndex].classList.remove('hidden');

    // 每隔15秒切换背景图片
    setInterval(() => {
        // 隐藏当前图片
        images[currentIndex].classList.add('hidden');

        // 更新索引到下一张图片
        currentIndex = (currentIndex + 1) % images.length;

        // 显示下一张图片
        images[currentIndex].classList.remove('hidden');
    }, 20000); // 20秒
});


// 监听滚动事件以处理动态效果
document.addEventListener('scroll', function () {
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
window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0'; // 逐渐淡出加载动画
    setTimeout(() => {
        loader.style.display = 'none'; // 隐藏加载动画
    }, 300); // 延时以确保动画效果完成

    document.body.classList.add('loaded'); // 页面内容淡入

    // 初始化缩放动画和旋转效果
    initializeEffects();
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
const clickableElements = document.querySelectorAll('a, img, .header-left, .header-title, .about-text h1, .about-text h2, .about-text p');

// 确保只有这些元素会放大光标，避免 image-container 放大
clickableElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.width = '20px'; // 放大后的宽度
        cursor.style.height = '20px'; // 放大后的高度
    });
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.width = '10px'; // 恢复光标宽度
        cursor.style.height = '10px'; // 恢复光标高度
    });
});

// 排除 image-container 的影响
const imageContainer = document.querySelector('.image-container');
imageContainer.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.width = '10px'; // 恢复默认光标大小
    cursor.style.height = '10px';
});

// 判断设备类型并隐藏光标（移动设备）
if (/Mobi|Android/i.test(navigator.userAgent)) {
    if (cursor) {
        cursor.style.display = 'none'; // 在移动设备上隐藏光标
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
