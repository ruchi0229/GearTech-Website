/***
 set products in user cart page from localStorage
***/
function showCartProducts() {

  let cartProducts = []; //adding all localSctorage products into array
  let totalBill = 0; //set initial bill to 0
  let totalQuantity = 0;

  cartProducts = JSON.parse(localStorage.getItem("products"));
  cartProducts.sort((a, b) => {
    return a.product_id - b.product_id;
  });

  // set the array values in user cart table
  document.querySelector(".user-cart-table").innerHTML = cartProducts.map(product => {

    totalBill += product.total_price; //add - all cart products prices
    totalQuantity += product.product_quantity; //sum of all products quantity
    return `<tr>
                   <th scope="row" class="border-0">
                        <div class="p-2">
                            <img src="${product.product_image}" alt=""
                            width="70" class="img-fluid rounded shadow-sm">
                            <div class="ml-3 d-inline-block align-middle">
                                <h5 class="mb-0"> <a href="product_detail.html?p_id=${product.product_id}"
                                class="text-dark d-inline-block align-middle">${product.product_name}
                                </a></h5><span class="text-muted font-weight-normal font-italic d-block">
                                Category: ${product.category_name}</span>
                                <div class="price-sm"><strong>RS. ${product.product_price} x ${product.product_quantity}</strong></div>
                            </div>
                        </div>
                    </th>
                    <td class="border-0 align-middle price"><strong>RS. ${product.product_price} x ${product.product_quantity}</strong></td>
                    <td class="border-0 align-middle">
                        <div class="d-flex flex-lg-row">
                            <input type="button" class="sub-product edit-product" id="sub-${product.product_id}" value="-">
                            <input class="cart-edit product-quantity" type="text" name="quantity" id="quantity-${product.product_id}" value="${product.product_quantity}">
                            <input type="button" class="add-product edit-product" id="add-${product.product_id}" value="+">
                        </div>
                    </td>
                </tr>`;
  }).join('');

  //*** set the sub-total and total bill in order summary ***
  document.querySelector(".sub-total-bill").innerHTML = totalBill + " RS.";
  document.querySelector(".total-bill").innerHTML = totalBill + " RS.";

  //*** set the sub-total and total bill in checkout popup ***
  document.querySelector(".checkout-quantity").innerHTML = totalQuantity;
  document.querySelector(".checkout-total-bill").innerHTML = totalBill + " RS.";
  let discountBill = totalBill - ((totalBill * 10) / 100);    // calculating discount
  document.querySelector(".checkout-discount-bill").innerHTML = discountBill + " RS.";

  // setting the total quantity on UI - cart icon
  document.querySelector(".total-quantity").innerHTML = `<span>${totalQuantity}</span>`;


  /********************* edit cart functionality ********************/

  // get all button of table
  let editProducts = document.querySelectorAll(".edit-product");

  for (let i = 0; i < editProducts.length; i++) {
    //for identify the event listner and call updateCart function
    editProducts[i].addEventListener('click', updateCart, false);
  };

}

/**
 * updating the quantity and price of product
 * and updating it on localStorage
**/
function updateCart() {

  // get all current products from localStorage
  let cartCurrentProducts = JSON.parse(localStorage.getItem("products"));

  let buttonType = this.id.slice(0, 3); //get the button id first string part
  let id = this.id.slice(4); //get button id integer part
  let totalPrice = 0;

  cartCurrentProducts.forEach((product, index) => {

    //selecting the clicked product quantity input from the cart list
    productQuantity = document.querySelector(`#quantity-${id}`);
    let quantity = parseInt(productQuantity.value);

    if (product.product_id == id) {

      if (buttonType === "add") { //check button is for adding products
        console.log("add quantity ---- " + quantity);
        quantity++;
        console.log("add quantity ---- " + quantity);
        productQuantity.value = quantity;
      }
      else if (buttonType === "sub") { //check button is for subtracting products
        if (quantity > 1) { //subbract if products are >1
          quantity--;
          console.log("sub quantity ---- " + quantity);
          productQuantity.value = quantity;
        }
        else { //else remove the product from cart and localStorage
          quantity--;
          cartCurrentProducts.splice(index, 1);
          localStorage.setItem('products', JSON.stringify(cartCurrentProducts));

          showCartProducts();

        }
      }

      if (quantity >= 1) { //update the localStorage if quantity id >=1
        totalPrice = quantity * product.product_price;


        let cartItems = []; // array of selected products by user

        let productJson = {
          product_id: product.product_id,
          category_name: product.category_name,
          product_name: product.product_name,
          product_description: product.product_description,
          product_image: product.product_image,
          product_quantity: parseInt(productQuantity.value),
          product_price: product.product_price,
          total_price: totalPrice
        };

        let previousProducts = JSON.parse(localStorage.getItem("products"));
        previousProducts.forEach(preProduct => {

          /*
            if selected product have aleady been addedd 
            that should be override with the new one.
          */
          if (preProduct.product_id !== productJson.product_id) {
            cartItems.push(preProduct);
          }
        });

        // adding new selected products
        cartItems.push(productJson);

        // storing purchased product detail in local storage with totalprice and quantity
        localStorage.setItem("products", JSON.stringify(cartItems));

        // function call to set products on user cart page
        showCartProducts();

      }
    }
  });
}

// function call to set products on user cart page
showCartProducts();


/******************* CHECKOUT FUNCTIONLITY ******************/

// Checkout button removing products from localstorage
let clearLS = document.getElementById("checkoutbtn");
clearLS.addEventListener('click', function () {
  for (i = 0; i < 100; i++) {
    window.localStorage.removeItem(i);
    setTimeout(location.reload(), 200000);
  }
});

// Delivery Time
let checkoutbtn = document.getElementById("checkoutbtn");
let checkouttime = document.getElementById("checkout-time");
let deliverytime = document.getElementById("delivery-time");

checkoutbtn.addEventListener('click', () => {
  let today = new Date();
  let tomorrow = new Date();

  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let date = today.getDate();

  let currentDate = `${date}/${month}/${year}`; // calculating today
  let tomorrowDate = `${date + 1}/${month}/${year}`;  //// calculating tomorrow

  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  let currentTime = `${hours}:${minutes}:${seconds}`;   // calculating current time

  checkouttime.innerText = currentDate + ' ' + currentTime;
  deliverytime.innerText = tomorrowDate + ' ' + currentTime;
});








