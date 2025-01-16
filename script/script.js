document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("Preloader");
    setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
    }, 3000); // Задержка в 1 секунду
});









document.addEventListener('DOMContentLoaded', () => {
    // Переменная для хранения товаров в корзине
    let cart = [];
  
    // Логика добавления товара в корзину
    document.querySelectorAll('.add-to-cartD').forEach(button => {
      button.addEventListener('click', (e) => {
        const productElement = e.target.closest('.swiper-slide');
  
        // Извлекаем данные о товаре
        const image = productElement.querySelector('.slide-image').src;
        const name = productElement.querySelector('.slide-title').textContent.trim();
        const description = productElement.querySelector('.slide-description').textContent.trim();
        const price = parseFloat(productElement.querySelector('.product-price span').textContent);
  
        // Проверяем, есть ли уже такой товар в корзине
        const existingProduct = cart.find(item => item.name === name);
        if (existingProduct) {
          existingProduct.quantity++; // Увеличиваем количество
        } else {
          // Добавляем новый товар с количеством 1
          const product = { image, name, description, price, quantity: 1 };
          cart.push(product);
        }
  
        alert(`Товар "${name}" добавлен в корзину!`);
        updateCartModal(); // Обновляем корзину
      });
    });
  
    // Функция для обновления содержимого корзины
    function updateCartModal() {
      const cartItemsList = document.getElementById('cartItems');
      const cartTotal = document.getElementById('cartTotal');
  
      // Очищаем старый список товаров
      cartItemsList.innerHTML = '';
      let total = 0;
  
      // Добавляем товары из корзины в модальное окно
      cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.marginBottom = '10px';
  
        li.innerHTML = `
          <div style="display: flex; align-items: center; flex-grow: 1;">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px; border-radius: 8px;">
            <div>
              <strong>${item.name}</strong><br>
              <small>${item.description}</small>
            </div>
          </div>
          <div style="display: flex; align-items: center;">
            <button class="decrement" data-index="${index}" style="margin-right: 10px;">-</button>
            <span style="margin: 0 10px;">${(item.price * item.quantity).toFixed(2)} ₽</span>
            <button class="increment" data-index="${index}" style="margin-left: 10px;">+</button>
          </div>
        `;
        cartItemsList.appendChild(li);
  
        // Подсчитываем общую сумму
        total += item.price * item.quantity;
      });
  
      // Обновляем общую сумму
      cartTotal.textContent = total.toFixed(2);
  
      // Добавляем обработчики для кнопок "+" и "-"
      document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', (e) => {
          const index = e.target.getAttribute('data-index');
          cart[index].quantity++;
          updateCartModal();
        });
      });
  
      document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', (e) => {
          const index = e.target.getAttribute('data-index');
          if (cart[index].quantity > 1) {
            cart[index].quantity--;
          } else {
            // Удаляем товар из корзины, если количество становится 0
            cart.splice(index, 1);
          }
          updateCartModal();
        });
      });
    }
  
    // Логика для открытия/закрытия модального окна корзины
    const viewCartButton = document.getElementById('viewCartButton');
    const cartModal = document.getElementById('cartModal');
    const closeCartModal = document.querySelector('.close-cart-modal');
  
    // Функция открытия модального окна
    function openCartModal() {
      cartModal.style.display = 'flex';
    }
  
    // Функция закрытия модального окна
    function closeCartModalFunc() {
      cartModal.style.display = 'none';
    }
  
    // Добавляем обработчики событий для открытия/закрытия
    viewCartButton.addEventListener('click', openCartModal);
    closeCartModal.addEventListener('click', closeCartModalFunc);
  
    // Закрытие окна при клике вне области
    window.addEventListener('click', (event) => {
      if (event.target === cartModal) {
        closeCartModalFunc();
      }
    });
  });
  












const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    simulateTouch: true,
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
            
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
                
            });
        }
    });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Отключаем стандартное поведение
        const target = document.querySelector(this.getAttribute('href')); // Находим элемент по якорю
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth', // Плавная прокрутка
                block: 'start'
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





