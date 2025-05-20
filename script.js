// 页面加载完成后使用 GSAP 淡出加载动画
window.addEventListener('load', function () {
  const loader = document.getElementById('loader');
  gsap.to(loader, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      loader.style.display = 'none';
    }
  });
  document.body.classList.add('loaded');
  initializeEffects();
});

// 用 ScrollTrigger 优化 content-section 的滚动动画
const contentSection = document.querySelector('.content-section');
if (contentSection && typeof gsap !== 'undefined') {
  gsap.fromTo(
    contentSection,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: contentSection,
        start: "top 80%",   // 当 content-section 顶部到达视口 80% 位置时开始
        end: "top 20%",     // 结束位置
        scrub: true         // 根据滚动进度同步动画
      }
    }
  );
}

// 其他代码保持原样...
let currentImageIndex = 0;
// 动态创建并插入 @keyframes 动画规则
function injectZoomKeyframes() {
  const style = document.createElement('style');
  style.type = 'text/css';
  const keyframes = `
    @keyframes zoom {
      0% { transform: scale(1); }
      100% { transform: scale(1.005); }
    }
    .zoom-animation {
      animation: zoom 5s infinite alternate ease-in-out;
    }
    @media screen and (max-width: 768px) {
      .rotate-mobile {
        transform: rotate(90deg) !important;
        transition: transform 0.3s ease;
      }
    }
  `;
  style.innerHTML = keyframes;
  document.head.appendChild(style);
}

function applyZoomEffectToImages() {
  const images = document.querySelectorAll('.image-container img');
  images.forEach(img => {
    img.classList.add('zoom-animation');
  });
}

function applyRotationEffectOnMobile() {
  const images = document.querySelectorAll('.image-container img');
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    images.forEach(img => {
      img.classList.add('rotate-mobile');
    });
  }
}

function initializeEffects() {
  injectZoomKeyframes();
  applyZoomEffectToImages();
  applyRotationEffectOnMobile();
}

document.addEventListener("DOMContentLoaded", function () {
  let images = document.querySelectorAll('.image-container img');
  let currentIndex = Math.floor(Math.random() * images.length);
  images.forEach(img => img.classList.add('hidden'));
  images[currentIndex].classList.remove('hidden');

  setInterval(() => {
    images[currentIndex].classList.add('hidden');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.remove('hidden');
  }, 20000);
});

// 光标移动效果保持原有实现...
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  cursor.style.left = `${mouseX - cursor.offsetWidth / 2}px`;
  cursor.style.top = `${mouseY - cursor.offsetHeight / 2}px`;
});
const clickableElements = document.querySelectorAll('a, img, .header-left, .header-title, .about-text h1, .about-text h2, .about-text p, .sample-text');
clickableElements.forEach((element) => {
  element.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
  });
  element.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.width = '10px';
    cursor.style.height = '10px';
  });
});
const imageContainer = document.querySelector('.image-container');
imageContainer.addEventListener('mouseenter', () => {
  cursor.style.transform = 'scale(1)';
  cursor.style.width = '10px';
  cursor.style.height = '10px';
});
if (/Mobi|Android/i.test(navigator.userAgent)) {
  if (cursor) {
    cursor.style.display = 'none';
  }
}
document.querySelectorAll('.menu-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    document.body.classList.toggle('show-header');
    btn.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });
});

// GSAP 横向滚动
gsap.registerPlugin(ScrollTrigger);
const initHorizontalScroll = () => {
  gsap.utils.toArray('section').forEach((section, index) => {
  const wrapper = section.querySelector('.wrapper');
  if (!wrapper) return; 
  const [xStart, xEnd] = index % 2 ? 
    ['100%', (wrapper.scrollWidth - section.offsetWidth) * -1] : 
    [wrapper.scrollWidth * -1, 0];
  gsap.fromTo(wrapper, 
    { x: xStart },
    {
    x: xEnd,
    scrollTrigger: {
      trigger: section,
      scrub: 0.5,
      invalidateOnRefresh: true,
    }
    }
  );
  });
};
window.addEventListener('load', function() {
  if (typeof gsap !== 'undefined') {
  imagesLoaded(document.querySelectorAll('img'), initHorizontalScroll);
  }
});

// 按需加载额外脚本
function loadScriptsWhenNeeded() {
  window.removeEventListener('scroll', loadScriptsWhenNeeded);
  window.removeEventListener('touchmove', loadScriptsWhenNeeded);
  
  const scripts = [
    'https://cdn.jsdelivr.net/npm/imagesloaded@5/imagesloaded.pkgd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'
  ];
  
  const loadQueue = scripts.map(src => {
    return new Promise((resolve, reject) => {
    if(document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
    });
  });
  
  Promise.all(loadQueue)
    .then(() => {
    gsap.registerPlugin(ScrollTrigger);
    })
    .catch(error => {
    console.error('脚本加载失败:', error);
    });
}
window.addEventListener('scroll', loadScriptsWhenNeeded, { passive: true, once: true });
window.addEventListener('touchmove', loadScriptsWhenNeeded, { passive: true, once: true });
let fallbackTimer = setTimeout(() => {
  if(!window.gsap) loadScriptsWhenNeeded();
}, 5000);
window.addEventListener('DOMContentLoaded', () => {
  clearTimeout(fallbackTimer);
});
