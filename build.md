MARKETPLACE
build di fine modulo

Il tuo obiettivo è di creare un finto eCommerce con le funzionalità di gestione dei prodotti. Non sarà prevista alcuna funzionalità di pagamento.

Le features da implementare sono:

1. Una frontpage, dove si vedono tutti i prodotti;

2. Una pagina prodotto

3. Nel back-office implementa un form per aggiungere un nuovo prodotto al DB. Il prodotto deve essere strutturato in questo modo:

{
'\_id': '38gh389gn28hg82ng82ng8n2g', //GENERATO DAL SERVER

<!--! 'name': '3310 cellphone', //OBBLIGATORIO -->
<!--! 'description': 'An unforgettable icon', //OBBLIGATORIO -->
<!--! 'brand': 'Nokia', //OBBLIGATORIO -->
<!--! 'imageUrl': 'https://bit.ly/30g2mvd', //OBBLIGATORIO -->
<!--! 'price': 100, //OBBLIGATORIO -->
<!--! 'time': New Date(); //OBBLIGATORIO -->

'userId': 'admin', //GENERATO DAL SERVER
'createdAt': '2021-09-19T09:32:10.535z', //GENERATO DAL SERVER
'updatedAt': '2021-09-19T09:32:10.535z', //GENERATO DAL SERVER
'\_\_v': 0 //GENERATO DAL SERVER
}

5. Cliccando su un prodotto, l'utente deve essere reindirizzato ad una pagina prodotto. Passa l'ID come query string nell'URL.

6. Nella pagina prodotto, mostra le info del prodotto su cui si è cliccato. Puoi prendere le info dall'endpoint 'product/IL TUO ID QUI'

7. Nel back-office, aggiungi la funzionalità per modificare un prodotto e un pulsante per eliminarlo.

8. I campi che dicono 'GENERATO DAL SERVER' non serve che siano inviati all'API

9. L'endpoint è https://striveschool-api.herokuapp.com/api/product/

   sia per GET che per POST, per PUT e DELETE è necessario specificare l'ID.
   https://striveschool-api.herokuapp.com/api/product/:ID QUI

<!--! IMPORTANTE -->

<!--* Ogni chiamata deve essere autenticata.
Ogni richiesta a questo API deve includere un toekn per ottenere l'accesso.
Puoi ottenere il token qui: https://strive.school/studentlogin -->

ESEMPIO:

fetch('https://striveschool-api.herokuapp.com/api/product/', {
headers:{
Authorization: 'Bearer xxxxxxxxxxxxxxxxxxxxxxxxx'
}
})

Dove xxxxxxxxxxxxxxxxxxxxxxxxx deve essere sostituito dal token preso dalla pagina menzionata in precedenza.
