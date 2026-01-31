// 页面加载完成后使用 GSAP 淡出加载动画
window.addEventListener('load', function () {
  const loader = document.getElementById('loader');
  // 检查 gsap 是否已加载，防止报错
  if (typeof gsap !== 'undefined') {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        loader.style.display = 'none';
      }
    });
  } else {
    // 如果 GSAP 未加载的降级处理
    loader.style.opacity = 0;
    setTimeout(() => {
      loader.style.display = 'none';
    }, 300);
  }
  document.body.classList.add('loaded');
  initializeEffects();
});

// 用 ScrollTrigger 优化 content-section 的滚动动画
const contentSection = document.querySelector('.content-section');
if (contentSection && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
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

/* 初始淡入上滑 */
document.addEventListener("DOMContentLoaded", () => {
    const fadeUps = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // 触发一次后取消监听，提升性能
            }
        });
    }, {
        threshold: 0.1
    });

    fadeUps.forEach(el => observer.observe(el));
});

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
  if (images.length > 0) {
      let currentIndex = Math.floor(Math.random() * images.length);
      images.forEach(img => img.classList.add('hidden'));
      images[currentIndex].classList.remove('hidden');

      setInterval(() => {
        images[currentIndex].classList.add('hidden');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.remove('hidden');
      }, 20000);
  }
});

// 光标移动效果
const cursor = document.querySelector('.cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      cursor.style.left = `${mouseX - cursor.offsetWidth / 2}px`;
      cursor.style.top = `${mouseY - cursor.offsetHeight / 2}px`;
    });
    
    const clickableElements = document.querySelectorAll('a, img, .header-left, .header-title, .about-text h1, .about-text h2, .about-text p, .sample-text, button');
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
    if (imageContainer) {
        imageContainer.addEventListener('mouseenter', () => {
          cursor.style.transform = 'scale(1)';
          cursor.style.width = '10px';
          cursor.style.height = '10px';
        });
    }

    if (/Mobi|Android/i.test(navigator.userAgent)) {
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
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
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


// Modal 逻辑 (增强版滚动锁定)
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeBtn = document.querySelector('.close');

// 辅助函数：锁定和解锁滚动
const lockScroll = () => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden'; // 同时锁定 html 标签
};

const unlockScroll = () => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
};

if (modal && modalImage && closeBtn) {
    // 阻止 Modal 背景上的滑动事件传递（解决移动端背景滚动穿透）
    modal.addEventListener('touchmove', (e) => {
        if(e.target === modal) {
            e.preventDefault();
        }
    }, { passive: false });

    document.querySelectorAll('.gallery-item img').forEach(item => {
      item.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImage.src = item.src;
        modalImage.alt = item.alt;
        
        lockScroll(); // 强制锁定
        
        setTimeout(() => modal.classList.add('show'), 10);
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
      unlockScroll(); // 解锁
      setTimeout(() => modal.style.display = 'none', 300);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        unlockScroll(); // 解锁
        setTimeout(() => modal.style.display = 'none', 300);
      }
    });
}

        // 注册 ScrollTrigger 插件
        gsap.registerPlugin(ScrollTrigger);

        window.addEventListener('DOMContentLoaded', () => {
            // 元素逐个揭示动画
            document.querySelectorAll('.reveal').forEach((el, index) => {
                gsap.to(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%", // 当元素进入视口 90% 时触发
                        toggleActions: "play none none none"
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    delay: index * 0.1 // 产生交错感
                });
            });

            // 背景装饰字随滚动而产生的视差效果
            gsap.to(".bg-char", {
                scrollTrigger: {
                    trigger: ".intro-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5 // 滚动时产生平滑位移
                },
                y: -100, // 向上位移
                opacity: 0.3 // 滚动时产生虚实变化
            });
        });