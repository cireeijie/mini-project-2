import getData from "./GetData.js"
import featuredProduct from "./featured.js"
import productDisplay from "./products.js"
import addToCart from "./orderList.js";

// Navbar JS Start
const navbar = document.querySelector('#navBar');
let top = navbar.offsetTop;

function stickyNavBar() {
    if(window.scrollY > top) {
        navbar.classList.add('sticky');
    }
    else {
        navbar.classList.remove('sticky');
    }
}

window.addEventListener('scroll', stickyNavBar);

// Navbar Js End


// Shop Page JS Start
const loadShopPage = async () => {
    const products = await getData();

    const kimbap = products.filter(product => product.category == 'kimbap');

    const ricemeal = products.filter(product => product.category == 'ricemeal');

    const featured = products.filter(product => product.isFeatured == true);

    featured.forEach(product => {
        featuredProduct(product.id, product.name, product.image, product.desc, Object.entries(product.prices), '#featured');
    })

    kimbap.forEach(product => {
        productDisplay(product.id, product.name, product.image, Object.entries(product.prices), '#kimbap');
    });

    ricemeal.forEach(product => {
        productDisplay(product.id, product.name, product.image, Object.entries(product.prices), '#riceMeal');
    })

}

loadShopPage();

// Shop Page JS End

// Add toCart Start
const addToCartBtn = document.querySelector("#shopSection");

addToCartBtn.addEventListener('click', addToCartList)

let orders = await JSON.parse(localStorage.getItem("orders"));

if(orders != null) {
    orders = JSON.parse(localStorage.getItem("orders"));
    await orders.forEach(order => {
        addToCart(order.name, Object.entries(order.prices), order.id, order.qty)
    })
}
else {
    orders = [];
}

function addToCartList(e) {
    if(e.target.classList == 'add-to-cart') {
        const cartBell = new Audio('assets/sound/bell.mp3');
        cartBell.play();

        const products = JSON.parse(localStorage.getItem("products"));
        const getItem = products.filter(product => product.id === e.target.id);

        const checkItem = orders.filter(item => item.id == getItem[0].id);
        
        if(checkItem.length >= 1) {
            const getOrder = orders.filter(order => order.id != getItem[0].id);
            const qtyContainer = document.querySelector(`#item${getItem[0].id}`);

            checkItem[0].qty = parseFloat(checkItem[0].qty) + 1;
            qtyContainer.value = checkItem[0].qty;

            getOrder.push(checkItem[0]);
            localStorage.setItem("orders", JSON.stringify(getOrder));
            updatePrice();
        }
        else {
            let orderItem = {
                id: getItem[0].id,
                name: getItem[0].name,
                qty: 1,
                prices: getItem[0].prices
            }
    
            addToCart(orderItem.name, Object.entries(orderItem.prices), orderItem.id, orderItem.qty);
    
            orders.push(orderItem);
            localStorage.setItem("orders", JSON.stringify(orders));
            updatePrice();
        } 
    }
}

const orderItems = document.querySelector('#orders');
const total = document.querySelector("#total");

orderItems.addEventListener('change', changeVar);
orderItems.addEventListener('click', deleteItem)

function changeVar(e) {
    if(e.target.classList == 'item-var') {
        const getId = e.target.id.match(/\d/g);
        const value = e.target.value;
        const price = document.querySelector(`#price${getId}`);
        price.innerHTML = `₱${value}`;
        updatePrice();
    }

    if(e.target.classList == 'quantity') {
        updatePrice();
    }
}

function deleteItem(e) {
    if(e.target.classList[0] == 'delete-btn') {
        const cartItems = document.querySelector('#qty');
        cartItems.innerHTML = orderItems.childElementCount - 1;

        const itemId = e.target.id.match(/\d/g);
        let id = itemId.join('');
        const delItem = orders.filter(item => item.id != id)

        orders = delItem;
        localStorage.setItem('orders', JSON.stringify(orders));

        updateCart();
        updatePrice();
    }
}

function updatePrice() {
    const prices = orderItems.childNodes;
    const orderPrice = Object.entries(prices);
    let priceTotal = 0;

    orderPrice.forEach(price => {
        const itemPrice = price[1].childNodes[3].innerText;
        const itemQty = price[1].childNodes[2].value;
        priceTotal += (parseFloat(itemPrice.substring(1)) * parseFloat(itemQty));
        
    });
    total.innerHTML = `₱${priceTotal}`;
}

updatePrice();

function updateCart() {
    const kids = orderItems.childElementCount;
    for(let i = 0; i < kids; i++) {
        orderItems.firstChild.remove();
    }

    orders.forEach(order => {
        addToCart(order.name, Object.entries(order.prices), order.id, order.qty)
    });
}

updateCart()

const closeCart = document.querySelector('.close-cart');
const openCart = document.querySelector('#cartToggle');
const cart = document.querySelector('#orderList');

closeCart.addEventListener('click', () => {
    cart.classList.remove('cart-visible');
})

openCart.addEventListener('click', () => {
    cart.classList.toggle('cart-visible');
    openCart.classList.toggle('to-back');
});


// Add to Cart End