let cart = [];


/* ================= TAMBAH CART ================= */

function addCart(name, price) {

    const existing = cart.find(item => item.name === name);

    if (existing) {

        existing.qty++;

    } else {

        cart.push({
            name: name,
            price: price,
            qty: 1
        });

    }

    updateCart();

    openCart();
}


/* ================= UPDATE CART ================= */

function updateCart() {

    const cartCount = document.getElementById("cart-count");

    const totalQty = cart.reduce(
        (total, item) => total + item.qty,
        0
    );

    cartCount.innerText = totalQty;


    const cartItems =
        document.getElementById("cart-items");

    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((item, index) => {

        const subtotal =
            item.price * item.qty;

        total += subtotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <div class="cart-item-name">
                        ${item.name}
                    </div>

                    <div class="cart-item-price">
                        ${formatRupiah(item.price)}
                        × ${item.qty}
                    </div>

                </div>

                <button
                    class="remove-item"
                    onclick="removeCart(${index})">

                    HAPUS

                </button>

            </div>

        `;

    });


    document.getElementById("cart-total").innerText =
        formatRupiah(total);
}


/* ================= HAPUS CART ================= */

function removeCart(index) {

    cart.splice(index, 1);

    updateCart();
}


/* ================= FORMAT RUPIAH ================= */

function formatRupiah(number) {

    return "Rp" + number.toLocaleString("id-ID");

}


/* ================= OPEN CART ================= */

function openCart() {

    document
        .getElementById("cart-modal")
        .classList.add("show");

}


/* ================= CLOSE CART ================= */

function closeCart() {

    document
        .getElementById("cart-modal")
        .classList.remove("show");

}


/* ================= FILTER ================= */

function filterProduct(category) {

    const products =
        document.querySelectorAll(".product-card");

    const buttons =
        document.querySelectorAll(
            ".category-container button"
        );


    buttons.forEach(button => {
        button.classList.remove("active");
    });


    event.target.classList.add("active");


    products.forEach(product => {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


/* ================= WHATSAPP ================= */

function checkoutWhatsApp() {

    if (cart.length === 0) {

        alert("Keranjang masih kosong!");

        return;
    }


    let message =
        "Halo URBAN STREET77 👋%0A%0A" +
        "Saya ingin memesan:%0A";


    let total = 0;


    cart.forEach(item => {

        const subtotal =
            item.price * item.qty;

        total += subtotal;


        message +=
            "%0A• " +
            item.name +
            " x" +
            item.qty +
            " = " +
            formatRupiah(subtotal);

    });


    message +=
        "%0A%0A*TOTAL: " +
        formatRupiah(total) +
        "*";


    const phone =
        "6283890508425";


    const url =
        "https://wa.me/" +
        phone +
        "?text=" +
        message;


    window.open(url, "_blank");

}