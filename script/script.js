document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        const preloader = document.getElementById("preloader");
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
        preloader.style.transition = "opacity 1s ease, visibility 1s ease";
    }, 2000);
});
var animateButton = function(e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };
  
  var bubblyButtons = document.getElementsByClassName("add-to-cart");
  
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }
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

document.querySelectorAll('.menu-item').forEach(item => {
    const plusButton = item.querySelector('.counter button:nth-child(3)');
    const minusButton = item.querySelector('.counter button:nth-child(1)');
    const counter = item.querySelector('.counter span');
    const priceElement = item.querySelector('.price');
    const basePrice = parseFloat(priceElement.getAttribute('data-price')); // Цена из атрибута

    let quantity = 0;

    plusButton.addEventListener('click', () => {
        quantity++;
        counter.textContent = quantity;
        priceElement.textContent = `${(basePrice * quantity).toFixed()} ₽`;
    });

    minusButton.addEventListener('click', () => {
        if (quantity > 0) {
            quantity--;
            counter.textContent = quantity;
            priceElement.textContent = `${(basePrice * quantity).toFixed()} ₽`;
        }
    });
});

