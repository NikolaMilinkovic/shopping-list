import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
    if(snapshot.exists()){
        // Removes all the items on the display list
        clearShoppingListFromPreview();

        // Takes all the items from the database and stores it in array
        let productArray = Object.entries(snapshot.val());
        // Displays items on the list
        productArray.forEach(([productID, productName]) => {
            addNewItem(productName, productID);
        });
    }
    else{
        shoppingList.innerHTML = "No items here... yet";
    }


});



addBtn.addEventListener('click', function(){
    let productName = inputEl.value;

    // Checks entries
    if (inputEl.value === '')
        productName = inputEl.placeholder;
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
function addNewItem(productName, productID){
    const newListItem = document.createElement("li");
    newListItem.innerHTML = productName;
    newListItem.addEventListener('click', function(){
        this.remove();
        removeProductFromDatabase(productName, productID);
        // I am thinking of placing the remove from database code here, so when we press the item it gets
        // removed from the database and also from the display div
    });
    shoppingList.appendChild(newListItem);
}
function removeProductFromDatabase(productName, productID){
    const productRef = ref(database, "product/" + productID);

    remove(productRef)
        .then(()=>{
            console.log("Product: " + productName + " is safely removed from the database.")
        })
        .catch(()=>{
            console.error("Error removing product from the database");
        })
}
// ==========[ \FUNCTIONS ]========== //