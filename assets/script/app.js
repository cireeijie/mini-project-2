import getData from "./GetData.js"
import featuredProduct from "./featured.js"
import productDisplay from "./products.js"


// Navbar JS

const navbar = document.querySelector('#navBar');
let top = navbar.offsetTop;
console.log(top);
function stickyNavBar() {
    if(window.scrollY > top) {
        navbar.classList.add('sticky');
    }
    else {
        navbar.classList.remove('sticky');
    }
}

window.addEventListener('scroll', stickyNavBar);


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

// Shop Page JS End

loadShopPage();


