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
