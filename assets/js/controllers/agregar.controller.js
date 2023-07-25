import { services } from "../services/service.js";
import { controlMenu } from "./sesion.controller.js";
import contactoForm from "./contacto.controller.js";

controlMenu;
contactoForm;

const sesionStatus = localStorage.getItem('sesion');
const actualUser = JSON.parse(localStorage.getItem('user'));
if(sesionStatus && actualUser.admin){
    const addBtn = document.querySelector("#agregar");
    const dragImg = document.querySelector("#imgdrag");
    const btnImg = document.querySelector("#imgbtn");
    const inputNombre = document.querySelector("#nombre");
    const inputPrecio = document.querySelector("#precio");
    const descripcion = document.querySelector("#descripcion");
    dragImg.addEventListener("change", function(){
        ocultarbtnImg(dragImg,btnImg);
    })
    btnImg.addEventListener("change", function(){
        ocultarbtnImg(dragImg,btnImg)
    })
    addBtn.addEventListener("click", (event) =>{
        event.preventDefault();
        getCampos(dragImg, btnImg,inputNombre,inputPrecio,descripcion);
    })
    inputNombre.addEventListener("blur", function(){evaluarInput(inputNombre)});
    inputPrecio.addEventListener("blur", function(){evaluarInput(inputPrecio)});
    descripcion.addEventListener("blur", function(){evaluarInput(descripcion)});
}else{
    window.location.href = './index.html';
}

const getCampos = (dragImg, btnImg, inputNombre, inputPrecio, descripcion) =>{
    const valueImg = getImg(dragImg, btnImg);
    let campos = [];
    const nombreValid = evaluarInput(inputNombre);
    const precioValid = evaluarInput(inputPrecio);
    const descValid = evaluarInput(descripcion);
    const imgValid = evaluarImg(dragImg,btnImg);
    campos.push(nombreValid, precioValid, descValid, imgValid)
    agregarProducto(campos, valueImg, inputNombre, inputPrecio, descripcion);
}

const getImg = (dragImg, btnImg) =>{
    let value = "";
    if(dragImg.value != ""){
        value = dragImg.files[0].name;
        return value;
    }if(btnImg.value != ""){
        value = btnImg.files[0].name;
        return value;
    }
}

const evaluarInput = (input) =>{
    let message = "";
    switch(input.placeholder){
        case "Nombre":
            if(input.value == ""){
                input.classList.add("error__input")
                message = "El nombre del producto no puede estar vacio."
                input.nextElementSibling.innerHTML = message;
                input.nextElementSibling.classList.remove("hide")
                return false;
            }else{
                input.classList.remove("error__input")
                input.nextElementSibling.classList.add("hide")
                return true;
            }
        case "Precio":
            if(input.validity["patternMismatch"]){
                input.classList.add("error__input")
                message = "Solo debes agregar números."
                input.nextElementSibling.innerHTML = message;
                input.nextElementSibling.classList.remove("hide")
                return false;
            }
            if(input.value == ""){
                input.classList.add("error__input")
                message = "El precio del producto no puede estar vacio."
                input.nextElementSibling.innerHTML = message;
                input.nextElementSibling.classList.remove("hide")
                return false;
            }
            if(input.value.length > 10){
                input.classList.add("error__input")
                message = "El precio no debe sobrepasar los 10 caracteres de longitud."
                input.nextElementSibling.innerHTML = message;
                input.nextElementSibling.classList.remove("hide")
                return false;
            }else{
                input.classList.remove("error__input")
                input.nextElementSibling.classList.add("hide")
                return true;
            }
        case "Descripción":
            if(input.value == ""){
                input.classList.add("error__input")
                message = "La descripción del producto no puede estar vacia."
                input.nextElementSibling.innerHTML = message;
                input.nextElementSibling.classList.remove("hide")
                return false;
            }else{
                input.classList.remove("error__input")
                input.nextElementSibling.classList.add("hide")
                return true;
            }
        default:
            break;
    }
}
const evaluarImg = (dragImg,btnImg) =>{
    const fieldDrag = dragImg.parentElement;
    const fieldBtn = btnImg.parentElement.parentElement;
    let btn  = btnImg.parentElement;
    let message = "Se requiere de una imagen.";
    if(window.getComputedStyle(fieldDrag).display == "flex" && window.getComputedStyle(fieldBtn).display == "flex"){
        fieldDrag.classList.add("error__input")
        fieldBtn.firstElementChild.nextElementSibling.classList.add("error__input");
        btn.classList.add("error");
        fieldDrag.parentElement.lastElementChild.innerHTML = message;
        fieldDrag.parentElement.lastElementChild.classList.remove("hide")
        return false;
    }else{
        fieldDrag.classList.remove("error__input")
        fieldBtn.firstElementChild.nextElementSibling.classList.remove("error__input")
        btn.classList.remove("error");
        fieldDrag.parentElement.lastElementChild.classList.add("hide")
        return true;
    }
}

const agregarProducto = (campos, valueImg, inputNombre, inputPrecio, descripcion) =>{
    const producto = {
        nombre: inputNombre.value,
        descripcion: descripcion.value,
        urlimg: `https://raw.githubusercontent.com/ChaZzT-2049/e-commerse_AluraGeek/master/assets/images/productos/${valueImg}`,
        categoria: "vr",
        precio: parseInt(inputPrecio.value)
    };
    if(campos[0] && campos[1] && campos[2] && campos[3]){
        services.addProduct(producto).then(data => {
            window.location.href = './productos.html';
        })
        .catch(error => {
            console.error('Error:', error); 
        });
    }else{
        console.log("algo esta mal");
    }
}
const ocultarbtnImg = (dragImg, btnImg) =>{
    const fieldDrag = dragImg.parentElement;
    let labelDrag = fieldDrag.firstElementChild;
    const fieldBtn = btnImg.parentElement.parentElement;
    let labelBtn = fieldBtn.firstElementChild;

    if(dragImg.validity["valueMissing"]){
        fieldBtn.style.display = "flex";
        fieldBtn.firstElementChild.nextElementSibling.classList.remove("error__input");
        fieldBtn.firstElementChild.nextElementSibling.classList.remove("error");
        fieldDrag.parentElement.lastElementChild.classList.add("hide")
        labelDrag.innerHTML = `<i class="material-icons">image</i>Arrastra para agregar una imagen del producto.`
    }else{
        fieldBtn.style.display = "none";
        labelDrag.textContent = `${dragImg.files[0].name}`
    }
    if(btnImg.validity["valueMissing"]){
        fieldDrag.style.display = "flex";
        fieldDrag.classList.remove("error__input");
        fieldDrag.parentElement.lastElementChild.classList.add("hide")
        labelBtn.textContent = "O"
    }else{
        fieldDrag.style.display = "none";
        labelBtn.textContent = `${btnImg.files[0].name}`
    }
}