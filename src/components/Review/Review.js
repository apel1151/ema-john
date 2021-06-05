import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItems/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart]= useState([])
    const[orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () =>{
           history.push('/shipment') 
    }

    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !==productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() =>{

     
      const savedCart = getDatabaseCart();

      const productKeys = Object.keys(savedCart);
      const cartProducts = productKeys.map(key => {
      const product = fakeData.find(pd=> pd.key === key)
      product.quantity = savedCart[key];

          return product;
      })
    //   console.log(counts);
     setCart(cartProducts);

    }, [])

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt="" />
    }
    return (
        <div style={{display:'flex'}}>
            <div className="item-contain">
                <h1>Items clicked: {cart.length}</h1>

                    {
                        cart.map(pd => 
                        <ReviewItem 
                                removeProduct={removeProduct} 
                                key = {pd.key} 
                                product={pd}>

                        </ReviewItem>)
                    }

            </div>
            {
                thankYou
            }

            <div style={{marginRight:'200px'}} className="cart-contain">
                <Cart cart={cart}>

                    <button onClick ={handleProceedCheckout} className='main-button'>Proceed checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;