import { services } from "../services/service.js";
import contactoForm from "./contacto.controller.js";
contactoForm;

const getDetalles = async() =>{
    const url = new URL(window.location)
    const id = url.searchParams.get("id");

    const img = document.querySelector("[data-img]");
    const nombre = document.querySelector("[data-nombre]");
    const precio = document.querySelector("[data-precio]");
    const desc = document.querySelector("[data-desc]")

    try{
        if(!id){
            throw new Error();
        }else{
            const producto = await services.getProduct(id);
            const datos = producto[0]
            if(datos){
                img.src = datos.urlimg;
                nombre.textContent = datos.nombre;
                precio.textContent = datos.precio;
                desc.textContent = datos.descripcion;
                getSimilares(datos.categoria, id);
            }else{
                throw new Error();
            }
        }
    }catch(error){
        const detalles = document.querySelector(".detalles");
        detalles.style.display = "none"
        const errorContent = document.querySelector(".detalles__error");
        errorContent.style.display ="flex"
    }
}
const getSimilares = async(categoria, id) =>{
    const productos = await services.productos();
    productos.slice(0, 5).forEach(producto => {
        if(producto.categoria === categoria && producto.id != id){
            setSimilares(producto);
        }
    });
}
const setSimilares = (producto) =>{
    const similares = document.querySelector(".similares__productos");
    const div = document.createElement("div");
    div.classList.add("producto");
    const content = `
        <img src="${producto.urlimg}" alt="" class="similar__producto__img">
        <h4 class="producto__title">${producto.nombre}</h4>
        <b class="producto__precio">${producto.precio}</b>
        <a href="./producto-detalles.html?id=${producto.id}" class="producto__enlace">Ver Producto</a>
    `
    div.innerHTML = content;
    similares.appendChild(div)
}
getDetalles();