
const btnCarrito = document.querySelector(".contenedor-carrito-icono")
const contenedorCarrito = document.querySelector(".contenedor-carrito")

btnCarrito.addEventListener("click",() => {
    contenedorCarrito.classList.toggle("contenedor-carrito-escondido")

})



// ------------------------------------------------------------------------------------------

const infoCarrito = document.querySelector(".carrito-producto")
const rowProducto = document.querySelector(".row-producto")

const listaProducto = document.querySelector(".contenedor")

let allProducts = []

const valorTotal = document.querySelector(".total-pagar")
const contadorProducto = document.querySelector("#contador-productos")



// -------------------------------------------------------------------------------------------------------

listaProducto.addEventListener("click" , e => {

    if(e.target.classList.contains("btn-add-cart")){
        const producto = e.target.parentElement

        const infoProducto ={
            cantidad: 1,
            titulo: producto.querySelector("h2").textContent,
            precio: producto.querySelector("p").textContent,
        }

        const existe = allProducts.some(producto => producto.titulo === infoProducto.titulo)
        
        if(existe){
            const productos = allProducts.map(producto =>{
                if(producto.titulo === infoProducto.titulo){
                    producto.cantidad++;
                    return producto
                }else{
                    return producto
                }
            })
            allProducts =[...productos]
        }else{
            allProducts = [...allProducts, infoProducto]

        }
        mostrarHTML();
    }
});

rowProducto.addEventListener("click",(e) => {
    if(e.target.classList.contains("fa-rectangle-xmark")){
        const producto = e.target.parentElement
        const titulo = producto.querySelector("p").textContent

        allProducts = allProducts.filter(
            producto => producto.titulo !== titulo
        );
       mostrarHTML();
    }
});

// funcion para mostrar html

const mostrarHTML = () =>{

    if(!allProducts.length){
        contenedorCarrito.innerHTML = `
            <p class="carrito-vacio">El carrito está vacio.</p>
        `
    };

    rowProducto.innerHTML = "";

    let total = 0;
    let totalProductos = 0;

    allProducts.forEach(producto =>{
        const contenedorProducto = document.createElement("div")
        contenedorProducto.classList.add("carrito-producto")


        contenedorProducto.innerHTML = `
            <div class="info-carrito-producto">
                <span class="cantidad-carrito-producto">${producto.cantidad}</span>
                <p class="titulo-producto-carrito">${producto.titulo}</p>
                <span class="precio-producto-carrito">${producto.precio}</span>
            </div>
            <i class="fa-solid fa-rectangle-xmark"></i>`


        rowProducto.append(contenedorProducto);

        total = total + parseInt(producto.cantidad * producto.precio.slice(1));
        totalProductos = totalProductos + producto.cantidad;

    });

    valorTotal.innerText = `$${total}`;
    contadorProducto.innerText = totalProductos;
};






const btnPagar = document.querySelector(".btn-pagar");
const voucher = document.getElementById("voucher");
const btnCerrarVoucher = document.querySelector(".btn-cerrar-voucher");
const voucherContentDiv = document.getElementById("voucher-content");

btnPagar.addEventListener("click", () => {
    if (allProducts.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    // Mostrar el voucher
    voucher.classList.add("voucher-activo");

    // Obtener la fecha y hora actual
    const now = new Date();
    const fecha = now.toLocaleDateString();
    const hora = now.toLocaleTimeString();

    let voucherContent = `¡¡¡¡Su compra ha sido realizada con éxito!!!!\n\nFecha: ${fecha} Hora: ${hora}\n\nDetalles de la compra:\n\n`;
    let total = 0;

    allProducts.forEach((producto) => {
        voucherContent += `${producto.titulo} - Cantidad: ${producto.cantidad} - Precio: ${producto.precio} = Total: ${parseInt(producto.precio.slice(1)) * producto.cantidad}\n`;
        total += producto.cantidad * parseInt(producto.precio.slice(1));
    });

    voucherContent += `\nTotal a pagar: $${total}\n\nGracias por comprar en ResinoxyⓇ™`;

    voucherContentDiv.innerText = voucherContent;
});


btnCerrarVoucher.addEventListener("click", () => {

    voucher.classList.remove("voucher-activo");

    window.location.reload();
});






