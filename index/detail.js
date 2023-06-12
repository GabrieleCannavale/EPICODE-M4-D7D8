const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Endpoint dell'API
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const authKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlNWFhZmI5YzBmNzAwMTQ0ODRmMDYiLCJpYXQiOjE2ODYwMDIzNTIsImV4cCI6MTY4NzIxMTk1Mn0.fnPfQ7tRuWFEUjnQdUpTL1ZsCWcfsBUgDyCwXZ8Sk8k";

window.onload = getProductDetails;

//? Funzione per ottenere i dettagli del prodotto
async function getProductDetails() {
    try {
        // Effettua una richiesta GET all'API per ottenere i dettagli del prodotto specificato dall'ID
        const request = await fetch(apiUrl + productId, {
            method: 'GET',
            headers: { 'Authorization': authKey }
        });
        
        // Ottiene la risposta JSON dalla richiesta
        const product = await request.json();
        
        // Chiama la funzione per visualizzare i dettagli del prodotto
        displayProductDetails(product);
    } catch (error) {
        console.error('Errore imprevisto:', error);
    }
}

// Funzione per visualizzare i dettagli del prodotto
function displayProductDetails(product) {
    // Ottiene i riferimenti agli elementi HTML
    const productImage = document.getElementById('product-image');
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const productDescr = document.getElementById('product-descr');
    
    // Imposta i valori dei dettagli del prodotto negli elementi HTML
    productImage.src = product.imageUrl;
    productName.textContent = product.name;
    productPrice.textContent = `${product.price}€`;
    productDescr.textContent = product.description;
}

// Chiama la funzione per ottenere i dettagli del prodotto
getProductDetails();


