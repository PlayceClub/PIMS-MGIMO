
var animateButton = function(e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };
  
  var bubblyButtons = document.getElementsByClassName("add-to-cartB");
  
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }// Обновленный скрипт для модального окна корзины с улучшениями и общей стоимостью товаров

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
function toggleMenu() {
    const menu = document.getElementById('sidebar');
    if (menu) {
        menu.classList.toggle('open');
    } else {
        console.error('Sidebar menu element not found.');
    }
}

document.querySelectorAll('.menu-item').forEach(item => {
    const buttonContainer = item.querySelector('.add-to-cartB');
    const name = item.getAttribute('data-name');
    const price = parseFloat(item.getAttribute('data-price')) || 0;
    const image = item.querySelector('img') ? item.querySelector('img').src : '';
    const priceContainer = item.querySelector('.price-container .price'); // Находим контейнер цены
    let quantity = 0;

    if (buttonContainer) {
        buttonContainer.addEventListener('click', () => {
            if (quantity === 0) {
                // Первая активация: заменяем кнопку на "+" и "-"
                buttonContainer.innerHTML = `
                    <button class="minus">-</button>
                    <span class="quantity">1</span>
                    <button class="plus">+</button>
                `;
                quantity = 1;
                addToCart(name, price, image);

                // Обновляем цену на основе количества
                if (priceContainer) {
                    priceContainer.textContent = `${(price * quantity).toFixed(2)} ₽`;
                }

                const minusButton = buttonContainer.querySelector('.minus');
                const plusButton = buttonContainer.querySelector('.plus');
                const quantityDisplay = buttonContainer.querySelector('.quantity');

                minusButton.addEventListener('click', () => {
                    if (quantity > 0) {
                        quantity--;
                        quantityDisplay.textContent = quantity;

                        if (quantity === 0) {
                            buttonContainer.innerHTML = 'Добавить в корзину';
                            if (priceContainer) {
                                priceContainer.textContent = `${price.toFixed(2)} ₽`;
                            }
                            removeFromCart(name); // Удаляем товар из корзины
                        } else {
                            updateCartQuantity(name, quantity, price, image);

                            // Обновляем цену на основе количества
                            if (priceContainer) {
                                priceContainer.textContent = `${(price * quantity).toFixed(2)} ₽`;
                            }
                        }
                    }
                });

                plusButton.addEventListener('click', () => {
                    quantity++;
                    quantityDisplay.textContent = quantity;
                    updateCartQuantity(name, quantity, price, image);

                    // Обновляем цену на основе количества
                    if (priceContainer) {
                        priceContainer.textContent = `${(price * quantity).toFixed(2)} ₽`;
                    }
                });
            }
        });
    }
});

// Функция удаления товара из корзины
function removeFromCart(itemName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== itemName);
    localStorage.setItem('cart', JSON.stringify(cart));
    if (typeof renderCart === 'function') {
        renderCart(); // Обновите отображение корзины, если применимо
    }
}

// Функция обновления количества товара в корзине
function updateCartQuantity(name, quantity, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.name === name);

    if (item) {
        if (quantity > 0) {
            item.quantity = quantity;
            item.totalPrice = (item.quantity * price).toFixed(2);
        } else {
            cart = cart.filter(item => item.name !== name);
        }
    } else if (quantity > 0) {
        cart.push({ name, price, quantity, totalPrice: (quantity * price).toFixed(2), image });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

// Рендеринг корзины для предотвращения ошибок
function renderCart() {
    const cartSidebar = document.getElementById('cart-sidebar-content');
    if (!cartSidebar) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartSidebar.innerHTML = '';

    if (cart.length === 0) {
        cartSidebar.innerHTML = '<p class="empty-cart">Ваша корзина пуста.</p>';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;">
            <p>${item.name}</p>
            <p>${item.quantity} x ${item.price} ₽ = ${item.totalPrice} ₽</p>
            <button class="remove-from-cart" data-name="${item.name}">Удалить</button>
        `;
        cartSidebar.appendChild(cartItem);
    });
}

// Создание модального окна чата для сообщения администратору
document.getElementById('chat-button').addEventListener('click', openChatModal);

function openChatModal() {
    if (document.getElementById('chat-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'chat-modal';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.width = '400px';
    modal.style.padding = '20px';
    modal.style.backgroundColor = '#fff';
    modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    modal.style.borderRadius = '8px';
    modal.style.zIndex = '1000';

    modal.innerHTML = `
        <h2>Связаться с администратором</h2>
        <textarea id="chat-message" placeholder="Введите ваше сообщение..." style="width: 100%; height: 100px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px; padding: 8px;"></textarea>
        <button id="send-message" style="background-color: #ff5722; color: white; border: none; border-radius: 4px; padding: 10px 20px; cursor: pointer;">Отправить</button>
        <button id="close-modal" style="background-color: #ccc; color: black; border: none; border-radius: 4px; padding: 10px 20px; cursor: pointer; margin-left: 10px;">Закрыть</button>
    `;

    document.body.appendChild(modal);

    const closeModal = document.getElementById('close-modal');
    closeModal.addEventListener('click', () => {
        modal.remove();
    });

    const sendMessage = document.getElementById('send-message');
    sendMessage.addEventListener('click', () => {
        const message = document.getElementById('chat-message').value;
        if (message.trim() !== '') {
            alert(`Ваше сообщение отправлено: ${message}`);
            modal.remove();
        } else {
            alert('Пожалуйста, введите сообщение.');
        }
    });
}


// Кнопка для открытия чата
const ADMIN_CHAT_ID = '1776219693'; // ID чата администратора в Telegram
const BOT_TOKEN = '7727235106:AAFRVDfDR8wJlLDVlBlA12oJVAULK7uEimg'; // Токен вашего бота

function sendToTelegram(message) {
    const telegramAPI = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    fetch(telegramAPI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: ADMIN_CHAT_ID,
            text: message,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Сообщение успешно отправлено!');
        } else {
            alert('Ошибка при отправке сообщения.');
            console.error(data);
        }
    })
    .catch(error => {
        alert('Ошибка при подключении к Telegram.');
        console.error(error);
    });
}

// Создание модального окна чата для сообщения администратору
function openChatModal() {
    if (document.getElementById('chat-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'chat-modal';
    modal.classList.add('modal'); // Добавляем класс для стилей

    modal.innerHTML = `
        <h2>Связаться с администратором</h2>
        <textarea id="chat-message" placeholder="Введите ваше сообщение..."></textarea>
        <button id="send-message" class="send-button">Отправить</button>
        <button id="close-modal" class="close-button">Закрыть</button>
    `;

    document.body.appendChild(modal);

    const closeModal = document.getElementById('close-modal');
    closeModal.addEventListener('click', () => {
        modal.remove();
    });

    const sendMessage = document.getElementById('send-message');
    sendMessage.addEventListener('click', () => {
        const message = document.getElementById('chat-message').value;
        if (message.trim() !== '') {
            alert(`Ваше сообщение отправлено: ${message}`);
            modal.remove();
        } else {
            alert('Пожалуйста, введите сообщение.');
        }
    });
}

// Кнопка для открытия чата

// Переключение темы


window.onload = () => {
    const savedTheme = localStorage.getItem("theme");
    const body = document.body;
    const toggleCircle = document.getElementById("toggle-circle");

    if (savedTheme === "dark") {
        body.classList.add("dark-theme");
        toggleCircle.style.transform = "translateX(24px)";
    }
};

document.addEventListener("DOMContentLoaded", function () {
    // Прелоадер
    setTimeout(() => {
        const preloader = document.getElementById("preloader");
        if (preloader) {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
            preloader.style.transition = "opacity 1s ease, visibility 1s ease";
        }
    }, 2000);

    // Обработчики добавления в корзину и счетчиков
    let cart = [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart(name, price, image) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
            existingItem.totalPrice = parseFloat((existingItem.price * existingItem.quantity).toFixed(2));
        } else {
            cart.push({
                name,
                price: parseFloat(price),
                quantity: 1,
                totalPrice: parseFloat(price).toFixed(2),
                image: image || ''
            });
        }
        saveCart();
        renderCartSidebar();
        updateFooterSummary();
    }

    function updateCartQuantity(name, quantity, price, image) {
        const item = cart.find(item => item.name === name);
        if (item) {
            if (quantity === 0) {
                cart = cart.filter(item => item.name !== name);
            } else {
                item.quantity = quantity;
                item.totalPrice = parseFloat((item.price * item.quantity).toFixed(2));
            }
        } else if (quantity > 0) {
            cart.push({
                name,
                price: parseFloat(price),
                quantity,
                totalPrice: parseFloat(price * quantity).toFixed(2),
                image: image || ''
            });
        }
        saveCart();
        renderCartSidebar();
        updateFooterSummary();
    }

    function updateFooterSummary() {
        const footerSummary = document.getElementById('footer-summary');
        if (!footerSummary) return;

        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += parseFloat(item.totalPrice) || 0;
        });

        footerSummary.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 18px; font-weight: bold;">Итого: ${totalPrice.toFixed(2)} ₽</span>
                <button id="pay-button" style="background-color: #ff5722; color: white; border: none; border-radius: 5px; padding: 10px 15px; cursor: pointer;">Оплатить</button>
            </div>
        `;

        const payButton = document.getElementById('pay-button');
        if (payButton) {
            payButton.addEventListener('click', () => {
                alert('Функция оплаты пока недоступна.');
            });
        }
    }

    document.querySelectorAll('.menu-item').forEach(item => {
        const buttonContainer = item.querySelector('.add-to-cartB');
        const name = item.getAttribute('data-name');
        const price = parseFloat(item.getAttribute('data-price')) || 0;
        const image = item.querySelector('img') ? item.querySelector('img').src : '';
        let quantity = 0;

        if (buttonContainer) {
            buttonContainer.addEventListener('click', () => {
                if (quantity === 0) {
                    // Первая активация: заменяем кнопку на "+" и "-"
                    buttonContainer.innerHTML = `
                        <button class="minus">-</button>
                        <span class="quantity">1</span>
                        <button class="plus">+</button>
                    `;
                    quantity = 1;
                    addToCart(name, price, image);

                    const minusButton = buttonContainer.querySelector('.minus');
                    const plusButton = buttonContainer.querySelector('.plus');
                    const quantityDisplay = buttonContainer.querySelector('.quantity');

                    minusButton.addEventListener('click', () => {
                        if (quantity > 0) {
                            quantity--;
                            quantityDisplay.textContent = quantity;
                            updateCartQuantity(name, quantity, price, image);

                            if (quantity === 0) {
                                buttonContainer.innerHTML = 'Добавить в корзину';
                                quantity = 0;
                            }
                        }
                    });

                    plusButton.addEventListener('click', () => {
                        quantity++;
                        quantityDisplay.textContent = quantity;
                        updateCartQuantity(name, quantity, price, image);
                    });
                }
            });
        }
    });

    // Рендеринг корзины в боковом модальном окне
    function renderCartSidebar() {
        const sidebarContent = document.getElementById('cart-sidebar-content');
        const totalPriceElement = document.getElementById('total-price');

        if (!sidebarContent || !totalPriceElement) return;

        sidebarContent.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            sidebarContent.innerHTML = '<p class="empty-cart">Ваша корзина пуста.</p>';
            totalPriceElement.textContent = '0.00 ₽';
            return;
        }

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;">
                <p><strong>${item.name}</strong></p>
                <p>Цена за единицу: ${(item.price || 0).toFixed(2)} ₽</p>
                <p>Количество: ${item.quantity || 0}</p>
                <button class="remove-from-cart styled-remove" data-name="${item.name}">Удалить</button>
            `;
            sidebarContent.appendChild(cartItem);
            totalPrice += parseFloat(item.totalPrice) || 0;
        });

        totalPriceElement.innerHTML = `<strong>Общая сумма: ${totalPrice.toFixed(2)} ₽</strong>`;

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function () {
                const name = this.getAttribute('data-name');
                cart = cart.filter(item => item.name !== name);
                saveCart();
                renderCartSidebar();
                updateFooterSummary();
            });
        });
    }

    // Открытие и закрытие бокового модального окна
    const openCartButton = document.querySelector('.view-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartButton = document.getElementById('close-cart-sidebar');

    if (openCartButton) {
        openCartButton.addEventListener('click', () => {
            renderCartSidebar();
            cartSidebar.classList.add('open');
        });
    }

    if (closeCartButton) {
        closeCartButton.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
        });
    }

    // Закрытие свайпом
    let startY = 0;
    let currentY = 0;
    let isSwiping = false;

    cartSidebar.addEventListener('touchstart', (event) => {
        startY = event.touches[0].clientY;
        isSwiping = true;
    });

    cartSidebar.addEventListener('touchmove', (event) => {
        if (!isSwiping) return;
        currentY = event.touches[0].clientY;
        const deltaY = startY - currentY;

        if (deltaY > 50) {
            cartSidebar.classList.remove('open');
            isSwiping = false;
        }
    });

    cartSidebar.addEventListener('touchend', () => {
        isSwiping = false;
    });
});







let startMenuY = 0;
let currentMenuY = 0;
let isMenuSwiping = false;

sidebar.addEventListener('touchstart', (event) => {
    startMenuY = event.touches[0].clientY;
    isMenuSwiping = true;
});

sidebar.addEventListener('touchmove', (event) => {
    if (!isMenuSwiping) return;
    currentMenuY = event.touches[0].clientY;
    const deltaY = startMenuY - currentMenuY;

    if (deltaY > 50) {
        sidebar.classList.remove('open');
        isMenuSwiping = false;
    }
});

sidebar.addEventListener('touchend', () => {
    isMenuSwiping = false;
});


let startX = 0;
    let currentX = 0;
    let isSwiping = false;

    cartSidebar.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
        isSwiping = true;
    });

    cartSidebar.addEventListener('touchmove', (event) => {
        if (!isSwiping) return;
        currentX = event.touches[0].clientX;
        const deltaX = currentX - startX;

        if (deltaX > 50) {
            cartSidebar.classList.remove('open');
            isSwiping = false;
        }
    });

    cartSidebar.addEventListener('touchend', () => {
        isSwiping = false;
    });


