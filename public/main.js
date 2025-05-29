document.addEventListener('DOMContentLoaded', function() {
    // Carrinho de compras
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Elementos do DOM
    const cartCount = document.querySelectorAll('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartModal = document.querySelector('.cart-modal');
    const cartToggle = document.querySelectorAll('.cart-toggle');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Atualizar contador do carrinho
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.forEach(element => {
            element.textContent = count;
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Renderizar itens do carrinho
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio</p>';
            totalPriceElement.textContent = '0.00';
            return;
        }
        
        let totalPrice = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                    <span class="cart-item-remove" data-id="${item.id}"><i class="fas fa-trash"></i></span>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        totalPriceElement.textContent = totalPrice.toFixed(2);
        
        // Adicionar eventos aos novos botões
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }
    
    // Adicionar item ao carrinho
    function addToCart(event) {
        const button = event.target;
        const id = parseInt(button.getAttribute('data-id'));
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                quantity: 1
            });
        }
        
        updateCartCount();
        renderCartItems();
        
        // Feedback visual
        button.textContent = 'Adicionado!';
        button.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
            button.textContent = 'Adicionar ao Carrinho';
            button.style.backgroundColor = '#6c63ff';
        }, 1000);
    }
    
    // Diminuir quantidade
    function decreaseQuantity(event) {
        const id = parseInt(event.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === id);
        
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== id);
        }
        
        updateCartCount();
        renderCartItems();
    }
    
    // Aumentar quantidade
    function increaseQuantity(event) {
        const id = parseInt(event.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === id);
        item.quantity += 1;
        
        updateCartCount();
        renderCartItems();
    }
    
    // Remover item
    function removeItem(event) {
        const id = parseInt(event.target.getAttribute('data-id'));
        cart = cart.filter(item => item.id !== id);
        
        updateCartCount();
        renderCartItems();
    }
    
    // Finalizar compra
    function checkout() {
        alert('Compra finalizada! Total: R$ ' + totalPriceElement.textContent);
        cart = [];
        updateCartCount();
        renderCartItems();
        cartModal.style.display = 'none';
    }
    
    // Abrir/fechar carrinho
    function toggleCart() {
        cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
        renderCartItems();
    }
    
    // Event Listeners
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    cartToggle.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCart();
        });
    });
    
    closeCart.addEventListener('click', toggleCart);
    checkoutBtn.addEventListener('click', checkout);
    
    // Fechar carrinho ao clicar fora
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
    
    // Inicializar
    updateCartCount();
});