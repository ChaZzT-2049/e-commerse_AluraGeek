import { services } from "../services/service.js";
import contactoForm from "./contacto.controller.js";
contactoForm;

const labelCorreo = document.querySelector("[data-label=correo]");
const labelContra = document.querySelector("[data-label=contra]");
const errors = document.querySelector(".errors");
const mensaje = document.createElement("span");
mensaje.classList.add("error");
errors.appendChild(mensaje);
errors.style.display = "none";

const enviar = document.querySelector("#enviar");
enviar.addEventListener("click", (event) =>{
    event.preventDefault();
    const correo = document.querySelector("#correo");
    const contraseña = document.querySelector("#contraseña");
    evaluarVacio(correo, contraseña);
});

const evaluarVacio = (correo, contraseña) =>{
    if(!correo.validity["valueMissing"] && !contraseña.validity["valueMissing"]){
        labelCorreo.classList.remove("error");
        labelContra.classList.remove("error");
        correo.classList.remove("login__input__error");
        contraseña.classList.remove("login__input__error");
        errors.style.display = "none";
        mensaje.textContent = "";
        evaluarInputs(correo, contraseña);
    }else{
        labelCorreo.classList.add("error");
        labelContra.classList.add("error");
        correo.classList.add("login__input__error");
        contraseña.classList.add("login__input__error");
        mensaje.textContent = "No puedes dejar campos vacios";
        errors.style.display = "flex";
    }
}

const evaluarInputs = (correo, contraseña) => {
    if(correo.validity["typeMismatch"]){
        labelCorreo.classList.add("error");
        correo.classList.add("login__input__error");
        mensaje.textContent = "Direccion no valida";
        errors.style.display = "flex";
    }else{
        mensaje.textContent = "";
        errors.style.display = "none";
        if(contraseña.validity["patternMismatch"]){
            mensaje.textContent = "La contraseña no cumple con los criterios";
            errors.style.display = "flex";
            labelContra.classList.add("error");
            contraseña.classList.add("login__input__error");
        }else{
            mensaje.textContent = "";
            errors.style.display = "none";
            labelContra.classList.remove("error");
            contraseña.classList.remove("login__input__error");
            services.user(correo.value).then((data) => {
                if(data[0].password == contraseña.value) {
                    setUser(data[0]);
                } else {
                    mensaje.textContent = "Contraseña Incorrecta intente de nuevo.";
                    errors.style.display = "flex";
                    labelContra.classList.add("error");
                    contraseña.classList.add("login__input__error");
                }
            }).catch((error) => console.log(error));
        }
    }
}
let user = {};
let sesion = false;
const setUser = (datos) => {
    if(datos == undefined){
        mensaje.textContent = "El usuario no existe";
        errors.style.display = "flex";
    }else{
        user = datos;
        sesion = true;
        localStorage.setItem('sesion', sesion);
        localStorage.setItem("user", JSON.stringify(user))
        if(!document.startViewTransition){
            redirect();
        }
        document.startViewTransition(() => redirect())
    }
}

const redirect = () =>{
    if(user.admin == true){
        window.location.href = './productos.html';
    }
    if(user.admin == false){
        window.location.href = './index.html';
    }
}