// ==================== Form Submission Handlers ====================

// T-Shirt Order Form
document.getElementById('tshirtForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Clear previous messages
    clearMessages('tshirt');
    
    // Validate form
    if (validateTshirtForm()) {
        const messageElement = document.getElementById('tshirtMessage');
        messageElement.textContent = 'Sending your order...';
        messageElement.classList.add('show', 'success');
        messageElement.style.display = 'block';
        
        try {
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                messageElement.innerHTML = `
                    <strong>Order Sent Successfully!</strong><br>
                    Thank you for your order! We'll contact you soon.
                `;
                this.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            messageElement.innerHTML = `
                <strong>Error Sending Order</strong><br>
                Please try again or contact us directly.
            `;
            messageElement.classList.remove('success');
            messageElement.classList.add('error');
        }
        
        setTimeout(() => {
            messageElement.classList.remove('show');
            messageElement.style.display = 'none';
        }, 5000);
    }
});

// Contact Admin Form
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Clear previous messages
    clearMessages('contact');
    
    // Validate form
    if (validateContactForm()) {
        const messageElement = document.getElementById('contactMessage');
        messageElement.textContent = 'Sending your message...';
        messageElement.classList.add('show', 'success');
        messageElement.style.display = 'block';
        
        try {
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                messageElement.innerHTML = `
                    <strong>Message Sent Successfully!</strong><br>
                    Thank you for contacting us! We'll get back to you soon.
                `;
                this.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            messageElement.innerHTML = `
                <strong>Error Sending Message</strong><br>
                Please try again or contact us directly.
            `;
            messageElement.classList.remove('success');
            messageElement.classList.add('error');
        }
        
        setTimeout(() => {
            messageElement.classList.remove('show');
            messageElement.style.display = 'none';
        }, 5000);
    }
});

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
    // Focus on the first phone input
    const firstPhoneInput = document.querySelector('.payment-phone-input');
    if (firstPhoneInput) {
        firstPhoneInput.focus();
    }
});

// Payment phone number management
let paymentPhoneCounter = 1;

document.getElementById('addPaymentPhone').addEventListener('click', function() {
    const paymentPhones = document.querySelector('.payment-phones');
    
    const phoneItem = document.createElement('div');
    phoneItem.className = 'payment-phone-item';
    phoneItem.id = `paymentPhoneItem${paymentPhoneCounter}`;
    
    phoneItem.innerHTML = `
        <input type="tel" class="payment-phone-input" placeholder="Enter phone number" pattern="[0-9+]{10,15}">
        <button type="button" class="remove-payment-phone" data-id="${paymentPhoneCounter}">Remove</button>
    `;
    
    paymentPhones.appendChild(phoneItem);
    
    // Add remove button listener
    phoneItem.querySelector('.remove-payment-phone').addEventListener('click', function() {
        const itemId = this.getAttribute('data-id');
        document.getElementById(`paymentPhoneItem${itemId}`).remove();
    });
    
    paymentPhoneCounter++;
});

// Modal close handlers
document.getElementById('cancelPayment').addEventListener('click', function() {
    document.getElementById('mpesaModal').style.display = 'none';
    // Reset phone inputs but keep the first one
    const paymentPhones = document.querySelectorAll('.payment-phone-input');
    paymentPhones.forEach((input, index) => {
        if (index === 0) {
            input.value = '';
            input.focus();
        }
    });
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
    const paymentPhones = document.querySelectorAll('.payment-phone-input');
    const selectedNumbers = Array.from(paymentPhones)
        .map(input => input.value.trim())
        .filter(val => val !== '');
    
    if (selectedNumbers.length === 0) {
        alert('Please enter at least one phone number to proceed with payment.');
        return;
    }
    
    // Validate phone numbers
    const phoneRegex = /^(\+254|0)[1-9][0-9]{8}$/;
    for (let number of selectedNumbers) {
        if (!phoneRegex.test(number)) {
            alert('Please enter valid phone numbers (e.g., 0725820929 or +254725820929).');
            return;
        }
    }
    
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const primaryNumber = selectedNumbers[0];
    const amount = 500;
    
    // Format number for USSD codes
    let formattedNumber = primaryNumber.startsWith('+254') 
        ? primaryNumber.substring(1) 
        : primaryNumber;
    
    let ussdCode = '';
    
    switch(selectedMethod) {
        case 'mpesa':
            // M-Pesa USSD code
            ussdCode = `*384*348#`;
            // M-Pesa URL scheme (if app is installed)
            const mpesaUrl = `tel:${ussdCode}`;
            window.location.href = mpesaUrl;
            break;
            
        case 'airtel':
            // Airtel Money USSD code
            ussdCode = `*360#`;
            const airtelUrl = `tel:${ussdCode}`;
            window.location.href = airtelUrl;
            break;
            
        case 'simtoolkit':
            // SIM Toolkit menu
            window.location.href = `tel:*679#`;
            break;
    }
    
    // Show confirmation message
    alert(`Payment Instructions:\\n\\nMethod: ${selectedMethod.toUpperCase()}\\nPhone: ${primaryNumber}\\nAmount: KSH ${amount}\\n\\nFollow the prompts to enter your PIN and complete the payment.\\n\\nYour order will be confirmed once payment is successful.`);
    
    // Close modal
    document.getElementById('mpesaModal').style.display = 'none';
    
    // Reset phone inputs
    document.querySelectorAll('.payment-phone-input').forEach((input, index) => {
        if (index === 0) {
            input.value = '';
        }
    });
});

// ==================== Dynamic Phone Numbers ====================

let phoneCounter = 3; // Start from 3 since we have primary and secondary

document.getElementById('addPhoneButton').addEventListener('click', function() {
    const additionalPhones = document.getElementById('additionalPhones');
    
    // Create new phone input row
    const phoneRow = document.createElement('div');
    phoneRow.className = 'form-row';
    phoneRow.id = `phoneRow${phoneCounter}`;
    
    const roleLabel = phoneCounter === 3 ? 'Developer Mobile' : `Other Mobile ${phoneCounter - 3}`;
    
    phoneRow.innerHTML = `
        <div class="form-group full-width">
            <label for="mobile${phoneCounter}">${roleLabel}</label>
            <div class="mobile-input-group" style="display: flex; flex-direction: row; gap: 1rem;">
                <input type="tel" id="mobile${phoneCounter}" name="mobile${phoneCounter}" placeholder="Enter mobile number" style="flex: 1;">
                <button type="button" class="btn btn-danger remove-phone" data-row="${phoneCounter}" style="margin: 0; padding: 0.75rem 1rem; white-space: nowrap;">Remove</button>
            </div>
            <span class="error-message" id="mobile${phoneCounter}Error"></span>
        </div>
    `;
    
    additionalPhones.appendChild(phoneRow);
    phoneCounter++;
    
    // Add event listener for the remove button
    phoneRow.querySelector('.remove-phone').addEventListener('click', function() {
        const rowId = this.getAttribute('data-row');
        document.getElementById(`phoneRow${rowId}`).remove();
    });
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

    const logoFile = document.getElementById('logoUpload').files[0];
    if (!logoFile) {
        showError('logoUpload', 'Please upload a logo image');
        isValid = false;
    } else {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/jfif'];
        if (!allowedTypes.includes(logoFile.type)) {
            showError('logoUpload', 'Please upload a valid image file (PNG, JPG, JPEG, JFIF)');
            isValid = false;
        } else {
            clearError('logoUpload');
        }
    }

    const logo = document.querySelector('input[name="logo"]:checked');
    if (!logo) {
        showError('logo', 'Please select a logo option');
        isValid = false;
    } else {
        clearError('logo');
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

    // Validate Primary Mobile (optional)
    const primaryMobile = document.getElementById('primaryMobile').value.trim();
    if (primaryMobile && !isValidPhone(primaryMobile)) {
        showError('primaryMobile', 'Please enter a valid phone number');
        isValid = false;
    } else {
        clearError('primaryMobile');
    }

    // Validate Secondary Mobile (optional)
    const secondaryMobile = document.getElementById('secondaryMobile').value.trim();
    if (secondaryMobile && !isValidPhone(secondaryMobile)) {
        showError('secondaryMobile', 'Please enter a valid phone number');
        isValid = false;
    } else {
        clearError('secondaryMobile');
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

document.getElementById('primaryMobile')?.addEventListener('blur', function() {
    if (!this.value.trim() || isValidPhone(this.value.trim())) {
        clearError('primaryMobile');
    }
});

document.getElementById('secondaryMobile')?.addEventListener('blur', function() {
    if (!this.value.trim() || isValidPhone(this.value.trim())) {
        clearError('secondaryMobile');
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
