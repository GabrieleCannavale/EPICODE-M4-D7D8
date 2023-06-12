//? API Endpoint
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const authKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlNWFhZmI5YzBmNzAwMTQ0ODRmMDYiLCJpYXQiOjE2ODYwMDIzNTIsImV4cCI6MTY4NzIxMTk1Mn0.fnPfQ7tRuWFEUjnQdUpTL1ZsCWcfsBUgDyCwXZ8Sk8k"


const productContainer = document.getElementById('product-container');

window.onload = getProducts;

async function getProducts() {
    try {
        let request = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'Authorization': authKey }
        });

        const json = await request.json();

        json.forEach(product => {
            createProductCardTemplate(product)
        });

    } catch (error) {
        console.log(error);
    }
}

function createProductCardTemplate(product) {
    const productCard = document.createElement('div');
    productCard.classList.add(
        "card",
        "p-0",
        "d-flex",
        "col-10",
        "col-sm-6",
        "col-md-4",
        "col-xl-2",
        "justify-content-between",
        "overflow-hidden",
        "m-2",
        "my-3"
    )

    const productImg = document.createElement('img');
        productImg.classList.add('Img-card-top');
        productImg.src = product.imageUrl;

    const hr = document.createElement('hr')    

    const productCardBody = document.createElement('div');
        productCardBody.classList.add('card-body', 'align-items-between');

    const productName = document.createElement('h5');
        productName.innerText = product.name;

    const productPrice = document.createElement('p');
        productPrice.innerText = '€' + product.price;

    const shopBtn = document.createElement('button');
        shopBtn.innerHTML ='<i class="bi bi-bag-plus-fill"></i>'
        shopBtn.classList.add('btn','btn-outline-danger', 'm-1');
        shopBtn.addEventListener('click', () => {
            addToCart(product)
        });
    
    const productDetail = document.createElement('a');
        productDetail.href = `detail.html?id=${product._id}`;
        productDetail.target = '_blank';
        productDetail.innerText = 'See Detail';
        productDetail.classList.add('btn', 'btn-outline-secondary', 'm-1');
    
    productCard.appendChild(productImg);
    productCardBody.appendChild(productName);
    productCardBody.appendChild(productPrice);
    productCardBody.appendChild(hr)
    productCardBody.appendChild(shopBtn);
    productCardBody.appendChild(productDetail);
    productCard.appendChild(productCardBody);

    productContainer.appendChild(productCard);

}