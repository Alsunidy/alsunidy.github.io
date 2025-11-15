// Product data
const productData = {
    id: 1,
    name: 'صبار الألوفيرا',
    price: 45,
    oldPrice: 60,
    image: '🌵',
    category: 'نباتات منزلية',
    description: 'نبات الألوفيرا من أفضل النباتات المنزلية التي تتميز بسهولة العناية وفوائدها العديدة.'
};

let selectedQuantity = 1;

// Change main image when clicking thumbnails
function changeImage(imagePath) {
    const mainImageImg = document.getElementById('mainImageImg');
    if (mainImageImg) {
        mainImageImg.src = imagePath;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Add active class to clicked thumbnail
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// Change quantity
function changeQuantity(change) {
    selectedQuantity += change;
    if (selectedQuantity < 1) selectedQuantity = 1;
    if (selectedQuantity > 99) selectedQuantity = 99;
    
    document.getElementById('quantity').textContent = selectedQuantity;
}

// Add product to cart
function addProductToCart() {
    // Get existing cart
    let cart = localStorage.getItem('gharsCart');
    let cartItems = cart ? JSON.parse(cart) : [];
    
    // Check if product already exists
    const existingItem = cartItems.find(item => item.id === productData.id);
    
    if (existingItem) {
        existingItem.quantity += selectedQuantity;
    } else {
        cartItems.push({
            id: productData.id,
            name: productData.name,
            price: productData.price,
            image: productData.image,
            quantity: selectedQuantity
        });
    }
    
    // Save to localStorage
    localStorage.setItem('gharsCart', JSON.stringify(cartItems));
    
    // Update cart count
    updateCartDisplay();
    
    // Show notification
    showNotification(`تمت إضافة ${selectedQuantity} من ${productData.name} إلى السلة! 🌿`);
    
    // Reset quantity
    selectedQuantity = 1;
    document.getElementById('quantity').textContent = selectedQuantity;
}

// Buy now - add to cart and redirect
function buyNow() {
    addProductToCart();
    setTimeout(() => {
        window.location.href = 'cart.html';
    }, 500);
}

// Update cart display
function updateCartDisplay() {
    const cart = localStorage.getItem('gharsCart');
    if (cart) {
        const cartItems = JSON.parse(cart);
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
    }
}

// Show notification
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
        max-width: 90%;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Load product data from URL parameters (future feature)
window.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    
    // You can add URL parameter handling here
    // For example: ?product=aloe-vera
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    
    // Load product data based on ID
    // For now, we're using the default productData
});

// Smooth scroll to reviews
document.querySelectorAll('.rating-text').forEach(element => {
    element.style.cursor = 'pointer';
    element.addEventListener('click', () => {
        document.querySelector('.reviews-section').scrollIntoView({
            behavior: 'smooth'
        });
    });
});