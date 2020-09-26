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