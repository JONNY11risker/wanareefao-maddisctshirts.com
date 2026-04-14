// ==================== FORM SUBMISSION (UPDATED) ====================

// T-SHIRT ORDER FORM (WhatsApp ORDER - CLEAN VERSION)
document.getElementById('tshirtForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    clearMessages('tshirt');

    if (!validateTshirtForm()) return;

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const size = document.getElementById('size').value;
    const quantity = document.getElementById('quantity').value;

    const color = document.querySelector('input[name="color"]:checked')?.value || "Not selected";
    const image = document.querySelector('input[name="image"]:checked')?.value || "Not selected";
    const specialRequest = document.getElementById('specialRequest')?.value.trim() || "None";

    const message =
`🔥 MAD DISCIPLES ORDER 👕🔥

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Size: ${size}
Quantity: ${quantity}
Color: ${color}
Design: ${image}
Special Request: ${specialRequest}

Please confirm my order.`;

    const admin1 = "254725820929";
    const admin2 = "254711729501";

window.open(`https://wa.me/${admin1}?text=${encodeURIComponent(message)}`, "_blank");
window.open(`https://wa.me/${admin2}?text=${encodeURIComponent(message)}`, "_blank");
    
    const msg = document.getElementById('tshirtMessage');
    if (msg) {
        msg.textContent = "Opening WhatsApp to complete your order...";
        msg.classList.add('show', 'success');
        msg.style.display = "block";
    }
});


// CONTACT FORM (WhatsApp - UPDATED)
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    clearMessages('contact');

    if (!validateContactForm()) return;

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const whatsappText =
`📩 NEW CONTACT MESSAGE

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`;

    const admin1 = "254725820929";
    const admin2 = "254711729501";

window.open(`https://wa.me/${admin1}?text=${encodeURIComponent(whatsappText)}`, "_blank");
window.open(`https://wa.me/${admin2}?text=${encodeURIComponent(whatsappText)}`, "_blank");
});


// ==================== VALIDATION (CLEAN + SAFE) ====================

function validateTshirtForm() {
    let isValid = true;

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const size = document.getElementById('size').value;
    const quantity = document.getElementById('quantity').value;

    if (!firstName || firstName.length < 2) {
        showError('firstName', 'First name must be at least 2 characters');
        isValid = false;
    } else clearError('firstName');

    if (!lastName || lastName.length < 2) {
        showError('lastName', 'Last name must be at least 2 characters');
        isValid = false;
    } else clearError('lastName');

    if (!email || !isValidEmail(email)) {
        showError('email', 'Enter a valid email');
        isValid = false;
    } else clearError('email');

    if (!phone || !isValidPhone(phone)) {
        showError('phone', 'Enter a valid phone number');
        isValid = false;
    } else clearError('phone');

    if (!size) {
        showError('size', 'Please select a size');
        isValid = false;
    } else clearError('size');

    if (!quantity || quantity < 1 || quantity > 100) {
        showError('quantity', 'Quantity must be between 1 and 100');
        isValid = false;
    } else clearError('quantity');

    return isValid;
}


function validateContactForm() {
    let isValid = true;

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || name.length < 3) {
        showError('contactName', 'Name must be at least 3 characters');
        isValid = false;
    } else clearError('contactName');

    if (!email || !isValidEmail(email)) {
        showError('contactEmail', 'Enter a valid email');
        isValid = false;
    } else clearError('contactEmail');

    if (!subject || subject.length < 5) {
        showError('subject', 'Subject must be at least 5 characters');
        isValid = false;
    } else clearError('subject');

    if (!message || message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    } else clearError('message');

    return isValid;
}


// ==================== HELPERS ====================

function showError(field, msg) {
    const el = document.getElementById(field + 'Error');
    const input = document.getElementById(field);

    if (el) {
        el.textContent = msg;
        el.classList.add('show');
    }

    if (input) input.classList.add('error');
}

function clearError(field) {
    const el = document.getElementById(field + 'Error');
    const input = document.getElementById(field);

    if (el) {
        el.textContent = '';
        el.classList.remove('show');
    }

    if (input) input.classList.remove('error');
}

function clearMessages(type) {
    const msg = document.getElementById(type === 'tshirt' ? 'tshirtMessage' : 'contactMessage');
    if (msg) {
        msg.classList.remove('show', 'success', 'error');
        msg.style.display = 'none';
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[0-9+\s\-()]{10,}$/.test(phone);
}


// ==================== REAL-TIME VALIDATION ====================

['firstName','lastName','email','phone','size','quantity'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => clearError(id));
});

['contactName','contactEmail','subject','message'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => clearError(id));
});


// ==================== SMOOTH SCROLL ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// ==================== PAGE LOAD ANIMATION ====================

window.addEventListener('load', function () {
    const sections = document.querySelectorAll('.shop-section, .contact-section');

    sections.forEach((section, i) => {
        section.style.opacity = '0';
        section.style.animation = `fadeInUp 0.8s ease ${i * 0.2}s forwards`;
    });
});
