document.addEventListener("DOMContentLoaded", () => {

    let cart = [
        { name: "Охотничье оружие", price: 12500, image: "../vendor/tovar1.jpg", quantity: 1 },
        { name: "Ботинки", price: 5800, image: "../vendor/tovar2.jpg", quantity: 1 },
        { name: "Комбинезон", price: 10000, image: "../vendor/tovar3.jpg", quantity: 1 }
    ];

    function renderCart() {
        const cartItemsContainer = document.getElementById("cart-items");
        const totalPriceElement = document.getElementById("total-price");
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <span class="item_name cart_item-info">${item.name}</span>
                <span class="item_price cart_item-info">${item.price} ₽</span>
                <input type="number" value="${item.quantity}" min="1" data-index="${index}">
                <button class="remove-btn cart_item-info" data-index="${index}">✖</button>
            `;

            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = total;
        attachEventListeners();
    }

    function attachEventListeners() {
        document.querySelectorAll("input[type='number']").forEach(input => {
            input.addEventListener("change", function() {
                let index = this.getAttribute("data-index");
                cart[index].quantity = parseInt(this.value) || 1;
                renderCart();
            });
        });

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function() {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1);
                renderCart();
            });
        });
    }

    renderCart();

    // Логика формы
    const deliveryMethod = document.getElementById("delivery-method");
    const paymentMethod = document.getElementById("payment-method");
    const submitButton = document.getElementById("submit-order");
    const orderSuccess = document.getElementById("order-success");

    const pickupLocations = document.getElementById("pickup-locations");
    const deliveryAddress = document.getElementById("delivery-address");
    const pickupPoint = document.getElementById("pickup-point");

    deliveryMethod.addEventListener("change", function() {
        if (this.value === "pickup") {
            pickupLocations.classList.remove("hidden");
            deliveryAddress.classList.add("hidden");

            // Убираем атрибут 'required' для полей адреса при выборе самовывоза
            document.getElementById("region").removeAttribute("required");
            document.getElementById("city").removeAttribute("required");
            document.getElementById("street").removeAttribute("required");
            document.getElementById("house").removeAttribute("required");

            // Делаем поле 'pickup-point' обязательным при самовывозе
            pickupPoint.setAttribute("required", "required");
        } else if (this.value === "delivery") {
            deliveryAddress.classList.remove("hidden");
            pickupLocations.classList.add("hidden");

            // Добавляем атрибут 'required' обратно для полей адреса при выборе доставки
            document.getElementById("region").setAttribute("required", "required");
            document.getElementById("city").setAttribute("required", "required");
            document.getElementById("street").setAttribute("required", "required");
            document.getElementById("house").setAttribute("required", "required");

            // Убираем атрибут 'required' с 'pickup-point' при выборе доставки
            pickupPoint.removeAttribute("required");
        }
        checkFormCompletion();
    });

    document.getElementById("checkout-form").addEventListener("input", checkFormCompletion);

    function checkFormCompletion() {
        let isFormComplete = paymentMethod.value && deliveryMethod.value;

        if (deliveryMethod.value === "pickup") {
            isFormComplete = isFormComplete && pickupPoint.value;
        } else if (deliveryMethod.value === "delivery") {
            isFormComplete =
                isFormComplete &&
                document.getElementById("region").value &&
                document.getElementById("city").value &&
                document.getElementById("street").value &&
                document.getElementById("house").value;
        }

        submitButton.disabled = !isFormComplete;
    }

    document.getElementById("checkout-form").addEventListener("submit", function(e) {
        e.preventDefault();
        // Очистка корзины после оформления заказа
        cart = [];
        renderCart(); // Обновление отображения корзины (она будет пустой)
        
        alert("✅ Ваш заказ успешно оформлен!");
        orderSuccess.classList.remove("hidden");
    });
});

function logout() {
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });

    // Обновление интерфейса
    document.getElementById("auth-button").style.display = "block";
    document.getElementById("logout-button").style.display = "none";

    window.location.href = "../index.html";
}

document.getElementById("logout-button").addEventListener("click", logout);