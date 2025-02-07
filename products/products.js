document.addEventListener("DOMContentLoaded",(e) => {

    handleDetailProduct();
    handleCart();
    products.forEach(element => document.getElementById("products").innerHTML += ProductV2(element));
    navigation_responsive();
})

function handleCart(){
    initCart();
    const cart = JSON.parse(localStorage.getItem("cart"));
    if(cart.length  == 0 )return;

    const cart_wrapper = document.getElementById("cart");
    const cart_total_product = cart_wrapper.parentElement.children[2].children[1];
    cart_total_product.textContent =  cart.length;
    const cart_total_price = cart_wrapper.parentElement.children[3].children[1];
    cart_total_price.textContent = NumberToIDR(cart.reduce((acc,value) => acc + value.price * value.quantity ,0))
    cart.forEach(element => {
       cart_wrapper.innerHTML += Cart(element);
    });

    document.getElementById("byr_skrng").addEventListener("click",() => {
        const transaction = {
            name : "Guest",
            email : "guest@gmail.com",
            items : cart,
            total_product : cart.length,
            total_price : cart.reduce((acc,value) => acc + value.price * value.quantity ,0),
            status : "pending",
            created_at : new Date(),
        }
        localStorage.setItem("cart",JSON.stringify([]));
        document.getElementById("modal_payment").classList.replace("hidden","block")
        
    })
}