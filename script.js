document.addEventListener("DOMContentLoaded",(e) => {

    handleDetailProduct();
    products.forEach(element => document.getElementById("populer_product").innerHTML += Product(element));
    navigation_responsive();
})

function navigation_responsive(){
    document.getElementById("close_navbar").addEventListener("click",(e) => {
        document.getElementById("show_menu").checked = false;
        document.getElementById("hamburger_menu_2").classList.add("hidden");
    });
    document.getElementById("show_menu").addEventListener("change",(e) => {
        if(e.target.checked){
            document.getElementById("hamburger_menu_2").classList.remove("hidden");
            console.log("dia true");
        }else{
            console.log("dia false");
            document.getElementById("hamburger_menu_2").classList.add("hidden");
        }
    })
}


function isLoaded(){
    if(document.readyState == "complete") return true;
    console.log('as');

    return false;
}

function initCart(){
   if(!localStorage.getItem('cart')) return localStorage.setItem("cart",JSON.stringify([]));
}

function qty_product_manage(element,mode){
    switch(mode){
        case "increase" : {
            if(element.value > 9) return;
            element.value = Number(element.value) + 1;
            break;
        }
        case "decrease" : {
            if(element.value < 2) return;
            element.value = Number(element.value) - 1; 
            break;
        }
    }
}


function handleDetailProduct(){
    const detail_productWrapper = document.getElementById("detail_product");
    const detail_product = detail_productWrapper.children[0];
    document.getElementById("close_detail_product").onclick = () => detailProduct().hide();

    handleQtyProduct(detail_product);
}

const handleQtyProduct = function(detail_product){
    const qtyWrapper = detail_product.children[3].children[0];
    const increase_btn = qtyWrapper.children[0];
    const qty = qtyWrapper.children[1];
    const decrease_btn = qtyWrapper.children[2];
    const add_to_cart_btn = detail_product.children[3].children[1];
    increase_btn.onclick = (e) => qty_product_manage(qty,"increase");
    decrease_btn.onclick = (e) => qty_product_manage(qty,"decrase");
    add_to_cart_btn.onclick = (e) => {
        detailProduct().hide();
        const id_product = document.getElementById("btn_add_to_cart").getAttribute("id_product");
        console.log("berhasil menambahkan "+ qty.value+" product dengan id ("+ id_product +") ke dalam cart!");
        handleAddToStorage(id_product,qty.value);
        console.log(JSON.parse(localStorage.getItem("cart")));
        qty.value = 1;
    };
}

function handleAddToStorage(id,qty){
    let cart = JSON.parse(localStorage.getItem("cart"));
    if(cart.filter(value => value.id == id).length > 0){
        cart = cart.map(value => {
            if(value.id == id){
                value.quantity += Number(qty);
            }
            return value;
        })
        console.log("Berhasil menambahkan qty cart!");
    }else{
        cart.push({...products.filter(value => value.id == id)[0],quantity : Number(qty)})
        console.log("berhasil menambahkan product kedalam keranjang");
    }
   localStorage.setItem("cart",JSON.stringify(cart));  
}

const products = [
    {
        id : 1,
        name : "Consina Swiftland Jaket Urban Ringan | Outdoor Hiking Riding",
        description : `Menggunakan bahan Premium Breathable Nylon untuk kegiatan luar ruang dan urban, Consina Swiftland Jacket adalah jaket ideal untuk berbagai kegiatan.Karakternya yang ringan, breathable dan fleksibel, membuat Consina Swiftland kandidat kuat untuk berbagai activity: Travelling, Light Hiking, Urban Riding, Campus atau hangout santai bersama teman.
                    Untuk ekstra kenyamanan, Swiftland dilengkapi dengan karet elastis di bagian pinggang dan pergelangan tangan yang fleksibel mengikuti gerak tubuh. Dilengkapi juga dengan hoodie dan 2 kantong tangan dengan zippers.`,
        price : 325000,
        stock : 999,
        image_url : "https://wildanizhara.github.io/e-commerce-waskerStore/image/model1.png",
        date : new Date(),
    },
    {
        id : 2,
        name : "Kaos Eiffel Tower - Paris (SB18U)",
        description : `Kaos O-Neck Unisex, Cotton Combed 24s, kualitas premium standar Distro Bandung.
                        Gambar disablon menggunakan teknologi Direct To Garment (DTG) terbaru.
                        Pesanan dikirim antara 1-3 hari setelah pembayaran diterima.
                        Pengiriman cepat ke seluruh daerah di Indonesia lewat JNE atau PT.Pos.`,
        price : 96000,
        stock : 10,
        image_url : "https://www.satubaju.com/img/editor/img_iscums/498/89498_l.jpg",
        date : new Date(),
    }
] 

function showDetailProduct(id){
    if(!id) return;
    const product = products.filter(value => value.id == id)[0];
    document.getElementById("title_product").textContent = product.name;
    document.getElementById("price_product").textContent = NumberToIDR(product.price).toString();
    document.getElementById("description_product").textContent = product.description;
    document.getElementById("image_product").setAttribute("src",product.image_url);
    document.getElementById("btn_add_to_cart").setAttribute("id_product",id);
    detailProduct().show();
}


function detailProduct(){
    const detail_product = document.getElementById("detail_product");
   

    const show = () => detail_product.classList.replace("hidden","flex");
    const hide = () => detail_product.classList.replace("flex","hidden");
    return{
        show,
        hide
    }
}

const NumberToIDR = (number) =>{
    return new Intl.NumberFormat('id-ID',{
        currency : "IDR",
        style : "currency"
    }).format(number)
} 

const ProductV2 = (product) => {
    return `
     <div class="flex flex-col justify-center items-center gap-2 bg-black/80 text-white/60 rounded-lg py-3">
            <img class="h-32 drop-shadow-xl" src="${product.image_url}" alt="product">
            <div class="p-2">
                <p class="text-lg font-bold max-w-60">${product.name}</p>
                <p class="w-full font-medium">${NumberToIDR(product.price)}</p>
            </div>
            <button 
                onclick="showDetailProduct(${product.id})"
                class="mr-2 bg-blue-600 text-white text-sm font-semibold p-1 rounded-lg self-end cursor-pointer py-2" 
                type="submit">Detail Product</button>
        </div>`;
}


const Product = (product) => {
    return `
    <div class="min-w-52 p-3 flex flex-col gap-3 items-center rounded-sm bg-white/90 cursor-pointer" onclick="showDetailProduct(${product.id})">
        <img class="h-28 drop-shadow-xl" src="${product.image_url}" alt="product">
        <div>
            <p class="w-full font-semibold">${product.name.length >= 23? product.name.slice(0,23).concat("...") : product.name }.</p>
            <p class="w-full font-medium text-black/60">${product.price}</p>
            </div>
    </div>`;
}

const Cart = (product) => {
    return `
    <div class="flex max-w-64 bg-black/40 p-2 rounded-lg">
        <div>
            <img class="w-20 h-10 drop-shadow-xl" src="${product.image_url}" alt="product">
        </div>
        <div class="px-2">
           <p class="font-bold text-sm">${product.name}</p>
            <div class="flex justify-between">
                <p>Quantity</p>
                <p class="font-bold">${product.quantity}</p>
            </div>
            <div class="flex justify-between">
                <p>Price</p>
                <p class="font-bold">${NumberToIDR(product.price * product.quantity)}</p>
            </div>
            </div>
    </div>`;
}


