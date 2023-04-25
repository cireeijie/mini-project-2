const orderList = document.querySelector("#orders");
const itemQty = document.querySelector("#qty");

function addToCart(name, prices, id, qty) {
    const order = document.createElement('div');
    order.classList.add('order');

    const itemName = document.createElement('p');
    itemName.innerHTML = name;
    itemName.classList.add('item-name');
    order.appendChild(itemName);

    const itemVar = document.createElement('select');
    itemVar.setAttribute("id", `itemVar${id}`);
    itemVar.classList.add('item-var');

    for(let i = 0; i < prices.length; i++) {
        for(let x = 0; x < 1; x++) {
            const variation = document.createElement('option');
            variation.innerHTML = prices[i][x];
            variation.value = prices[i][x+1];
            itemVar.appendChild(variation);
        }
    }

    order.appendChild(itemVar);
    
    const quantity = document.createElement('input');
    quantity.classList.add('quantity')
    quantity.setAttribute("id", `item${id}`);
    quantity.setAttribute("min", '0');
    quantity.type = "number";
    quantity.value = qty;
    order.appendChild(quantity);

    const itemPrice = document.createElement('p');
    itemPrice.setAttribute("id", `price${id}`);
    itemPrice.classList.add('item-price');
    itemPrice.innerHTML ="₱"+ prices[0][1];
    order.appendChild(itemPrice);

    const deleteItem = document.createElement('i');
    deleteItem.classList.add('delete-btn');
    deleteItem.classList.add('fa-solid');
    deleteItem.classList.add('fa-xmark');
    deleteItem.setAttribute("id", `deleteBtn${id}`);
    order.appendChild(deleteItem);

    orderList.appendChild(order);

    itemQty.innerHTML = orderList.childNodes.length;
}

export default addToCart