import { services } from "../services/service.js";
const buscarInput = document.querySelector(".buscar__input");
const btnBuscar = document.querySelector("#buscar__btn");
const resultContent = document.querySelector(".buscar__content");

buscarInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && buscarInput.value != "") {
        services.searchProduct(buscarInput.value).then((data)=>{
            displayResults(data)
        }).catch(error => { console.log(error)})
    }if(e.key != 'Enter'){
        services.searchProduct(buscarInput.value).then((data)=>{
            displayResults(data)
        }).catch(error => { console.log(error)})
    }
});

btnBuscar.addEventListener("click", ()=> {
    if(buscarInput.value != ""){
        services.searchProduct(buscarInput.value).then((data)=>{
            displayResults(data)
            //document.startViewTransition(() => displayResults(data))
        }).catch(error => { console.log(error)})
    }
});

const displayResults = (resultado) => {
    resultContent.innerHTML = ""
    if(buscarInput.value == ""){
        resultContent.parentElement.style.display = 'none';
    }else{
        if(resultado.length == 0){
            resultContent.textContent = " No hay Resultados"
            resultContent.parentElement.style.display = "flex";
        }else{
            resultado.slice(0, 6).forEach(element => {
                const span = document.createElement("span");
                span.classList.add("result")
                span.textContent = element.nombre;
                span.addEventListener("click", ()=>{
                    window.location.href = `./producto-detalles.html?id=${element.id}`
                })
                resultContent.appendChild(span)
            });
            resultContent.parentElement.style.display = "flex";
        }
    }
}
window.addEventListener('click', (event) => {
    if (event.target != resultContent.parentElement && event.target != resultContent) {
        buscarInput.value = ""
        resultContent.parentElement.style.display = 'none';
    }
});