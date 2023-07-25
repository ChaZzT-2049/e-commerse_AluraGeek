import { services } from "../services/service.js";
const deleteModal = document.querySelector("#eliminar");
const deleteProduct = (id) =>{
    const cerrarEliminar = document.querySelector("#cerrarEliminar");

    services.getProduct(id).then((data) => {
        const producto = data[0]
        setEliminarContent(producto)
        deleteModal.style.display = "flex"
    }).catch((error) => console.log(error))

    cerrarEliminar.addEventListener("click", function(){
        deleteModal.style.display = 'none';
    })
    window.addEventListener('click', (event) => {
        if (event.target === deleteModal) {
          deleteModal.style.display = 'none';
        }
    });
}

const setEliminarContent = (producto) => {
    const img = document.querySelector(".producto__eliminar__img");
    const nombre = document.querySelector(".producto__eliminar__nombre");
    const precio = document.querySelector(".producto__eliminar__precio");
    const desc = document.querySelector(".producto__eliminar__desc");
    const btnEliminar = document.querySelector("#btn__eliminar");

    img.src = producto.urlimg;
    nombre.textContent = producto.nombre;
    precio.textContent = producto.precio;
    desc.textContent = producto.descripcion;

    btnEliminar.addEventListener("click", () =>{
        services.deleteProduct(producto.id).then(() =>{
            deleteModal.style.display = "none";
            window.location.reload();
        }).catch(error => {console.log(error)});
    })
}

export const deleteProd = deleteProduct;