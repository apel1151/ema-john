import React from 'react';
import './Cart.css';

const Cart = (props) => {

    const cart = props.cart;

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total+ product.price;
        
    }

    let shipping = 0;

    if(total>50){
         shipping = 5;
    }
    else if(total>0){
        shipping = 10;
    }
   

   let tax = total/10;
   let grandTotal = total+ shipping+ tax;


   const setNumber = num =>{

      const precision = num.toFixed(2);
      return Number(precision);
   }

    return (

        <div className='cart-container'>
                <h1>Order Summary</h1>
               <h2>Items ordered: {cart.length}</h2>

               <div className='cart-count'>
                   <h4>Product price:{'  '} {'$'+ setNumber(total)}</h4>
                   <h4>Shipping cost: {'$'+ shipping}</h4>
                   <h4>Tax+Vat: {''} {'$' + setNumber(tax)}</h4>
                   <h3>Total price: {'$' + setNumber(grandTotal)}</h3>
                   <button className='review-btn'>Review order</button>
               </div>
        </div>
    );
};

export default Cart;