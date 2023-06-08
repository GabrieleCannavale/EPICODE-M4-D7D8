/*
fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlNWFhZmI5YzBmNzAwMTQ0ODRmMDYiLCJpYXQiOjE2ODYwMDIzNTIsImV4cCI6MTY4NzIxMTk1Mn0.fnPfQ7tRuWFEUjnQdUpTL1ZsCWcfsBUgDyCwXZ8Sk8k"
    }
})
*/

//? API Endpoint
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const authKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlNWFhZmI5YzBmNzAwMTQ0ODRmMDYiLCJpYXQiOjE2ODYwMDIzNTIsImV4cCI6MTY4NzIxMTk1Mn0.fnPfQ7tRuWFEUjnQdUpTL1ZsCWcfsBUgDyCwXZ8Sk8k"


//? VARIABILI
const productTable = document.getElementById('product-table');

const nameInput = document.getElementById('name-field');
const descrInput = document.getElementById('descr-field');
const brandInput = document.getElementById('brand-field');
const imageUrlInput = document.getElementById('image-url-field');
const priceInput = document.getElementById('price-field');
const createBtn = document.getElementById('create-btn');

const emptyFields = document.getElementById('empty-fields')

window.onload = getProducts();


async function getProducts() {
    productTable.innerHTML = "";
    try {
        let request = await fetch(apiUrl, //restituisce la promise
            {
                method: 'GET',
                headers: { 'Authorization': authKey }
            }
        );
        const json = await request.json();  //dalla promise restituisce il relativo json 

        json.forEach(product => {
            createBackOfficeTemplate(product);
        });

    } catch (error) {
        console.log(error);
    }
}

createBtn.addEventListener("click", addNewProduct);

async function addNewProduct() {
    if (
        nameInput.value &&
        descrInput.value &&
        brandInput.value &&
        imageUrlInput.value &&
        priceInput.value
    ) {
        const payload = {
            'name': nameInput.value,
            'description': descrInput.value,
            'brand': brandInput.value,
            'imageUrl': imageUrlInput.value,
            'price': priceInput.value,
            'time': new Date()
        }

        const createProduct = await fetch(apiUrl,
            {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Authorization': authKey, "Content-Type": "application/json" }
            })

        getProducts()

        nameInput.value = "";
        descrInput.value = "";
        brandInput.value = "";
        imageUrlInput.value = "";
        priceInput.value = "";

    } else {
        emptyFields.classList.toggle("d-none");
        setTimeout(() => {
            emptyFields.classList.toggle("d-none");
        }, 4000)
    }



}



function createBackOfficeTemplate(product) {
    //const myPid = product._id;
    const myTr = document.createElement('tr');
    myTr.setAttribute('data-pid', product._id);

    const myName = document.createElement('td');
    myName.innerText = product.name;
    const myDescr = document.createElement('td');
    myDescr.innerText = product.description;
    const myBrand = document.createElement('td');
    myBrand.innerText = product.brand;
    const myImageUrl = document.createElement('td');
    myImageUrl.classList.add('fixed-width-cell');
    myImageUrl.innerText = product.imageUrl;

    // Event listener per la visualizzazione temporanea dell'immagine
    myImageUrl.addEventListener('mouseover', function () {
        const previewImage = document.createElement('img');
        previewImage.src = product.imageUrl;
        previewImage.classList.add('preview-image');
        document.body.appendChild(previewImage);
        // Posiziona l'immagine in base alla posizione del mouse
        previewImage.style.top = (event.clientY + 10) + 'px';
        previewImage.style.left = (event.clientX + 10) + 'px';
    });

    // Rimuovi l'anteprima dell'immagine quando il mouse esce dall'URL
    myImageUrl.addEventListener('mouseout', function () {
        const previewImage = document.querySelector('.preview-image');
        if (previewImage) {
            previewImage.remove();
        }
    });


    const myPrice = document.createElement('td');
    myPrice.innerText = product.price;

    const myBtns = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-sm", "mx-1", "btn-outline", "btn-outline-primary");
    const editImg = document.createElement("i");
    editImg.classList.add("fa-solid", "fa-pencil", "me-1");
    editBtn.append(editImg);

    const delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn-sm", "mx-1", "btn-outline", "btn-outline-danger");
    const delImg = document.createElement("i");
    delImg.classList.add("fa-solid", "fa-trash", "me-1");
    delBtn.append(delImg);
    delBtn.addEventListener('click', (event) => {
        const relTr = event.target.closest('tr');
        const myPid = relTr.getAttribute('data-pid')
        deleteProduct(myPid);
    });
    myBtns.append(editBtn, delBtn);

    myTr.append(myName, myDescr, myBrand, myImageUrl, myPrice, myBtns);
    productTable.appendChild(myTr);

}


async function deleteProduct(pid) {
    try {
        const delRes = await fetch(apiUrl + pid,
            {
                method: 'DELETE',
                headers: { 'Authorization': authKey, "Content-Type": "application/json" }
            })

            getProducts();
    } catch (error) {
        console.log(error);
    }
}