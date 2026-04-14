// ================= ADMIN NUMBERS =================
const admin1 = "254725820929";
const admin2 = "254711729501";

// ================= ORDER FORM =================
document.getElementById("tshirtForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const size = document.getElementById("size").value;
    const quantity = document.getElementById("quantity").value;
    const color = document.querySelector('input[name="color"]:checked')?.value;
    const specialRequest = document.getElementById("specialRequest").value;

    if (!firstName || !lastName || !email || !phone || !size || !quantity) {
        alert("Please fill all required fields");
        return;
    }

    const message =
`🔥 NEW ORDER

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Size: ${size}
Quantity: ${quantity}
Color: ${color || "Not selected"}
Request: ${specialRequest || "None"}`;

    window.open(`https://wa.me/${admin1}?text=${encodeURIComponent(message)}`, "_blank");
    window.open(`https://wa.me/${admin2}?text=${encodeURIComponent(message)}`, "_blank");

    document.getElementById("tshirtMessage").innerText = "Order sent to WhatsApp!";
});

// ================= CONTACT FORM =================
document.getElementById("contactForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const text =
`📩 CONTACT

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}`;

    window.open(`https://wa.me/${admin1}?text=${encodeURIComponent(text)}`, "_blank");
    window.open(`https://wa.me/${admin2}?text=${encodeURIComponent(text)}`, "_blank");
});

// ================= WHATSAPP BUTTON =================
document.getElementById("orderWhatsAppBtn")?.addEventListener("click", function(e) {
    e.preventDefault();

    const msg = "Hello MAD DISCIPLES 👕 I want to place an order.";

    window.open(`https://wa.me/${admin1}?text=${encodeURIComponent(msg)}`, "_blank");
    window.open(`https://wa.me/${admin2}?text=${encodeURIComponent(msg)}`, "_blank");
});
