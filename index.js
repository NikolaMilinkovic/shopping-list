import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const shoppingList = document.getElementById('shopping-list');
const appSettings = {
    databaseURL: "https://library-database-f0001-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const product = ref(database, "product");

console.log(app);
console.log(database);

const inputEl = document.getElementById("input-product");
const addBtn = document.getElementById("btn-add-product");

addBtn.addEventListener('click', function(){
    const productName = inputEl.value;

    // pushes the value into the database
    push (product, productName);
    const newListItem = document.createElement("li");
    newListItem.innerHTML = productName;
    newListItem.addEventListener('click', function(){
        this.remove();
    });

    shoppingList.appendChild(newListItem);

    console.log(inputEl.value + " has been added to the database.");
    clearInput();
    inputEl.focus();
});

function clearInput(){
    inputEl.value = "";
}