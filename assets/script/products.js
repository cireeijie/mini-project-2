function productDisplay(id, name, image, prices, section) {
    const productSection = document.querySelector(`${section}`);

    const productContainer = document.createElement('div');
    productContainer.classList.add('product-container');
    productSection.appendChild(productContainer);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container')
    productContainer.appendChild(imageContainer);

    const img = document.createElement('img');
    img.src = image;
    imageContainer.appendChild(img);

    const priceSection = document.createElement('div');
    priceSection.classList.add('price-container')

    for(let i = 0; i < prices.length; i++) {
        const priceContainer = document.createElement('div');
        priceContainer.classList.add('prices');

        for(let x = 0; x < prices[i].length; x++) {
            if(x == prices[i].length -1) {
                const price = document.createElement('span');
                price.classList.add('price')
                price.innerHTML = `₱${prices[i][x]}`;
                priceContainer.appendChild(price);
            }
            else {
                const size = document.createElement('span');
                size.classList.add('size');
                size.innerHTML = prices[i][x];
                priceContainer.appendChild(size);
            }
        }

        priceSection.appendChild(priceContainer);
    }
    imageContainer.appendChild(priceSection);

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    productContainer.appendChild(productInfo);

    const productName = document.createElement('span');
    productName.classList.add('product-name');
    productName.innerHTML = name;
    productInfo.appendChild(productName);

    const sizes = document.createElement('span');
    sizes.classList.add('variations');
    if(prices.length == 1) {
        sizes.innerHTML = `Sizes: ${prices[0][0]}`;
    }
    else {
        sizes.innerHTML = `Sizes: ${prices[0][0]}, ${prices[1][0]}`;
    }
    productInfo.appendChild(sizes);

    const cartBtn = document.createElement('a');
    cartBtn.classList.add('add-to-cart')
    cartBtn.setAttribute("id", id);
    cartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Add to Cart`;
    productContainer.appendChild(cartBtn);
}

export default productDisplay