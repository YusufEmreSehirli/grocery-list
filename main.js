//gerekli Html Elementlerini Seç 

const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");



//düzenleme seçenekleri
let editFlag = false;
let editElement;
let editID = ""  // düzenleme yapılan ögenin kimliği


// Olay İzleyicileri

form.addEventListener("submit", addItem)
clearBtn.addEventListener("click", clearItems)

// FOnksiyonlar


function displayAlert(text, action) {
    console.log(text, action);
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(() => {
        alert.textContent = ""
        alert.classList.remove(`alert-${action}`)
    }, 2000);

}

function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();


    if (value !== "" && !editFlag) {
        const element = document.createElement("article"); // yeni bir "article" ögesi oluşturur
        let attr = document.createAttribute("data-id"); // yeni bir veri kimliği oluşturur.
        attr.value = id;
        element.setAttributeNode(attr); // oluşturduğumuz id'yi elemente ekledik
        element.classList.add("grocery-item"); // oluşturduğumuz elemente class ekledik
        element.innerHTML = `
            <p class="title">${value}</p>
            <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fa-solid fa-trash"></i>
            </button>
            </div>
        
        `;

        const deleteBtn = element.querySelector(".delete-btn")
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn")
        editBtn.addEventListener("click", editItem)
        // kapsayıcıya ekleme yapma
        list.appendChild(element);
        displayAlert("Listeye eklendi", "success")
        container.classList.add("show-container")
        grocery.value = ""
        //eğer değer boş değilse ve duzenlemede değilse
    } else if (value !== "" && editFlag) {
        editElement.innerHTML = value;
        displayAlert("Değer Değiştirldi", "success")
    } else {


    }

}



//silme fonk
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);

    displayAlert("Listeden Kaldırıldı", "danger");

}

//clear fonk
function clearItems(){
    const items = document.querySelectorAll(".grocery-item");
    console.log(items);
    if (items.length > 0){
        items.forEach((item)=>list.remove(item));
    }
    container.classList.remove("show-container");
    displayAlert("Liste Boş","danger");

}















//edit fonk
function editItem(e) {
    console.log(e);
    console.log(e.currentTarget.parentElement.parentElement);
    const element = e.currentTarget.parentElement.parentElement;
    //düzenlenen öğeyi seçme
    editElement = e.currentTarget.parentElement.previousElementSibling;
    console.log(editElement);
    //formdaki inputu ögenin metnine yönlendir
    grocery.value = editElement.innerHTML;


    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "Düzenle";


}

