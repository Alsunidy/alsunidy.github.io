// Cart items storage
let cartItems = [];

// Sample products for demonstration
const sampleProducts = [
    { id: 1, name: 'صبار الألوفيرا', price: 45, image: '🌵' },
    { id: 2, name: 'نخلة الأريكا', price: 120, image: '🌴' },
    { id: 3, name: 'نبات الزينة', price: 65, image: '🪴' },
    { id: 4, name: 'شجيرة الورد', price: 85, image: '🌹' }
];

// Initialize cart on page load
window.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    renderCart();
    updateCartButton();
});

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('gharsCart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
    } else {
        // Add sample items for demonstration
        cartItems = [
            { ...sampleProducts[0], quantity: 2 },
            { ...sampleProducts[1], quantity: 1 },
            { ...sampleProducts[2], quantity: 1 }
        ];
        saveCartToStorage();
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('gharsCart', JSON.stringify(cartItems));
    updateCartButton();
}

// Update cart button count
function updateCartButton() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Render cart items
function renderCart() {
    const cartItemsArea = document.getElementById('cartItemsArea');
    const emptyCart = document.getElementById('emptyCart');
    
    if (cartItems.length === 0) {
        cartItemsArea.style.display = 'none';
        emptyCart.style.display = 'block';
        updateSummary();
        return;
    }
    
    cartItemsArea.style.display = 'block';
    emptyCart.style.display = 'none';
    
    cartItemsArea.innerHTML = cartItems.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <div class="cart-item-price">${item.price} ر.س</div>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="item-total">${item.price * item.quantity} ر.س</div>
                <button class="btn-remove" onclick="removeItem(${item.id})">🗑️ حذف</button>
            </div>
        </div>
    `).join('');
    
    updateSummary();
}

// Update item quantity
function updateQuantity(itemId, change) {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeItem(itemId);
        } else {
            saveCartToStorage();
            renderCart();
        }
    }
}

// Remove item from cart
function removeItem(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    saveCartToStorage();
    renderCart();
    showNotification('تم حذف المنتج من السلة');
}

// Update cart summary
function updateSummary() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal >= 200 ? 0 : 30) : 0;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `${subtotal} ر.س`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'مجاناً' : `${shipping} ر.س`;
    document.getElementById('total').textContent = `${total} ر.س`;
}

// Apply promo code
function applyPromo() {
    const promoInput = document.getElementById('promoInput');
    const code = promoInput.value.trim().toUpperCase();
    
    const validCodes = {
        'GHARS10': 10,
        'WELCOME': 15,
        'SPRING': 20
    };
    
    if (validCodes[code]) {
        showNotification(`تم تطبيق كود الخصم! خصم ${validCodes[code]}% 🎉`);
        promoInput.value = '';
        
        // Update summary with discount (simplified)
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = subtotal * (validCodes[code] / 100);
        const shipping = subtotal - discount >= 200 ? 0 : 30;
        const total = subtotal - discount + shipping;
        
        // Add discount row if not exists
        const summaryRows = document.querySelector('.cart-summary');
        let discountRow = document.getElementById('discountRow');
        
        if (!discountRow) {
            discountRow = document.createElement('div');
            discountRow.id = 'discountRow';
            discountRow.className = 'summary-row';
            discountRow.style.color = '#16a34a';
            const divider = document.querySelector('.summary-divider');
            divider.parentNode.insertBefore(discountRow, divider);
        }
        
        discountRow.innerHTML = `
            <span>الخصم (${validCodes[code]}%):</span>
            <span>-${discount.toFixed(2)} ر.س</span>
        `;
        
        document.getElementById('total').textContent = `${total.toFixed(2)} ر.س`;
    } else if (code) {
        showNotification('كود الخصم غير صالح');
    } else {
        showNotification('الرجاء إدخال كود الخصم');
    }
}

// Checkout function
function checkout() {
    if (cartItems.length === 0) {
        showNotification('السلة فارغة! أضف منتجات أولاً');
        return;
    }
    
    // Here you would normally process the order
    // For now, we'll just show a success message
    const total = document.getElementById('total').textContent;
    showNotification(`شكراً لك! طلبك بقيمة ${total} قيد المعالجة 🌿`);
    
    // Clear cart after 2 seconds
    setTimeout(() => {
        cartItems = [];
        saveCartToStorage();
        renderCart();
        showNotification('تم تأكيد طلبك! سنتواصل معك قريباً 💚');
    }, 2000);
}

// Add to cart from recommended products
function addToCartFromRecommended(name, price, image) {
    const existingItem = cartItems.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        const newId = cartItems.length > 0 ? Math.max(...cartItems.map(i => i.id)) + 1 : 1;
        cartItems.push({
            id: newId,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    renderCart();
    showNotification('تمت الإضافة إلى السلة! 🌿');
}

// Notification function (reused from main script.js)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #16a34a;
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Update the main addToCart function to work with cart page
window.addToCart = function(name, price, image) {
    addToCartFromRecommended(name, price, image);
};
