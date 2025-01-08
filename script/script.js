// Инициализация Swiper для контейнеров меню
const menuSwiper = new Swiper('.menu-swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    grabCursor: true,
});

// Инициализация Swiper для JAPANESE COLLECTION
const japaneseCollectionSwiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    grabCursor: true,
});

// Логика изменения текста для JAPANESE COLLECTION
const dynamicText = document.getElementById('dynamic-text');

japaneseCollectionSwiper.on('slideChange', () => {
    const activeSlide = japaneseCollectionSwiper.slides[japaneseCollectionSwiper.activeIndex];
    const newText = activeSlide.getAttribute('data-text');
    if (newText) {
        dynamicText.textContent = newText;
    }
});

// Логика бокового меню
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sidebar');

// Переменные для свайпа меню
let touchStartY = 0;
let touchEndY = 0;

// Открытие/закрытие меню
hamburger.addEventListener('click', () => {
    const isOpen = sideMenu.style.top === '0px';
    if (isOpen) {
        sideMenu.style.top = '-100%';
    } else {
        sideMenu.style.top = '0';
    }
});

// Свайп для закрытия бокового меню
sideMenu.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

sideMenu.addEventListener('touchmove', (e) => {
    touchEndY = e.touches[0].clientY;
});

sideMenu.addEventListener('touchend', () => {
    if (touchEndY < touchStartY) {
        sideMenu.style.top = '-100%';
    }
});

// Темная тема
function toggleTheme() {
    const body = document.body;
    const toggleCircle = document.getElementById("toggle-circle");

    body.classList.toggle("dark-theme");
    if (body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
        toggleCircle.style.transform = "translateX(24px)";
    } else {
        localStorage.setItem("theme", "light");
        toggleCircle.style.transform = "translateX(2px)";
    }
}

// Показ кнопки "Добавить в корзину"
function showAddToCartButton(container) {
    const button = container.querySelector('.add-to-cart');
    if (button) {
        button.classList.toggle('show');
    }
}

// Плавный скролл по ссылкам меню
document.querySelectorAll('.submenu a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offset = 80; // Отступ сверху
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    });
});
