import { services } from "../services/service.js";

const editar = (id) =>{
    const editarModal = document.querySelector("#editar");
    const cerrarEditar = document.querySelector("#cerrarEditar");

    const inputs = document.querySelectorAll(".agregar__input");
    const descripcion = document.querySelector("#descripcion");
    const img = document.querySelector(".img__editar");
    const editarBtn = document.querySelector("#editarBtn");
    
    services.getProduct(id).then((data) => {
        const producto = data[0]
        setEditarContent(producto, inputs, descripcion, img);
        editarBtn.addEventListener("click", (event) => {
            event.preventDefault();
            enviarDatos(producto, inputs, descripcion, editarModal);
        })
        editarModal.style.display = "flex";
    }).catch((error) => console.log(error))
    
    cerrarEditar.addEventListener("click", function(){
        editarModal.style.display = 'none';
    })
    window.addEventListener('click', (event) => {
        if (event.target === editarModal) {
          editarModal.style.display = 'none';
        }
    });
}
const enviarDatos = (producto, inputs, descripcion, editarModal) =>{
    inputs.forEach((input) =>{
        evaluarVacio(input);
    })
    evaluarVacio(descripcion);
    const ableEdit = evaluarCampos(inputs, descripcion);
    if(ableEdit.nombre && ableEdit.precio && ableEdit.descripcion){
        let data = {
            nombre: "",
            descripcion: descripcion.value,
            urlimg: "",
            categoria: producto.categoria,
            precio: ""
        }
        inputs.forEach((input) => {
            if(input.id == "nombre"){
                data.nombre = input.value
            }
            if(input.id == "precio"){
                data.precio = parseInt(input.value)
            }
            if(input.id == "descripcion"){
                data.descripcion = input.value
            }
            if(input.id == "urlimg" && input.value == ""){
                data.urlimg = producto.urlimg
            }if(input.id == "urlimg" && input.value != ""){
                data.urlimg = URL.createObjectURL(input.files[0])
            }
        })
        services.editProduct(producto.id, data).then(data => {
            editarModal.style.display = 'none';
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error); 
        });
    }
}
const setEditarContent = (producto, inputs, descripcion, img) => {
    img.src = producto.urlimg;
    inputs.forEach((input) =>{
        switch(input.id){
            case "nombre":
                input.value = producto.nombre;
                input.classList.remove("error__input");
                input.previousElementSibling.classList.remove("error");
                input.addEventListener("blur", function(){evaluarVacio(input)})
                break
            case "precio":
                input.classList.remove("error__input");
                input.previousElementSibling.classList.remove("error");
                input.value = producto.precio;
                input.addEventListener("blur", function(){evaluarVacio(input)})
                break
            case "urlimg":
                input.classList.remove("error__input");
                input.previousElementSibling.classList.remove("error");
                input.addEventListener("blur", function(){evaluarVacio(input)})
                input.addEventListener("change", function(){cambiarImg(input, img)})
            default:
            break
        }
    })
    descripcion.value = producto.descripcion;
    descripcion.addEventListener("blur", function(){evaluarVacio(descripcion)});
}
function evaluarVacio(input){
    if(input.value == "" && input.id != "urlimg"){
        input.classList.add("error__input");
        input.previousElementSibling.classList.add("error");
        input.nextElementSibling.textContent = "No debe estar vacío."
        input.nextElementSibling.classList.remove("hide");
    }else{
        input.classList.remove("error__input");
        input.previousElementSibling.classList.remove("error");
        input.nextElementSibling.classList.add("hide");
    }
}
const evaluarCampos = (inputs, descripcion) => {
    let validFields = {
        "nombre":  false,
        "precio": false,
        "urlimg": true,
        "descripcion": false
    }
    inputs.forEach((input) =>{
        switch(input.id){
            case "nombre":
                if (input.value.length > 20 || input.value == "") {
                    input.classList.add("error__input");
                    input.previousElementSibling.classList.add("error");
                    input.nextElementSibling.textContent = "No debe superar los 20 caracteres de longitud. Ni debe estar vacío."
                    input.nextElementSibling.classList.remove("hide");
                    validFields.nombre = false
                }else{
                    validFields.nombre = true
                }
                break
            case "precio":
                if((input.validity["patternMismatch"] || input.value.length > 10) || (input.value == "")){
                    input.classList.add("error__input");
                    input.previousElementSibling.classList.add("error");
                    input.nextElementSibling.textContent = "Solo usa números, la logitud no debe superar los 10 caracteres."
                    input.nextElementSibling.classList.remove("hide");
                    validFields.precio = false
                }else{
                    validFields.precio = true
                }
                break
            default:
            break
        }
    })
    if(descripcion.value.length > 150 || descripcion.value == ""){
        descripcion.classList.add("error__input");
        descripcion.previousElementSibling.classList.add("error");
        descripcion.nextElementSibling.textContent = "No debe estar vacío."
        descripcion.nextElementSibling.classList.remove("hide");
        validFields.descripcion = false
    }else{
        validFields.descripcion = true
    }
    return validFields
}
const cambiarImg = (input, img) =>{
    const objectURL = URL.createObjectURL(input.files[0]);
    img.src = objectURL;
}

export const edit = editar;