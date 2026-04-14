const admin1 = "254725820929";
const admin2 = "254711729501";

/* ================= ORDER ================= */
document.getElementById("tshirtForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const size = document.getElementById("size").value;
    const quantity = document.getElementById("quantity").value;
    const color = document.querySelector('input[name="color"]:checked')?.value;
    const request = document.getElementById("specialRequest").value;

    if (!firstName || !lastName || !email || !phone || !size || !quantity) {
        alert("Please fill all required fields");
        return;
    }

    const message =
`🔥 MAD DISCIPLES ORDER

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Size: ${size}
Quantity: ${quantity}
Color: ${color || "Not selected"}
Request: ${request || "None"}`;

    window.open(`https://wa.me/${admin1}?text=${encodeURIComponent(message)}`, "_blank");
    window.open(`https://wa.me/${admin2}?text=${encodeURIComponent(message)}`, "_blank");

    document.getElementById("tshirtMessage").innerText = "Order sent successfully!";
});


/* ================= CONTACT ================= */
document.getElementById("contactForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const text =
`📩 CONTACT MESSAGE

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}`;

    window.open(`https://wa.me/${admin1}?text=${encodeURIComponent(text)}`, "_blank");
    window.open(`https://wa.me/${admin2}?text=${encodeURIComponent(text)}`, "_blank");
});


/* ================= WHATSAPP BUTTON ================= */
document.getElementById("orderWhatsAppBtn")?.addEventListener("click", function(e) {
    e.preventDefault();

    const msg = "Hello MAD DISCIPLES 👕 I want to place an order.";

    window.open(`https://wa.me/${admin1}?text=${encodeURIComponent(msg)}`, "_blank");
    window.open(`https://wa.me/${admin2}?text=${encodeURIComponent(msg)}`, "_blank");
});


/* ================= PAGE ANIMATION ================= */
window.addEventListener("load", () => {
    document.querySelectorAll(".form-container").forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        setTimeout(() => {
            el.style.transition = "0.6s";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, 200);
    });
});
