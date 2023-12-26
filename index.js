import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://library-database-f0001-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const product = ref(database, "product");
const inputEl = document.getElementById("input-product");
const addBtn = document.getElementById("btn-add-product");
const shoppingList = document.getElementById('shopping-list');

onValue(product, function(snapshot){
    // Removes all the items on the display list
    clearShoppingListFromPreview();

    // Takes all the items from the database and stores it in array
    let productArray = Object.values(snapshot.val());
    // Displays items on the list
    productArray.forEach(addNewItem);
});



addBtn.addEventListener('click', function(){
    const productName = inputEl.value;

    // pushes the value into the database
    push (product, productName);
    // Clears the input field text and focuses input field
    clearInput();
});





// ==========[ FUNCTIONS ]========== //


function clearShoppingListFromPreview(){
    shoppingList.innerHTML = "";
}
function clearInput(){
    inputEl.value = "";
    inputEl.focus();
}
function addNewItem(productName){
    const newListItem = document.createElement("li");
    newListItem.innerHTML = productName;
    newListItem.addEventListener('click', function(){
        this.remove();
    });
    shoppingList.appendChild(newListItem);
    console.log(productName + " has been added to the database.");
}
// ==========[ \FUNCTIONS ]========== //