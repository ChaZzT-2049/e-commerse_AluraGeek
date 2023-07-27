import { services } from "../services/service.js";
import { controlMenu } from "./sesion.controller.js";
controlMenu
function loadProducts(){
    const sw = document.querySelector("[data-categoria=sw]")
    const cs = document.querySelector("[data-categoria=cs]")
    const vr = document.querySelector("[data-categoria=vr]")
    services.productos().then((data) => {
        let prodSw = []
        let prodCs = []
        let prodVr = []
        data.forEach(producto => {
            if(producto.categoria == sw.dataset.categoria){
                prodSw.push(producto)
            }if(producto.categoria == cs.dataset.categoria){
                prodCs.push(producto)
            }if(producto.categoria == vr.dataset.categoria){
                prodVr.push(producto)
            }
        });
        prodSw.slice(0,4).forEach(prod => {
            const card = displayProduct(prod);
            sw.appendChild(card);
        })
        prodCs.forEach(prod => {
            const card = displayProduct(prod);
            cs.appendChild(card);
        })
        prodVr.forEach(prod => {
            const card = displayProduct(prod);
            vr.appendChild(card);
        })
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
