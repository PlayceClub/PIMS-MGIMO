document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("Preloader");
    setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
    }, 3000); // Задержка в 1 секунду
});


const swiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const dynamicText = document.getElementById('dynamic-text');

swiper.on('slideChange', () => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const newText = activeSlide.getAttribute('data-text');
    dynamicText.textContent = newText;
});



// Скрипт для открытия/закрытия бокового меню

const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sidebar');

// Переменные для отслеживания свайпа
let touchStartY = 0;
let touchEndY = 0;

// Когда нажимают на гамбургер
hamburger.addEventListener('click', () => {
    const isOpen = sideMenu.style.top === '0px';
    if (isOpen) {
        sideMenu.style.top = '-100%'; // Закрыть меню
    } else {
        sideMenu.style.top = '0'; // Открыть меню
    }
});

// Отслеживание свайпа для закрытия меню (свайп вверх)
sideMenu.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY; // Сохраняем координату начала свайпа
});

sideMenu.addEventListener('touchmove', (e) => {
    touchEndY = e.touches[0].clientY; // Обновляем координату конца свайпа
});

sideMenu.addEventListener('touchend', () => {
    // Если движение было вверх (положительная разница между координатами)
    if (touchEndY < touchStartY) {
        sideMenu.style.top = '-100%'; // Закрыть меню (сдвигаем вверх)
    }
});
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


function showAddToCartButton(container) {
    let button = container.querySelector('.add-to-cart');
    if (button) {
        button.classList.toggle('show');
    }
}
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
                behavior: 'smooth'
            });
        }
    });
});

    document.getElementById("chat-button").addEventListener("click", function(event) {
        event.preventDefault(); // Отменяет переход по ссылке
        // Здесь можно выполнить дополнительные действия, например, логирование
        console.log("Переход в Telegram-чат");
        // Затем перенаправляем пользователя в чат
        window.open("https://t.me/BIMPull", "_blank");
    });
    
    document.addEventListener('touchmove', (e) => {
        if (window.scrollY === 0 && e.touches[0].clientY > 0) {
            e.preventDefault(); // Блокирует "свайп вниз"
        }
    }, { passive: false });
