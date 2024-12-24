// Обновленный скрипт для модального окна корзины с улучшениями и общей стоимостью товаров

// Переключение темы
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}

// Переключение темы
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

    // Инициализация нижней панели с общей стоимостью и кнопкой "Оплатить"
    updateFooterSummary();
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
