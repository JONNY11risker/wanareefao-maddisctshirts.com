// ==================== Form Submission Handlers ====================

// T-Shirt Order Form
document.getElementById('tshirtForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous messages
    clearMessages('tshirt');
    
    // Validate form
    if (validateTshirtForm()) {
        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            size: document.getElementById('size').value,
            quantity: document.getElementById('quantity').value,
            color: document.querySelector('input[name="color"]:checked').value,
            specialRequest: document.getElementById('specialRequest').value
        };
        
        // Process order
        processOrder(formData);
    }
});

// Contact Admin Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous messages
    clearMessages('contact');
    
    // Validate form
    if (validateContactForm()) {
        // Get form data
        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Process contact
        processContact(formData);
    }
});

// ==================== Validation Functions ====================

function validateTshirtForm() {
    let isValid = true;
    
    // Validate First Name
    const firstName = document.getElementById('firstName').value.trim();
    if (!firstName) {
        showError('firstName', 'First name is required');
        isValid = false;
    } else if (firstName.length < 2) {
        showError('firstName', 'First name must be at least 2 characters');
        isValid = false;
    } else {
        clearError('firstName');
    }
    
    // Validate Last Name
    const lastName = document.getElementById('lastName').value.trim();
    if (!lastName) {
        showError('lastName', 'Last name is required');
        isValid = false;
    } else if (lastName.length < 2) {
        showError('lastName', 'Last name must be at least 2 characters');
        isValid = false;
    } else {
        clearError('lastName');
    }
    
    // Validate Email
    const email = document.getElementById('email').value.trim();
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError('email');
    }
    
    // Validate Phone
    const phone = document.getElementById('phone').value.trim();
    if (!phone) {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    } else {
        clearError('phone');
    }
    
    // Validate Size
    const size = document.getElementById('size').value;
    if (!size) {
        showError('size', 'Please select a size');
        isValid = false;
    } else {
        clearError('size');
    }
    
    // Validate Quantity
    const quantity = document.getElementById('quantity').value;
    if (!quantity || quantity < 1) {
        showError('quantity', 'Quantity must be at least 1');
        isValid = false;
    } else if (quantity > 100) {
        showError('quantity', 'Maximum quantity is 100');
        isValid = false;
    } else {
        clearError('quantity');
    }
    
    return isValid;
}

function validateContactForm() {
    let isValid = true;
    
    // Validate Name
    const contactName = document.getElementById('contactName').value.trim();
    if (!contactName) {
        showError('contactName', 'Name is required');
        isValid = false;
    } else if (contactName.length < 3) {
        showError('contactName', 'Name must be at least 3 characters');
        isValid = false;
    } else {
        clearError('contactName');
    }
    
    // Validate Email
    const contactEmail = document.getElementById('contactEmail').value.trim();
    if (!contactEmail) {
        showError('contactEmail', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(contactEmail)) {
        showError('contactEmail', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError('contactEmail');
    }
    
    // Validate Subject
    const subject = document.getElementById('subject').value.trim();
    if (!subject) {
        showError('subject', 'Subject is required');
        isValid = false;
    } else if (subject.length < 5) {
        showError('subject', 'Subject must be at least 5 characters');
        isValid = false;
    } else {
        clearError('subject');
    }
    
    // Validate Message
    const message = document.getElementById('message').value.trim();
    if (!message) {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    } else {
        clearError('message');
    }
    
    return isValid;
}

// ==================== Helper Validation Functions ====================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function showError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + 'Error');
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

function clearError(fieldName) {
    const errorElement = document.getElementById(fieldName + 'Error');
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    if (inputElement) {
        inputElement.classList.remove('error');
    }
}

// ==================== Form Processing Functions ====================

function processOrder(data) {
    // Simulate sending data to server
    console.log('T-Shirt Order Submitted:', data);
    
    // In a real application, you would send this data to a backend server
    // For now, we'll just show a success message
    
    // Simulate API call
    const messageElement = document.getElementById('tshirtMessage');
    messageElement.textContent = 'Processing your order...';
    messageElement.classList.add('show', 'success');
    messageElement.style.display = 'block';
    
    // Simulate delay and success response
    setTimeout(() => {
        messageElement.innerHTML = `
            <strong>Order Received!</strong><br>
            Thank you for your order, ${data.firstName}! 
            We've sent a confirmation email to ${data.email}.<br>
            Your order will be ready soon!
        `;
        messageElement.classList.remove('error');
        messageElement.classList.add('success');
        
        // Reset form
        document.getElementById('tshirtForm').reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageElement.classList.remove('show');
            messageElement.style.display = 'none';
        }, 5000);
    }, 1500);
}

function processContact(data) {
    // Simulate sending message to admin
    console.log('Contact Message Submitted:', data);
    
    // In a real application, you would send this data to a backend server
    // For now, we'll just show a success message
    
    // Simulate API call
    const messageElement = document.getElementById('contactMessage');
    messageElement.textContent = 'Sending your message...';
    messageElement.classList.add('show', 'success');
    messageElement.style.display = 'block';
    
    // Simulate delay and success response
    setTimeout(() => {
        messageElement.innerHTML = `
            <strong>Message Sent Successfully!</strong><br>
            Thank you for reaching out, ${data.name}! 
            Admin will review your message and get back to you at ${data.email} shortly.
        `;
        messageElement.classList.remove('error');
        messageElement.classList.add('success');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageElement.classList.remove('show');
            messageElement.style.display = 'none';
        }, 5000);
    }, 1500);
}

function clearMessages(formType) {
    const messageElement = formType === 'tshirt' 
        ? document.getElementById('tshirtMessage')
        : document.getElementById('contactMessage');
    
    if (messageElement) {
        messageElement.classList.remove('show', 'success', 'error');
        messageElement.style.display = 'none';
    }
}

// ==================== Real-time Validation ====================

// Real-time validation for T-Shirt form
document.getElementById('firstName')?.addEventListener('blur', function() {
    if (this.value.trim() && this.value.trim().length >= 2) {
        clearError('firstName');
    }
});

document.getElementById('lastName')?.addEventListener('blur', function() {
    if (this.value.trim() && this.value.trim().length >= 2) {
        clearError('lastName');
    }
});

document.getElementById('email')?.addEventListener('blur', function() {
    if (this.value.trim() && isValidEmail(this.value.trim())) {
        clearError('email');
    }
});

document.getElementById('phone')?.addEventListener('blur', function() {
    if (this.value.trim() && isValidPhone(this.value.trim())) {
        clearError('phone');
    }
});

document.getElementById('size')?.addEventListener('change', function() {
    if (this.value) {
        clearError('size');
    }
});

document.getElementById('quantity')?.addEventListener('change', function() {
    if (this.value && this.value >= 1 && this.value <= 100) {
        clearError('quantity');
    }
});

// Real-time validation for Contact form
document.getElementById('contactName')?.addEventListener('blur', function() {
    if (this.value.trim() && this.value.trim().length >= 3) {
        clearError('contactName');
    }
});

document.getElementById('contactEmail')?.addEventListener('blur', function() {
    if (this.value.trim() && isValidEmail(this.value.trim())) {
        clearError('contactEmail');
    }
});

document.getElementById('subject')?.addEventListener('blur', function() {
    if (this.value.trim() && this.value.trim().length >= 5) {
        clearError('subject');
    }
});

document.getElementById('message')?.addEventListener('blur', function() {
    if (this.value.trim() && this.value.trim().length >= 10) {
        clearError('message');
    }
});

// ==================== Smooth Scroll Enhancement ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== Page Load Animation ====================

window.addEventListener('load', function() {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('.shop-section, .contact-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.animation = `fadeInUp 0.8s ease ${index * 0.2}s forwards`;
    });
});
