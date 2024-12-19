function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
}

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

const cart = JSON.parse(localStorage.getItem('cart')) || {};

function increment(name, price) {
    if (!cart[name]) {
        cart[name] = { price, count: 0 };
    }
    cart[name].count++;
    updateUI(name);
}

function decrement(name, price) {
    if (cart[name] && cart[name].count > 0) {
        cart[name].count--;
        updateUI(name);
    }
}

function updateUI(name) {
    document.getElementById(`count-${name}`).textContent = cart[name]?.count || 0;
}

function addToCart(name, price) {
    if (cart[name] && cart[name].count > 0) {
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} добавлен в корзину!`);
    } else {
        alert(`Добавьте количество для ${name} перед добавлением в корзину.`);
    }
}

function filterCategory(category) {
    const items = document.querySelectorAll('.menu-item');
    items.forEach((item) => {
        if (category === 'Все' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
