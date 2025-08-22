// Elizabeth Thatchers Artist Portfolio - Fixed JavaScript with Working Contact Form

// Add loading state
document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript loaded successfully');
    
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Initialize all functionality
    try {
        setupNavigation();
        setupGallery();
        setupModal();
        setupContactForm();
        
        console.log('All functionality initialized');
        
        // Remove loading state
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 100);
        
    } catch (error) {
        console.error('Error initializing website:', error);
        document.body.classList.remove('loading');
    }
});

// Simple navigation setup
function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navContainer = document.querySelector('.nav-container');
    
    if (navToggle && navContainer) {
        navToggle.addEventListener('click', function() {
            console.log('Menu toggle clicked');
            navContainer.classList.toggle('nav-open');
        });
        
        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navContainer.classList.remove('nav-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navContainer.contains(e.target) && !navToggle.contains(e.target)) {
                navContainer.classList.remove('nav-open');
            }
        });
        
        // Close menu with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                navContainer.classList.remove('nav-open');
            }
        });
        
        console.log('Navigation setup complete');
    }
}

// Setup gallery filtering
function setupGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    const filterButtons = document.querySelectorAll('.gallery-nav button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterGalleryItems(category);
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Check for URL hash and filter accordingly
    const hash = window.location.hash.substring(1);
    if (hash && ['portraits', 'landscapes', 'abstractions'].includes(hash)) {
        const targetButton = document.querySelector(`button[data-category="${hash}"]`);
        if (targetButton) {
            targetButton.click();
        }
    }
    
    console.log('Gallery setup complete');
}

// Filter gallery items
function filterGalleryItems(category) {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Setup modal functionality
function setupModal() {
    const modal = document.getElementById('modal');
    if (!modal) return;
    
    // Close modal when clicking background or close button
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            closeModal();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    console.log('Modal setup complete');
}

// Open modal with image
function openModal(imageSrc, title, description) {
    console.log('Opening modal:', title);
    
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    if (modal && modalImage && modalTitle && modalDescription) {
        // Set content
        modalImage.src = imageSrc;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

// Close modal
function closeModal() {
    console.log('Closing modal');
    
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Redirect to gallery with category filter
function redirectToGallery(category) {
    console.log('Redirecting to gallery:', category);
    
    const currentPath = window.location.pathname;
    
    // Determine correct path based on current location
    if (currentPath.includes('/pages/')) {
        // We're in a page subdirectory
        window.location.href = `./gallery.html#${category}`;
    } else {
        // We're in root directory
        window.location.href = `./pages/gallery.html#${category}`;
    }
}

// FIXED Contact Form Setup
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) {
        console.log('Contact form not found on this page');
        return;
    }
    
    console.log('✅ Contact form found, setting up handlers');
    
    // Create success message container with CSS animation
    const successDiv = document.createElement('div');
    successDiv.id = 'contactSuccessMessage';
    successDiv.innerHTML = '';
    successDiv.style.cssText = `
        display: none;
        background: #d4edda;
        border: 2px solid #28a745;
        color: #155724;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 30px;
        font-weight: 500;
        text-align: center;
        font-size: 1rem;
        line-height: 1.5;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        animation: slideDown 0.4s ease;
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
                max-height: 0;
            }
            to {
                opacity: 1;
                transform: translateY(0);
                max-height: 200px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Insert success message before the form
    form.parentNode.insertBefore(successDiv, form);
    
    // Add form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('📝 Form submission intercepted, processing...');
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const message = formData.get('message')?.trim();
        const subject = formData.get('subject');
        
        console.log('📊 Form data collected:', { name, email, message, subject });
        
        // Validate required fields
        if (!name || !email || !message) {
            console.log('❌ Validation failed: missing required fields');
            showContactMessage('⚠️ Please fill in all required fields (Name, Email, and Message).', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('❌ Validation failed: invalid email format');
            showContactMessage('⚠️ Please enter a valid email address.', 'error');
            return;
        }
        
        // Show success message
        console.log('✅ Validation passed, showing success message');
        const successMessage = `
            <div style="font-size: 1.2rem; margin-bottom: 12px;">
                ✅ <strong>Message Sent Successfully!</strong>
            </div>
            <div style="font-size: 1rem;">
                Thank you, <strong>${name}</strong>! Your message has been received successfully.<br>
                I'll get back to you within 24-48 hours at <strong>${email}</strong>.
            </div>
        `;
        showContactMessage(successMessage, 'success');
        
        // Clear the form
        form.reset();
        console.log('🧹 Form cleared');
        
        // Scroll to success message smoothly
        setTimeout(() => {
            successDiv.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
        
        console.log('🎉 Contact form submitted successfully!');
    });
    
    // Function to show success/error messages
    function showContactMessage(message, type) {
        const successDiv = document.getElementById('contactSuccessMessage');
        
        if (type === 'error') {
            successDiv.style.cssText = `
                display: block;
                background: #f8d7da;
                border: 2px solid #dc3545;
                color: #721c24;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 30px;
                font-weight: 500;
                text-align: center;
                font-size: 1rem;
                line-height: 1.5;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                animation: slideDown 0.4s ease;
            `;
            
            // Auto-hide error after 5 seconds
            setTimeout(() => {
                successDiv.style.display = 'none';
            }, 5000);
            
        } else {
            successDiv.style.cssText = `
                display: block;
                background: #d4edda;
                border: 2px solid #28a745;
                color: #155724;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 30px;
                font-weight: 500;
                text-align: center;
                font-size: 1rem;
                line-height: 1.5;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                animation: slideDown 0.4s ease;
            `;
            
            // Auto-hide success after 10 seconds
            setTimeout(() => {
                successDiv.style.display = 'none';
            }, 10000);
        }
        
        successDiv.innerHTML = message;
    }
    
    console.log('✅ Contact form setup complete with enhanced messaging');
}

// Handle image loading errors with better fallback
function handleImageError(img) {
    console.warn('⚠️ Image failed to load:', img.src);
    
    // Create a placeholder div
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
        width: ${img.offsetWidth || 300}px;
        height: ${img.offsetHeight || 200}px;
        background: linear-gradient(135deg, var(--gray-200), var(--gray-300));
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--gray-600);
        font-size: 1rem;
        border-radius: 8px;
    `;
    placeholder.textContent = '🖼️ Image unavailable';
    
    // Replace the image with the placeholder
    img.parentNode.insertBefore(placeholder, img);
    img.style.display = 'none';
}