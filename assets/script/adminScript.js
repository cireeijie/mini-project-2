let userProfile = document.querySelector("#userProfile");
let dropdownMenu = document.querySelector("#dropdownMenu");
let caretDown = document.querySelector("#caretDown");
let caretUp = document.querySelector("#caretUp");
const adminLogout = document.querySelector('#logout');

// Redirect if not logged in
window.onload = () => {
    let auth = localStorage.getItem('isAuthorized')
    if(auth == 'false') {
        window.location.assign('index.html');
        alert("You are not authorized! Please login.");
    }
}

// Redirect to index if logged out

adminLogout.addEventListener('click', () => {
    localStorage.setItem('isAuthorized', false)
    window.location.assign('index.html');
    alert('You are logged out!');
})

userProfile.addEventListener("click", () => {
    dropdownMenu.classList.toggle("displayMenu");
    caretDown.classList.toggle("rotate-caret");
})


// get orders

let customers = JSON.parse(localStorage.getItem('customers'));

if(customers == null) {
    customers = [];
}

customers.forEach(customer => {
    displayOrders(customer.id, customer.firstname, customer.lastname, customer.orders, customer.payment, customer.paymentinfo);
});

function displayOrders(id, firstname, lastname, orders, payment, paymentinfo ) {
    const ordersSection = document.querySelector('.admin-list-information');

    const orderContainer = document.createElement('div');
    orderContainer.classList.add('customers-order-container');

    const userImage = document.createElement('div');
    userImage.classList.add('user-image')
    userImage.innerHTML = `<i class="fa-solid fa-user"></i>`;
    orderContainer.appendChild(userImage);

    const orderId = document.createElement('p');
    orderId.classList.add('customer-id');
    orderId.innerHTML = `No: #${id}`;
    orderContainer.appendChild(orderId);

    const customerName = document.createElement('p');
    customerName.classList.add('customer-name');
    customerName.innerHTML = `Name: ${firstname} ${lastname}`;
    orderContainer.appendChild(customerName);

    const orderList = document.createElement('div')
    orderList.classList.add('customer-orders');
    orders.forEach(order => {
        let orderItem = order.join();
        
        const itemOrdered = document.createElement('p');
        itemOrdered.innerHTML = orderItem
        orderList.appendChild(itemOrdered);
    });
    orderContainer.appendChild(orderList);

    const paymentMethod = document.createElement('p');
    paymentMethod.classList.add('p-method');
    paymentMethod.innerHTML = `Payment method: ${payment}`;
    orderContainer.appendChild(paymentMethod);

    const payInfo = document.createElement('p');
    payInfo.classList.add('p-info');
    payInfo.innerHTML = `Info: ${paymentinfo}`;
    orderContainer.appendChild(payInfo);

    ordersSection.appendChild(orderContainer);
}


// Do sorting in category
let choosenCategory = document.querySelector("#productCategory");
choosenCategory.addEventListener("change", sortCategory);


function sortCategory() {
    let choosenCategory = document.querySelector("#productCategory").value;
    let riceMeals = document.querySelectorAll("#riceMeals");
    let kimbap = document.querySelectorAll("#kimbap");
    let bestSeller = document.querySelectorAll("#bestSeller");

    // condition for best seller - filter best seller
    if (choosenCategory == "Best Seller") {
        for (let x = 0; x < riceMeals.length; x++) {
            riceMeals[x].classList.add("displayNone");
        }
        for (let y=0; y < kimbap.length; y++) {
            kimbap[y].classList.add("displayNone");
        }
        for (let z=0; z < bestSeller.length; z++) {
            bestSeller[z].classList.remove("displayNone")
        }
    }

    // condition for rice meals - filter rice meals
    else if (choosenCategory == "Rice Meals") {
        for (let x = 0; x < bestSeller.length; x++) {
            bestSeller[x].classList.add("displayNone");
        }
        for (let y=0; y < kimbap.length; y++) {
            kimbap[y].classList.add("displayNone");
        }
        for (let z=0; z < riceMeals.length; z++) {
            riceMeals[z].classList.remove("displayNone")
        }
    }

    // condition for kimbap - filter kimbap
    else if (choosenCategory == "Kimbap")
    {
        for (let x = 0; x < bestSeller.length; x++) {
            bestSeller[x].classList.add("displayNone");
        }
        for (let y=0; y < riceMeals.length; y++) {
            riceMeals[y].classList.add("displayNone");
        }
        for (let z=0; z < kimbap.length; z++) {
            kimbap[z].classList.remove("displayNone")
        }
    }

    // condition for all categories - filter all
    else {
        for (let x = 0; x < bestSeller.length; x++) {
            bestSeller[x].classList.remove("displayNone");
        }
        for (let y=0; y < riceMeals.length; y++) {
            riceMeals[y].classList.remove("displayNone");
        }
        for (let z=0; z < kimbap.length; z++) {
            kimbap[z].classList.remove("displayNone")
        }
    }
}

