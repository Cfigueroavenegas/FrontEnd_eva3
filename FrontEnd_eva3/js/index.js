const button = document.getElementById('btn2');
const form = document.getElementById('subscriptionForm');

button.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Gracias por suscribirse a Resinoxy\nTe enviaremos las mejores ofertas de la tienda y los datos para poder ingresar al curso de resina.");
    form.reset();
});