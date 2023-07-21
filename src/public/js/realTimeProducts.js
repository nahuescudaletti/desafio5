const socket = io();

const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

productForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const title = form.elements['title'].value;
  const description = form.elements['description'].value;
  const price = form.elements['price'].value;
  const code = form.elements['code'].value;
  const stock = form.elements['stock'].value;
  const category = form.elements['category'].value;
  const productData = { title, description, price, code, stock, category };
  socket.emit('newProduct', productData);
  form.reset();
});

socket.on('productList', (products) => {
  productList.innerHTML = '';
  products.forEach((product) => {
    const li = document.createElement('li');
    li.textContent = `Nombre: ${product.title}, Descripción: ${product.description}, Precio: ${product.price}, Código: ${product.code}, Stock: ${product.stock}, Categoría: ${product.category}`;
    productList.appendChild(li);
  });
});
