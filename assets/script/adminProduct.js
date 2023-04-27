let userProfile = document.querySelector("#userProfile");
const adminLogout = document.querySelector('#logout');
const totalOrders = document.querySelector('#totalOrders');

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