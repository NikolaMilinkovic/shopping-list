const inputEl = document.getElementById("input-product");
const addBtn = document.getElementById("btn-add-product");

addBtn.addEventListener('click', function(){
    var inputValue = inputEl.value;
    clearInput();
    console.log(inputValue);
});

function clearInput(){
    inputEl.value = "";
}