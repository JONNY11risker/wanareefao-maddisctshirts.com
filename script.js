// ==================== Form Submission Handlers ====================

// T-Shirt Order Form
document.getElementById('tshirtForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous messages
    clearMessages('tshirt');
    
    // Validate form
    if (validateTshirtForm()) {
        const messageElement = document.getElementById('tshirtMessage');
        messageElement.textContent = 'Opening your email app...';
        messageElement.classList.add('show', 'success');
        messageElement.style.display = 'block';
        
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            size: document.getElementById('size').value,
            quantity: document.getElementById('quantity').value,
            color: document.querySelector('input[name="color"]:checked').value,
            logo: document.querySelector('input[name="logo"]:checked').value,
            specialRequest: document.getElementById('specialRequest').value.trim()
        };

        openMailto('jontychampee11@gmail.com', `MAD DISCIPLES Order from ${formData.firstName} ${formData.lastName}`, `Order Details:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Size: ${formData.size}
Quantity: ${formData.quantity}
Color: ${formData.color}
Logo: ${formData.logo}
Special Requests: ${formData.specialRequest || 'None'}`);

        setTimeout(() => {
            messageElement.innerHTML = `
                <strong>Email composer opened.</strong><br>
                Please send the email in your mail app to complete the order.
            `;
            messageElement.classList.remove('error');
            messageElement.classList.add('success');
        }, 500);
    }
});

// Contact Admin Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous messages
    clearMessages('contact');
    
    // Validate form
    if (validateContactForm()) {
        const messageElement = document.getElementById('contactMessage');
        messageElement.textContent = 'Opening your email app...';
        messageElement.classList.add('show', 'success');
        messageElement.style.display = 'block';
        
        const formData = {
            name: document.getElementById('contactName').value.trim(),
            email: document.getElementById('contactEmail').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        openMailto('jontychampee11@gmail.com', `${formData.subject} - ${formData.name}`, `Contact Message:
Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}

Contact us directly: 0725820929 or 0711729501`);

        setTimeout(() => {
            messageElement.innerHTML = `
                <strong>Email composer opened.</strong><br>
                Please send the email in your mail app to contact the author.
            `;
            messageElement.classList.remove('error');
            messageElement.classList.add('success');
        }, 500);
    }
});

function openMailto(recipient, subject, body) {
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}


// ==================== M-Pesa Payment Handler ====================

document.getElementById('payButton').addEventListener('click', function() {
    // Check if order form is filled (basic validation)
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const size = document.getElementById('size').value;
    const quantity = document.getElementById('quantity').value;
    
    if (!firstName || !lastName || !email || !phone || !size || !quantity) {
        alert('Please fill in your order details first before making payment.');
        document.getElementById('firstName').focus();
        return;
    }
    
    // Show M-Pesa modal
    document.getElementById('mpesaModal').style.display = 'block';
    // Focus on the phone input
    const paymentPhoneInput = document.getElementById('paymentPhone');
    if (paymentPhoneInput) {
        paymentPhoneInput.focus();
    }
});

// Modal close handlers
document.getElementById('cancelPayment').addEventListener('click', function() {
    document.getElementById('mpesaModal').style.display = 'none';
    // Reset phone input
    const paymentPhoneInput = document.getElementById('paymentPhone');
    if (paymentPhoneInput) {
        paymentPhoneInput.value = '';
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('mpesaModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Payment confirmation
document.getElementById('confirmPayment').addEventListener('click', function() {
    const paymentPhoneInput = document.getElementById('paymentPhone');
    const phoneNumber = paymentPhoneInput.value.trim();
    const amount = 500;
    const mpesaRecipient = '0703760756';
});    
    const phoneRegex = /^(\+254|0)[1-9][0-9]{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
        alert('Please enter a valid phone number like 0725820929 or +254725820929.');
        paymentPhoneInput.focus();
        return;
    }

    // Direct M-Pesa send prompt to the specified recipient number
    const mpesaUssdCode = `*150*1*1*${mpesaRecipient}*${amount}%23`;
    const mpesaLink = `tel:${mpesaUssdCode}`;

    window.location.href = mpesaLink;

    alert(`Payment Instructions:\n\nSend KSH ${amount} to ${mpesaRecipient} using M-Pesa.\n\nYour phone should open the M-Pesa prompt now. If it does not, manually dial ${mpesaUssdCode.replace('%23', '#')}.`);

    document.getElementById('mpesaModal').style.display = 'none';
    paymentPhoneInput.value = '';
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

    const image = document.getElementById("upload").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    document.getElementById("preview").src = URL.maddisc.jpg,mnaree.jpg(file);
  }
});



    
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

    // Validate Primary Mobile (optional) - removed since now a link
    // Validate Secondary Mobile (optional) - removed since now a link
    
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
    const inputElement = document.getElementById(fieldName) || document.querySelector(`input[name="${fieldName}"]`);
    
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
    const inputElement = document.getElementById(fieldName) || document.querySelector(`input[name="${fieldName}"]`);
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    if (inputElement) {
        inputElement.classList.remove('error');
    }
}

// ==================== Form Processing Functions ====================

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

// Real-time validation for Contact form mobile fields was removed because these are now link-only items.
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
