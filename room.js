document.addEventListener('DOMContentLoaded', () => {
    const cartTableBody = document.querySelector('#cartTable tbody');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    const proceedCheckout = document.getElementById('proceedCheckout');
    let cart = [];

    // Function to update the cart UI
    function updateCartUI() {
        cartTableBody.innerHTML = '';
        let subtotal = 0;
        cart.forEach((item, index) => {
            const total = item.price * item.quantity;
            subtotal += total;
            const row = `
                <tr>
                    <td><img src="${item.image}" alt="${item.name}"></td>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td><input type="number" value="${item.quantity}" min="1" data-index="${index}" class="cart-quantity"></td>
                    <td>$${total.toFixed(2)}</td>
                    <td><button data-index="${index}" class="remove-from-cart">Remove</button></td>
                </tr>
            `;
            cartTableBody.insertAdjacentHTML('beforeend', row);
        });
        cartSubtotal.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
        cartTotal.textContent = `Total: $${subtotal.toFixed(2)}`;
    }

    // Load cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
        cart = storedCart;
        updateCartUI();
    }

    // Add to Cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productElement = e.target.closest('.product');
            const name = productElement.dataset.name;
            const price = parseFloat(productElement.dataset.price);
            const image = productElement.dataset.image;

            const existingProductIndex = cart.findIndex(item => item.name === name);

            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }

            updateCartUI();
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    });

    // Update cart quantity
    cartTableBody.addEventListener('change', (e) => {
        if (e.target.classList.contains('cart-quantity')) {
            const index = e.target.dataset.index;
            const newQuantity = parseInt(e.target.value);
            cart[index].quantity = newQuantity;
            updateCartUI();
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    });

    // Remove from cart
    cartTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-from-cart')) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            updateCartUI();
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    });

    // Proceed to checkout
    proceedCheckout.addEventListener('click', () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = "thankyou.html";
    });
});
