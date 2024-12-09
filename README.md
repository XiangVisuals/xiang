## 项目简介：自定义光标与图片展示网站

这是一个具有自定义光标、图片展示、滚动动态效果和加载动画的网页项目。该项目包含以下主要功能：

### 1. **自定义光标**
- 页面加载时，隐藏默认的鼠标光标，使用一个自定义的圆形光标。
- 当鼠标悬停在可点击元素（如按钮、链接和图片）上时，光标会放大，提升用户互动体验。
- 对于图片展示部分，光标保持默认大小，避免与展示内容发生干扰。

### 2. **图片展示与切换**
- 页面展示了一个图片容器，用户可以点击左右按钮进行图片切换。
- 图片切换采用淡入淡出效果，支持循环切换。
- 用户在页面上滚动时，页面内容会逐渐显现，从下到上的平滑过渡效果，增强了动态效果。

### 3. **页面加载动画**
- 当页面加载时，显示一个加载动画，使用 CSS 动画使加载图标缩放并渐变消失。
- 加载完成后，页面的主要内容会以平滑的淡入效果显示出来。

### 4. **滚动事件动态效果**
- 在用户滚动页面时，特定的内容区域（如 `.content-section`）会根据滚动位置进行动态显示或隐藏，从而增强页面的互动性和可视效果。

### 5. **移动设备适配**
- 对于移动设备，页面隐藏自定义光标，以提高使用体验。
- 图片展示和内容排版通过 CSS 媒体查询进行优化，以确保页面在不同设备上的表现。

## 主要技术

- **HTML**：用于创建页面结构，包含图片展示、导航栏、按钮等。
- **CSS**：用于样式设计，涵盖了自定义光标、图片展示、页面加载动画等效果。
- **JavaScript**：实现了图片切换、页面加载动画的控制、滚动事件的处理以及自定义光标行为。

## 关键特性

- **平滑过渡效果**：图片切换、页面内容显示都采用了 CSS 动画和过渡效果，使整个页面交互更加流畅。
- **自定义光标**：提供了与众不同的用户交互体验，通过自定义光标响应用户的操作。
- **滚动触发的动画效果**：滚动页面时，内容会根据滚动距离逐渐显示，带来更好的视觉效果。
- **响应式设计**：通过媒体查询确保该网页在不同尺寸的屏幕上显示良好，特别适配移动端设备。

## 使用场景

- 适合用作个人摄影网站、作品集展示、艺术项目页面等。
- 支持高度定制，用户可以根据需求调整图片展示样式、光标效果、页面加载动画等。

## 示例截图

![图片展示](https://cllli.oss-cn-beijing.aliyuncs.com/images/1.jpg)

## 代码示例

### HTML

```html
<body>
    <!-- 页面加载动画 -->
    <div id="loader">
        <div class="loader-spinner"></div>
    </div>
    <!-- 自定义光标 -->
    <div class="cursor"></div>
    <!-- 顶部导航栏 -->
    <header>
        <div class="header-left">
            <img src="logo.png" alt="Logo" class="logo">
        </div>
        <div class="header-right">
            <a href="https://photography.cllli.com/">photograph</a>
            <a href="https://tv.cllli.com/">TV</a>
        </div>
    </header>

    <main>
        <section class="image-section">
            <div class="image-container">
                <img src="image1.jpg" alt="展示图片" class="image visible">
                <img src="image2.jpg" alt="展示图片" class="image hidden">
            </div>
        </section>
        <!-- 图片切换按钮 -->
        <button class="prev-button" onclick="changeImage(-1)">&#10094;</button>
        <button class="next-button" onclick="changeImage(1)">&#10095;</button>
    </main>
</body>
