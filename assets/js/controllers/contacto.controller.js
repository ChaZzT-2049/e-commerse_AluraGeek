const form = document.querySelector(".contacto__form");

const contactoForm = () => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        validarContacto();
    })
}

const contacto = form.querySelector("#contacto");
const mensaje = form.querySelector("#mensaje");

contacto.addEventListener("blur", ()=>{
    campoVacio(contacto)
})
mensaje.addEventListener("blur", ()=>{
    campoVacio(mensaje)
})

const validarContacto = () => {
    campoVacio(contacto);
    campoVacio(mensaje);
    if(contacto.value != "" && mensaje.value != ""){
        enviarMensaje(contacto, mensaje);
    }
}

const campoVacio = (campo) =>{
    if(campo.value == ""){
        addError(campo);
    }else{
        removeError(campo);
    }
}

const addError = (campo) => {
    campo.classList.add("error__contacto")
    campo.parentElement.classList.add("error__bg")
    campo.nextElementSibling.style.display = "flex"
}
const removeError = (campo) =>{
    campo.classList.remove("error__contacto")
    campo.parentElement.classList.remove("error__bg")
    campo.nextElementSibling.style.display = "none"
}

const enviarMensaje = (contacto, mensaje) => {
    alert(`Mensaje Enviado ${contacto.value} nos pondremos en contacto contigo.\nMotivo: ${mensaje.value}`)
    contacto.value = "";
    mensaje.value = "";
}

export default contactoForm();