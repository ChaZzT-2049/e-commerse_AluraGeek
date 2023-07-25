let url = "https://64bda1d02320b36433c7c9cd.mockapi.io/alurageek/api/";

const productos = () => fetch(url+"products").then((response) => response.json());

const user = (email) => fetch(url + `users?email=${email}`).then((response) => response.json());

const addProduct = (data) => fetch(url + "products",{method: 'POST', headers: {'Content-Type': 'application/json'},body: JSON.stringify(data)
}).then((response) => response.json()).catch(error => console.error('Error:', error));

const getProduct = (id) => fetch(url + `products/?id=${id}`).then((response) => response.json()).catch(error => console.error('Error:', error));

const editProduct = (id, data) => fetch(url + `products/${id}`,{method: 'PUT', headers: {'Content-Type': 'application/json'},body: JSON.stringify(data)
}).then((response) => response.json()).catch(error => console.error('Error:', error));

const deleteProduct = (id) => fetch(url + `products/${id}`,{method: "DELETE"}).then((response) => response.json()).catch(error => console.error('Error:', error));

const searchProduct = (name) => fetch(url + `products/?nombre=${name}`).then((response) => response.json());

export const services = {
    productos,
    user,
    addProduct,
    getProduct,
    editProduct,
    deleteProduct,
    searchProduct,
}
//filtrar por categoria
//https://my-json-server.typicode.com/ChaZzT-2049/alurageekapitest/productos?categoria=sw
//id
//https://my-json-server.typicode.com/ChaZzT-2049/alurageekapitest/productos/${id}
//nombre
//https://my-json-server.typicode.com/ChaZzT-2049/alurageekapitest/productos?nombre=${nombre}