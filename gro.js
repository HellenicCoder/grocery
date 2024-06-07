//select item
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

//edit option
let editElement;
let editFlag = false;
let editID = "";
//submit form 
form.addEventListener("submit",addItem);
// clear item
clearBtn.addEventListener("click", clearItems);
const deleteBtn = document.querySelector(".delete-btn");
console.log(deleteBtn);

//function
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if(value && !editFlag){
        const element = document.createElement("article");
        //add class
        element.classList.add("grocery-item");
        //add id
        const attr = document.createAttribute("data-id")
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
              <i class="fas fa-edit"></i>  
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>  
            </button>
        </div>`;
       const deleteBtn = element.querySelector(".delete-btn");
       const editBtn = element.querySelector(".edit-btn");

       deleteBtn.addEventListener("click", deleteItem);
       editBtn.addEventListener("click", editItem);
        //append child
        list.appendChild(element);
        //display alert
       displayAlert("the value is add to the list", "success");
       //show container
       container.classList.add("show-container");
       //add to localstorage
       addToLocalStorage(id, value)
       //set back to default
       setBackToDefault()
    }
    else if(value && editFlag ){
        editElement.innerHTML = value;
        displayAlert("value changed", "success");
        //edit local storage
        editLocalStorage(editID, value);
        setBackToDefault()
    }
    else{
        displayAlert("please fix the value !", "danger")
    }
}
//display item
function displayAlert(text, action){
    alert.textContent = text;
        alert.classList.add(`alert-${action}`);
        //remove
        setTimeout(function(){
            alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
        },1000)
}
//clear items
function clearItems(){
    const items = document.querySelectorAll(".grocery-item")
    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item)
        })
    }
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();
   // localStorage.removeItem("list")
}
//delete function
function deleteItem(e){
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id
  list.removeChild(element);
  if(list.children.length === 0){
    container.classList.remove("show-container")
  }
  displayAlert("item removed, danger");
  setBackToDefault();
  //remove from local storage
  //removeFromLocalStorage(id)
}
//edit function
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
     editElement = e.currentTarget.parentElement.previousElementSibling;
     //set form value
     grocery.value = editElement.innerHTML;
     editFlag = true;
     editID = element.dataset.id;
     submitBtn.textContent = "edit";
}
//set back to default
function setBackToDefault(){
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}
//local storage
function addToLocalStorage(id, value){
  //console.log("add to local storage");
}
function removeFromLocalStorage(id){}
function editLocalStorage(id, value){}