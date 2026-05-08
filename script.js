
//  INVENTARIO
let inventario = [
  { id: 1, nombre: "Laptop Eco 14", precio: 2500, categoria: "tecnología", stock: 10, imagen: "img/laptop.jpg" },
  { id: 2, nombre: "Auriculares Bass", precio: 120, categoria: "tecnología", stock: 8, imagen: "img/audifonos.jpg" },
  { id: 3, nombre: "Zapatillas RunPro", precio: 180, categoria: "deportes", stock: 12, imagen: "img/zapatillas.jpg" },
  { id: 4, nombre: "Balón FIFA", precio: 90, categoria: "deportes", stock: 15, imagen: "img/balon.jpg" },
  { id: 5, nombre: "Silla Gaming", precio: 600, categoria: "hogar", stock: 5, imagen: "img/silla.jpg" },
  { id: 6, nombre: "Lámpara LED", precio: 45, categoria: "hogar", stock: 0, imagen: "img/lampara.jpg" },
  { id: 7, nombre: "Teclado Mecánico", precio: 220, categoria: "tecnología", stock: 7, imagen: "img/teclado.jpg" },
  { id: 8, nombre: "Mancuernas 10kg", precio: 150, categoria: "deportes", stock: 9, imagen: "img/mancuernas.jpg" },
  { id: 9, nombre: "Cafetera", precio: 300, categoria: "hogar", stock: 6, imagen: "img/cafetera.jpg" },
  { id: 10, nombre: "Smartwatch", precio: 500, categoria: "tecnología", stock: 11, imagen: "img/reloj.jpg" },
  { id: 11, nombre: "Colchoneta Yoga", precio: 80, categoria: "deportes", stock: 13, imagen: "img/yoga.jpg" },
  { id: 12, nombre: "Organizador", precio: 70, categoria: "hogar", stock: 14, imagen: "img/organizador.jpg" }
];


// ESTADO GLOBAL
let filtroCategoria = "todos";
let textoBusqueda = "";

//  LOCALSTORAGE
function guardar() {
  localStorage.setItem("inventario", JSON.stringify(inventario));
}

function cargar() {
  const data = localStorage.getItem("inventario");
  if (data) inventario = JSON.parse(data);
}

//  RENDER DE PRODUCTOS

function render() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  let productos = inventario.filter(p => {
    const catOK = filtroCategoria === "todos" || p.categoria === filtroCategoria;
    const busquedaOK = p.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
    return catOK && busquedaOK;
  });

  productos.forEach(p => {
    grid.innerHTML += `
      <div class="card ${p.stock === 0 ? "agotado" : ""}" onclick="detalle(${p.id})">
        <img src="${p.imagen}" />
        <h3>${p.nombre}</h3>
        <p>Precio: S/ ${p.precio}</p>
        <p>Stock: ${p.stock}</p>

        <button 
          onclick="comprar(event, ${p.id})" 
          ${p.stock === 0 ? "disabled" : ""}
        >
          ${p.stock === 0 ? "Agotado" : "Comprar"}
        </button>
      </div>
    `;
  });

  stats();
}


//  COMPRA

function comprar(event, id) {
  event.stopPropagation();

  let prod = inventario.find(p => p.id === id);

  if (prod && prod.stock > 0) {
    prod.stock--;
    guardar();
    render();
  }
}


// ESTADÍSTICAS

function stats() {
  const total = inventario.length;

  const valor = inventario.reduce((acc, p) => {
    return acc + (p.precio * p.stock);
  }, 0);

  document.getElementById("stats").innerHTML = `
    <p>Total productos: ${total}</p>
    <p>Valor inventario: S/ ${valor}</p>
  `;
}

//  BUSCADOR EN VIVO

document.addEventListener("input", (e) => {
  if (e.target.id === "buscador") {
    textoBusqueda = e.target.value;
    render();
  }
});

//  FILTRO CATEGORÍA

function filtrar(cat) {
  filtroCategoria = cat;
  render();
}

//  DETALLE DEL PRODUCTO

function detalle(id) {
  const p = inventario.find(x => x.id === id);

  document.getElementById("detalle").innerHTML = `
    <h2>${p.nombre}</h2>
    <p>Precio: S/ ${p.precio}</p>
    <p>Stock: ${p.stock}</p>
    <p>Categoría: ${p.categoria}</p>
  `;
}
//  INICIO
cargar();
render();