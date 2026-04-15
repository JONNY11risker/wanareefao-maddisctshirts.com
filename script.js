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

    const orderId = "MD-" + Date.now();

    const message =
`🔥 MAD DISCIPLES ORDER

Order ID: ${orderId}

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Size: ${size}
Quantity: ${quantity}
Color: ${color || "Not selected"}
Request: ${request || "None"}`;

    // ✅ WhatsApp
    window.open(`https://wa.me/${admin1}?text=${encodeURIComponent(message)}`, "_blank");
    window.open(`https://wa.me/${admin2}?text=${encodeURIComponent(message)}`, "_blank");

    // ✅ EmailJS
    emailjs.send("service_clhjwwf", "template_jtxcpm3", {
        order_id: orderId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        size: size,
        quantity: quantity,
        color: color || "Not selected",
        request: request || "None",
        full_message: message
    })
    .then(function(response) {
        console.log("SUCCESS!", response.status, response.text);
    })
    .catch(function(error) {
        console.log("FAILED...", error);
        alert("Email failed. Check console.");
    });

    // ✅ Download receipt
    downloadReceipt(orderId, message);

    // ✅ Show success
    document.getElementById("tshirtMessage").innerText =
    `Order sent! Your Order ID is ${orderId}`;
});


/* ✅ OUTSIDE FUNCTION (IMPORTANT) */
function downloadReceipt(orderId, message) {
    const blob = new Blob([message], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = `${orderId}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


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

    const msg = "Hello MAD DISCIPLES 👕 I want to place an order for a t-shirt can you send me the logo template so i can choose one, i'll contact you with name details on response.";

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
