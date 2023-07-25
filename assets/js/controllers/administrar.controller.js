import { services } from "../services/service.js";
import { controlMenu } from "./sesion.controller.js";
import { edit } from "./editar.controller.js";
import { deleteProd } from "./eliminar.controller.js";
import contactoForm from "./contacto.controller.js";

controlMenu;
contactoForm;
let actualUser = JSON.parse(localStorage.getItem('user'));
const addBtn = document.querySelector("#agregar")

const add = () => {
    if(actualUser.admin){
        addBtn.style.display = "flex";
    }else{
        addBtn.style.display = "none";
    }
}
function getProducts(){
    add();
    const container = document.querySelector(".productos__container")
    container.innerHTML = "";
    services.productos().then((data) => {
        container.innerHTML = "";
        data.forEach(producto => {
            const card = addProduct(producto);
            container.appendChild(card);
        });
    }).catch((error) => console.log(error));
}
const addProduct = (producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    const content = `
        <img src="${producto.urlimg}" alt="${producto.nombre}" class="producto__img"></img>
        <h4 class="producto__nombre">${producto.nombre}</h4>
        <b class="producto__precio">${producto.precio}</b>
        <p class="producto__id">${producto.id}</p>
    `
    div.innerHTML = content;
    if(actualUser.admin){
        const icons = document.createElement("div")
        icons.classList.add("icons__container")
        const iconE = document.createElement("i")
        iconE.classList.add("material-icons", "icon__editar")
        iconE.textContent = "edit"
        iconE.addEventListener("click", () => {edit(producto.id)})
        const iconD = document.createElement("i")
        iconD.classList.add("material-icons", "icon__eliminar")
        iconD.textContent = "delete"
        iconD.addEventListener("click", () => {deleteProd(producto.id)})
        icons.appendChild(iconE);
        icons.appendChild(iconD)
        div.appendChild(icons);
    }
    return div;
}
let sesionStatus = localStorage.getItem('sesion');
if(sesionStatus){
    getProducts();
}else{
    window.location.href = './login.html';
}