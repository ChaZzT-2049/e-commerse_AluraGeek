import { services } from "../services/service.js";
import { controlMenu } from "./sesion.controller.js";
controlMenu
function loadProducts(){
    const sw = document.querySelector("[data-categoria=sw]")
    const cs = document.querySelector("[data-categoria=cs]")
    const vr = document.querySelector("[data-categoria=vr]")
    services.productos().then((data) => {
        data.forEach(producto => {
            const card = displayProduct(producto);
            if(producto.categoria == sw.dataset.categoria){
                sw.appendChild(card);
            }if(producto.categoria == cs.dataset.categoria){
                cs.appendChild(card);
            }if(producto.categoria == vr.dataset.categoria){
                vr.appendChild(card);
            }
        });
    }).catch((error) => console.log(error));
}

const displayProduct = (producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    const content = `
        <img class="producto__img" src="${producto.urlimg}" alt="${producto.nombre}">
        <h3 class="producto__title">${producto.nombre}</h3>
        <b class="producto__precio">${producto.precio}</b>
        <a href="./producto-detalles.html?id=${producto.id}" class="producto__enlace">Ver producto</a>
    `
    div.innerHTML = content;
    return div;
}
loadProducts();
