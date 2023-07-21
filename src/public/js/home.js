const socket = io();
const productList = document.getElementById('productList');

socket.on('productList', (products) => {
  productList.innerHTML = '';

  products.forEach((product) => {
    const li = document.createElement('li');
    li.textContent = `Nombre: ${product.title}, Descripción: ${product.description}, Precio: ${product.price}, Código: ${product.code}, Stock: ${product.stock}, Categoría: ${product.category}`;

    productList.appendChild(li);
  });
});
