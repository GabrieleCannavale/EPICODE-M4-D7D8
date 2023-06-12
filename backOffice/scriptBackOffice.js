

//? API Endpoint
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const authKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdlNWFhZmI5YzBmNzAwMTQ0ODRmMDYiLCJpYXQiOjE2ODYwMDIzNTIsImV4cCI6MTY4NzIxMTk1Mn0.fnPfQ7tRuWFEUjnQdUpTL1ZsCWcfsBUgDyCwXZ8Sk8k"


//? VARIABILI
const productTable = document.getElementById('product-table');//padre delle tr che popoleranno la tabella
//*variabili dei campi di inserimento attributi per la creazione di prodotti (addNewProduct())
const nameInput = document.getElementById('name-field');
const descrInput = document.getElementById('descr-field');
const brandInput = document.getElementById('brand-field');
const imageUrlInput = document.getElementById('image-url-field');
const priceInput = document.getElementById('price-field');
const createBtn = document.getElementById('create-btn');

//*variabile di messaggio errore se alcuni campi sono vuoti durante il POST
const emptyFields = document.getElementById('empty-fields')

//*variabili della modale
    //ho riscontrato problemi con il funzionamento della modale, cercando su internet ho trovato questa soluzione che mi permette di sfruttare le funzionalità della modale di bootstrap
const editModal = new bootstrap.Modal(document.getElementById('editModal'));
const nameInputModal = document.getElementById('name-input-modal');
const descrInputModal = document.getElementById('descr-input-modal');
const brandInputModal = document.getElementById('brand-input-modal');
const imageUrlInputModal = document.getElementById('image-url-input-modal');
const priceInputModal = document.getElementById('price-input-modal');
const saveBtnModal = document.getElementById('save-btn-modal');

window.onload = getProducts();

//? Funzione che prende i prodotti dell'api e li rende disponibili per processarli con la funzjone backOfficeTemplate()
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


//? Funzione per aggiungere prodotti all'api
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

        //alla fine reimposta i valori degli imput come vuoti, pronti per una nuova rivalorizzazione
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


//? Funzione per creare ogni row della tabella con i prodotti dell'API e relativi bottoni EDIT,DEL
function createBackOfficeTemplate(product) {
    //const myPid = product._id;
    const myTr = document.createElement('tr');
    myTr.setAttribute('data-pid', product._id);

    //creiamo delle variabili e assegnamo ad ognuna di esse i valori degli attributi del prodotto
    const myName = document.createElement('td');
    myName.innerText = product.name;
    const myDescr = document.createElement('td');
    myDescr.innerText = product.description;
    const myBrand = document.createElement('td');
    myBrand.innerText = product.brand;
    const myImageUrl = document.createElement('td');
    myImageUrl.classList.add('fixed-width-cell');//classe custom CSS per personalizzare il layout delle celle 
    myImageUrl.innerText = product.imageUrl;

    //* Event listener per la visualizzazione della preview del prodotto  al passaggio del mouse
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


    //*SEZIONE BOTTONI 
    const myBtns = document.createElement("td");

    //bottone che modifica il prodotto dell'api relativo, attravero l'attivazione di una modale 
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-sm", "mx-1", "btn-outline", "btn-outline-primary");
    const editImg = document.createElement("i");
    editImg.classList.add("fa-solid", "fa-pencil", "me-1");
    editBtn.append(editImg);
    //listener per l'attivazione della modale 
    editBtn.addEventListener('click', () => {
        openEditModal(product);
    })

    //bottone per eliminare il prodotto relativo, attraverso la creazione e l'identificazione del data-id (data-pid)
    const delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn-sm", "mx-1", "btn-outline", "btn-outline-danger");
    const delImg = document.createElement("i");
    delImg.classList.add("fa-solid", "fa-trash", "me-1");
    delBtn.append(delImg);
    delBtn.addEventListener('click', (event) => {
        const relTr = event.target.closest('tr');
        const myPid = relTr.getAttribute('data-pid');
        deleteProduct(myPid);//attributo: _id del prodotto relativo
    });
    myBtns.append(editBtn, delBtn);

    myTr.append(myName, myDescr, myBrand, myImageUrl, myPrice, myBtns);
    productTable.appendChild(myTr);

}

function openEditModal(product) {

    nameInputModal.value = product.name;
    descrInputModal.value = product.description;
    brandInputModal.value = product.brand;
    imageUrlInputModal.value = product.imageUrl;
    priceInputModal.value = product.price;

    saveBtnModal.addEventListener("click", () => saveChanges(product)); // Aggiungi l'event listener per salvare le modifiche

    editModal.show();
}

async function saveChanges(product) {

    const payload = {
        'name': nameInputModal.value,
        'description': descrInputModal.value,
        'brand': brandInputModal.value,
        'imageUrl': imageUrlInputModal.value,
        'price': priceInputModal.value,
    };

    try {
        const response = await fetch(apiUrl + product._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authKey
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        console.log('Modifiche salvate:', data);
        editModal.hide();
        getProducts();
    } catch (error) {
        console.error('Errore durante il salvataggio delle modifiche:', error);
    }
}

//? funzione per eliminare il prodotto (richiamata dal bottone delBtn nella funzione createBackOfficeTemplate())
async function deleteProduct(pid) {
    try {
        const delRes = await fetch(apiUrl + pid,//il pid rappresenta l' _id del prodotto
            {
                method: 'DELETE',
                headers: { 'Authorization': authKey, "Content-Type": "application/json" }
            })

        getProducts();//richiama la funzione principale di della chiamata GET per aggiornare la lista
    } catch (error) {
        console.log(error);
    }
}