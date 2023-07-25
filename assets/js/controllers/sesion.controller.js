let sesionStatus = localStorage.getItem('sesion');
const actualUser = JSON.parse(localStorage.getItem('user'));
const nav = document.querySelector(".menu__nav");
const cerrarbtn = document.createElement("button");
cerrarbtn.innerHTML = `<i class="material-icons">logout</i>`;
cerrarbtn.classList.add("btn__azul--outline", "cerrarSesion");
nav.appendChild(cerrarbtn);

function menu(){
    const login = document.querySelector("#login__btn");
    if(sesionStatus){
        cerrarbtn.style.display = "flex";
        login.style.display = "none";
        const nombre = document.createElement("span")
        nombre.classList.add("user")
        nombre.textContent = `${actualUser.nombre}`;
        nav.appendChild(nombre);
    }else{
        cerrarbtn.style.display = "none";
        login.style.display = "flex";
    }
    return menu
}
cerrarbtn.addEventListener("click", function(){
    localStorage.clear();
    sesionStatus = false
    menu();
    window.location.href = './index.html';
})

export const controlMenu = menu();