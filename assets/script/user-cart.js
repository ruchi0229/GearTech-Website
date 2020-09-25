/***
 set products in user cart page from localStorage
***/
function userCartProducts() {

    let cartProducts = []; //adding all localSctorage products into array
    let totalBill = 0; //set initial bill to 0

    for (let i = 0; i < localStorage.length; i++) {

        //get product from local storage
        let product = localStorage.getItem(localStorage.key(i));

        //parse the string into JSON
        product = JSON.parse(product);

        //check the data is product not users
        if (product.product_id !== undefined) {
            // add the products into cart
            cartProducts.push(product);
        }
    }

    // set the array values in user cart table
    document.querySelector(".user-cart-table").innerHTML = cartProducts.map(product => {

        totalBill += product.total_price; //add - all cart products prices

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


    /********************* edit cart functionality ********************/

    // get all button of table
    let editProducts = document.querySelectorAll(".edit-product");

    for (var i = 0; i < editProducts.length; i++) {
        //for identify the event listner and call updateCart function
        editProducts[i].addEventListener('click', updateCart, false);
    };

    /**
     * updating the quantity and price of product
     * and updating it on localStorage
    **/
    function updateCart() {

        let buttonType = this.id.slice(0, 3); //get the button id first string part
        let id = this.id.slice(4); //get button id integer part
        let totalPrice = 0;

        cartProducts.forEach(product => {
            //selecting specific product quantity input 
            productQuantity = document.querySelector(`#quantity-${id}`);
            let quantity = productQuantity.value;

            if (product.product_id == id) {

                if (buttonType === "add") { //check button is for adding products
                    quantity++;
                    productQuantity.value = quantity;
                }
                else if (buttonType === "sub") { //check button is for subtracting products
                    if (quantity > 1) { //subbract if products are >1
                        quantity--;
                        productQuantity.value = quantity;
                    }
                    else { //else remove the product from cart and localStorage
                        quantity--;
                        productQuantity.value = quantity;
                        window.localStorage.removeItem(product.product_id);
                        setTimeout(location.reload(), 1000);
                    }
                }

                if (quantity >= 1) { //update the localStorage if quantity id >=1
                    totalPrice = quantity * product.product_price;

                    /**
                     * product uniqe key similar to added product
                     * for updaing the product details in localStorage
                     **/
                    let productKey = product.product_id;

                    /**getting all previous setted product details
                      *and setted updated 
                    **/
                    let productJson = {
                        product_id: product.product_id,
                        category_name: product.category_name,
                        product_name: product.product_name,
                        product_description: product.product_description,
                        product_image: product.product_image,
                        product_quantity: productQuantity.value,
                        product_price: product.product_price,
                        total_price: totalPrice
                    };

                    // update the products data in localStorage with all details and total price
                    localStorage.setItem(productKey, JSON.stringify(productJson));
                    setTimeout(location.reload(), 1000);
                }
            }
        });
    }
}

// function call to set products on user cart page
userCartProducts();
function showQuantity() {
    let cartProducts = []; //adding all localSctorage products into array
    let totalQuantity = 0; //set initial quantity to 0
    let hasQuantityShow = false;
  
     for (let i = 0; i < localStorage.length; i++) {
      //get product from local storage
      let product = localStorage.getItem(localStorage.key(i));
  
      //parse the string into JSON
       product = JSON.parse(product);
      //check the data is product not users
       if (product.product_id !== undefined) {
        // add the products into cart
         cartProducts.push(product);
      //   changing quantity type from string to integer
        let quantityInNumber = parseInt(product.product_quantity);
        //adding total quantity of all products
        totalQuantity += quantityInNumber;
      }
    }
    console.log(totalQuantity)
    document.querySelector(".total-quantity").innerHTML = cartProducts.map(
      (product) => {
        if (!hasQuantityShow) {
          hasQuantityShow = true;
          return `<span>${totalQuantity}</span>`;
        }
      }
    ).join('');
  }
  showQuantity();









