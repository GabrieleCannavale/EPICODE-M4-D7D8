//? API Endpoint
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const authKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlNWFhZmI5YzBmNzAwMTQ0ODRmMDYiLCJpYXQiOjE2ODYwMDIzNTIsImV4cCI6MTY4NzIxMTk1Mn0.fnPfQ7tRuWFEUjnQdUpTL1ZsCWcfsBUgDyCwXZ8Sk8k"


window.onload = getProducts();

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


