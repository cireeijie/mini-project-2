function featuredProduct(id, name, image, desc, prices, section) {
    const featuredSection = document.querySelector(`${section}`);

    featuredSection.style.backgroundImage = `url(${image})`;

    const tag = document.createElement('span');
    tag.innerHTML = 'Best Seller!';
    tag.classList.add('tag');
    featuredSection.appendChild(tag);

    const priceSection = document.createElement('div');
    priceSection.classList.add('featured-price');
    featuredSection.appendChild(priceSection);

    for(const [key, value] of prices) {
        const priceContainer = document.createElement('div');
        priceContainer.classList.add('prices');

        const size = document.createElement('span');
        size.classList.add('size');
        size.innerHTML = `${key}`;
        priceContainer.appendChild(size);

        const price = document.createElement('span');
        price.classList.add('price');
        price.innerHTML = `${value}`;
        priceContainer.appendChild(price);

        priceSection.appendChild(priceContainer);
    }

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    const info = document.createElement('div');
    info.classList.add('info');
    productInfo.appendChild(info);

    const productName = document.createElement('p');
    productName.classList.add('name');
    productName.innerHTML = name;
    info.appendChild(productName);

    const description = document.createElement('p');
    description.classList.add('desc');
    description.innerHTML = desc;
    info.appendChild(description);

    const addToCart = document.createElement('a');
    addToCart.classList.add('add-to-cart');
    addToCart.setAttribute('id', id);
    addToCart.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Add to Cart`;
    productInfo.appendChild(addToCart)

    featuredSection.appendChild(productInfo);
}

export default featuredProduct