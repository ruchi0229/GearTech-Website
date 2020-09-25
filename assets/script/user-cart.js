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

        // add the products into cart
        cartProducts.push(product);
    }

    // set the array values in user cart table
    document.querySelector(".user-cart-table").innerHTML = cartProducts.map(product => {
    
        totalBill += product.product_price; //add - all cart products prices

        return `<tr>
                   <th scope="row" class="border-0">
                        <div class="p-2">
                            <img src="${product.product_image}" alt=""
                            width="70" class="img-fluid rounded shadow-sm">
                            <div class="ml-3 d-inline-block align-middle">
                                <h5 class="mb-0"> <a href="#"
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
                            <input type="button" class="sub-product" id="sub-${product.product_id}" value="-">
                            <input class="cart-edit product-quantity" type="text" name="quantity" value="${product.product_quantity}">
                            <input type="button" class="add-product" id="add-${product.product_id}" value="+">
                        </div>
                    </td>
                </tr>`;
    }).join('');

    //*** set the sub-total and total bill in order summary ***
    document.querySelector(".sub-total-bill").innerHTML = totalBill + " RS.";
    document.querySelector(".total-bill").innerHTML = totalBill + " RS.";
}

// function call to set products on user cart page
userCartProducts();








