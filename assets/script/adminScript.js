let userProfile = document.querySelector("#userProfile");
let dropdownMenu = document.querySelector("#dropdownMenu");
let caretDown = document.querySelector("#caretDown");
let caretUp = document.querySelector("#caretUp");
const adminLogout = document.querySelector('#logout');
const totalOrders = document.querySelector('#totalOrders');

// Redirect if not logged in
const auth = localStorage.getItem('isAuthorized')
window.onload = () => {
    let auth = localStorage.getItem('isAuthorized')
    if(auth == 'false') {
        window.location.assign('index.html');
        alert("You are not authorized! Please login.");
    }
}

// Redirect to index if logged out

userProfile.addEventListener("click", () => {
    dropdownMenu.classList.toggle("displayMenu");
    caretDown.classList.toggle("rotate-caret");
})

adminLogout.addEventListener('click', () => {
    localStorage.setItem('isAuthorized', false)
    window.location.assign('index.html');
    alert('You are logged out!');
})

// get orders

let customers = JSON.parse(localStorage.getItem('customers'));

if(customers == null) {
    customers = [];
}

// Display number of orders

totalOrders.innerHTML = customers.length;

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

    const orderStatus = document.createElement('div');
    orderStatus.classList.add('order-status')

    const statusPending = document.createElement('div');
    statusPending.classList.add('pending');
    statusPending.setAttribute('id', `statusPending${id}`);
    statusPending.innerHTML = `<i id="pendingCircle${id}" class="fa-solid fa-circle"></i> Pending`;
    orderStatus.appendChild(statusPending);

    const statusDispatched = document.createElement('div');
    statusDispatched.classList.add('dispatched');
    statusDispatched.setAttribute('id', `statusDispatched${id}`);
    statusDispatched.innerHTML = `<i id="dispatchedCircle${id}" class="fa-solid fa-circle"></i> Dispatched`;
    orderStatus.appendChild(statusDispatched);

    orderContainer.appendChild(orderStatus);

    ordersSection.appendChild(orderContainer);
}

const ordersListener = document.querySelector('.admin-list-information');
const sPending = document.querySelector('#pendingCircle');
const sDispatched = document.querySelector('#dispatchedCircle');

ordersListener.addEventListener('click', (e) => {
    let cusOrder = JSON.parse(localStorage.getItem('customers'));

    if(cusOrder == null) {
        cusOrder = [];
    }

    let pendingOrders = JSON.parse(localStorage.getItem('pendingOrders'));

    if(pendingOrders == null) {
        pendingOrders = [];
    }

    let dispatchedOrders = JSON.parse(localStorage.getItem('dispatchedOrders'));

    if(dispatchedOrders == null) {
        dispatchedOrders = [];
    }

    let clicked = e.target.id.match(/\d/g);
    let getIdNumber = clicked.join('');

    if(e.target.id == `statusPending${getIdNumber}`) {
        let pendingCircle = document.querySelector(`#pendingCircle${getIdNumber}`);
        let dispatchedCircle = document.querySelector(`#dispatchedCircle${getIdNumber}`);
        pendingCircle.classList.add('status-pending');
        dispatchedCircle.classList.remove('status-dispatched');
        
        const getOrder = cusOrder.filter(order => order.id == getIdNumber);
        const checkDispatchedOrders = dispatchedOrders.filter(order => order.id == getIdNumber);

        if(checkDispatchedOrders.length === 0) {
            let newDispatchedOrders = dispatchedOrders.filter(order => order.id != getIdNumber);
            if(newDispatchedOrders.length == 0) {
                newDispatchedOrders = []
            }
            pendingOrders.push(getOrder);

            localStorage.setItem('pendingOrders', JSON.stringify(pendingOrders));
            localStorage.setItem('dispatchedOrders', JSON.stringify(newDispatchedOrders));
        }
    }

    if(e.target.id == `statusDispatched${getIdNumber}`) {
        let pendingCircle = document.querySelector(`#pendingCircle${getIdNumber}`);
        let dispatchedCircle = document.querySelector(`#dispatchedCircle${getIdNumber}`);
        pendingCircle.classList.remove('status-pending');
        dispatchedCircle.classList.add('status-dispatched');
        
        const getOrder = cusOrder.filter(order => order.id == getIdNumber);
        const checkPendOrders = pendingOrders.filter(order => order.id == getIdNumber);

        if(checkPendOrders.length === 0) {
            let newPendingOrders = pendingOrders.filter(order => order.id != getIdNumber);
            console.log(newPendingOrders);
            if(newPendingOrders.length == 0) {
                newPendingOrders = [];
            }
            dispatchedOrders.push(getOrder);

            localStorage.setItem('pendingOrders', JSON.stringify(newPendingOrders));
            localStorage.setItem('dispatchedOrders', JSON.stringify(dispatchedOrders));
        } 
    }
})