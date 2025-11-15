// Cart functionality
let cartCount = 0;

// Load cart count from localStorage
window.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('gharsCart');
    if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    } else {
        const savedCartCount = localStorage.getItem('gharsCartCount');
        if (savedCartCount) {
            cartCount = parseInt(savedCartCount);
        }
    }
    updateCartCount();
});

// Cart button click - redirect to cart page
const cartBtn = document.getElementById('cartBtn');
if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });
}

function addToCart() {
    cartCount++;
    updateCartCount();
    showNotification('تمت الإضافة إلى السلة!');
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Notification function
function showNotification(message) {
    // Create notification element
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
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
}

// Product filtering (for products page)
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Filter products
        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add fade in animation
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInStyle);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        }
    });
});

// Load cart count from localStorage (optional - for persistence)
window.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('gharsCartCount');
    if (savedCart) {
        cartCount = parseInt(savedCart);
        updateCartCount();
    }
});

// Save cart count to localStorage when it changes
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
    // Don't save to localStorage here - cart.js handles it
}

// Form validation (for contact form)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const submitButton = contactForm.querySelector('.btn-primary');
    if (submitButton) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            const inputs = contactForm.querySelectorAll('.form-input');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '#bbf7d0';
                }
            });
            
            if (isValid) {
                showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً 💚');
                inputs.forEach(input => input.value = '');
            } else {
                showNotification('الرجاء ملء جميع الحقول');
            }
        });
    }
}

// Consultation Modal Functions
function openConsultationModal() {
    const modal = document.getElementById('consultationModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeConsultationModal() {
    const modal = document.getElementById('consultationModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('consultationModal');
    if (e.target === modal) {
        closeConsultationModal();
    }
});

// Submit consultation form
function submitConsultation() {
    const name = document.getElementById('consultName').value.trim();
    const phone = document.getElementById('consultPhone').value.trim();
    const service = document.getElementById('consultService').value;
    
    // Validation
    if (!name) {
        showNotification('الرجاء إدخال الاسم الكامل');
        document.getElementById('consultName').style.borderColor = '#ef4444';
        return;
    }
    
    if (!phone) {
        showNotification('الرجاء إدخال رقم الجوال');
        document.getElementById('consultPhone').style.borderColor = '#ef4444';
        return;
    }
    
    // Phone validation (Saudi format)
    const phoneRegex = /^05[0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
        showNotification('الرجاء إدخال رقم جوال صحيح (يبدأ بـ 05 ويتكون من 10 أرقام)');
        document.getElementById('consultPhone').style.borderColor = '#ef4444';
        return;
    }
    
    if (!service) {
        showNotification('الرجاء اختيار نوع الخدمة');
        document.getElementById('consultService').style.borderColor = '#ef4444';
        return;
    }
    
    // Success
    showNotification('تم إرسال طلبك بنجاح! سنتواصل معك خلال 24 ساعة 🌿💚');
    
    // Clear form
    document.getElementById('consultName').value = '';
    document.getElementById('consultPhone').value = '';
    document.getElementById('consultEmail').value = '';
    document.getElementById('consultService').value = '';
    document.getElementById('consultArea').value = '';
    document.getElementById('consultDetails').value = '';
    
    // Close modal after 1 second
    setTimeout(() => {
        closeConsultationModal();
    }, 1500);
}